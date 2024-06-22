import * as vscode from 'vscode';
import showTest from './test';
import WebSocket from 'ws';
import { connect } from 'http2';
export function activate(context: vscode.ExtensionContext) {


	const onDidChangeDiagnostics = (e: vscode.DiagnosticChangeEvent) => {
		// エラーがある場合は助けを求めるボタンを表示
		showAskForHelpButton();

	};

	const disposable = vscode.languages.onDidChangeDiagnostics(onDidChangeDiagnostics);

	// エラーの情報を格納する変数のためのインターフェース
	interface ErrorInfo {
		memberName: string;
		file: string;
		language: string;
		line: number;
		column: number;
		message: string;
		severity: 'Error' | 'Warning';
	}

	// 助けを求めるボタンの表示
	const showAskForHelpButton = async () => {
		const selection = await vscode.window.showWarningMessage('TeamTuner: エラーが発生しているようです', '助けを求める');
		
		if (selection !== undefined) {
			askForHelp();
		}
	};

	// 助けを求めるボタンが押された際の処理
	const askForHelp = async () => {
		vscode.window.showInformationMessage('エラー情報を収集しています...');

		let errorList: ErrorInfo[] = [];

		// ワークスペース内の全てのファイルの診断情報を取得
		vscode.workspace.textDocuments.forEach(document => {
			const diagnostics = vscode.languages.getDiagnostics(document.uri);
			
			diagnostics.forEach(diagnostic => {
				if (diagnostic.severity === vscode.DiagnosticSeverity.Error || diagnostic.severity === vscode.DiagnosticSeverity.Warning) {
					errorList.push({
						memberName: process.env.USERNAME || 'Unknown',
						file: document.fileName,
						language: document.languageId,
                    	line: diagnostic.range.start.line + 1,
                    	column: diagnostic.range.start.character + 1,
                    	message: diagnostic.message,
                    	severity: diagnostic.severity === vscode.DiagnosticSeverity.Error ? 'Error' : 'Warning'
					});
				}
			});

		});

		// エラーと警告の情報をまとめる
		let report = "エラーと警告のレポート:\n\n";

		errorList.forEach(error => {
			report += `[${error.severity}] ${error.file} (${error.language}):\n`;
			report += `  Line ${error.line}, Column ${error.column}: ${error.message}\n\n`;
			report += `  メンバー名: ${error.memberName}さん\n\n`;
		});

		// レポートを表示または送信
		if (errorList.length > 0) {
			// ここでレポートを使用して何かします（例：APIに送信、ファイルに保存など）
			vscode.window.showInformationMessage(report);
			vscode.window.showInformationMessage(`${errorList.length} 件のエラーと警告の情報を収集しました。`);
		} else {
			vscode.window.showInformationMessage('現在、エラーや警告は検出されていません。');
		}

		sendErrorsToAPI(errorList[0]);
	};

	interface ErrorPayload {
		memberName: string;
		language: string;
		message: string;
	}

	const ws = new WebSocket('ws://localhost:8080');

	ws.on('open', () => {
		console.log('Connected to WebSocket server');
	});

	ws.on('message', (message: string) => {
		const parsedMessage = JSON.parse(message);
		if (parsedMessage.source === 'discord') {
		vscode.window.showInformationMessage(`Received from Discord: ${parsedMessage.message}`);
		}
	});

	// APIに実際にエラー情報を送信する関数
	async function sendErrorsToAPI(error: ErrorInfo): Promise<void> {
		// ここでエラー情報をAPIに送信します
		// const payloads: ErrorPayload = {
		// 	memberName: error.memberName,
		// 	language: error.language,
		// 	message: error.message
		// };

		try {
			ws.send(JSON.stringify({ source: 'vscode', memberName: error.memberName, language: error.language, message: error.message }));
			console.log('send websocket error_message');
		} catch (error) {
			// if (axios.isAxiosError(error)) {
			// 	vscode.window.showErrorMessage('APIエラー:', error.response?.data);
			// } else {
			// 	vscode.window.showErrorMessage('エラー:', error ?? '原因不明のエラー');
			// }
			vscode.window.showErrorMessage('エラー:', error ?? '原因不明のエラー');
		}
	}

	// Simple notifications
	const showInfoNotification = vscode.commands.registerCommand('notifications-sample.showInfo', () => {
		vscode.window.showInformationMessage('Info Notification');
	});

	const showInfoNotificationAsModal = vscode.commands.registerCommand('notifications-sample.showInfoAsModal', () => {
		vscode.window.showInformationMessage('Info Notification As Modal', { modal: true });
	});

	const showWarningNotification = vscode.commands.registerCommand('notifications-sample.showWarning', () => {
		vscode.window.showWarningMessage('Warning Notification');
	});

	const showErrorNotification = vscode.commands.registerCommand('notifications-sample.showError', () => {
		vscode.window.showErrorMessage('Error Notification');
	});

	// Notification with actions
	const showWarningNotificationWithActions = vscode.commands.registerCommand('notifications-sample.showWarningWithActions', async () => {
		const selection = await vscode.window.showWarningMessage('Warning Notification With Actions', 'Action 1', 'Action 2', 'Action 3');

		if (selection !== undefined) {
			vscode.window.showInformationMessage(`You selected: ${selection}`, { modal: true });
		}
	});

	// Progress notification with option to cancel
	const showProgressNotification = vscode.commands.registerCommand('notifications-sample.showProgress', () => {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: "Progress Notification",
			cancellable: true
		}, (progress, token) => {
			token.onCancellationRequested(() => {
				console.log("User canceled the long running operation");
			});

			progress.report({ increment: 0 });

			setTimeout(() => {
				progress.report({ increment: 10, message: "Still going..." });
			}, 1000);

			setTimeout(() => {
				progress.report({ increment: 40, message: "Still going even more..." });
			}, 2000);

			setTimeout(() => {
				progress.report({ increment: 50, message: "I am long running! - almost there..." });
			}, 3000);

			const p = new Promise<void>(resolve => {
				setTimeout(() => {
					resolve();
				}, 5000);
			});

			return p;
		});
	});

	// Show all notifications to show do not disturb behavior
	const showAllNotifications = vscode.commands.registerCommand('notifications-sample.showAll', () => {
		vscode.commands.executeCommand('notifications-sample.showInfo');
		vscode.commands.executeCommand('notifications-sample.showWarning');
		vscode.commands.executeCommand('notifications-sample.showWarningWithActions');
		vscode.commands.executeCommand('notifications-sample.showError');
		vscode.commands.executeCommand('notifications-sample.showProgress');
		vscode.commands.executeCommand('notifications-sample.showInfoAsModal');
	});

	context.subscriptions.push(showInfoNotification, showInfoNotificationAsModal, showWarningNotification, showErrorNotification, showProgressNotification, showWarningNotificationWithActions, showAllNotifications, showTest, disposable);
}

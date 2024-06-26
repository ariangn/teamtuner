import * as vscode from 'vscode';
import WebSocket from 'ws';
import showSolved from './solvedButton';

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

		let errorList: ErrorInfo[] = [];

		// ワークスペース内の全てのファイルの診断情報を取得
		vscode.workspace.textDocuments.forEach(document => {
			const diagnostics = vscode.languages.getDiagnostics(document.uri);
			
			diagnostics.forEach(diagnostic => {
				if (diagnostic.severity === vscode.DiagnosticSeverity.Error || diagnostic.severity === vscode.DiagnosticSeverity.Warning) {
					errorList.push({
						memberName: 'いとうやまと', //process.env.USERNAME || 'Unknown',
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

		const sendMessage: () => void = () => ws.send("1");
		showSolved(sendMessage);
		sendErrorsToAPI(errorList[0]);
	};

	const ws = new WebSocket('ws://localhost:8080');

	ws.on('open', () => {
		console.log('Connected to WebSocket server');
	});

	ws.on('message', (message: string) => {
		const parsedMessage = JSON.parse(message);
		if (parsedMessage.source === 'discord') {
		vscode.window.showInformationMessage(`${parsedMessage.message}`);
		}
	});

	// APIに実際にエラー情報を送信する関数
	async function sendErrorsToAPI(error: ErrorInfo): Promise<void> {

		try {
			ws.send(JSON.stringify({ source: 'vscode', memberName: error.memberName, language: error.language, message: error.message }));
			console.log('send websocket error_message');
		} catch (error) {
			vscode.window.showErrorMessage('エラー:', error ?? '原因不明のエラー');
		}
	}

	context.subscriptions.push(disposable);
}

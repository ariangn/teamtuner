// export function activate(context: vscode.ExtensionContext) {

// 	// Simple notifications
// 	const showInfoNotification = vscode.commands.registerCommand('notifications-sample.showInfo', () => {
// 		vscode.window.showInformationMessage('Info Notification');
// 	});

// 	const showInfoNotificationAsModal = vscode.commands.registerCommand('notifications-sample.showInfoAsModal', () => {
// 		vscode.window.showInformationMessage('Info Notification As Modal', { modal: true });
// 	});

// 	const showWarningNotification = vscode.commands.registerCommand('notifications-sample.showWarning', () => {
// 		vscode.window.showWarningMessage('Warning Notification');
// 	});

// 	const showErrorNotification = vscode.commands.registerCommand('notifications-sample.showError', () => {
// 		vscode.window.showErrorMessage('Error Notification');
// 	});

// 	// Notification with actions
// 	const showWarningNotificationWithActions = vscode.commands.registerCommand('notifications-sample.showWarningWithActions', async () => {
// 		const selection = await vscode.window.showWarningMessage('Warning Notification With Actions', 'Action 1', 'Action 2', 'Action 3');
		
// 		if (selection !== undefined) {
// 			vscode.window.showInformationMessage(`You selected: ${selection}`, { modal: true });
// 		}
		
// 	});

// 	// Progress notification with option to cancel
// 	const showProgressNotification = vscode.commands.registerCommand('notifications-sample.showProgress', () => {
// 		vscode.window.withProgress({
// 			location: vscode.ProgressLocation.Notification,
// 			title: "Progress Notification",
// 			cancellable: true
// 		}, (progress, token) => {
// 			token.onCancellationRequested(() => {
// 				console.log("User canceled the long running operation");
// 			});

// 			progress.report({ increment: 0 });

// 			setTimeout(() => {
// 				progress.report({ increment: 10, message: "Still going..." });
// 			}, 1000);

// 			setTimeout(() => {
// 				progress.report({ increment: 40, message: "Still going even more..." });
// 			}, 2000);

// 			setTimeout(() => {
// 				progress.report({ increment: 50, message: "I am long running! - almost there..." });
// 			}, 3000);

// 			const p = new Promise<void>(resolve => {
// 				setTimeout(() => {
// 					resolve();
// 				}, 5000);
// 			});

// 			return p;
// 		});
// 	});

// 	// Show all notifications to show do not disturb behavior
// 	const showAllNotifications = vscode.commands.registerCommand('notifications-sample.showAll', () => {
// 		vscode.commands.executeCommand('notifications-sample.showInfo');
// 		vscode.commands.executeCommand('notifications-sample.showWarning');
// 		vscode.commands.executeCommand('notifications-sample.showWarningWithActions');
// 		vscode.commands.executeCommand('notifications-sample.showError');
// 		vscode.commands.executeCommand('notifications-sample.showProgress');
// 		vscode.commands.executeCommand('notifications-sample.showInfoAsModal');
// 	});

// 	context.subscriptions.push(showInfoNotification, showInfoNotificationAsModal, showWarningNotification, showErrorNotification, showProgressNotification, showWarningNotificationWithActions, showAllNotifications);
// }

import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

let personName: string = 'ラッコさん';
let errorTimer: NodeJS.Timeout | undefined;
const ERROR_DELAY = 5000; // 10s in milliseconds
const ERROR_CHECK_INTERVAL = 10000; // 1 minute in milliseconds

export function activate(context: vscode.ExtensionContext) {
    
    // Register "Need Help?" notification command
    let needHelpNotif = vscode.commands.registerCommand('extension.needHelpNotif', () => {
        vscode.window.showInformationMessage('エラーが解決されてないようです。助けを呼びますか？', '助けを呼ぶ').then(selection => {
            if (selection === '助けを呼ぶ') {
                vscode.window.showInformationMessage(`お助け申請しました！`);
            }
        });
    });

    // Register "Help Response" notification command
    let helpResponseNotif = vscode.commands.registerCommand('extension.helpResponseNotif', () => {
        vscode.window.showInformationMessage(`${personName}がお助けします！`);
    });

    // Register "Issue Resolved" status bar command
    let issueResolvedSB = vscode.commands.registerCommand('extension.issueResolvedSB', () => {
        const statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
        statusBarItem.text = 'エラーが解決されました';
        statusBarItem.show();

        context.subscriptions.push(statusBarItem);
    });

    // Subscribe commands to the context
    context.subscriptions.push(needHelpNotif);
    context.subscriptions.push(helpResponseNotif);
    context.subscriptions.push(issueResolvedSB);
}

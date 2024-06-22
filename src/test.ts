import * as vscode from 'vscode';

const showTest = vscode.commands.registerCommand('notifications-sample.showTest', () => {
    vscode.window.showInformationMessage('テストだよ');
});

export default showTest;
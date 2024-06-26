import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {


    const showTest = vscode.commands.registerCommand('notifications-sample.showTest', () => {
		vscode.window.showInformationMessage('テストだよ');
	});
    
    context.subscriptions.push(showTest);

    const diagnosticCollection = vscode.languages.createDiagnosticCollection('errorDetection');
    context.subscriptions.push(diagnosticCollection);

    vscode.workspace.onDidChangeTextDocument((e) => {
        vscode.window.showErrorMessage('テキストが変更されました');
        updateDiagnostics(e.document, diagnosticCollection);
    });
}

function updateDiagnostics(document: vscode.TextDocument, collection: vscode.DiagnosticCollection): void {
    const diagnostics: vscode.Diagnostic[] = [];

    const text = document.getText();
    if (text.includes('error')) {
        const range = new vscode.Range(0, 0, 0, 5);
        const diagnostic = new vscode.Diagnostic(range, 'エラーが検出されました', vscode.DiagnosticSeverity.Error);
        diagnostics.push(diagnostic);

        handleError();
    }

    collection.set(document.uri, diagnostics);
}

function handleError(): void {
    vscode.window.showErrorMessage('エラーが検出されました');
}
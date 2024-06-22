import * as vscode from 'vscode';

const showSolved = async () => {
    const selection = await vscode.window.showWarningMessage('エラーは解決しましたか？', '解決した！');
    
    if (selection !== undefined) {
        const lines = [
            '問題が解決しました！🥳',
            '質問者：Soma',
            '回答者：Ito'
        ];

        const message = lines.join('\n');
        vscode.window.showInformationMessage(message, { modal: true });
    }
};

export default showSolved;
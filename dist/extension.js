/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
const vscode = __importStar(__webpack_require__(1));
const test_1 = __importDefault(__webpack_require__(2));
function activate(context) {
    // let orange = vscode.window.createOutputChannel("Orange");
    const onDidChangeDiagnostics = (e) => {
        vscode.window.showInformationMessage('診断が変更されましたよ！');
        // orange.appendLine('診断が変更されました');
    };
    const disposable = vscode.languages.onDidChangeDiagnostics(onDidChangeDiagnostics);
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
            const p = new Promise(resolve => {
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
    context.subscriptions.push(showInfoNotification, showInfoNotificationAsModal, showWarningNotification, showErrorNotification, showProgressNotification, showWarningNotificationWithActions, showAllNotifications, test_1.default, disposable);
}


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const vscode = __importStar(__webpack_require__(1));
const showTest = vscode.commands.registerCommand('notifications-sample.showTest', () => {
    vscode.window.showInformationMessage('テストだよ');
});
exports["default"] = showTest;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map
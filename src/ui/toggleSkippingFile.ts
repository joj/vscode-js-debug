/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import Dap from '../dap/api';
import { fileURLToPath } from 'url';
import { isFileUrl } from '../common/urlUtils';

export function toggleSkippingFile(aPath: string): void {
  if (!aPath) {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) return;
    aPath = activeEditor && activeEditor.document.fileName;
  }

  if (aPath && vscode.debug.activeDebugSession) {
    let args: Dap.ToggleSkipFileStatusParams;
    if (typeof aPath === 'string') {
      if (isFileUrl(aPath)) {
        args = { resource: fileURLToPath(aPath) };
      } else {
        args = { resource: aPath };
      }
    } else {
      args = { sourceReference: aPath };
    }

    vscode.debug.activeDebugSession.customRequest('toggleSkipFileStatus', args);
  }
}

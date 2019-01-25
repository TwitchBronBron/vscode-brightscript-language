import * as bright from '@roku-road/bright';
import { Lexer, Parser, Preprocessor } from 'brs';
import { BrsError } from 'brs/lib';
import { BRSLanguageServer } from 'C:/projects/brightscript';
import Uri from 'vscode-uri';

import {
    Diagnostic,
    DiagnosticSeverity,
    TextDocument,
    TextDocumentPositionParams,
    TextDocuments,
} from 'vscode-languageserver';

export function getIssuesWithBright(textDocument: TextDocument) {
    let issues: Diagnostic[] = [];

    let text = textDocument.getText();
    const { value, lexErrors, tokens, parseErrors } = bright.parse(text, 'Program');

    lexErrors.forEach((x) => x.severity = DiagnosticSeverity.Warning);
    parseErrors.forEach((x) => x.severity = DiagnosticSeverity.Error);

    //if we have errors, convert line and column numbers into absolute positions
    for (let err of [...lexErrors, ...parseErrors]) {
        issues.push({
            severity: err.severity,
            range: {
                start: textDocument.positionAt(
                    textDocument.offsetAt({
                        line: err.location.start.line - 1,
                        character: err.location.start.column - 1
                    })
                ),
                end: textDocument.positionAt(
                    textDocument.offsetAt({
                        line: err.location.end.line - 1,
                        character: err.location.end.column - 1
                    })
                )
            },
            message: err.message,
            code: err.name,
            source: 'brs'
        });
    }
    return issues;
}

export function getIssuesWithBrs(textDocument: TextDocument) {
    let issues: Diagnostic[] = [];
    let text = textDocument.getText();

    let tokens = Lexer.scan(text);
    let statements = Parser.parse(tokens);

    return issues;
}

export async function getIssuesWithBrightscriptLanguageServer(textDocument: TextDocument, server: BRSLanguageServer) {
    let issues: Diagnostic[] = [];
    let uri = Uri.parse(textDocument.uri);
    await server.program.reloadFile(uri.fsPath, textDocument.getText());
    await server.program.validate();
    debugger;
    for (let error of server.program.errors) {
        issues.push({
            severity: error.severity === 'warning' ? DiagnosticSeverity.Warning : DiagnosticSeverity.Error,
            range: {
                start: textDocument.positionAt(
                    textDocument.offsetAt({
                        line: error.lineIndex,
                        character: error.columnBeginIndex
                    })
                ),
                end: textDocument.positionAt(
                    textDocument.offsetAt({
                        line: error.lineIndex,
                        character: error.columnEndIndex
                    })
                )
            },
            message: error.message,
            //code: 'NO CODE',
            source: 'brs'
        });
    }
    return issues;
}

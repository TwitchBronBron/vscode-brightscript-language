import {
    CompletionItem,
    CompletionItemKind,
    TextEdit,
} from 'vscode';

import * as vscode from 'vscode';

export const ifAppInfoCompletionItems: CompletionItem[] = [
    {
        kind: CompletionItemKind.Method,
        label: 'GetID',
        insertText: 'GetID()',
        detail: 'GetID() as String',
        documentation: 'Returns the app\'s channel ID, e.g. "12345" or "dev".'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'IsDev',
        insertText: 'IsDev()',
        detail: 'IsDev() as Boolean',
        documentation: 'Returns true if the application is side-loaded, i.e. the channel ID is \"dev\"'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetVersion',
        insertText: 'GetVersion()',
        detail: 'GetVersion() as String',
        documentation: 'Returns the conglomerate version number from the manifest, e.g. \"1.2.3\", as formatted major_version + minor_version + build_version.'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetTitle',
        insertText: 'GetTitle()',
        detail: 'GetTitle() as String',
        documentation: 'Returns the title value from the manifest.'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetSubtitle',
        insertText: 'GetSubtitle()',
        detail: 'GetSubtitle() as String',
        documentation: 'Returns the subtitle value from the manifest.'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetDevID',
        insertText: 'GetDevID()',
        detail: 'GetDevID() as String',
        documentation: 'Returns the app\'s developer ID, or the keyed developer ID, if the application is side-loaded.'
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetValue',
        insertText: new vscode.SnippetString('GetValue(${1:key as String})'),
        detail: 'GetValue(key as String) as String',
        documentation: 'Returns the named manifest value, or an empty string if the entry is does not exist.'
    },
];

import {
    CompletionItem,
    CompletionItemKind
} from 'vscode';

import * as vscode from 'vscode';

export const ifFontCompletionItems: CompletionItem[] = [
    {
        kind: CompletionItemKind.Method,
        label: 'GetOneLineHeight',
        insertText: new vscode.SnippetString('GetOneLineHeight()'),
        documentation: new vscode.MarkdownString(
`
    GetOneLineHeight() as Integer

Returns the number of pixels from one line to the next when drawing with this font.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetOneLineWidth',
        insertText: new vscode.SnippetString('GetOneLineWidth(${1:text as String}, ${2:MaxWidth as Integer})'),
        documentation: new vscode.MarkdownString(
`
    GetOneLineWidth(text as String, MaxWidth as Integer) as Integer

Returns the width in pixels for this particular string, when rendered with this font.
Each glyph and the needed spacing between glyphs is measured.The returned number of pixels will be no larger than MaxWidth.
MaxWidth is generally the amount of pixels available for rendering on this line.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetAscent',
        insertText: new vscode.SnippetString('GetAscent()'),
        documentation: new vscode.MarkdownString(
`
    GetAscent() as Integer

Returns the font ascent in pixels.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetDescent',
        insertText: new vscode.SnippetString('GetDescent()'),
        documentation: new vscode.MarkdownString(
`
    GetDescent() as Integer

Returns the font descent in pixels.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetMaxAdvance',
        insertText: new vscode.SnippetString('GetMaxAdvance()'),
        documentation: new vscode.MarkdownString(
`
    GetMaxAdvance() as Integer

Returns the font maximum advance width in pixels.
`
        )
    },
];

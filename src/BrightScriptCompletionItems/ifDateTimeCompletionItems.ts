import {
    CompletionItem,
    CompletionItemKind
} from 'vscode';

import * as vscode from 'vscode';

export const ifDateTimeCompletionItems: CompletionItem[] = [
    {
        kind: CompletionItemKind.Method,
        label: 'Mark',
        insertText: new vscode.SnippetString('Mark()'),
        documentation: new vscode.MarkdownString(
`
    Mark() as Void

Set the date/time value to the current UTC date and time.

_Note: roDateTime objects are automatically Marked on creation._
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'ToLocalTime',
        insertText: new vscode.SnippetString('ToLocalTime()'),
        documentation: new vscode.MarkdownString(
`
    ToLocalTime() as Void

Offsets the date/time value from an assumed UTC date/time to a local date/time using the system time zone setting.

This function is not idempotent, and multiple calls will do multiple timezone adjustments to the time yielding an incorrect result.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetTimeZoneOffset',
        insertText: new vscode.SnippetString('GetTimeZoneOffset()'),
        documentation: new vscode.MarkdownString(
`
    GetTimeZoneOffset() as Integer

Returns the offset in minutes from the system time zone to UTC.
For example, if the system time zone is in PDT / UTC-7 the value returned would be 420.

Note: the time zone offset is returned for the current date/time, regardless of the object's date/time value.

_This function is available in firmware 6.2 or later._
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'AsSeconds',
        insertText: new vscode.SnippetString('AsSeconds()'),
        documentation: new vscode.MarkdownString(
`
    AsSeconds() as Integer

Returns the date/time as the number of seconds from the Unix epoch (00:00:00 1/1/1970 GMT).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'FromSeconds',
        insertText: new vscode.SnippetString('FromSeconds(${1:numSeconds as Integer})'),
        documentation: new vscode.MarkdownString(
`
    FromSeconds(numSeconds as Integer) as Void

Set the date/time value using the number of seconds from the Unix epoch.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'ToISOString',
        insertText: new vscode.SnippetString('ToISOString()'),
        documentation: new vscode.MarkdownString(
`
    ToISOString() as String

Return an ISO 8601 representation of the date/time value, e.g. "2015-01-27T13:21:58Z".

_This function is available in firmware 6.2 or later._
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'FromISO8601String',
        insertText: new vscode.SnippetString('FromISO8601String(${1:dateString as String})'),
        documentation: new vscode.MarkdownString(
`
    FromISO8601String(dateString as String) as Void

Set the date/time using a string in the ISO 8601 format. For example "YYYY-MM-DD HH:MM:SS" e.g "2009-01-01 01:00:00.000" or "2009-01-01T01:00:00.000".
Note that this function is unaware of the local time zone, so these time formats are effectively UTC even though the ISO 8601 spec says they should be in local time.
The above formats are also the only formats recognized by this function, even though the ISO 8601 spec contains other valid formats.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'AsDateString',
        insertText: new vscode.SnippetString(
            'AsDateString(${1|"long-date","short-weekday","no-weekday","short-month","short-month-short-weekday","short-month-no-weekday","short-date","short-date-dashes"|})'
            ),
        documentation: new vscode.MarkdownString(
`
    AsDateString(format as String) as String

Returns the date/time as a formatted string in one of the following formats:

Format | Example
--- | ---
long-date | Tuesday October 9, 2012
short-weekday | Tue October 9, 2012
no-weekday | October 9, 2012
short-month | Tuesday Oct 9, 2012
short-month-short-weekday | Tue Oct 9, 2012
short-month-no-weekday | Oct 9, 2012
short-date | 10/9/12
short-date-dashes | 10-9-12

Note that day names, month names, separators, and order of fields may vary depending on the current locale.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'AsDateStringNoParam',
        insertText: new vscode.SnippetString('AsDateStringNoParam()'),
        documentation: new vscode.MarkdownString(
`
    AsDateStringNoParam() as String

Same as AsDateString("long-date").
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetWeekday',
        insertText: new vscode.SnippetString('GetWeekday()'),
        documentation: new vscode.MarkdownString(
`
    GetWeekday() as String

Returns the day of the week as a String (e.g. "Monday").

Note: this function always returns the canonical English day of week names, regardless of the current locale.  For a locale-independent index, see GetDayOfWeek().
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetYear',
        insertText: new vscode.SnippetString('GetYear()'),
        documentation: new vscode.MarkdownString(
`
    GetYear() as Integer

Returns the date/time value's year as an Integer, e.g. 2015.
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetMonth',
        insertText: new vscode.SnippetString('GetMonth()'),
        documentation: new vscode.MarkdownString(
`
    GetMonth() as Integer

Returns the date/time value's month as an Integer (1=Jan, 12=Dec).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetDayOfMonth',
        insertText: new vscode.SnippetString('GetDayOfMonth()'),
        documentation: new vscode.MarkdownString(
`
    GetDayOfMonth() as Integer

Returns the date/time value's day of the month as an Integer (1-31).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetHours',
        insertText: new vscode.SnippetString('GetHours()'),
        documentation: new vscode.MarkdownString(
`
    GetHours() as Integer

Returns the date/time value's hour within the day as an Integer (0-23).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetMinutes',
        insertText: new vscode.SnippetString('GetMinutes()'),
        documentation: new vscode.MarkdownString(
`
    GetMinutes() as Integer

Returns the date/time value's minute within the hour as an Integer (0-59).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetSeconds',
        insertText: new vscode.SnippetString('GetSeconds()'),
        documentation: new vscode.MarkdownString(
`
    GetSeconds() as Integer

Returns the date/time value's second within the minute as an Integer (0-59).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetMilliseconds',
        insertText: new vscode.SnippetString('GetMilliseconds()'),
        documentation: new vscode.MarkdownString(
`
    GetMilliseconds() as Integer

Returns the date/time value's millisecond within the second as an Integer (0-999).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetLastDayOfMonth',
        insertText: new vscode.SnippetString('GetLastDayOfMonth()'),
        documentation: new vscode.MarkdownString(
`
    GetLastDayOfMonth() as Integer

Returns the date/time value's last day of the month as an Integer (28-31).
`
        )
    },
    {
        kind: CompletionItemKind.Method,
        label: 'GetDayOfWeek',
        insertText: new vscode.SnippetString('GetDayOfWeek()'),
        documentation: new vscode.MarkdownString(
`
    GetDayOfWeek() as Integer

Returns the date/time value's day of week as an Integer (Sunday=0, Monday=1, ..., Saturday=6).

_This function is available in firmware 6.2 or later._
`
        )
    },
];

import * as fs from 'fs';
import * as path from 'path';
import * as vscode from 'vscode';

import { RendezvousHistory } from './RendezvousTracker';

export class RendezvousViewProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

    constructor(context: vscode.ExtensionContext) {
        this.tree = {};

        this.activeFileFilter = noSort;

        // #region Register sorting commands
        let subscriptions = context.subscriptions;
        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.sortRendezvousByFileName', () => {
            this.activeFileFilter = rendezvousFileNameSort;
            this._onDidChangeTreeData.fire();
        }));

        subscriptions.push(vscode.commands.registerCommand('extension.brightscript.clearRendezvousSorting', () => {
            this.activeFileFilter = noSort;
            this._onDidChangeTreeData.fire();
        }));
        // #endregion
    }

    // tslint:disable-next-line:variable-name
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem> = new vscode.EventEmitter<vscode.TreeItem>();
    public readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem> = this._onDidChangeTreeData.event;

    private tree: RendezvousHistory;
    private activeFileFilter: IRendezvousItemSort;
    private activeLineFilter: IRendezvousItemSort; // TODO: Add filters for line details

    public onDidReceiveDebugSessionCustomEvent(e: any) {
        console.log('received event ' + e.event);
        if (e.event === 'BSRendezvousEvent') {

            // What changed?
            // let diff = this.objectDiff(e.body, this.viewedData);

            this.tree = e.body;
            this._onDidChangeTreeData.fire();
        }
    }

    public getChildren(element: RendezvousTreeItem): RendezvousTreeItem[] {
        if (!element) {
            return Object.keys(this.tree).map((key) => {
                if (key !== 'type') {
                    return new RendezvousTreeItem(key, vscode.TreeItemCollapsibleState.Collapsed, null);
                }
            }).sort(this.activeFileFilter);
        } else {
            let treeElement = this.getTreeElement(element);

            let result;
            if (treeElement.type === 'fileInfo') {
                result = Object.keys(treeElement).map((key) => {
                    if (key !== 'type') {
                        let { hitCount, totalTime } = treeElement[key];
                        let label = `line: (${key}) | hitCount: ${hitCount} | totalTime: ${totalTime.toFixed(3)} s | average: ${(totalTime / hitCount).toFixed(3) } s`;
                        return new RendezvousTreeItem(label, vscode.TreeItemCollapsibleState.None, element);
                    }
                });
            }
            return result;
        }
    }

    public getTreeItem(element: RendezvousTreeItem): RendezvousTreeItem {
        return element;
    }

    public getTreeElement(element: RendezvousTreeItem): {[key: string]: any} {
        let objectPath = [];
        let currentObject: {[key: string]: any} = this.tree;

        if (element.parent) {
            // fine the correct object key path to this element
            let currentParent = element;
            while (currentParent.parent) {
                currentParent = currentParent.parent;
                objectPath.unshift(currentParent.label);
            }

            objectPath.forEach((key) => {
                currentObject = currentObject[key];
            });
        }

        // return the contents of the current item
        return currentObject[element.label];
    }

    private objectDiff(obj1, obj2, exclude?) {
        let r = {};

        if (!exclude) {	exclude = []; }

        for (let prop in obj1) {
            if (obj1.hasOwnProperty(prop) && prop !== '__proto__') {
                if (exclude.indexOf(obj1[prop]) === -1) {

                    // check if obj2 has prop
                    if (!obj2.hasOwnProperty(prop)) { r[prop] = obj1[prop]; } else if (obj1[prop] === Object(obj1[prop])) {
                        let difference = this.objectDiff(obj1[prop], obj2[prop]);
                        if (Object.keys(difference).length > 0) { r[prop] = difference; }
                    } else if (obj1[prop] !== obj2[prop]) {
                        if (obj1[prop] === undefined) {
                            r[prop] = 'undefined';
                        }

                        if (obj1[prop] === null) {
                            r[prop] = null;
                        } else if (typeof obj1[prop] === 'function') {
                            r[prop] = 'function';
                        } else if (typeof obj1[prop] === 'object') {
                            r[prop] = 'object';
                        } else {
                            r[prop] = obj1[prop];
                        }
                    }
                }
            }
        }

        return r;
    }
}

export class RendezvousTreeItem extends vscode.TreeItem {

    constructor(
        public readonly label: string,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly parent: RendezvousTreeItem | null
    ) {
        super(label, collapsibleState);
    }

    get tooltip(): string {
        return `${this.label}`;
    }

    // get description(): string {
    //     return this.version;
    // }

    // public iconPath = {
    //     light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
    //     dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
    // };

    // public contextValue = 'dependency';
}

type IRendezvousItemSort = (itemOne: RendezvousTreeItem, itemTwo: RendezvousTreeItem) => number;

const noSort: IRendezvousItemSort = (itemOne: RendezvousTreeItem, itemTwo: RendezvousTreeItem) => {
    return 0;
};
const rendezvousFileNameSort: IRendezvousItemSort = (itemOne: RendezvousTreeItem, itemTwo: RendezvousTreeItem) => {
    if (itemOne.label < itemTwo.label) {
        return -1;
    } else if (itemOne.label > itemTwo.label) {
        return 1;
    } else {
        return 0;
    }
};

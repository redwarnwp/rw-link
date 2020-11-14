import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage("RWLink: Extension active");

    const config = vscode.workspace.getConfiguration("rw-link");
    const rwFolder =
        config.get<any>("folders.redwarn") +
        (config.get<any>("folders.redwarn").endsWith("/") ? "" : "/");

    const rwwFolder =
        config.get<any>("folders.redwarnWeb") +
        (config.get<any>("folders.redwarnWeb").endsWith("/") ? "" : "/");

    let copyLink = vscode.commands.registerCommand("rw-link.copylink", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let path = vscode.workspace.asRelativePath(
                editor.document.fileName
            );
            path = path.replace(rwFolder, "rw:/master/");
            path = path.replace(rwwFolder, "rww:/dev-rw16/");
            let lnum = `#L${editor.selection.start.line + 1}`;
            if (!editor.selection.isSingleLine) {
                lnum += `-${editor.selection.end.line + 1}`;
            }
            vscode.env.clipboard.writeText(`[${path}${lnum}]`);
            vscode.window.showInformationMessage(
                `RWLink: Copied [${path}${lnum}] to clipboard`
            );
        } else {
            vscode.window.showErrorMessage("RWLink: No active editor!");
        }
    });

    context.subscriptions.push(copyLink);

    let parse = vscode.commands.registerCommand(
        "rw-link.parse",
        (input: string) => {
            console.log(
                input ||
                    vscode.window.showInputBox({
                        prompt: "prompt",
                        placeHolder: "placeholder",
                    })
            );
        }
    );

    context.subscriptions.push(parse);
}

// this method is called when your extension is deactivated
export function deactivate() {}

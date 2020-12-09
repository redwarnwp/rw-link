import * as vscode from "vscode";
import { GitExtension } from "./git";

export function activate(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage("RWLink: Extension active");

    const config = vscode.workspace.getConfiguration("RWLink");
    const rwFolder =
        config.get<any>("folders.redwarn") +
        (config.get<any>("folders.redwarn").endsWith("/") ? "" : "/");

    const rwwFolder =
        config.get<any>("folders.redwarnWeb") +
        (config.get<any>("folders.redwarnWeb").endsWith("/") ? "" : "/");
    const rwdFolder =
        config.get<any>("folders.redwarnDiscord") +
        (config.get<any>("folders.redwarnDiscord").endsWith("/") ? "" : "/");
    const swatFolder =
        config.get<any>("folders.swat") +
        (config.get<any>("folders.swat").endsWith("/") ? "" : "/");

    const gitExtension = vscode.extensions.getExtension<GitExtension>(
        "vscode.git"
    )!.exports;
    const git = gitExtension.getAPI(1);

    let copyLink = vscode.commands.registerCommand("rwlink.copylink", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            let path = vscode.workspace.asRelativePath(
                editor.document.fileName
            );
            const commit = git.getRepository(editor.document.uri)!.state.HEAD!
                .commit!;
            if (path.includes(rwFolder)) {
                path = path.replace(rwFolder, `rw:/${commit}/`);
            } else if (path.includes(rwwFolder)) {
                path = path.replace(rwwFolder, `rww:/${commit}/`);
            } else if (path.includes(rwdFolder)) {
                path = path.replace(rwdFolder, `rwd:/${commit}/`);
            } else if (path.includes(swatFolder)) {
                path = path.replace(swatFolder, `swat:/${commit}/`);
            } else {
                const folder = `${
                    vscode.workspace
                        .workspaceFolders![0].uri.path.split("/")
                        .reverse()[0]
                }/`;
                if (folder === rwFolder) {
                    path = `rw:/${commit}/${path}`;
                } else if (folder === rwwFolder) {
                    path = `rww:/${commit}/${path}`;
                } else if (folder === rwdFolder) {
                    path = `rwd:/${commit}/${path}`;
                } else if (folder === swatFolder) {
                    path = `swat:/${commit}/${path}`;
                } else {
                    vscode.window
                        .showErrorMessage(
                            `Cannot parse "${folder}${path}"! Make sure you have set the folder settings correctly!`,
                            "Edit Settings"
                        )
                        .then((action) => {
                            if (action === "Edit Settings") {
                                vscode.commands.executeCommand(
                                    "workbench.action.openSettings",
                                    "@ext:sportzpikachu.rwlink"
                                );
                            }
                        });
                    return;
                }
            }
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

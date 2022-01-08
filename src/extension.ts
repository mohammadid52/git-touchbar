// The module 'vscode' contains the VS Code extensibility API

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  const { commands, window } = vscode;

  //! Enable Git
  const git = commands.registerCommand("git-touchbar.git", () => {
    commands.executeCommand("setContext", "enableGit", true);
  });

  //! Git commit
  const commit = commands.registerCommand("git-touchbar.gitcommit", () => {
    commands.executeCommand("git.commit");
  });

  //! Git push
  const push = commands.registerCommand("git-touchbar.gitpush", () => {
    commands.executeCommand("git.push");
  });

  //! Git pull
  const pull = commands.registerCommand("git-touchbar.gitpull", () => {
    commands.executeCommand("git.pull");
  });

  //! Closing git
  const closeGit = commands.registerCommand("git-touchbar.closegit", () => {
    commands.executeCommand("setContext", "enableGit", false);
  });

  //! Checkout
  const checkout = commands.registerCommand("git-touchbar.checkoutTo", () => {
    commands.executeCommand("git.checkout");
  });
  //! stage all
  const stageAll = commands.registerCommand("git-touchbar.stageAll", () => {
    commands.executeCommand("git.stageAll");
  });

  //! open project
  const openProject = commands.registerCommand(
    "git-touchbar.openProject",
    async () => {
      const port = await window.showInputBox({
        placeHolder: "PORT",
        ignoreFocusOut: true,
        prompt: "Git Touchbar",
        value: "3000",
      });
      vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${port}`));
      commands.executeCommand("setContext", "enableGit", false);
      commands.executeCommand("setContext", "enableExtras", false);
    }
  );

  //! Show Extras
  const showExtras = commands.registerCommand("git-touchbar.showExtras", () => {
    commands.executeCommand("setContext", "enableExtras", true);
  });

  //! Close Extras
  const closeExtras = commands.registerCommand(
    "git-touchbar.closeExtras",
    () => {
      commands.executeCommand("setContext", "enableExtras", false);
    }
  );

  //! Search
  const search = commands.registerCommand("git-touchbar.search", async () => {
    const searchedQuery = await window.showInputBox({
      placeHolder: "Search on google",
      ignoreFocusOut: true,
      prompt: "Git Touchbar",
    });
    if (searchedQuery) {
      window.showInformationMessage(`Searching '${searchedQuery}' on google`);
      setTimeout(() => {
        vscode.env.openExternal(
          vscode.Uri.parse(`https://www.google.com/search?q=${searchedQuery}`)
        );
      }, 500);
    }
  });

  //! console.log
  const logSelected = commands.registerCommand(
    "git-touchbar.logSelected",
    async () => {
      var editor = window.activeTextEditor;
      if (!editor) {
        window.showErrorMessage("No active editor");
        return; // No open text editor
      }

      const selectedText = editor.document.getText(editor.selection);
      commands.executeCommand("setContext", "selectedText", selectedText);
      vscode.env.clipboard.writeText(
        `console.log('${selectedText} => 🚀 => ', ${selectedText})`
      );
      vscode.window.showInformationMessage(
        "Copied. Now paste it wherever you want"
      );
    }
  );

  context.subscriptions.push(
    commit,
    push,
    pull,
    git,
    closeGit,
    checkout,
    stageAll,
    openProject,
    showExtras,
    closeExtras,
    search,
    logSelected
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

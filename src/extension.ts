// The module 'vscode' contains the VS Code extensibility API

import * as vscode from "vscode";

const showInfo = (infoMsg: string) =>
  vscode.window.showInformationMessage(infoMsg);

const MESSAGE = "Hello Mohammad 😀";

export function activate(context: vscode.ExtensionContext) {
  const { commands, window } = vscode;

  const closeGitMenu = () =>
    commands.executeCommand("setContext", "enableGit", false);

  const closeExtrasMenu = () =>
    commands.executeCommand("setContext", "enableExtras", false);

  const openGit = () =>
    commands.executeCommand("setContext", "enableGit", true);

  const openExtras = () =>
    commands.executeCommand("setContext", "enableExtras", true);

  //! Enable Git
  const git = commands.registerCommand("git-touchbar.git", () => {
    closeGitMenu();
    openGit();
  });

  //! Sync Branch
  const syncBranch = commands.registerCommand("git-touchbar.syncBranch", () => {
    commands.executeCommand("git.sync");
    showInfo("Branch synced");
  });

  //! Git commit
  const commit = commands.registerCommand("git-touchbar.gitcommit", () => {
    commands.executeCommand("git.commit");
    showInfo("Changes commited successfully");
  });

  //! Git push
  const push = commands.registerCommand("git-touchbar.gitpush", () => {
    commands.executeCommand("git.push");
    showInfo("Changes pushed successfully");
  });

  //! Git pull
  const pull = commands.registerCommand("git-touchbar.gitpull", () => {
    commands.executeCommand("git.pull");
    showInfo("Changes pulled successfully");
  });

  //! Closing git
  const closeGit = commands.registerCommand("git-touchbar.closegit", () => {
    closeGitMenu();
  });

  //! Checkout
  const checkout = commands.registerCommand("git-touchbar.checkoutTo", () => {
    commands.executeCommand("git.checkout");
  });
  //! stage all
  const stageAll = commands.registerCommand("git-touchbar.stageAll", () => {
    commands.executeCommand("git.stageAll");
    showInfo("Changes Staged");
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
      showInfo("Opening site");
      vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${port}`));
      closeGitMenu();
      closeExtrasMenu();
    }
  );

  //! show message
  const showMessage = commands.registerCommand(
    "git-touchbar.showMessage",
    () => {
      showInfo(MESSAGE);
    }
  );

  //! Show Extras
  const showExtras = commands.registerCommand("git-touchbar.showExtras", () => {
    openExtras();

    closeGitMenu();
  });

  //! Close Extras
  const closeExtras = commands.registerCommand(
    "git-touchbar.closeExtras",
    () => {
      closeExtrasMenu();
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
      showInfo(`Searching '${searchedQuery}' on google`);

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

      showInfo("Copied. Now paste it wherever you want");
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
    logSelected,
    syncBranch,
    showMessage
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

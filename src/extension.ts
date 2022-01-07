// The module 'vscode' contains the VS Code extensibility API

import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
  // Enable Git
  const git = vscode.commands.registerCommand("git-touchbar.git", () => {
    vscode.commands.executeCommand("setContext", "enableGit", true);
  });
  // Git commit
  const commit = vscode.commands.registerCommand(
    "git-touchbar.gitcommit",
    () => {
      vscode.commands.executeCommand("git.commit");
      // vscode.commands.executeCommand("setContext", "enableGit", false);
    }
  );
  /// Git push
  const push = vscode.commands.registerCommand("git-touchbar.gitpush", () => {
    vscode.commands.executeCommand("git.push");
    // vscode.commands.executeCommand("setContext", "enableGit", false);
  });
  /// Git pull
  const pull = vscode.commands.registerCommand("git-touchbar.gitpull", () => {
    vscode.commands.executeCommand("git.pull");
  });
  /// Closing git
  const closeGit = vscode.commands.registerCommand(
    "git-touchbar.closegit",
    () => {
      vscode.commands.executeCommand("setContext", "enableGit", false);
    }
  );

  // Checkout
  const checkout = vscode.commands.registerCommand(
    "git-touchbar.checkoutTo",
    () => {
      vscode.commands.executeCommand("git.checkout");

      // vscode.commands.executeCommand("setContext", "enableGit", false);
    }
  );
  // stage all
  const stageAll = vscode.commands.registerCommand(
    "git-touchbar.stageAll",
    () => {
      vscode.commands.executeCommand("git.stageAll");

      // vscode.commands.executeCommand("setContext", "enableGit", false);
    }
  );

  const PORT = 3000;

  // open project
  const openProject = vscode.commands.registerCommand(
    "git-touchbar.openProject",
    () => {
      vscode.env.openExternal(vscode.Uri.parse(`http://localhost:${PORT}`));
      vscode.commands.executeCommand("setContext", "enableGit", false);
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
    openProject
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}

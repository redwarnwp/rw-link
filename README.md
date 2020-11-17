# RedWarn Link

RedWarn Link is a VS Code helper extension for RedWarn development. It has a feature which allows users to copy the link to the selected line(s) of the current file. The link is compatible with the RedWarn Helper Bot (@RedWarn Helper#7325), meaning you can paste the link directly into the RedWarn discord to generate a GitLab link.

## Installation

To install, download the release from [here.](https://github.com/sportshead/rw-link/releases/latest/download/rwlink.vsix) Then install by running this script:

```bash
cd ~/Downloads
code --install-extension rwlink.vsix
```

Restart your VS Code window (<kbd>Ctrl+Shift+P</kbd>/<kbd>Cmd+Shift+P</kbd> to open command palette, then search for `Reload Window`), and the extension should be loaded.

## Usage

Open the command palette (<kbd>Ctrl+Shift+P</kbd>/<kbd>Cmd+Shift+P</kbd>), and search for `RWLink: Copy Link`. Run the command, and the link will be copied to your system clipboard. You can then paste it into the RedWarn discord. If you select multiple lines, the link will select those lines too. If you don't select anything, it will select the current line,

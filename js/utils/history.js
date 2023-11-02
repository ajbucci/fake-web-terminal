const commandHistory = [];
let historyIndex = -1;

// Function to record a command into the history
export function recordCommand(command) {
  commandHistory.push(command);
  historyIndex = commandHistory.length;
}

// Function to navigate the command history using the up and down arrow keys
export function navigateHistory(e, inputCmd) {
  if (e.key === 'ArrowUp') {
    if (historyIndex > 0) {
      historyIndex--;
      inputCmd.value = commandHistory[historyIndex];
    }
  } else if (e.key === 'ArrowDown') {
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      inputCmd.value = commandHistory[historyIndex];
    } else if (historyIndex === commandHistory.length - 1) {
      historyIndex++;
      inputCmd.value = '';
    }
  }
  inputCmd.selectionStart = inputCmd.selectionEnd = inputCmd.value.length;
}

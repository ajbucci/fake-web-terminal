import {currentCommands, getCommandOutput} from './command.js';
import {
  getMatchingCommands,
  displaySuggestions,
} from '../utils/suggestions.js';
import {recordCommand, navigateHistory} from '../utils/history.js';
import {moveCaret} from '../utils/caret.js';

const terminalDiv = document.querySelector('.terminal');
const outputDiv = document.querySelector('div.output');
const inputCmd = document.getElementById('cmd');
const suggestionsDiv = document.querySelector('.suggestions');
const promptDiv = document.querySelector('.prompt');

let lastTabPressTime = 0;

moveCaret(inputCmd, promptDiv);

terminalDiv.addEventListener('click', function() {
  inputCmd.focus();
  moveCaret(inputCmd, promptDiv);
});

inputCmd.addEventListener('keydown', async function(e) {
  if (e.key === 'Enter') {
    // Record the command into the history
    recordCommand(inputCmd.value);

    // Display the entered command in the output div
    const commandLine = document.createElement('div');
    commandLine.className = 'line';

    const thisPromptDiv = document.createElement('div');
    thisPromptDiv.className = 'prompt';
    thisPromptDiv.innerHTML = promptDiv.innerHTML;
    commandLine.appendChild(thisPromptDiv);

    const commandDiv = document.createElement('div');
    commandDiv.className = 'command';
    commandDiv.textContent = inputCmd.value;
    commandLine.appendChild(commandDiv);

    outputDiv.appendChild(commandLine);
    // Hide the suggestion div
    suggestionsDiv.innerHTML = '';
    // Process and display the command output
    const parts = inputCmd.value.split(' ').filter((part) => part.length > 0);
    const commandName = parts[0];
    const args = parts.slice(1);

    const commandOutput = await getCommandOutput(commandName, args);
    outputDiv.appendChild(commandOutput);

    // Clear the input field for the next command
    inputCmd.value = '';

    // Scroll to the bottom
    terminalDiv.scrollTop = terminalDiv.scrollHeight;
  } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault();
    navigateHistory(e, inputCmd);
  } else if (e.key === 'Tab') {
    e.preventDefault();

    const currentTabPressTime = Date.now();
    if (currentTabPressTime - lastTabPressTime <= 300) {
      const userInput = inputCmd.value;
      const matchingCommands = getMatchingCommands(userInput, currentCommands);
      // Autocomplete suggestion if there is only 1, otherwise display all matching
      if (matchingCommands.length == 1) {
        inputCmd.value = matchingCommands[0].name;
      } else {
        displaySuggestions(matchingCommands, suggestionsDiv);
      }
    }
    lastTabPressTime = currentTabPressTime;
  }
});

inputCmd.addEventListener('input', function(e) {
  moveCaret(inputCmd, promptDiv);
});

suggestionsDiv.addEventListener('click', function(e) {
  if (e.target.classList.contains('suggestion-item')) {
    inputCmd.value = e.target.textContent;
    moveCaret(inputCmd, promptDiv);
    suggestionsDiv.innerHTML = ''; // clear suggestions
    // You might also want to focus on the input after selecting a suggestion
    inputCmd.focus();
  }
});

// Style each suggestion
document.addEventListener('mouseover', function(e) {
  if (e.target.classList.contains('suggestion-item')) {
    // Highlight suggestion on hover
    e.target.style.backgroundColor = 'gray';
  }
});

document.addEventListener('mouseout', function(e) {
  if (e.target.classList.contains('suggestion-item')) {
    // Remove highlight on mouse out
    e.target.style.backgroundColor = '';
  }
});

document.addEventListener('selectionchange', function(e) {
  moveCaret(inputCmd, promptDiv);
});

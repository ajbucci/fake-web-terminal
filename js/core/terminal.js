import { currentCommands, executeCommand } from './command.js';
import { getMatchingCommands, displaySuggestions } from '../utils/suggestions.js';
import { setInputWidth, setInputHeight } from '../utils/resize.js';
import { recordCommand, navigateHistory } from '../utils/history.js';

const terminalDiv = document.querySelector('.terminal');
const outputDiv = document.querySelector('div.output');
const inputCmd = document.getElementById('cmd');
const suggestionsDiv = document.querySelector('.suggestions');
const promptDiv = document.querySelector('.prompt');

let lastTabPressTime = 0;

setInputHeight(inputCmd); // sets the height explicitly to workaround a bug in firefox text input padding

terminalDiv.addEventListener('click', function() {
    inputCmd.focus();
});

inputCmd.addEventListener('input', function() {
    setInputWidth(inputCmd);
});

inputCmd.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // Record the command into the history
        recordCommand(inputCmd.value);

        // Display the entered command in the output div
        const commandLine = document.createElement('div');
        commandLine.className = "line";

        const thisPromptDiv = document.createElement('div');
        thisPromptDiv.className = "prompt";
        thisPromptDiv.innerHTML = promptDiv.innerHTML;
        commandLine.appendChild(thisPromptDiv);

        const commandDiv = document.createElement('div');
        commandDiv.className = 'command';
        commandDiv.textContent = inputCmd.value;
        commandLine.appendChild(commandDiv);

        outputDiv.appendChild(commandLine);

        // Process and display the command output
        const parts = inputCmd.value.split(' ').filter(part => part.length > 0);
        const commandName = parts[0];
        const args = parts.slice(1);

        const output = executeCommand(commandName, args);

        const commandOutput = document.createElement('div');
        commandOutput.textContent = output; 
        outputDiv.appendChild(commandOutput);

        // Clear the input field for the next command
        inputCmd.value = '';
        setInputWidth(inputCmd);

        // Scroll to the bottom
        terminalDiv.scrollTop = terminalDiv.scrollHeight;

    } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        navigateHistory(e, inputCmd, () => setInputWidth(inputCmd));
    } else if (e.key === 'Tab') {
        e.preventDefault();

        const currentTabPressTime = Date.now();
        if (currentTabPressTime - lastTabPressTime <= 300) {
            const userInput = inputCmd.value;
            const matchingCommands = getMatchingCommands(userInput, currentCommands);
            displaySuggestions(matchingCommands, suggestionsDiv);
        }
        lastTabPressTime = currentTabPressTime;
    }
});

suggestionsDiv.addEventListener('click', function(e) {
    if (e.target.classList.contains('suggestion-item')) {
        inputCmd.value = e.target.textContent;
        setInputWidth(inputCmd);
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

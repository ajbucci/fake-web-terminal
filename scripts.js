const terminalDiv = document.querySelector('.terminal');
const outputDiv = document.querySelector('.output');
const inputCmd = document.getElementById('cmd');
const hiddenSpan = document.getElementById('hiddenSpan');

terminalDiv.addEventListener('click', function() {
    inputCmd.focus();
});

inputCmd.addEventListener('input', function() {
    hiddenSpan.textContent = inputCmd.value;
    const width = Math.min(hiddenSpan.offsetWidth, inputCmd.parentElement.offsetWidth - 30);  // 30 can be adjusted based on the max offset you want.
    inputCmd.style.width = width + 'px';
});

inputCmd.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        // Set the text input width to zero so that the fake caret returns to the zero position on Enter
        inputCmd.style.width = '0px'
        // Display the entered command in the output div
        const commandLine = document.createElement('div');
        commandLine.className = "line";
        
        const promptSpan = document.createElement('span');
        promptSpan.className = 'prompt';
        promptSpan.textContent = '>';
        commandLine.appendChild(promptSpan);

        const commandDiv = document.createElement('div');
        commandDiv.className = 'command';
        commandDiv.textContent = inputCmd.value;  // use textContent instead of innerHTML
        commandLine.appendChild(commandDiv);

        outputDiv.appendChild(commandLine);

        // Handle the command logic and display the output
        output = 'Unknown command "' + inputCmd.value + '". Try "help" for a list of commands.'
        if (inputCmd.value == 'help') {
            output = 'Here is a list of commands:'
        }

        const commandOutput = document.createElement('div');
        commandOutput.textContent = output; 
        outputDiv.appendChild(commandOutput);

        // Clear the input field for the next command
        inputCmd.value = '';
    }
});


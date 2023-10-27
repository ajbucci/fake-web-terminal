export function getMatchingCommands(input, commands) {
    return commands.filter(command => command.name.startsWith(input));
}

export function displaySuggestions(matchingCommands, suggestionsDiv) {
    suggestionsDiv.innerHTML = '';
    matchingCommands.forEach(command => {
        const div = document.createElement('div');
        div.textContent = command.name;
        div.classList.add('suggestion-item');
        suggestionsDiv.appendChild(div);
    });
    // append suggestionsBox somewhere appropriate in your UI
}





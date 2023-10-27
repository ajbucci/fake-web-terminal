// Create a temporary span element
const tempSpan = document.createElement('span');

// Set its styles ... should do this based off the CSS... though this will only support monospace...
tempSpan.style.fontFamily = 'monospace';
tempSpan.style.fontSize = '16px';
tempSpan.textContent = 'S';  // Sample text to give it some height

// Ensure it doesn't disrupt your layout visually
tempSpan.style.position = 'absolute';
tempSpan.style.left = '-1000px';
tempSpan.style.top = '-1000px';

// Append to body
document.body.appendChild(tempSpan);

// Measure its height
const unitHeight = getComputedStyle(tempSpan).height;
const unitWidth = getComputedStyle(tempSpan).width;
// Clean up by removing the element
document.body.removeChild(tempSpan);

export function setInputWidth(inputCmd) {
    let width = inputCmd.value.length * parseFloat(unitWidth);
    inputCmd.style.width = width + 'px';
}

export function setInputHeight(inputCmd) {
    inputCmd.style.height = unitHeight;
}

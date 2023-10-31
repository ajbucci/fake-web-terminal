const caret = document.querySelector('.fake-caret');

function setCaretPosition(inputCmd, promptDiv) {
    caret.style.left = 
        inputCmd.selectionStart 
        * parseFloat(getComputedStyle(caret).width) // need to compute the decimal # of pixels to multiply
        + promptDiv.offsetWidth 
        - inputCmd.scrollLeft // need to account for input box text scrolling
        + 'px';
}
function setCaretContent(inputCmd) {
    if (inputCmd.value.length==0 | inputCmd.selectionStart > inputCmd.value.length) {
        caret.textContent = "";
    } else {
        caret.textContent = inputCmd.value[inputCmd.selectionStart];
    }
}
export function moveCaret(inputCmd, promptDiv) {
    setCaretPosition(inputCmd, promptDiv);
    setCaretContent(inputCmd);
}

const form = document.querySelector('[name="verify"]');
const inputs = form.querySelectorAll('.inputs input');

function handleInput(e) {
  // check for data that was inputtted and if there is a next input, focus it
  console.log(e);

  const input = e.target;
  if (input.nextElementSibling && input.value) {
    input.nextElementSibling.focus();

    // 1. Now select the text inside the input field
    input.nextElementSibling.select();
  }

  // 3. Backspace/deleting through the inputs
  else if(e.inputType === 'deleteContentBackward'){
    // An input has been deleted, so focus previous sibling
    if(input.previousElementSibling){
      input.previousElementSibling.focus();
    }
  }
}

function handlePaste(e) {
  const paste = e.clipboardData.getData('text');
  // loop over each input, and populate with the index of that string
  inputs.forEach((input, i) => {
    console.log(input);
    input.value = paste[i] || '';
  });

  // 2. auto submit form if total length of paste data == number of inputs
  if(paste.length === inputs.length) {
    alert('Submit the form');
    form.submit();
  }
}

inputs[0].addEventListener('paste', handlePaste);

form.addEventListener('input', handleInput);

// 1. select the text when the next input is focued
// 2. Auto submit the form if all fields are filled after a paste
// 3. support for backspacing from 1 input to another

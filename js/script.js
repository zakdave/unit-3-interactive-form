// Declaration of variables
const nameInput = document.querySelector('#name');
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');
const selectDesign = document.querySelector('#design');
const designChildren = selectDesign.children;
const selectColor = document.querySelector('#color');
const colorChildren = selectColor.children;

if(colorChildren[0].value === 'tomato') {
    console.log(colorChildren[0].value);
}

//Set focus to the name field when page is loaded
nameInput.focus();

// Working area for job role feature. Hide 'other' field when not selected and show when selected only
otherJobRole.hidden = true; // set to hide by default
jobRoles.addEventListener('click', (e) => {
    const click = e.target;
    if (click.value === 'other' ) {
        otherJobRole.hidden = false;
    } else {
        otherJobRole.hidden = true;
    }
});

// Working area for T-shirt features 
// Add event listener for design menu and deselect all unavailable options, set attribute to selected
selectDesign.addEventListener('click', (e) => {
    const click = e.target;
    if (click.value === 'js puns') {
        for (let i = 0; i < colorChildren.length; i++){
            if (colorChildren[i].value === 'tomato'|| colorChildren[i].value === 'steelblue'|| colorChildren[i].value === 'dimgrey') {
                colorChildren[i].setAttribute('disabled', '');
            }
        }
    } else if (click.value = 'heart js') {
        for (let i = 0; i < colorChildren.length; i++){
            if (colorChildren[i].value === 'cornflowerblue'|| colorChildren[i].value === 'darkslategrey'|| colorChildren[i].value === 'gold') {
                colorChildren[i].setAttribute('disabled', '');
            }
        }
    }
});
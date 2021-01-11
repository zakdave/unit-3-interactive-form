// Declaration of variables
const nameInput = document.querySelector('#name');
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

const selectDesign = document.querySelector('#design');
const designChildren = selectDesign.children;
const selectColor = document.querySelector('#color');
const colorChildren = selectColor.children;

const activitiesFieldset = document.querySelector('#activities');
const activitiesInput = document.querySelectorAll('input[type="checkbox"]');
const pricePTag = activitiesFieldset.querySelector('p');
let totalPrice = 0;
let numActivities = 0;

const paymentMethod = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');

const form = document.querySelector('form');
const emailInput = document.querySelector('#email');
const creditCardNumInput = document.querySelector('#cc-num');
const zipCodeInput = document.querySelector('#zip');
const CVVInput = document.querySelector('#cvv');

if (colorChildren[0].value === 'tomato') {
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
// Add event listener for design menu and deselect all unavailable options, hide color option by default until design is selected
selectColor.hidden = true;
selectDesign.addEventListener('change', (e) => {
    const click = e.target;
    if (click.value === 'js puns') {
        for (let i = 0; i < colorChildren.length; i++){
            if (i === 4|| i === 5|| i === 6) {
                selectColor.hidden = false;
                colorChildren[i].setAttribute('disabled', '');
            } else {
                selectColor.hidden = false;
                colorChildren[i].removeAttribute('disabled');
            }
        }
    } else if (click.value === 'heart js') {
        for (let i = 0; i < colorChildren.length; i++){
            if (i === 1|| i === 2|| i === 3) {
                colorChildren[i].setAttribute('disabled', '');
            } else {
                colorChildren[i].removeAttribute('disabled');
            }
        }
    }
});

// Working area for registering for activities section
activitiesFieldset.addEventListener('change', (e) => {
    const clicked = e.target;
    const cost = +clicked.getAttribute('data-cost');
    if (clicked.checked) {
        totalPrice += cost;
        numActivities++;
    } else if (!clicked.checked) {
        clicked
        totalPrice -= cost;
        numActivities--;
    }
    pricePTag.innerHTML = `Total: $${totalPrice}`;
});

// Working area for payment
paypal.hidden = true;
bitcoin.hidden = true;
paymentMethod.addEventListener('change', (e) => {
    const clicked = e.target;
    if (clicked.value === 'credit-card') {
        creditCard.hidden = false;
        bitcoin.hidden = true;
        paypal.hidden = true;

    } else if (clicked.value === 'paypal') {
        paypal.hidden = false;
        bitcoin.hidden = true;
        creditCard.hidden = true;

    } else if (clicked.value === 'bitcoin') {
        bitcoin.hidden = false;
        paypal.hidden = true;
        creditCard.hidden = true;
    }

});

// Working area for validation
const nameValidator = () => {
    const name = nameInput.value;
    console.log("Name value is: ", `"${name}"`);

    const nameIsValid = name.length > 0;
    console.log(`Name validation test on "${name}" evaluates to ${nameIsValid}`);

    return nameIsValid;
};

const emailValidator = () => {
    const email = emailInput.value;
    console.log("Email value is: ", `"${email}"`);

    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    console.log(`Email validation test on "${email}" evaluates to ${emailIsValid}`);

    return emailIsValid;
};

const activitiesValidator = () => {
    // continue working here
    return nameIsValid;
};

// Add event handler for submit button
form.addEventListener('submit', e => {
    e.preventDefault();

    if (nameValidator()){
        e.preventDefault();
    };
    if (emailValidator()){
        e.preventDefault();
    };
    console.log('Submit works.')
});
// Declaration of variables
const nameInput = document.querySelector('#name');
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');

const selectDesign = document.querySelector('#design');
const designChildren = selectDesign.children;
const selectColor = document.querySelector('#color');
const colorChildren = selectColor.children;

const activitiesFieldset = document.querySelector('#activities');
const activitiesDiv = document.querySelector('#activities-box');
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


//Set focus to the name field when page is loaded and prime payment method
nameInput.focus();


// Working area for job role feature. Hide 'other' field when not selected and show when selected only
otherJobRole.hidden = true; // set to hide by default
jobRoles.addEventListener('click', (e) => {
    const click = e.target;
    if (click.value === 'other') {
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
                selectColor.hidden = false;
                colorChildren[i].setAttribute('disabled', '');
            } else {
                selectColor.hidden = false;
                colorChildren[i].removeAttribute('disabled');
            }
        }
    }
});

// Registering for activities checkboxes
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

// Selecting payments, will only display one option at a time, defaults to credit card
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

// Validations pass and fail functions. Responsible for hints, and accessability features. Pass and fail validations will be called within validators
const validationPass = (element) => {
    element.parentElement.classList.add('valid');
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.style.display = 'none';
};

const validationFail = (element) => {
    element.parentElement.classList.add('not-valid');
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.style.display = 'block';
  };

// Validator functions, determine whether user input is sufficient
const nameValidator = () => {
    const name = nameInput.value;
    const nameIsValid = name.length > 0;
    if (nameIsValid) {
        validationPass(nameInput);
    } else {
        validationFail(nameInput);
    };
    return nameIsValid;
};

const emailValidator = () => {
    const email = emailInput.value;
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    if (emailIsValid) {
        validationPass(emailInput);
    } else {
        validationFail(emailInput);
    };
    return emailIsValid;
};

const activitiesValidator = () => {
    if (numActivities > 0) {
        validationPass(activitiesDiv);
    } else {
        validationFail(activitiesDiv);
    }
    return numActivities > 0;
};

for (let i = 0; i < activitiesInput.length; i++) {
    activitiesInput[i].addEventListener('focus', () => {
        activitiesInput[i].parentElement.classList.add('focus');
    });
    activitiesInput[i].addEventListener('blur', () => {
        activitiesInput[i].parentElement.classList.remove('focus');
    });
};

const cardNumValidator = () => {
    const creditCardNum = creditCardNumInput.value;   
    creditCardIsValid = /^\d{13,16}$/.test(creditCardNum);
    if (creditCardIsValid) {
        validationPass(creditCardNumInput);
    } else {
        validationFail(creditCardNumInput);
    };
    return creditCardIsValid;
};

const zipCodeValidator = () => {
    const zipCode = zipCodeInput.value;
    zipCodeIsValid = /^\d{5}$/.test(zipCode);
    if (zipCodeIsValid) {
        validationPass(zipCodeInput);
    } else {
        validationFail(zipCodeInput);
    };
    return zipCodeIsValid;
};

const CVVValidator = () => {
    const cvv = CVVInput.value;
    cvvIsValid = /^\d{3}$/.test(cvv);
    if (cvvIsValid) {
        validationPass(CVVInput);
    } else {
        validationFail(CVVInput);
    };
    return cvvIsValid;
};

// Event handler for submit button. Displays all errors at once and conditionals check for correct validator use
form.addEventListener('submit', e => {

    if (!nameValidator()) {
        e.preventDefault();
    };
    if (!emailValidator()) {
        e.preventDefault();
    };
    if (!activitiesValidator()) {
        e.preventDefault();
    };
    if ((paymentMethod.value === 'credit-card' || paymentMethod.value === 'select method') && !cardNumValidator()) {
        e.preventDefault();
    };
    if ((paymentMethod.value === 'credit-card' || paymentMethod.value === 'select method') && !zipCodeValidator()) {
        e.preventDefault();
    };
    if ((paymentMethod.value === 'credit-card' || paymentMethod.value === 'select method') && !CVVValidator()) {
        e.preventDefault();
    };
});
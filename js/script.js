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

// Working area for validation, remove console log statements when complete
const validationPass = (element) => {
    element.parentElement.className = 'valid';
    element.parentElement.classList.remove('not-valid');
    element.parentElement.lastElementChild.hidden = true;
};

const validationFail = (element) => {
    element.parentElement.className = 'not-valid';
    element.parentElement.classList.remove('valid');
    element.parentElement.lastElementChild.hidden = false;
  };

const nameValidator = () => {
    const name = nameInput.value;
    console.log("Name value is: ", `"${name}"`);
    const nameIsValid = name.length > 0;
    console.log(`Name validation test on "${name}" evaluates to ${nameIsValid}`);
    if (nameIsValid) {
        validationPass(nameInput);
    } else {
        validationFail(nameInput);
    };
    return nameIsValid;
};

const emailValidator = () => {
    const email = emailInput.value;
    console.log("Email value is: ", `"${email}"`);
    const emailIsValid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
    console.log(`Email validation test on "${email}" evaluates to ${emailIsValid}`);
    if (emailIsValid) {
        validationPass(emailInput);
    } else {
        validationFail(emailInput);
    };
    return emailIsValid;
};

const activitiesValidator = () => {
    if (numActivities > 0) {
        validationPass(document.querySelector('#activities-box'));
    } else {
        validationFail(document.querySelector('#activities-box'));
    }
    return numActivities > 0;
};

const cardNumValidator = () => {
    const creditCardNum = creditCardNumInput.value;   
    creditCardIsValid = /^\d{13,16}$/.test(creditCardNum);
    console.log("cc value is: ", `"${creditCardNum}" and evaluates to ${creditCardIsValid}`);
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
    console.log(`zip is ${zipCode} and zipCodeIsValid returns ${zipCodeIsValid}`);
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
    console.log(`cvv is ${cvv} and cvvIsValid returns ${cvvIsValid}`);
    if (cvvIsValid) {
        validationPass(CVVInput);
    } else {
        validationFail(CVVInput);
    };
    return cvvIsValid;
};

// Event handler for submit button
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
    if (!cardNumValidator()) {
        e.preventDefault();
    };
    if (!zipCodeValidator()) {
        e.preventDefault();
    };
    if (!CVVValidator()) {
        e.preventDefault();
    };
    console.log('Submit works.');
});
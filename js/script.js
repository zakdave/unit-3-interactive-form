//Declaration of variables
const nameField = document.querySelector('#name');
const jobRoles = document.querySelector('#title');
const otherJobRole = document.querySelector('#other-job-role');


otherJobRole.disabled = true;



//Set focus to the name field when page is loaded
nameField.focus();

//Working area for job role feature. Hide 'other' field when not selected and show when selected only
otherJobRole.style.display = 'none'; // set to hide by default
jobRoles.addEventListener('click', (e) => {
    const click = e.target;
    if (click.value === 'other' ) {
        otherJobRole.style.display = 'block';
    } else {
        otherJobRole.style.display = 'none';
    }
});


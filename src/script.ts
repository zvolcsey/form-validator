const form = document.getElementById('form') as HTMLFormElement;
const username = document.getElementById('username') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;
const password = document.getElementById('password') as HTMLInputElement;
const password2 = document.getElementById('password2') as HTMLInputElement;

// Show input error message
const showError = (
    input: HTMLInputElement, 
    message: string
): void => {
    const formControl = input.parentElement as HTMLDivElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    if(small) {
        small.innerText = message;
    }
}

// Show success outline
const showSuccess = (
    input: HTMLInputElement
): void => {
    const formControl = input.parentElement as HTMLDivElement;
    formControl.className = 'form-control success';
}

// Check email is valid
const checkEmail = (
    input: HTMLInputElement
): void => {
    // Source: https://stackoverflow.com/a/46181
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(re.test(input.value)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields
const checkRequired = (inputArr: HTMLInputElement[]): void => {
    inputArr.forEach((input) => {
        if(input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check input length
const checkLength = (
    input: HTMLInputElement, 
    min: number, 
    max: number
): void => {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max + 1} characters`);
    } else  {
        showSuccess(input);
    }
}

// Check passwords match
const checkPasswordMatch = (
    input1: HTMLInputElement,
    input2: HTMLInputElement
): void => {
    if(input1.value != input2.value) {
        showError(input2, 'Passwords do not match');
    } else if(input2.value === '') {
        showError(input2, 'Confirm Password is required');
    } else {
        showSuccess(input2);
    }
}

// Get field name
const getFieldName = (input: HTMLInputElement): string => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// Event listeners

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email)
    checkPasswordMatch(password, password2);
})
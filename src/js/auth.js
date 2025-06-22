import { elements } from './dom.js';
import { validateSignup } from './validation.js';
import { storage } from './storage.js';

// Predefined user account
const predefinedUser = {
    username: 'oblomayu',
    email: 'ifunlycld@gmail.com',
    password: '12345678'
};

// Authentication functions
const handleSignup = (e) => {
    e.preventDefault();
    
    const formData = {
        username: elements.signupForm.username.value,
        email: elements.signupForm.email.value,
        password: elements.signupForm.password.value,
        confirmPassword: elements.signupForm.confirmPassword.value
    };
    
    const errors = validateSignup(formData);
    
    if (Object.keys(errors).length === 0) {
        // In a real app, you would send this to a server
        storage.set('user', formData);
        window.location.href = 'dashboard.html';
    } else {
        // Show errors to user
        console.error('Validation errors:', errors);
    }
};

const handleLogin = (credentials) => {
    if (credentials.username === predefinedUser.username && 
        credentials.password === predefinedUser.password) {
        storage.set('currentUser', predefinedUser);
        return true;
    }
    return false;
};

// Initialize auth forms
if (elements.signupForm) {
    elements.signupForm.addEventListener('submit', handleSignup);
}

export { handleLogin };
const validateSignup = (formData) => {
    const errors = {};
    
    if (!formData.username || formData.username.length < 3) {
        errors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
    }
    
    return errors;
};

export { validateSignup };
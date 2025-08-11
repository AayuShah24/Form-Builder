export const validateFields = (field, value) => {
    if (field.required && (!value || value.toString().trim() === '')) {
        return 'This field is required';
    }
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            return 'Invalid email format';
        }
    }
    if(value && field.type === 'number' && isNaN(value)) {
        return 'Please enter a valid number';
    }
    return null;
}

export const validateForm = (fields, formData) => {
    const newErrors = {};
    fields.forEach(field => {
        const error = validateFields(field, formData[field.id]);
        if (error) {
            newErrors[field.id] = error;
        }
    });
    return newErrors;
}


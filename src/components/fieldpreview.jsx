import { useState } from "react";
import { validateForm } from "../utils/validators";

export default function FieldPreview({ fields }) {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(null);

    const handleChange = (id, value) => {
        setFormData({ ...formData, [id]: value });
        if (errors[id]) {
            setErrors({ ...errors, [id]: null });
        }

    }

    // const validateForm = () => {
    //     const newErrors = {};
    //     fields.forEach(field => {
    //         const value = formData[field.id];

    //         if (field.required && (!value || value === '')) {
    //             newErrors[field.id] = 'This field is required';
    //         }
    //         else if (field.type === 'email' && value) {
    //             const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //             if (!emailRegex.test(value)) {
    //                 newErrors[field.id] = 'Invalid email format';
    //             }
    //         }
    //     });
    //     return newErrors;
    // }

    const renderField = (field) => {
        const value = formData[field.id] || '';
        switch (field.type) {
            case 'select':
                return (
                    <select value={value} onChange={(e) => handleChange(field.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded">
                        <option value="">Select an option</option>
                        {field.options.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                );

            case 'checkbox':
                return (
                    <input checked={value || false} type="checkbox" onChange={(e) => handleChange(field.id, e.target.checked)} className="h-4 w-4" />
                );
            default:
                return (
                    <input value={value} type={field.type} onChange={(e) => handleChange(field.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                );
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm(fields, formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const readableFormat={};
        fields.forEach(field=>{
            const label=field.label || field.id;
            readableFormat[label]=formData[field.id] || '';
        })
        setSubmitted(readableFormat);
        setErrors({});
    }

    return (
        <div>
            {fields.length === 0 ? (
                <p className="text-gray-500">No fields to preview. Add fields in the Form Builder.</p>
            ) : (

                <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {fields.map((field) => (
                            <div key={field.id}>
                                <label className="block mb-1 font-medium">
                                    {field.label}
                                    {field.required && <span className="text-red-500">*</span>}

                                </label>


                                {renderField(field)}
                                {errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]}</p>}
                            </div>
                        ))}
                        <div className="flex gap-3">
                            <button type="submit" className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                                Submit
                            </button>
                        </div>
                    </form>
                    {submitted && (
                        <div className="mt-4 bg-green-50 border  border-green-200 p-4 rounded">
                            <h3 className="text-green-500 font-semibold">
                                Form submitted successfully!
                            </h3>
                            <div className="mt-2 bg-white rounded">
                                <pre className="text-sm">
                                    {JSON.stringify(submitted, null, 2)}
                                </pre>
                                </div>
                        </div>
                    )}
                </div>
            )}

        </div>
    );
}
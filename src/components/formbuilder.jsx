import { use, useEffect, useState } from "react";
import FieldList from "./fieldlist";
import FieldPreview from "./fieldpreview";

export default function FormBuilder() {
    const [fields, setFields] = useState([]);

    const addField = () => {
        const newField = {
            id: Date.now(),
            label: "",
            type: "text",
            required: false,
            options: []
        };
        setFields([...fields, newField]);
    }

    const updateField = (id, key, value) => {
        setFields(fields.map(field => field.id === id ? { ...field, [key]: value } : field));
    };

    const removeField = (id) => {
        setFields(fields.filter(field => field.id !== id));
    }

    useEffect(() => {
        const savedFields = localStorage.getItem("formFields");
        if (savedFields) {
            try {
                setFields(JSON.parse(savedFields));
            } catch (error) {
                console.log(error)
            }
        }
    }, []);


    useEffect(() => {
        if (fields.length > 0 ) {
            localStorage.setItem("formFields", JSON.stringify(fields));
        }
    }, [fields]);
    return (
        <div className="flex flex-col lg:flex-row gap-6 p-6">
            <div className="w-1/2 border border-gray-300 p-4 rounded-lg bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Form Builder</h2>
                <FieldList fields={fields} onAddField={addField} onUpdateField={updateField} onRemoveField={removeField} />
            </div>
            <div className="w-1/2 border border-gray-300 p-4 rounded-lg bg-white">
                <h2 className="text-xl font-semibold text-gray-800">Live Preview</h2>
                <FieldPreview fields={fields} />
            </div>

        </div>
    );
}
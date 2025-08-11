import { useState } from "react";

export default function FieldList({ fields, onAddField, onUpdateField, onRemoveField }) {
    const [newOption, setNewOption] = useState({});

    const addOption = (fieldId) => {
        const optionText = newOption[fieldId];
        if (optionText && optionText.trim()) {
            const field = fields.find(f => f.id === fieldId);
            const updatedOptions = [...(field.options || []), optionText.trim()];
            onUpdateField(fieldId, 'options', updatedOptions);
            setNewOption({ ...newOption, [fieldId]: '' });
        }
    }

    return (
        <div>
            <button onClick={onAddField} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                + Add Field
            </button>
            {fields.length === 0 ? (
                <p className="text-gray-500">No fields added yet. Click "Add Field" to start.</p>
            ) : (

                <div className="space-y-4">
                    {fields.map((field,index) => (
                        <div key={field.id} className="border rounded p-4">
                            <div className="flex items-center justify-between mb-2">
                                <span>Field {index+1}</span>
                                <button onClick={() => onRemoveField(field.id)}
                                    className="text-red-500 hover:text-red-700">
                                    Remove Field
                                </button>
                            </div>
                            <div className="space-y-2">
                                <input type="text" value={field.label} placeholder="Field label" onChange={(e) => onUpdateField(field.id, 'label', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded" />
                                <select value={field.type} className="w-full px-3 py-2 border border-gray-300 rounded" onChange={(e) => onUpdateField(field.id, 'type', e.target.value)}>
                                    <option value="text">Text</option>
                                    <option value="email">Email</option>
                                    <option value="number">Number</option>
                                    <option value="date">Date</option>
                                    <option value="select">Dropdown</option>
                                    <option value="checkbox">Checkbox</option>
                                </select>

                                {field.type === 'select' && (
                                    <div className="border-t pt-2">
                                        <label className="text-sm font-medium">
                                            Dropdown Options
                                        </label>

                                        <div className="flex gap-2 mb-2">
                                            <input
                                                type="text"
                                                value={newOption[field.id] || ''}
                                                placeholder="Add option"
                                                className="flex-1 px-2 border rounded"
                                                onChange={((e) => setNewOption({ ...newOption, [field.id]: e.target.value }))}
                                            />
                                            <button type="button" onClick={() => addOption(field.id)} className="bg-green-500 text-white px-3 rounded py-1 text-sm">
                                                Add Option
                                            </button>
                                        </div>

                                        {(!field.options || field.options.length === 0) && (
                                            <p className="text-sm text-gray-500 mt-2">
                                                Add at least 1 option for the dropdown
                                            </p>
                                        )}

                                        <div className="space-y-1">
                                            {field.options.map((option, id) => (
                                                <div key={id} className="flex justify-between items-center bg-gray-50 rounded p-2">
                                                    <span className="text-sm">{option}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <label className="gap-2 flex items-center">
                                    <input type="checkbox" checked={field.required} onChange={(e) => onUpdateField(field.id, 'required', e.target.checked)}/>
                                    Required Field
                                </label>
                            </div>
                        </div>
                    ))}



                </div>
            )}
        </div>
    );
}
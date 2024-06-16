import React, { useState } from 'react';

interface DynamicFormProps<T> {
  schema: {
    [K in keyof T]: {
      label: string;
      type: 'text' | 'number' | 'select' | 'date' | 'time' | 'checkbox';
      options?: { value: string; label: string }[]; // Optional for select types
    }
  };
  onSubmit: (data: T) => void;
  onChange?: (key: keyof T, value: any) => void; // Optional change handler
}

const DynamicForm = <T,>({ schema, onSubmit, onChange }: DynamicFormProps<T>) => {
  const [formData, setFormData] = useState({} as T);

  const handleChange = (key: keyof T, value: any) => {
    setFormData({ ...formData, [key]: value });
    onChange?.(key, value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      {Object.keys(schema).map((key) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {schema[key as keyof T].label}
          </label>
          {schema[key as keyof T].type === 'select' ? (
            <select
              value={(formData as any)[key] || ''}
              onChange={(e) => handleChange(key as keyof T, e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {schema[key as keyof T].options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : schema[key as keyof T].type === 'checkbox' ? (
            schema[key as keyof T].options?.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={`${key}-${option.value}`}
                  checked={(formData as any)[key]?.includes(option.value)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const currentValue = (formData as any)[key] || [];
                    let updatedValue: string[] = [];
                    if (checked) {
                      updatedValue = [...currentValue, option.value];
                    } else {
                      updatedValue = currentValue.filter((v: string) => v !== option.value);
                    }
                    handleChange(key as keyof T, updatedValue);
                  }}
                  className="mr-2"
                />
                <label htmlFor={`${key}-${option.value}`}>{option.label}</label>
              </div>
            ))
          ) : (
            <input
              type={schema[key as keyof T].type}
              value={(formData as any)[key] || ''}
              onChange={(e) => handleChange(key as keyof T, e.target.value)}
              className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
        Adicionar
      </button>
    </form>
  );
};

export default DynamicForm;

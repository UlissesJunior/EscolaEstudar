import React, { useState } from 'react';

interface DynamicFormProps<T> {
  schema: { [K in keyof T]: string };
  onSubmit: (data: T) => void;
}

const DynamicForm = <T,>({ schema, onSubmit }: DynamicFormProps<T>) => {
  const [formData, setFormData] = useState({} as T);

  const handleChange = (key: keyof T, value: string) => {
    setFormData({ ...formData, [key]: value });
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
            {schema[key as keyof T]}
          </label>
          <input
            type="text"
            value={(formData as any)[key] || ''}
            onChange={(e) => handleChange(key as keyof T, e.target.value)}
            className="border p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200">
        Adicionar
      </button>
    </form>
  );
};

export default DynamicForm;

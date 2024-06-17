import React, { useState, useEffect } from 'react';

interface EditDialogProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T & { id: number }) => void;
  schema: {
    [K in keyof T]: {
      label: string;
      type: 'text' | 'number' | 'select' | 'date' | 'time' | 'checkbox';
      options?: { value: string; label: string }[];
      isObject?: boolean; // Indicate if the select should store an object
    }
  };
  initialData: T & { id: number };
}

const EditDialog = <T,>({ isOpen, onClose, onSave, schema, initialData }: EditDialogProps<T>) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen, initialData]);

  const handleChange = (key: keyof T, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleCheckboxChange = (key: keyof T, value: any) => {
    const currentValue = (formData as any)[key] || [];
    let updatedValue: any[] = [];
    if (currentValue.some((item: any) => item.id === value.id)) {
      updatedValue = currentValue.filter((item: any) => item.id !== value.id);
    } else {
      updatedValue = [...currentValue, value];
    }
    setFormData({ ...formData, [key]: updatedValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Editar</h2>
        <form onSubmit={handleSubmit}>
          {Object.keys(schema).map((key) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {schema[key as keyof T].label}
              </label>
              {schema[key as keyof T].type === 'select' ? (
                <select
                  value={schema[key as keyof T].isObject ? (formData as any)[key]?.id?.toString() || '' : (formData as any)[key] || ''}
                  onChange={(e) => schema[key as keyof T].isObject
                    ? handleChange(key as keyof T, { id: parseInt(e.target.value), nome: e.target.options[e.target.selectedIndex].text })
                    : handleChange(key as keyof T, e.target.value)}
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
                      checked={(formData as any)[key]?.some((item: any) => item.id.toString() === option.value)}
                      onChange={() => handleCheckboxChange(key as keyof T, { id: parseInt(option.value), nome: option.label })}
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600 transition duration-200"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDialog;

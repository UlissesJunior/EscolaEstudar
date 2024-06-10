import React, { useState, useEffect } from 'react';
import CustomModal from '../components/CustomModal';

interface EditDialogProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: T & { id: number }) => void;
  schema: { [K in keyof T]: string };
  initialData: T & { id: number };
}

const EditDialog = <T,>({ isOpen, onClose, onSave, schema, initialData }: EditDialogProps<T>) => {
  const [formData, setFormData] = useState<T & { id: number }>(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (key: keyof T, value: string) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <CustomModal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-semibold mb-4">Editar</h2>
      <form onSubmit={handleSubmit}>
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
    </CustomModal>
  );
};

export default EditDialog;

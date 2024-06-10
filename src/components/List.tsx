import React from 'react';

interface ListProps<T> {
  data: T[];
  onDelete: (id: number) => void;
  onEdit: (item: T) => void;
}

const List = <T extends { id: number }>({ data, onDelete, onEdit }: ListProps<T>) => {
  return (
    <div>
      {data.map((item) => (
        <div key={item.id} className="border p-4 mb-2 rounded-md shadow-sm flex justify-between items-center">
          <div>
            {Object.entries(item).map(([key, value]) => (
              <div key={key}>
                <strong>{key}:</strong> {value}
              </div>
            ))}
          </div>
          <div>
            <button
              onClick={() => onEdit(item)}
              className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-yellow-600 transition duration-200"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition duration-200"
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;

interface ListProps<T> {
  data: T[];
  onDelete?: (id: number) => void;
  onEdit?: (item: T) => void;
  onInfo?: (item: T) => void;
  onNotes?: (item: T) => void; // Adicionei essa propriedade aqui
  schema: { [K in keyof T]: { label: string } };
}

const List = <T extends { id: number }>({
  data,
  onDelete,
  onEdit,
  onInfo,
  onNotes, // Adicionei essa propriedade aqui
  schema,
}: ListProps<T>) => {
  return (
    <div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {Object.keys(schema).map((key) => (
              <th
                key={key}
                className="py-2 px-4 border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
              >
                {schema[key as keyof T].label}
              </th>
            ))}
            <th className="py-2 px-4 border-b border-gray-200"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {Object.keys(schema).map((key) => (
                <td key={key} className="py-2 px-4 border-b border-gray-200">
                  {(item as any)[key]}
                </td>
              ))}
              <td className="py-2 px-4 border-b border-gray-200">
                {onInfo && (
                  <button
                    onClick={() => onInfo(item)}
                    className="bg-blue-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-blue-700 transition duration-200"
                  >
                    Info
                  </button>
                )}
                {onNotes && (
                  <button
                    onClick={() => onNotes(item)} // Corrigindo para passar o item correto
                    className="bg-green-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-green-700 transition duration-200"
                  >
                    Lançar Notas
                  </button>
                )}
                {onEdit && (
                  <button
                    onClick={() => onEdit(item)}
                    className="bg-yellow-500 text-white py-1 px-2 rounded-md mr-2 hover:bg-yellow-700 transition duration-200"
                  >
                    Editar
                  </button>
                )}
                {onDelete && (
                  <button
                    onClick={() => onDelete(item.id)}
                    className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Deletar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;

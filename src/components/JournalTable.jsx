import { useMemo, useState } from 'react';
import { useTable, useCellEditing } from '@tanstack/react-table'; // For editable cells

export default function JournalTable({ journals, onUpdate }) {
  // State to track edited data
  const [editedData, setEditedData] = useState([]);

  // Memoize columns
  const columns = useMemo(() => [
    { accessorKey: 'no', header: 'No', enableEditing: false },
    { accessorKey: 'studentName', header: 'Ism', enableEditing: false },
    // Dynamically add date columns (1 to 20 based on your image)
    ...Array.from({ length: 20 }, (_, i) => ({
      accessorKey: `date${i + 1}`,
      header: (i + 1).toString(),
      cell: ({ getValue, row }) => (
        <input
          value={getValue() || ''}
          onChange={(e) => {
            const newValue = e.target.value;
            const updatedRow = { ...row.original, [`date${i + 1}`]: newValue };
            const updatedRows = editedData.map((r) =>
              r.no === updatedRow.no ? updatedRow : r
            );
            setEditedData(updatedRows.length ? updatedRows : [...editedData, updatedRow]);
          }}
          className="w-8 text-center border p-1"
        />
      ),
    })),
    {
      accessorKey: 'summa',
      header: 'Summa',
      cell: ({ row }) => {
        const marks = Object.values(row.original)
          .filter((key) => key && key.match(/date\d+/))
          .filter((mark) => mark === '+').length;
        return marks;
      },
      enableEditing: false,
    },
  ], [editedData]);

  // Memoize data
  const data = useMemo(() => {
    if (!journals || !Array.isArray(journals)) return [];
    return journals.flatMap((j) =>
      j.students.map((s, idx) => {
        const row = { no: idx + 1, studentName: s.name, summa: 0 };
        // Initialize dates with existing marks or empty
        for (let i = 1; i <= 20; i++) {
          row[`date${i}`] = s[`date${i}`] || '';
        }
        return row;
      })
    );
  }, [journals]);

  // Initialize table with hooks
  const table = useTable(
    {
      columns,
      data,
      initialState: { pageSize: data.length },
    },
    useCellEditing
  );

  // Handle save action
  const handleSave = () => {
    if (onUpdate && editedData.length > 0) {
      onUpdate(editedData); // Pass edited data to parent for Firebase update
      setEditedData([]); // Clear edited state after save
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4">Dars Jurnali</h3>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            {table.getHeaderGroups().map((group) =>
              group.headers.map((header) => (
                <th
                  key={header.id}
                  className="border p-2 text-center"
                >
                  {header.renderHeader()}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border p-2 text-center">
                  {cell.renderCell()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSave}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={editedData.length === 0}
      >
        Saqlash
      </button>
    </div>
  );
}
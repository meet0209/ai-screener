import type { ReactNode } from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export const DataTable = <T extends Record<string, any>>({ columns, data }: DataTableProps<T>) => {
  return (
    <table className="datatable">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.header}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx}>
            {columns.map((column) => (
              <td key={column.header}>
                {column.render ? column.render(row[column.accessor], row) : String(row[column.accessor])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

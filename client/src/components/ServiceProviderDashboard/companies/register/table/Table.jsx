import React from 'react';
// import PropTypes from 'prop-types';

const Table = ({ data, columns, onRowClick }) => {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={() => onRowClick && onRowClick(row)}
              className={`${onRowClick ? 'hover:bg-gray-50 cursor-pointer' : ''}`}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                  {column.cell 
                    ? column.cell(row[column.accessor], row)
                    : <div className="text-sm text-gray-900">{row[column.accessor]}</div>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Table.propTypes = {
//   data: PropTypes.array.isRequired,
//   columns: PropTypes.arrayOf(
//     PropTypes.shape({
//       header: PropTypes.string.isRequired,
//       accessor: PropTypes.string.isRequired,
//       cell: PropTypes.func
//     })
//   ).isRequired,
//   onRowClick: PropTypes.func
// };

export default Table;
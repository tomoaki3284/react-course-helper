import React from "react";
import { useTable } from 'react-table'

function CourseSectionTable({ courseSections }) {
  console.log(courseSections)
  const data = React.useMemo(
    () => courseSections
  )

  const columns = React.useMemo(
    () => [
      {
        Header: 'CRN',
        accessor: 'courseCRN', // accessor is the "key" in the data
      },
      {
        Header: 'Professor',
        accessor: 'faculty',
      },
      {
        Header: 'Time',
        accessor: 'timeContent',
      },
      {
        Header: 'Room',
        accessor: 'room',
      },
      {
        Header: 'Credit',
        accessor: 'credit',
      },
    ],
    []
  )

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  )
}

function Table({ columns, data }) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
  })

  // Render the UI for your table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default CourseSectionTable;
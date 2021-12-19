import React from "react";
import { useTable } from 'react-table'
import '../../css/courseSectionTable.css';  
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CourseSectionTable = ({ courseSections, handleAddCourse }) => {
  const data = React.useMemo(
    () => courseSections, [courseSections]
  )

  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: 'addButton', // It needs an ID
        Cell: ({ row }) => (
          <AddButton 
            alt='course-add-button'
            handleAddCourse={handleAddCourse}
            course={data[row.id]}
          />
        ),
      },
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
    <div className='table-container'>
      <Table columns={columns} data={data} />
    </div>
  )
}

function AddButton({ handleAddCourse, course }){
  const notify = () => toast.success("Class Added!");
  const notifyNegative = () => toast.error("Class is already added!");

  return (
    <div>
      <img onClick={() => {
        let added = handleAddCourse(course);
        if (added) {
          notify();
        } else {
          notifyNegative();
        }
      }} className='course-add-button'/>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        type="success"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

const Table = ({ columns, data }) => {
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
      <thead className="table-header">
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
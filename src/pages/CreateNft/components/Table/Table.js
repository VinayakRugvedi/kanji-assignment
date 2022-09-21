import {useMemo} from "react";
import { useTable } from "react-table";

import {
    Label,
    Avatar
} from "components";
import {nftItems} from "utils";
import {LabelTypes} from "types";
import "./Table.css";

const Table = () => {
  const data = useMemo(
    () => nftItems, []
  );

  // TIP: We can transform the data as per our needs and get rid of "Cell" property
  // TIP: We can also have a utility which generates/returns the columns for us
  const columns = useMemo(
    () => [
      {
        Header: "ITEMS",
        accessor: "name",
        Cell: ({row: {original}}) => {
            return (
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}
                >
                    <div style={{marginRight: "1rem"}}><Avatar imageUrl={original.imageUrl} alt={original.name} /></div>
                    <p>{original.name}</p>
                </div>
            );
        }
      },
      {
        Header: "PROPERTIES",
        accessor: "propertyNames",
        Cell: ({row: {original}}) => {
            let propertyNames = Object.keys(original.properties);
            const transformedNames = [];
            for (let name of propertyNames) {
                transformedNames.push(name[0].toUpperCase() + name.slice(1, name.length))
            }

            return (
                <>
                    {
                        transformedNames.length ?
                        transformedNames.join(" | ") :
                        <span style={{color: "rgba(0, 0, 0, 0.6"}}>None</span>
                    }
                </>
            );
        }
      },
      {
        Header: "VALUES",
        accessor: "propertyValues",
        Cell: ({row: {original}}) => {
            let values = Object.values(original.properties);
            const transformedValues = [];
            for (let value of values) {
                for (let item of value) {
                    transformedValues.push(item[0].toUpperCase() + item.slice(1, item.length))
                }
            }

            return (
                <>
                    {
                        transformedValues.length ?
                        transformedValues.join(" | ") :
                        <span style={{color: "rgba(0, 0, 0, 0.6"}}>None</span>
                    }
                </>
            );
        }
      },
      {
        Header: "STATUS",
        accessor: "statusString",
        Cell: ({row: {original}}) => (
            <Label type={original.isComplete ? LabelTypes.Success : LabelTypes.Failure}>{original.statusString}</Label>
        )
      }
    ], []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{}} className="table-container">
      <thead>
        {headerGroups.map((headerGroup, index) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                style={{}}
              >
                {index === 0 && "Hello"}
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                    return (
                    <td
                        {...cell.getCellProps()}
                        style={{}}
                    >
                        {cell.render("Cell")}
                    </td>
                    );
                })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;

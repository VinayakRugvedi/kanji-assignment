import {useMemo} from "react";
import { useTable, useSortBy } from "react-table";
import PropTypes from "prop-types";

import {
    Label,
    Avatar,
    InputCheckbox
} from "components";
import {LabelTypes} from "types";
import "./Table.css";

const propTypes = {
    itemsMapping: PropTypes.object.isRequired,
    handleItemSelection: PropTypes.func.isRequired,
    selectedItemsMapping: PropTypes.object.isRequired
};

const Table = ({
    itemsMapping,
    handleItemSelection,
    selectedItemsMapping
}) => {
  const data = useMemo(() => {
    const dataItems = [];
    for (let item in itemsMapping) {
        dataItems.push(itemsMapping[item]);
    }
    return dataItems;
  }, [itemsMapping]);

  // TIP: We can transform the data as per our needs and get rid of "Cell" property
  // TIP: We can also have a utility which generates/returns the columns for us
  const columns = useMemo(
    () => [
      {
        Header: "ITEMS",
        accessor: "name",
        Cell: ({row: {original}}) => {
            const isItemSelected = selectedItemsMapping[original.id] ? true : false;
            return (
                <div style={{
                    display: "flex",
                    alignItems: "center"
                }}
                >
                    <div
                        className={`name-checkbox-wrapper ${isItemSelected ? "visibility-visible" : ""}`}
                        style={{marginRight: "0.7rem"}}
                    >
                        <InputCheckbox checked={isItemSelected} />
                    </div>
                    <div style={{marginRight: "1rem"}}><Avatar imageUrl={original.imageUrl} alt={original.name} /></div>
                    <p>{original.name}</p>
                </div>
            );
        }
      },
      {
        Header: "PROPERTIES",
        accessor: "propertyNames",
        disableSortBy: true,
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
        disableSortBy: true,
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
    ], [selectedItemsMapping]
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
      {
        columns,
        data
      },
      useSortBy
    );

  return (
    <table {...getTableProps()} style={{}} className="table-container">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {
                headerGroup.headers.map((column, index) => (
                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                        {
                            index === 0 ? (
                                <div
                                    style={{display: "flex", alignItems: "center"}}
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        handleItemSelection();
                                    }}
                                >
                                    <InputCheckbox style={{marginRight: "0.8rem"}} />
                                    {column.render("Header")}
                                </div>
                            ) : column.render("Header")}
                    </th>
                ))
            }
          </tr>
        ))}
      </thead>

      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);

          return (
            <tr
                {...row.getRowProps()}
                onClick={() => handleItemSelection(row.original)}
            >
                {row.cells.map((cell) => {
                    return (
                    <td {...cell.getCellProps()}>
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

Table.propTypes = propTypes;

export default Table;

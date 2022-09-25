import {useMemo} from "react";
import { useTable, useSortBy } from "react-table";
import PropTypes from "prop-types";
import {
    FaSort,
    FaSortUp,
    FaSortDown
 } from "react-icons/fa";

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

  const isAllItemsSelected = Object.keys(selectedItemsMapping).length === Object.keys(itemsMapping).length;

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
            return (
                <>
                    {
                        original.propertyNamesString.length ?
                        original.propertyNamesString :
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
            return (
                <>
                    {
                        original.propertyValuesString.length ?
                        original.propertyValuesString :
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
                                    style={{display: "inline-flex", alignItems: "center"}}
                                    onClick={(event) => {
                                        let isColumnNameClicked = false;
                                        if ("data-column-name" in event.target.attributes) {
                                            isColumnNameClicked = true;
                                        }
                                        !isColumnNameClicked && event.stopPropagation();
                                        !isColumnNameClicked && handleItemSelection();
                                    }}
                                    role="button"
                                >
                                    <InputCheckbox
                                        style={{marginRight: "0.8rem"}}
                                        checked={isAllItemsSelected}
                                    />
                                    <span data-column-name>{column.render("Header")}</span>
                                    <span className="sort-icons-container">
                                        {
                                            column.isSorted ?
                                                column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : 
                                                <FaSort />
                                        }
                                    </span>
                                </div>
                            ) : (
                                <span>
                                    {column.render("Header")}
                                    {
                                        column.canSort && (
                                            <span className="sort-icons-container">
                                                {
                                                    column.isSorted ?
                                                        column.isSortedDesc ? <FaSortDown /> : <FaSortUp /> : 
                                                        <FaSort />
                                                }
                                            </span>
                                        )
                                    }
                                </span>
                            )
                        }
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
                role="button"
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

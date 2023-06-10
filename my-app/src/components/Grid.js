import React, { useState } from 'react';
import {
  SortingState, EditingState, PagingState, SummaryState,
  IntegratedPaging, IntegratedSorting, IntegratedSummary,
} from '@devexpress/dx-react-grid';
import {
  Grid,
  Table, TableHeaderRow, TableEditRow, TableEditColumn,
  PagingPanel, DragDropProvider, TableColumnReordering,
  TableFixedColumns, TableSummaryRow,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled } from '@mui/material/styles';
import { SelectTypeProvider } from "./SelectTypeProvider"



const PREFIX = 'Demo';

const classes = {
  lookupEditCell: `${PREFIX}-lookupEditCell`,
  dialog: `${PREFIX}-dialog`,
  inputRoot: `${PREFIX}-inputRoot`,
  selectMenu: `${PREFIX}-selectMenu`,
};
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${classes.lookupEditCell}`]: {
    padding: theme.spacing(1),
  },
  [`& .${classes.dialog}`]: {
    width: 'calc(100% - 16px)',
  },
  [`& .${classes.inputRoot}`]: {
    width: '100%',
  },
  [`& .${classes.selectMenu}`]: {
    position: 'absolute !important',
  },
}));

const AddButton = ({ onExecute }) => (
  <div style={{ textAlign: 'center' }}>
    <Button
      color="primary"
      onClick={onExecute}
      title="Craear nueva fila"
    >
      Nuevo
    </Button>
  </div>
);

const EditButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Editar row" size="large">
    <EditIcon />
  </IconButton>
);

const DeleteButton = ({ onExecute }) => (
  <IconButton
    onClick={() => {
      // eslint-disable-next-line
      if (window.confirm('Esta seguro de eliminar esta fila?')) {
        onExecute();
      }
    }}
    title="Eliminar Fila"
    size="large"
  >
    <DeleteIcon />
  </IconButton>
);

const CommitButton = ({ onExecute }) => (
  <IconButton onClick={onExecute} title="Save changes" size="large">
    <SaveIcon />
  </IconButton>
);

const CancelButton = ({ onExecute }) => (
  <IconButton color="secondary" onClick={onExecute} title="Cancel changes" size="large">
    <CancelIcon />
  </IconButton>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

const Command = ({ id, onExecute }) => {
  const CommandButton = commandComponents[id];
  return (
    <CommandButton
      onExecute={onExecute}
    />
  );
};


const Cell = ({ onClick, ...restProps }) => {
  const { column } = restProps;
  if (!column.isFocusable) {
    return <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />;
  }
  return <Table.Cell {...restProps} />;
};

const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};

const getRowId = row => row.id;

export default ({ student, course, record, input , deleteRegister}) => {
  const [columns] = useState([
    { name: 'idEstudiante', title: 'Estudiante' },
    { name: 'idCurso', title: 'Curso' },
    { name: 'fechaRegistro', title: 'Fecha de Registro' },
  ]);

  const rows = input.value
    ? typeof input.value === "string" || input.value instanceof String
      ? JSON.parse(input.value)
      : Array.isArray(input.value)
      ? input.value
      : []
    : [];
  const globalSalesValues = {
    idCurso: course,
    idEstudiante: student,

  }



const [errors, setErrors] = useState({});
const [tableColumnExtensions] = useState([
  { columnName: 'idEstudiante', width: 200 },
  { columnName: 'idCurso', width: 180 },
]);
const [sorting, getSorting] = useState([]);
const [editingRowIds, getEditingRowIds] = useState([]);
const [addedRows, setAddedRows] = useState([]);
const [rowChanges, setRowChanges] = useState({});
const [currentPage, setCurrentPage] = useState(0);
const [pageSize, setPageSize] = useState(0);
const [pageSizes] = useState([5, 10, 0]);
const [columnOrder, setColumnOrder] = useState(['idEstudiante', 'idCurso', 'fechaRegistro']);
const [currencyColumns] = useState(['amount']);
const [percentColumns] = useState(['discount']);
const [leftFixedColumns] = useState([TableEditColumn.COLUMN_TYPE]);
const [totalSummaryItems] = useState([
  { columnName: 'discount', type: 'avg' },
  { columnName: 'amount', type: 'sum' },
]);

const changeAddedRows = value => setAddedRows(
  value.map(row => (Object.keys(row).length ? row : {
    idEstudiante: 0,
    idCurso: 0,
    fechaRegistro: new Date().toISOString().toString().slice(0, 10),
  })),
);

const deleteRows = (deletedIds) => {
  console.log(deletedIds)
  const rowsForDelete = rows.slice();
  deletedIds.forEach((rowId) => {
    const index = rowsForDelete.findIndex(row => row.id === rowId);
    if (index > -1) {
      rowsForDelete.splice(index, 1);
    }
  });
  return rowsForDelete;
};

const commitChanges = ({ added, changed, deleted }) => {
  let newRows;

  if (added) {
    const startingAddedId =
      rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
    newRows = [
      ...rows,
      ...added.map((row, index) => ({
        id: startingAddedId + index,
        ...row,
      })),
    ];
  }
  if (changed) {
    newRows = rows.map((row) =>
      changed[row.id] ? { ...row, ...changed[row.id] } : row
    );
  }

  if (deleted) {
    const deletedSet = new Set(deleted);
    newRows = rows.filter((row) => !deletedSet.has(row.id));
    deleteRegister(newRows)
  }
    input.onChange(newRows);

};


const changeRowChanges = (value) => {
  if (Object.entries(value).length === 0 && value.constructor === Object) {
    setErrors({});
    return;
  }

  const id = editingRowIds[0];

  const row = {
    ...rows[id],
    ...value[id],
  };

  const errors = {};//gridValidate === undefined ? {} : gridValidate(row);
  setErrors(errors);

  setRowChanges(value);
};

return (
  <Paper>
    <Grid
      rows={rows}
      columns={columns}
      getRowId={getRowId}
    >
      <SortingState
        sorting={sorting}
        onSortingChange={getSorting}
      />
      <PagingState
        currentPage={currentPage}
        onCurrentPageChange={setCurrentPage}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
      <EditingState
        editingRowIds={editingRowIds}
        onEditingRowIdsChange={getEditingRowIds}
        rowChanges={rowChanges}
        onRowChangesChange={changeRowChanges}
        addedRows={addedRows}
        onAddedRowsChange={changeAddedRows}
        onCommitChanges={commitChanges}
      />
      <SummaryState
        totalItems={totalSummaryItems}
      />

      <IntegratedSorting />
      <IntegratedPaging />
      <IntegratedSummary />
      <SelectTypeProvider
        for={["idEstudiante", "idCurso"]}
        availableValues={{
          idEstudiante: student.map(item => {
            return {
              key: item.idEstudiante,
              value: item.idEstudiante,
              name: item.nombre
            };
          }),
          idCurso: course.map(item => {
            return {
              key: item.idCurso,
              value: item.idCurso,
              name: item.nombre
            };
          })
        }}
        rowChanges={rowChanges}
      />
   

      <DragDropProvider />

      <Table
        columnExtensions={tableColumnExtensions}
        cellComponent={Cell}
      />
      <TableColumnReordering
        order={columnOrder}
        onOrderChange={setColumnOrder}
      />
      <TableHeaderRow showSortingControls />
      <TableEditRow
        cellComponent={EditCell}
      />
      <TableEditColumn
        width={170}
        showAddCommand={!addedRows.length}
        //showEditCommand
        showDeleteCommand
        commandComponent={Command}
      />
  

      <TableSummaryRow />
      <TableFixedColumns
        leftColumns={leftFixedColumns}
      />
      <PagingPanel
        pageSizes={pageSizes}
      />
    </Grid>
  </Paper>
);
};

import React from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";

import { Table, TableEditRow } from "@devexpress/dx-react-grid-material-ui";

const AddButton = ({ onExecute }) => (
  <Button
    color="default"
    onClick={onExecute}
    title="Crear nuevo registro"
    startIcon={<AddIcon />}
  >
    {" "}
  </Button>
);

const EditButton = ({ onExecute }) => (
  <Button onClick={onExecute} startIcon={<EditIcon />} title="Editar registro">
    {" "}
  </Button>
);

const DeleteButton = ({ onExecute }) => (
  <Button
    onClick={onExecute}
    title="Eliminar registro"
    startIcon={<DeleteIcon />}
  >
    {" "}
  </Button>
);

export const CommitButton = ({ onExecute, errors }) => (
  <Button
    onClick={onExecute}
    title="Guardar cambios"
    disabled={errors ? Object.keys(errors).length > 0 : false}
    startIcon={<SaveIcon />}
  >
    {" "}
  </Button>
);

const CancelButton = ({ onExecute }) => (
  <Button
    color="secondary"
    onClick={onExecute}
    title="Cancelar cambios"
    startIcon={<CancelIcon />}
  >
    {" "}
  </Button>
);

const commandComponents = {
  add: AddButton,
  edit: EditButton,
  delete: DeleteButton,
  commit: CommitButton,
  cancel: CancelButton,
};

export const Command = ({ id, onExecute, errors }) => {
  const CommandButton = commandComponents[id];
  return <CommandButton onExecute={onExecute} errors={errors} />;
};

export const Cell = ({ onClick, ...restProps }) => {
  const { column } = restProps;
  if (!column.isFocusable) {
    return <Table.Cell {...restProps} tabIndex={0} onFocus={onClick} />;
  }
  return <Table.Cell {...restProps} />;
};

export const EditCell = (props) => {
  return <TableEditRow.Cell {...props} />;
};

export const NoDataRow = (props) => (
  <Table.NoDataRow>
    <td />
  </Table.NoDataRow>
);

export const getRowId = (row) => row.id;

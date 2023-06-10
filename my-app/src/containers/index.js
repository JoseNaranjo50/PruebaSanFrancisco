import React, { Fragment, useState, useEffect } from "react";
import { Form, Field } from "react-final-form";
import Paper from "@material-ui/core/Paper";
import { ProgressBar } from "../common/PorgressBar"
import ComputerIcon from "@material-ui/icons/Computer";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Grid from "../components/Grid";
import Popup from "../common/Popup";
import { useGetAllCourse, useGetAllStudent, useGetAllRecord } from '../hooks/index';
import { addRecord } from "../services"
import NewlIcon from "@material-ui/icons/AddBox";

const insertItem = (array, action) => {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index),
  ];
};

const removeItem = (array, action) => {
  return [...array.slice(0, action.index), ...array.slice(action.index + 1)];
};

const Master = () => {

  
  const [openWindow, setOpenWindow] = useState(false);
  const { course, errorCourse, isLoadingCourse } = useGetAllCourse();
  const { student, errorStudent, isLoadingStudent } = useGetAllStudent();
  const { record, setRecord, errorRecord, isLoadingRecord } = useGetAllRecord();

  var totalCount = 10;
  const handleClose = () => {
    setOpenWindow(false);
  };

  const handleClickNew = () => {
    setOpenWindow(true);
  };

  const handlePopUpSubmit = async values => {

       const result = await addRecord(values);
       if (result.state) {
         setRecord(
           insertItem(record, {
             index: record.length,
             item: { ...values, idRegistro: record.length }
           })
         );
         window.alert('Registro ingresado con exito')
       } else {
         window.alert('Error: ' + result.message)
       }
    
  };

  const deleteRegister = async values => {

    const result = await deleteRecord(values);
    if (result.state) {
      setRecord(
        removeItem(record, {
          index: record.length,
          item: { ...values, idRegistro: record.length }
        })
      );
      window.alert('Registro eliminado con exito')
    } else {
      window.alert('Error: ' + result.message)
    }
 
};
  

  if (isLoadingCourse || isLoadingStudent) return <Fragment>Cargando Catálogos...</Fragment>;

  return (
    <Paper style={{ position: "relative" }}>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleClickNew}
          style={{ margin: "5px" }}
          startIcon={<NewlIcon />}
        >
          {"Registrar materias en alumnos"}
        </Button>


        <Form
          initialValues={{
            record: record
          }}
          onSubmit={() => { }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field
                name={"record"}
                component={Grid}
                student={student}
                course={course}
                deleteRegister={deleteRegister}

              />
              {/* {isLoadingRecord && <ProgressBar />} */}
            </form>
          )}
        />
      </div>
      <div className="col-xs-12 col-sm-6 col-md-6 col-lg-1 col-xl-1">
        <Popup
          open={openWindow}
          onClose={handleClose}
          handlePopUpSubmit={handlePopUpSubmit}
          title={"Administación"}
          size={"xl"}
          student={student}
          course={course}
        />

      
      </div>

    </Paper>
  );
};

export default Master;

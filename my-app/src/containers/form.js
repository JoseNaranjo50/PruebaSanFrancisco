import React, { useState, useEffect } from "react";
import { Form, Field, FormSpy, label } from "react-final-form";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import { OnChange } from "react-final-form-listeners";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import CancelIcon from "@material-ui/icons/Cancel";
import { renderSelectField, renderTextField } from "../common/RenderFields"




const FormRegister = ({
    onSubmit,
    handleClose,
    student,
    course,
}) => {
 
    const emptyItem = [{ code: "", description: "" }];


    return (
        <Form
            initialValues={{ fechaRegistro: new Date().toISOString().slice(0, 10), idEstudiante: 0, idCourse: 0 }}
            onSubmit={onSubmit}
            subscription={{}}
            validate={values => { }}
            render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <div>
                        <div className="row">

                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                <Field
                                    name="idEstudiante"
                                    label={"Estudiante"}
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem.concat(student).map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.idEstudiante}>
                                                {item.nombre}
                                            </MenuItem>
                                        );
                                    })}
                                </Field>

                            </div>
                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                <Field
                                    name="idCurso"
                                    label={"Curso"}
                                    component={renderSelectField}
                                    subscription={{ value: true, error: true, touched: true }}
                                >
                                    {emptyItem.concat(course).map((item, index) => {
                                        return (
                                            <MenuItem key={index} value={item.idCurso}>
                                                {item.nombre}
                                            </MenuItem>
                                        );
                                    })}
                                </Field>

                            </div>

                            <div className="col-xs-12 col-sm-6 col-md-6 col-lg-3 col-xl-3">
                                <Field
                                    name="fechaRegistro"
                                    label={"Fecha de Registro"}
                                    disabled={true}
                                    component={renderTextField}
                                    subscription={{ value: true, error: true, touched: true }}
                                />
                            </div>


                        </div>
                        <br />
                        <div className={"float-left"}>
                            <FormSpy subscription={{ valid: true, submitting: true }}>

                                {({ submitting, valid }) => (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        type={"submit"}
                                        disabled={submitting || !valid}
                                    >
                                        Guardar
                                    </Button>

                                )}
                            </FormSpy>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                startIcon={<CancelIcon />}
                                onClick={handleClose}
                            >
                                Cancelar
                            </Button>

                        </div>
                    </div>

                </form>
            )}
        />
    );
};

export default FormRegister;

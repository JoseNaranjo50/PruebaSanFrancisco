import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormHelperText from "@material-ui/core/FormHelperText";
import { makeStyles } from "@material-ui/core/styles";



const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  ...custom
}) => {
 

  return (
    <TextField
      inputlabelprops={{
        // classes: {
        //   root: classes.label,
        //   focused: classes.focusedLabel,
        //   error: classes.erroredLabel,
        // },
      }}
      inputprops={{
        // classes: {
        //   root: classes.underline,
        //   error: classes.error,
        //},
      }}
      fullWidth
      variant="outlined"
      style={{ margin: 8 }}
      // error={error ? true : false}
      error={touched ? (error ? true : false) : false}
      helperText={error}
      label={label}
      {...input}
      {...custom}
    />
  );
};

const renderSelectField = ({
  input,
  label,
  disabled,
  meta: { error, touched },
  children,
  isClearable,
  ...custom
}) => {

  return (
    <Fragment>
      <FormControl fullWidth variant="outlined" style={{ margin: 8 }}>
        {/* <InputLabel id="demo-simple-select-outlined-label" style={{color: error ? "#6c757d" : "" }}>{label}</InputLabel> */}
        <InputLabel
          id="demo-simple-select-outlined-label"
          style={{ color: error ? "#6c757d" : "#000000" }}
        >
          {label}
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          onChange={(event, index, value) => {
            input.onChange(value);
          }}
          label={label}
          children={children}
          error={touched ? (error ? true : false) : false}
          inputlabelprops={{
            classes: {
              // root: classes.label,
              // focused: classes.focusedLabel,
              // error: classes.erroredLabel,
            },
          }}
          disabled={disabled}
          {...input}
          {...custom}
        ></Select>
        <FormHelperText style={{ color: error ? "#6c757d" : "grey" }}>
          {error}
        </FormHelperText>
      </FormControl>
    </Fragment>
  );
};



export {
  renderTextField,
  renderSelectField,
};

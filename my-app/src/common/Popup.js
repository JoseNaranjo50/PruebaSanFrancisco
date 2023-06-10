import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import  {ThemeProvider }  from "@material-ui/core/styles"
import { withStyles } from "@material-ui/core/styles";
import { ProgressBar } from "./PorgressBar";
import  FormRegister  from "../containers/form"
const styles = (theme) => {
  return {
    rootStyle: {
      borderRadius: 15,
    },
    dialogTitle: {
      backgroundColor: theme.palette.primary.main,
      textAlign: "center",
    },
    dialogTitleColor: {
      color: "white",
    },
  };
};

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
    backgroundColor: "#f1f8ff",
    height: "30px",
  },
}))(MuiDialogActions);

const Popup = ({
  open,
  title,
  size,
  onClose,
  classes,
  showProgressBar,
  student,
  course,
  handlePopUpSubmit
}) => {
  return (

  <Dialog onClose={onClose} open={open} maxWidth={size} fullScreen={false}>
        <DialogTitle color={"primary"}>{title}</DialogTitle>
        <DialogContent>
          <FormRegister
            onSubmit={handlePopUpSubmit}
            handleClose={onClose}
            student={student}
            course={course}
          />
          {showProgressBar && <ProgressBar />}
        </DialogContent>
      </Dialog>

  );
};

export default withStyles(styles)(Popup);

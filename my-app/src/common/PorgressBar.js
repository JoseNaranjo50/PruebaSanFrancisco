import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export const ProgressBar = () => {
  return (
    <div style={{
		  position: "absolute",
		  top: 0,
		  left: 0,
		  width: "100%",
		  height: "100%",
		  background: "rgba(161, 160, 160, .3)"
	}}>
      <CircularProgress style={{
			  position: "absolute",
			  fontSize: "20px",
			  top: "calc(45% - 10px)",
			  left: "calc(50% - 10px)"
	}} />
    </div>
  );
};


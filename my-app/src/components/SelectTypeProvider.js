import React, { Fragment } from "react";
import Switch from "@material-ui/core/Switch";
import { DataTypeProvider } from "@devexpress/dx-react-grid";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";



class SelectEditor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            touched: false,
        };
    }

    render() {
        const { touched } = this.state;
        const {
            value,
            onValueChange,
            column,
            row,
            availableValues,
            onBlur,
            rowChanges,
            autoFocus,
        } = this.props;

        const hasChanged =
            rowChanges && rowChanges.length > 0 && rowChanges[row.id]
                ? rowChanges[row.id][column.dependsOnColumn]
                : undefined;

        const options = !column.dependsOnColumn
            ? availableValues[column.name]
            : hasChanged
                ? availableValues[rowChanges[row.id][column.dependsOnColumn]]
                : availableValues[row[column.dependsOnColumn]];

        const items = options ? options : [];

        return (
            <Fragment>
                <Select
                    value={value}
                    onChange={(event) => onValueChange(event.target.value)}
                    onBlur={() => {
                        this.setState({ touched: true });
                        if (typeof onBlur == "function") {
                            onBlur();
                        }
                    }}
                    style={{ width: "100%" }}
                    error={column.error !== undefined}
                    autoFocus={autoFocus}
                >
                    {items.map((item) => {
                        return (
                            <MenuItem key={item.key} value={item.key} primarytext={item.name}>
                                {" "}
                                {item.name}{" "}
                            </MenuItem>
                        );
                    })}
                </Select>
                <FormHelperText
                    style={{ color: column.error !== undefined ? "#fec03e" : "grey" }}
                >
                    {column.error}
                </FormHelperText>
            </Fragment>
        );
    }
}

const SelectFormatter = (props) => {
    
    const { value, availableValues, column } = props;

    if (!column.dependsOnColumn) {
        const v = availableValues[column.name].filter((rec) => rec.key === value);
        return v && v[0] ? v[0].name : "";
    } else {
        const av = availableValues[props.row[column.dependsOnColumn]];

        const v = av ? av.filter((rec) => rec.key === value) : undefined;

        return v && v[0] ? v[0].name : "";
    }
};

export const SelectTypeProvider = (props) => {
    
    const { availableValues, rowChanges } = props;
    const CustomSelectFormatter = (props1) => (
        <SelectFormatter
            {...props1}
            availableValues={availableValues}
            rowChanges={rowChanges}
        />
    );
    const CustomSelectEditor = (props2) => (
        <SelectEditor
            {...props2}
            availableValues={availableValues}
            rowChanges={rowChanges}
        />
    );

    return (
        <DataTypeProvider
            formatterComponent={CustomSelectFormatter}
            editorComponent={CustomSelectEditor}
            {...props}
        />
    );
};
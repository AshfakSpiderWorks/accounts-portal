import React from 'react';
import { FormControl, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const Creatig = (props) => {
    const loadOptions = async (inputValue, callback) => {
        if (!inputValue) {
            callback([]);
            return;
        }

        try {
            const options = await props.fetchOptions(inputValue);
            callback(options);
        } catch (error) {
            console.error(error);
            callback([]);
        }
    };

    return (
        <FormControl sx={{ width: '100%' }}>
            <label className={"css-1wjmx8d-MuiFormLabel-root-MuiInputLabel-root"}>{props.label}</label>
            <Controller
                control={props.control}
                name={props.name}
                render={({ field }) => (
                    <AsyncSelect
                        {...field}
                        isClearable={true}
                        isMulti={props.ismultiple}
                        defaultOptions
                        cacheOptions={false}
                        loadOptions={loadOptions}
                        getOptionLabel={(e) => e.label}
                        getOptionValue={(e) => e.value}
                        menuPortalTarget={document.body}
                        styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                        defaultValue={props.defaultValue}
                    />
                )}
            />

            {props.error && (
                <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error}</Typography>
            )}
            {props.error2 && (
                <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error2}</Typography>
            )}
        </FormControl>
    );
};

export default Creatig;

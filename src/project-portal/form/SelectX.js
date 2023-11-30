import React from 'react';
import { FormControl, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const SelectX = (props) => {

    const onInputChange = (e) => {
        props.options(e);
    }
    const customStyles = {
        control: (provided) => ({
            ...provided,
            padding: '0',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: '3px',
        }),
        clearIndicator: (provided) => ({
            ...provided,
            padding: '0',
        }),
        menuPortal: (provided) => ({
            ...provided,
            zIndex: 9999,
        }),
    };


    return (
        <FormControl sx={{ width: '100%' }}>
            {/*removed from {...props} FormControl*/}
            <label className={"css-1wjmx8d-MuiFormLabel-root-MuiInputLabel-root"}>{props.label}</label>
            <Controller
                control={props.control}
                name={props.name}
                defaultValue={props.defaultValue}
                render={
                    ({ field }) => (
                        <AsyncSelect
                            {...field}
                            isClearable
                            isMulti={props.ismultiple}
                            defaultOptions
                            cacheOptions={false}
                            loadOptions={props.options}
                            getOptionLabel={e => e.account_name || e.name || e.title}
                            getOptionValue={e => e.id}
                            onInputChange={onInputChange}
                            menuPortalTarget={document.body}
                            styles={customStyles}
                            isDisabled={props.disabled}
                            placeholder={props.placeholder}

                        />
                    )
                }
            />

            {props.error && <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error}</Typography>}
            {props.error2 && <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error2}</Typography>}



        </FormControl>
    );
};

export default SelectX;

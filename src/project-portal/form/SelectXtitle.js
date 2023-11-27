import React from 'react';
import { FormControl, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import AsyncSelect from "react-select/async";

const SelectXTitle = (props) => {

    const onInputChange = (e) => {
        props.options(e);
    }

    return (
        <FormControl sx={{ width: '100%' }}>
            {/*removed from {...props} FormControl*/}
            <label className={"css-1wjmx8d-MuiFormLabel-root-MuiInputLabel-root"}>{props.label}</label>
            <Controller
                control={props.control}
                name={props.name}

                render={
                    ({ field }) => (
                        <AsyncSelect
                            {...field}
                            isClearable={true}
                            isMulti={props.ismultiple}
                            defaultOptions
                            cacheOptions={false}
                            loadOptions={props.options}
                            getOptionLabel={e => e.account_name || e.name}
                            getOptionValue={e => e.id}
                            onInputChange={onInputChange}
                            menuPortalTarget={document.body}
                            styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                            defaultValue={props.defaultValue}
                        />
                    )
                }
            />

            {props.error && <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error}</Typography>}
            {props.error2 && <Typography variant={"string"} sx={{ color: "#ec4c47", fontSize: '0.75rem' }}>{props.error2}</Typography>}



        </FormControl>
    );
};

export default SelectXTitle;

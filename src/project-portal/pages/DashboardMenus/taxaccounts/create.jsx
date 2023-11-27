import React, { useEffect, useState } from 'react';
import { Button, Card, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, InputLabel, Radio, RadioGroup, Slide, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import SelectX from '../../../form/SelectX'
import TextInput from '../../../form/TextInput'
import { ErrorMessage } from "@hookform/error-message";
import { LoadingButton } from "@mui/lab";
import { Departments } from '../../../../api/Endpoints/Departments';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import { TaxAccount } from '../../../../api/Endpoints/TaxAccount';
import { Country } from '../../../../api/Endpoints/Country';
import { Currency } from '../../../../api/Endpoints/Currency';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const scheme = yup.object().shape({
  // parant_organisations_id: yup.object().required(),
  taxaccountname: yup.string().required(),
  // email: yup.string().email(),
  // phone_number: yup.string(),
  // employee_roles_id: yup.object(),
  // address: yup.string(),
  // emergency_contacts: yup.string(),
  // joining_date: yup.date(),
  // remarks: yup.string(),
});


const CreateTaxAccounts = (props) => {

  const { register, handleSubmit, watch, formState: { errors }, control, setValue, getValues, reset } = useForm({ resolver: yupResolver(scheme), criteriaMode: "all" });
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editValues, setEditValues] = useState({})
  const [radioValue, setRadioValue] = useState('Yes')




  const [formButtonStatus, setFormButtonStatus] = useState({
    label: "Submit",
    loading: false,
    disabled: false,
  });

  const [alerts, setAlerts] = useState({
    type: '',
    message: '',
    active: false
  })


  const handleClickOpen = () => {
    props.onNew()
  };

  const handleClose = () => {
    // props.setEditId(undefined)
    setOpen(false);
  };


  const fetchTaxCountry = (e) => {
    return Country.get({ keyword: e }).then(response => {
      console.log(response);
      if (typeof response.data.data !== "undefined") {
        return response.data.data
      } else {
        return []
      }
    })
  }

  const defaultCurrency = (e) => {

    return Currency.get({ keyword: e }).then(response => {
      console.log(response);
      if (typeof response.data.data !== "undefined") {
        return response.data.data
      } else {
        return [];
      }
    })
  }

  const fetchCurrency = () => {

  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const onSubmit = (data) => {
    console.log(data);
    console.log(radioValue);
    setFormButtonStatus({ ...formButtonStatus, loading: true });
    setAlerts({ active: false, message: "Internal server error", type: "error" })


    let dataToSubmit = {
      id: props?.editId,
      title: data.taxaccountname,
      country_id: data.country.id,
      default_currency_id: data.default_currency.id,
      description: data.description,
    };

    console.log(dataToSubmit);
    let action;

    if (props.editId > 0) {
      console.log("dataToSubmit", dataToSubmit);
      action = TaxAccount.update(dataToSubmit)
    } else {
      action = TaxAccount.add(dataToSubmit)
    }
    action.then(response => {
      console.log("this is response data", response.data);
      setFormButtonStatus({ label: "Submitted", loading: false, disabled: true });
      setAlerts({ active: true, message: response.data.message, type: response.data.status })
      setFormButtonStatus({ label: "Create", loading: false, disabled: false });
      toast.success(response.data.message)
      props.onUpdate();
      setOpen(false);
      setTimeout(() => { setAlerts({}) }, 2000)
    }).catch(errors => {
      console.log(errors);
      toast.error("Internal server error");
      setAlerts({ active: true, message: "Internal server error", type: "error" })
      setFormButtonStatus({ label: "Create", loading: false, disabled: false });
    })
  }


  const fetchTaxAccountsDetails = async () => {
    let taxAccounts = await TaxAccount.getDetails({ id: props.editId });
    console.log(taxAccounts);
    if (taxAccounts.data.status === "success") {
      console.log("successs");
      let data = taxAccounts.data.data;
      setValue('taxaccountname', data.title);
      setValue('country', { id: data.country?.id, name: data.country?.name });
      setValue('default_currency', { id: data.default_currency?.id, name: data.default_currency?.name });
      setValue('description', data.description);
    }
  };

  useEffect(() => {

    if (parseInt(props.editId) > 0) {
      fetchTaxAccountsDetails()
      setOpen(true);
    } else if (Number(props.editId) === 0) {
      setOpen(true);
    }



  }, [])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {props.icon ? <AddIcon style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }} /> : "Create Tax Account"}
      </Button>
      <Dialog
        open={open}
        PaperProps={{ sx: { width: "50%", height: "100%", position: "fixed", right: 0, top: 0, bottom: 0, m: 0, p: 0, borderRadius: 0, maxHeight: '100%' } }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle >{parseInt(props.editId) > 0 ? "Edit Tax Account" : "Create Tax Account"}</DialogTitle>

        <DialogContent>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>

              <Grid sx={{}} item xs={12}>
                <TextInput control={control}
                  // placeholder="Enter product Name"
                  name="taxaccountname"
                  label="Tax Account Name"
                  value={watch('taxaccountname')} />
              </Grid>

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Tax Account Name</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="taxaccountname"
                    value={editValues.Name}
                  // value={watch('taxaccountname')} 
                  />
                </Grid>
              </Grid> */}

              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <SelectX
                    label="Country"
                    options={fetchTaxCountry}
                    control={control}
                    name={'country'}
                    defaultValue={watch('country')}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Default Currency"}
                    options={defaultCurrency}
                    control={control}
                    error={errors?.assign_to?.id ? errors?.assign_to?.id?.message : false}
                    error2={errors?.assign_to?.message ? errors?.assign_to?.message : false}
                    name={'default_currency'}
                    defaultValue={watch('default_currency')}
                  />
                </Grid>
              </Grid>

              <Grid sx={{ p: 1, mt: 2 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  {/* <FormControl> */}
                  <FormLabel id="demo-radio-buttons-group-label">Is Active</FormLabel>
                  {/* </FormControl> */}
                </Grid>
                <Grid xs={6}>
                  {/* <FormControl> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={radioValue}
                    name="active"
                    sx={{ pl: 2, display: 'flex' }}
                  >
                    <Grid>
                      <FormControlLabel onChange={handleRadioChange} value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel onChange={handleRadioChange} value="No" control={<Radio />} label="No" />
                    </Grid>
                  </RadioGroup>
                  {/* </FormControl> */}
                </Grid>

              </Grid>

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Country</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="country"

                    value={editValues.Country}
                  // value={watch('country')} 
                  />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12}>
                      <TextInput control={control} name="country"
                        label={"Country"}

                      />
                    </Grid> */}

              <Grid sx={{ mt: 1 }} item xs={12}>
                <InputLabel sx={{
                  color: "black",
                  pb: 1
                }}>Description </InputLabel>
                <TextField
                  {...register('description')}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ width: '100%', }}
                  required
                />
              </Grid>




              {/* 
                    <Grid sx={{ p: 1 }} item xs={12}>
                      <SelectX
                        label={"Country"}
                        options={fetchTaxCountry}
                        control={control}
                        name={'country'}
                        defaultValue={watch('country')}
                      />
                    </Grid> */}

              <Grid sx={{ mt: 2 }} item xs={12}>
                <ErrorMessage
                  errors={errors}
                  name="multipleErrorInput"
                  render={({ messages }) =>
                    messages &&
                    Object.entries(messages).map(([type, message]) => (
                      <p key={type}>{message}</p>
                    ))
                  }
                />

                <LoadingButton loading={formButtonStatus.loading} disabled={formButtonStatus.disabled}
                  variant="outlined" type="submit">{formButtonStatus.label}</LoadingButton>
              </Grid>
            </Grid>
          </form>

        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>

      </Dialog>
    </div>
  )
}

export default CreateTaxAccounts;

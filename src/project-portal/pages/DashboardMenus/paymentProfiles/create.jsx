import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  InputLabel,
  Slide,
  TextField,
  Typography,
} from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { yupResolver } from "@hookform/resolvers/yup/dist/yup"
import * as yup from "yup"
import { useForm } from "react-hook-form"
import SelectX from "../../../form/SelectX"
import TextInput from "../../../form/TextInput"
import { ErrorMessage } from "@hookform/error-message"
import { LoadingButton } from "@mui/lab"
import { Departments } from "../../../../api/Endpoints/Departments"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const scheme = yup.object().shape({
  parant_organisations_id: yup.object().required(),
  name: yup.string().required(),
  email: yup.string().email(),
  phone_number: yup.string(),
  employee_roles_id: yup.object(),
  address: yup.string(),
  emergency_contacts: yup.string(),
  joining_date: yup.date(),
  remarks: yup.string(),
})

const CreatePaymentProfiles = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
    setValue,
    getValues,
    reset,
  } = useForm({ resolver: yupResolver(scheme), criteriaMode: "all" })
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editValues, setEditValues] = useState({})

  const [formButtonStatus, setFormButtonStatus] = useState({
    label: "Submit",
    loading: false,
    disabled: false,
  })

  const handleClickOpen = () => {
    props.onNew()
  }

  const handleClose = () => {
    // props.setEditId(undefined)
    setOpen(false)
  }

  const onSubmit = () => {
    console.log("hello")
  }

  const fetchBusinessCountry = (e) => {
    return Departments.get({ keyword: e }).then((response) => {
      if (typeof response.data.data.data !== "undefined") {
        let data = [
          { id: 0, name: "INDIA" },
          { id: 1, name: "UAE" },
        ]
        return data
      } else {
        return response.data.data.data
      }
    })
  }

  useEffect(() => {
    if (parseInt(props.editId) > 0) {
      setEditValues(props.rowdetails.row)
      setOpen(true)
      console.log(editValues)
    } else if (Number(props.editId) === 0) {
      setOpen(true)
    }
  }, [])

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        {props.icon ? (
          <AddIcon
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
            }}
          />
        ) : (
          "Create Payment Profile"
        )}
      </Button>
      <Dialog
        open={open}
        PaperProps={{
          sx: {
            width: "50%",
            height: "100%",
            position: "fixed",
            right: 0,
            top: 0,
            bottom: 0,
            m: 0,
            p: 0,
            borderRadius: 0,
            maxHeight: "100%",
          },
        }}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
          {parseInt(props.editId) > 0
            ? "Edit Payment Profile"
            : "Create Payment Profile"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              {/* <label htmlFor="">Profile Name</label> */}
              <Grid sx={{}} item xs={12}>
                <TextInput
                  control={control}
                  // placeholder="Enter product Name"
                  name="profile_name"
                  label="Profile Name"
                  value={watch("profile_name")}
                />
              </Grid>

              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <SelectX
                    label="Client"
                    options={fetchBusinessCountry}
                    control={control}
                    name={"client"}
                    defaultValue={watch("client")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Defualt Payment Channel"}
                    options={fetchBusinessCountry}
                    control={control}
                    error={
                      errors?.assign_to?.id
                        ? errors?.assign_to?.id?.message
                        : false
                    }
                    error2={
                      errors?.assign_to?.message
                        ? errors?.assign_to?.message
                        : false
                    }
                    name={"default_currency"}
                    defaultValue={watch("default_currency")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="tax_id"
                    label="Tax ID"
                    value={watch("tax_id")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Billing Country"}
                    options={fetchBusinessCountry}
                    control={control}
                    error={
                      errors?.assign_to?.id
                        ? errors?.assign_to?.id?.message
                        : false
                    }
                    error2={
                      errors?.assign_to?.message
                        ? errors?.assign_to?.message
                        : false
                    }
                    name={"billing_country"}
                    defaultValue={watch("billing_country")}
                  />
                </Grid>
              </Grid>

              <Grid sx={{ mt: 2 }} item xs={12}>
                <InputLabel
                  sx={{
                    color: "black",
                    pb: 1,
                  }}
                >
                  Billing Address{" "}
                </InputLabel>
                <TextField
                  {...register("billing_address")}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  required
                />
              </Grid>

              <Grid container spacing={1} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="accounts_cpontact_name"
                    label="Accounts Contact Name"
                    value={watch("accounts_cpontact_name")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="accounts_contact_number"
                    label="Accounts Contact Number"
                    value={watch("accounts_contact_number")}
                  />
                </Grid>
              </Grid>

              <Grid sx={{ mt: 2 }} item xs={12}>
                <TextInput
                  control={control}
                  // placeholder="Enter product Name"
                  name="invoice_mail_id"
                  label="Invoice Mail ID"
                  value={watch("invoice_mail_id")}
                />
              </Grid>

              <Grid sx={{ mt: 2 }} item xs={12}>
                <InputLabel
                  sx={{
                    color: "black",
                    pb: 1,
                  }}
                >
                  Remarks{" "}
                </InputLabel>
                <TextField
                  {...register("remarks")}
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{ width: "100%" }}
                  required
                />
              </Grid>

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Profile Name</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="profilename"

                    value={editValues.Name} />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Client</Typography>
                </Grid>
                <Grid xs={6}>
                  <SelectX
                    options={fetchBusinessCountry}
                    control={control}
                    name={'country'}
                    defaultValue={watch('country')}
                  />
                </Grid>
              </Grid> */}

              {/* 
              <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Default PaymentChannel</Typography>
                </Grid>
                <Grid xs={6}>
                  <SelectX
                    options={fetchBusinessCountry}
                    control={control}
                    name={'defualtpaymentchannel'}
                    defaultValue={watch('country')}
                  />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Tax Id</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="taxid"

                    value={watch('taxid')} />
                </Grid>
              </Grid>

              <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Billing Address</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="billing_address"

                    value={watch('billing_address')} />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Billing Country</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="billing_country"

                    value={watch('billing_country')} />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Accounts Contact Name</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="accounts_contact_name"

                    value={watch('accounts_contact_name')} />
                </Grid>
              </Grid>

              <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Accounts Contact Number</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="accounts_contact_number"

                    value={watch('accounts_contact_number')} />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Invoice Mail ID</Typography>
                </Grid>
                <Grid xs={6}>

                  <TextInput control={control} name="invoice_email_id"

                    value={watch('invoice_email_id')} />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>

                <TextInput control={control} label='Remarks' name="remarks" isMultiline

                  value={watch('remarks')} />

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

                <LoadingButton
                  loading={formButtonStatus.loading}
                  disabled={formButtonStatus.disabled}
                  variant="outlined"
                  type="submit"
                >
                  {formButtonStatus.label}
                </LoadingButton>
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

export default CreatePaymentProfiles

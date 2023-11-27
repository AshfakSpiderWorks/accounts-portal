import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
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
import { TaxAccount } from "../../../../api/Endpoints/TaxAccount"
import { BusinessAccount } from "../../../../api/Endpoints/BusinessAccount"
import { Currency } from "../../../../api/Endpoints/Currency"
import { toast } from "react-hot-toast"
import PaymentChannels from "."
import { Paymentchannels } from "../../../../api/Endpoints/PaymentChannels"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const scheme = yup.object().shape({
  channel_name: yup.string().required(),
  channel_number: yup.string(),
  business_account: yup.object().required(),
  tax_account: yup.object().required(),
  currency: yup.object().required(),
})

const CreatePaymentChannels = (props) => {
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
  const [refresh, setRefresh] = React.useState(false)
  const [radioValue, setRadioValue] = useState("Yes")

  const [formButtonStatus, setFormButtonStatus] = useState({
    label: "Submit",
    loading: false,
    disabled: false,
  })

  const [alerts, setAlerts] = useState({
    type: "",
    message: "",
    active: false,
  })

  const handleClickOpen = () => {
    props.onNew()
  }

  const handleClose = () => {
    // props.setEditId(undefined)
    setOpen(false)
  }

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value)
  }

  const onSubmit = (data) => {
    console.log(data)
    setFormButtonStatus({ ...formButtonStatus, loading: true })
    setAlerts({
      active: false,
      message: "Internal server error",
      type: "error",
    })

    let dataToSubmit = {
      id: props?.editId,
      title: data.channel_name,
      account_business_accounts_id: data.business_account.id,
      account_tax_accounts_id: data.tax_account.id,
      channel_number: data.channel_number,
      default_currency_id: data.currency.id,
      country_id: data.tax_account?.country?.id,
      description: data.description,
    }

    console.log(dataToSubmit)
    let action

    if (props.editId > 0) {
      console.log("dataToSubmit", dataToSubmit)
      action = Paymentchannels.update(dataToSubmit)
    } else {
      action = Paymentchannels.add(dataToSubmit)
    }
    action
      .then((response) => {
        console.log("this is response data", response.data)
        setFormButtonStatus({
          label: "Submitted",
          loading: false,
          disabled: true,
        })
        setAlerts({
          active: true,
          message: response.data.message,
          type: response.data.status,
        })
        setFormButtonStatus({
          label: "Create",
          loading: false,
          disabled: false,
        })
        toast.success(response.data.message)
        props.onUpdate()
        setOpen(false)
        setTimeout(() => {
          setAlerts({})
        }, 2000)
      })
      .catch((errors) => {
        console.log(errors)
        toast.error("Internal server error")
        setAlerts({
          active: true,
          message: "Internal server error",
          type: "error",
        })
        setFormButtonStatus({
          label: "Create",
          loading: false,
          disabled: false,
        })
      })
  }

  const fetchBusinessAccount = (e) => {
    return BusinessAccount.get({ keyword: e }).then((response) => {
      console.log(response)
      if (typeof response.data.data.data !== "undefined") {
        return response.data.data.data
      } else {
        return []
      }
    })
  }

  const fetchTaxAccounts = (e) => {
    return TaxAccount.get({ keyword: e }).then((response) => {
      console.log(response)
      if (typeof response.data.data.data !== "undefined") {
        return response.data.data.data
      } else {
        return []
      }
    })
  }

  const fetchCurrency = (e) => {
    return Currency.get({ keyword: e }).then((response) => {
      if (typeof response.data.data !== "undefined") {
        console.log(response.data.data)
        return response.data.data
      } else {
        return []
      }
    })
  }

  const fetchPaymentChannelsDetails = async () => {
    let payment_channel = await Paymentchannels.getDetails({ id: props.editId })
    if (payment_channel.data.status === "success") {
      let data = payment_channel.data.data
      setValue("channel_name", data.title)
      setValue("default_currency", {
        id: data.default_currency?.id,
        name: data.default_currency?.title,
      })
      setValue("business_account", {
        id: data.business_account?.id,
        name: data.business_account?.title,
      })
      setValue("tax_account", {
        id: data.tax_account?.id,
        name: data.tax_account?.title,
      })
      setValue("channel_number", data.channel_number)
      setValue("description", data.description)
    }
  }

  useEffect(() => {
    if (parseInt(props.editId) > 0) {
      fetchPaymentChannelsDetails()
      setOpen(true)
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
          "Create Payment Channels"
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
            ? "Edit Payment Channels"
            : "Create  Payment Channels"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container sx={{}}>
              <Grid sx={{}} item xs={12}>
                <TextInput
                  control={control}
                  // placeholder="Enter product Name"
                  name="channel_name"
                  label="channel Name"
                  value={watch("channel_name")}
                />
              </Grid>

              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="channel_number"
                    label="channel Number"
                    value={watch("channel_number")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Business Account"}
                    options={fetchBusinessAccount}
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
                    name={"business_account"}
                    defaultValue={watch("business_account")}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <SelectX
                    key={refresh * 0.2}
                    label={"Tax Account"}
                    options={fetchTaxAccounts}
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
                    name={"tax_account"}
                    defaultValue={watch("tax_account")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Default Currency"}
                    options={fetchCurrency}
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
                    name={"currency"}
                    defaultValue={watch("currency")}
                  />
                </Grid>
              </Grid>

              <Grid
                sx={{ p: 1, mt: 2 }}
                item
                xs={12}
                alignItems={"center"}
                display={"flex"}
              >
                <Grid xs={6}>
                  {/* <FormControl> */}
                  <FormLabel id="demo-radio-buttons-group-label">
                    Is Active
                  </FormLabel>
                  {/* </FormControl> */}
                </Grid>
                <Grid xs={6}>
                  {/* <FormControl> */}
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={radioValue}
                    name="radio-buttons-group"
                    sx={{ pl: 2, display: "flex" }}
                  >
                    <Grid>
                      <FormControlLabel
                        onChange={handleRadioChange}
                        value="Yes"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        onChange={handleRadioChange}
                        value="No"
                        control={<Radio />}
                        label="No"
                      />
                    </Grid>
                  </RadioGroup>
                  {/* </FormControl> */}
                </Grid>
              </Grid>

              <Grid sx={{ mt: 1 }} item xs={12}>
                <InputLabel
                  sx={{
                    color: "black",
                    pb: 1,
                  }}
                >
                  Description{" "}
                </InputLabel>
                <TextField
                  {...register("description")}
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
                        <Typography variant='subtitle_1'>Channel Name</Typography>
                      </Grid>
                      <Grid xs={6}>

                        <TextInput control={control} name="channelname"

                          value={editValues.Name} />
                      </Grid>
                    </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12}>
                      <TextInput control={control} name="channelname"
                        label="Channel Name"
                        value={watch('channelname')} />
                    </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Business Account</Typography>
                </Grid>
                <Grid xs={6}>
                  <SelectX
                    options={fetchBusinessCountry}
                    control={control}
                    name={'businessaccount'}
                    defaultValue={watch('businessaccount')}
                  />
                </Grid>
              </Grid> */}

              {/* <Grid sx={{ p: 1 }} item xs={12} alignItems={'center'} display={'flex'}>
                <Grid xs={6}>
                  <Typography variant='subtitle_1'>Tax Account</Typography>
                </Grid>
                <Grid xs={6}>
                  <SelectX
                    options={fetchBusinessCountry}
                    control={control}
                    name={'taxaccount'}
                    defaultValue={watch('taxaccount')}
                  />
                </Grid>
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

export default CreatePaymentChannels

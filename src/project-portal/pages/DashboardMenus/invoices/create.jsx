import React, { useEffect, useState } from "react"
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Slide,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
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
import DateInput from "../../../form/DateInput"
import ReactSelector from "react-select"
import { TaxAccount } from "../../../../api/Endpoints/TaxAccount"
import { BusinessAccount } from "../../../../api/Endpoints/BusinessAccount"
import { Currency } from "../../../../api/Endpoints/Currency"
import { Paymentchannels } from "../../../../api/Endpoints/PaymentChannels"
import { toast } from "react-hot-toast"
import { TransactionsApi } from "../../../../api/Endpoints/Transactions"
import moment from "moment"
import { Account } from "../../../../api/Endpoints/Account"
import { categories } from "../../../../api/Endpoints/Category"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

const scheme = yup.object().shape({
  title: yup.string().required(),
  business_account: yup.object().required(),
  tax_accounts: yup.string().required(),
  currency: yup.object(),
  amount: yup.string().required(),
  payment_type: yup.string().required(),
  payment_channel: yup.object().required(),
  payment_date: yup.string().required(),
  // description: yup.string(),
})

const CreateTransactions = (props) => {
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
  const [selectedTypeValue, setSelectedTypeValue] = useState()
  const [editValues, setEditValues] = useState({})
  const [taxAccount, setTaxAccount] = useState([])
  const [taxAccount_id, setTaxAccount_id] = useState()
  const [selectedCurrency, setSelectedCurrency] = useState("local")
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
    props.setEditId(undefined)
    setOpen(false)
  }

  const onSubmit = (data) => {
    setFormButtonStatus({ ...formButtonStatus, loading: true })
    setAlerts({
      active: false,
      message: "Internal server error",
      type: "error",
    })

    let date = moment(data.payment_date).format("YYYY-MM-DD")

    let dataToSubmit = {
      id: props?.editId,
      title: data.title,
      account_business_accounts_id: data.business_account.id,
      account_payment_channels_id: data.payment_channel?.id,
      account_tax_accounts_id: taxAccount_id,
      default_currency_id: data.currency.id,
      amount: data.amount,
      transaction_date: date,
      transaction_type: data.payment_type,
      description: data.description,
    }

    console.log(dataToSubmit)
    let action

    if (props.editId > 0) {
      console.log("dataToSubmit", dataToSubmit)
      action = TransactionsApi.update(dataToSubmit)
    } else {
      action = TransactionsApi.add(dataToSubmit)
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

  const fetchPaymentChannel = (e) => {
    return Paymentchannels.list({ keyword: e }).then((response) => {
      console.log(response)
      if (typeof response.data.data.data !== "undefined") {
        return response.data.data.data
      } else {
        return []
      }
    })
  }

  const handleTypeChange = (event) => {
    const ss = event.target.value
    setSelectedTypeValue(event.target.value)
    console.log(ss)
  }

  const paymentOptions = [
    { value: "Debit", label: "Debit" },
    { value: "Credit", label: "Credit" },
    { value: "Ledger", label: "Ledger" },
  ]

  const fetchTaxAccounts = (e) => {
    TaxAccount.get({ keyword: e }).then((response) => {
      if (typeof response.data.data.data !== "undefined") {
        setTaxAccount(response.data.data.data)
      } else {
        return []
      }
    })
  }

  const fetchInventoryCategory = (e) => {
    return categories.list({ keyword: e }).then((response) => {
      if (typeof response.data.data) {
        return response.data.data.data
      } else {
        return []
      }
    })
  }
  const fetchPaymentProfile = (e) => {
    return Currency.get({ keyword: e }).then((response) => {
      return []
    })
  }
  const fetchClients = (e) => {
    return Account.get({ keyword: e }).then((response) => {
      if (typeof response.data.data.data) {
        return response.data.data.data
      } else {
        return []
      }
    })
  }

  const selectTaxOption = (data) => {
    setTaxAccount_id(data.id)
    setValue("tax_accounts", data.title)
    setValue("currency", {
      id: data?.default_currency?.id,
      name: data?.default_currency?.name,
    })
  }

  const fetchTransactionsDetails = async () => {
    let Transactions = await TransactionsApi.getDetails({ id: props.editId })
    if (Transactions.data.status === "success") {
      let data = Transactions.data.data
      setValue("title", data.title)
      setValue("business_account", {
        id: data.business_account?.id,
        name: data.business_account?.title,
      })
      setValue("payment_channel", {
        id: data.payment_channel?.id,
        name: data.payment_channel?.title,
      })
      setValue("currency", {
        id: data.default_currency?.id,
        name: data.default_currency?.name,
      })
      setValue("tax_accounts", data.tax_account?.title)
      setTaxAccount_id(data.tax_account?.id)
      setValue("payment_date", data.transaction_date)
      setValue("amount", data.amount)
      setValue("payment_type", data.transaction_type)
      setValue("description", data.description)
    }
  }

  useEffect(() => {
    fetchTaxAccounts()
  }, [])

  useEffect(() => {
    if (Number(props.editId) === 0) {
      setOpen(true)
    }
  }, [props.editId])

  const handleChange = (event) => {
    setSelectedCurrency(event.target.value)
  }
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mr: 2 }}>
        Create Business Invoice
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
            ? "Edit Business Invoice"
            : "Create Business Invoice"}
        </DialogTitle>

        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container>
              {" "}
              <Grid container p={1} spacing={1}>
                <Grid item xs={6}>
                  <SelectX
                    label="Busines Account"
                    options={fetchBusinessAccount}
                    control={control}
                    name={"business_account"}
                    defaultValue={watch("business_account")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <InputLabel
                    sx={{
                      color: "black",
                      fontSize: "14px",
                      pb: 0.5,
                    }}
                  >
                    Tax Account
                  </InputLabel>
                  <ReactSelector
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    options={taxAccount}
                    getOptionLabel={(option) => option.title}
                    getOptionValue={(option) => option.id}
                    // inputValue={inProject}
                    value={taxAccount.filter(
                      (options) => options.title === watch("tax_accounts")
                    )}
                    name="tax_accounts"
                    // isClearable={false}
                    defaultValue={watch("tax_accounts")}
                    onChange={(selectedOption) =>
                      selectTaxOption(selectedOption)
                    }
                  />
                </Grid>
              </Grid>
              <Grid container p={1} spacing={1}>
                <Grid item xs={6}>
                  <SelectX
                    label="Client"
                    options={fetchPaymentProfile}
                    control={control}
                    name={"client"}
                    defaultValue={watch("client")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    label="Payment Profile"
                    options={fetchPaymentProfile}
                    control={control}
                    name={"payment_profile"}
                    defaultValue={watch("payment_profile")}
                  />
                </Grid>
              </Grid>
              <Grid container p={1} spacing={1}>
                <Grid item xs={6}>
                  <SelectX
                    label="Invoice Category"
                    options={fetchPaymentProfile}
                    control={control}
                    name={"invoice_category"}
                    defaultValue={watch("invoice_category")}
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    label="Status"
                    options={fetchPaymentProfile}
                    control={control}
                    name={"status"}
                    defaultValue={watch("status")}
                  />
                </Grid>
              </Grid>
              <Grid container p={1} spacing={1}>
                {" "}
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="invoice_code"
                    label="Invoice Code"
                    value={watch("invoice_code")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateInput
                    control={control}
                    name="invoice_date"
                    label="Invoice Date"
                    value={watch("invoice_date")}
                  />
                </Grid>
                <Grid container spacing={1} p={1}>
                  <Grid item xs={6}>
                    <SelectX
                      label="Default Currency"
                      options={fetchBusinessAccount}
                      control={control}
                      name={"default_currency"}
                      defaultValue={{ id: 1, name: "INR - Indian Rupee" }}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateInput
                      control={control}
                      name="payment_date"
                      label="Payment Date"
                      value={watch("payment_date")}
                    />
                  </Grid>
                </Grid>
                {selectedCurrency === "local" ? (
                  <Grid item xs={6}>
                    <SelectX
                      label="Local Currency"
                      options={fetchPaymentProfile}
                      control={control}
                      name={"local_currency"}
                      defaultValue={watch("local_currency")}
                    />
                  </Grid>
                ) : (
                  <>
                    <Grid item xs={6}>
                      <SelectX
                        label="Foreign Currency"
                        options={fetchPaymentProfile}
                        control={control}
                        name={"foreign_currency"}
                        defaultValue={watch("foreign_currency")}
                      />
                    </Grid>{" "}
                    <Grid item xs={6}>
                      <TextInput
                        control={control}
                        // placeholder="Enter product Name"
                        name="invoice_code"
                        label="Converstion Rate"
                        value={watch("invoice_code")}
                      />
                    </Grid>
                  </>
                )}
                <Grid item xs={6}></Grid>{" "}
                <Grid container spacing={2} pt={3} pl={3}>
                  <RadioGroup value={selectedCurrency} onChange={handleChange}>
                    <Grid item xs={12}>
                      <FormControlLabel
                        value="local"
                        control={<Radio />}
                        label="Show Local Currency"
                        style={{ display: "inline-flex" }}
                      />
                      <FormControlLabel
                        value="foreign"
                        control={<Radio />}
                        label="Show Foreign Currency"
                        style={{ display: "inline-flex" }}
                      />{" "}
                    </Grid>
                  </RadioGroup>
                </Grid>{" "}
                <Grid p={1} item xs={12}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="title"
                    label="Title"
                    value={watch("title")}
                  />
                </Grid>{" "}
                <Grid container spacing={1} p={1}>
                  <Grid item xs={6}>
                    <SelectX
                      label="Payment Channel"
                      options={fetchPaymentProfile}
                      control={control}
                      name={"payment_channel"}
                      defaultValue={watch("payment_channel")}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <DateInput
                      control={control}
                      name="payment_date"
                      label="Payment Date"
                      value={watch("payment_date")}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} p={1}>
                  <Grid item xs={6}>
                    <TextInput
                      control={control}
                      isMultiline
                      row={4}
                      name="warning_note"
                      label="Warning Notes"
                      value={watch("warning_note")}
                    />
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <TextInput
                      control={control}
                      isMultiline
                      row={4}
                      name="description"
                      label="Description"
                      value={watch("description")}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1} p={1}>
                  <Grid item xs={6}>
                    <TextInput
                      control={control}
                      isMultiline
                      row={4}
                      name="audit_remarks"
                      label="Audit Remarks"
                      value={watch("audit_remarks")}
                    />
                  </Grid>{" "}
                  <Grid item xs={6}>
                    <TextInput
                      control={control}
                      isMultiline
                      row={4}
                      name="private_remarks"
                      label="Private Remarks"
                      value={watch("private_remarks")}
                    />
                  </Grid>
                </Grid>
                {/* <Grid container spacing={1} p={1} sx={{ mt: 2 }}>
                <Grid item xs={6}>
                  <InputLabel
                    sx={{
                      color: "black",
                      fontSize: "14px",
                      pb: 0.5,
                    }}
                  >
                    Payment Type
                  </InputLabel>
                  <ReactSelector
                    styles={{
                      menu: (provided) => ({ ...provided, zIndex: 9999 }),
                    }}
                    label="Payment Type"
                    options={paymentOptions}
                    value={paymentOptions.filter(
                      (option) => option.label === watch("payment_type")
                    )}
                    name="payment_type"
                    // isClearable={true}
                    defaultValue={watch("payment_type")}
                    onChange={(selectedOption) =>
                      setValue("payment_type", selectedOption?.value || "")
                    }
                  />
                </Grid>

                <Grid item xs={6}>
                  <SelectX
                    // key={refresh * 0.2}
                    label={"Payment channel"}
                    options={fetchPaymentChannel}
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
                    name={"payment_channel"}
                    defaultValue={watch("payment_channel")}
                  />
                </Grid>
              </Grid> */}
                <Grid sx={{ mt: 1 }} p={1} item xs={12}>
                  <LoadingButton
                    loading={formButtonStatus.loading}
                    disabled={formButtonStatus.disabled}
                    variant="outlined"
                  >
                    {formButtonStatus.label}
                  </LoadingButton>
                </Grid>
              </Grid>
            </Grid>{" "}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateTransactions

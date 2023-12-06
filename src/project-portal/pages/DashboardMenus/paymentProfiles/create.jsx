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
import { Account } from "../../../../api/Endpoints/Account"
import Select from "react-select"
import { VendorPayments } from "../../../../api/Endpoints/VendorPayments"
import { Employee } from "../../../../api/Endpoints/Employee"
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
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [PopulatedProfile, setPopulatedProfile] = useState(null)
  const [drpLoaing, setDrpLoading] = useState(false)
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
  useEffect(() => {
    if (parseInt(props.editId) > 0) {
      setEditValues(props.rowdetails.row)
      setOpen(true)
      console.log(editValues)
    } else if (Number(props.editId) === 0) {
      setOpen(true)
    }
  }, [])

  const ProfileType = [
    { value: "client", label: "Client" },
    { value: "vendor", label: "Vendor" },
    { value: "employee", label: "Employee" },
    { value: "other", label: "Other" },
  ]

  //Logic For populating ProfileDropdown
  const handleProfileChange = async (selectedOption) => {
    setSelectedProfile(selectedOption)
    setValue("profile", selectedOption)
    setValue("populatedProfile", [])
    setPopulatedProfile(null)
    if (selectedOption?.value === "client") {
      setDrpLoading(true)
      try {
        const clients = await fetchClients()
        const transformedClients = clients.map((client) => ({
          value: client.id,
          label: client.account_name,
        }))
        setValue("populatedProfile", transformedClients)
      } catch (error) {
        console.error("Error :", error)
        setValue("populatedProfile", [])
      }
      setDrpLoading(false)
    } else if (selectedOption?.value === "vendor") {
      setDrpLoading(true)
      try {
        const vendors = await fetchVendors()
        const transformedVendors = vendors.map((vendor) => ({
          value: vendor.id,
          label: vendor.name,
        }))
        setValue("populatedProfile", transformedVendors)
      } catch (error) {
        console.error("Error :", error)
        setValue("populatedProfile", [])
      }
      setDrpLoading(false)
    } else if (selectedOption?.value === "employee") {
      setDrpLoading(true)
      try {
        const employees = await fetchEmployees()
        const transformedEmployees = employees.map((employee) => ({
          value: employee.id,
          label: employee.name,
        }))
        setValue("populatedProfile", transformedEmployees)
      } catch (error) {
        console.error("Error :", error)
        setValue("populatedProfile", [])
      }
      setDrpLoading(false)
    } else if (selectedOption?.value === "other") {
      setValue("populatedProfile", [{ value: 1, label: "Other" }])
    }
  }
  //Login For ProfileDropdown Search
  const onSearchValue = (e) => {
    if (selectedProfile?.value === "client") {
      setDrpLoading(true)
      fetchClients(e)
        .then((Clie) => {
          const transformedClient = Clie.map((client) => ({
            value: client.id,
            label: client.account_name,
          }))
          setValue("populatedProfile", transformedClient)
          setDrpLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching clients:", error)
          setDrpLoading(false)
          setValue("populatedProfile", [])
        })
    } else if (selectedProfile?.value === "vendor") {
      setDrpLoading(true)
      fetchVendors(e)
        .then((Vendo) => {
          const transformedVendor = Vendo.map((vendor) => ({
            value: vendor.id,
            label: vendor.name,
          }))
          setValue("populatedProfile", transformedVendor)
          setDrpLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching clients:", error)
          setDrpLoading(false)
          setValue("populatedProfile", [])
        })
    } else if (selectedProfile?.value === "employee") {
      setDrpLoading(true)
      fetchEmployees(e)
        .then((Employ) => {
          const transformedEmployee = Employ.map((employee) => ({
            value: employee.id,
            label: employee.name,
          }))
          setValue("populatedProfile", transformedEmployee)
          setDrpLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching clients:", error)
          setDrpLoading(false)
          setValue("populatedProfile", [])
        })
    } else {
      return
    }
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

  const fetchVendors = (e) => {
    return VendorPayments.vendors({ keyword: e }).then((response) => {
      if (typeof response.data.data !== "undefined") {
        return response.data.data
      } else {
        return []
      }
    })
  }
  const fetchEmployees = (e) => {
    return Employee.get({ keyword: e }).then((response) => {
      if (typeof response.data !== "undefined") {
        return response.data.data.data
      } else {
        return []
      }
    })
  }

  const onSubmit = () => {
    console.log("Form submitted!")
  }

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen} sx={{ mr: 2 }}>
        Create Payment Profile
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
                  name="title"
                  label="Title"
                  value={watch("title")}
                />
              </Grid>
              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <Select
                    isClearable
                    placeholder="Profile Type"
                    name="profile_type"
                    options={ProfileType}
                    value={selectedProfile}
                    onChange={handleProfileChange}
                    styles={{
                      menu: (provided, state) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Select
                    isClearable
                    isLoading={drpLoaing}
                    onInputChange={(e) => onSearchValue(e)}
                    placeholder="Profile"
                    options={watch("populatedProfile", [])}
                    value={PopulatedProfile}
                    onChange={(selectedClient) =>
                      setPopulatedProfile(selectedClient)
                    }
                    styles={{
                      menu: (provided, state) => ({
                        ...provided,
                        zIndex: 9999,
                      }),
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ pt: 2 }}>
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
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="tax_id"
                    label="Tax ID"
                    value={watch("tax_id")}
                  />
                </Grid>
              </Grid>
              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="billing_country"
                    label="Billing Country"
                    value={watch("billing_country")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="billing_currency"
                    label="Billing Currency"
                    value={watch("billing_currency")}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} pt={2}>
                <TextInput
                  control={control}
                  isMultiline
                  row={4}
                  name="billing_address"
                  label="Billing Address"
                  value={watch("billing_address")}
                />
              </Grid>
              <Grid item xs={12} pt={2}>
                <TextInput
                  control={control}
                  isMultiline
                  row={4}
                  name="account_details"
                  label="Account Details"
                  value={watch("account_details")}
                />
              </Grid>{" "}
              <Grid container spacing={1} sx={{ pt: 2 }}>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="account_name"
                    label=" Accounts contact name"
                    value={watch("account_name")}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextInput
                    control={control}
                    // placeholder="Enter product Name"
                    name="account_phone"
                    label=" Accounts contact phone"
                    value={watch("account_phone")}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} pt={2}>
                <TextInput
                  control={control}
                  // placeholder="Enter product Name"
                  name="invoice_mail"
                  label="Invoice Mail IDs"
                  value={watch("invoice_mail")}
                />
              </Grid>
              <Grid item xs={12} pt={2}>
                <TextInput
                  control={control}
                  isMultiline
                  row={4}
                  name="remarks"
                  label="Remarks"
                  value={watch("remarks")}
                />
              </Grid>
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

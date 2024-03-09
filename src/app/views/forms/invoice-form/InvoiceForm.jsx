import React from 'react'
import { Formik } from 'formik'
import {
    Grid,
    Card,
    Divider,
    TextField,
    MenuItem,
    Button,
    Icon,
} from '@mui/material'
// import {
//     MuiPickersUtilsProvider,
//     DatePicker,
// } from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DateFnsUtils from '@date-io/date-fns'
import InvoiceItemTable from './InvoiceItemTable'
import { useDispatch, useSelector } from 'react-redux'
import { setInvoiceData } from 'app/redux/actions/FormAction'
import { getStoreList } from 'app/redux/actions/UserAction'
import { useEffect } from 'react'
import history from 'history.js'
import useAuth from 'app/hooks/useAuth'

const InvoiceForm = () => {
    const dispatch = useDispatch();
    const [validateFields, isFormValid] = React.useState(false);

    useEffect(() => {
        dispatch(getStoreList())
    }, []);
    const [selectedUser, setSelectedUser] = React.useState('');
    const calculateSubTotal = (values) => {
        let subTotal = 0
        let itemList = values.items || []
        itemList.forEach((item) => {
            subTotal += item.amount
        })
        values['subTotal'] = subTotal;
        return subTotal || 0
    }

    const calculateGstTotal = (values) => {
        let gstTotal = 0
        let sgstTotal = 0
        let cgstTotal = 0
        let itemList = values.items || []
        itemList.forEach((item) => {
            gstTotal += updateItemCalculateGST(item);
            sgstTotal += item.SGST
            cgstTotal += item.CGST
        })
        values['sgstTotal'] = sgstTotal;
        values['cgstTotal'] = cgstTotal;
        return gstTotal || 0
    }

    const updateItemCalculateGST = (item) => {
        var amt = item.amount || 0;
        var gstAmt = (amt * (item.gst || 0)) / 100;
        item['SGST'] = gstAmt / 2;
        item['CGST'] = gstAmt / 2;
        item['TotalGstAmt'] = gstAmt;
        item['amountWithGst'] = amt + gstAmt;
        return gstAmt;
    }

    const calculateTotal = (values) => {
        let total = 0
        total += calculateSubTotal(values)
        total += values.shippingCharge || 0
        total += calculateGstTotal(values) || 0
        values['gstTotal'] = total;
        return total || 0
    }
    const { user } = useAuth();
    const handleSubmit = async (values, { isSubmitting }) => {
        values.gst = values.customerDetails.gst;
        if (!!values.items) {
            values['createdBy'] = user.userName
            await dispatch(await setInvoiceData(values))
            console.log("[Value]" + JSON.stringify(values))
            navigate('/forms/invoiceFormat')
        }
    }

    const handleError = (value) => {
        if (!value) {
            isFormValid(false);
            return true;
        }
        isFormValid(true);
        return false
    }
    const userList = useSelector((state) => state.userReducer.customerList);
    return (
        <div className="m-sm-30">
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Invoice</h4>
                </div>
                <Divider className="mb-2" />

                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}
                >
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <form className="p-4" onSubmit={handleSubmit}>

                            <Grid container spacing={3} alignItems="center">
                                <Grid item md={2} sm={4} xs={12}>
                                    Customer Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Name"
                                        name="customerDetails"
                                        size="small"
                                        variant="outlined"
                                        helperText={handleError(values.customerDetails) ? 'Please select customer Name' : ''}
                                        error={handleError(values.customerDetails)}
                                        select
                                        value={values.customerDetails || ''}
                                        onChange={handleChange}
                                    >
                                        {userList.map((item, index) => (
                                            <MenuItem value={item} onClick={() => setSelectedUser(item)} key={item.mobileNo}>
                                                {item.businessName}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    State
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="State"
                                        name="state"
                                        size="small"
                                        variant="outlined"
                                        value={values.state || ''}
                                        onChange={handleChange}
                                        helperText={handleError(values.state) ? 'Please select state' : ''}
                                        error={handleError(values.state)}
                                        select
                                    >
                                        {stateList.map((item, ind) => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    GSTIN
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        name="gst"
                                        size="small"
                                        variant="outlined"
                                        inputProps={
                                            { readOnly: true }
                                        }
                                        value={selectedUser.gst}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Invoice Date
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <div className="flex flex-wrap m--2">
                                        <LocalizationProvider dateAdapter={DateFnsUtils}>
                                            <DatePicker
                                                className="m-2"
                                                margin="none"
                                                inputVariant="outlined"
                                                size="small"
                                                autoOk={true}
                                                isValid
                                                value={values.fromdate}
                                                format="dd-MM-yy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'fromdate',
                                                        date
                                                    )
                                                }
                                            />
                                        </LocalizationProvider>

                                        <LocalizationProvider dateAdapter={DateFnsUtils}>
                                            <DatePicker
                                                className="m-2"
                                                margin="none"
                                                inputVariant="outlined"
                                                size="small"
                                                autoOk={true}
                                                isValid
                                                value={values.tillDate}
                                                format="dd-MM-yy"
                                                onChange={(date) =>
                                                    setFieldValue(
                                                        'tillDate',
                                                        date
                                                    )
                                                }
                                            />
                                        </LocalizationProvider>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                {/* <div className="flex p-4">
                                    <h4 className="m-0">Transport Details</h4>
                                </div> */}
                                <Grid item md={2} sm={4} xs={12}>
                                    Transport Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Transport Name"
                                        name="transportName"
                                        size="small"
                                        variant="outlined"
                                        helperText={handleError(values.transportName) ? 'Please select transport name' : ''}
                                        error={handleError(values.transportName)}
                                        value={values.transportName || ''}
                                        onChange={handleChange}
                                        select
                                    >
                                        {transportMode.map((item, ind) => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Delivery Location
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Delivery Location"
                                        name="deliveryLocation"
                                        size="small"
                                        variant="outlined"
                                        helperText={handleError(values.deliveryLocation) ? 'Please enter delivery location' : ''}
                                        error={handleError(values.deliveryLocation)}
                                        value={values.deliveryLocation}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <div className="mb-8">
                                <InvoiceItemTable
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleError={handleError}
                                />
                            </div>

                            <div className="mb-8">
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Custom Notes"
                                            name="notes"
                                            size="small"
                                            variant="outlined"
                                            multiline
                                            rows={6}
                                            fullWidth
                                            value={values.notes}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Card
                                            className="bg-default p-4"
                                            elevation={0}
                                        >
                                            <Grid
                                                container
                                                spacing={3}
                                                justify="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item xs={6}>
                                                    Sub Total
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        {calculateSubTotal(
                                                            values
                                                        ) > 0 ? calculateSubTotal(
                                                            values
                                                        ).toFixed(2) : ''}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    GST Amount
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        {calculateGstTotal(
                                                            values
                                                        ).toFixed(2)}
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="flex items-center">
                                                        <span className="whitespace-pre">
                                                            Shipping Charges
                                                        </span>
                                                        <TextField
                                                            className="ml-3"
                                                            name="shippingCharge"
                                                            size="small"
                                                            type="number"
                                                            variant="outlined"
                                                            value={
                                                                values.shippingCharge ||
                                                                ''
                                                            }
                                                            onChange={
                                                                handleChange
                                                            }
                                                        />
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        {(
                                                            values.shippingCharge ||
                                                            0
                                                        ).toFixed(2)}
                                                    </div>
                                                </Grid>

                                                <Grid item xs={6}>
                                                    <h5 className="m-0">
                                                        Total ( $ )
                                                    </h5>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div className="text-right">
                                                        <h5 className="m-0">
                                                            {calculateTotal(
                                                                values
                                                            ) > 0 ? calculateTotal(
                                                                values
                                                            ).toFixed(2) : ''}
                                                        </h5>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="mt-6">
                                <Button
                                    color="primary"
                                    variant="contained"
                                    disabled={!validateFields}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                            </div>
                        </form>
                    )}
                </Formik>
            </Card>
        </div>
    )
}


const transportMode = [
    'Courier',
    'Mail'
]

const stateList = [
    "JAMMU AND KASHMIR-1",
    "HIMACHAL PRADESH-2",
    "PUNJAB-3",
    "CHANDIGARH-4",
    "UTTARAKHAND-5",
    "HARYANA-6",
    "DELHI-7",
    "RAJASTHAN-8",
    "UTTAR PRADESH-9",
    "BIHAR-10",
    "SIKKIM-11",
    "ARUNACHAL PRADESH-12",
    "NAGALAND-13",
    "MANIPUR-14",
    "MIZORAM-15",
    "TRIPURA-16",
    "MEGHALAYA-17",
    "ASSAM-18",
    "WEST BENGAL-19",
    "JHARKHAND-20",
    "ODISHA-21",
    "CHATTISGARH-22",
    "MADHYA PRADESH-23",
    "GUJARAT-24",
    "DADRA AND NAGAR HAVELI AND DAMAN AND DIU-26",
    "MAHARASHTRA-27",
    "ANDHRA PRADESH-28",
    "KARNATAKA-29",
    "GOA-30",
    "LAKSHADWEEP-31",
    "KERALA-32",
    "TAMIL NADU-33",
    "PUDUCHERRY-34",
    "ANDAMAN AND NICOBAR ISLANDS-35",
    "TELANGANA-36",
    "ANDHRA PRADESH-37",
    "LADAKH-38"
]

const initialValues = {
    customerDetails: "",
    gst: '',
    fromdate: "",
    tillDate: "",
    transportName: "",
    deliveryLocation: ""
}

export default InvoiceForm

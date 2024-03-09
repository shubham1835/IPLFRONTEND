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
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import POItemTable from './POItemTable'
import { useDispatch, useSelector } from 'react-redux'
import { setPOData } from 'app/redux/actions/FormAction'
import { getStoreList } from 'app/redux/actions/UserAction'
import { getProductList } from 'app/redux/actions/EcommerceActions'
import { useEffect } from 'react'
import history from 'history.js'
import useAuth from 'app/hooks/useAuth'

const POForm = () => {
    const dispatch = useDispatch();
    const [validateFields, isFormValid] = React.useState(false);

    useEffect(() => {
        dispatch(getStoreList())
    }, []);
    const [selectedUser, setSelectedUser] = React.useState('');

    useEffect(() => {
        dispatch(getProductList(selectedUser.id))
    }, [selectedUser]);

    const calculateSubTotal = (values) => {
        let subTotal = 0
        let itemList = values.items || []
        itemList.forEach((item) => {
            subTotal += item.amountWithountGst
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
        var amt = item.amountWithountGst || 0;
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
        total += values.otherCharges || 0
        total += calculateGstTotal(values) || 0
        values['gstTotal'] = total;
        return total || 0
    }
    const { user } = useAuth()
    const handleSubmit = async (values, { isSubmitting }) => {
        if (!!values.items) {
            values['createdBy'] = user.userName
            await dispatch(await setPOData(values))
            console.log("[Value]" + JSON.stringify(values))
            navigate('/po/poformat')
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
    const dataList = useSelector((state) => state.ecommerce.productList);
    const prdList = []
    dataList.forEach(({ data }) => data.forEach((ele) => prdList.push(ele)));
    return (
        <div className="m-sm-30">
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Purchase Order</h4>
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
                                    Delivery Date
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                    >
                                        <KeyboardDatePicker
                                            className="max-w-188"
                                            margin="none"
                                            inputVariant="outlined"
                                            size="small"
                                            autoOk={true}
                                            isValid
                                            value={values.deliveryDate}
                                            format="dd-MM-yy"
                                            onChange={(date) =>
                                                setFieldValue(
                                                    'deliveryDate',
                                                    date
                                                )
                                            }
                                        />
                                    </MuiPickersUtilsProvider>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Payment Terms
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        name="paymentTerms"
                                        label="Payment Terms"
                                        size="small"
                                        variant="outlined"
                                        value={values.paymentTerms}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Requested By
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        name="requestedBy"
                                        label="Requested By"
                                        size="small"
                                        variant="outlined"
                                        value={values.requestedBy}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Department
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        name="department"
                                        label="Department"
                                        size="small"
                                        variant="outlined"
                                        value={values.department}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                            </Grid>

                            <div className="mb-8">
                                <POItemTable
                                    values={values}
                                    setFieldValue={setFieldValue}
                                    handleChange={handleChange}
                                    handleError={handleError}
                                    prdList={prdList}
                                />
                            </div>

                            <div className="mb-8">
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Comment or special instructions"
                                            name="comments"
                                            size="small"
                                            variant="outlined"
                                            multiline
                                            rows={6}
                                            fullWidth
                                            value={values.comments}
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
                                                    <div className="flex items-center">
                                                        <span className="whitespace-pre">
                                                            Other
                                                        </span>
                                                        <TextField
                                                            className="ml-3"
                                                            name="otherCharges"
                                                            size="small"
                                                            type="number"
                                                            variant="outlined"
                                                            value={
                                                                values.otherCharges ||
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
                                                            values.otherCharges ||
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

const initialValues = {
    customerDetails: "",
    deliveryDate: '',
    paymentTerms: "",
    requestedBy: "",
    department: "",
    comments: ""
}

export default POForm

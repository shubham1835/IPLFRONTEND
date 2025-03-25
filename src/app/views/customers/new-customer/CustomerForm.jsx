/* eslint-disable */
import React, { useEffect } from 'react'
import { Formik } from 'formik'
import {
    Grid,
    Card,
    Divider,
    TextField,
    MenuItem,
    Button,
    Tabs,
    CircularProgress
} from '@mui/material'
import { Tab } from '@mui/material'
import { TabContext, TabPanel } from '@mui/lab'
import { withStyles } from '@mui/styles';
import useAuth from 'app/hooks/useAuth';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux'
import { getStates } from 'app/redux/actions/StateAction'
import Chip from '@mui/material/Chip'
import { Done } from '@mui/icons-material'

const AntTabs = withStyles({
    root: {
        borderBottom: '1px solid #e8e8e8',
    },
    indicator: {
        backgroundColor: '#1890ff',
    },
})(Tabs);

const AntTab = withStyles((theme) => ({
    root: {
        textTransform: 'none',
        minWidth: 72,
        fontWeight: theme.typography.fontWeightRegular,
        marginRight: theme.spacing(4),
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            color: '#40a9ff',
            opacity: 1,
        },
        '&$selected': {
            color: '#1890ff',
            fontWeight: theme.typography.fontWeightMedium,
        },
        '&:focus': {
            color: '#40a9ff',
        },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles(({ palette, ...theme }) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const CustomerForm = () => {
    const { register } = useAuth()
    const dispatch = useDispatch();
    const [value, setValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [validateFields, isFormValid] = React.useState(false);
    const classes = useStyles()
    useEffect(() => {
        console.log('[states]')
        dispatch(getStates())
    }, []);
    const handleTabChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleSubmit = async (values, { isSubmitting }) => {

        if (validateFields) {
            console.log('{Validated}')
            values['entityType'] = 'Global'
            try {
                setLoading(true)
                await register(values)
                console.log('{Registered}')
                setMessage('Successfully Added Vendor')
                handleClickOpen()
                setLoading(false)
            } catch (e) {
                setLoading(false)
                console.log(e)
                setMessage(e.message)
                handleClickOpen()
            }
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

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    return (
        <div className="m-sm-30">
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Customer</h4>
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
                        handleSubmit
                    }) => (
                        <form className="p-4" onSubmit={handleSubmit}>
                            <Grid container spacing={3} alignItems="center">
                                <Grid item md={2} sm={4} xs={12}>
                                    Business Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Business Name"
                                        name="businessName"
                                        size="small"
                                        variant="outlined"
                                        value={values.businessName}
                                        helperText={handleError(values.businessName) ? 'Business Name should not be empty' : ''}
                                        error={handleError(values.businessName)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Business Type
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Business Type"
                                        name="businessType"
                                        size="small"
                                        variant="outlined"
                                        select
                                        value={values.businessType || ''}
                                        helperText={handleError(values.businessType) ? 'Business Type should not be empty' : ''}
                                        error={handleError(values.businessType)}
                                        onChange={handleChange}
                                    >
                                        {Object.entries({ 'Service': 'service', 'E-Commerce': 'ecommerce' }).map(([key, value]) => (
                                            <MenuItem value={value} key={key}>
                                                {key}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Business Category
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Business Category"
                                        name="businessCategory"
                                        size="small"
                                        variant="outlined"
                                        select
                                        value={values.businessCategory || ''}
                                        helperText={handleError(values.businessCategory) ? 'Business Category should not be empty' : ''}
                                        error={handleError(values.businessCategory)}
                                        onChange={handleChange}
                                    >
                                        {Object.entries({ 'Grooming': 'grooming', 'Kennel': 'kennl' }).map(([key, value]) => (
                                            <MenuItem value={value} key={key}>
                                                {key}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Mobile Number
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Mobile No"
                                        name="mobileNo"
                                        size="small"
                                        variant="outlined"
                                        value={values.mobileNo}
                                        helperText={handleError(values.mobileNo) ? 'Mobile No should not be empty' : ''}
                                        error={handleError(values.mobileNo)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item md={2} sm={4} xs={12}>
                                    Email
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Email id"
                                        name="emailId"
                                        size="small"
                                        variant="outlined"
                                        value={values.emailId}
                                        helperText={handleError(values.emailId) ? 'Email id should not be empty' : ''}
                                        error={handleError(values.emailId)}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                {/* <Grid item md={2} sm={4} xs={12}>
                                    Business Pan
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Business pan"
                                        name="pan"
                                        size="small"
                                        variant="outlined"
                                        value={values.pan}
                                        helperText={handleError(values.pan) ? 'Business pan should not be empty' : ''}
                                        error={handleError(values.pan)}
                                        onChange={handleChange}
                                    />
                                </Grid> */}
                                <Grid item md={2} sm={4} xs={12}>
                                    GST No.
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="GST No."
                                        name="gst"
                                        size="small"
                                        variant="outlined"
                                        value={values.gst}
                                        helperText={handleError(values.gst) ? 'GST No. should not be empty' : ''}
                                        error={handleError(values.gst)}
                                        onChange={handleChange}
                                    />
                                </Grid>

                            </Grid>
                            <TabContext value={value}>
                                <AntTabs value={value} onChange={handleTabChange} aria-label="simple tabs example">
                                    <AntTab label="Address" value="1" />
                                    {console.log('yjtfj' + values.businessType)}
                                    {values.businessType === 'service' && <AntTab label="Create Slots" value="2" />}
                                </AntTabs>
                                <TabPanel value="1"><Address handleError={handleError} values={values} handleChange={handleChange} /></TabPanel>
                                {values.businessType === 'service' && <TabPanel value="2"><Slot handleError={handleError} values={values} handleChange={handleChange} /></TabPanel>}
                            </TabContext>
                            <div className="relative mt-6">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!validateFields || loading}
                                    type="submit"
                                >
                                    Submit
                                </Button>
                                {loading && (
                                    <CircularProgress
                                        size={24}
                                        className={
                                            classes.buttonProgress
                                        }
                                    />
                                )}
                            </div>
                        </form>
                    )}
                </Formik>
            </Card>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Response"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

const Slot = ({ values, handleChange, handleError }) => {
    const [chipData, setChipData] = React.useState([
        { key: 0, label: 'Monday', color: 'success' },
        { key: 1, label: 'Tuesday', color: 'success' },
        { key: 2, label: 'Wednesday', color: 'success' },
        { key: 3, label: 'Thursday', color: 'success' },
        { key: 4, label: 'Friday', color: 'success' },
        { key: 5, label: 'Saturday', color: 'success' },
        { key: 6, label: 'Sunday', color: 'success' },
    ]);

    const timeArray = ['01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00'];

    const handleClick = (data) => () => {
        data.color = data.color === 'success' ? 'primary' : 'success';
        setChipData([...chipData], data);
        values.activeDays = chipData;
    };
    return (
        <Grid container spacing={3} alignItems="center">

            <Grid item md={12} sm={12} xs={12}>
                {chipData.map((data) => {
                    return <Chip key={data.key} icon={data.color === 'primary' ? <Done /> : null} label={data.label} style={{ 'marginLeft': '5px' }} color={data.color} onClick={handleClick(data)} />
                })}
            </Grid>
            <Grid item md={2} sm={4} xs={12}>
                Opening Time
            </Grid>
            <Grid item md={10} sm={8} xs={12}>
                <TextField
                    className="min-w-188"
                    label="Opening Time"
                    name="openingTime"
                    size="small"
                    variant="outlined"
                    select
                    value={values.openingTime || ''}
                    helperText={handleError(values.openingTime) ? 'Opening Time should not be empty' : ''}
                    error={handleError(values.openingTime)}
                    onChange={handleChange}
                >
                    {timeArray.map((value) => (
                        <MenuItem value={value} key={value}>
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item md={2} sm={4} xs={12}>
                Closing Time
            </Grid>
            <Grid item md={10} sm={8} xs={12}>
                <TextField
                    className="min-w-188"
                    label="Closing Time"
                    name="closingTime"
                    size="small"
                    variant="outlined"
                    select
                    value={values.closingTime || ''}
                    helperText={handleError(values.closingTime) ? 'Closing Time should not be empty' : ''}
                    error={handleError(values.closingTime)}
                    onChange={handleChange}
                >
                    {timeArray.map((value) => (
                        <MenuItem value={value} key={value}>
                            {value}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    )
}

const Address = ({ values, handleChange, handleError }) => {
    const state = useSelector((state) => state.configReducer.states);
    return (
        <Grid container spacing={3} alignItems="center">
            <Grid item md={2} sm={4} xs={12}>
                Address
            </Grid>
            <Grid item md={10} sm={8} xs={12}>
                <TextField
                    label="Address"
                    name="businessAddress"
                    size="medium"
                    variant="outlined"
                    value={values.businessAddress}
                    helperText={handleError(values.businessAddress) ? 'Address should not be empty' : ''}
                    error={handleError(values.businessAddress)}
                    onChange={handleChange}
                />
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
                    select
                    value={values.state || ''}
                    helperText={handleError(values.state) ? 'state should not be empty' : ''}
                    error={handleError(values.state)}
                    onChange={handleChange}
                >
                    {Object.keys(state).map((item, ind) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>

            <Grid item md={2} sm={4} xs={12}>
                City
            </Grid>
            <Grid item md={10} sm={8} xs={12}>
                <TextField
                    className="min-w-188"
                    label="City"
                    name="city"
                    size="small"
                    variant="outlined"
                    select
                    value={values.city || ''}
                    helperText={handleError(values.city) ? 'city should not be empty' : ''}
                    error={handleError(values.city)}
                    onChange={handleChange}
                >
                    {values.state ? state[values.state].map((item, ind) => (
                        <MenuItem value={item} key={item}>
                            {item}
                        </MenuItem>
                    )) : ''}
                </TextField>
            </Grid>

            <Grid item md={2} sm={4} xs={12}>
                Zip
            </Grid>
            <Grid item md={10} sm={8} xs={12}>
                <TextField
                    label="Zip"
                    name="pincode"
                    size="small"
                    variant="outlined"
                    value={values.pincode}
                    helperText={handleError(values.pincode) ? 'zip should not be empty' : ''}
                    error={handleError(values.pincode)}
                    onChange={handleChange}
                />
            </Grid>
        </Grid>
    )
}

const initialValues = {
    businessName: '',
    businessCategory: '',
    businessType: '',
    mobileNo: '',
    emailId: '',
    gst: '',
    businessAddress: '',
    city: '',
    pincode: '',
    activeDays: [],
}

export default CustomerForm


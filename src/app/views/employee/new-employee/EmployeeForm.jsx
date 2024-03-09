import React from 'react'
import { Formik } from 'formik'
import {
    Grid,
    Card,
    Divider,
    TextField,
    MenuItem,
    Button,
    CircularProgress
} from '@mui/material'
import useAuth from 'app/hooks/useAuth';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles(({ palette, ...theme }) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const EmployeeForm = () => {
    const { registerEmployee } = useAuth()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false)
    const [message, setMessage] = React.useState('')
    const [validateFields, isFormValid] = React.useState(false);
    const classes = useStyles()
    const navigate = useNavigate();
    const handleSubmit = async (values, { isSubmitting }) => {

        if (validateFields) {
            console.log('{Validated}')
            values['entityType'] = 'Global'
            try {
                setLoading(true)
                await registerEmployee(values)
                console.log('{Registered}')
                setLoading(false)
                navigate('/employee/qr')
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
                                    Employee Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Employee Name"
                                        name="name"
                                        size="small"
                                        variant="outlined"
                                        value={values.name}
                                        helperText={handleError(values.name) ? 'Business Name should not be empty' : ''}
                                        error={handleError(values.name)}
                                        onChange={handleChange}
                                    />
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
                                    Address
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Address"
                                        name="address"
                                        size="small"
                                        variant="outlined"
                                        value={values.address}
                                        helperText={handleError(values.address) ? 'Address should not be empty' : ''}
                                        error={handleError(values.address)}
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
                                <Grid item md={2} sm={4} xs={12}>
                                    User Role
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        className="min-w-188"
                                        label="Name"
                                        name="role"
                                        size="small"
                                        variant="outlined"
                                        helperText={handleError(values.role) ? 'Please select user role' : ''}
                                        error={handleError(values.role)}
                                        select
                                        value={values.role || ''}
                                        onChange={handleChange}
                                    >
                                        {roles.map((item, index) => (
                                            <MenuItem value={item} key={item}>
                                                {item}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    User Name
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="User Name"
                                        name="userName"
                                        size="small"
                                        variant="outlined"
                                        value={values.userName}
                                        helperText={handleError(values.userName) ? 'userName should not be empty' : ''}
                                        error={handleError(values.userName)}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Password
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Password"
                                        name="password"
                                        size="small"
                                        variant="outlined"
                                        type="password"
                                        value={values.password}
                                        helperText={handleError(values.password) ? 'password should not be empty' : ''}
                                        error={handleError(values.password)}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={2} sm={4} xs={12}>
                                    Confirm Password
                                </Grid>
                                <Grid item md={10} sm={8} xs={12}>
                                    <TextField
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        size="small"
                                        variant="outlined"
                                        type="password"
                                        value={values.confirmPassword}
                                        helperText={values.password !== values.confirmPassword ? 'confirm password should match password' : ''}
                                        error={values.password !== values.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Grid>
                            </Grid>
                            <div className="relative mt-6">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    disabled={!values.name || !values.password || !values.mobileNo || !values.confirmPassword || !values.userName || !values.emailId || !values.role || loading}
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

const roles = [
    'ADMIN',
    'EDITOR',
    'GUEST'
]

const initialValues = {
    name: "",
    mobileNo: "",
    role: "",
    userName: "",
    emailId: "",
    password: "",
    address: ""
}

export default EmployeeForm

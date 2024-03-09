import React from 'react'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import {
    Grid,
    Card,
    Divider,
    MenuItem,
    Button,
    CircularProgress
} from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreList } from 'app/redux/actions/UserAction'
import { getCategoryList } from 'app/redux/actions/ServiceAction'
import { useEffect } from 'react'
import InputAdornment from '@mui/material/InputAdornment';
import AddCircle from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { addCategory, addProductCall } from 'app/redux/actions/ServiceAction'
import { Formik } from 'formik'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const AddProduct = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = React.useState(false)
    const [selectedUser, setSelectedUser] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [message, setMessage] = React.useState('')
    const initialValues = {
        customerDetails: '',
        category: '',
        categoryToBeAdded: '',
        serviceName: '',
        description: '',
        productCode: '',
        sku: '',
        price: 0
    }
    const classes = useStyles()
    useEffect(() => {
        dispatch(getStoreList())
    }, []);

    useEffect(() => {
        console.log('[selectedUser]', selectedUser)
        if (!!selectedUser)
            dispatch(getCategoryList(selectedUser.id))
    }, [selectedUser]);

    const handleSubmit = async (values, { isSubmitting }) => {
        // const data = {
        //     'storeId': customerDetails.id, category, categoryToBeAdded, description,
        //     productCode, productName, sku, price, unit, quantity
        // }
        setLoading(true)
        try {
            console.log('[values]' + JSON.stringify(values))
            values['storeId'] = values.customerDetails.id
            await addProductCall(values);
            setMessage('Successfully Added product')
            setLoading(false)
            handleAlertDialogClickOpen()
        } catch (e) {
            console.log('[exception]' + JSON.stringify(e))
            setMessage(e.response.data.message)
            setLoading(false)
            handleAlertDialogClickOpen()
        }

    }

    // const handleCategoryChange = (event) => {
    //     event.persist()
    //     setState({
    //         ...state,
    //         [event.target.name]: event.target.value,
    //     })
    // }
    const userList = useSelector((state) => state.userReducer.customerList);
    const categoryList = useSelector((state) => state.ecommerce.categoryList);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleAlertDialogClickOpen() {
        setAlertOpen(true)
    }

    function handleAlertDialogClose() {
        setAlertOpen(false)
    }
    const handleCategory = (values) => {
        if (!!values.customerDetails && !categoryList.includes(values.categoryToBeAdded)) {
            dispatch(addCategory(categoryList, { storeId: values.customerDetails.id, category: values.categoryToBeAdded }))
        }
        setOpen(false);
    };

    return (
        <div className="m-sm-30">
            <Card elevation={3}>
                <div className="flex p-4">
                    <h4 className="m-0">New Service</h4>
                </div>
                <Divider className="mb-2" />
                <Card className="px-6 pt-2 pb-4">
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
                            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                                    <DialogTitle id="form-dialog-title">Add Category</DialogTitle>
                                    <DialogContent>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            label="Category"
                                            name='categoryToBeAdded'
                                            onChange={handleChange}
                                            type="text"
                                            fullWidth
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary">
                                            Cancel
                                        </Button>
                                        <Button onClick={() => handleCategory(values)} color="primary">
                                            Add
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                                <Grid container spacing={6}>
                                    <Grid item lg={6} md={6} sm={12} xs={12}>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Customer Name"
                                            onChange={handleChange}
                                            type="text"
                                            size="small"
                                            name="customerDetails"
                                            value={values.customerDetails || ''}
                                            validators={[
                                                'required',
                                            ]}
                                            errorMessages={['this field is required']}
                                            select
                                        >
                                            {userList.map((item, index) => (
                                                <MenuItem value={item} onClick={() => setSelectedUser(item)} key={item.mobileNo}>
                                                    {item.businessName}
                                                </MenuItem>
                                            ))}
                                        </TextValidator>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Category"
                                            size="small"
                                            onChange={handleChange}
                                            type="text"
                                            name="category"
                                            value={values.category || ''}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AddCircle onClick={() => handleClickOpen()} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                            select
                                        >
                                            {categoryList.map((item) => (
                                                <MenuItem value={item} key={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextValidator>
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Service Name"
                                            onChange={handleChange}
                                            type="text"
                                            size="small"
                                            name="serviceName"
                                            value={values.serviceName || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Description"
                                            onChange={handleChange}
                                            type="text"
                                            size="small"
                                            name="description"
                                            value={values.description || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Product Code"
                                            onChange={handleChange}
                                            type="text"
                                            size="small"
                                            name="productCode"
                                            value={values.productCode || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="SKU"
                                            onChange={handleChange}
                                            type="text"
                                            size="small"
                                            name="sku"
                                            value={values.sku || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                        <TextValidator
                                            className="mb-6 w-full"
                                            variant="outlined"
                                            label="Price"
                                            onChange={handleChange}
                                            type="number"
                                            size="small"
                                            name="price"
                                            value={values.price || ''}
                                            validators={['required']}
                                            errorMessages={[
                                                'this field is required'
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider />
                                </Grid>
                                <div className="mt-6">
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        type="submit"
                                        disabled={loading}
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
                            </ValidatorForm>
                        )}
                    </Formik>
                </Card>
            </Card>
            <Dialog
                open={alertOpen}
                onClose={handleAlertDialogClose}
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
                    <Button onClick={handleAlertDialogClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    )
}

export default AddProduct

/* eslint-disable */
import React from 'react'
import {
    Card,
    Divider,
    Grid,
    Button,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    DialogContent,
    DialogActions,
    Dialog,
    DialogTitle,
    CircularProgress,
    DialogContentText,
} from '@mui/material'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { useDispatch, useSelector } from 'react-redux';
import { updateProductData } from 'app/redux/actions/FormAction';
import { Formik } from 'formik';
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom';


const ProductUpdateDialog = () => {

    const navigate = useNavigate();
    const useStyles = makeStyles({
        card: {
            maxWidth: 345
        },

        fiCardContent: {
            color: "#FFFFFF"
        }
    });
    const dispatch = useDispatch();
    const classes = useStyles();
    const [product1, setCurrentProduct] = React.useState({});
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);

    const handleProductChange = (event, product) => {
        if (event.target.name === 'newVariantValue') {
            product.allVariant.variantValue = event.target.value;
            // product.allVariant['newVariantValue'] = event.target.value;
        } else {
            product[event.target.name] = event.target.value;
        }
        setCurrentProduct({ ...product });
    }

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
        setAlertOpen(false);
        navigate('/product/products');
    }

    const handleSubmit = async (values, { isSubmitting }) => {


        const productValue = {};
        if (!!values) {
            productValue.storeId = product.storeId;
            productValue.productName = values.productName;
            productValue.category = product.category;
            productValue.productCode = values.productCode;
            productValue.description = values.description;
            productValue.sku = values.sku;
            productValue.variants = {};
            productValue.variants.variant = values.variant;
            productValue.variants.allVariants = {}
            productValue.variants.allVariants.variantValue = values.variantValue;
            productValue.variants.allVariants.subsku = values.subsku;
            productValue.variants.allVariants.newVariantValue = values.newVariantValue;
            productValue.variants.allVariants.price = values.price;
            productValue.variants.allVariants.unit = values.unit;
            const updatedProductRes = await dispatch(await updateProductData(productValue));
            if (updatedProductRes) {
                setMessage('Product successfully updated')
                setLoading(false)
                handleAlertDialogClickOpen();
                // navigate('/product/products');
            }
        }
    }

    const product = useSelector((state) => state.formActionReducer.updateProduct);
    const initialValues = {
        description: product.description,
        productCode: product.productCode,
        productName: product.productName,
        sku: product.sku,
        quantity: '',
        price: product.allVariant.price,
        unit: product.allVariant.unit,
        variant: product.variant.variant,
        subsku: product.allVariant.subsku,
        variantValue: product.allVariant.variantValue,
        newVariantValue: product.allVariant.variantValue
    }
    product.allVariant['newVariantValue'] = product.allVariant.variantValue;
    return (
        <Card elevation={1} >
            <Card className="pt-2 pb-8" style={{ width: 1000, height: 300, overflow: 'auto' }}>
                <Grid item container
                    direction="column"
                    lg={4} md={4} sm={2} xs={2}>
                    {itemData.map((elevation) => (

                        <Card style={{ width: 450, height: 300, display: 'inline' }}>
                            <CardActionArea >
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <div className="flex justify-between items-center px-6 mb-3">
                                        <span className="card-title">Product name List</span>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Grid>
            </Card>
            <Dialog open={open} onClose={handleClose} fullWidth
                maxWidth={'sm'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <h4>Product updated successfully</h4>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
            <Divider className="mb-2" />
            <Card className="pt-2 pb-8">
                <Formik initialValues={initialValues}
                    onSubmit={handleSubmit}
                    enableReinitialize={true}>
                    {({
                        values,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => (
                        <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                            <Grid container spacing={1}>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Product name"
                                        disabled
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='productName'
                                        value={values.productName}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    >
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Description"
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='description'
                                        value={values.description}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    >
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Product code"
                                        size="small"
                                        onChange={handleChange}
                                        type="text"
                                        name='productCode'
                                        value={values.productCode}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        InputProps={{
                                        }}>
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="SKU"
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='sku'
                                        value={values.sku}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    >
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="SUB-SKU"
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='subsku'
                                        value={values.subsku}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                    >
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Quantity"
                                        onChange={handleChange}
                                        type="number"
                                        size="small"
                                        name='quantity'
                                        value={values.quantity}
                                        validators={['required']}
                                        errorMessages={['this field is required']}>
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Price"
                                        onChange={handleChange}
                                        type="number"
                                        size="small"
                                        name='price'
                                        value={values.price}
                                        validators={['required']}
                                        errorMessages={['this field is required']}>
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Unit"
                                        onChange={handleChange}
                                        type="number"
                                        size="small"
                                        name='unit'
                                        value={values.unit}
                                        validators={['required']}
                                        errorMessages={['this field is required']}>
                                    </TextValidator>
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={3} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Variant"
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='variant'
                                        disabled
                                        value={values.variant}
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required'
                                        ]} />
                                </Grid>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={3} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Variant Value"
                                        onChange={handleChange}
                                        type="text"
                                        size="small"
                                        name='newVariantValue'
                                        value={values.newVariantValue}
                                        validators={['required']}
                                        errorMessages={['this field is required']} />
                                </Grid>
                            </Grid>
                            <Button variant="contained" onClick={() => handleClickOpen()}>
                                Update confirm
                            </Button>
                            <Button variant="contained">
                                Cancel
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                type="submit"
                                disabled={loading}>
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
                        </ValidatorForm>
                    )}
                </Formik>
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
        </Card>
    )
}

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
        author: '@bkristastucchio',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
        author: '@rollelflex_graphy726',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
        author: '@helloimnik',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
        author: '@nolanissac',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
        author: '@hjrc33',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
        author: '@arwinneil',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
        author: '@tjdragotta',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
        author: '@katie_wasserman',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
        author: '@silverdalex',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
        author: '@shelleypauls',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
        author: '@peterlaster',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
        author: '@southside_customs',
    },
];

export default ProductUpdateDialog;
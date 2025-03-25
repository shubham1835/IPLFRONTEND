/* eslint-disable */
import React, { useEffect } from 'react'
import {
    Card,
    Divider,
    Grid,
    Button,
    TableCell,
    TableRow,
    IconButton,
    Icon,
    Table,
    TableHead,
    TableBody,
    Fab,
    DialogContentText,
    CircularProgress
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import { FieldArray, Formik } from 'formik';
import { useDispatch } from 'react-redux';
import { addNewVariant } from 'app/redux/actions/EcommerceActions';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { FiCard } from 'app/components/cards/FICards';
import { FiCardMedia } from 'app/components/cards/FICards';
import { FiCardActions } from 'app/components/cards/FICards';
import { makeStyles } from '@mui/styles'

const AddVariantDialog = ({ openOrderDialog, handleProductChange, product, setAddVariantOpen, handleOrderSubmit, storeId }) => {

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
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState([]);
    const handleClose = () => {
        setAddVariantOpen(false);
    };
    const initialValues = {
        category: product.category,
        productName: product.productName,
        variant: ''
    }

    const handleSubmit = async (values, { isSubmitting }) => {
        const variantVal = {};
        // setImagePreviewUrl([]);
        variantVal.category = values.category;
        variantVal.productName = values.productName;
        variantVal.variants = {};
        variantVal.variants['variant'] = values.variant;
        variantVal.variants['allVariants'] = values.variantObj;
        // variantVal.variants.allVariants['images'] = imagePreviewUrl

        setLoading(true)
        const addVariantRes = await dispatch(await addNewVariant(variantVal, storeId))
        if (addVariantRes) {
            setMessage('Successfully Added Variant')
            setLoading(false)
            handleAlertDialogClickOpen();
            handleClose();
        }
    }

    function handleAlertDialogClickOpen() {
        setAlertOpen(true)
    }

    function handleAlertDialogClose() {
        setAlertOpen(false)
    }

    const fileChangedHandler = (event, ind) => {
        var file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            const obj = { file, name: file.name, result: reader.result, [ind]: reader.result }
            setImagePreviewUrl(oldArray => [...oldArray, obj])
        }
        reader.readAsDataURL(event.target.files[0])

    }

    const deleteCurrentItem = (item) => {
        setImagePreviewUrl(oldArray => oldArray.filter(function (value, index, arr) {
            return value !== item;
        }))
    }

    const LoadImage = () => imagePreviewUrl.map((ele, index) =>
        <Grid key={index} item container direction="row" xs={2}>
            <FiCard className={classes.card}>
                <FiCardMedia component='img' key={index} src={ele.result} />
                <FiCardActions>
                    <Fab className={classes.fiCardContent} onClick={() => deleteCurrentItem(ele)} size='medium' aria-label="close">
                        {/* <CloseIcon /> */}
                    </Fab>
                </FiCardActions>

            </FiCard>
        </Grid>)


    const variantValue = ({ values, handleChange }) => {
        return (
            <FieldArray name="variantObj">
                {(arrayHelpers) => (
                    <div className="overflow-auto">
                        <Table className="pt-2 pb-8">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}>Variant value</TableCell>
                                    <TableCell colSpan={2}>SUB-SKU </TableCell>
                                    <TableCell colSpan={2}>Units </TableCell>
                                    <TableCell colSpan={2}>Price</TableCell>
                                    <TableCell colSpan={2}>Image</TableCell>
                                    <TableCell
                                        colSpan={1}
                                        className="p-0"
                                        align="center"
                                    />
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {values?.variantObj?.map((item, ind) => (
                                    <TableRow
                                        className="position-relative"
                                        key={ind}>
                                        <TableCell
                                            colSpan={2}
                                            className="p-0"
                                            align="left">
                                            <TextValidator
                                                name={`variantObj[${ind}].variantValue`}
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                validators={[
                                                    'required',
                                                ]}
                                                value={item.variantValue}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            colSpan={2}
                                            className="p-0"
                                            align="left">
                                            <TextValidator
                                                name={`variantObj[${ind}].subsku`}
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                validators={[
                                                    'required',
                                                ]}
                                                value={item.subsku}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            colSpan={2}
                                            className="p-0"
                                            align="left"
                                        >
                                            <TextValidator
                                                name={`variantObj[${ind}].unit`}
                                                size="small"
                                                variant="outlined"
                                                fullWidth
                                                type="number"
                                                validators={[
                                                    'required',
                                                ]}
                                                value={item.unit}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            colSpan={2}
                                            className="p-0"
                                            align="left"
                                        >
                                            <TextValidator
                                                name={`variantObj[${ind}].price`}
                                                size="small"
                                                variant="outlined"
                                                type="number"
                                                fullWidth
                                                validators={[
                                                    'required',
                                                ]}
                                                value={item.price}
                                                onChange={handleChange}
                                            />
                                        </TableCell>
                                        <TableCell
                                            colSpan={2}
                                            className="p-0"
                                            align="center"
                                        >
                                            <input
                                                accept="image/jpeg"
                                                style={{ display: "none" }}
                                                id="contained-button-file"
                                                name={`variantObj[${ind}].variantImage`}
                                                value={item.variantImage}
                                                multiple
                                                type="file"
                                                onChange={ele => fileChangedHandler(ele, ind)}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Fab type="file" component="span" style={{ color: 'blue[900]', margin: 10 }}>
                                                    <AddPhotoAlternateIcon />
                                                </Fab>
                                            </label>
                                            <div className="flex relative face-group"><LoadImage /></div>
                                        </TableCell>
                                        <TableCell
                                            colSpan={1}
                                            className="p-0"
                                            align="center"
                                        >
                                            <IconButton
                                                size="small"
                                                onClick={() =>
                                                    arrayHelpers.remove(ind)
                                                }>
                                                <Icon color="error"
                                                    fontSize="small">
                                                    clear
                                                </Icon>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <Button
                            className="mt-4"
                            color="primary"
                            variant="contained"
                            size="small"
                            onClick={() => arrayHelpers.push({ variantValue: [], subsku: '', unit: '', price: '' })}>
                            + Add New Item
                        </Button>
                    </div>
                )}
            </FieldArray>
        )
    };

    return (
        <div>
            <Dialog open={openOrderDialog} maxWidth={'md'} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Variant</DialogTitle>
                <DialogContent>
                    <Card elevation={1}>
                        <Divider className="mb-2" />
                        <Card className="pt-2 pb-8">
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
                                        <Grid container spacing={1}>
                                            <Grid item container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="center"
                                                lg={3} md={3} sm={2} xs={6}>
                                                <TextValidator
                                                    className="mb-6 w-full"
                                                    variant="outlined"
                                                    label="Category"
                                                    type="text"
                                                    size="small"
                                                    name='category'
                                                    value={product.category || ''}
                                                    onChange={handleChange}
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
                                                    label="Product name"
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
                                                    label="Variant"
                                                    type="text"
                                                    size="small"
                                                    name='variant'
                                                    value={values.variant || ''}
                                                    onChange={handleChange}
                                                >
                                                </TextValidator>
                                            </Grid>

                                        </Grid>
                                        {variantValue({ values, handleChange })}
                                        <div className="mt-6">
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
                                        </div>
                                    </ValidatorForm>
                                )}
                            </Formik>
                        </Card>
                    </Card>
                </DialogContent>
                <DialogActions>
                </DialogActions>
            </Dialog>

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
        </div>


    )
}

export default AddVariantDialog;
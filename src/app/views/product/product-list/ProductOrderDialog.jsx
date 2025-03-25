/* eslint-disable */
import React, { useEffect } from 'react'
import {
    Card,
    Divider,
    Grid,
    Button
} from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'

const ProductOrderDialog = ({ openOrderDialog, handleProductChange, product, setOrderOpen, handleOrderSubmit }) => {

    const handleClose = () => {
        setOrderOpen(false);
    };
    return (
        <Dialog open={openOrderDialog} maxWidth={'md'} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Order Product</DialogTitle>
            <DialogContent>
                <Card elevation={1}>
                    <Divider className="mb-2" />
                    <Card className="pt-2 pb-8">
                        <ValidatorForm onSubmit={handleOrderSubmit} onError={() => null}>
                            <Grid container spacing={1}>
                                <Grid item container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    lg={3} md={3} sm={2} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        disabled
                                        variant="outlined"
                                        label="Product name"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='productName'
                                        value={product.productName}
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
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='quantity'
                                        value={product.quantity}
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
                                        label="Marked Price"
                                        size="small"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        name='markedPrice'
                                        value={product.markedPrice}
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
                                    lg={3} md={3} sm={3} xs={6}>
                                    <TextValidator
                                        className="mb-6 w-full"
                                        variant="outlined"
                                        label="Selling Price"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='sellingPrice'
                                        value={product.sellingPrice}
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
                                        label="Shipping Date"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="date"
                                        size="small"
                                        name={'shippingDate'}
                                        value={product.shippingDate}
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
                                        label="Notify Date"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="date"
                                        size="small"
                                        name='notifyDate'
                                        value={product.notifyDate}
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
                                        label="Variant"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='variant'
                                        value={product.variant ? product.variant.variant : ''}
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
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='variantValue'
                                        value={product.allVariant ? product.allVariant.variantValue : ''}
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
                                        label="Market Place"
                                        onChange={(ele) => handleProductChange(ele, product)}
                                        type="text"
                                        size="small"
                                        name='marketPlace'
                                        value={product.marketPlace}
                                        validators={['required']}
                                        errorMessages={[
                                            'this field is required'
                                        ]} />
                                </Grid>
                            </Grid>
                            <Button onClick={() => handleClose()} variant="contained">
                                Cancel
                            </Button>
                            <Button onSubmit={handleOrderSubmit}
                                color="primary"
                                variant="contained"
                                type="submit">
                                Submit
                            </Button>
                        </ValidatorForm>
                    </Card>
                </Card>
            </DialogContent>
            <DialogActions>
            </DialogActions>
        </Dialog>
    )
}

export default ProductOrderDialog;
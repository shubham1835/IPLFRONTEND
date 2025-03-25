/* eslint-disable */
import React, { useEffect } from 'react'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    MenuItem,
    TableBody,
    Link,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Fab
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import { getProductList, deleteCategoryValue, deleteProductValue, deleteVariantValue } from 'app/redux/actions/EcommerceActions'
import { getStoreList } from 'app/redux/actions/UserAction'
import { MatxMenu } from 'app/components'
import ProductOrderDialog from './ProductOrderDialog'
import { addCartProductData, setCartProduct, setUpdateProduct } from 'app/redux/actions/FormAction'
import { TextValidator, ValidatorForm } from 'react-material-ui-form-validator'
import AddVariantDialog from './AddVariant'
import { useNavigate } from 'react-router-dom'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    productTable: {
        '& small': {
            height: 15,
            width: 50,
            borderRadius: 500,
            boxShadow:
                '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
        },
        '& td': {
            borderBottom: 'none',
        },
        '& td:first-child': {
            paddingLeft: '16px !important',
        },
    },
}))


const ProductListTable = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const [openOrderDialog, setOrderOpen] = React.useState(false);
    const [product, setCurrentProduct] = React.useState({})
    const [selectedUser, setSelectedUser] = React.useState('');
    const [openDelete, setDeleteOpen] = React.useState(false);
    const [deleteValue, setDeleteValue] = React.useState({});
    const [openVariant, setAddVariantOpen] = React.useState(false);
    const [variantItem, setItem] = React.useState({});
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getStoreList())
    }, []);

    useEffect(() => {
        dispatch(getProductList(selectedUser.id))
    }, [selectedUser]);

    const handleProductDeleteClose = () => {
        setDeleteOpen(false);
    };

    const handleProductChange = (event, product) => {
        product[event.target.name] = event.target.value;
        setCurrentProduct({ ...product });

    }

    const handleOrderSubmit = async () => {
        console.log('1331 product => ', product);
    }

    const handleClickOpen = (product) => {
        setCurrentProduct(product);
        setOpen(true);
    };
    const handleOrderDialogOpen = (product) => {
        setCurrentProduct(product);
        setOrderOpen(true);
    };


    const updateProduct = (product, productTitle) => {
        if (!!product['variant'] && !!product['allVariant']) {
            product['category'] = productTitle;
            product['storeId'] = selectedUser.id;
            dispatch(setUpdateProduct(product));
            navigate("/product/updateProducts");
        } else {
            alert('Please select variant and variant value');
        }

    }

    const setDeleteProduct = (actionName, product, productTitle) => {
        product['actionName'] = actionName;
        product['category'] = productTitle;
        setDeleteValue(product);
        setDeleteOpen(true);
    }

    const setDeleteVariant = (actionName, product, productTitle) => {
        if (!!product['variant']) {
            product['actionName'] = actionName;
            product['category'] = productTitle;
            setDeleteValue(product);
            setDeleteOpen(true);
        } else {
            alert('Please select variant');
        }
    }

    const setDeleteCategory = (actionName, product) => {
        product['actionName'] = actionName;
        setDeleteValue(product);
        setDeleteOpen(true);
    }

    const deleteProduct = () => {
        return (
            <Dialog open={openDelete} onClose={handleProductDeleteClose} fullWidth
                maxWidth={'sm'} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Confirm</DialogTitle>
                <DialogContent>
                    <h4>{`Are you sure, want to delete ${deleteValue.actionName}`}</h4>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => deleteActionDetails(deleteValue)} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
    const deleteActionDetails = async (delValue) => {
        switch (delValue.actionName) {
            case "Product":
                const productDelResponse =
                    await dispatch(await deleteProductValue(delValue.category, delValue.productName, selectedUser.id))
                if (productDelResponse) {
                    handleProductDeleteClose();
                }
                break;

            case "Variant":
                const variantDelResponse =
                    await dispatch(await deleteVariantValue(delValue.category, delValue.productName, delValue.variant.variant, selectedUser.id))
                if (variantDelResponse) {
                    handleProductDeleteClose();
                }
                break;

            case "Category":
                const delResponse =
                    await dispatch(await deleteCategoryValue(delValue.title, selectedUser.id))

                if (delResponse) {
                    handleProductDeleteClose();
                }
                break;
        }
    }

    const handleAddVariantClickOpen = (product, productTitle) => {
        product['category'] = productTitle;
        setCurrentProduct(product);
        setItem(product)
        setAddVariantOpen(true);
    };

    const handleAddVariantClose = () => {
        setAddVariantOpen(false);
    };
    const cartProduct = [];
    const addToCard = (action, productVal, productCategory) => {
        console.log('111 ', action, '=> ', productVal, ' => ', productCategory);
        if (cartProduct.length == 0) {
            cartProduct.push(productVal);
        } else {
            cartProduct.forEach(productEle => {
                if (productEle.productDriveId !== productVal.productDriveId) {
                    cartProduct.push(productVal);
                } else {
                    alert('Product already present in cart');
                }
            });
        }
        // const addCartRes = 
        //           await dispatch(await addCartProductData(delValue.category, delValue.productName, selectedUser.id))

        // dispatch(setCartProduct(cartProduct))
        console.log('111 cart value => ', cartProduct);
    }


    const productListView = (productList) =>
        productList.data.map((product, index) => {
            return <TableRow key={index} hover>
                <TableCell
                    className="px-0 capitalize"
                    colSpan={5}
                    align="left">
                    <div className="flex items-center">
                        <p className="m-0 ml-8">
                            {product.productName}
                        </p>
                    </div>
                </TableCell>
                <TableCell
                    className="px-0 capitalize"
                    align="left"
                    colSpan={3}>
                    {product.price}
                </TableCell>

                <TableCell
                    className="px-0"
                    align="left"
                    colSpan={3}>
                    {product.quantity}
                </TableCell>
                <TableCell
                    className="px-0"
                    align="left"
                    colSpan={3}>
                    {product.quantity}
                </TableCell>
                <TableCell
                    colSpan={3}
                    className="p-0"
                    align="left">
                    <TextField
                        name={'variant'}
                        size="small"
                        variant="outlined"
                        fullWidth
                        select
                        value={product.variant || ''}
                        onChange={(ele) => handleProductChange(ele, product)}>
                        {product.variants !== null ? product.variants.map((item, ind) => (
                            <MenuItem value={item} key={ind + index}>
                                {item.variant}
                            </MenuItem>
                        )) : "Hello"}
                    </TextField>
                </TableCell>
                <TableCell
                    colSpan={3}
                    className="p-0"
                    align="left">
                    <TextField
                        name={'allVariant'}
                        size="small"
                        variant="outlined"
                        fullWidth
                        select
                        value={product.allVariant || ''}
                        onChange={(ele) => handleProductChange(ele, product)}>
                        {product.variant ? product.variant.allVariants.map((item, ind) => (
                            <MenuItem value={item} key={ind + index}>
                                {item.variantValue}
                            </MenuItem>
                        )) : ""}
                    </TextField>
                </TableCell>
                <TableCell className="px-0" colSpan={2}>
                    <MatxMenu
                        menuButton={
                            <div className={classes.userMenu}>
                                <IconButton>
                                    <Icon color="primary">edit</Icon>
                                </IconButton>
                            </div>
                        }>
                        <MenuItem>
                            <Link className={classes.menuItem}>
                                <span className="pl-4"
                                    onClick={() => { console.log('444 => ', product) }}>
                                    Place Order </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4" onClick={() => handleOrderDialogOpen(product)}> Order Product</span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4" onClick={() => updateProduct(product, productList.title)}> Update Product</span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4"> Update Quantity </span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4" onClick={() => handleAddVariantClickOpen(product, productList.title)}> Add Variant</span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4" onClick={() => setDeleteProduct('Product', product, productList.title)}> Delete Product</span>
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link
                                className={classes.menuItem}>
                                <span className="pl-4" onClick={() => setDeleteVariant('Variant', product, productList.title)}> Delete Variant</span>
                            </Link>
                        </MenuItem>
                    </MatxMenu>
                </TableCell>
                <TableCell className="px-0" colSpan={2}>
                    <IconButton>
                        <Icon color="primary" onClick={() => addToCard('addCart', product, productList.title)}>shopping_cart</Icon>
                    </IconButton>
                </TableCell>
            </TableRow>
        })

    const handleChange = (event) => {
        setSelectedUser(event.target.value);
    };
    const dataList = useSelector((state) => state.ecommerce.productList);
    const userList = useSelector((state) => state.userReducer.customerList);
    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                <span className="card-title">Vendor List</span>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => { navigate("/product/addProduct") }}
                >
                    Create Product
                </Button>
            </div>
            <div className="flex justify-between items-center px-6 mb-3">
                <TextField
                    className="min-w-188"
                    label="Vendor"
                    name="customerDetails"
                    size="small"
                    variant="outlined"
                    select
                    value={selectedUser || 'Shub'}
                    onChange={handleChange}
                >
                    {userList.map((item, index) => (
                        <MenuItem value={item} onClick={() => setSelectedUser(item)} key={item.mobileNo}>
                            {item.businessName}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div className="overflow-auto">
                <Table
                    className={clsx(
                        'whitespace-pre min-w-400',
                        classes.productTable
                    )}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell className="px-6" colSpan={5}>
                                Product Name
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                Description
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                Product code
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                SKU
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                Variant
                            </TableCell>
                            <TableCell className="px-0" colSpan={3}>
                                Variant Value
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Action
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Add To Cart
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    {dataList.map((productData, index) => {
                        return <TableBody key={index}>
                            <TableRow style={{ background: "#DCDCDC" }}>
                                <TableCell className="px-0 capitalize"
                                    align="left"
                                    colSpan={20}
                                >{productData.title}</TableCell>
                                <TableCell className="px-0 capitalize"
                                    align="left"
                                    colSpan={4}>
                                    <IconButton>
                                        <Icon color="primary"
                                            onClick={() => setDeleteCategory('Category', productData)}>delete</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            {productListView(productData)}
                        </TableBody>
                    })}
                </Table>

                {deleteProduct()}
                <ProductOrderDialog
                    openOrderDialog={openOrderDialog}
                    handleProductChange={handleProductChange}
                    product={product}
                    handleOrderSubmit={handleOrderSubmit}
                    setOrderOpen={setOrderOpen} />
                <AddVariantDialog
                    openOrderDialog={openVariant}
                    handleProductChange={handleProductChange}
                    product={product}
                    storeId={selectedUser.id}
                    handleOrderSubmit={handleOrderSubmit}
                    setAddVariantOpen={setAddVariantOpen} />
            </div>
        </Card>
    )
}


export default ProductListTable


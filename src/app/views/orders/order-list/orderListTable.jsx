import React, { useEffect } from 'react'
import {
    Card,
    Icon,
    IconButton,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Avatar,
    Link,
    MenuItem
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { getStoreList } from 'app/redux/actions/UserAction'
import history from 'history.js'
import { MatxMenu, MatxSearchBox } from 'app/components'

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

const OrderListTable = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getStoreList())
    }, []);
    const userList = useSelector((state) => state.userReducer.customerList);
    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                {/* <span className="card-title">Vendor List</span>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => { navigate("/customer/new-customer") }}
                >
                    Add Merchant
                </Button> */}
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
                            <TableCell className="px-6" colSpan={4}>
                                Order no.
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Customer
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Product
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Date
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Status
                            </TableCell><TableCell className="px-0" colSpan={2}>
                                Purchase Date
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Shipping Date
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Quantity
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Total
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((product, index) => (
                            <TableRow key={index} hover>
                                <TableCell
                                    className="px-0 capitalize"
                                    colSpan={4}
                                    align="left"
                                >
                                    <div className="flex items-center">
                                        {/* <Avatar src={product.imgUrl} /> */}
                                        <p className="m-0 ml-8" style={{ 'word-break': 'break-word' }}>
                                            {product.businessName}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.mobileNo}
                                </TableCell>

                                <TableCell
                                    className="px-0"
                                    align="left"
                                    colSpan={2}
                                >
                                    {product.city}
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>


                                    <MatxMenu
                                        menuButton={
                                            <div className={classes.userMenu}>
                                                <IconButton>
                                                    <Icon color="primary">edit</Icon>
                                                </IconButton>
                                            </div>
                                        }
                                    >
                                        <MenuItem className={classes.menuItem}>
                                            <span className="pl-4"> Delivered </span>
                                        </MenuItem>
                                        <MenuItem
                                            className={classes.menuItem}>
                                            <span className="pl-4"> Refund </span>
                                        </MenuItem>
                                        <MenuItem className={classes.menuItem}>
                                            <span className="pl-4"> Cancel </span>
                                        </MenuItem>
                                    </MatxMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}


export default OrderListTable



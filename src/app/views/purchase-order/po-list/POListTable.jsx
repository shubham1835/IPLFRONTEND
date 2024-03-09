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
    Avatar
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import history from 'history.js'
import { getPurchaseOrderList, GET_PO_DATA } from 'app/redux/actions/FormAction'

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


const POListTable = () => {
    const classes = useStyles()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPurchaseOrderList())
    }, []);

    const showPo = (poData) => {
        dispatch({
            type: GET_PO_DATA,
            payload: poData,
        })

        navigate('/po/poformat');
    }
    const poList = useSelector((state) => state.formActionReducer.poList);
    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                <span className="card-title">Purchase Order List</span>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => { navigate("/po/poform") }}
                >
                    Create PO
                </Button>
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
                                PO No
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Business Name
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Date
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {poList.map((po, index) => (
                            <TableRow key={index} onClick={() => showPo(po)} hover>
                                <TableCell
                                    className="px-0 capitalize"
                                    colSpan={4}
                                    align="left"
                                >
                                    <div className="flex items-center">
                                        {/* <Avatar src={product.imgUrl} /> */}
                                        <p className="m-0 ml-8">
                                            {po.poNumber}
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell
                                    className="px-0 capitalize"
                                    align="left"
                                    colSpan={2}
                                >
                                    {po.customerDetails.businessName}
                                </TableCell>

                                <TableCell
                                    className="px-0"
                                    align="left"
                                    colSpan={2}
                                >
                                    {po.sysDate}
                                </TableCell>
                                <TableCell className="px-0" colSpan={1}>
                                    <IconButton>
                                        <Icon color="primary">edit</Icon>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </Card>
    )
}


export default POListTable

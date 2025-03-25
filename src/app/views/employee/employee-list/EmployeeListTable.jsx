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
    TableBody
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { Button } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { generateUserQRData, getEmployeeList } from 'app/redux/actions/UserAction'
import { useNavigate } from 'react-router-dom'
import useAuth from 'app/hooks/useAuth'

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

const EmployeeListTable = () => {
    const classes = useStyles()
    const dispatch = useDispatch();
    const { user } = useAuth()
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(getEmployeeList(user.userName))
    }, []);
    const onListClick = async (clickedUser) => {
        const payLoad = {};
        payLoad['userName'] = clickedUser.userName
        payLoad['masterUserName'] = user.userName
        try {
            await dispatch(await generateUserQRData(payLoad))
            navigate('/employee/qr');
        } catch (exception) {
            console.log('[Exception occured]' + exception.message)
        }
    }
    const userList = useSelector((state) => state.userReducer.employeeList);
    return (
        <Card elevation={3} className="pt-5 mb-6">
            <div className="flex justify-between items-center px-6 mb-3">
                <span className="card-title">Employee List</span>
                <Button
                    color="primary"
                    variant="contained"
                    type="submit"
                    onClick={() => { navigate("/employee/new-employee") }}
                >
                    Add Employee
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
                                Name
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Mobile
                            </TableCell>
                            <TableCell className="px-0" colSpan={2}>
                                Role
                            </TableCell>
                            <TableCell className="px-0" colSpan={1}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((product, index) => (
                            <TableRow key={index} onClick={() => onListClick(product)} hover>
                                <TableCell
                                    className="px-0 capitalize"
                                    colSpan={4}
                                    align="left"
                                >
                                    <div className="flex items-center">
                                        {/* <Avatar src={product.imgUrl} /> */}
                                        <p className="m-0 ml-8">
                                            {product.name}
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
                                    {product.role}
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


export default EmployeeListTable

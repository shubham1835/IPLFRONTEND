import React from 'react'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TextField,
    Button,
    IconButton,
    Icon,
    MenuItem,
} from '@mui/material'
import { FieldArray } from 'formik'

const InvoiceItemTable = ({ values, handleChange, handleError }) => {

    return (
        <FieldArray name="items">
            {(arrayHelpers) => (
                <div className="overflow-auto">
                    <Table className="whitespace-pre min-w-750">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={3}>Item Name</TableCell>
                                <TableCell colSpan={2}>HSN </TableCell>
                                <TableCell colSpan={2}>Quantity</TableCell>
                                <TableCell colSpan={2}>Unit</TableCell>
                                <TableCell colSpan={2}>Price/Unit</TableCell>
                                <TableCell colSpan={2}>GST</TableCell>
                                <TableCell colSpan={2} align="center">
                                    Amount
                                </TableCell>
                                <TableCell
                                    colSpan={1}
                                    className="p-0"
                                    align="center"
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.items?.map((item, ind) => (
                                <TableRow
                                    className="position-relative"
                                    key={ind}
                                >
                                    <TableCell
                                        colSpan={3}
                                        className="p-0"
                                        align="left"
                                    >
                                        {/* <div className="flex items-center">
                                            <Autocomplete
                                                className="w-full"
                                                size="small"
                                                options={productList}
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        fullWidth
                                                    />
                                                )}
                                                onChange={(event, newValue) => {
                                                    handleChange({
                                                        target: {
                                                            name: `items[${ind}]`,
                                                            value: newValue,
                                                        },
                                                    })
                                                }}
                                            />
                                        </div> */}
                                        <TextField
                                            name={`items[${ind}].itemName`}
                                            size="small"
                                            variant="outlined"
                                            error={handleError(item.itemName)}
                                            fullWidth
                                            value={item.itemName}
                                            onChange={handleChange}
                                        />
                                    </TableCell>

                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].hsn`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={item.hsn}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].quantity`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.quantity || ''}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].unit`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.unit || ''}
                                            onChange={handleChange}
                                        />
                                        {/* <TextField
                                            name={`items[${ind}].discount`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.discount || ''}
                                            onChange={handleChange}
                                            InputProps={{
                                                style: {
                                                    paddingRight: 0,
                                                },
                                                endAdornment: (
                                                    <Select
                                                        name={`items[${ind}].discountType`}
                                                        margin="none"
                                                        variant="standard"
                                                        disableUnderline
                                                        value={
                                                            item.discountType ||
                                                            '%'
                                                        }
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="$">
                                                            $
                                                        </MenuItem>
                                                        <MenuItem value="%">
                                                            %
                                                        </MenuItem>
                                                    </Select>
                                                ),
                                            }}
                                        /> */}
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].pricePerUnit`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.pricePerUnit || ''}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].gst`}
                                            size="small"
                                            variant="outlined"
                                            value={item.gst || ''}
                                            fullWidth
                                            error={handleError(item.gst)}
                                            onChange={handleChange}
                                            select
                                        >
                                            {gst.map((item, ind) => (
                                                <MenuItem value={item} key={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="center"
                                    >
                                        <TextField
                                            name={`items[${ind}].amount`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            value={item.amount || ''}
                                            error={handleError(item.amount)}
                                            onChange={handleChange}
                                        />
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
                                            }
                                        >
                                            <Icon
                                                color="error"
                                                fontSize="small"
                                            >
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
                        onClick={() => arrayHelpers.push({})}
                    >
                        + Add New Item
                    </Button>
                </div>
            )}
        </FieldArray>
    )

}
const gst = ['5', '12', '18', '28'];
export default InvoiceItemTable

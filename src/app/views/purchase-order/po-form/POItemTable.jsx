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


const POItemTable = ({ values, setFieldValue, handleChange, handleError, prdList }) => {

    const handleCustomChange = (event, item) => {
        console.log('[event.target.name]' + event.target.name)
        setFieldValue(event.target.name, event.target.value);
        let total = item.quantity * item.pricePerUnit;
        setFieldValue(event.target.name.replace('gst', 'amount'), ((total * event.target.value) / 100) + total)
        setFieldValue(event.target.name.replace('gst', 'amountWithountGst'), total)
    }

    return (
        <FieldArray name="items">
            {(arrayHelpers) => (
                <div className="overflow-auto">
                    <Table className="whitespace-pre min-w-750">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>Item </TableCell>
                                <TableCell colSpan={1}>Quantity</TableCell>
                                <TableCell colSpan={1}>Variant</TableCell>
                                <TableCell colSpan={1}>Variant value</TableCell>
                                <TableCell colSpan={1}>Price/Unit</TableCell>
                                <TableCell colSpan={1}>GST</TableCell>
                                <TableCell colSpan={1}>Amount</TableCell>
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
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            className="min-w-188"
                                            name={`items[${ind}].itemName`}
                                            size="small"
                                            variant="outlined"
                                            select
                                            fullWidth
                                            error={handleError(item.itemName)}
                                            value={item.itemName || ''}
                                            onChange={handleChange}
                                        >
                                            {prdList.map((item, index) => (
                                                <MenuItem value={item} key={index + ind}>
                                                    {item.productName}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].quantity`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            error={handleError(item.quantity)}
                                            value={item.quantity || ''}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].variant`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            select
                                            error={handleError(item.variant)}
                                            value={item.variant || ''}
                                            onChange={handleChange}
                                        >
                                            {item.itemName ? item.itemName.variants.map((item, index) => (
                                                <MenuItem value={item} key={index + ind}>
                                                    {item.variant}
                                                </MenuItem>
                                            )) : ""}
                                        </TextField>
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].variantValue`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            select
                                            error={handleError(item.variantValue)}
                                            value={item.variantValue || ''}
                                            onChange={handleChange}
                                        >
                                            {item.variant ? item.variant.allVariants.map((item, index) => (
                                                <MenuItem value={item} key={index + ind}>
                                                    {item.variantValue}
                                                </MenuItem>
                                            )) : ""}
                                        </TextField>
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextField
                                            name={`items[${ind}].pricePerUnit`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            fullWidth
                                            error={handleError(item.pricePerUnit)}
                                            value={item.pricePerUnit || ''}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={1}
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
                                            onChange={(e) => handleCustomChange(e, item)}
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
                                        colSpan={1}
                                        className="p-0"
                                        align="center"
                                    >
                                        <TextField
                                            name={`items[${ind}].amount`}
                                            size="small"
                                            variant="outlined"
                                            type="number"
                                            contentEditable={false}
                                            fullWidth
                                            value={item.amount}

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
export default POItemTable

import React from 'react'
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    IconButton,
    Fab,
    Grid,
    Icon,
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import InputAdornment from '@mui/material/InputAdornment';
import AddCircle from '@mui/icons-material/AddCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FieldArray } from 'formik'
import { TextValidator } from 'react-material-ui-form-validator'
import {
    FiCard,
    FiCardActions,
    FiCardMedia
} from "app/components/cards/FICards";
const useStyles = makeStyles({
    card: {
        maxWidth: 345
    },

    fiCardContent: {
        color: "#FFFFFF"
    }
});
const VariantItemTable = ({ values, handleChange }) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [variantItem, setItem] = React.useState({});
    const [variantValueToBeAdded, setVariantToBeAdded] = React.useState('');
    const [variantSUBSKUToBeAdded, setVariantSUBSKUToBeAdded] = React.useState('');
    const [variantUnitToBeAdded, setVariantUnitToBeAdded] = React.useState('');
    const [variantPriceToBeAdded, setVariantPriceToBeAdded] = React.useState('');
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState([]);
    const handleVariant = () => {
        variantItem.variantValue.push(variantValueToBeAdded)
        variantItem.unit.push(variantUnitToBeAdded)
        variantItem.price.push(variantPriceToBeAdded)
        variantItem.subsku.push(variantSUBSKUToBeAdded)
        variantItem.allVariants.push({ subsku: variantSUBSKUToBeAdded, variantValue: variantValueToBeAdded, unit: variantUnitToBeAdded, price: variantPriceToBeAdded, images: imagePreviewUrl })
        setImagePreviewUrl([]);
        handleClose()
    }
    const handleClickOpen = (item) => {
        setItem(item)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const fileChangedHandler = event => {
        var file = event.target.files[0];

        let reader = new FileReader();
        reader.onloadend = () => {
            const obj = { file, name: file.name, result: reader.result }
            setImagePreviewUrl(oldArray => [...oldArray, obj])
        }
        console.log('[Image]' + imagePreviewUrl.length)
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
                        <CloseIcon />
                    </Fab>
                </FiCardActions>

            </FiCard>
        </Grid>)
    return (
        <FieldArray name="variants">
            {(arrayHelpers) => (
                <div className="overflow-auto">
                    <Table className="whitespace-pre min-w-750">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2}>Variant</TableCell>
                                <TableCell colSpan={2}>Variant Value</TableCell>
                                <TableCell colSpan={2}>SUB SKU</TableCell>
                                <TableCell colSpan={2}>Units </TableCell>
                                <TableCell colSpan={2}>Price</TableCell>
                                <TableCell
                                    colSpan={1}
                                    className="p-0"
                                    align="center"
                                />
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {values.variants?.map((item, ind) => (
                                <TableRow
                                    className="position-relative"
                                    key={ind}
                                >
                                    <Dialog open={open} onClose={handleClose} fullWidth
                                        maxWidth={'sm'} aria-labelledby="form-dialog-title">
                                        <DialogTitle id="form-dialog-title">Variant Detals</DialogTitle>
                                        <DialogContent>
                                            <input
                                                accept="image/jpeg"
                                                style={{ display: "none" }}
                                                id="contained-button-file"
                                                multiple
                                                type="file"
                                                onChange={fileChangedHandler}
                                            />
                                            <label htmlFor="contained-button-file">
                                                <Fab type="file" component="span" style={{ color: 'blue[900]', margin: 10 }}>
                                                    <AddPhotoAlternateIcon />
                                                </Fab>
                                            </label>
                                            {/* <input type="file" name="avatar" onChange={fileChangedHandler} /> */}
                                            {/* {imagePreviewUrl.map((item, index) => { */}
                                            {/* <CardMedia shape="square" size={100} image={imagePreviewUrl[0]} /> */}
                                            <div className="flex relative face-group"><LoadImage /></div>
                                            {/* })} */}
                                            <TextValidator
                                                autoFocus
                                                margin="dense"
                                                label="SubSKU"
                                                validators={[
                                                    'required',
                                                ]}
                                                onChange={(e) => setVariantSUBSKUToBeAdded(e.target.value)}
                                                value={variantSUBSKUToBeAdded}
                                                type="text"
                                                fullWidth
                                            />
                                            <TextValidator
                                                autoFocus
                                                margin="dense"
                                                label="Variant Value(Ex: Color, Size)"
                                                validators={[
                                                    'required',
                                                ]}
                                                onChange={(e) => setVariantToBeAdded(e.target.value)}
                                                value={variantValueToBeAdded}
                                                type="text"
                                                fullWidth
                                            />
                                            <TextValidator
                                                autoFocus
                                                margin="dense"
                                                label="Units"
                                                validators={[
                                                    'required',
                                                ]}
                                                onChange={(e) => setVariantUnitToBeAdded(e.target.value)}
                                                value={variantUnitToBeAdded}
                                                type="text"
                                                fullWidth
                                            />
                                            <TextValidator
                                                autoFocus
                                                margin="dense"
                                                label="Price"
                                                validators={[
                                                    'required',
                                                ]}
                                                onChange={(e) => setVariantPriceToBeAdded(e.target.value)}
                                                value={variantPriceToBeAdded}
                                                type="text"
                                                fullWidth
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose} color="primary">
                                                Cancel
                                            </Button>
                                            <Button onClick={() => handleVariant()} color="primary">
                                                Add
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextValidator
                                            name={`variants[${ind}].variant`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={item.variant}
                                            validators={[
                                                'required',
                                            ]}
                                            onChange={handleChange}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextValidator
                                            name={`variants[${ind}].variantValue`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            contentEditable={false}
                                            validators={[
                                                'required',
                                            ]}
                                            value={item.variantValue}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <AddCircle onClick={() => handleClickOpen(item)} />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextValidator
                                            name={`variants[${ind}].subsku`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            value={item.subsku}
                                            validators={[
                                                'required',
                                            ]}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextValidator
                                            name={`variants[${ind}].unit`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            validators={[
                                                'required',
                                            ]}
                                            value={item.unit}
                                        />
                                    </TableCell>
                                    <TableCell
                                        colSpan={2}
                                        className="p-0"
                                        align="left"
                                    >
                                        <TextValidator
                                            name={`variants[${ind}].price`}
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            validators={[
                                                'required',
                                            ]}
                                            value={item.price}
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
                        onClick={() => arrayHelpers.push({ subsku: [], variant: '', variantValue: [], unit: [], price: [], images: [], allVariants: [] })}
                    >
                        + Add New Item
                    </Button>
                </div>
            )}
        </FieldArray>
    )

}


export default VariantItemTable

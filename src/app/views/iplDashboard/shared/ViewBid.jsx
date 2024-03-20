import { Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import TopSellingTable from './TopSellingTable';

const ViewBid = ({ open, handleDialogClose }) => {


    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Bid"}
            </DialogTitle>
            <DialogContent>
                <TopSellingTable></TopSellingTable>
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleDialogClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ViewBid;
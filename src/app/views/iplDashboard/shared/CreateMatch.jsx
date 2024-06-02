import { Icon, Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress, Switch } from '@mui/material';
import React from 'react'
import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles(({ palette, ...theme }) => ({
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}))

const CreateMatch = ({ open, handleDialogClose, matchId }) => {
    const [loading, setLoading] = useEffect(false);
    const classes = useStyles()
    const submit = () => {

    }

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Match"}
            </DialogTitle>
            <DialogContent>

            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={handleDialogClose} color="primary">
                    Close
                </Button>
                <Button variant="contained" disabled={loading} onClick={submit} color="primary">
                    {loading && (
                        <CircularProgress
                            size={24}
                            className={
                                classes.buttonProgress
                            }
                        />
                    )}
                    BID
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateMatch;
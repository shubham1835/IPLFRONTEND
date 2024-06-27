import { Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress, TextField, Divider, MenuItem } from '@mui/material';
import React, { useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { margin } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import { getTeams, postMatches } from 'app/redux/actions/IplAction';
import { useDispatch, useSelector } from 'react-redux';
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

    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { user } = useAuth();
    const dispatch = useDispatch();
    const [subscription, setSubscription] = React.useState("");
    const [homeTeam, setHomeTeam] = React.useState("");
    const [opponentTeamList, setOpponentTeamList] = React.useState("");
    const classes = useStyles()

    useEffect(() => {
        dispatch(getTeams(subscription))
    }, [subscription]);

    useEffect(() => {

        if (teamList) {
            const oppDrpTeamList = teamList.filter(node => node != homeTeam);
            setOpponentTeamList(oppDrpTeamList)
        }
    }, [homeTeam]);

    const initialValues = {
        homeTeam: '',
        opponentTeam: '',
        matchDate: '',
        matchTime: '',
        minBid: 30,
        subscription: ''
    };

    const validate = values => {
        const errors = {};

        if (!homeTeam) {
            errors.homeTeam = 'Home Team is required';
        }

        if (!values.opponentTeam) {
            errors.opponentTeam = 'Opponent Team is required';
        }

        if (!values.matchDate) {
            errors.matchDate = 'Match date is required';
        }

        if (!values.matchTime) {
            errors.matchTime = 'Match Time is required';
        }

        if (!values.minBid) {
            errors.minBid = 'Minimum Bid is required';
        } else if (values.minBid < 30) {
            errors.minBid = 'Minimum Bid should be greater or equal to 30'
        }

        if (!subscription) {
            errors.subscription = 'Subscription is required';
        }

        return errors;
    };

    const teamList = useSelector((state) => state.iPLReducer.teams);


    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true)
        const date = new Date(values.matchDate + ' ' + values.matchTime);
        const payload = {
            homeTeam: homeTeam,
            opponentTeam: values.opponentTeam,
            date: Date.parse(date),
            minBid: values?.minBid,
            subscription
        }
        const response = await postMatches(payload);
        setSubmitting(false);
        setLoading(false)
        handleDialogClose(false)
    };

    return (
        <Dialog
            open={open}
            onClose={handleDialogClose}
            fullWidth="mb"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Add Match"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, errors, touched, handleChange }) => (
                        <Form className="p-3">
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="subscription"
                                    label="Subscription"
                                    select
                                    fullWidth
                                    value={subscription}
                                    error={touched.subscription && Boolean(errors.subscription)}
                                    helperText={<ErrorMessage name="subscription" />}
                                    onChange={(event) => {
                                        setSubscription(event.target.value)
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Select status</em>
                                    </MenuItem>
                                    {user.subscriptions.map((item, ind) => (
                                        <MenuItem value={item} key={item}>
                                            {item}
                                        </MenuItem>
                                    ))}
                                </Field>
                            </Box>
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="homeTeam"
                                            label="Home Team"
                                            select
                                            value={homeTeam}
                                            style={{ marginRight: "20px", width: '100%' }}
                                            error={touched.homeTeam && Boolean(errors.homeTeam)}
                                            helperText={<ErrorMessage name="homeTeam" />}
                                            onChange={(event, ind) => {
                                                setHomeTeam(event.target.value)
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>Select status</em>
                                            </MenuItem>
                                            {teamList && teamList.map((item, ind) => (
                                                <MenuItem value={item} key={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Field>

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="opponentTeam"
                                            label="Opponent Team"
                                            select
                                            fullWidth
                                            error={touched.opponentTeam && Boolean(errors.opponentTeam)}
                                            helperText={<ErrorMessage name="opponentTeam" />}
                                        >
                                            <MenuItem value="">
                                                <em>Select status</em>
                                            </MenuItem>
                                            {opponentTeamList && opponentTeamList.map((item, ind) => (
                                                <MenuItem value={item} key={item}>
                                                    {item}
                                                </MenuItem>
                                            ))}
                                        </Field>
                                    </Grid>

                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="matchDate"
                                            label="Match Date"
                                            type="date"
                                            fullWidth
                                            style={{ marginRight: "20px" }}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.matchDate && Boolean(errors.matchDate)}
                                            helperText={<ErrorMessage name="matchDate" />}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="matchTime"
                                            label="Match Time"
                                            type="time"
                                            pattern="[0-9]{2}.[0-9]{2}"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.matchTime && Boolean(errors.matchTime)}
                                            helperText={<ErrorMessage name="matchTime" />}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="minBid"
                                    type="number"
                                    label="Minium Bid Amount"
                                    fullWidth
                                    error={touched.minBid && Boolean(errors.minBid)}
                                    helperText={<ErrorMessage name="minBid" />}
                                />
                            </Box>
                            <Box>
                                <Button onClick={handleDialogClose} style={{ color: "blue" }} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" style={{ float: "right" }} variant="contained" color="primary" disabled={isSubmitting}>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            className={
                                                classes.buttonProgress
                                            }
                                        />
                                    )}
                                    Submit
                                </Button>
                            </Box>

                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}

export default CreateMatch;
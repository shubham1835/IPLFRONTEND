/* eslint-disable */
import { Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress, TextField, Divider, MenuItem } from '@mui/material';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import useAuth from 'app/hooks/useAuth';
import { addSubscription } from 'app/redux/actions/SubscriptionAction';
const AddSubscriptionDialog = ({ open, handleDialogClose, matchId }) => {

    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { logout, user } = useAuth();

    const initialValues = {
        groupName: '',
        startTime: '',
        endTime: '',
        subscriptionStatus: '',
        details: ''
    };

    const validate = values => {
        const errors = {};

        if (!values.groupName) {
            errors.groupName = 'Group name is required';
        }

        if (!values.startTime) {
            errors.startTime = 'Start date is required';
        }

        if (!values.endTime) {
            errors.endTime = 'End date is required';
        } else if (values.startTime && values.endTime < values.startTime) {
            errors.endTime = 'End date cannot be before start date';
        }

        if (!values.subscriptionStatus) {
            errors.subscriptionStatus = 'Group status is required';
        }

        if (!values.details) {
            errors.details = 'Group description is required';
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            groupName: values?.groupName,
            startTime: Date.parse(values?.startTime),
            endTime: Date.parse(values?.endTime),
            subscriptionStatus: values?.subscriptionStatus,
            details: values?.details,
            groupAdmin: user.userName
        }
        setSubmitting(false);
        if (values) {
            setLoading(true)
            const response = await addSubscription(payload);
            console.log('[response]', JSON.stringify(response));
            if (response.status == 200) {
                setLoading(false)
            }
            if (response.data.statusCode != 200) {
                setLoading(false)
            }
        }
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
                {"Add New Subscription"}
            </DialogTitle>
            <DialogContent>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ values, isSubmitting, errors, touched }) => (
                        <Form className="p-3">
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="groupName"
                                    label="Group Name"
                                    fullWidth
                                    error={touched.groupName && Boolean(errors.groupName)}
                                    helperText={<ErrorMessage name="groupName" />}
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="startTime"
                                    label="Start Date"
                                    type="date"
                                    fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.startTime && Boolean(errors.startTime)}
                                    helperText={<ErrorMessage name="startTime" />}
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="endTime"
                                    label="End Date"
                                    type="date"
                                    fullWidth
                                    InputProps={{
                                        min: values.startTime
                                    }}
                                    disabled={!values.startTime}
                                    InputLabelProps={{ shrink: true }}
                                    error={touched.endTime && Boolean(errors.endTime)}
                                    helperText={<ErrorMessage name="endTime" />}
                                />
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="subscriptionStatus"
                                    label="Group Status"
                                    select
                                    fullWidth
                                    error={touched.subscriptionStatus && Boolean(errors.subscriptionStatus)}
                                    helperText={<ErrorMessage name="subscriptionStatus" />}
                                >
                                    <MenuItem value="">
                                        <em>Select status</em>
                                    </MenuItem>
                                    <MenuItem value="open">Open</MenuItem>
                                    <MenuItem value="closed">Closed</MenuItem>
                                </Field>
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="details"
                                    label="Group Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={touched.details && Boolean(errors.details)}
                                    helperText={<ErrorMessage name="details" />}
                                />
                            </Box>
                            <Box>
                                <Button onClick={handleDialogClose} style={{ color: "blue" }} color="secondary">
                                    Cancel
                                </Button>
                                <Button type="submit" style={{ float: "right" }} variant="contained" color="primary" disabled={isSubmitting}>
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

export default AddSubscriptionDialog;
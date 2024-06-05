import { Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress, TextField, Divider, MenuItem } from '@mui/material';
import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { margin } from '@mui/system';
// import { addSubscription } from 'app/redux/actions/SubscriptionAction';

const CreateMatch = ({ open, handleDialogClose, matchId }) => {

    const [loading, setLoading] = React.useState(false);
    const [value, setValue] = React.useState("");

    const initialValues = {
        groupName: '',
        startDate: '',
        endDate: '',
        groupStatus: '',
        groupDescription: ''
    };

    const validate = values => {
        const errors = {};

        if (!values.groupName) {
            errors.groupName = 'Group name is required';
        }

        if (!values.startDate) {
            errors.startDate = 'Start date is required';
        }

        if (!values.endDate) {
            errors.endDate = 'End date is required';
        } else if (values.startDate && values.endDate < values.startDate) {
            errors.endDate = 'End date cannot be before start date';
        }

        if (!values.groupStatus) {
            errors.groupStatus = 'Group status is required';
        }

        if (!values.groupDescription) {
            errors.groupDescription = 'Group description is required';
        }

        return errors;
    };

    const handleSubmit = async (values, { setSubmitting }) => {
        const payload = {
            groupName: values?.groupName,
            startDate: Date.parse(values?.startDate),
            endDate: Date.parse(values?.endDate),
            groupStatus: values?.groupStatus,
            groupDescription: values?.groupDescription
        }
        setSubmitting(false);
        if (values) {
            setLoading(true)
            // const response = await addSubscription(payload);
            // console.log('[response]', JSON.stringify(response));
            // if (response.status == 200) {
            //     setLoading(false)
            // }
            // if (response.data.statusCode != 200) {
            //     setLoading(false)
            // }
        }
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
                    {({ values, isSubmitting, errors, touched }) => (
                        <Form className="p-3">
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="groupStatus"
                                            label="Group Status"
                                            select
                                            style={{ marginRight: "20px", width: '100%' }}
                                            error={touched.groupStatus && Boolean(errors.groupStatus)}
                                            helperText={<ErrorMessage name="groupStatus" />}
                                        >
                                            <MenuItem value="">
                                                <em>Select status</em>
                                            </MenuItem>
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                        </Field>

                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="groupStatus"
                                            label="Group Status"
                                            select
                                            fullWidth
                                            error={touched.groupStatus && Boolean(errors.groupStatus)}
                                            helperText={<ErrorMessage name="groupStatus" />}
                                        >
                                            <MenuItem value="">
                                                <em>Select status</em>
                                            </MenuItem>
                                            <MenuItem value="active">Active</MenuItem>
                                            <MenuItem value="inactive">Inactive</MenuItem>
                                        </Field>
                                    </Grid>

                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="startDate"
                                            label="Start Date"
                                            type="date"
                                            fullWidth
                                            style={{ marginRight: "20px" }}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.startDate && Boolean(errors.startDate)}
                                            helperText={<ErrorMessage name="startDate" />}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="startTime"
                                            label="Start Date"
                                            type="time"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.startDate && Boolean(errors.startDate)}
                                            helperText={<ErrorMessage name="startTime" />}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Grid container spacing={2}>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="endDate"
                                            label="End Date"
                                            type="date"
                                            fullWidth
                                            style={{ marginRight: "20px" }}
                                            InputProps={{
                                                min: values.startDate
                                            }}
                                            disabled={!values.startDate}
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.endDate && Boolean(errors.endDate)}
                                            helperText={<ErrorMessage name="endDate" />}
                                        />
                                    </Grid>
                                    <Grid item lg={6} md={6} sm={6} xs={16}>
                                        <Field
                                            as={TextField}
                                            name="endTime"
                                            label="Start Date"
                                            type="time"
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            error={touched.startDate && Boolean(errors.startDate)}
                                            helperText={<ErrorMessage name="endTime" />}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="groupStatus"
                                    label="Group Status"
                                    select
                                    fullWidth
                                    error={touched.groupStatus && Boolean(errors.groupStatus)}
                                    helperText={<ErrorMessage name="groupStatus" />}
                                >
                                    <MenuItem value="">
                                        <em>Select status</em>
                                    </MenuItem>
                                    <MenuItem value="active">Active</MenuItem>
                                    <MenuItem value="inactive">Inactive</MenuItem>
                                </Field>
                            </Box>
                            <Box mb={2}>
                                <Field
                                    as={TextField}
                                    name="groupDescription"
                                    label="Group Description"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    error={touched.groupDescription && Boolean(errors.groupDescription)}
                                    helperText={<ErrorMessage name="groupDescription" />}
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

export default CreateMatch;
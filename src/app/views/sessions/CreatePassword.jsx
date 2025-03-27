/* eslint-disable */
import { useEffect } from 'react'
import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSearchParams } from "react-router-dom";

const FlexBox = styled(Box)(() => ({ display: 'flex', alignItems: 'center' }));

const JustifyBox = styled(FlexBox)(() => ({ justifyContent: 'center' }));

const ContentBox = styled(Box)(() => ({
  height: '100%',
  padding: '32px',
  position: 'relative',
  background: 'rgba(0, 0, 0, 0.01)',
}));

const JWTRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100% !important',
  '& .card': {
    maxWidth: 800,
    minHeight: 400,
    margin: '1rem',
    display: 'flex',
    borderRadius: 12,
    alignItems: 'center',
  },
}));

// inital login credentials
const initialValues = {
  email: '',
  password: '',
  remember: true,
};

const CreatePassword = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const userId = searchParams.get('userId');
  const [response, setResponse] = useState(false);
  const [errorText, setErrorText] = useState('');
  const pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const { validateToken, resetPassword } = useAuth();
  useEffect(() => {
    console.log('-------->', pattern.test('shubham'))
    validateToken(userId, token).then(res => {
      if (!res) {
        navigate('/session/404')
      }
      setResponse(res);
    }).catch(exception => {
      navigate('/session/404')
    })
  }, []);

  const handleFormSubmit = async (values) => {
    setLoading(true);
    console.log('submit called');
    try {
      console.log('submit called', values.password);
      const payload = {
        userId,
        token,
        'password': values.password
      }
      console.log('payload', payload);
      resetPassword(payload).then(res => {
        console.log('Success', res);
        setErrorText("")
        navigate('/session/signin')
      }).catch(exception => setErrorText("Error occured please try again later"));
      console.log("[dashboard]");
    } catch (e) {
      console.log('submit called', e);
      setLoading(false);
    }
  };

  return (
    <JWTRoot>
      {response &&
        <Card className="card">
          <Grid container>
            <Grid item sm={6} xs={12}>
              <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
                <img src="/assets/images/logos/Default_Create_betting_logo_for_SatteBaaz_with_female_models_0_97769e27-a07c-48cb-bc4c-324106ebe239_0.png" width="100%" alt="" />
              </JustifyBox>
            </Grid>
            <Grid item sm={6} xs={12}>
              <h1>{errorText}</h1>
              <ContentBox>
                <Formik
                  onSubmit={handleFormSubmit}
                  initialValues={initialValues}
                // validationSchema={validationSchema}
                >
                  {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        fullWidth
                        size="small"
                        name="password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.password}
                        onChange={handleChange}
                        helperText={!pattern.test(values.password) ? 'password must contain at least 1 lower, 1 upper, 1 digit and 1 symbol' : ''}
                        error={!pattern.test(values.password)}
                        sx={{ mb: 1.5 }}
                      />

                      <TextField
                        fullWidth
                        size="small"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        variant="outlined"
                        onBlur={handleBlur}
                        value={values.confirmPassword}
                        onChange={handleChange}
                        helperText={values.password !== values.confirmPassword ? 'confirm password should match password' : ''}
                        error={values.password !== values.confirmPassword}
                        sx={{ mb: 1.5 }}
                      />

                      <LoadingButton
                        type="submit"
                        color="primary"
                        loading={loading}
                        variant="contained"
                        disabled={!values.password || !values.confirmPassword || values.password != values.confirmPassword || loading}
                        sx={{ my: 2 }}

                      >
                        Submit
                      </LoadingButton>
                    </form>
                  )}
                </Formik>
              </ContentBox>
            </Grid>
          </Grid>
        </Card>}
    </JWTRoot>
  );
};

export default CreatePassword;

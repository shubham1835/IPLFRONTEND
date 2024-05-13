import { LoadingButton } from '@mui/lab';
import { Card, Checkbox, Grid, TextField } from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { Paragraph } from 'app/components/Typography';
import useAuth from 'app/hooks/useAuth';
import { Formik } from 'formik';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { OutlinedInput } from '@mui/material';
import * as Yup from 'yup';
import React, { useRef, useEffect } from 'react';

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

// form field validation schema
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Password must be 6 character length')
    .required('Password is required!'),
  email: Yup.string().email('Invalid Email address').required('Email is required!'),
});

const MpinLogin = () => {
  const inputsRef = useRef(new Array(6).fill(null));
  const theme = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [buttonEnable, setButtonEnable] = useState(true);

  const { otpLogin } = useAuth();
  useEffect(() => {
    inputsRef.current[0].focus();
  }, []);

  const handleFormSubmit = async () => {
    const res = inputsRef.current.map((input) => input.value).join('');
    if (res.length == 6) {
      setLoading(true);
      try {
        await otpLogin(res);
        console.log("[dashboard]");
        navigate('/');
      } catch (e) {
        setLoading(false);
      }
    }
  };
  const handleOnKeyDown = (e) => {
    const { key } = e;
    const target = e.target;
    const previousElementSibling = target.parentElement?.previousElementSibling?.firstChild;
    if (key === 'Backspace') {
      if (target.value === '' && previousElementSibling) {
        (previousElementSibling).focus();
        e.preventDefault();
      } else {
        target.value = '';
      }
    }
    setButtonEnable(inputsRef.current.map((input) => input.value).join('').length != 6)
  };
  const handleOnFocus = (e) => {
    e.target.select();
  };
  const handleOnChange = (e) => {
    const {
      target: { value },
    } = e;

    const nextElementSibling = e.target.parentElement?.nextElementSibling?.firstChild;

    if (value.length > 1) {
      e.target.value = value.charAt(0);
      nextElementSibling && (nextElementSibling).focus();
    } else {
      if (value.match('[0-9]{1}')) {
        nextElementSibling && (nextElementSibling).focus();
      } else {
        e.target.value = '';
      }
    }
    setButtonEnable(inputsRef.current.map((input) => input.value).join('').length != 6)
  };
  return (
    <JWTRoot>
      <Card className="card">
        <Grid container>
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/logos/Indian_Premier_League_Official_Logo.svg.png" width="100%" alt="" />
            </JustifyBox>
          </Grid>

          <Grid item sm={6} xs={12}>
            <ContentBox>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                {Array.from(Array(6).keys()).map((i) => (
                  <OutlinedInput
                    key={i}
                    onChange={handleOnChange}
                    onKeyDown={handleOnKeyDown}
                    onFocus={handleOnFocus}
                    // onPaste={handleOnPaste}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: 'center' },
                    }}
                    type='password'
                    inputRef={(ele) => inputsRef.current[i] = ele}
                    autoComplete={i === 0 ? 'one-time-code' : 'off'}
                    sx={{
                      height: 40,
                      width: 40,
                      mr: 0.5,
                      ml: 0.5,
                    }}
                  />
                ))}
              </Box>
              <LoadingButton
                style={{ position: 'absolute', left: '35%', marginTop: '10%' }}
                type="submit"
                color="primary"
                loading={loading}
                onClick={handleFormSubmit}
                disabled={buttonEnable}
                variant="contained"
                sx={{ my: 2 }}
              >
                Verify
              </LoadingButton>
              <Paragraph>
                Go to Login Page
                <NavLink
                  to="/session/signin"
                  style={{ color: theme.palette.primary.main, marginLeft: 5 }}
                >
                  Login Page
                </NavLink>
              </Paragraph>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </JWTRoot>
  );
};

export default MpinLogin;

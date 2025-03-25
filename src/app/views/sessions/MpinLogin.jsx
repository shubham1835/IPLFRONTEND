/* eslint-disable */
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
  let firebaseToken = window.localStorage.getItem("firebaseToken");
  console.log('firebaseToken======', firebaseToken);
  //cbxfenVsnhBPBdqdMmkRLz:APA91bHlrEByt8hJ_3up778faoZ4XlsSpuXofvxuE-Qmto01LNl6QW9gDxRNp2yq3G8_XJLWNU9PpWoifdJz2Q6to0PlP6cjdqtz8Sl6Jj5-vgA0hjgogCfwdYj8wgkRf7R8oHlCwr6G
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
              <img src="/assets/images/logos/Default_Create_betting_logo_for_SatteBaaz_with_female_models_0_97769e27-a07c-48cb-bc4c-324106ebe239_0.png" width="100%" alt="" />
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
                      style: { textAlign: 'center', '-webkit-text-security': 'disc', },
                    }}
                    type="tel"
                    inputMode="numeric"
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

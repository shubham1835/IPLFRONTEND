import { Box, Button, Card, Grid, styled, TextField } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from 'app/hooks/useAuth';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const FlexBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: 'center',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  padding: 32,
  background: theme.palette.background.default,
}));

const ForgotPasswordRoot = styled(JustifyBox)(() => ({
  background: '#1A2038',
  minHeight: '100vh !important',
  '& .card': {
    maxWidth: 800,
    margin: '1rem',
    borderRadius: 12,
  },
}));

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useAuth();
  const [userId, setUserId] = useState('');
  const [dialogEvent, setDialogEvent] = useState(false);

  const handleFormSubmit = () => {
    forgotPassword(userId);
    setDialogEvent(true)
  };

  const emailSentDailog = () => {
    return (
      <Dialog open={dialogEvent} fullWidth
        maxWidth={'sm'} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Forgot Password</DialogTitle>
        <DialogContent>
          <h4>{`Email sent to your registered mail Id, password reset link is valid for next 10 min.`}</h4>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => navigate('/session/signin')} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <ForgotPasswordRoot>
      <Card className="card">
        <Grid container>
          {emailSentDailog()}
          {/* <Grid item xs={12}> */}
          <Grid item sm={6} xs={12}>
            <JustifyBox p={4} height="100%" sx={{ minWidth: 320 }}>
              <img src="/assets/images/logos/Default_Create_betting_logo_for_SatteBaaz_with_female_models_0_97769e27-a07c-48cb-bc4c-324106ebe239_0.png" width="100%" alt="" />
            </JustifyBox>
          </Grid>
          <Grid item sm={6} xs={12}>
            <ContentBox>
              <form>
                <TextField
                  type="text"
                  name="userId"
                  size="small"
                  label="UserId"
                  value={userId}
                  variant="outlined"
                  onChange={(e) => setUserId(e.target.value)}
                  sx={{ mb: 3, width: '100%' }}
                />

                <Button disabled={!userId} onClick={() => handleFormSubmit()} fullWidth variant="contained" color="primary">
                  Reset Password
                </Button>

                <Button
                  fullWidth
                  color="primary"
                  variant="outlined"
                  onClick={() => navigate(-1)}
                  sx={{ mt: 2 }}
                >
                  Go Back
                </Button>
              </form>
            </ContentBox>
          </Grid>
          {/* </Grid> */}
        </Grid>
      </Card>
    </ForgotPasswordRoot>
  );
};

export default ForgotPassword;

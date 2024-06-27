import { Icon, Box, Button, Card, Grid, styled, CircularProgress, Switch } from '@mui/material';
import React, { useEffect } from 'react'
import useAuth from 'app/hooks/useAuth';
import { makeStyles } from '@mui/styles'
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from 'app/redux/actions/IplAction';
import AddSubscriptionDialog from './AddSubscriptionDialog';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '24px !important',
  background: theme.palette.background.paper,
  [theme.breakpoints.down('sm')]: { padding: '16px !important' },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  '& small': { color: theme.palette.text.secondary }
}));

const Heading = styled('h6')(({ theme }) => ({
  margin: 0,
  marginTop: '4px',
  fontSize: '14px',
  fontWeight: '500',
  color: theme.palette.primary.main,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: '8px',
  paddingLeft: '24px',
  paddingRight: '24px',
  overflow: 'hidden',
  borderRadius: '300px',
  transition: 'all 250ms',
  '&.yesBtn': {
    '&:hover': {
      color: '#ffffff',
      background: `${theme.palette.primary.main} !important`,
      backgroundColor: `${theme.palette.primary.main} !important`,
      fallbacks: [{ color: 'white !important' }],
    },
  },
  '&.noBtn': {
    '&:hover': {
      color: '#ffffff',
      background: `${theme.palette.secondary.main} !important`,
      backgroundColor: `${theme.palette.secondary.main} !important`,
      fallbacks: [{ color: 'white !important' }],
    },
  },
}));

const StatCards = () => {
  const [bidViewOpen, setBidViewOpen] = React.useState(false);
  const [dialogItem, setDialogItem] = React.useState({});
  const { logout, user } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('[user called]', user);
    dispatch(getMatches(user.userName))
  }, []);

  const handleViewBidClose = () => {
    setBidViewOpen(false)
  }
  const handleViewBidOpen = (item) => {
    setDialogItem(item)
    setBidViewOpen(true)
  }

  const handleSwitchChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      <Grid item xs={12} md={6}>
        <StyledCard elevation={6}>
          <ContentBox>
            {/* {item.bidDone && <Icon sx={{ color: green[500] }}>check_circle</Icon>} */}
            <img style={{ width: '20%', height: '20%' }} src="/assets/images/logos/Default_Create_betting_logo_for_SatteBaaz_with_female_models_0_97769e27-a07c-48cb-bc4c-324106ebe239_0.png" alt="" />
            <Box ml="12px">
              {/* <H6>{item.match}</H6> */}
              <Heading>Create New Subscription</Heading>
              <StyledButton onClick={() => handleViewBidOpen()} className="yesBtn" variant="outlined" color="primary">
                Subscription
              </StyledButton>
            </Box>
          </ContentBox>
        </StyledCard>
      </Grid>
      <AddSubscriptionDialog
        open={bidViewOpen}
        handleDialogClose={handleViewBidClose}
      ></AddSubscriptionDialog>
    </Grid>
  );
};

export default StatCards;

import { Icon, Box, Button, Card, Grid, styled, CircularProgress, Switch } from '@mui/material';
import React, { useEffect } from 'react'
import useAuth from 'app/hooks/useAuth';
import { makeStyles } from '@mui/styles'
import { makeBid, callResult } from 'app/redux/actions/BidAction';
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

const useStyles = makeStyles(({ palette, ...theme }) => ({
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
}))

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
  const [open, setOpen] = React.useState(false);
  const [resultOpen, setResultOpen] = React.useState(false);
  const [bidViewOpen, setBidViewOpen] = React.useState(false);
  const [dialogItem, setDialogItem] = React.useState({});
  const [value, setValue] = React.useState("");
  const [matchListToBeShowed, setMatchList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(30);
  const [bidResponse, setBidResponse] = React.useState("");
  const { logout, user } = useAuth();
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch();
  const classes = useStyles()
  const handleInputChange = (event) => {
    setInputValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  useEffect(() => {
    console.log('[user called]', user);
    dispatch(getMatches(user.userName))
  }, []);
  const handleBlur = () => {
    if (value < 0) {
      setInputValue(0);
    } else if (value > 100) {
      setInputValue(100);
    }
  };

  const formatDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateToBeFormatted = new Date(date);
    return `${dateToBeFormatted.toLocaleDateString("hi-IN", options)}, ${dateToBeFormatted.toLocaleTimeString("hi-IN")}`
  }

  function handleClickOpen() {
    setOpen(true)
  }
  const bidTimeCheck = (item) => {
    const date = new Date();
    const lastBidTime = new Date(item.lastBidTime);
    return date < lastBidTime;
  }


  const handleClose = async () => {
    if (value != dialogItem.homeTeam) {
      if (value != dialogItem.opponentTeam) {
        setBidResponse("Please select valid team");
        return;
      }

    }
    if (inputValue && value && bidTimeCheck(dialogItem)) {
      setLoading(true)
      const bidRequest = { bidTime: new Date(), bidAmount: inputValue, matchId: dialogItem.matchId, bidTeam: value, user: user.userName };
      const response = await makeBid(bidRequest);
      console.log('[response]', JSON.stringify(response));
      if (response.status == 200) {
        setLoading(false)
        setOpen(false)
      }
      if (response.data.statusCode != 200) {
        setBidResponse(response.data.message);
        setLoading(false)
      }
    }
  }

  const handleViewBidClose = () => {
    setBidViewOpen(false)
  }
  const handleViewBidOpen = (item) => {
    setDialogItem(item)
    setBidViewOpen(true)
  }

  const matchList = useSelector((state) => state.iPLReducer.matches);
  const result = matchList && matchList.filter((match) => match.winner == null);
  useEffect(() => {
    setMatchList(result)
  }, [matchList]);

  const handleSwitchChange = (event) => {
    if (event.target.checked)
      setMatchList(matchList)
    else
      setMatchList(result);
    setChecked(event.target.checked);
  };

  return (
    <div>
      Show All Matches <Switch
        color="primary"
        checked={checked}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        <Grid item xs={12} md={6}>
          <StyledCard elevation={6}>
            <ContentBox>
              {/* {item.bidDone && <Icon sx={{ color: green[500] }}>check_circle</Icon>} */}
              <img style={{ width: '20%', height: '20%' }} src="/assets/images/logos/Indian_Premier_League_Official_Logo.svg.png" alt="" />
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
    </div>
  );
};

export default StatCards;

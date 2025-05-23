/* eslint-disable */
import { Icon, Box, Button, Card, Grid, styled, Radio, RadioGroup, Input, CircularProgress, Switch } from '@mui/material';
import { Small, H6 } from 'app/components/Typography';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useEffect } from 'react'
import { green } from '@mui/material/colors';
import FormControlLabel from "@mui/material/FormControlLabel";
import useAuth from 'app/hooks/useAuth';
import { makeStyles } from '@mui/styles'
import { makeBid, callResult } from 'app/redux/actions/BidAction';
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from 'app/redux/actions/IplAction';
import ViewBid from './ViewBid';
import CreateMatch from './CreateMatch';
import { toMilliSecond } from 'app/utils/utils';

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
  const [matchViewOpen, setMatchViewOpen] = React.useState(false);
  const [dialogItem, setDialogItem] = React.useState({});
  const [value, setValue] = React.useState("");
  const [matchListToBeShowed, setMatchList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState(0);
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
  const subscriptions = user.subscriptions;
  const handleBlur = () => {
    if (value < 0) {
      setInputValue(0);
    } else if (value > 100) {
      setInputValue(100);
    }
  };

  const formatDate = (date) => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateToBeFormatted = new Date(toMilliSecond(date));
    return `${dateToBeFormatted.toLocaleDateString("hi-IN", options)}, ${dateToBeFormatted.toLocaleTimeString("hi-IN")}`
  }

  function handleClickOpen() {
    setOpen(true)
  }
  const bidTimeCheck = (item) => {
    const date = new Date();
    const lastBidTime = new Date(toMilliSecond(item.lastBidTime));
    return date < lastBidTime;
  }

  const viewBidCheck = (item) => {
    const date = new Date();
    const lastBidTime = new Date(toMilliSecond(item.lastBidTime));
    lastBidTime.setHours(lastBidTime.getHours() - 2)
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
      const bidRequest = { bidTime: Date.now(), bidAmount: inputValue, matchId: dialogItem.matchId, bidTeam: value, user: user.userName };
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

  const handleResultClose = async () => {
    if (value) {
      setLoading(true)
      const response = await callResult(dialogItem.matchId, value);
      console.log('[response]', JSON.stringify(response));
      if (response.status == 200) {
        setLoading(false)
        setResultOpen(false)
      }
      if (response.data.statusCode != 200) {
        setBidResponse(response.data.message);
        setLoading(false)
      }
    }
  }

  const handleDialogClose = () => {
    setOpen(false)
  }
  const handleResultDialogClose = () => {
    setResultOpen(false)
  }
  const handleBidOpen = (item) => {
    setInputValue(item.minBid);
    setDialogItem(item);
    handleClickOpen();
  }
  const handleViewBidClose = () => {
    setBidViewOpen(false)
  }
  const handleViewBidOpen = (item) => {
    setDialogItem(item)
    setBidViewOpen(true)
  }

  const handleResultOpen = (item) => {
    setDialogItem(item)
    setResultOpen(true)
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

  function handleChange(event) {
    setValue(event.target.value);
  }

  return (
    <div>
      Show All Matches <Switch
        color="primary"
        checked={checked}
        onChange={handleSwitchChange}
        inputProps={{ 'aria-label': 'controlled' }}
      />
      {user.role == 'SA' && <div>
        <Button sx={{ m: 1 }} variant="contained" onClick={() => setMatchViewOpen(true)} color="primary">
          Create Match
        </Button>
      </div>}
      <Grid container spacing={3} sx={{ mb: '24px' }}>
        {matchListToBeShowed && matchListToBeShowed.map((item, index) => (
          <Grid item xs={12} md={6} key={index}>
            <StyledCard elevation={6}>
              <ContentBox>
                {item.bidDone && <Icon sx={{ color: green[500] }}>check_circle</Icon>}
                <img style={{ width: '20%', height: '20%' }} src="/assets/images/logos/Default_Create_betting_logo_for_SatteBaaz_with_female_models_0_97769e27-a07c-48cb-bc4c-324106ebe239_0.png" alt="" />
                <Box ml="12px">
                  <H6>{item.match}</H6>
                  <Heading>Match Time: {formatDate(item.date)}</Heading>
                  <Heading>Last Bid Time: {formatDate(item.lastBidTime)}</Heading>
                  {bidTimeCheck(item) && <StyledButton onClick={() => handleBidOpen(item)} className="yesBtn" variant="outlined" color="primary">
                    Bid
                  </StyledButton>}
                  {!viewBidCheck(item) && <StyledButton onClick={() => handleViewBidOpen(item)} className="yesBtn" variant="outlined" color="primary">
                    View Bid
                  </StyledButton>}
                  {user.role == 'SA' && <StyledButton onClick={() => handleResultOpen(item)} className="yesBtn" variant="outlined" color="primary">
                    Trigger Result
                  </StyledButton>}
                </Box>
              </ContentBox>
            </StyledCard>
          </Grid>
        ))}
        <ViewBid
          open={bidViewOpen}
          handleDialogClose={handleViewBidClose}
          matchId={dialogItem.matchId}
        ></ViewBid>
        <CreateMatch
          open={matchViewOpen}
          handleDialogClose={setMatchViewOpen}
          subscriptions={subscriptions}></CreateMatch>
      </Grid>
      <Dialog
        open={open}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bid"}
        </DialogTitle>
        <DialogContent>
          <RadioGroup row
            value={value}
            name="match"
            className="group"
            aria-label="Match"
            onChange={handleChange}
          >
            <FormControlLabel value={dialogItem.homeTeam} control={<Radio />} label={dialogItem.homeTeam} />
            <FormControlLabel value={dialogItem.opponentTeam} control={<Radio />} label={dialogItem.opponentTeam} />
          </RadioGroup>
          <Input
            value={inputValue}
            margin="dense"
            sx={{ width: '100%' }}
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min: 0,
              max: 100,
              type: "number",
              "aria-labelledby": "input-slider",
            }}
          />
          <Small>{bidResponse}</Small>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button variant="contained" disabled={loading} onClick={handleClose} color="primary">
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

      <Dialog
        open={resultOpen}
        onClose={handleResultDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Result"}
        </DialogTitle>
        <DialogContent>
          <RadioGroup row
            value={value}
            name="match"
            className="group"
            aria-label="Match"
            onChange={handleChange}
          >
            <FormControlLabel value={dialogItem.homeTeam} control={<Radio />} label={dialogItem.homeTeam} />
            <FormControlLabel value={dialogItem.opponentTeam} control={<Radio />} label={dialogItem.opponentTeam} />
          </RadioGroup>
          <Small>{bidResponse}</Small>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleDialogClose} color="primary">
            Close
          </Button>
          <Button variant="contained" disabled={loading} onClick={handleResultClose} color="primary">
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
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StatCards;

import { Box, Button, Card, Grid, styled, Radio, RadioGroup, Input } from '@mui/material';
import { Small, H6 } from 'app/components/Typography';
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import React, { useEffect } from 'react'
import FormControlLabel from "@mui/material/FormControlLabel";
import useAuth from 'app/hooks/useAuth';
import { makeBid } from 'app/redux/actions/BidAction';
import { useDispatch, useSelector } from 'react-redux';
import { getMatches } from 'app/redux/actions/IplAction';
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

const StatCards = () => {
  const [open, setOpen] = React.useState(false);
  const [dialogItem, setDialogItem] = React.useState({});
  const [value, setValue] = React.useState("");
  const [inputValue, setInputValue] = React.useState(30);
  const [bidResponse, setBidResponse] = React.useState("");
  const { logout, user } = useAuth();
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    setInputValue(event.target.value === "" ? "" : Number(event.target.value));
  };
  useEffect(() => {
    console.log('[useEffect called]');
    dispatch(getMatches())
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
  const handleClose = async () => {
    const date = new Date();
    const lastBidTime = new Date(dialogItem.lastBidTime);
    if (inputValue && value) {
      const bidRequest = { bidTime: new Date(), bidAmount: inputValue, matchId: dialogItem.matchId, bidTeam: value, user: user.userName };
      const response = await makeBid(bidRequest);
      console.log('[response]', JSON.stringify(response.data));
      if (response.data.statusCode != 200) {
        setBidResponse(response.data.message);
      } else {
        setOpen(false)
      }
    }
  }

  const handleDialogClose = () => {
    setOpen(false)
  }
  const handleBidOpen = (item) => {
    setDialogItem(item)
    handleClickOpen();
  }

  function handleChange(event) {
    setValue(event.target.value);
  }
  const matchList = useSelector((state) => state.iPLReducer.matches);
  return (
    <Grid container spacing={3} sx={{ mb: '24px' }}>
      {matchList && matchList.map((item, index) => (
        <Grid item xs={12} md={6} key={index}>
          <StyledCard elevation={6}>
            <ContentBox>
              <img style={{ width: '20%', height: '20%' }} src="/assets/images/logos/Indian_Premier_League_Official_Logo.svg.png" alt="" />
              <Box ml="12px">
                <H6>{item.match}</H6>
                <Heading>Match Time: {formatDate(item.date)}</Heading>
                <Heading>Last Bid Time: {formatDate(item.lastBidTime)}</Heading>
                <Button onClick={() => handleBidOpen(item)} variant="contained">Bid</Button>
              </Box>
            </ContentBox>
          </StyledCard>
        </Grid>
      ))}
      <Dialog
        open={open}
        onClose={handleClose}
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
          <Button variant="contained" onClick={handleClose} color="primary">
            BID
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
};

export default StatCards;
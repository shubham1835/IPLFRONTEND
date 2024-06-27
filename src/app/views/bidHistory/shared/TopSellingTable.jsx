import React, { useEffect } from 'react'
import {
  Switch,
  Box,
  Card,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
  Button
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { Paragraph } from 'app/components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getBidList } from 'app/redux/actions/BidAction';
import useAuth from 'app/hooks/useAuth';

const CardHeader = styled(Box)(() => ({
  display: 'flex',
  paddingLeft: '24px',
  paddingRight: '24px',
  marginBottom: '12px',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const Title = styled('span')(() => ({
  fontSize: '1rem',
  fontWeight: '500',
  textTransform: 'capitalize',
}));

const ProductTable = styled(Table)(() => ({
  minWidth: 400,
  whiteSpace: 'pre',
  '& small': {
    width: 50,
    height: 15,
    borderRadius: 500,
    boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
  },
  '& td': { borderBottom: 'none' },
  '& td:first-of-type': { paddingLeft: '16px !important' },
}));

const Small = styled('small')(({ bgcolor }) => ({
  width: 50,
  height: 15,
  color: '#fff',
  padding: '2px 8px',
  borderRadius: '4px',
  overflow: 'hidden',
  background: bgcolor,
  boxShadow: '0 0 2px 0 rgba(0, 0, 0, 0.12), 0 2px 2px 0 rgba(0, 0, 0, 0.24)',
}));

const TopSellingTable = () => {
  const dispatch = useDispatch();
  const [bidListToBeShowed, setBidList] = React.useState([]);
  const [checked, setChecked] = React.useState(false);
  const { user } = useAuth();
  const subscriptions = user.subscriptions;
  useEffect(() => {
    dispatch(getBidList(user.userName, subscriptions[0]))
  }, []);
  const bidList = useSelector((state) => state.bidReducer.userBids);
  const result = bidList && bidList.filter((bid) => bid.finalAmount == 0);
  useEffect(() => {
    setBidList(result)
  }, [bidList]);

  const handleSwitchChange = (event) => {
    if (event.target.checked)
      setBidList(bidList)
    else
      setBidList(result);
    setChecked(event.target.checked);
  };
  const callBidList = (subscription) => {
    dispatch(getBidList(user.userName, subscription))
    console.log('subscriptions=====', subscription);
  }
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Bid History</Title>
        <Stack sx={{ ml: 1 }} direction="row" spacing={1}>
          {subscriptions && subscriptions.map(element => <Button size="small" onClick={() => callBidList(element)} variant="contained" >{element}</Button>
          )}
        </Stack>
        <div>
          Show All Matches <Switch
            color="primary"
            checked={checked}
            onChange={handleSwitchChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </div>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 3 }} colSpan={4}>
                Match
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Favorite
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={2}>
                Bid
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={1}>
                Result
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {bidListToBeShowed && bidListToBeShowed.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.match}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.bidTeam}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                  {product.bidAmount.toFixed(2)}
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.finalAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

export default TopSellingTable;

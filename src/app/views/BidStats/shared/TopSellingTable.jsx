/* eslint-disable */
import React, { useEffect } from 'react'
import {
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
import Typography from '@mui/material/Typography';
import { keyframes } from '@emotion/react';
import { getAggregate } from 'app/redux/actions/BidAction';
import useAuth from 'app/hooks/useAuth';

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

const blueGlow = keyframes`
  0% { text-shadow: 0 0 5px #00BFFF, 0 0 10px #00BFFF; }
  50% { text-shadow: 0 0 15px #1E90FF, 0 0 25px #1E90FF; }
  100% { text-shadow: 0 0 5px #00BFFF, 0 0 10px #00BFFF; }
`;

// Define sparkle animation
const sparkle = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
  100% { opacity: 1; transform: scale(1); }
`;

const TopSellingTable = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const { user } = useAuth();
  const subscriptions = user.subscriptions;
  useEffect(() => {
    dispatch(getAggregate(subscriptions?.[1]))
  }, []);
  const bidList = useSelector((state) => state.bidReducer.aggregateBids);

  const callAggrigateBid = (subscription) => {
    dispatch(getAggregate(subscription))
    console.log('subscriptions=====', subscription);
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* Fixed First Card */}
      {bidList && (
        <Card
          elevation={3}
          sx={{
            pt: 1,
            pb: 1,
            px: 2,
            textAlign: "center",
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "white", // Ensure background doesn't get transparent
            color: "gold",
          }}
        >
          {/* Crown Emoji */}
          <Box sx={{ display: "flex", justifyContent: "center", fontSize: 50, animation: `${sparkle} 1.5s infinite alternate`, mb: 0.5 }}>
            👑
          </Box>

          {/* King Text */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ animation: `${blueGlow} 1.5s infinite alternate`, color: "#1E90FF" }}
          >
            {bidList?.[0].user ?? null}
          </Typography>
        </Card>
      )}

      {/* Scrollable Second Card */}
      <Box sx={{ flex: 1, overflowY: "auto", mt: 2 }}>
        <Card elevation={3} sx={{ pt: "20px", mb: 3 }}>
          <Stack sx={{ ml: 1 }} direction="row" spacing={1}>
            {subscriptions &&
              subscriptions.map((element) => (
                <Button size="small" onClick={() => callAggrigateBid(element)} variant="contained">
                  {element}
                </Button>
              ))}
          </Stack>

          <Box overflow="auto">
            <ProductTable>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ px: 3 }} colSpan={4}>
                    User
                  </TableCell>
                  <TableCell sx={{ px: 0 }} colSpan={2}>
                    Total Bid Amount
                  </TableCell>
                  <TableCell sx={{ px: 0 }} colSpan={2}>
                    Total Final Amount
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {bidList &&
                  bidList.map((product, index) => (
                    <TableRow key={index} hover>
                      <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: "capitalize" }}>
                        <Box display="flex" alignItems="center">
                          <Paragraph sx={{ m: 0, ml: 4 }}>{product.user}</Paragraph>
                        </Box>
                      </TableCell>

                      <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: "capitalize" }}>
                        {product.bidAmount.toFixed(2)}
                      </TableCell>

                      <TableCell sx={{ px: 0 }} align="left" colSpan={2}>
                        {product.finalAmount.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </ProductTable>
          </Box>
        </Card>
      </Box>
    </div>

  );
};

export default TopSellingTable;

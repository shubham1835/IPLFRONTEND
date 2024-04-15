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
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { getAggregate } from 'app/redux/actions/BidAction';
import { MatxLoading } from 'app/components'

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

const TopSellingTable = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  useEffect(() => {
    dispatch(getAggregate())
  }, []);
  const bidList = useSelector((state) => state.bidReducer.aggregateBids);
  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      {!bidList && <MatxLoading></MatxLoading>}
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
            {bidList && bidList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={4} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.user}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={2} sx={{ px: 0, textTransform: 'capitalize' }}>
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
  );
};

export default TopSellingTable;

import {
  Avatar,
  Box,
  Card,
  Icon,
  IconButton,
  MenuItem,
  Select,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';
import { Paragraph } from 'app/components/Typography';

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
  const { palette } = useTheme();
  const bgError = palette.error.main;
  const bgPrimary = palette.primary.main;
  const bgSecondary = palette.secondary.main;

  return (
    <Card elevation={3} sx={{ pt: '20px', mb: 3 }}>
      <CardHeader>
        <Title>Match Bid</Title>
      </CardHeader>

      <Box overflow="auto">
        <ProductTable>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 6 }} colSpan={6}>
                User
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                Bid
              </TableCell>
              <TableCell sx={{ px: 0 }} colSpan={3}>
                win/loss
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {productList.map((product, index) => (
              <TableRow key={index} hover>
                <TableCell colSpan={6} align="left" sx={{ px: 0, textTransform: 'capitalize' }}>
                  <Box display="flex" alignItems="center">
                    <Paragraph sx={{ m: 0, ml: 4 }}>{product.name}</Paragraph>
                  </Box>
                </TableCell>

                <TableCell align="left" colSpan={3} sx={{ px: 0, textTransform: 'capitalize' }}>
                  {product.fav}
                </TableCell>

                <TableCell sx={{ px: 0 }} align="left" colSpan={3}>
                  {product.price}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </ProductTable>
      </Box>
    </Card>
  );
};

const productList = [
  {
    imgUrl: '/assets/images/products/headphone-2.jpg',
    name: 'LSG VS DC',
    fav: 'LSG',
    price: 40
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'RCB VS CSK',
    fav: 'CSK',
    price: 50
  },
  {
    imgUrl: '/assets/images/products/iphone-2.jpg',
    name: 'RR VS CSK',
    fav: 'CSK',
    price: 60
  },
  {
    imgUrl: '/assets/images/products/iphone-1.jpg',
    name: 'RR VS RCB',
    fav: 'RR',
    price: 100
  },
  {
    imgUrl: '/assets/images/products/headphone-3.jpg',
    name: 'RR VS GS',
    fav: 'GS',
    price: 77
  },
];

export default TopSellingTable;

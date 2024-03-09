import React from 'react'
import { authRoles } from '../../auth/authRoles'
import Loadable from 'app/components/Loadable';
const AddProduct= Loadable(React.lazy(() => import('./add-product/AddProduct')));
const ProductList= Loadable(React.lazy(() => import('./product-list/ProductList')));
const UpdateProduct= Loadable(React.lazy(() => import('./product-list/ProductUpdateDialog')));
const productRoutes = [
    {
        path: '/product/addProduct',
        element: <AddProduct/>,
        auth: authRoles.admin,
    },
    {
        path: '/product/products',
        element: <ProductList/>,
        auth: authRoles.admin,
    },
    {
        path: '/product/updateProducts',
        element: <UpdateProduct/>,
        auth: authRoles.admin,
    }
]

export default productRoutes

import React from 'react'
import { authRoles } from '../../auth/authRoles'

const BasicForm= Loadable(React.lazy(() => import('./BasicForm')));
// const EditForm= Loadable(React.lazy(() => import('./EditorForm')));
const UploadForm= Loadable(React.lazy(() => import('./UploadForm')));
const InvoiceForm= Loadable(React.lazy(() => import('./invoice-form/InvoiceForm')));
const InvoiceFormat= Loadable(React.lazy(() => import('./invoice-form/InvoiceFormat')));
const InvoiceList= Loadable(React.lazy(() => import('./invoice-list/InvoiceList')));

const formsRoutes = [
    {
        path: '/forms/basic',
        element: <BasicForm/>,
    },
    // {
    //     path: '/forms/editor',
    //     element: <EditForm/>,
    // },
    {
        path: '/forms/upload',
        element: <UploadForm/>,
    },
    {
        path: '/forms/invoice',
        element: <InvoiceForm/>,
        auth: authRoles.admin,
    },
    {
        path: '/forms/invoiceFormat',
        element: <InvoiceFormat/>,
        auth: authRoles.admin,
    },
    {
        path: '/forms/invoiceList',
        element: <InvoiceList/>,
        auth: authRoles.admin,
    },
]

export default formsRoutes

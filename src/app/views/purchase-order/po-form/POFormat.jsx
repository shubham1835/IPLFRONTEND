import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer'
import { Page, Document } from '@react-pdf/renderer';
import { useSelector } from 'react-redux'

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        fontSize: 11,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    ////
    pageContainer: {
        borderWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
    },
    ////
    titleContainer: {
        borderBottomColor: '#000000',
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    reportTitle: {
        color: '#000000',
        paddingTop: 3,
        fontSize: 8,
    },
    ////
    brandContainer: {
        borderBottomColor: '#000000',
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1,
    },
    brandSubContainer: {
        borderBottomColor: '#000000',
        flexDirection: 'row',
        width: '50%',
        flexWrap: 'wrap',
    },
    brandTitle: {
        width: '100%',
        fontWeight: 'extrabold',
        paddingTop: 3,
        paddingLeft: 3,
        fontSize: 12
    },
    POTitle: {
        width: '100%',
        fontWeight: 'extrabold',
        paddingTop: 3,
        textAlign: 'right',
        paddingRight: 3,
        fontSize: 12
    },
    brandInfo: {
        paddingLeft: 3,
        fontWeight: 'normal',
        fontSize: 8,
        width: '100%',
    },
    POInfo: {
        paddingRight: 3,
        fontWeight: 'normal',
        textAlign: 'right',
        fontSize: 8,
        width: '100%',
    },
    invoiceInfoTableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    invoiceInfocontainer: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1
    },
    billToDetail: {
        width: '50%',
        borderRightColor: "#000000",
        paddingLeft: 3,
        paddingTop: 3,
        fontSize: 10,
        borderRightWidth: 1,
    },
    transportDetails: {
        width: '50%',
        paddingTop: 3,
        fontSize: 10,
        borderRightColor: "#000000",
        paddingLeft: 3
    },
    invoiceDetails: {
        width: '30%',
        paddingLeft: 5,
    },
    invoiceTextStyle: {
        color: '#000000',
        fontSize: 8,
    },
    invoiceDataName: {
        width: '20%',
        paddingLeft: 5,
        borderRightWidth: 1,
    },
    smallColumn: {
        width: '10%',
        paddingLeft: 5,
        borderRightWidth: 1,
        fontSize:8
    },
    largeColumn: {
        width: '20%',
        paddingLeft: 5,
        paddingRight:8,
        borderRightWidth: 1,
        fontSize:8
    },
    largeColumnLast: {
        width: '25%',
        paddingLeft: 5,
        fontSize:8
    },
    smallColumnLast: {
        width: '10%',
        paddingLeft: 5,
        fontSize:8
    },
    invoiceDataLast: {
        width: '10%',
        paddingLeft: 5
    },
    invoiceItemName: {
        width: '20%',
        paddingLeft: 5,
    },
    invoiceItem: {
        width: '10%',
        paddingLeft: 5
    },
    invoiceItemNumber: {
        width: '5%',
        paddingLeft: 5
    },
    invoiceDatacontainer: {
        flexDirection: 'row'
    },
    invoiceTotalcontainer: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    invoiceDataTwentyFive: {
        width: '25%',
        paddingLeft: 5,
        borderRightWidth: 1
    },
    invoiceDataTwentyFiveLast: {
        width: '25%',
        paddingLeft: 5,
    },
    invoiceColumnDataTwentyFive: {
        width: '25%',
        paddingLeft: 5,
        borderRightWidth: 1,
        fontSize:8
    },
    invoiceDataFifty: {
        width: '50%',
        paddingBottom: 100,
        paddingLeft: 5,
        borderRightWidth: 1
    },
    invoiceDataFiftyLastContainer: {
        width: '50%',
        marginTop: 20,
        paddingLeft: 5,
        paddingRight: 5
    },
    invoiceDataFiftyLast: {
        width: '50%',
        paddingLeft: 5
    },
    invoiceDataFiftyLastRightAlign: {
        width: '50%',
        paddingRight: 20,
        textAlign: 'right'
    },
    totalAmountContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderTop: 1
    },
    invoiceDataFiftyLastCenterAlign: {
        textAlign: 'center'
    },
});


const POFormat = () => {
    const purchaseOrder = useSelector((state) => state.formActionReducer.poData);
    const rows = purchaseOrder.items.map((item, index) =>
        <View style={styles.invoiceInfocontainer} key={index}>
            <Text style={styles.smallColumn}>{index + 1}</Text>
            <Text style={styles.largeColumn}>{item.itemName.productName || ''}</Text>
            <Text style={styles.largeColumn}>{item.variant.variant || ''}</Text>
            <Text style={styles.smallColumn}>{item.variantValue.variantValue || ''}</Text>
            <Text style={styles.smallColumn}>{item.quantity || ''}</Text>
            <Text style={styles.smallColumn}>{Number(item.pricePerUnit).toFixed(2) || ''}</Text>
            <Text style={styles.smallColumn}>{item.gst || ''}</Text>
            <Text style={styles.smallColumnLast}>{Number(item.amount).toFixed(2) || ''}</Text>
        </View>
    )
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;
        return [day, month, year].join('-');
    }
    const blankRows = Array(20 - purchaseOrder.items.length).fill(0)
    const brows = blankRows.map((x, index) =>
        <View style={styles.invoiceInfocontainer} key={index}>
            <Text style={styles.smallColumn}> </Text>
            <Text style={styles.largeColumn}> </Text>
            <Text style={styles.largeColumn}> </Text>
            <Text style={styles.smallColumn}> </Text>
            <Text style={styles.smallColumn}> </Text>
            <Text style={styles.smallColumn}> </Text>
            <Text style={styles.smallColumn}> </Text>
            <Text style={styles.smallColumnLast}> </Text>
        </View>
    )
    return (
        <Fragment>
            <PDFViewer width="100%" height="100%" className="app" >
                <Document>
                    <Page size="A4" style={styles.page}>
                        {/* <Image style={styles.logo} src={logo} /> */}
                        <View style={styles.pageContainer}>
                            <View style={styles.brandContainer}>
                                <View style={styles.brandSubContainer}>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.brandTitle}>{"AV E-COMMERCE SOLUTIONS"}</Text>
                                    </View>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.brandInfo}>{"Block no: 8 Hashir Mansion \n Jafar Nagar Nagpur(M.H), Pin-440013"}</Text>
                                    </View>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.brandInfo}>{"Phone:+91 8408866664"}</Text>
                                    </View>
                                </View>
                                <View style={styles.brandSubContainer}>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.POTitle}>{"PURCHASE ORDER"}</Text>
                                    </View>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.POInfo}>Date: {formatDate(new Date)}</Text>
                                    </View>
                                    <View style={styles.invoiceDatacontainer}>
                                        <Text style={styles.POInfo}>PO No. {purchaseOrder.poNumber}</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.billToDetail}>VENDOR</Text>
                                    <Text style={styles.transportDetails}>SHIP TO</Text>
                                </View>
                                <View style={styles.invoiceInfocontainer}>
                                    <View style={styles.billToDetail}>
                                        <Text style={styles.invoiceTextStyle}>COMPANY NAME: {purchaseOrder.customerDetails.businessName}</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>EMAIL: {purchaseOrder.customerDetails.emailId}</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>ADDRESS: {purchaseOrder.customerDetails.billingAddress}</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>CITY: {purchaseOrder.customerDetails.city}</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>PHONE: {purchaseOrder.customerDetails.mobileNo}</Text>
                                    </View>
                                    <View style={styles.transportDetails}>
                                        <Text style={styles.invoiceTextStyle}>NAME: VENKAT RAO</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>COMPANY NAME: AV E-COMMERCE SOLUTIONS</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>ADDRESS: Block No8 Hashir Mansion, Jafar Nagar.</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>CITY: Nagpur-440013</Text>
                                        <br></br>
                                        <Text style={styles.invoiceTextStyle}>PHONE: +91 8408866664</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.POInfo}> </Text>
                                </View>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.invoiceDataTwentyFive}>Delivery Date</Text>
                                    <Text style={styles.invoiceDataTwentyFive}>Payment Terms</Text>
                                    <Text style={styles.invoiceDataTwentyFive}>Requested By</Text>
                                    <Text style={styles.invoiceDataTwentyFiveLast}>Department</Text>
                                </View>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.invoiceColumnDataTwentyFive}>{formatDate(purchaseOrder.deliveryDate)}</Text>
                                    <Text style={styles.invoiceColumnDataTwentyFive}>{purchaseOrder.paymentTerms}</Text>
                                    <Text style={styles.invoiceColumnDataTwentyFive}>{purchaseOrder.requestedBy}</Text>
                                    <Text style={styles.largeColumnLast}>{purchaseOrder.department}</Text>
                                </View>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.POInfo}> </Text>
                                </View>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <Text style={styles.smallColumn}>ITEM No.</Text>
                                    <Text style={styles.largeColumn}>DESCRIPTION</Text>
                                    <Text style={styles.largeColumn}>Variant</Text>
                                    <Text style={styles.smallColumn}>Variant Value</Text>
                                    <Text style={styles.smallColumn}>QTY</Text>
                                    <Text style={styles.smallColumn}>UNIT PRICE</Text>
                                    <Text style={styles.smallColumn}>GST</Text>
                                    <Text style={styles.smallColumnLast}>TOTAL</Text>
                                </View>
                                <Fragment>{rows}</Fragment>
                                <Fragment>{brows}</Fragment>
                            </View>
                            <View style={styles.invoiceInfoTableContainer}>
                                <View style={styles.invoiceInfocontainer}>
                                    <View style={styles.invoiceDataFifty}>
                                        <Text>Comment Or Special Instructions</Text>
                                        <Text style={styles.invoiceTextStyle}>{purchaseOrder.comments}</Text>
                                    </View>
                                    <View style={styles.invoiceDataFiftyLastContainer}>
                                        <View style={styles.invoiceInfoTableContainer}>
                                            <Text style={styles.invoiceDataFiftyLast}>SUB TOTAL:</Text>
                                            <Text style={styles.invoiceDataFiftyLastRightAlign}>{Number(purchaseOrder.subTotal).toFixed(2)}</Text>
                                        </View>
                                        <View style={styles.invoiceInfoTableContainer}>
                                            <Text style={styles.invoiceDataFiftyLast}>Tax:</Text>
                                            <Text style={styles.invoiceDataFiftyLastRightAlign}>{(Number(purchaseOrder.sgstTotal)+ Number(purchaseOrder.cgstTotal)).toFixed(2) }</Text>
                                        </View>
                                        <View style={styles.invoiceInfoTableContainer}>
                                            <Text style={styles.invoiceDataFiftyLast}>Shipping:</Text>
                                            <Text style={styles.invoiceDataFiftyLastRightAlign}>{Number(purchaseOrder.shippingCharge).toFixed(2) || 0}</Text>
                                        </View>
                                        <View style={styles.invoiceInfoTableContainer}>
                                            <Text style={styles.invoiceDataFiftyLast}>Other:</Text>
                                            <Text style={styles.invoiceDataFiftyLastRightAlign}>{purchaseOrder.otherCharges || 0}</Text>
                                        </View>
                                        <View style={styles.totalAmountContainer}>
                                            <Text style={styles.invoiceDataFiftyLast}>Total:</Text>
                                            <Text style={styles.invoiceDataFiftyLastRightAlign}>{Number(purchaseOrder.gstTotal).toFixed(2)}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <Text style={styles.invoiceDataFiftyLastCenterAlign}>{'\n If you have any questions about this purchase order, please contact \n Ph No- +91-8408866664 Email id - avecommercesolutions@gmail.com'}</Text>
                        </View>
                    </Page>
                </Document>
            </PDFViewer>
        </Fragment>
    )
}

export default POFormat;
import React, { useEffect, Fragment } from 'react';
import { PDFViewer, Text, View, StyleSheet, Page, Document, pdf } from '@react-pdf/renderer'
import { inWords } from 'utils'
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
        borderColor: '#000000',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        borderRightColor: '#000000',
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
        alignItems: 'center',
        borderBottomWidth: 1,
    },
    brandTitle: {
        color: '#000000',
        paddingTop: 3,
        fontWeight: 'bold',
        fontSize: 12
    },
    brandInfo: {
        color: '#000000',
        fontSize: 6,
        textTransform: 'uppercase',
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
        width: '40%',
        borderRightColor: "#000000",
        paddingLeft: 5,
        borderRightWidth: 1,
    },
    transportDetails: {
        width: '30%',
        borderRightColor: "#000000",
        paddingLeft: 5,
        borderRightWidth: 1,
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
    invoiceData: {
        width: '10%',
        paddingLeft: 5,
        borderRightWidth: 1
    },
    invoiceNumber: {
        width: '5%',
        paddingLeft: 5,
        borderRightWidth: 1
    },
    invoiceDataLast: {
        width: '10%',
        paddingLeft: 5
    },
    invoiceItemName: {
        width: '20%',
        paddingLeft: 5,
        borderRight: 1
    },
    invoiceItem: {
        width: '10%',
        paddingLeft: 5,
        borderRight: 1
    },
    invoiceItemNumber: {
        width: '5%',
        paddingLeft: 5,
        borderRight: 1
    },
    invoiceDatacontainer: {
        flexDirection: 'row'
    },
    invoiceDatacontainerRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
    },
    invoiceTotalcontainer: {
        flexDirection: 'row',
        borderBottomColor: '#000000',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },
    invoiceDataTwentyFive: {
        width: '25%',
        paddingLeft: 5
    },
    invoiceDataFifty: {
        width: '50%',
        paddingLeft: 5
    },
    borderRight: {
        borderRightWidth: 1
    },
    taxCalculationContainer: {
        width: "60%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    subTotalContainer: {
        width: "40%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderBottomWidth: 1
    },
    paddingLeft: {
        paddingLeft: "5"
    },
    totalAmountBorder: {
        flexDirection: 'row',
        borderTopWidth: 1
    },
    borderBottom: {
        borderBottomWidth: 1
    },
    textWordContainer: {
        width: "60%",
        flexWrap: 'wrap',
        alignItems: 'center',
        borderRightWidth: 1,
        borderBottomWidth: 1
    },
    textWordFullWidthTitle: {
        width: "100%",
        paddingLeft: 5
    },
    textWordFullWidth: {
        width: "100%",
        paddingLeft: 5,
        fontSize: 8

    },
    textWordFullWidthCenter: {
        width: "100%",
        paddingLeft: 5,
        fontSize: 8,
        textAlign: "center"

    },

    ////here
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 60
    },
    /////
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
    ////
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
    ////
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    headeramount: {
        width: '15%'
    },
    ////
    amount: {
        width: '15%',
    },
});


const InvoiceFormat = () => {
    const invoice = useSelector((state) => state.formActionReducer.payload);

    const sharePdf = async () => {
        const myPdf = pdf(Documents);
        // myPdf.updateContainer(Documents);
        const blob = await myPdf.toBlob();
        var file = new File([blob], "pdfname.pdf", { lastModified: (new Date()).getTime() });
        console.log('[file]' + file);
    }
    return (
        <Fragment>
            {/* <Button onClick={() => sharePdf()}>Share</Button> */}
            <PDFViewer width="100%" height="100%" className="app" >
                <Documents invoice={invoice}></Documents>
            </PDFViewer>
        </Fragment>
    )
}

const Documents = ({ invoice }) => {
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
    const rows = invoice.items.map((item, index) =>
        <View style={styles.invoiceDatacontainerRow} key={index}>
            <Text style={styles.invoiceItemNumber}>{index + 1}</Text>
            <Text style={styles.invoiceItemName}>{item.itemName}</Text>
            <Text style={styles.invoiceItem}>{item.hsn || ''}</Text>
            <Text style={styles.invoiceItem}>{item.quantity || ''}</Text>
            <Text style={styles.invoiceItemNumber}>{item.unit || ''}</Text>
            <Text style={styles.invoiceItem}>{Number(item.pricePerUnit).toFixed(2) || ''}</Text>
            <Text style={styles.invoiceItem}>{Number(item.amount).toFixed(2) || ''}</Text>
            <Text style={styles.invoiceItem}>{Number(item.CGST).toFixed(2) || ''}</Text>
            <Text style={styles.invoiceItem}>{Number(item.SGST).toFixed(2) || ''}</Text>
            <Text style={styles.invoiceDataLast}>{Number(item.amountWithGst).toFixed(2) || ''}</Text>
        </View>
    )

    const blankRows = Array(20 - invoice.items.length).fill(0)
    const brows = blankRows.map((x, index) =>
        <View style={styles.invoiceDatacontainerRow} key={index}>
            <Text style={styles.invoiceItemNumber}>{' '}</Text>
            <Text style={styles.invoiceItemName}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceItemNumber}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceItem}></Text>
            <Text style={styles.invoiceDataLast}></Text>
        </View>
    )
    return <Document>
        <Page size="A4" style={styles.page}>
            {/* <Image style={styles.logo} src={logo} /> */}
            <View style={styles.pageContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>{"Tax Invoice"}</Text>
                </View>
                <View style={styles.brandContainer}>
                    <Text style={styles.brandTitle}>{"AV E-COMMERCE SOLUTIONS"}</Text>
                    <Text style={styles.brandInfo}>{"Block no: 8 Hashir Mansion, Jafar Nagar Nagpur(M.H), Pin-440013"}</Text>
                    <Text style={styles.brandInfo}>{"Phone:8408866664, 8087233970  Email:avecommercesolutions@gmail.com"}</Text>
                    <Text style={styles.brandInfo}>{"GSTIN: 27ABSFA6948G1ZV , State : 27-Maharashtra"}</Text>
                </View>
                <View style={styles.invoiceInfoTableContainer}>
                    <View style={styles.invoiceInfocontainer}>
                        <Text style={styles.billToDetail}>Bill To:</Text>
                        <Text style={styles.transportDetails}>Transportation Details:</Text>
                        <Text style={styles.invoiceDetails}></Text>
                    </View>
                    <View style={styles.invoiceInfocontainer}>
                        <View style={styles.billToDetail}>
                            <Text style={styles.invoiceTextStyle}>{invoice.customerDetails.businessName}</Text>
                            <br></br>
                            <Text style={styles.invoiceTextStyle}>GSTIN:{invoice.customerDetails.gst}</Text>
                            <br></br>
                            <Text style={styles.invoiceTextStyle}>State:{invoice.state}</Text>
                        </View>
                        <View style={styles.transportDetails}>
                            <Text style={styles.invoiceTextStyle}>Transport Name:{invoice.transportName}</Text>
                            <br></br>
                            <Text style={styles.invoiceTextStyle}>Delivery Location:{invoice.deliveryLocation}</Text>
                        </View>
                        <View style={styles.invoiceDetails}>
                            <Text style={styles.invoiceTextStyle}>Place of supply:{invoice.state}</Text>
                            <br></br>
                            <Text style={styles.invoiceTextStyle}>Invoice No.:{invoice.invoiceNumber}</Text>
                            <br></br>
                            <Text style={styles.invoiceTextStyle}>Date:{formatDate(invoice.fromdate)} TO {formatDate(invoice.tillDate)}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.invoiceDataTable}>
                    <View style={styles.invoiceInfocontainer}>
                        <Text style={styles.invoiceNumber}>#</Text>
                        <Text style={styles.invoiceDataName}>Item Name:</Text>
                        <Text style={styles.invoiceData}>HSN</Text>
                        <Text style={styles.invoiceData}>Quantity</Text>
                        <Text style={styles.invoiceNumber}>Unit</Text>
                        <Text style={styles.invoiceData}>price/Unit</Text>
                        <Text style={styles.invoiceData}>Taxable Amount</Text>
                        <Text style={styles.invoiceData}>CGST</Text>
                        <Text style={styles.invoiceData}>SGST</Text>
                        <Text style={styles.invoiceDataLast}>Amount</Text>
                    </View>
                    <Fragment>{rows}</Fragment>
                    <Fragment>{brows}</Fragment>
                </View>
                <View style={styles.invoiceDataTable}>
                    <View style={styles.invoiceTotalcontainer}>
                        <Text style={styles.invoiceNumber}></Text>
                        <Text style={styles.invoiceDataName}>Total:</Text>
                        <Text style={styles.invoiceData}></Text>
                        <Text style={styles.invoiceData}>{invoice.items.length}</Text>
                        <Text style={styles.invoiceNumber}></Text>
                        <Text style={styles.invoiceData}></Text>
                        <Text style={styles.invoiceData}>RS {Number(invoice.subTotal).toFixed(2)}</Text>
                        <Text style={styles.invoiceData}>{Number(invoice.sgstTotal).toFixed(2)}</Text>
                        <Text style={styles.invoiceData}>{Number(invoice.cgstTotal).toFixed(2)}</Text>
                        <Text style={styles.invoiceDataLast}>{Number(invoice.gstTotal).toFixed(2)}</Text>
                    </View>
                </View>
                <View style={styles.invoiceInfoTableContainer}>
                    <View style={styles.taxCalculationContainer}>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataTwentyFive}>Tax</Text>
                            <Text style={styles.invoiceDataTwentyFive}>Taxable Amount</Text>
                            <Text style={styles.invoiceDataTwentyFive}>Rate</Text>
                            <Text style={styles.invoiceDataTwentyFive}>Tax Amount</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataTwentyFive}>SGST</Text>
                            <Text style={styles.invoiceDataTwentyFive}>{Number(invoice.subTotal).toFixed(2)}</Text>
                            <Text style={styles.invoiceDataTwentyFive}>9.00%</Text>
                            <Text style={styles.invoiceDataTwentyFive}>{Number(invoice.sgstTotal).toFixed(2)}</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataTwentyFive}>CGST</Text>
                            <Text style={styles.invoiceDataTwentyFive}>{Number(invoice.subTotal).toFixed(2)}</Text>
                            <Text style={styles.invoiceDataTwentyFive}>9.00%</Text>
                            <Text style={styles.invoiceDataTwentyFive}>{Number(invoice.cgstTotal).toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.subTotalContainer}>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataTwentyFive}>Amount</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataFifty}>Sub Total:</Text>
                            <Text style={styles.invoiceDataFifty}>{Number(invoice.gstTotal).toFixed(2)}</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.invoiceDataFifty}>Round Off:</Text>
                            <Text style={styles.invoiceDataFifty}>{invoice.roundOff || 0}</Text>
                        </View>
                        <View style={styles.totalAmountBorder}>
                            <Text style={styles.invoiceDataFifty}>Total:</Text>
                            <Text style={styles.invoiceDataFifty}>{Number(invoice.gstTotal).toFixed(2) || 0}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.invoiceInfoTableContainer}>
                    <View style={styles.textWordContainer}>
                        <Text style={styles.reportTitle}>Invoice Amount in Words</Text>
                        <br></br>
                        <Text>{inWords(invoice.gstTotal)}</Text>
                    </View>
                    <View style={styles.subTotalContainer}>
                    </View>
                </View>
                <View style={styles.invoiceInfoTableContainer}>
                    <View style={styles.taxCalculationContainer}>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidthTitle}>Terms and Conditions:</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>1-      Payment within 7 days of billing</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>2-      Interest @24% p.a if late payment</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>3-      Not responsible for any liablity arising out of material supplied.</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidthTitle}>Bank Details:</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>Bank Account No: 4445380604</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>Bank IFSC code: KKBK0001844</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}>Account Holder Name: 27ABSFA6948G1ZV</Text>
                        </View>
                    </View>
                    <View style={styles.subTotalContainer}>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidthCenter}>For, AV E-Commerce Solutions. LLP</Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidth}> </Text>
                        </View>
                        <View style={styles.invoiceDatacontainer}>
                            <Text style={styles.textWordFullWidthCenter}>Authorized Signatory</Text>
                        </View>
                    </View>
                </View>
            </View>
            {/* <InvoiceThankYouMsg /> */}
        </Page>
    </Document>

}

export default InvoiceFormat;
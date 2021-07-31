import React from "react";
import { Document, Page, Text, StyleSheet } from "@react-pdf/renderer";
import {
  Table,
  TableBody,
  TableHeader,
  TableCell,
  DataTableCell,
} from "@david.kucsai/react-pdf-table";
import numeral from "numeral";

const Invoice = ({ order }) => {
  return (
    <Document>
      <Page style={styles.body}>
        <Text style={styles.header} fixed>
          {new Date().toLocaleString()}
        </Text>
        <Text style={styles.title}>Order Invoice</Text>
        <Text style={styles.author}>DAILY DEALS</Text>
        <Text style={styles.subtitle}>Order Summary</Text>

        <Table>
          <TableHeader>
            <TableCell style={styles.table}>Item</TableCell>
            <TableCell style={styles.table}>Brand</TableCell>
            <TableCell style={styles.table}>Color</TableCell>
            <TableCell style={styles.table}>Quantity</TableCell>
            <TableCell style={styles.table}>Price</TableCell>
            <TableCell style={styles.table}>Total</TableCell>
          </TableHeader>
        </Table>

        <Table data={order?.products}>
          <TableBody>
            <DataTableCell
              style={styles.table}
              getContent={(x) => x.product.title}
            />
            <DataTableCell
              style={styles.table}
              getContent={(x) => x.product.brand}
            />
            <DataTableCell
              style={styles.table}
              getContent={(x) => x.product.color}
            />
            <DataTableCell style={styles.table} getContent={(x) => x.count} />
            <DataTableCell
              style={styles.table}
              getContent={(x) => `${numeral(x.product.price).format("0,0")}`}
            />
            <DataTableCell
              style={styles.table}
              getContent={(x) =>
                `${numeral(x.product.price * x.count).format("0,0")}`
              }
            />
          </TableBody>
        </Table>

        <Text style={styles.text}>
          <Text>
            Date : {"  "}
            {new Date(order.paymentIntent.created * 1000).toLocaleString()}
            {"\n"}
          </Text>
          <Text>
            Order Id : {"  "}
            {order.paymentIntent.id}
            {"\n"}
          </Text>
          <Text>
            Order Status : {"  "}
            {order.orderStatus}
            {"\n"}
          </Text>
          <Text>
            Amount Payable : {"  "}
            {numeral(order.paymentIntent.amount / 100).format("0,0")}
          </Text>
        </Text>

        <Text style={styles.footer}>~ Thank You For Shopping with us~</Text>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
  },
  table: {
    textAlign: "center",
  },
  author: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 12,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: "justify",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  footer: {
    padding: "100px",
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
});

export default Invoice;

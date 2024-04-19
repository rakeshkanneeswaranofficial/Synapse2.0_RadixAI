import React from 'react';
import { Text, Page, Document, StyleSheet, Image, View } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
    body: {
        paddingTop: 50,
        paddingBottom: 50,
        paddingHorizontal: 50,
        fontFamily: 'Helvetica',
        fontSize: 12,
    },
    header: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    section: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
        textTransform: "uppercase",
    },
    text: {
        marginBottom: 10,
        lineHeight: 1.5,
        color: "#666",
    },
    image: {
        width: 300,
        height: 200,
        alignSelf: "center",
        borderRadius: 8,
        marginBottom: 20,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    contactInfo: {
        fontSize: 10,
        textAlign: "center",
        color: "#666",
        marginTop: 30,
    },
    separator: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
});

// PDFile component
const PDFile = ({ title, findings, base64Data }: { title: string, findings: string, base64Data: any}) => (
    <Document>
        <Page style={styles.body} size="A4">
            {/* Header */}
            <Text style={styles.header}>
                XYZ Imaging and Diagnostic Center
            </Text>

            {/* Patient Information */}
            <View style={styles.section}>
                <Text style={styles.text}>
                    Patient Name: Rakesh Kanneeswaran
                </Text>
                <Text style={styles.text}>
                    Patient Address: 123 Fake St, City, State, ZIP
                </Text>
                <Text style={styles.text}>
                    Patient Phone: (123) 456-7890
                </Text>
                <Text style={styles.text}>
                    Patient Email: info@example.com
                </Text>
                <Text style={styles.text}>
                    Patient ID: 3454568XX
                </Text>
            </View>

            {/* Separator */}
            <View style={styles.separator} />

            {/* Diagnosis Result */}
            <Text style={styles.title}>
                Diagnosis Result
            </Text>

            {/* Findings */}
            <Text style={styles.text}>
                {findings}
            </Text>

            {/* Image */}
            <Image src={`data:image/jpeg;base64,${base64Data}`} style={styles.image} />
           

            {/* Page Number */}
            <Text style={styles.contactInfo} render={({ pageNumber, totalPages }) => `Page ${pageNumber} of ${totalPages}`} />
        </Page>
    </Document>
);

export default PDFile;

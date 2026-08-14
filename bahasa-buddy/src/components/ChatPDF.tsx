import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";

interface ChatPDFProps {
  html: string;
  dateTime: string;
}

function ChatPDF({ html, dateTime }: ChatPDFProps) {
  const pageStyles = StyleSheet.create({
    page: {
      backgroundColor: "white",
      padding: 40,
    },

    header: {
      alignItems: "center",
      marginBottom: 15,
    },

    title: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 4,
    },

    date: {
      fontSize: 9,
      marginBottom: 3,
    },

    exportText: {
      fontSize: 9,
    },

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      marginBottom: 15,
    },
  });

  return (
    <Document>
      <Page size="A4" style={pageStyles.page}>

        {/* Header */}
        <View style={pageStyles.header}>
          <Text style={pageStyles.title}>
            BahasaBuddy
          </Text>

          <Text style={pageStyles.date}>
            {dateTime}
          </Text>

          <Text style={pageStyles.exportText}>
            Export
          </Text>
        </View>

        {/* Divider */}
        <View style={pageStyles.divider} />

        {/* Chat */}
        <Html >
          {html}
        </Html>

      </Page>
    </Document>
  );
}

export default ChatPDF;
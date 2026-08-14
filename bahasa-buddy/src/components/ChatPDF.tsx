import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import Html from "react-pdf-html";
import type { MessageData } from "../types/Message";

interface ChatPDFProps {
  messages: MessageData[];
  dateTime: string;
}

function markdownToHTML(markdown: string): string {
    let html = markdown;

    // Convert \n to newline in string first
    html = html.replace(/\\n/g, "\n");

    // convert heading and bold text to bold text
    html = html.replace(/^#+ (.*)$/gm, "<strong>$1</strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Convert list items to <li> elements
    html = html.replace(/^\s*-\s+(.*)$/gm, "<li>$1</li>");

    // Convert newline in string to <br> for HTML rendering
    html = html.replace(/\n/g, "<br>");

    return html;
}

function messageToHTML(messages: MessageData[]): string {
    const htmlMessages = messages.map((message) => `<tr><td><strong>${message.sender}</strong></td> <td>${markdownToHTML(message.message)}</td></tr>`).join("");
    return htmlMessages;
}

function ChatPDF({ messages, dateTime }: ChatPDFProps) {
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

    divider: {
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      marginBottom: 15,
    },
  });

  const html = '<style>' +
                'table {width: 100%;}' + 
                'td {padding-bottom: 10px; font-size: 12px;}' + 
                'td:first-child {width: 20px;} </style>' + 
                '<body><table>' + messageToHTML(messages) + 
                '</table></body>';

  //console.log("HTML for PDF:", html);
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
        </View>

        {/* Divider */}
        <View style={pageStyles.divider} />

        {/* Chat */}
        <Html>
          {html}
        </Html>

      </Page>
    </Document>
  );
}

export default ChatPDF;
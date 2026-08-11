const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.post("/api/chat", async (req, res) => {
  const { message, mode } = req.body;

  // Debugging
  console.log("User:", message);
  console.log("Mode:", mode);

  let prompt;

  if (mode === "in-to-en") {
    prompt = `
Translate the Indonesian input into English.

Return ONLY the following Markdown structure:

## Translation

[English translation]

## Word-per-word usage explanation

- **word**: explanation
- **word**: explanation
- **word**: explanation

## Overall explanation

[Explanation of the complete sentence]

Rules:
- Use actual line breaks between sections.
- Use - for every word-per-word item.
- Use **word** to bold Indonesian words.
- Do not put a backslash before Markdown characters.
- Do not put all sections on one line.
- Do not add any other sections.

Indonesian input:
${message}
`;
  } else if (mode === "en-to-in") {
    prompt = `
Translate the English input into Indonesian.

Return ONLY the following Markdown structure:

## Translation

[Indonesian translation]

## Formal

[Formal Indonesian version]

## Informal

[Informal Indonesian version]

Rules:
- Use actual line breaks between sections.
- Keep each version concise.
- Do not provide extensive explanations.
- Do not add any other sections.

English input:
${message}
`;
  } else {
    return res.status(400).json({
      message: "Invalid chat mode.",
    });
  }

  try {
    const interaction = await ai.interactions.create({
      model: "gemini-3.6-flash",
      input: prompt,
    });

    console.log("Gemini response:", interaction.output_text);

    res.json({
      message: interaction.output_text,
    });

  } catch (error) {
    console.error("Gemini error:", error);

    res.status(500).json({
      message: "Sorry, something went wrong.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
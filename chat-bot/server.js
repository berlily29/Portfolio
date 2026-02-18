require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const pdfParse = require("pdf-parse");

const app = express();
app.use(cors());
app.use(express.json());

const pdfUrl = "https://berlily29.github.io/Portfolio/profiles/Luise_Gian_Yambao_Resume_2026.pdf";

// Option 1: Fetch PDF on every request (simpler, works)
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Fetch the PDF from URL
    const pdfResponse = await axios.get(pdfUrl, { responseType: "arraybuffer" });
    const pdfBuffer = Buffer.from(pdfResponse.data, "binary");
    const pdfData = await pdfParse(pdfBuffer);
    const resumeText = pdfData.text;

    // Send to Groq
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: `You are the AI assistant of Luise Gian Yambao.
Answer professionally and briefly.
Use the following resume and portfolio information to answer questions:
- Luise's Strengths:
 ~ Collaborative Team Player, Strong Communication Skills, Strong Communication Skills, Adaptability, Problem-Solving
- Luise's Girlfriend: Keanna
- Luise's Favorite Sports: VolleyBall
- Luise's Favorite Movie: About Time
- refer to the Portfolio link for more information: https://berlily29.github.io/Portfolio/ the linkedIn and github links are there too.
${resumeText}`
          },
          {
            role: "user",
            content: userMessage
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Error processing request" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

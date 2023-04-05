require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const cors = require("cors");
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors());
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

app.post("/post", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: req.body.message,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ message: response.data.choices[0].text });
});

app.post("/image", async (req, res) => {
  console.log(req.body.message);
  const response = await openai.createImage({
    prompt: req.body.message,
    n: 2,
    size: "1024x1024",
  });
  res.status(200).json({ message: response.data.data });
});

app.listen(5000, () => {
  console.log("server running successful");
});

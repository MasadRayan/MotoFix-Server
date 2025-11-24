const { generateResponse } = require("../services/chatbot.service");

async function handleChatbotRequest(req, res) {
    const { question } = req.body;

    if (!question) {
        return res.status(400).send({ message: "Question is required" });
    }

    const response = await generateResponse(question);
    res.send({ response });
}

module.exports = { handleChatbotRequest };
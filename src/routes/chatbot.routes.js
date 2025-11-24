const {handleChatbotRequest} = require('../services/chatbot.service');

const express = require('express');
const router = express.Router();

router.post('/', handleChatbotRequest);

module.exports = router
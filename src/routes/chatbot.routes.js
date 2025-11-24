const {handleChatbotRequest} = require('../controllers/chatbot.controller');

const express = require('express');
const router = express.Router();

router.post('/', handleChatbotRequest);

module.exports = router
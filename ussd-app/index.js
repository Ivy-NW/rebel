const express = require('express');
const bodyParser = require('body-parser');
const AfricaTalking = require('africastalking');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const dotenv = require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002;

// Middleware for parsing request body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Your Africa's Talking credentials
const username = 'airtimeapi';  // Replace with your Africa's Talking username
const apiKey = 'atsk_efb82e072ca7320d5d5544d521556c4fb259904436ba40aa9dd914b3a4bf3131b9a7535c';  // Replace with your Africa's Talking API key

// Initialize Africa's Talking SDK
const africastalking = AfricaTalking({
  username: username,
  apiKey: apiKey
});

// Get the SMS service
const sms = africastalking.SMS;

// Function to send SMS
const sendSMS = (to, message) => {
  const options = {
    to: [to],
    message: message,
  };

  sms.send(options)
    .then(response => {
      console.log('SMS sent successfully:', response);
    })
    .catch(error => {
      console.error('Error sending SMS:', error);
    });
};

// Initialize Google Generative AI
const MODEL_NAME = "gemini-pro";
const API_KEY = "AIzaSyBKUgLex4W15CzZYiHFXF2Z5QvW-jJsDZQ";

const genAI = new GoogleGenerativeAI(API_KEY);

async function getGeminiResponse(userInput) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    // Define safety settings if needed
  ];

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [{ text: userInput }],
      },
    ],
  });

  try {
    const result = await chat.sendMessage(userInput);
    return result.response.text();
  } catch (error) {
    console.error('Error getting Gemini response:', error);
    return 'Sorry, I encountered an error while processing your request.';
  }
}

// Endpoint for handling USSD requests
app.post('/ussd', async (req, res) => {
  try {
    const { sessionId, serviceCode, phoneNumber, text } = req.body;

    // Log the request for debugging
    console.log(`Session ID: ${sessionId}`);
    console.log(`Service Code: ${serviceCode}`);
    console.log(`Phone Number: ${phoneNumber}`);
    console.log(`Text: ${text}`);

    // Process the USSD request
    let response = '';

    if (text === '') {
      // The user has just initiated the USSD session
      response = 'CON Welcome to Financial Services\n1. Financial Advice\n2. Finance Chatbot';
    } else if (text === '1') {
      // User selected Financial Advice
      response = 'CON Financial Advice\n1. Savings Tips\n2. Investment Advice\n3. Debt Management';
    } else if (text === '2') {
      // User selected Finance Chatbot
      response = 'CON Welcome to Finance Chatbot. Please enter your question below.';
    } else if (text === '1*1') {
      // User selected Savings Tips
      response = 'END Here are some savings tips:\n- Pay yourself first\n- Cut down on unnecessary expenses\n- Set savings goals';
      sendSMS(phoneNumber, 'Here are some savings tips:\n- Pay yourself first\n- Cut down on unnecessary expenses\n- Set savings goals');
    } else if (text === '1*2') {
      // User selected Investment Advice
      response = 'END Investment advice:\n- Diversify your investments\n- Consider both short-term and long-term investments\n- Do thorough research before investing';
      sendSMS(phoneNumber, 'Investment advice:\n- Diversify your investments\n- Consider both short-term and long-term investments\n- Do thorough research before investing');
    } else if (text === '1*3') {
      // User selected Debt Management
      response = 'END Debt management tips:\n- Prioritize paying off high-interest debt\n- Create a budget to manage your expenses\n- Avoid taking on new debt';
      sendSMS(phoneNumber, 'Debt management tips:\n- Prioritize paying off high-interest debt\n- Create a budget to manage your expenses\n- Avoid taking on new debt');
    } else if (text.startsWith('2*')) {
      // Handle user input after selecting Finance Chatbot
      if (text === '2') {
        // This should prompt the user to enter their question
        response = 'CON Please enter your question and submit it.';
      } else if (text.startsWith('2*')) {
        // Process the user input as a question for the Finance Chatbot
        const userQuestion = text.substring(2); // Remove the prefix '2*'
        const answer = await getGeminiResponse(userQuestion);
        response = `END ${answer}`;
        sendSMS(phoneNumber, answer);
      }
    } else if (text === '2*2') {
      // User selected Exit from Finance Chatbot
      response = 'END Thank you for using Finance Chatbot. Have a great day!';
    } else {
      response = 'END Invalid option. Please try again.';
    }

    res.send(response);
  } catch (error) {
    // Log any errors
    console.error('Error processing USSD request:', error);
    res.status(500).send('Error processing request');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

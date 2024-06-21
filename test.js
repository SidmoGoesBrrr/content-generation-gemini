const axios = require('axios');

// Replace with your actual API key
const apiKey = 'AIzaSyCc67S9A_QPx-XtKJldCk87zCKJk24EaVI';

// Function to test the Gemini API
async function testGeminiApi() {
  const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  const prompt = 'Write a blog on the importance of grassroots level initiatives in promoting sustainable development.';

  try {
    const response = await axios.post(
      url,
      {
        prompt: prompt,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    console.log('Response from Gemini API:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error response from Gemini API:', error.response.data);
    } else {
      console.error('Error making request to Gemini API:', error.message);
    }
  }
}

testGeminiApi();

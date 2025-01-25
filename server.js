const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
// https://computeraidedautomation.com/infusions/articles/articles.php?article_id=193
// Your WhatsApp API credentials
const ACCESS_TOKEN = 'YOUR_ACCESS_TOKEN';
const PHONE_ID = 'YOUR_PHONE_NUMBER_ID';
const API_URL = `https://graph.facebook.com/v17.0/${PHONE_ID}/messages`;

app.post('/send-message', async (req, res) => {
    const { phone, message } = req.body;

    try {
        const response = await axios.post(
            API_URL,
            {
                messaging_product: 'whatsapp',
                to: phone,
                type: 'text',
                text: { body: message },
            },
            {
                headers: {
                    'Authorization': `Bearer ${ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(200).json({ success: true, response: response.data });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on port 3000'));

const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/:apiType/*', async (req, res) => {
    const { apiType } = req.params;
    const path = req.params[0];
    const queryString = req.url.split('?')[1] || "";
    
    const domains = {
        catalog: 'catalog.roblox.com',
        games: 'games.roblox.com',
        apis: 'apis.roblox.com'
    };

    const targetUrl = `https://${domains[apiType]}/${path}${queryString ? '?' + queryString : ''}`;

    try {
        const response = await axios.get(targetUrl, {
            headers: { 'User-Agent': 'RobloxProxy/1.0' }
        });
        res.status(200).json(response.data);
    } catch (error) {
        console.error("Roblox API Error:", error.response?.data || error.message);
        res.status(error.response?.status || 500).send(error.response?.data || error.message);
    }
});

app.listen(PORT, () => console.log(`Proxy online`));

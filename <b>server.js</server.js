const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/bundles', async (req, res) => {
    const assetId = req.query.assetId;
    if (!assetId) {
        return res.status(400).json({ error: 'Missing assetId' });
    }

    try {
        const response = await fetch(
            `https://catalog.roblox.com/v1/assets/${assetId}/bundles`
        );
        const data = await response.json();
        res.json({ result: 'success', data: data });
    } catch (err) {
        res.status(500).json({ result: 'error', error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));

export default async function handler(req, res) {
    const symbol = req.query.symbol?.toUpperCase();

    if (!symbol) {
        return res.status(400).json({ error: 'Please provide a symbol, e.g., BTCUSDT' });
    }

    if (!/^[A-Z0-9]{6,12}$/.test(symbol)) {
        return res.status(400).json({ error: 'Invalid symbol format' });
    }

    try {
        const url = `https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`;
        console.log("Fetching URL:", url);  // 🔍 Debug

        const response = await fetch(url);
        console.log("Binance Status:", response.status); // 🔍 Debug

        if (!response.ok) {
            const errorText = await response.text(); // Read the error message from Binance
            return res.status(500).json({ error: 'Error fetching data from Binance', binanceMessage: errorText });
        }

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}


//### TO TEST ON LOCAL MACHINE
// Install Vercel CLI (if you haven’t already):

// npm install -g vercel

// cd C:/xampp/htdocs/trading/binance_api

// vercel dev

// http://localhost:3000/api/price?symbol=BTCUSDT


// ##
// ##
// ##
//## TO DEPLOY TO VERCEL PRODUCTION
// Install Vercel CLI (if you haven’t already):

// npm install -g vercel

// cd C:/xampp/htdocs/trading/binance_api

// vercel

// https://binance-price-api-ashen.vercel.app/api/price?symbol=BTCUSDT
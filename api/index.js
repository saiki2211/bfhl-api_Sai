export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // Health check endpoint
    if (req.method === 'GET') {
        res.status(200).json({
            message: "BFHL API is running on Vercel",
            endpoint: "POST /api/bfhl",
            status: "healthy",
            user: "sai_kiran_t_v"
        });
        return;
    }

    // Method not allowed for other methods
    res.status(405).json({
        is_success: false,
        message: "Method not allowed"
    });
}

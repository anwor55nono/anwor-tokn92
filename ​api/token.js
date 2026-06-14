const { AccessToken } = require('livekit-server-sdk');

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { room, identity, username } = req.query;

    if (!room || !identity) {
        return res.status(400).json({ error: 'Missing room or identity parameters' });
    }

    const apiKey = "APIm8MdyKUaeTGy";
    const apiSecret = "NHGqyePb4JzRu6YmmNkRm69YT5nq0Kvfc0eMyz8LBxfD";

    try {
        const at = new AccessToken(apiKey, apiSecret, {
            identity: identity,
            name: username || 'عضو',
            ttl: '24h'
        });

        at.addGrant({
            roomJoin: true,
            room: room,
            canPublish: true,
            canSubscribe: true,
            video: false,
            audio: true
        });

        const token = await at.toJwt();
        return res.status(200).json({ token });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

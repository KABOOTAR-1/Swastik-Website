// ImageKit Authentication Endpoint
// This endpoint is required for secure image uploads
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: "public_Ov6emI8Heo9zwhCL3fisp5zmMk8=",
  privateKey: "private_9g8G+/Inx2/KGc15ZwB6s62sHhA=",
  urlEndpoint: "https://ik.imagekit.io/iqspecenu"
});

export default function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
  } catch (error) {
    console.error('ImageKit auth error:', error);
    res.status(500).json({ error: 'Failed to generate authentication parameters' });
  }
}


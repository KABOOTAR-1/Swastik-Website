// ImageKit Configuration
// Using environment variables for security
export const imagekitConfig = {
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
    transformationPosition: "path",
    // Note: privateKey should ONLY be used server-side (API routes)
    // Never expose it in client-side code
};

// Default transformation for product images
export const productImageTransformations = [
    {
        height: "600",
        width: "800",
        quality: "80",
        format: "auto", // Auto-select best format (WebP for modern browsers)
    }
];

// Thumbnail transformations
export const thumbnailTransformations = [
    {
        height: "300",
        width: "400",
        quality: "75",
        format: "auto",
    }
];

// High quality transformations for detail page
export const detailImageTransformations = [
    {
        height: "900",
        width: "1200",
        quality: "85",
        format: "auto",
    }
];


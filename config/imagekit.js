// ImageKit Configuration
export const imagekitConfig = {
    publicKey: "public_Ov6emI8Heo9zwhCL3fisp5zmMk8=",
    urlEndpoint: "https://ik.imagekit.io/iqspecenu",
    transformationPosition: "path",
    // For server-side operations (upload)
    privateKey: "private_9g8G+/Inx2/KGc15ZwB6s62sHhA=",
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


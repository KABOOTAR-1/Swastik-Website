import React from 'react';
import { IKImage } from 'imagekitio-react';

/**
 * Optimized Image Component using ImageKit
 * Automatically applies transformations for performance
 */
const ImageKitImage = ({
  src,
  alt,
  transformation = [],
  style = {},
  onLoad,
  onError,
  loading = "lazy",
  className = ""
}) => {
  // Check if src is a full URL (from ImgBB) or ImageKit path
  const isImageKitPath = src && !src.startsWith('http');
  const isImageKitUrl = src && src.includes('imagekit.io');

  // If it's a regular URL (ImgBB), use regular img tag
  if (src && !isImageKitPath && !isImageKitUrl) {
    return (
      <img
        src={src}
        alt={alt}
        style={style}
        className={className}
        loading={loading}
        onLoad={onLoad}
        onError={onError}
      />
    );
  }

  // Extract path from ImageKit URL if needed
  let path = src;
  if (isImageKitUrl) {
    try {
      const url = new URL(src);
      // Remove the account identifier from the path
      // Example: /iqspecenu/products/image.jpg -> /products/image.jpg
      const fullPath = url.pathname;
      const parts = fullPath.split('/');
      // Remove empty first element and account name (iqspecenu)
      if (parts.length > 2 && parts[1] === 'iqspecenu') {
        path = '/' + parts.slice(2).join('/');
      } else {
        path = fullPath;
      }

      console.log(`[ImageKitImage] Extracted path: ${path} from ${src}`);
    } catch (e) {
      console.error('Failed to parse ImageKit URL:', e);
    }
  }

  // Default transformations for web performance
  const defaultTransformations = [
    {
      format: 'auto', // Auto-select best format (WebP for modern browsers)
      quality: '80',
      'cache-control': 'max-age=31536000', // Cache for 1 year at browser level
      ...transformation[0] // Merge with custom transformations
    }
  ];

  return (
    <IKImage
      path={path}
      transformation={transformation.length > 0 ? transformation : defaultTransformations}
      alt={alt}
      style={style}
      className={className}
      loading={loading}
      onLoad={onLoad}
      onError={onError}
    />
  );
};

export default ImageKitImage;


import React, { useState } from 'react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ src, fallbackSrc, alt, className, ...props }) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      // Si l'image locale plante, on met le fallback (Unsplash) ou une image par défaut
      setImgSrc(fallbackSrc || "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1000");
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={`${className} transition-opacity duration-500 ${hasError ? 'opacity-90 grayscale-[10%]' : 'opacity-100'}`}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback;
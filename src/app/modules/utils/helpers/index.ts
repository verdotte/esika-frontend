/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import placeholderImg from 'app/static/images/placeholder.jpg';

export const onImageError = (
  event: any,
  fallbackSrc = placeholderImg,
) => {
  event.target.onerror = null;
  event.target.src = fallbackSrc;
};

import type { DimensionsOptions } from "../types.ts";

/**
 * Get dimensions for resizing an image
 * @param options - options for resize
 * - for landscape, width has priority
 * - for portrait, height has priority
 */
export function getDimensions(
  options: DimensionsOptions,
): { targetWidth: number; targetHeight: number } {
  const {
    originalWidth,
    originalHeight,
    width,
    height,
    aspectRatio = true,
  } = options || {};

  // Don't keep aspect ratio
  if (!aspectRatio) {
    return {
      targetWidth: width || originalWidth,
      targetHeight: height || originalHeight,
    };
  }

  // Keep aspect ratio
  const _aspectRatio = originalWidth / originalHeight;
  let targetWidth;
  let targetHeight;

  if (_aspectRatio > 1) { // landscape
    if (width) {
      targetWidth = width;
      targetHeight = Math.trunc(width / _aspectRatio);
    } else if (!width && height) {
      targetWidth = Math.trunc(height * _aspectRatio);
      targetHeight = height;
    } else {
      targetWidth = 100;
      targetHeight = Math.trunc(100 / _aspectRatio);
    }
  } else { //portrait
    if (height) {
      targetWidth = Math.trunc(height * _aspectRatio);
      targetHeight = height;
    } else if (width && !height) {
      targetWidth = width;
      targetHeight = Math.trunc(width / _aspectRatio);
    } else {
      targetWidth = Math.trunc(100 * _aspectRatio);
      targetHeight = 100;
    }
  }

  return { targetWidth, targetHeight };
}
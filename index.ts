import { Resize } from "./lib/resize/resize.js";
import { decodeJPG, encodeJPG, Image as ImageJPG } from "./deps.ts";
import {
  decode as decodePNG,
  encode as encodePNG,
} from "./lib/decoders/fast-png/index.ts";
import { IImageData as ImagePNG } from "./lib/decoders/fast-png/types.ts";
import { mimeType } from "./mime-type.ts";
import { getDimensions } from './lib/utils.ts';
import type { ResizeOptions } from "./types.ts";

/**
 * Resize image. JPG and PNG formats are supported.
 * @param {Uint8Array} imgFile - image file
 * @param {ResizeOptions} options - options for resize
 */
export function resize(
  imgFile: Uint8Array,
  options: ResizeOptions,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const mime = mimeType(imgFile);

    if (mime === "image/jpeg") {
      resizeJPG(imgFile, options)
        .then((img) => resolve(img))
        .catch((error) => reject(error));
    } else if (mime === "image/png") {
      resizePNG(imgFile, options)
        .then((img) => resolve(img))
        .catch((error) => reject(error));
    } else {
      reject("Unknown format.");
    }
  });
}

/**
 * Resize JPG file.
 * @param imgFile - Image file
 * @param options - options for resize
 */
function resizeJPG(
  imgFile: Uint8Array,
  { width, height, aspectRatio = true }: ResizeOptions,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const decoded: ImageJPG = decodeJPG(imgFile);

      const { targetWidth, targetHeight } = getDimensions({
        originalWidth: decoded.width,
        originalHeight: decoded.height,
        width,
        height,
        aspectRatio,
      });

      const resized = new Resize(
        decoded.width,
        decoded.height,
        targetWidth,
        targetHeight,
        true,
        true,
        false,
        (buffer: Uint8Array) => {
          const image: any = {
            width: targetWidth,
            height: targetHeight,
            data: buffer,
          };

          try {
            const raw = encodeJPG(image, 100); //Quality 100 (default is 50)
            resolve(raw.data);
          } catch (error) {
            reject(error);
          }
        },
      );

      resized.resize(decoded.data);
    } catch (error) {
      reject(error);
    }
  });
}

/**
 * Resize PNG file.
 * @param imgFile - Image file
 * @param options - options for resize
 */
function resizePNG(
  imgFile: Uint8Array,
  { width, height, aspectRatio = true }: ResizeOptions,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const decoded: ImagePNG = decodePNG(imgFile);

      const { targetWidth, targetHeight } = getDimensions({
        originalWidth: decoded.width,
        originalHeight: decoded.height,
        width,
        height,
        aspectRatio,
      });

      const blendAlpha = decoded.channels === 4;

      const resized = new Resize(
        decoded.width,
        decoded.height,
        targetWidth,
        targetHeight,
        blendAlpha,
        true,
        false,
        (buffer: Uint8Array) => {
          const image: ImagePNG = {
            width: targetWidth,
            height: targetHeight,
            data: buffer,
            depth: decoded.depth,
            channels: decoded.channels,
          };

          try {
            const raw = encodePNG(image); //Quality 100 (default is 50)
            resolve(raw);
          } catch (error) {
            reject(error);
          }
        },
      );

      resized.resize(decoded.data);
    } catch (error) {
      reject(error);
    }
  });
}



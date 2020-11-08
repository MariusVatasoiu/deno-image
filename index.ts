import { Resize } from './resize/resize.js';
import { encodeJPG, decodeJPG, Image as ImageJPG } from "./deps.ts";
import { encode as encodePNG, decode as decodePNG } from './decoders/fast-png/index.ts';
import { IImageData as ImagePNG } from './decoders/fast-png/types.ts';
import { mimeType } from './mime-type.ts';
import type { ResizeOptions } from './types.ts';


/**
 * Resize image. JPG and PNG formats are supported.
 * @param {Uint8Array} imgFile - image file 
 * @param {ResizeOptions} options - options for resize
 */
export function resize(imgFile: Uint8Array, options: ResizeOptions): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    const mime = mimeType(imgFile);

    if(mime === 'image/jpeg') {
      resizeJPG(imgFile, options)
        .then(img => resolve(img))
        .catch(error => reject(error));
    } else if (mime === 'image/png') {
      resizePNG(imgFile, options)
        .then(img => resolve(img))
        .catch(error => reject(error));
    } else {
      reject('Unknown format.');
    }
  });
}

/**
 * Resize JPG file.
 * @param imgFile - Image file
 * @param options - options for resize
 */
function resizeJPG(imgFile: Uint8Array, {width, height}: ResizeOptions): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const decoded: ImageJPG = decodeJPG(imgFile);

      const resized = new Resize(decoded.width, decoded.height, width, height, true, true, false, async (buffer: Uint8Array) => {
        const image: ImageJPG = {
          width: width,
          height: height,
          data: buffer
        };
      
        try {
          const raw = encodeJPG(image, 100); //Quality 100 (default is 50)
          resolve(raw.data);
        } catch(error) {
          reject(error);
        }
      });
      
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
function resizePNG(imgFile: Uint8Array, {width, height}: ResizeOptions): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    try {
      const decoded: ImagePNG = decodePNG(imgFile);

      const resized = new Resize(decoded.width, decoded.height, width, height, false, true, false, async (buffer: Uint8Array) => {
        const image: ImagePNG = {
          width: width,
          height: height,
          data: buffer,
          depth: decoded.depth,
          channels: decoded.channels
        };
      
        try {
          const raw = encodePNG(image); //Quality 100 (default is 50)
          resolve(raw);
        } catch(error) {
          reject(error);
        }
      });
      
      resized.resize(decoded.data);
    } catch (error) {
      reject(error);
    }
  });
}
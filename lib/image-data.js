import { createCanvas } from "../deps.ts";

export function ImageData () {
      const args = [...arguments]; 
      let data;

      if (args.length < 2) {
        throw new TypeError(`
          Failed to construct 'ImageData': 2 arguments required, but only ${args.length} present.
        `);
      }

      if (args.length > 2) {
        data = args.shift();

        if (!(data instanceof Uint8ClampedArray)) {
          throw new TypeError(`
            Failed to construct 'ImageData': parameter 1 is not of type 'Uint8ClampedArray'
          `);
        }

        if (data.length !== 4 * args[0] * args[1]) {
          throw new Error(`
            Failed to construct 'ImageData': The input data byte length is not a multiple of (4 * width * height)
          `);
        }
      }

      const width = args[0];
      const height = args[1];
      const canvas = createCanvas(width, height);
      const ctx = canvas.getContext('2d');
      const imageData = ctx.createImageData(width, height);

      if (data) imageData.data.set(data);
      return imageData;
    }
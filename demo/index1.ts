import { Resize } from '../resize/resize.js';
import { encode, decode, Image } from "https://deno.land/x/jpegts@1.1/mod.ts";

const resized = new Resize(500, 500, 50, 50, true, true, false, async (buffer: Uint8Array) => {
  let image: Image = {
    width: 50,
    height: 50,
    data: buffer
  };

  let raw = encode(image, 100); //Quality 100 (default is 50)
  //save the image
  await Deno.writeFile('./result.jpg', raw.data);
});

console.log(resized);

const imgFile = Deno.readFileSync("./img.jpg");
const decoded = decode(imgFile);

const result = resized.resize(decoded.data);

console.log(result);
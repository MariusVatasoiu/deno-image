import { Resize } from '../resize/resize.js';
import { encode, decode } from '../decoders/fast-png/index.ts';

console.log(Resize);

var resized = new Resize(500, 500, 50, 50, false, true, false, async (buffer: Uint8Array) => {
  console.log('Resize callback');
  console.log(buffer);

  let image: any = {
    width: 50,
    height: 50,
    data: buffer,
    depth: 8,
    channels: 3
  };

  let raw = encode(image); //Quality 100 (default is 50)
  console.log(raw);
  //save the image
  await Deno.writeFile('./result.png', raw);
});

// console.log(resized);

const imgFile = Deno.readFileSync("./img.png");
const decoded = decode(imgFile);

console.log('Dimensions:', decoded.width, decoded.height, decoded.depth, decoded.channels);

const result = resized.resize(decoded.data);

// console.log(result);
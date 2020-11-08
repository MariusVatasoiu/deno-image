import {resize } from '../index.ts'; 

const imgJPG1 = await resize(Deno.readFileSync("./demo/input/img.jpg"), {width: 100, height: 100});
Deno.writeFileSync('./demo/output/result.jpg', imgJPG1);

const imgJPG2 = await resize(Deno.readFileSync("./demo/input/test.jpg"), {width: 100, height: 100});
Deno.writeFileSync('./demo/output/test.jpg', imgJPG2);

const imgPNG = await resize(Deno.readFileSync("./demo/input/img.png"), {width: 100, height: 100});
Deno.writeFileSync('./demo/output/result.png', imgPNG);

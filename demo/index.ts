import {resize } from '../index.ts'; 

const imgJPG1 = await resize(Deno.readFileSync("./demo/img.jpg"), {width: 100, height: 100});
Deno.writeFileSync('./demo/result.jpg', imgJPG1);

const imgJPG2 = await resize(Deno.readFileSync("./demo/test.jpg"), {width: 100, height: 100});
Deno.writeFileSync('./demo/result2.jpg', imgJPG2);

const imgPNG = await resize(Deno.readFileSync("./demo/img.png"), {width: 100, height: 100});
Deno.writeFileSync('./demo/result.png', imgPNG);

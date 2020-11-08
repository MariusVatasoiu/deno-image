import {resize } from '../index.ts'; 

const squareJPG = await resize(Deno.readFileSync("./demo/input/square.jpg"), {width: 100, height: 100});
Deno.writeFileSync('./demo/output/square.jpg', squareJPG);

const landscapeJPG = await resize(Deno.readFileSync("./demo/input/landscape.jpg"), { width: 100, height: 80});
Deno.writeFileSync('./demo/output/landscape.jpg', landscapeJPG);

const portraitJPG = await resize(Deno.readFileSync("./demo/input/portrait.jpg"), {width: 100});
Deno.writeFileSync('./demo/output/portrait.jpg', portraitJPG);

const squarePNG = await resize(Deno.readFileSync("./demo/input/square.png"), {width: 100, height: 100});
Deno.writeFileSync('./demo/output/result.png', squarePNG);

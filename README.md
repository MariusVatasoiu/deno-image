# deno-image

> **deno-image** is a deno module for resizing images (for now).

## Usage

```javascript
import { resize } from "https://raw.githubusercontent.com/MariusVatasoiu/deno-image/main/mod.ts";

const img = await resize(Deno.readFileSync("./demo/img.jpg"), {width: 100, height: 100});

Deno.writeFileSync('./demo/result.jpg', img);
```

## API

### resize(img, options)

Returns a `Promise<Uint8Array>` with the resized image.

#### img

Type: `Uint8Array`

An image Uint8Array. Supported formats are `jpg` and `png`.

#### options

Type: `Object`

##### width

Type: `number`

Desired width of the target image. For lanscape images, `width` has priority, for portrait images, `height` has priority.

##### height

Type: `number`

Desired height of the target image. For lanscape images, `width` has priority, for portrait images, `height` has priority.

##### aspectRaio

Type: `boolean`

Keep aspect ration. Default is `true`.

## Credits

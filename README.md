# deno-image

**deno-image** is a deno module for resizing images (for now).

# Usage

```javascript
import { resize } from "https://raw.githubusercontent.com/MariusVatasoiu/deno-image/main/mod.ts";

const img = await resize(Deno.readFileSync("./demo/img.jpg"), {width: 100, height: 100});

Deno.writeFileSync('./demo/result.jpg', img);
```

# API

## resize(img, options)

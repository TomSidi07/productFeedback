// // Directory stup for ES6
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fs = require("fs");
const { readFileSync } = fs;
function getData() {
  try{const data = JSON.parse(
    readFileSync(
      path.join(__dirname, "../data/data.json"),
      "utf-8",
      (err, data) => {
        console.log(err);
        return data;
      }
    )
  ).productRequests;
      return data;
  } catch(err) {
      return ''
  }
}

export default getData;

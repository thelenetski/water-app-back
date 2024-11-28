import path from "node:path";
import fs from "node:fs";
const TMP_UPLOAD_DIR = path.join('src' + '/tmp');

const swaggerDocument = fs.readFileSync(path.join('docs' + '/swagger.json'), 'utf8');

export { TMP_UPLOAD_DIR, swaggerDocument };
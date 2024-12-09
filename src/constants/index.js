import path from "node:path";
import fs from "node:fs";
const TMP_UPLOAD_DIR = path.join("src" + "/tmp");

const swaggerDocument = fs.readFileSync(
  path.join("docs" + "/swagger.json"),
  "utf8",
);

const ONE_MONTH = 30 * 24 * 60 * 60 * 1000;
const SIXTY_MINUTES = 2 * 60 * 1000;

export { TMP_UPLOAD_DIR, swaggerDocument, ONE_MONTH, SIXTY_MINUTES };

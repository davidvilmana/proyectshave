import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

const BUILD_DIR = path.join(__dirname, "dist");

app.use(express.static(BUILD_DIR));

// ✅ Express 5 compatible - usa regex en lugar de wildcard
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(BUILD_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});

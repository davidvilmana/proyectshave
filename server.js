const express = require("express");
const path = require("path");

const app = express();
const PORT = 8080;

const BUILD_DIR = path.join(__dirname, "dist"); // ✅ Vite build en la raíz

app.use(express.static(BUILD_DIR));

app.get("*", (req, res) => {
  res.sendFile(path.join(BUILD_DIR, "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
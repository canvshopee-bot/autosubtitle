const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// All processing (transcription + burn-in render) happens in the visitor's
// browser, so the server's only job is to serve the static app.
app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`Subtitle Otomatis jalan di http://localhost:${PORT}`);
});

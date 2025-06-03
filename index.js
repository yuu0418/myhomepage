const express = require('express');
const app =express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3000;//クラウドで環境変数使われてたらそれ使う

app.use(cors());
app.use(express.static(path.join(__dirname, 'front')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'front', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });

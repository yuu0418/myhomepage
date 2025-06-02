const express = require('express');
const app =express();
const cors = require('cors');
const PORT = process.env.PORT || 3000;//クラウドで環境変数使われてたらそれ使う

app.use(cors());
app.use(express.static('front'));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
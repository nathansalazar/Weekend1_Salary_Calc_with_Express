const express = require('express');

const app = express();

const PORT = 5000;

app.use(express.static('server/public'));

app.listen(PORT, () => {
    console.log('You\'re listening to PORT', PORT);
})
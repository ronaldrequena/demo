const express = require('express');
const helloRouter = require('./routes/hello');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', helloRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
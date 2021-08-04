const express = require('express');
const sequelize = require('./database/db');
const port = 3005
const Jobs = require('./model/Jobs')

sequelize.sync().then(() => console.log('db is ready'));

const app = express();
app.use(express.json());

app.get('/jobs', async (req, res) => {
    const { page, size } = req.query;
    const jobs = await Jobs.findAndCountAll({
        limit: size,
        offset: page * size
    });
    res.send(jobs);
})

app.listen(port, () => {
    console.log("app running on port: ", port);
})
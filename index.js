const express = require("express");
var cors = require("cors");
const sequelize = require("./api/database/db");
const Jobs = require("./api/model/Jobs");
var cron = require("node-cron");
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('./contact/config');
const path = require('path');
const {globalFetch} = require("./scrapers/fetchAllData");
const buildPath = path.join(__dirname, 'client', 'build');
require('dotenv').config()
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(buildPath));
sequelize.sync().then(() => console.log("db is ready"));


app.get("/api/jobs", async (req, res) => {
  const pageAsNumber = Number.parseInt(req.query.page);
  const sizeAsNumber = Number.parseInt(req.query.size);
  const getLocation = req.query.location;
  const getDegree = req.query.degree;
  const getDOpp = req.query.dopportunities;
  const getfOStd = req.query.fofstd;
  const getDuration = req.query.duration;
  const Op = sequelize.Sequelize.Op;

  let page = 0;
  if(!Number.isNaN(pageAsNumber) && pageAsNumber > 0) {
    page = pageAsNumber;
  }

  let size = 10;
  if(!Number.isNaN(sizeAsNumber) && sizeAsNumber > 0) {
    size = sizeAsNumber;
  }

  const jobs = await Jobs.findAndCountAll({
    limit: size,
    offset: page * size,
    order: [['id', 'ASC'],['postdate', 'DESC']],
    where: {
      location: getLocation ? { [Op.like]: `%${getLocation.toUpperCase()}%` } : { [Op.ne]: null },
      degree: getDegree ? { [Op.like]: {[Op.any]: [`${getDegree[0]}`,`${getDegree[1]}`,`${getDegree[2]}`,`${getDegree[3]}`]} } : { [Op.ne]: null },
      dopportunities: getDOpp ? {  [Op.like]: {[Op.any]: [`%${getDOpp[0]}%`,`%${getDOpp[1]}%`]} }  : { [Op.ne]: null },
      fofstd: getfOStd ? {  [Op.like]: {[Op.any]: [`%${getfOStd[0]}%`,`%${getfOStd[1]}%`,`%${getfOStd[2]}%`,`%${getfOStd[3]}%`,`%${getfOStd[4]}%`,`%${getfOStd[5]}%`,`%${getfOStd[6]}%`,`%${getfOStd[7]}%`,`%${getfOStd[8]}%`,`%${getfOStd[9]}%`,`%${getfOStd[10]}%`,`%${getfOStd[11]}%`,`%${getfOStd[12]}%`,`%${getfOStd[13]}%`]} }  : { [Op.ne]: null },
      duration: getDuration ? {  [Op.like]: {[Op.any]: [`%${getDuration[0]}%`,`%${getDuration[1]}%`,`%${getDuration[2]}%`,`%${getDuration[3]}%`,`%${getDuration[4]}%`,`%${getDuration[5]}%`,`%${getDuration[6]}%`,`%${getDuration[7]}%`,`%${getDuration[8]}%`,`%${getDuration[9]}%`,`%${getDuration[10]}%`]} }  : { [Op.ne]: null },
    }
  });
  res.send({
    content: jobs.rows,
    totalPages: Math.ceil(jobs.count / size),
    totalJobs: jobs.count,
  });
  currentDegree=[]
});

app.get("/api/dates", async (req, res) => {
  const Op = sequelize.Sequelize.Op;

  const jobs = await Jobs.findAndCountAll({
    where: {
      id:  {
        [Op.lt]: 1001
      }
    },
    attributes: ['postdate']
  });
  res.send(jobs.rows);
});

var transport = {
  host: 'smtp.gmail.com',
  port: 465,
  auth: {
  user: creds.USER,
  pass: creds.PASS
}
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
if (error) {
  console.log(error);
} else {
  console.log('Server is ready to take messages');
}
});

router.post('/send', (req, res, next) => {
var name = req.body.name
var email = req.body.email
var message = req.body.message
var content = `name: ${name} \n email: ${email} \n message: ${message} `

var mail = {
  from: name,
  to: process.env.USER,
  subject: 'Aggregator New Message!',
  text: content
}

transporter.sendMail(mail, (err, data) => {
  if (err) {
    res.json({
      status: 'fail'
    })
  } else {
    res.json({
     status: 'success'
    })
  }
})
})

app.get('/*', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.use('/', router)


cron.schedule('* * * * *', () => globalFetch());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

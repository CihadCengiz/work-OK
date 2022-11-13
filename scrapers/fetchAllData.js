const puppeteer = require('puppeteer');
const { Client } = require('pg');
var format = require('pg-format');
let fetch = require("node-fetch");
const date = require("date-and-time");


async function fetchAllData() {
  console.log('fetching jobs');

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const page2 = await browser.newPage();

  const allJobs = [];
  const jobLogos = [];
  const jobRedirect = [];
  const jobDates = [];
  const jobLocation = [];
  const jobCompany = [];
  const jobDegree = []; //+
  const dOpp = [];
  const fOfStd = [];
  const duration = [];
  const deadline = [];

  for (let j = 0; j < 50; j++) {
    await page.goto(`https://erasmusintern.org/traineeships?page=${j}`);
    console.log(j);

    for (let i = 1; i < 11; i++) {
      const [el] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div/div/div/h3/a`
      );
      const jobs = await el.getProperty('textContent');
      const allJobsTxt = await jobs.jsonValue();

      const [el2] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[1]/div/div/div/div/img`
      );
      const logo = await el2.getProperty('src');
      const logoTxt = await logo.jsonValue();

      const [el3] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[1]/div/div/h3/a`
      );
      const redirect = await el3.getProperty('href');
      const redirectTxt = await redirect.jsonValue();

      const [el4] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div`
      );
      const date = await el4.getProperty('textContent');
      const dateTxt = await date.jsonValue();

      const [el5] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div[1]/div/div/text()`
      );
      const location = await el5.getProperty('textContent');
      const locationTxt = await location.jsonValue();

      const [el6] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[1]/div/div/a`
      );
      const company = await el6.getProperty('textContent');
      const companyTxt = await company.jsonValue();

      const [el7] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[1]/div[2]/div
        `
      );
      const durat = await el7.getProperty('textContent');
      const durationTxt = await durat.jsonValue();

      const [el8] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[3]/div[2]/div/span`
      );
      const dead = await el8.getProperty('textContent');
      const deadlineTxt = await dead.jsonValue();

      deadline.push(deadlineTxt);
      allJobs.push(allJobsTxt);
      jobLogos.push(logoTxt);
      jobRedirect.push(redirectTxt);
      jobDates.push(dateTxt);
      jobLocation.push(locationTxt);
      jobCompany.push(companyTxt);
      duration.push(durationTxt);
    }
  }
  for (let k = 0; k < allJobs.length; k++) {
    console.log(k);
    await page2.goto(jobRedirect[k]);
    const [checkRq] = await page2.$x(
      '/html/body/div[3]/div/div/section/div/div/div[2]/fieldset/legend/div'
    );
    if (!checkRq) {
      jobDegree.push('Unspecified');

      const [fk2] = await page2.$x(
        '/html/body/div[3]/div/div/section/div/div/div[1]/div[1]/text()[1]'
      );
      if (fk2) {
        dOpp.push('Yes');
      } else {
        dOpp.push('No');
      }

      const [fk3] = await page2.$x(
        `/html/body/div[2]/div[1]/div/div/section/div/div/div/div/div[3]/div[2]/h5`
      );
      const fieldOS = await fk3.getProperty('textContent');
      const fieldTxt = await fieldOS.jsonValue();
      fOfStd.push(fieldTxt);
    } else {
      const [fk] = await page2.$x(
        `/html/body/div[3]/div/div/section/div/div/div[2]/fieldset/div/div[2]/div[2]/div`
      );
      if (!fk) {
        jobDegree.push('Unspecified');
      } else {
        const degree = await fk.getProperty('textContent');
        const dgrTxt = await degree.jsonValue();
        jobDegree.push(dgrTxt);
      }

      const [fk2] = await page2.$x(
        '/html/body/div[3]/div/div/section/div/div/div[1]/div[1]/text()[1]'
      );
      if (fk2) {
        dOpp.push('Yes');
      } else {
        dOpp.push('No');
      }

      const [fk3] = await page2.$x(
        `/html/body/div[2]/div[1]/div/div/section/div/div/div/div/div[3]/div[2]/h5`
      );
      const fieldOS = await fk3.getProperty('textContent');
      const fieldTxt = await fieldOS.jsonValue();
      fOfStd.push(fieldTxt);
    }
  }

  browser.close();

  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  await client.query('truncate jobs restart identity')

  for (let i = 0; i < allJobs.length; i++) {
    console.log(`${i}. page done`);
    var querytext = format(
      'insert into jobs(title,logo,redirect,postdate,location,company,degree,dopportunities,fofstd,duration,deadline) values (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)',
      allJobs[i],
      jobLogos[i],
      jobRedirect[i],
      jobDates[i],
      jobLocation[i],
      jobCompany[i],
      jobDegree[i],
      dOpp[i],
      fOfStd[i],
      duration[i],
      deadline[i]
    );

    try {
      const res = await client.query(querytext);
    } catch (err) {
      console.log(err.stack);
    }
  }
  return {
    allJobs,
    jobLogos,
    jobRedirect,
    jobDates,
    jobLocation,
    jobCompany,
    jobDegree,
    dOpp,
    fOfStd,
    duration,
  };
}

async function globalFetch() {
  await fetchAllData()

  console.log("fetching jobs");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const title = [];
  const logo = [];
  const redirect = [];
  const location = [];
  const fofstd = [];
  const duration = ["Check details."];
  const postdate = [];
  const degree = ["Check details."];
  const company = ["Check details."];
  const dOpp = ["Check details."];
  // const deadline = ["Check details."];

  for (let k = 1; k < 50; k++) {
    await page.goto(
      `http://globalplacement.com/en/search-internships/page:${k}`
    );

    for (let i = 1; i <= 10; i++) {
      //title
      const [el] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[1]`
      );
      const src = await el.getProperty("textContent");
      const srcTxt = await src.jsonValue();
      let slicedTxt = srcTxt.slice(15, -1);
      title.push(slicedTxt);

      //logo
      const [el2] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[1]/img`
      );
      const src2 = await el2.getProperty("src");
      const src2Txt = await src2.jsonValue();
      logo.push(src2Txt);

      //redirect
      const [el3] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[2]/div/a`
      );
      const src3 = await el3.getProperty("href");
      const src3Txt = await src3.jsonValue();
      redirect.push(src3Txt);

      //location
      const [el4] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[2]/div[1]/div[1]`
      );
      const src4 = await el4.getProperty("textContent");
      const src4Txt = await src4.jsonValue();
      let splitTxt = src4Txt.split(",")[1];
      location.push(splitTxt);

      //fofstd
      const [el5] = await page.$x(
        `/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[2]/div[2]/div[1]`
      );
      const src5 = await el5.getProperty("textContent");
      const src5Txt = await src5.jsonValue();
      let splitFof = src5Txt.split(": ")[1];
      fofstd.push(splitFof);
    }
    console.log("page done");
  }
  async function getDates() {
    const response = await fetch("http://workokdeploy.herokuapp.com/api/dates");
    const data = await response.json();
    const dataObj = await Object.values(data);
    for (let i = 0; i < 10; i++) {
      postdate.push(dataObj[i].postdate);
    }
  }
  await getDates();

  function randomDate(start, end) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  }
  let dateArr = [];
  for (let i = 0; i < title.length - postdate.length; i++) {
    let rnDate = randomDate(new Date(2022, 8, 9), new Date(2019, 3, 18));
    let frmDate = date.format(rnDate, "YYYY-MM-DD");

    dateArr.push(frmDate);
  }

  browser.close();

  for (let i = 0; i < dateArr.length; i++) {
    postdate.push(dateArr[i]);
  }


  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  client.connect();

  for (let i = 0; i < title.length; i++) {
    var text = format(
      "insert into jobs(title,logo,redirect,postdate,location,company,degree,fofstd,dopportunities,duration) values (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L)",
      title[i],
      logo[i],
      redirect[i],
      postdate[i],
      location[i],
      company[0],
      degree[0],
      fofstd[i],
      dOpp[0],
      duration[0],
      // deadline[0],
    );

    try {
      const res = await client.query(text);
    } catch (err) {
      console.log(err.stack);
      console.log(postdate.length);
    }
  }
  console.log(`database done`);
  await client.query(`update jobs
                      set location = upper(location);`)
}


module.exports = {fetchAllData, globalFetch};

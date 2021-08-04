const puppeteer = require("puppeteer");
const { Client } = require("pg");
var format = require("pg-format");

async function fetchAllData() {
  console.log("fetching jobs");

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

  for (let j = 0; j < 138; j++) {
    await page.goto(`https://erasmusintern.org/traineeships?page=${j}`);
    console.log(j);

    for (let i = 1; i < 11; i++) {
      const [el] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div/div/div/h3/a`
      );
      const src = await el.getProperty("textContent");
      const srcTxt = await src.jsonValue();

      const [el2] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[1]/div/div/div/div/img`
      );
      const src2 = await el2.getProperty("src");
      const logoTxt = await src2.jsonValue();

      const [el3] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[1]/div/div/h3/a`
      );
      const src3 = await el3.getProperty("href");
      const redirectTxt = await src3.jsonValue();

      const [el4] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div`
      );
      const src4 = await el4.getProperty("textContent");
      const dateTxt = await src4.jsonValue();

      const [el5] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div[1]/div/div/text()`
      );
      const src5 = await el5.getProperty("textContent");
      const locationTxt = await src5.jsonValue();

      const [el6] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[1]/div/div/a`
      );
      const src6 = await el6.getProperty("textContent");
      const companyTxt = await src6.jsonValue();

      const [el7] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[1]/div[2]/div
        `
      );
      const durat = await el7.getProperty("textContent");
      const drtTxt = await durat.jsonValue();

      const [el8] = await page.$x(
        `/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[3]/div[2]/div/span`
      );
      const dead = await el8.getProperty("textContent");
      const deadTxt = await dead.jsonValue();

      deadline.push(deadTxt);
      allJobs.push(srcTxt);
      jobLogos.push(logoTxt);
      jobRedirect.push(redirectTxt);
      jobDates.push(dateTxt);
      jobLocation.push(locationTxt);
      jobCompany.push(companyTxt);
      duration.push(drtTxt);
    }

}
for (let k = 0; k < allJobs.length; k++) {
  console.log(k);
  await page2.goto(jobRedirect[k]);
  const [checkRq] = await page2.$x(
    "/html/body/div[3]/div/div/section/div/div/div[2]/fieldset/legend/div"
  );
  if (!checkRq) {
    jobDegree.push("Unspecified");

    const [fk2] = await page2.$x(
      "/html/body/div[3]/div/div/section/div/div/div[1]/div[1]/text()[1]"
    );
    if (fk2) {
      dOpp.push("Yes");
    } else {
      dOpp.push("No");
    }

    const [fk3] = await page2.$x(
      `/html/body/div[2]/div[1]/div/div/section/div/div/div/div/div[3]/div[2]/h5`
    );
    const fieldOS = await fk3.getProperty("textContent");
    const fieldTxt = await fieldOS.jsonValue();
    fOfStd.push(fieldTxt);
  } else {
    const [fk] = await page2.$x(
      `/html/body/div[3]/div/div/section/div/div/div[2]/fieldset/div/div[2]/div[2]/div`
    );
    if (!fk) {
      jobDegree.push("Unspecified");
    } else {
      const degree = await fk.getProperty("textContent");
      const dgrTxt = await degree.jsonValue();
      jobDegree.push(dgrTxt);
    }

    const [fk2] = await page2.$x(
      "/html/body/div[3]/div/div/section/div/div/div[1]/div[1]/text()[1]"
    );
    if (fk2) {
      dOpp.push("Yes");
    } else {
      dOpp.push("No");
    }

    const [fk3] = await page2.$x(
      `/html/body/div[2]/div[1]/div/div/section/div/div/div/div/div[3]/div[2]/h5`
    );
    const fieldOS = await fk3.getProperty("textContent");
    const fieldTxt = await fieldOS.jsonValue();
    fOfStd.push(fieldTxt);
  }
}

  browser.close();

  let CONNECTION_STRING =
    "postgres://jiaiekzoqqamwn:e36491bd97c736367fef6654ae6ecec72b958ced71ca0eda10b836b494d5845f@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d8e1j40rfmrbkj";

  const client = new Client({
    connectionString: CONNECTION_STRING,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  client.connect();

  for (let i = 0; i < allJobs.length; i++) {
    console.log(`${i}. page done`);
    var text = format(
      "insert into finaldraft(title,logo,redirect,postdate,location,company,degree,dopportunities,fofstd,duration,deadline) values (%L, %L, %L, %L, %L, %L, %L, %L, %L, %L, %L)",
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
      const res = await client.query(text);
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

fetchAllData();

module.exports = fetchAllData;

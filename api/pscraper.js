const puppeteer = require('puppeteer');
const { Client } = require('pg')
var format = require('pg-format');

let selector = '1';


async function scrapeProduct(url, url2){
    console.log('fetching jobs');

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const allJobs = [];
    const jobLogos = [];
    const jobRedirect = [];
    const jobDates = [];
    const jobLocation = [];
    const jobCompany = [];

    for(let i = 1; i < 11; i++){
        
        const [el] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div/div/div/h3/a`);
        const src = await el.getProperty('textContent');
        const srcTxt = await src.jsonValue();

        const [el2] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[1]/div/div/div/div/img`);
        const src2 = await el2.getProperty('src');
        const logoTxt = await src2.jsonValue();

        const [el3] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[1]/div[1]/div/div/h3/a`);
        const src3 = await el3.getProperty('href');
        const redirectTxt = await src3.jsonValue();

        const [el4] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[4]/div[2]/div[2]/div`);
        const src4 = await el4.getProperty('textContent');
        const dateTxt = await src4.jsonValue();

        const [el5] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[2]/div/div/div[1]/div/div/text()`);
        const src5 = await el5.getProperty('textContent');
        const locationTxt = await src5.jsonValue();

        const [el6] = await page.$x(`/html/body/div[3]/div/div/section[2]/div/div[2]/div[${i}]/div/div/div/div[2]/div[2]/div[2]/div[1]/div/div/a`);
        const src6 = await el6.getProperty('textContent');
        const companyTxt = await src6.jsonValue();

        allJobs.push(srcTxt);
        jobLogos.push(logoTxt);
        jobRedirect.push(redirectTxt);
        jobDates.push(dateTxt);
        jobLocation.push(locationTxt);
        jobCompany.push(companyTxt);
    }

    await page.goto(url2);

    for(let i = 1; i < 11; i++){
        const [el] = await page.$x(`/html/body/div[2]/div[1]/div[1]/div/div[2]/div/div[2]/div[${i}]/div[1]/div[2]/div[1]`);

        const src = await el.getProperty('textContent');
        const srcTxt = await src.jsonValue();
        allJobs.push(srcTxt);
    }
    browser.close();

    let CONNECTION_STRING = "postgres://jiaiekzoqqamwn:e36491bd97c736367fef6654ae6ecec72b958ced71ca0eda10b836b494d5845f@ec2-54-217-195-234.eu-west-1.compute.amazonaws.com:5432/d8e1j40rfmrbkj"
    
    const client = new Client({
        connectionString: CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    })
    
    client.connect()


    for(let i = 0; i < allJobs.length; i++) {
        var text = format('insert into draft%s(title,logo,redirect,postdate,location,company) values (%L, %L,%L, %L,%L, %L)',selector, allJobs[i], jobLogos[i], jobRedirect[i], jobDates[i], jobLocation[i], jobCompany[i]);
   
        try {
            const res = await client.query(text)
            console.log(res.rows[0])
        } catch (err) {
            console.log(err.stack)
        }
        
    }

    
    if(selector == '1') {
        selector = '2'
        var truncate = format('truncate table draft%s restart identity',selector)
        try {
            const res = await client.query(truncate)
            console.log(`${selector}. table cleaned.`)
        } catch (err) {
            console.log(err.stack)
        }
    }
    else {
        selector = '1'
        var truncate = format('truncate table draft%s restart identity',selector)
        try {
            const res = await client.query(truncate)
            console.log(`${selector}. table cleaned.`)
        } catch (err) {
            console.log(err.stack)
        }
    }
    return {allJobs, jobLogos, jobRedirect,jobDates,jobLocation,jobCompany};
}

module.exports = scrapeProduct

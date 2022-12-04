const {Builder, Browser, By, Key, until} = require('selenium-webdriver')
const { v4: uuidv4 } = require('uuid');
require('chromedriver')
const express = require('express')
const async = require('hbs/lib/async')
const axios = require('axios')
const { Pool, Client } = require("pg");

const Testcase = require('../models/testcase')
const router = new express.Router()

const time_delay = 3000
const pool = new Pool({
    user: "vcchome",
    host: "192.168.68.69",
    database: "vcchc",
    password: "vcchome12345@",
    port: 5432
})

//Create main  view
router.get('/',  async(req,res) => {

    try{
        const testcases = await Testcase.find({})

        res.render('index', {testcases})

    }catch(e){
        res.status(500).send(e.message)
    }
})

//Api tạo test case
router.post('/create-test-case', async(req, res) => {
    const testcase = new Testcase(req.body)
    try{
        await testcase.save()
        res.status(201).send({testcase})
        console.log(testcase.testcaseID + ' was created succesful!')
    }catch(e){
        res.status(400).send(e.message)
        console.log(e.message)
    }
})


router.get('/loginTesting',  async(req,res) => {

    let driver = await new Builder().forBrowser(Browser.CHROME).build();
    try {
        //Đăng nhập vào web
        await driver.manage().window().setRect({ width: 1024, height: 768 });
        await driver.get(process.env.LOGIN_URL);
        await driver.sleep(time_delay)
        await driver.findElement(By.xpath("//input[contains(@formcontrolname, 'username')]")).sendKeys('noc@vccsmart.vn');
        await driver.sleep(time_delay)
        await driver.findElement(By.xpath("//input[contains(@formcontrolname, 'password')]")).sendKeys('123456789');
        await driver.sleep(time_delay)
        await driver.findElement(By.xpath("//button[contains(@class, 'p-md-12 p-button p-component')]")).click();
        await driver.sleep(time_delay)

        //Đợi menu Khai báo danh mục hiện ra
        await driver.findElement(By.xpath('//a[@class="menu-item ng-tns-c9-18 ng-star-inserted"]')).click();
        await driver.sleep(time_delay)

        //Click menu Khai báo danh mục
        await driver.findElement(By.xpath('//li[1]/a')).click();


        //bấm button đăng xuất
        // await driver.findElement(By.xpath("//li[contains(@class, 'p-d-flex log-out')]")).click();
        // let login_container = await driver.findElement(By.xpath("//div[contains(@class, 'login-container')]"))
        // await driver.wait(until.elementIsVisible(login_container),1000);
        // var login_label =  await driver.findElement(By.xpath("//strong[contains(@_ngcontent-hqw-c0, '')]")).getText();
        // console.log(login_label)
    } finally {
        //await driver.quit();
        const query = "select count(dc.uid) from device_category dc " +
            "where name like '%Automation Test lần%' and is_active = 1 and is_deleted = 0";

        pool.connect()
            .then((client) => {
                client.query(query)
                    .then(resp => {
                        for (var row of resp.rows) {
                            const result = JSON.stringify(row.count)
                            myResult = result.replace(/"/g, '');
                            console.log("Ket qua sau khi querry " + myResult);
                            res.send(myResult)
                            Testcase.update({testcaseID: "DAS_32"}, {
                                receivedResult: myResult
                            }, function(err, affected, resp) {
                                console.log(resp);
                            })
                        }
                    })
                    .catch(err => {
                        console.error(err);
                    });
            })
            .catch(err => {
                console.error(err);
            });
    }

    //So sánh kết quả
    const testcases = await Testcase.find({})
    console.log(JSON.stringify(testcases.expectedResult));
    if(testcases.expectedResult === testcases.receivedResult){


        Testcase.update({testcaseID: "DAS_32"}, {
            testResult: "Đạt"
        }, function(err, affected, resp) {
            console.log(resp);
        })
    }else if(testcases.expectedResult != testcases.receivedResult){
        Testcase.update({testcaseID: "DAS_32"}, {
            testResult: "Chưa đạt"
        }, function(err, affected, resp) {
            console.log(resp);
        })
    }


})

router.get('/querryDB',  async(req,res) => {
    const query = "select count(dc.uid) from device_category dc " +
        "where name like '%Linh test lan 3%' and is_active = 1 and is_deleted = 0";

    pool.connect()
        .then((client) => {
            client.query(query)
                .then(resp => {
                    for (var row of resp.rows) {
                        const result = JSON.stringify(row.count)
                        myResult = result.replace(/"/g, '');
                        console.log("Ket qua sau khi querry " + myResult);
                        res.send(myResult)
                        Testcase.update({testcaseID: "DAS_32"}, {
                            receivedResult: myResult
                        }, function(err, affected, resp) {
                            console.log(resp);
                        })
                    }
                })
                .catch(err => {
                    console.error(err);
                });
        })
        .catch(err => {
            console.error(err);
        });


})

module.exports = router

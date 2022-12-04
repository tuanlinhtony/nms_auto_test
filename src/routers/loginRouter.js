const {Builder, Browser, By, Key, until} = require('selenium-webdriver')
require('chromedriver')
const express = require('express')
const async = require('hbs/lib/async')
const axios = require('axios')

const loginRouter = async () => {
    let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
    try {
        await driver.get('https://www.google.com/ncr');
        await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
        await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    } finally {
        await driver.quit();
    }
}

module.exports = {
    loginRouter
}


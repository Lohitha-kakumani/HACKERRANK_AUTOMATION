const puppeteer = require('puppeteer')

//hackerrank link

const loginLink = 'https://www.hackerrank.com/auth/login'
const email = 'klohithaklohitha6@gmail.com'
const password = 'Lohitha@2005'


// opening the brower when we can able to see it

let browserOpen = puppeteer.launch({
    headless : false,

    args : ['--start-maximized'],

    defaultViewport:null
})

let page

browserOpen.then(function(browserObj){
    let browserOpenPromise = browserObj.newPage()
    return browserOpenPromise;
}).then(function(newTab){
    page = newTab
    let hackerRankOpenPromise = newTab.goto(loginLink)
    return hackerRankOpenPromise
}).then(function(){
    let emailIsEntered = page.type("input[type='text']",email,{delay : 50})
    return emailIsEntered
}).then(function(){
    let passwordIsEntered = page.type("input[type='password']",password,{delay : 50})
    return passwordIsEntered
}).then(function(){
    let loginButtonClicked = page.click("button[type='submit']" , {delay:50})
    return loginButtonClicked
}).then(function(){
    let clickOnAlgoPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"] ',page)
    return clickOnAlgoPromise
}).then(function(){
    let getToWarmUp = waitAndClick('input[value="warmup"]',page)
    return getToWarmUp
}).then(function(){
    let allChallengesPromise = page.$$('.ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled', {delay:50}) // $$ = document.queryselectall
    return allChallengesPromise;
}).then(function(questionArray){
    console.log('number of questions' , questionArray.length)
    
})



//wait if it takes a lot of time and then cliick
function waitAndClick(selector,cPage){
    return new Promise(function(resolve,reject){
        let waitForModelPromise = cPage.waitForSelector(selector)
        waitForModelPromise.then(function(){
            let clickModel = cPage.click(selector)
            return clickModel
        }).then(function(){
            resolve()
        }).catch(function(err){
            reject()
        })
    })
}



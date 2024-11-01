const puppeteer = require('puppeteer')
const codeObj = require('./codes')

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
     let questionWillBeSolved = questionSolver(page,questionArray[0],codeObj.answers[0])
     return questionWillBeSolved
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

function questionSolver(page,question,answer){
    return new Promise(function(resolve,reject){
        let questionWillBeClicked = question.click()
        return questionWillBeClicked.then(function(){
            let EditorInFocusPromise = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return EditorInFocusPromise
        }).then(function(){
            return waitAndClick('.checkbox-input',page)
        }).then(function(){
            return page.waitForSelector('textarea.custominput',page)
        }).then(function(){
            return page.type('textarea.custominput',answer,{delay:10})
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed
        }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})
            return AIsPressed
        }).then(function(){
            let XIsPressed = page.keyboard.press('X',{delay:100})
            return XIsPressed
        }).then(function(){
            let ctrlisUnpressed = page.keyboard.up('Control')
            return ctrlisUnpressed
        }).then(function(){
            let mainEditorInFocus = waitAndClick('.monaco-editor.no-user-select.vs',page)
            return mainEditorInFocus
        }).then(function(){
            let ctrlIsPressed = page.keyboard.down('Control')
            return ctrlIsPressed 
        }).then(function(){
            let AIsPressed = page.keyboard.press('A',{delay:100})
            return AIsPressed
        }).then(function(){
            let VIsPressed = page.keyboard.press('V',{delay:100})
            return VIsPressed
        }).then(function(){
            let ctrlisUnpressed = page.keyboard.up('Control')
            return ctrlisUnpressed
        }).then(function(){
            return page.click('.hr-monaco-submit',{delay:50})
        }).then(function(){
            resolve()
        }).then(function(){
            reject();
        })
    })
}



const fs = require('fs')
const loadtest = require('loadtest')

let URL = ''
let JWT = 'Bearer '

try {
    let results = []

    // let total_urls = 0, finished_urls = 0
    const options = {
        url: `${URL}`,
        method: 'GET',
        headers: {
            Authorization: JWT
        },
        concurrency: 100,
        requestPerSecond: 10000,
        maxSeconds: 5
    }

    const options2 = {
        url: `${URL}`,
        method: 'POST',
        headers: {
            Authorization: JWT
        },
        body: {
            a: '',
            b: '',
            c: ''
        },
        requestPerSecond: 10000,
        maxSeconds: 5
    }

    loadtest.loadTest(options, (err, res) => {
        if(err) {
            return console.error(`Got an error: ${err}`)
        } else {
            const resData = {
                statistics: res,
                url: `${URL}`
            }
            results.push(resData)
        }
    })

    loadtest.loadTest(options2, (err, res) => {
        if(err) {
            return console.error(`Got an error: ${err}`)
        } else {
            const resData = {
                statistics: res,
                url: `${URL}`
            }
            results.push(resData)
        }
    })
    fs.writeFileSync('output.json', JSON.stringify(results))
    fs.appendFile('POSTresults.json', `${JSON.stringify(resData)},\n`, err => {
        if(err){
            console.error(err);
        }
        console.log("TESTS RAN SUCCESSFULLY.\n");
    })
} catch (err) {
    console.error(`Caught an error ${err}`)
}


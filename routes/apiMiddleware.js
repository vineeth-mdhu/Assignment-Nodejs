// importing node-fetch
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
const Info = require('../models/Info')
const fetch_api = async function (req, res, next) {
    try {
        // clearing database
        const empty = await Info.remove({})

        const api_url = 'https://api.wazirx.com/api/v2/tickers'
        
        // fetching results from api
        const response = await fetch(api_url)

        //converting to json
        const results = await response.json()

        //converting results to array
        const fetchedInfo = Object.entries(results)

        // saving the first 10 results to data base
        for (let i = 0; i < 10; i++) {
            const info = new Info({ ...fetchedInfo[i][1] })
            info.name = fetchedInfo[i][1].base_unit.toUpperCase()+'/'+fetchedInfo[i][1].quote_unit.toUpperCase()
            const savedInfo = await info.save() 
        }

        // querying database for saved data
        sendResults = await Info.find()
        req.results = sendResults
        next()
    }
    catch {
        res.status(500).send('Error')
    }
}


module.exports = fetch_api

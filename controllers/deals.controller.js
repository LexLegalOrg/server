const { base_url, methods } = require("../utils/url.util")

const errorUtil = require("../utils/error.util")
const axios = require('axios')

let deals = []

module.exports.split_arrays = (items) => {
    try {
        items.deals.forEach(i => {
            deals.push(i)
        })

        items.deals_two.forEach(i => {
            deals.push(i)
        })

        items.deals_third.forEach(i => {
            deals.push(i)
        })
        items.deals_four.forEach(i => {
            deals.push(i)
        })

        return 
    }
    catch (e) {
        console.log(e)
        return false
    }
}

module.exports.getDeals = async (req, res) => {
    try {
        let q_params = "?halt=0&cmd[deals]=crm.deal.list&cmd[deals_two]=crm.deal.list?start=50&cmd[deals_third]=crm.deal.list?start=100&cmd[deals_four]=crm.deal.list?start=150"
        let options = {
            url: base_url.url + methods.batch + q_params,
            method: 'get'
        }

        axios(options)
            .then(async (response) => {
                deals = []

                this.split_arrays(response.data.result.result)

                if(deals.length > 0){
                    res.json(deals)
                }
                else{
                    res.json({status:'err', msg:'can not get data'})
                }
                // res.json({deals:response.data.result.result})
            })
    }
    catch (e) {
        console.log(res)
        errorUtil(res, e)
    }
}



//https://lex-legal.bitrix24.ua/rest/1/lyk5hsc8lky7a2l4/batch.json?halt=0&cmd[deals]=crm.deal.list&cmd[deals_two]=crm.deal.list?start=50&cmd[deals_third]=crm.deal.list?start=100&cmd[deals_four]=crm.deal.list?start=150

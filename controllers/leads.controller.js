const { base_url, methods } = require("../utils/url.util")

const errorUtil = require("../utils/error.util")
const axios = require('axios')
let leads = []
const Deal = require('../models/deals.model')

module.exports.split_arrays = (items) => {
    try {
        items.leads.forEach(i => {
            leads.push(i)
        })

        items.leads_two.forEach(i => {
            leads.push(i)
        })

        items.leads_third.forEach(i => {
            leads.push(i)
        })

        items.leads_fourth.forEach(i=>{
            leads.push(i)
        })

        items.leads_five.forEach(i=>{
            leads.push(i)
        })

        items.leads_six.forEach(i=>{
            leads.push(i)
        })

        items.leads_seven.forEach(i=>{
            leads.push(i)
        })
        items.leads_eight.forEach(i=>{
            leads.push(i)
        })

        return 
    }
    catch (e) {
        console.log(e)
        return false
    }
}

module.exports.getLeads = async (req, res) => {
    try {
        let q_params = "?halt=0&cmd[leads]=crm.lead.list&cmd[leads_two]=crm.lead.list?start=50&cmd[leads_third]=crm.lead.list?start=100&cmd[leads_fourth]=crm.lead.list?start=150&cmd[leads_five]=crm.lead.list?start=200&cmd[leads_six]=crm.lead.list?start=250&cmd[leads_seven]=crm.lead.list?start=300&cmd[leads_eight]=crm.lead.list?start=350"
        let options = {
            url: base_url.url + methods.batch + q_params,
            method: 'get'
        }

        axios(options)
            .then(async (response) => {
                leads = []
                this.split_arrays(response.data.result.result)

                if(leads.length > 0){
                    res.json(leads)
                    
                }
                else{
                    res.json({status:'err', msg:'can not get data'})
                }
            })
    }
    catch (e) {
        console.log(res)
        errorUtil(res, e)
    }
}


module.exports.deleteAll = async (req, res) => {
    try {
        await Deal.remove({})
        res.json({ msg: 'deleted' })
    }
    catch (e) {
        errorUtil(res, e)
    }
}
//https://lex-legal.bitrix24.ua/rest/1/lyk5hsc8lky7a2l4/batch.json?halt=0&cmd[leads]=crm.lead.list&cmd[leads_two]=crm.lead.list?start=50

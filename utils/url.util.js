const env = process.env

module.exports.base_url = {
    url: `${env.BITRIX_URL+env.BITRIX_ROOT_ID}/${env.BITRIX_ROOT}/`
}

module.exports.methods = {
    batch:"batch.json",
    crm:{
        deal:{
            list: "crm.deal.list.json"
        },
        lead:{
            list: "crm.lead.list.json"
        }
    },
    users:{
        get: "user.get.json"
    }
}

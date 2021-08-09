const app = require('./app')

app.listen(process.env.SERVER_PORT, ()=>{
    console.log(process.env.CHECK)
    console.log(`SERVER LAUNCHED ON PORT:${process.env.SERVER_PORT} at ${new Date().getTime()}`)
})


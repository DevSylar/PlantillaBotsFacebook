const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const watson = require("./lib/watson")
const messenger = require("./lib/sendMessage")

app.use(bodyParser.json())

app.get('/webhook', (req, res) => {
    let VERIFY_TOKEN = "KevinJavier"
    let mode = req.query['hub.mode']
    let token = req.query['hub.verify_token']
    let challenge = req.query['hub.challenge']
    if (mode && token) {
      if (mode === 'subscribe' && token === VERIFY_TOKEN) {
        console.log('WEBHOOK_VERIFIED')
        res.status(200).send(challenge)
      } else {
        res.sendStatus(403)
      }
    }
})

app.post('/webhook', (req, res) => { 
    let body = req.body;
    if (body.object === 'page') {
      body.entry.forEach(function(entry) {
        let webhook_event = entry.messaging[0]
        let message = webhook_event.message.text
        let id = webhook_event.sender.id
        watson(message,id,(messages,error)=>{
            messenger(messages,id)
        })
      });
      res.status(200).send('EVENT_RECEIVED')
  
    } else {
      res.sendStatus(404)
    }
})

  app.listen(3000)

const request = require("request")
const builder = require("./buildMessages")
const TOKEN_ACCESS = ""

module.exports = (messages,id)=>{
    if(messages.length > 0)
        forMessages(messages,id,0)
}

function forMessages(messages,id,index){
    let message = messages[index]
    if(message){
        index++
        switch(message["response_type"]){
            case "text":sendMessage(builder.buildMessageText(message["text"],id),()=>forMessages(messages,id,index));break;
        }
    }
}

function sendMessage(message,callback){
    request({
        uri:"https://graph.facebook.com/v2.6/me/messages",
        qs:{"access_token":TOKEN_ACCESS},
        method:"POST",
        json:message
    },(error, response, body)=>{
        if(!error)
            callback()  
    })
}
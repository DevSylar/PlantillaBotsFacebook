
var AssistantV1 = require('watson-developer-cloud/assistant/v1')
const workspaceId = ""
var assistant = new AssistantV1({
  version: '2018-09-20',
  iam_apikey: '',
  url: 'https://gateway.watsonplatform.net/assistant/api'
})

module.exports = async (message,id,callback)=>{
    const responseWatson = await getMessage(message,id)
    let messagesWatson = responseWatson["output"]["generic"]
    if(messagesWatson)
        callback(messagesWatson,false)
    else
        callback(null,true)
}

function getMessage(message,context){
    return new Promise((resolve,reject)=>{
        assistant.message({
            workspace_id: workspaceId,
            input: {'text': message}
          },  function(err, response) {
            if (err){
                reject("Error")
            }
            else{
                resolve(response);
            }
        })
    })
}




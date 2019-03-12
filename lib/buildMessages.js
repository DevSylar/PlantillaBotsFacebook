
module.exports = class {

    static buildMessageText(message,id){
        return {
            "recipient":{
                "id": id
            },
            "message":{
                "text": message
            }
        }
    }

}
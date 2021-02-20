const moment=require('moment');

const messageFormatting=(username,text)=>{
    return {
        username,
        text,
        time:moment().format('hh:mm a')
    }
}
module.exports = messageFormatting;
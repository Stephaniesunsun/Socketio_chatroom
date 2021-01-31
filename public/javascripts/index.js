//this is the client side.
const socket=io();
const listGroup=document.querySelector('.list-group');
const form=document.querySelector('.chat-form');
const submitBtn=document.querySelector('.btn-primary');
const inputField=document.querySelector('#exampleTextarea');
const chatmessage=document.querySelector('.list-group-item-action');

//listen the emit message on server side.    
socket.on('message',message=>{//listen
    //console.log(message)
    outputMassage(message)
    //scroll down
    //chatmessage.scrollTop=chatmessage.scrollHeight;
})
form.addEventListener("submit",e=>{
    e.preventDefault();
    var input=inputField.value;
    //emit message to server
    socket.emit("chatMessage",input)
    //clear input
    e.target.elements[1].value=''
    //e.target.elements.msg.value='';
}
)

const outputMassage=(message)=>{
    const messageContainer=document.createElement('div');
    messageContainer.classList.add('list-group-item','list-group-item-action','flex-column','align-items-start')
    const messageFlex=document.createElement('div');
    messageFlex.classList.add('d-flex','w-100','justify-content-between')
    const user=document.createElement('h5');
    user.classList.add('mb-1');
    user.innerText="Steph"
    const timestamp=document.createElement('small');
    timestamp.innerText="48 sec ago";
    const messageBody=document.createElement('p');
    messageBody.classList.add('mb-1');
    messageBody.innerText=message;
    messageFlex.appendChild(user);
    messageFlex.appendChild(timestamp);
    messageContainer.appendChild(messageFlex);
    messageContainer.appendChild(messageBody);
    listGroup.appendChild(messageContainer);
}
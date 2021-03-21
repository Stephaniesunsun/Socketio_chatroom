const users=[];

//join
function Join(id,username,room){
    const user={id,username,room};
    users.push(user);
    return user;
}

//current user
function getUser(id){
    return users.find(user=>user.id===id);
}
//leave chat
function leave(id){
    const index=users.findIndex(user=>user.id===id)
    if(index!==-1){
        return users.splice(index,1)[0];
    }
}
//get room users
function getRoomUsers(room){
    const currentUsers=users.filter(user=>user.room===room);
    return currentUsers.length
}
module.exports={
    Join,
    getUser,
    leave,
    getRoomUsers
};
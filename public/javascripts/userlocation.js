const lat=document.querySelector('.startLat');
const long=document.querySelector('.startLon');

if(navigator.geolocation){
    console.log('geolocation is supported!')
}else{
    console.log('browser does not support geolocation');
}
window.onload=function(){
    var startPos;
    
    var geoSuccess=function(position){
        startPos=position;
        lat.innerText=startPos.coords.latitude;
        long.innerText=startPos.coords.longitude;
    };
    navigator.geolocation.getCurrentPosition(geoSuccess);
    console.log(position)
};

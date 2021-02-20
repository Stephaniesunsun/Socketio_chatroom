const getLocation=()=>{
    var options={
        enableHighAccuracy : true,
        timeout : 5000,
        maximumAge : 0
    };
    var success=pos=>{
        console.log(`latitude: ${crd.latitude}`);
        console.log(`longitude: ${crd.longitude}`);
    };
    var error=err=>{
        console.warn(`ERROR(${err.code}):${err.message}`);
    };
    navigator.geolocation.getCurrentPosition(success,error,options);
}


function makePromiseCall(methodType, url, callback, async=true, data=null){
    return new Promise(function(resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        console.log("State Change Called. Ready State: "+ xhr.readyState + " Status : "+ xhr.status);
        if(xhr.readyState===4){
          if(xhr.status.toString().match('^[2][0-9]{2}$')){
            resolve(xhr.responseText);
         }else if(xhr.status.toString().match('^[4,5][0-9]{2}$')){
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
            console.log("XHR FAILED");
        }
    }
    }
  xhr.onerror=function(){
    reject({
        status: xhr.status,
        statusText: xhr.statusText
    });
  }
    xhr.open(methodType, url, async);
    if(data){
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    }else xhr.send();
    console.log(methodType+" request sent to the server");
});
}

const getURL = "http://localhost:3000/employees/1";
makePromiseCall("GET", getURL, true)
    .then(responseText => {
        console.log("Get User Data: "+responseText)
})
.catch(error => console.log("GET Error Status: "+ JSON.stringify(error)));

const deleteURL = "http://localhost:3000/employees/4";
makePromiseCall("DELETE", deleteURL, false)
    .then(responseText => {
        console.log(" User Deleted: "+responseText)
})
.catch(error => console.log("DELETE Error Status: "+ JSON.stringify(error)));

const postURL = "http://localhost:3000/employees";
const emplData = {"name":"Harry","salary":"5000"};
makePromiseCall("POST", postURL, true, emplData)
    .then(responseText => {
        console.log(" User Added: "+responseText)
})
.catch(error => console.log("POST Error Status: "+ JSON.stringify(error)));
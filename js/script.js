const tokenCookieName = "accesstoken";
const roleCookieName = "role";
const signoutBtn = document.getElementById("signout-btn");
const apiUrl = "https://localhost:8000/api/";

signoutBtn.addEventListener("click", signout);

getInfosUser();

//Fonction pour récupérer le role en cookie
function getRole(){
    return getCookie(roleCookieName);
}

//Fonction pour se déconnecter
function signout(){
    eraseCookie(tokenCookieName);
    eraseCookie(roleCookieName);
    window.location.reload();
}

//Fonction pour placer le token en cookie
function setToken(token){
    setCookie(tokenCookieName, token, 7);
}

//Fonction pour récupérer le token
function getToken(){
    return getCookie(tokenCookieName);
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(const element of ca) {
        let c = element;
        while (c.startsWith(' ')) c = c.substring(1,c.length);
        if (c.startsWith(nameEQ)) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Fonction pour vérifier si l'utilisateur est connecté
function isConnected(){
    if(getToken() ==null || getToken() == undefined){
        return false;
    }
    else{
        return true;
    }
}

/*
disconnected
connected (admin ou client)
    - admin
    - client
*/

function showAndHideElementsForRoles(){
    const userConnected = isConnected();
    const role = getRole();
    
    let allElementsToEdit = document.querySelectorAll("[data-show]");

    allElementsToEdit.forEach(element => {
        switch(element.dataset.show){
            case "disconnected":
                if(userConnected){
                    element.classList.add("d-none");
                }
                break;
            case "connected":
                if(!userConnected){
                    element.classList.add("d-none");
                }
                break;
            case "admin":
                if(!userConnected || role != "admin"){
                    element.classList.add("d-none");
                }
                break;
            case "client":
                if(!userConnected || role != "client"){
                    element.classList.add("d-none");
                }
                break;
         
        }
    });
}

function sanitizeHtml(text) {
    const tempHtml = document.createElement('div');
    tempHtml.textContent = text;
    return tempHtml.innerHTML;
}

function getInfosUser(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl+"account/me", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {
        console.log(result);
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}
const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");

signoutBtn.addEventListener("click", signout);

//Fonction pour se déconnecter
function signout(){
    eraseCookie(tokenCookieName);
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
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
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

//Test de la fonction isConnected
if(isConnected()){
    alert("Je suis connecté");
}
else{
    alert("Je ne suis pas connecté");
}
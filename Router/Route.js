export default class Route {
    constructor(url, title, pathHtml, authorize, pathJS = "") {
      this.url = url;
      this.title = title;
      this.pathHtml = pathHtml;
      this.pathJS = pathJS;
      this.authorize = authorize;
    }
}

/*
[] -> tout le monde peut accéder à la page
["disconnected"] -> Réserver aux utilisateurs déconnectés
["client"] -> Réserver aux utilisateurs avec le rôle client
["admin"] -> Réserver aux utilisateurs avec le rôle admin
["admin", "client"] -> Réserver aux utilisateurs avec le rôle admin ou client
*/
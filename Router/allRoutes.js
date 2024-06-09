import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html"),
    new Route("/home", "Accueil", "/pages/home.html"),
    new Route("/galerie", "Galerie", "/pages/galerie.html"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", "/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", "/js/auth/signup.js"),
    new Route("/account", "Mon compte", "/pages/auth/account.html"),
    new Route("/editPassword", "Modification de mot de passe", "/pages/auth/editPassword.html"),
    new Route("/allBookings", "Vos réservations", "/pages/bookings/allBookings.html"),
    new Route("/toBook", "Réserver", "/pages/bookings/toBook.html"),
,];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "Quai Antique";
// Importation de la fonction 'redirect' depuis '@sveltejs/kit'.
// Cette fonction est utilisée pour rediriger l'utilisateur vers une autre page si nécessaire.
import { redirect } from '@sveltejs/kit';

// Importation de 'jwtDecode' pour décoder le token JWT.
// JWT (JSON Web Tokens) est un standard ouvert pour la transmission sécurisée d'informations entre parties.
import { jwtDecode } from "jwt-decode";

// Exportation de la fonction asynchrone 'load'.
// Dans SvelteKit, 'load' est utilisée pour charger des données avant le rendu d'un composant.
export async function load({ cookies }) {
    // Récupération du token depuis les cookies.
    // Ce token est généralement utilisé pour l'authentification de l'utilisateur.
    const token = cookies.get("token");
    // Si aucun token n'est trouvé, redirige l'utilisateur vers la page d'accueil.
    if (!token) {
        redirect(303, '/');
    }

    // Décode le token JWT pour obtenir les informations de l'utilisateur, notamment son ID.
    const decoded = jwtDecode(token);

    // Affichage du token pour le débogage (actuellement commenté).
    // console.log(decoded);

    // Affichage du token pour le débogage.
    console.log(cookies.get("token"));

    // Requête GET à l'API pour récupérer les informations du profil de l'utilisateur.
    const affprofil = await fetch(`https://guess-what-back-lih7.onrender.com/user/profile/${decoded.id}`, {
        method: "GET", // Utilisation de la méthode GET pour récupérer des données.
        headers: {
            "Content-Type": "application/json", // Définition du type de contenu attendu.
            // 'Content-Type': 'application/x-www-form-urlencoded', // Autre type de contenu, commenté ici.
            "Authorization": "Bearer " + token // Ajout du token d'authentification dans les en-têtes.
        },                     
    });

    // Traitement de la réponse de l'API et conversion en JSON.
    const resultprofil = await affprofil.json();

    // Affichage des données du profil pour le débogage.
    console.log(resultprofil);

    // Retourne un objet contenant les informations de l'utilisateur.
    // Ces données peuvent être utilisées dans les composants Svelte.
    return {
        user: resultprofil
    };
}
// fin de la fonction 'load'

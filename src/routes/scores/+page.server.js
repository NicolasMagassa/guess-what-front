// Importation de la fonction 'redirect' depuis '@sveltejs/kit'.
// Cette fonction est utilisée pour rediriger l'utilisateur vers une autre page si nécessaire.
import { redirect } from '@sveltejs/kit';

// Exportation de la fonction asynchrone 'load'.
// Dans SvelteKit, cette fonction est utilisée pour charger des données avant le rendu d'un composant.
export async function load({ cookies }) {
  // Récupération du token depuis les cookies.
  // Ce token est généralement utilisé pour l'authentification de l'utilisateur.
  const token = cookies.get("token");

  // Si aucun token n'est trouvé, rediriger l'utilisateur vers la page d'accueil.
  // Le code de statut HTTP 303 indique une redirection "See Other".
  if (!token) {
    redirect(303, '/');
  }
  console.log('token', token); // Affichage du token pour le débogage.

  // Initialisation d'un tableau pour stocker les thèmes récupérés de l'API.
  let themes = [];

  // Requête GET à l'API pour récupérer les thèmes.
  const reponse = await fetch('https://guess-what-back-lih7.onrender.com/themes', {
    method: "GET", // Méthode HTTP GET pour récupérer des données.
    headers: {
      "Content-Type": "application/json", // Spécification du format des données attendues (JSON).
      // 'Content-Type': 'application/x-www-form-urlencoded', // (commenté) Autre type de contenu, non utilisé ici.
    },                     
  });

  // Vérification si la réponse de l'API est correcte (statut 200-299).
  // Si oui, conversion de la réponse en JSON et stockage dans 'themes'.
  if(reponse.ok) {
    themes = await reponse.json();
  }

  // Retourne un objet contenant les thèmes récupérés et le token.
  // Ces données peuvent être utilisées dans les composants Svelte.
  return {
    themes,
    token
  };
}

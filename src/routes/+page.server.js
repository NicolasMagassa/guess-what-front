// Importation de la fonction 'redirect' depuis le package '@sveltejs/kit'.
// Cette fonction est utilisée pour rediriger l'utilisateur vers une autre page si nécessaire.
import { redirect } from '@sveltejs/kit';

// Déclaration d'une fonction asynchrone 'load' qui sera exportée.
// Cette fonction est utilisée pour charger des données avant le rendu d'un composant Svelte.
export async function load() {
  // Requête GET envoyée à une API pour récupérer des données de thèmes.
  // Utilisation de 'fetch' pour faire une requête HTTP vers l'URL spécifiée.
  const reponse = await fetch('https://guess-what-back-lih7.onrender.com/themes', {
    method: "GET", // Méthode HTTP GET pour récupérer des données.
    headers: {
      "Content-Type": "application/json", // Spécification du format des données attendues (JSON).
      // Ligne commentée : Autre option pour le type de contenu, non utilisée ici.
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },                     
  });

  // Traitement de la réponse de l'API : conversion de la réponse en format JSON.
  const result = await reponse.json();

  // Retourne un objet contenant les thèmes récupérés.
  // L'objet 'themes' peut être utilisé dans les composants Svelte pour l'affichage ou d'autres traitements.
  return {
    themes: result
  };
}

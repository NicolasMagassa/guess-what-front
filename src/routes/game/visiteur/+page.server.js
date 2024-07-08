// Importation de la fonction 'redirect' depuis '@sveltejs/kit'.
import { redirect } from '@sveltejs/kit';

// Déclaration d'une fonction asynchrone 'load' qui sera exportée.
// Cette fonction est utilisée dans SvelteKit pour charger des données avant le rendu d'un composant.
export async function load() {
    // Les lignes suivantes sont commentées pour retirer la vérification du token et la redirection.
    // const token = cookies.get("token");
    // if (!token) {
    //     redirect(303, '/');
    // }
    // console.log(cookies.get("token"));

    // Envoie une requête GET à l'API pour récupérer les thèmes.
    const reponse = await fetch('https://guess-what-back-lih7.onrender.com/themes', {
        method: "GET", // Spécifie la méthode HTTP à utiliser (GET pour récupérer des données).
        headers: {
            "Content-Type": "application/json", // Définit le type de contenu attendu en réponse (JSON dans ce cas).
        },
    });

    // Traitement de la réponse de l'API : conversion de la réponse en JSON.
    const result = await reponse.json();

    // Affichage du résultat pour le débogage.
    console.log(result);

    // Retourne un objet avec les thèmes récupérés.
    // Cet objet sera accessible dans les composants Svelte qui utilisent cette fonction 'load'.
    return {
        themes: result
    };
};

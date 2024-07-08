
import { redirect } from '@sveltejs/kit';

// Exportation de la fonction asynchrone 'load' qui sera utilisée pour charger des données avant le rendu d'un composant.

export async function  load({ cookies }) {

// Récupération du token depuis les cookies.

const token = cookies.get("token");

// Si aucun token n'est trouvé, cela signifie que l'utilisateur n'est pas authentifié.
    // Dans ce cas, l'utilisateur est redirigé vers la page d'accueil.


if (!token) {
    redirect(303, '/');
}
// Affichage du token pour le débogage. Utile pour vérifier que le token est correctement récupéré des cookies.
    console.log(cookies.get("token"));

	 // Envoie une requête GET à l'API pour récupérer les thèmes.
	const reponse = await fetch ('https://guess-what-back-lih7.onrender.com/themes', {
		method: "GET",// Méthode HTTP GET pour récupérer des données.
		headers: {
		 "Content-Type": "application/json",// Spécification du format des données attendues (JSON).
		 // 'Content-Type': 'application/x-www-form-urlencoded', // Autre type de contenu, commenté ici.
	   },                     
	 });

	  // Traitement de la réponse de l'API : conversion de la réponse en JSON.
	 const result = await reponse.json();

	// Affichage du résultat pour le débogage. 
	 console.log(result);

	 // Retourne un objet contenant les thèmes récupérés et le token.
    // Ces données peuvent être utilisées dans les composants Svelte.

 return {
	 themes:result,
	 token
 };

	
	};
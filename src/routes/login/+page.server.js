import { redirect } from '@sveltejs/kit';

// Importation des types pour les actions de SvelteKit depuis le fichier '$types'.
// Cela aide pour l'autocomplétion et l'analyse statique dans l'éditeur de code.
/** @type {import('./$types').Actions} */
export const actions = {
    // Définition de l'action par défaut ('default') pour gérer la soumission d'un formulaire.
    default: async ({ request, cookies }) => {
        // Extraction des données du formulaire à partir de la requête.
        const data = await request.formData();
        // Récupération des valeurs des champs 'email' et 'password' du formulaire.
        const email = data.get('email');
        const password = data.get('password');

        // Envoi d'une requête POST à l'API pour l'authentification de l'utilisateur.
        const reponse = await fetch('https://guess-what-back-lih7.onrender.com/signin', {
            method: "POST", // Utilisation de la méthode POST pour envoyer des données.
            headers: {
                "Content-Type": "application/json", // Définition du type de contenu envoyé.
                // 'Content-Type': 'application/x-www-form-urlencoded', // (commenté) Autre type de contenu, non utilisé ici.
            },
            // Conversion des données du formulaire en JSON pour l'envoi.
            body: JSON.stringify({ email, password })
        });

        // Attente et récupération de la réponse de l'API.
        const result = await reponse.json();
        // Affichage de la réponse pour le débogage.
        console.log(result);

        // Gestion de l'erreur, le cas échéant.
        if (result.error) {
            // Si une erreur est retournée par l'API, renvoie un objet avec le statut 401 (non autorisé),
            // le message d'erreur, et redirige vers la page de connexion.
            return {
                status: 401,
                error: result.error,
                headers: {
                    location: '/login',
                },
            };
        }

        // Si l'authentification réussit, stocke le token dans les cookies.
        cookies.set("token", result.token, {
            secure: true, // Assure que le cookie est envoyé uniquement sur HTTPS.
            httpOnly: true, // Rend le cookie inaccessible au JavaScript côté client.
            path: '/' // Définit le chemin pour lequel le cookie est disponible.
        });

        // Redirige l'utilisateur vers la page de profil après une authentification réussie.
        redirect(303, '/profil');
    }
};

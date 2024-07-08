// Importation des types pour les Actions de SvelteKit depuis le fichier '$types'.
// Ceci est utilisé pour l'analyse statique et l'autocomplétion dans certains éditeurs de code.
/** @type {import('./$types').Actions} */
export const actions = {
   // Définition de l'action 'default' pour le formulaire.
   default: async ({ request }) => {
       // Extraction des données du formulaire à partir de la requête.
       const data = await request.formData();
       // Récupération des valeurs des champs du formulaire.
       const username = data.get('username');
       const email = data.get('email');
       const password = data.get('password');
       const passwordConfirm = data.get('passwordConfirm');

       // Envoi d'une requête POST à l'API pour l'inscription de l'utilisateur.
       const reponse = await fetch('https://guess-what-back-lih7.onrender.com/signup', {
           method: "POST", // Utilisation de la méthode POST pour envoyer des données.
           headers: {
               "Content-Type": "application/json", // Définition du type de contenu envoyé.
               // 'Content-Type': 'application/x-www-form-urlencoded', // Autre type de contenu, commenté ici.
           },
           // Conversion des données du formulaire en JSON pour l'envoi.
           body: JSON.stringify({ 
               username,
               email,
               password,
               passwordConfirm,
           })
       });

       // Attente et récupération de la réponse de l'API.
       const result = await reponse.json();
       // Affichage de la réponse pour le débogage.
       console.log(result);
   }
};

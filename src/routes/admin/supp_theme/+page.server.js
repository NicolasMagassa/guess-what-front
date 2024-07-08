import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {

const token = cookies.get("token");
if (!token) {
    redirect(303, '/');
}
// affichage des thèmes dans la liste déroulante
const reponse = await fetch ('https://guess-what-back-lih7.onrender.com/themes', {
           method: "GET",
           headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },                     
        });
        const result = await reponse.json();
        //console.log(result);
  
	return {
		themes:result
	};
}
// fin affichage des thèmes dans la liste déroulante

// récupération de l'id du theme pour l'effacer

export const actions = {
  default: async ({ request,cookies }) => {
      const data = await request.formData();
      const theme = data.get ('theme')     
      const token = cookies.get("token");
      //console.log(answers);
      const deletetheme = await fetch (`https://guess-what-back-lih7.onrender.com/admin/theme/${theme}`, {
         method: "DELETE",
         headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": "Bearer " + token
        },        
         
      });

      const result = await deletetheme.json();
      console.log(result);
      console.log(theme.id);
      return{result}
}
};

// Fin récupération de l'id du theme pour l'effacer

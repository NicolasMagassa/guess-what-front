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
        

	return {
		themes:result
	};
};
// fin affichage des thèmes dans la liste déroulante

// suppression d'une devinette

export const actions = {
  default: async ({ request,cookies }) => {
      const data = await request.formData();
      const theme = data.get ('theme');
      const devinette = data.get ('devinette')     
      const token = cookies.get("token");
      
      const deletedevi = await fetch (`https://guess-what-back-lih7.onrender.com/admin/theme/${theme}/riddle/${devinette}`, {
         method: "DELETE",
         headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": "Bearer " + token
        },        
         
      });

      const result = await deletedevi.json();
      console.log(result);
      console.log(deletedevi);
      return{result}
}
};

// fin suppression d'une devinette
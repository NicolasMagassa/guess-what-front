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
        console.log(result);
  
	return {
		themes:result
	};
}
// fin affichage des thèmes dans la liste déroulante

// Récupération des champs de la devinette

export const actions = {
  default: async ({ request,cookies }) => {
      const data = await request.formData();
      const theme = data.get ('theme')
      
      const content = data.get ('content')  // contenu de la devinette
      const indicator = data.get ('indicator')  // indice
      // const answers recupere les is_good_answer en tableau
      const answers = data.getAll ('is_good_answer').map((answer, index) => {
        if(index === 0) {
          return {
             content : answer,
           is_good_answer: true //la 1ere réponse récupérée est la bonne
          }
        }else{
             return {
             content : answer,
           is_good_answer: false   //les autres réponses récupérées sont fausse
          }
       
        }
      })
      const wiki = data.get ('wiki')   // lien wiki
      const token = cookies.get("token");
      //console.log(answers);
      const reponse = await fetch (`https://guess-what-back-lih7.onrender.com/admin/theme/${theme}/riddle`, {
         method: "POST",
         headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": "Bearer " + token
        },
         body:JSON.stringify({ 
          
          content,
          indicator,
          answers,
          wiki,
          })
         
      });

      const result = await reponse.json();
      console.log(result);
      return{result}
}
};
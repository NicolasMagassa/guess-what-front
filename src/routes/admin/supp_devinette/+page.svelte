<script>
    let devinettes = [];
    export let data;
    export let form;
    console.log(data);

    async function getquestionfromtheme ( id ) { 
        console.log(id);
    const questions = await fetch (`https://guess-what-back-lih7.onrender.com/theme/${id}`, {
    method: "GET",
    
    headers: {
     "Content-Type": "application/json",
     'Access-Control-Allow-Origin': '*',
     // 'Content-Type': 'application/x-www-form-urlencoded',
   }, 
 });
 const result_questions = await questions.json();
 console.log(result_questions);

devinettes=result_questions.riddles

// suppression d'une devinette

const actions = {
  default: async ({ request,cookies }) => {
      const data = await request.formData();
      const theme = data.get ('theme')     
      const token = cookies.get("token");
      
      const deletedevi = await fetch (`https://guess-what-back-lih7.onrender.com/admin/theme/${id}/riddle/${id}`, {
         method: "DELETE",
         headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          "Authorization": "Bearer " + token
        },        
         
      });

      const result = await deletedevi.json();
      console.log(result);
      
      return{result}
}
};

// fin suppression d'une devinette

}

</script>
<main>
    <section id="gestion">
        <h2>Supprimer une devinette</h2>
        <form class="formadmin" action="" method="post">
            <ul>
                <li>
                    <label for="nametheme">choisir un thème : </label>
                    <select on:change={(event)=>getquestionfromtheme(event.target.value)} name="theme" id="theme_select">
                        <option value="">choix theme</option>
                        {#each data.themes as theme , i}
                        <option value="{theme.id}">{theme.name}</option>
                        {/each}
                    </select>
                </li>
            </ul>
            
            <ul>
                <li>
                    <label for="namequestion">choisir une devinette : </label>
                    <select name="devinette" id="devinette_select">
                        {#each devinettes as devinette , i}
                        <option value="{devinette.id}">{devinette.content}</option>
                        {/each}
                    </select>

                </li>             
            </ul>
            
            {#if form && form.result.status === 'success'}
                <p class="succes">La question à bien été effacée</p>
            {/if}

            {#if form && form.result.error}
                <p class="error">{form.result.error}</p>
            {/if}

            <button type="submit">Valider</button>           

        </form>
        
    </section>
  </main>

  <style>
    .error {
        color: red;
    }

    .succes {
        color: green;
    }
  </style>
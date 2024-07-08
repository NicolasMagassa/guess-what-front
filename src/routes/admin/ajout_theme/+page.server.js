export const actions = {
    default: async ({ request,cookies }) => {
        const data = await request.formData();
        const name = data.get ('name')
        const token = cookies.get("token");
        const reponse = await fetch ('https://guess-what-back-lih7.onrender.com/admin/theme', {
           method: "POST",
           headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
            "Authorization": "Bearer " + token
          },
           body:JSON.stringify({ 
            name,
            })
           
        });

        const result = await reponse.json();
        return{result};
	}
};
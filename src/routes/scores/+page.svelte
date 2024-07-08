<script>
  // Exportation de la variable 'data' qui peut être passée au composant depuis son parent.
  export let data;

  // Initialisation des variables d'état du composant.
  let scores = []; // Pour stocker les scores récupérés de l'API.
  let isSelected = false; // Pour suivre si un thème a été sélectionné.

  // Fonction asynchrone déclenchée lors du changement de sélection dans le menu déroulant.
  async function handleChange(event) {
    isSelected = true; // Mise à jour de l'état pour indiquer qu'un thème est sélectionné.
    const themeId = event.target.value; // Récupération de l'ID du thème sélectionné.

    // Requête à l'API pour récupérer les scores maximums pour le thème sélectionné.
    const result = await fetch(`https://guess-what-back-lih7.onrender.com/user/theme/${themeId}/play`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${data.token}` // Inclusion du token d'authentification dans les en-têtes.
      }
    });

    // Traitement de la réponse de l'API et mise à jour des scores.
    const maxScores = await result.json();
    console.log(maxScores); // Affichage des scores maximums pour le débogage.
    scores = maxScores; // Mise à jour de l'état des scores avec les nouvelles données.
  }
  
</script>

<main>
  <!-- Section pour la sélection du thème -->
  <section id="theme-selector">
    <label for="theme_select">Choisissez un thème :</label>
    <select on:change={handleChange} name="theme" id="theme_select">
      <option>-- Choisissez un thème --</option>
      <!-- Boucle sur chaque thème disponible dans 'data.themes' -->
      {#each data.themes as theme, i}
        <option value="{theme.id}">{theme.name}</option>
      {/each}
    </select>
  </section>

  <!-- Section pour l'affichage des scores -->
  <section id="scoreboard">
    <h2>Top Scores</h2>
    <table>
      <thead>
        <tr>
          <th>Rang</th>
          <th>Pseudo</th> <!-- Colonne pour les pseudos -->
          <th>Score</th>
          <th>nbr indice</th>
          <th>nbr erreur</th>
        </tr>
      </thead>
      <tbody>
        <!-- Condition pour vérifier s'il y a des scores à afficher -->
        {#if scores[0]}
        {#each scores as score, index}
          <tr>
            <td>{index + 1}</td>
            <td>{score.username}</td> <!-- Affichage du pseudo du joueur -->
            <td>{score.maxScore}</td>
            <td>{score.count_indicators}</td>
            <td>{score.errors}</td>
          </tr>
        {/each}
        {:else if isSelected && !scores[0]}
          <!-- Message affiché s'il n'y a pas de scores pour le thème sélectionné -->
          <p>Aucun score enregistré pour ce thème</p>
        {/if}
      </tbody>
    </table>
  </section>
</main>

<script>
  // Exportation de la variable 'data', qui permet de recevoir des données depuis le composant parent.
  export let data;

  // Importation du hook 'onMount' depuis 'svelte', utilisé pour exécuter du code une fois que le composant est monté.
  import { onMount } from 'svelte';

  // Définition des variables d'état du composant.
  let selectedTheme = 'default'; // Thème sélectionné par défaut.
  let themes = data.themes; // Liste des thèmes récupérée depuis 'data'.
  let questions = []; // Liste des questions pour le thème sélectionné.
  let themeScores = {}; // Scores par thème.
  let themeIncorrectAnswers = {}; // Compteur de mauvaises réponses par thème.
  let isValidate = false; // Indicateur pour savoir si les réponses ont été validées.

  // Fonction asynchrone déclenchée lors du changement de thème.
  async function handleThemeChange(event) {
    selectedTheme = event.target.value;
    // Requête à l'API pour récupérer les énigmes du thème sélectionné.
    const response = await fetch(`https://guess-what-back-lih7.onrender.com/theme/${selectedTheme}`);
    if (response.ok) {
      const data = await response.json();
      questions = data.riddles; // Mise à jour des questions pour le thème sélectionné.
    }
  }

  // Affichage des scores par thème pour le débogage.
  console.log('theme scores', themeScores);

  // Fonction pour vérifier la réponse à une question.
  async function checkAnswer(answer, questionId) {
    // Initialisation du score pour le thème sélectionné s'il n'existe pas.
    if(!themeScores[selectedTheme]){
      themeScores[selectedTheme] = 0;
    }
    // Recherche de l'index de la question dans la liste des questions.
    const questionIndex = questions.findIndex(q => q.id === questionId);
    if (questionIndex !== -1) {
      // Si la réponse est correcte, augmenter le score.
      if (answer.is_good_answer) {
        themeScores[selectedTheme] += 2;
      } else {
        // Sinon, augmenter le compteur de mauvaises réponses.
        themeIncorrectAnswers[selectedTheme]++;
      }
    }
    // Désactivation des boutons de réponse une fois une réponse choisie.
    const btnAnswers = document.querySelectorAll(`#answers-${questionId} button`);
    btnAnswers.forEach((btnAnswer) => {
      btnAnswer.setAttribute('disabled', true);
    });
  }
</script>

<main>
  <!-- Section pour la sélection du thème -->
  <div class="top-section">
    <div class="theme-section">
      <label for="theme-select">Choix du thème :</label>
      <select id="theme-select" on:change={handleThemeChange}>
        <option> -- Choisissez un thème --</option>
        {#each themes as theme , i}
          <option value="{theme.id}">{theme.name}</option>
        {/each}
      </select>
    </div>
  </div>

  <!-- Boucle sur chaque question pour le thème sélectionné -->
  {#each questions as question}
    <div class="question-section">
      <span>Question :</span>
      <div class="question-box">
        {question.content}
      </div>
    </div>
    <div id={`answers-${question.id}`} class="answers-section">
      {#each question.answers as answer}
        <!-- Boutons pour chaque réponse, déclenchant 'checkAnswer' au clic -->
        <button on:click={() => checkAnswer(answer, question.id)} disabled={isValidate}>{answer.content}</button>
      {/each}
    </div>
  {/each}

  <!-- Bouton pour valider les réponses -->
  {#if !isValidate}
    <button on:click={() => isValidate = true} disabled={themeScores[selectedTheme] === undefined}>valider</button>
  {/if}

  <!-- Affichage du score une fois les réponses validées -->
  {#if isValidate}
    Vous avez obtenu un score de {themeScores[selectedTheme]}. Pour l'enregistrer, veuillez vous <a href='/register'>inscrire</a>
  {/if}
</main>
<style>
  /* Styles CSS pour les différentes sections et boutons */
</style>

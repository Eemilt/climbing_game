const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML =
    highScores.map( Score => {
        return `<li class="high-score">${Score.name} - ${Score.finalscore}</li>`;
        }).join("");
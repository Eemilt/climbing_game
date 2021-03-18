const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


highScoresList.innerHTML =
    highScores.map( Score => {
        return `<li>${Score.name} - ${Score.finalscore}</li>`;
        }).join("");
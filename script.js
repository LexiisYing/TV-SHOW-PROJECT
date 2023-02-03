//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makeSeasonAndEpisode(episode) {
  const { season, number } = episode;
  // the above is the same as the two lines below (this is from react)
  // it's called OBJECT destructuring
  // const season = episode.season;
  // const number = episode.number;
  const paddedSeason = season.toString().padStart(2, "0");
  const paddedEpisode = number.toString().padStart(2, "0");
  return `S${paddedSeason}E${paddedEpisode}`;

}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  
    allEpisodes.forEach((episode) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = `${makeSeasonAndEpisode(episode)}:
      ${episode.name}`;
      rootElem.appendChild(paragraph);
      
      const image = document.createElement("img");
      image.src = episode.image.medium;
      rootElem.appendChild(image);
      
      rootElem.innerHTML += episode.summary;


    });

}


window.onload = setup;

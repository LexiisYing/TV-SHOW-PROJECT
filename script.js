// //You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
// }

//const allShows = getAllShows();


const rootElem = document.getElementById("root");
async function setup() {
  try {
    const response = await fetch("https://api.tvmaze.com/shows/82/episodes");
  let result = await response.json();
    makePageForEpisodes(result);
    episodeSelector(result);
    searchItem(result);
    displayingAllEpisodesLength(result);
  } catch (error) {
    console.log(error);
  }
};

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
  
  // clear out the rootElemrnt's HTML before adding more stuff
  rootElem.innerHTML = "";

  const countParagraph = document.createElement("p");
  countParagraph.innerText = `Showing ${allEpisodes.length} episodes`;
  rootElem.appendChild(countParagraph);
  
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

const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", (event) => {
  const searchString = event.target.value.toLowerCase();
  const filteredEpisode = getAllEpisodes().filter((episode) => {
    if (episode.summary.toLowerCase().includes(searchString)) {
      return true;
    }
    if (episode.name.toLowerCase().includes(searchString)) {
      return true;
    }
    return false;
  });
  makePageForEpisodes(filteredEpisode);
})


window.onload = setup;

const selectElement = document.getElementById("drop-menu");
const allEpisodes = getAllEpisodes();
for (let increment = 0; increment < allEpisodes.length; increment++) {
  let movieOption = document.createElement("option");
  const nameOfSeason = allEpisodes[increment].season;
  const episodeNumber = allEpisodes[increment].number;
  if (episodeNumber < 10) {
    const episodeCodeDiv = `S0${nameOfSeason}E0${episodeNumber}`;
    movieOption.value = allEpisodes[increment].name;
    movieOption.text = episodeCodeDiv + " - " + allEpisodes[increment].name;
  } else if (episodeNumber >= 10) {
    const episodeCodeDiv = `S0${nameOfSeason}E${episodeNumber}`;
    movieOption.value = allEpisodes[increment].name;
    movieOption.text = episodeCodeDiv + " - " + allEpisodes[increment].name;
  }
  selectElement.appendChild(movieOption);
}

selectElement.addEventListener("change", (event) => {
  const keyValue = event.target.value;
  console.log(keyValue);
  const filteredEpisode = allEpisodes.filter((episode) => {
    return episode.name === keyValue;
  })
  makePageForEpisodes(filteredEpisode);
});
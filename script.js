//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(allEpisodes) {
  const rootElem = document.getElementById("root");
  
    allEpisodes.forEach((episode) => {
      const paragraph = document.createElement("p");
      paragraph.textContent = `S${episode.season}E${episode.number}:
      ${episode.name}`;
      rootElem.appendChild(paragraph);
      
      const image = document.createElement("img");
      image.src = episode.image.medium;
      rootElem.appendChild(image);
      

    });

  //rootElem.textContent = `Got ${allEpisodes.length} episode(s)`;
}


window.onload = setup;

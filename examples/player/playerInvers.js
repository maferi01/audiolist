/**
 *  Template for every File
 * @param {} data 
 */
function getTemplate(data) {
  const html = `<li>
<div class="card">
  <div class="card-content">
    <div class="content">
      <div class="name">${data.title}</div>
      <div class="description">${data.file}</div>
      <div class="time"> </div>
      <div class="playaction action ">PLAY</div>
      <div class="stopaction action">STOP</div>
    </div>
  </div>
</div>
</li>`;
  return html;
}

/**
 * Create elment DOM for sound File
 * @param {*} data 
 */
function createElementItemPlayer(data, playCall,playerData) {
  const divItem = document.createElement("div");
  divItem.innerHTML = getTemplate(data);
  const play = divItem.querySelector(".playaction");
  const stop = divItem.querySelector(".stopaction");
  const time = divItem.querySelector(".time");
  stop.style.display = "none";

  data.howl = new Howl({
   // src: ["./audio/" + data.file + ".webm", "./audio/" + data.file + ".mp3"],
   src: [ data.file ],
   html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
    onplay: function () {
      // Display the duration.
      play.style.display = "none";
      stop.style.display = "block";
    },
    onload: function () {
      const timeplay = data.howl.duration();
      time.textContent = timeplay;
      data.duration= timeplay;
    },

    onend: function () {
      play.style.display = "block";
      stop.style.display = "none";
    },

    onstop: function () {
      play.style.display = "block";
      stop.style.display = "none";
    },
  });

  play.addEventListener("click", function () {
    if(playerData.howCurrent){
      playerData.howCurrent.stop();
    }
    data.howl.play();
    playerData.howCurrent=data.howl;
    playCall(data)
    
  });

  stop.addEventListener("click", function () {
    data.howl.stop();
  });

  return divItem;
}


/**
 * Create Player list from listplay  
 * @param {*} idContainer 
 * @param {*} listPlay 
 */
function playerlist(idContainer,listPlay,playCall){
  const playerData={howCurrent:null};

  const playerCont = document.getElementById(idContainer);

  listPlay.forEach(function (data) {
    playerCont.appendChild(createElementItemPlayer(data,playCall,playerData));
  });
  
}   




const listPlay=[
  {
    title: 'Rave Digger',
    file: 'rave_digger',
    howl: null
  },
  {
    title: '80s Vibe',
    file: '80s_vibe',
    howl: null
  },
  {
    title: 'Running Out',
    file: 'running_out',
    howl: null
  }
]


function getTemplate(data){

const html=`<li>
<div class="card">
  <div class="card-content">
    <div class="content">
      <div class="name">${data.title}</div>
      <div class="description">${data.file}</div>
      <div class="playaction action ">PLAY</div>
      <div class="stopaction action">STOP</div>
    </div>
  </div>
</div>
</li>`;
return html;

}


function createElementItemPlayer(data){
  const divItem = document.createElement('div');
  divItem.innerHTML=getTemplate(data)
  const play=divItem.querySelector('.playaction');
  const stop=divItem.querySelector('.stopaction');
  stop.style.display='none'

  data.howl = new Howl({
    src: ['./audio/' + data.file + '.webm', './audio/' + data.file + '.mp3'],
    html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
    onplay: function() {
      // Display the duration.
      
    }
  });
  
  
  play.addEventListener("click", function(){
    //alert('pulsado en'+data.title)
    data.howl.play();
    play.style.display='none'
    stop.style.display='block'
  }); 

  stop.addEventListener("click", function(){
    //alert('pulsado en'+data.title)
    data.howl.stop();
    play.style.display='block'
    stop.style.display='none'
  });


  return divItem;
}



const playerCont = document.getElementById('player-container')


listPlay.forEach(function(data){

  playerCont.appendChild(createElementItemPlayer(data));    


})

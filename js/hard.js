function changeCurrent(ev){
    const sidebar=document.querySelector('.sidebar');
    for(var i=0;i<sidebar.childElementCount;i++){
        if(sidebar.children[i].classList.contains('active')){
            sidebar.children[i].classList.remove('active')
        }    
    }
    const currentElement=ev.srcElement;
    currentElement.classList.toggle('active'); 
}
const video=videojs('vjsPlayer',{
    controls:true
})

videojs('vjsPlayer', {}, function() {
    var ratioVolume = 0.5;
    var audioDescription = document.getElementById('audiodescription');
    if ( audioDescription ) {
        
        var ADButton = this.controlBar.addChild('button');
        
        ADButton.el_.classList.add('vjs-icon-audio-description');
        ADButton.el_.style.fontSize='1.8em'
          
        ADButton.el_.style.width='2em'  
        ADButton.el_.title='Audio description'
        
        //on redéfini les volumes
        audioDescription.volume = 0;
        this.volume( ratioVolume );
        
        //toggle sur le bouton pour "mute" l'audio-description ou non
        ADButton.on('click', function( e ) {
            if( audioDescription.volume ){
                audioDescription.volume = 0;
                ADButton.el_.style.color='white' 
  
            } else {
              ADButton.el_.style.color='red' 
                audioDescription.volume = 0.5;
            }
        });
        this.on('play', function() {
            if ( audioDescription.paused ) {
                audioDescription.play();
            }
        });
  
        this.on('pause', function() {
            if (  this.currentTime()<=170) {
              console.log('enter');
                audioDescription.pause();
            }
        });
  
        this.on('ended', function() {
            this.pause();
            //audioDescription.pause();
        });
  
        this.on('volumechange', function() {
          if( audioDescription.volume ) {
            audioDescription.volume = this.volume();
          }
        });
      
        this.on('timeupdate', function() {
            if ( audioDescription.readyState >= 4 ) {
                if( Math.ceil(audioDescription.currentTime) != Math.ceil(this.currentTime()) ) {
                    audioDescription.currentTime = this.currentTime();
                }
            }
        });
    }
  });
 
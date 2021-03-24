  
var time;
function PlayPause(){

    var icon1= document.getElementById("play_pause_icon");
    var video1 = document.getElementById("harry");
    var audio1 = document.getElementById("adesc1");

    if(video1.paused)
    {
        icon1.classList.replace("fa-play-circle", "fa-pause-circle");
        console.log("Start Playing");
        video1.play();
    }
    else
    {
        icon1.classList.replace("fa-pause-circle", "fa-play-circle");
        video1.pause();
        audio1.pause();
        console.log("Stop Playing");
    } 

    if(video1.ended)
    {
    icon1.classList.replace("fa-pause-circle", "fa-play-circle");
    video1.currentTime = 0;
    video1.play();
    }  
}
function audioDesc(){
    
    var ic = document.getElementById("ad");
    var btn = document.getElementById("audioDesc");
    var state = btn.getAttribute("data-ad");
    var video1 = document.getElementById("harry");
    var audio1 = document.getElementById("adesc1");

    ic.classList.toggle("pressed");

    if(state == "OFF")
    {
       btn.setAttribute("data-ad", "ON");
       if(!(video1.paused))
       {
       video1.pause()    
       time = video1.currentTime;
       audio1.currentTime = time;
       video1.play();
       audio1.play();
        }  
    }
    
    else{
        btn.setAttribute("data-ad", "OFF");
        audio1.pause();
    }
}

 
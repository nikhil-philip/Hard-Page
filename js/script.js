function changeCurrent(ev) {
  const sidebar = document.querySelector(".sidebar");
  for (var i = 0; i < sidebar.childElementCount; i++) {
    if (sidebar.children[i].classList.contains("active")) {
      sidebar.children[i].classList.remove("active");
    }
  }
  const currentElement = ev.srcElement;
  currentElement.classList.toggle("active");
}
var synth = window.speechSynthesis;
//live-time
const timeNow = document.querySelector(".timeNow");
const captionText = document.querySelector(".captionText");
if (timeNow) {
  timeNow.addEventListener("click", timeNowClicked);
  function timeNowClicked() {
    timeNow.disabled = true;
    setTimeout(() => {
      captionText.classList.toggle("hidden");
      timeNow.disabled = false;
    }, 5000);
    var d = new Date();
    var hour = d.getHours();
    var minite = d.getMinutes();
    var seconds = d.getSeconds();

    var utterThis = new SpeechSynthesisUtterance(
      `The current time is ${hour} hour ${minite} minutes ${seconds} seconds`
    );
    synth.speak(utterThis);
    if (synth.speaking) {
      captionText.classList.toggle("hidden");
      captionText.innerText = `The current date is ${hour} hour ${minite} minutes ${seconds} seconds`;
    } else {
      captionText.innerText = `Sorry! Your browser doesn't support this feature`;
    }
  }
}

let isFullscreen = false;

/*G to fullscreen*/
document.onkeyup = function (e) {
  if (e.which == 71) {
    var elem = document.documentElement;
    if (!isFullscreen) {
      isFullscreen = true;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Safari */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE11 */
        elem.msRequestFullscreen();
      }
    } else {
      isFullscreen = false;
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        /* Safari */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        /* IE11 */
        document.msExitFullscreen();
      }
    }
  }
};

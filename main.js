// Grab webcam

// if using node.js to turn it into an app you can refernce the navigator by uncommenting this section
// if you're just running it through a browser it should pull the navigator from it by default
// global.navigator = {
//  userAgent: 'node.js'
// };

navigator.getUserMedia = ( navigator.getUserMedia ||
navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia ||
navigator.msGetUserMedia);

var video;
var webcamStream;

// initialize webcam
function startWebcam() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia (

  // constraints
  {
     video: true,
     audio: false
  },

  // successCallback
  function(localMediaStream) {
    video = document.querySelector('video');
     
    try {
    video.srcObject = localMediaStream;
    webcamStream = localMediaStream;
    } catch (error) {
    video.src = window.URL.createObjectURL(localMediaStream);
    }
  },

  // errorCallback
  function(err) {
    console.log("The following error occured: " + err);
  }
    );
  } else {
      console.log("getUserMedia not supported");
  }
    
}

// stop webcam
function stopWebcam() {
    var track = webcamStream.getTracks()[0];
    track.stop();
}

// take picture
var canvas, ctx;

function init() {
  // Get the canvas and obtain a context for
  // drawing in it
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');
}

 function snapshot() {
    // Draws current image from the video element into the canvas
   ctx.drawImage(video, 0,0, canvas.width, canvas.height);
 }

 // webview
onload = () => {
  const webview = document.querySelector('webview')
  const indicator = document.querySelector('.indicator')

  const loadstart = () => {
    indicator.innerText = 'loading...'
  }

  const loadstop = () => {
    indicator.innerText = ''
  }

  webview.addEventListener('did-start-loading', loadstart)
  webview.addEventListener('did-stop-loading', loadstop)
}
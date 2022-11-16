const trackBtn = document.getElementById('track-btn');
const log = document.getElementById('log');

let isTracking = false;
let trackingIntervalId;
let currentData;

trackBtn.onclick = () => {

  if (isTracking) {
    stopTrack();
  } else {
    startTrack();
  }
}

function stopTrack() {
  isTracking = false;
  window.clearInterval(trackingIntervalId)
}

function startTrack() {
  
  currentData = {};
  trackingIntervalId = window.setInterval(() => {
    collectEntry();
    log.innerText = JSON.stringify(currentData.coords);
  }, 2000);
  
  isTracking = true;
}

function collectEntry() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      currentData = toObj(position)
    });
  } else { 
    console.error("Geolocation is not supported by this browser.")
  }
}


function toObj(obj) {
  if (obj === null || !(obj instanceof Object)) {
    return obj;
  }
  const tmp = (obj instanceof Array) ? [] : {};
  for (const key in obj) {
    tmp[key] = toObj(obj[key]);
  }
  return tmp;
}

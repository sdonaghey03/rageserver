var svg = document.getElementById('app'),
  items = svg.querySelectorAll('.item'),
  trigger = document.getElementById('trigger'),
  label = trigger.querySelectorAll('#label')[0],
  open = true,
  angle = 45;

trigger.addEventListener('click', toggleMenu, false);

items.forEach(item => {
  item.addEventListener('click', selectStation, false);
});

function selectStation(event) {
  if (!event) event = window.event;
  event.stopPropagation();

  var audioContainer = document.getElementById("audio-container");
  var stationURL = event.target.parentElement.getAttribute("data-radio");
  audioContainer.innerHTML = `<div id="audio-container">\n` +
    `    <audio id="audio-control" preload="metadata">\n` +
    `      <source id="source-url" src="${stationURL}">\n` +
    `      Unfortunately your browser doesn't support html5 audio streaming, please update your browser.\n` +
    `      //Here is where you would add a flash player fallback also!\n` +
    `    </audio>\n` +
        `  </div>`;
    var source = document.getElementById("audio-control");

    var playPromise = source.play();

    if (playPromise !== undefined) {
        playPromise.then(_ => {
            console.log("PLAYING RADIO");
        })
        .catch(error => {
            console.log("ERROR: " + error);
        });
    }
}

function toggleMenu(event) {
  if (!event) event = window.event;
  event.stopPropagation();

  open = !open;
  if (open) {
    closeMenu();
    label.innerHTML = "-";
    svg.style.pointerEvents = "auto";
  } else {
    openMenu();
    label.innerHTML = "+";
    svg.style.pointerEvents = "none";
  }
}

function closeMenu() {
  var tl = new TimelineLite();
  tl.to(items, 0.2, { scale: 1, ease: Back.easeOut.config(4) }, 0.05);
  for (var i = 0; i < items.length; i++) {
    if (window.CP.shouldStopExecution(0)) break;

    tl.to(items[i], 0.7, { rotation: -i * angle + "deg", ease: Bounce.elastic }, 0.35);
  }
  window.CP.exitedLoop(0);
}

function openMenu() {
  var tl = new TimelineLite();
  for (var i = 0; i < items.length; i++) {
    if (window.CP.shouldStopExecution(1)) break;

    tl.to(items[i], 0.3, { rotation: 0, ease: Circ.easeOut }, 0.05);
  }
  window.CP.exitedLoop(1);
  tl.to(items, .3, { scale: 0, ease: Back.easeIn }, 0.3);
}

svg.onclick = function (e) {
  e.stopPropagation();
};

const app = new Vue({
    el: '#app',
    methods: {
        exit: function () {
            mp.trigger("cRadio-Close");
        },
    },
});
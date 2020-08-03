var tracklist = ["The Less I Know The Better", "Nangs", "The Moment", "Yes I'm Changing", "Eventually", "Gossip", "Let It Happen", "Past Life", "Disciples", "'Cause I'm A Man"];
var volLevels = [];

function init() {
  var i;
  // get volume levels
  for (i=0; i < 6; i++) {
    volLevels[i] = document.getElementById('vl' + i);
  }
  // set first three to fill
  for (i=0; i < 3; i++) {
    document.getElementById('vl' + i).classList.replace("volume-level", "volume-filled");
  }

  document.getElementById('player-song-name').innerHTML = tracklist[0];
};

function volUp() {
  var i;

  for (i = 0; i < 6; i++){
    if (document.getElementById('vl' + i).classList.contains("volume-level")) {
      document.getElementById('vl' + i).classList.replace("volume-level", "volume-filled");
      break;
    }
  }
}

// opposite of volUp
function volDown() {
  var i;

  for (i = 5; i >= 0; i--){
    if (document.getElementById('vl' + i).classList.contains("volume-filled")) {
      document.getElementById('vl' + i).classList.replace("volume-filled", "volume-level");
      break;
    }
  }
}

function switchPlay() {
  // play and pause buttons
	if (document.getElementById('playbutton').innerHTML == 'play_arrow') {
		document.getElementById('playbutton').innerHTML = 'pause';
	}
  else {
		document.getElementById('playbutton').innerHTML = 'play_arrow';
	}

	var finger = setInterval(fingerSlide, 1000);

	function fingerSlide() {
		var val = document.getElementById('slider').value;
		var time = secondsToMs(val);

		if (document.getElementById('playbutton').innerHTML == 'play_arrow') {
			clearInterval(finger);
		}
    else {
			document.getElementById('slider').stepUp(1);
			document.getElementById('start-song').innerHTML = time;

      // if song has finished playing, move on to the next song
			if (val == 180) {
				nextSong();
			}
		}
	}
}

function nextSong() {
	document.getElementById('start-song').innerHTML = '0:00';
	document.getElementById('slider').value = 0;
  // find index of current song
	var track = document.getElementById('player-song-name').innerHTML
	var i = tracklist.indexOf(track);

	// wrap song list
	if (i == (tracklist.length - 1)) {
		document.getElementById('player-song-name').innerHTML = tracklist[0];
	} else {
		document.getElementById('player-song-name').innerHTML = tracklist[i + 1];
	}
}

function prevSong() {
	document.getElementById('start-song').innerHTML = '0:00';
	document.getElementById('slider').value = 0;

	var track = document.getElementById('player-song-name').innerHTML
	var i = tracklist.indexOf(track);
	var tlength = tracklist.length;

	//change song name
	if (i == 0) {
		document.getElementById('player-song-name').innerHTML = tracklist[tlength-1];
	} else {
		document.getElementById('player-song-name').innerHTML = tracklist[i-1];
	}
}

function secondsToMs(d) {
    d = Number(d);

    var min = Math.floor(d / 60);
    var sec = Math.floor(d % 60);

    return `0${min}`.slice(-1) + ":" + `00${sec}`.slice(-2);
}

init();

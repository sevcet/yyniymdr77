// Učitavanje YouTube IFrame API-ja
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 't0pLLevYGiY', // Zameni sa stvarnim YouTube ID-om videa
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    console.log("Player je spreman.");
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log("Video se reprodukuje.");
    } else if (event.data == YT.PlayerState.PAUSED) {
        console.log("Video je pauziran.");
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log("Video je završen.");
    }
}

// Dodavanje događaja za taster "Enter" ili "OK"
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        var playerState = player.getPlayerState();
        if (playerState === YT.PlayerState.PAUSED || playerState === YT.PlayerState.ENDED) {
            player.playVideo(); // Pusti video ako je pauziran ili završen
        } else if (playerState === YT.PlayerState.PLAYING) {
            player.pauseVideo(); // Pauziraj video ako je već u reprodukciji
        }
    }
});

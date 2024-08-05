// Dohvati iframe
var iframe = document.getElementById("myFrame");
var player;

// Kada se iframe učita, pristupi YouTube playeru
iframe.onload = function() {
    player = iframe.contentWindow.YT.player;

    // Opcija 1: Pokreni video sa zvukom odmah
    player.playVideo();

    // Opcija 2: Pokreni video bez zvuka, a zatim uključi zvuk nakon 5 sekundi
    // player.playVideo();
    // player.mute();
    // setTimeout(function() {
    //     player.unMute();
    // }, 5000);
};

document.getElementById('contentFrame').addEventListener('load', function() {
    var iframeWindow = this.contentWindow;
    var iframeDoc = iframeWindow.document;

    // Blokiraj sve poznate elemente oglasa
    var adSelectors = ['.ad', '.ads', '.advertisement', '.banner', '.pop-up', '.sponsored', '.video-ad', '[id^="ad"]', '[class*="ad"]', '[class*="sponsor"]', '[class*="banner"]'];
    adSelectors.forEach(function(selector) {
        var adElements = iframeDoc.querySelectorAll(selector);
        adElements.forEach(function(ad) {
            ad.style.display = 'none';
        });
    });

    // Spreči otvaranje novih prozora i pop-up prozora
    iframeWindow.open = function() {
        return null;
    };
    iframeWindow.alert = iframeWindow.confirm = iframeWindow.prompt = function() {
        return false;
    };

    // Spreči otvaranje novih prozora i tabova
    var links = iframeDoc.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].setAttribute('target', '_self');
    }

    // Simuliraj klik na sredini stranice 2 sekunde nakon učitavanja
    setTimeout(function() {
        var bodyRect = iframeDoc.body.getBoundingClientRect();
        var middleX = bodyRect.width / 2;
        var middleY = bodyRect.height / 2;

        var event = new MouseEvent('click', {
            view: window,
            bubbles: true,
            cancelable: true,
            clientX: middleX,
            clientY: middleY
        });

        iframeDoc.dispatchEvent(event);
    }, 2000);

    // Ukloni sve skripte koje mogu učitati oglase
    var scripts = iframeDoc.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('ads') || scripts[i].innerHTML.includes('ads')) {
            scripts[i].remove();
        }
    }

    // Fokusiranje i pokretanje YouTube videa pritiskom na dugme "Enter"
    document.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            var playButton = iframeDoc.querySelector(".ytp-large-play-button");
            if (playButton) {
                playButton.focus(); // Fokusiraj dugme
                playButton.click(); // Klikni na dugme
            } else {
                console.warn('Large play button not found.');
            }
        }
    });
});

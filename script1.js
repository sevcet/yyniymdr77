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

    // Spreči sve pop-up prozore i nove tabove
    iframeWindow.open = function() {
        return null;
    };

    // Onemogući otvaranje novih prozora preko window.open
    iframeWindow.open = function() {
        return null;
    };

    // Spreči sve dodatne pop-up metode
    iframeWindow.alert = iframeWindow.confirm = iframeWindow.prompt = function() {
        return false;
    };

    // Onemogući target="_blank" linkove
    var links = iframeDoc.getElementsByTagName('a');
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            event.preventDefault(); // Spreči podrazumevano ponašanje
            this.setAttribute('target', '_self');
            iframeWindow.location.href = this.href; // Otvori u istom iframe-u
        });
    }

    // Onemogući window.open, postMessage, i sve metode koje mogu otvoriti novi prozor
    iframeWindow.open = iframeWindow.postMessage = function() {
        return null;
    };

    // Dodatne sigurnosne mere
    var originalAddEventListener = iframeWindow.addEventListener;
    iframeWindow.addEventListener = function(type, listener) {
        if (type === 'unload') {
            return; // Spreči dodavanje unload događaja
        }
        originalAddEventListener.call(this, type, listener);
    };

    // Ukloni sve skripte koje mogu učitati oglase
    var scripts = iframeDoc.getElementsByTagName('script');
    for (var i = 0; i < scripts.length; i++) {
        if (scripts[i].src.includes('ads') || scripts[i].innerHTML.includes('ads')) {
            scripts[i].remove();
        }
    }

    // Dodatne metode za sprečavanje reklama
    iframeDoc.head.innerHTML += '<style>.ad, .ads, .advertisement, .banner, .pop-up, .sponsored, .video-ad, [id^="ad"], [class*="ad"], [class*="sponsor"], [class*="banner"] { display: none !important; }</style>';
});

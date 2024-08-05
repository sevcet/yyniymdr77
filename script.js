function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
    } else {
        sidebar.style.left = '0px';
    }
}

function searchMovies() {
    const input = document.getElementById('search-input').value.toLowerCase();
    const movieCards = document.querySelectorAll('.movie-card');
    let found = false;

    movieCards.forEach(card => {
        const title = card.querySelector('.movie-info h3').textContent.toLowerCase();
        if (title.includes(input)) {
            card.style.display = 'block';
            found = true;
        } else {
            card.style.display = 'none';
        }
    });

    if (found) {
        window.scrollTo({ top: document.querySelector('.movie-grid').offsetTop, behavior: 'smooth' });
    }
}

// Funkcija za prikazivanje virtuelne tastature
function showKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    keyboard.style.display = 'block';
}

// Funkcija za unos teksta sa virtuelne tastature
function addCharacter(char) {
    const input = document.getElementById('search-input');
    input.value += char;
    input.focus(); // Fokusiraj input polje nakon dodavanja karaktera
}

// Funkcija za brisanje poslednjeg karaktera
function deleteCharacter() {
    const input = document.getElementById('search-input');
    input.value = input.value.slice(0, -1);
    input.focus(); // Fokusiraj input polje nakon brisanja karaktera
}

// Funkcija za potvrdu pretrage
function confirmSearch() {
    searchMovies(); // Poziva funkciju za pretragu
    document.getElementById('virtual-keyboard').style.display = 'none'; // Sakriva tastaturu
}

// Povezivanje prikazivanja tastature na fokus input polja
document.getElementById('search-input').addEventListener('focus', showKeyboard);

// Povezivanje dugmadi virtuelne tastature sa funkcijom addCharacter
document.querySelectorAll('.keyboard-key').forEach(key => {
    key.addEventListener('click', function() {
        if (!this.hasAttribute('onclick')) {
            addCharacter(this.textContent);
        }
    });
});
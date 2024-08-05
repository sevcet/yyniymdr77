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
    // Fokusiraj na tastaturu kada se otvori
    document.getElementById('virtual-keyboard').focus();
}

// Funkcija za sakrivanje virtuelne tastature
function hideKeyboard() {
    const keyboard = document.getElementById('virtual-keyboard');
    keyboard.style.display = 'none';
}

// Funkcija za unos teksta sa virtuelne tastature
function addCharacter(char) {
    const input = document.getElementById('search-input');
    input.value += char;
    // Održi fokus na tastaturi
    document.getElementById('virtual-keyboard').focus();
}

// Funkcija za brisanje poslednjeg karaktera
function removeCharacter() {
    const input = document.getElementById('search-input');
    input.value = input.value.slice(0, -1);
    // Održi fokus na tastaturi
    document.getElementById('virtual-keyboard').focus();
}

// Funkcija za potvrdu unosa
function submitSearch() {
    searchMovies();
    // Sakrij tastaturu nakon unosa
    hideKeyboard();
}

// Povezivanje prikazivanja tastature na fokus input polja
document.getElementById('search-input').addEventListener('focus', showKeyboard);

// Povezivanje sakrivanja tastature kada se izgubi fokus
document.addEventListener('click', function(event) {
    const keyboard = document.getElementById('virtual-keyboard');
    const input = document.getElementById('search-input');
    if (event.target !== input && event.target.closest('#virtual-keyboard') === null) {
        hideKeyboard();
    }
});

// Povezivanje dugmadi virtuelne tastature sa funkcijom addCharacter
document.querySelectorAll('.keyboard-key').forEach(key => {
    key.addEventListener('click', function() {
        addCharacter(this.textContent);
    });
});

// Povezivanje dugmeta za brisanje karaktera
document.getElementById('delete-key').addEventListener('click', function() {
    removeCharacter();
});

// Povezivanje dugmeta za potvrdu ssait
document.getElementById('enter-key').addEventListener('click', function() {
    submitSearch();
});

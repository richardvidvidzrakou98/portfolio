// Show Hire Me Popup
function showPopup() {
    document.getElementById('hirePopup').style.display = 'flex';
}

// Close Hire Me Popup
function closePopup() {
    document.getElementById('hirePopup').style.display = 'none';
}

// Show Read Me Popup
function openMyWorksPopup() {
    document.getElementById('myWorksPopup').style.display = 'flex';
}

// Close Read Me Popup
function closeMyWorksPopup() {
    document.getElementById('myWorksPopup').style.display = 'none';
}

// Close Popups on Outside Click
window.onclick = function(event) {
    if (event.target.classList.contains('popup')) {
        event.target.style.display = 'none';
    }
}

// Smooth Scroll for Scroll-Down Arrow
document.querySelector('.scroll-down').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
    });
});
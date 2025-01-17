function changeText() {
    const introParagraph = document.getElementById('intro');
    introParagraph.textContent = "Ich bin ein sehr erfahrener Architekt und Software-Entwickler ich schaue auf über 20 Jahre Erfahrung in diversen Technologien und Branchen zurück.";
}

function toggleHobbies() {
    const hobbiesList = document.getElementById('hobbies');
    if (hobbiesList.style.display === "none") {
        hobbiesList.style.display = "block";
    } else {
        hobbiesList.style.display = "none";
    }
}

function toggleContactInfo() {
    const contactInfo = document.getElementById('additionalContact');
    if (contactInfo.style.display === "none") {
        contactInfo.style.display = "block";
    } else {
        contactInfo.style.display = "none";
    }
}

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Fehler-Elemente zurücksetzen
    let errors = document.querySelectorAll(".error");
    errors.forEach(function(error) {
        error.textContent = "";
    });

    let isValid = true;

    // Vorname validieren
    let firstname = document.getElementById("firstname").value;
    if (firstname === "") {
        document.getElementById("firstnameError").textContent = "Bitte Vornamen eingeben.";
        isValid = false;
    }

    // Nachname validieren
    let lastname = document.getElementById("lastname").value;
    if (lastname === "") {
        document.getElementById("lastnameError").textContent = "Bitte Nachnamen eingeben.";
        isValid = false;
    }

    // E-Mail validieren
    let email = document.getElementById("email").value;
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        document.getElementById("emailError").textContent = "Bitte E-Mail-Adresse eingeben.";
        isValid = false;
    } else if (!email.match(emailPattern)) {
        document.getElementById("emailError").textContent = "Bitte eine gültige E-Mail-Adresse eingeben.";
        isValid = false;
    }

    // Telefonnummer validieren
    let phone = document.getElementById("phone").value;
    let phonePattern = /^[0-9]+$/;
    if (phone === "") {
        document.getElementById("phoneError").textContent = "Bitte Telefonnummer eingeben.";
        isValid = false;
    } else if (!phone.match(phonePattern)) {
        document.getElementById("phoneError").textContent = "Bitte nur Ziffern eingeben.";
        isValid = false;
    }

    // Nachricht validieren
    let message = document.getElementById("message").value;
    if (message === "") {
        document.getElementById("messageError").textContent = "Bitte eine Nachricht eingeben.";
        isValid = false;
    }

    // Falls alle Felder korrekt sind, Formular absenden
    if (isValid) {
        alert("Formular erfolgreich abgeschickt!");
    }
});

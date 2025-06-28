// Navigation entre les pages
document.querySelectorAll('.menu-link').forEach(lien => {
    lien.addEventListener('click', function(e) {
        e.preventDefault();
        const page = this.dataset.page;
        document.querySelectorAll('.page').forEach(sec => sec.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// --- EmailJS : initialisation ---
(function(){
    emailjs.init({
        publicKey: "A6QO0CHvLMzzpGu2w" // Remplace par ta clé publique EmailJS
    });
})();

// Formulaire de contact : envoi via EmailJS
const formulaireContact = document.getElementById('formulaireContact');
if (formulaireContact) {
    formulaireContact.addEventListener('submit', function(e) {
        e.preventDefault();
        emailjs.sendForm('service_umx7mfg', 'template_aaaqwig', this)
            .then(function() {
                alert('Merci pour votre message ! Nous vous répondrons rapidement.');
                formulaireContact.reset();
            }, function(error) {
                alert('Erreur lors de l\'envoi du message : ' + JSON.stringify(error));
            });
    });
}

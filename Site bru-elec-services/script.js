// Navigation entre les pages (inclut menu déroulant)
document.querySelectorAll('.menu-link').forEach(lien => {
    lien.addEventListener('click', function(e) {
        // Si c'est juste le lien principal "Services", on ne fait rien
        if (this.id === 'services-link') return;
        e.preventDefault();
        const page = this.dataset.page;
        if (!page) return;
        document.querySelectorAll('.page').forEach(sec => sec.classList.remove('active'));
        document.getElementById(page).classList.add('active');
        document.querySelectorAll('.menu-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        window.scrollTo({top:0, behavior:'smooth'});
        // Ferme le menu déroulant si ouvert (mobile/desktop)
        const dropdownMenu = document.querySelector('.dropdown-menu');
        if (dropdownMenu) dropdownMenu.style.display = 'none';
    });
});

// Menu déroulant "Services" : ouverture/fermeture au survol et au clic
const dropdown = document.querySelector('.dropdown');
const dropdownMenu = document.querySelector('.dropdown-menu');
const servicesLink = document.getElementById('services-link');

// Affiche le menu au survol (desktop)
if (dropdown && dropdownMenu) {
    dropdown.addEventListener('mouseenter', () => {
        dropdownMenu.style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', () => {
        dropdownMenu.style.display = 'none';
    });
    // Affiche/masque au clic (mobile)
    servicesLink.addEventListener('click', function(e) {
        e.preventDefault();
        dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
    });
    // Ferme si on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdownMenu.style.display = 'none';
        }
    });
}

// --- EmailJS : initialisation ---
(function(){
    emailjs.init({
        publicKey: "A6QO0CHvLMzzpGu2w"
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
                console.log(error);
            });
    });
}

// Fond animé : particules dorées
const canvas = document.getElementById('fond-particules');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let particules = [];
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    function creeParticules() {
        particules = [];
        for(let i=0;i<60;i++) {
            particules.push({
                x: Math.random()*canvas.width,
                y: Math.random()*canvas.height,
                r: Math.random()*2+1,
                dx: (Math.random()-0.5)*0.7,
                dy: (Math.random()-0.5)*0.7,
                alpha: Math.random()*0.6+0.2
            });
        }
    }
    creeParticules();

    function animeParticules() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        for(let p of particules) {
            ctx.globalAlpha = p.alpha;
            ctx.beginPath();
            ctx.arc(p.x,p.y,p.r,0,2*Math.PI);
            ctx.fillStyle = "#ffd700";
            ctx.shadowColor = "#ffd700";
            ctx.shadowBlur = 12;
            ctx.fill();
            ctx.shadowBlur = 0;
            p.x += p.dx;
            p.y += p.dy;
            if(p.x < 0 || p.x > canvas.width) p.dx *= -1;
            if(p.y < 0 || p.y > canvas.height) p.dy *= -1;
        }
        ctx.globalAlpha = 1;
        requestAnimationFrame(animeParticules);
    }
    animeParticules();
}

// Animation d’apparition sur scroll (bonus)
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
document.querySelectorAll('.parlo-card, .marque, .syndic, .tarif-card, .service-desc').forEach(el => {
    observer.observe(el);
});

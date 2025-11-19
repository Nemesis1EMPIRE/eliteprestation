// Dans ton fichier script.js - gestion du chargement des vidéos
document.addEventListener('DOMContentLoaded', function() {
  const spotVideos = document.querySelectorAll('.spot__video');
  
  spotVideos.forEach(video => {
    // Gestion du chargement
    video.addEventListener('loadstart', function() {
      this.parentElement.classList.add('loading');
    });
    
    video.addEventListener('canplay', function() {
      this.parentElement.classList.remove('loading');
    });
    
    // Redémarrage automatique en cas de bug
    video.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    });
    
    // Gestion des erreurs
    video.addEventListener('error', function() {
      console.error('Erreur de chargement de la vidéo:', this.src);
      this.style.display = 'none';
    });
  });
});




// Dans ton fichier script.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialisation du Swiper pour les spots vidéo avec prévention du scroll de page
  const spotsSwiper = new Swiper('.spots-swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    speed: 600,
    
    // Empêcher le swipe de déclencher le scroll de la page
    preventInteractionOnTransition: true,
    touchRatio: 0.5, // Réduit la sensibilité du touch
    touchAngle: 45, // Angle pour lequel le swipe est détecté
    shortSwipes: true,
    longSwipes: false,
    
    // Navigation
    navigation: {
      nextEl: '.spots-next',
      prevEl: '.spots-prev',
    },
    
    // Pagination
    pagination: {
      el: '.spots-pagination',
      clickable: true,
    },
    
    // Breakpoints
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      568: {
        slidesPerView: 1.2,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 1.5,
        spaceBetween: 25,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      }
    },
    
    // Gestion spécifique du touch pour éviter le scroll de page
    on: {
      init: function() {
        console.log('Swiper spots initialisé');
        this.el.addEventListener('touchstart', function(e) {
          e.stopPropagation();
        });
        
        this.el.addEventListener('touchmove', function(e) {
          e.stopPropagation();
        });
      },
      
      touchStart: function(e) {
        // Empêche la propagation des événements touch
        e.stopPropagation();
      },
      
      touchMove: function(e) {
        // Empêche la propagation des événements touch
        e.stopPropagation();
      }
    }
  });

  // Gestion manuelle des événements touch pour plus de contrôle
  const spotsContainer = document.querySelector('.spots-swiper-container');
  
  if (spotsContainer) {
    let startX = 0;
    let startY = 0;
    let isScrolling = false;
    
    spotsContainer.addEventListener('touchstart', function(e) {
      startX = e.touches[0].pageX;
      startY = e.touches[0].pageY;
      isScrolling = false;
      
      // Empêche la propagation pour éviter le scroll de page
      e.stopPropagation();
    }, { passive: true });
    
    spotsContainer.addEventListener('touchmove', function(e) {
      if (!startX || !startY) return;
      
      const xDiff = startX - e.touches[0].pageX;
      const yDiff = startY - e.touches[0].pageY;
      
      // Détermine si c'est un swipe horizontal ou vertical
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        // C'est un swipe horizontal - empêche le scroll de page
        e.preventDefault();
        e.stopPropagation();
        isScrolling = true;
      }
    }, { passive: false });
    
    spotsContainer.addEventListener('touchend', function(e) {
      if (isScrolling) {
        e.stopPropagation();
      }
    }, { passive: true });
  }

  // Gestion des vidéos dans le swiper
  const spotVideos = document.querySelectorAll('.spot__video');
  
  spotVideos.forEach(video => {
    // Redémarrage automatique en cas de bug
    video.addEventListener('ended', function() {
      this.currentTime = 0;
      this.play();
    });
    
    // Gestion des erreurs
    video.addEventListener('error', function() {
      console.error('Erreur de chargement de la vidéo:', this.src);
    });
  });

  // Pause les vidéos des slides non visibles pour optimiser les performances
  spotsSwiper.on('slideChange', function() {
    spotVideos.forEach(video => {
      video.pause();
    });
    
    const activeSlides = document.querySelectorAll('.swiper-slide-active .spot__video, .swiper-slide-next .spot__video, .swiper-slide-prev .spot__video');

    activeSlides.forEach(video => {
      video.play().catch(e => console.log('Auto-play prevented:', e));
    });
  });
});




// Dans ton fichier script.js
document.addEventListener('DOMContentLoaded', function() {
  const whatsappForm = document.getElementById('whatsappForm');
  
  // Numéro de téléphone WhatsApp (remplace par ton numéro)
  const whatsappNumber = '24100000000'; // Sans le +
  
  whatsappForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Récupération des valeurs du formulaire
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const eventType = document.getElementById('event').value;
    const date = document.getElementById('date').value;
    const budget = document.getElementById('budget').value;
    const message = document.getElementById('message').value;
    
    // Formatage de la date
    const formattedDate = date ? new Date(date).toLocaleDateString('fr-FR') : 'Non spécifiée';
    
    // Construction du message WhatsApp
    let whatsappMessage = `*NOUVELLE DEMANDE DE DEVIS - ÉLITE PRESTATIONS*%0A%0A`;
    
    whatsappMessage += `*Nom:* ${name}%0A`;
    whatsappMessage += `*Téléphone:* ${phone}%0A`;
    
    if (email) {
      whatsappMessage += `*Email:* ${email}%0A`;
    }
    
    whatsappMessage += `*Type d'événement:* ${eventType}%0A`;
    whatsappMessage += `*Date prévue:* ${formattedDate}%0A`;
    
    if (budget) {
      whatsappMessage += `*Budget estimé:* ${budget}%0A`;
    }
    
    whatsappMessage += `%0A*Message:*%0A${message}%0A%0A`;
    whatsappMessage += `_Message envoyé via le site web Élite Prestations_`;
    
    // Encodage URL du message
    const encodedMessage = encodeURIComponent(whatsappMessage).replace(/'/g, "%27").replace(/"/g, "%22");
    
    // URL WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Ouverture dans une nouvelle fenêtre
    window.open(whatsappURL, '_blank');
    
    // Réinitialisation du formulaire (optionnel)
    // whatsappForm.reset();
    
    // Message de confirmation
    showNotification('Formulaire prêt ! Redirection vers WhatsApp...');
  });
  
  // Fonction pour afficher une notification
  function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--first-color);
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 0.5rem;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      z-index: 10000;
      font-weight: 500;
      animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
  
  // Animation pour la notification
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Formatage automatique du numéro de téléphone
  const phoneInput = document.getElementById('phone');
  phoneInput.addEventListener('input', function(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.startsWith('241')) {
      value = value.substring(3);
    }
    
    if (value.length > 0) {
      value = '+241 ' + value;
    }
    
    e.target.value = value;
  });
});

// Dans ton script.js
document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la vidéo de fond
    const bgVideo = document.getElementById('bg-video');
    
    function playVideo(video) {
        const promise = video.play();
        
        if (promise !== undefined) {
            promise.then(_ => {
                // Lecture automatique démarrée
                console.log('Video playing automatically');
            }).catch(error => {
                // Lecture automatique échouée
                console.log('Auto-play prevented, showing fallback');
                showFallbackImage();
            });
        }
    }
    
    function showFallbackImage() {
        const videoBackground = document.querySelector('.video-background');
        videoBackground.style.backgroundImage = "url('assets/img/event-fallback.jpg')";
        if (bgVideo) {
            bgVideo.style.display = 'none';
        }
    }
    
    // Essayer de lire la vidéo
    if (bgVideo) {
        // Sur mobile, attendre l'interaction utilisateur
        if (isMobileDevice()) {
            // Ajouter un écouteur pour le premier touch/click
            document.body.addEventListener('touchstart', function startVideo() {
                playVideo(bgVideo);
                document.body.removeEventListener('touchstart', startVideo);
            }, { once: true });
            
            document.body.addEventListener('click', function startVideo() {
                playVideo(bgVideo);
                document.body.removeEventListener('click', startVideo);
            }, { once: true });
        } else {
            // Sur desktop, lecture automatique
            playVideo(bgVideo);
        }
    }
    
    // Détection appareil mobile
    function isMobileDevice() {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
    }
    
    // Gestion des vidéos des spots
    const spotVideos = document.querySelectorAll('.spot__video');
    
    spotVideos.forEach(video => {
        video.addEventListener('click', function() {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
        
        // Redémarrage automatique en cas de bug
        video.addEventListener('ended', function() {
            this.currentTime = 0;
            this.play().catch(e => console.log('Cannot replay video'));
        });
    });
});

// Swipe horizontal pour desktop
document.addEventListener('DOMContentLoaded', function() {
  // Fonction pour initialiser le swipe horizontal
  function initHorizontalSwipe(sectionClass, containerClass, itemWidth) {
    const sections = document.querySelectorAll(sectionClass);
    
    sections.forEach(section => {
      const container = section.querySelector(containerClass);
      if (!container) return;
      
      let isDown = false;
      let startX;
      let scrollLeft;
      
      // Événements souris
      container.addEventListener('mousedown', (e) => {
        isDown = true;
        section.classList.add('active');
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });
      
      container.addEventListener('mouseleave', () => {
        isDown = false;
        section.classList.remove('active');
      });
      
      container.addEventListener('mouseup', () => {
        isDown = false;
        section.classList.remove('active');
      });
      
      container.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
      
      // Événements tactiles
      container.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
      });
      
      container.addEventListener('touchend', () => {
        isDown = false;
      });
      
      container.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
      });
      
      // Navigation par boutons
      const prevBtn = section.querySelector('.swipe-nav--prev');
      const nextBtn = section.querySelector('.swipe-nav--next');
      
      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          container.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });
      }
      
      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          container.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });
      }
    });
  }
  
  // Initialiser le swipe pour différentes sections
  if (window.innerWidth >= 1024) {
    // Services
    initHorizontalSwipe('.services--swipeable', '.services__grid', 400);
    
    // Portfolio
    initHorizontalSwipe('.portfolio--swipeable', '.swipe-wrapper', 420);
    
    // Spots
    initHorizontalSwipe('.about__spots', '.swiper-wrapper', 370);
    
    // About info
    initHorizontalSwipe('.about__info--swipeable', '.about__info', 220);
    
    // Contact informations
    initHorizontalSwipe('.contact__informations--swipeable', '.contact__informations', 300);
  }
  
  // Navigation mobile (existant)
  const navToggle = document.querySelector('.nav__toggle');
  const navClose = document.querySelector('.nav__close');
  const navMenu = document.querySelector('.nav__menu');
  const navOverlay = document.querySelector('.nav__overlay');
  
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      navOverlay.classList.add('show-overlay');
      document.body.style.overflow = 'hidden';
    });
    
    function closeMenu() {
      navMenu.classList.remove('show-menu');
      navOverlay.classList.remove('show-overlay');
      document.body.style.overflow = '';
    }
    
    if (navClose) navClose.addEventListener('click', closeMenu);
    if (navOverlay) navOverlay.addEventListener('click', closeMenu);
    
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => link.addEventListener('click', closeMenu));
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }
});

// Navigation mobile
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav__toggle');
  const navClose = document.querySelector('.nav__close');
  const navMenu = document.querySelector('.nav__menu');
  const navOverlay = document.querySelector('.nav__overlay');

  if (navToggle && navMenu) {
    // Ouvrir le menu
    navToggle.addEventListener('click', () => {
      navMenu.classList.add('show-menu');
      navOverlay.classList.add('show-overlay');
      document.body.style.overflow = 'hidden';
    });

    // Fermer le menu
    function closeMenu() {
      navMenu.classList.remove('show-menu');
      navOverlay.classList.remove('show-overlay');
      document.body.style.overflow = '';
    }

    if (navClose) {
      navClose.addEventListener('click', closeMenu);
    }

    if (navOverlay) {
      navOverlay.addEventListener('click', closeMenu);
    }

    // Fermer le menu en cliquant sur un lien
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Échap pour fermer le menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    });
  }
});

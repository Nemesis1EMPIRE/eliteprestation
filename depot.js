
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
  //spotsSwiper.on('slideChange', function() {
    spotVideos.forEach(video => {
      video.pause();
    });
    
    const activeSlides = document.querySelectorAll('.swiper-slide-active .spot__video, .swiper-slide-next .spot__video, .swiper-slide-prev .spot__video');

    activeSlides.forEach(video => {
      video.play().catch(e => console.log('Auto-play prevented:', e));
    });
  });
});

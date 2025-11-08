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
  // Initialisation du Swiper pour les spots vidéo
  const spotsSwiper = new Swiper('.spots-swiper-container', {
    slidesPerView: 'auto',
    spaceBetween: 20,
    centeredSlides: false,
    loop: true,
    speed: 600,
    
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
    
    // Effets
    on: {
      init: function() {
        console.log('Swiper spots initialisé');
      }
    }
  });

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

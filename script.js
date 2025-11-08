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

/* ===================== NAVIGATION MOBILE ===================== */
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/* ======= Ouvrir menu ======= */
if(navToggle){
  navToggle.addEventListener('click', () =>{
    navMenu.classList.add('active');
  })
}

/* ======= Fermer menu ======= */
if(navClose){
  navClose.addEventListener('click', () =>{
    navMenu.classList.remove('active');
  })
}

/* ======= Fermer menu au clic sur un lien ======= */
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
  navMenu.classList.remove('active');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/* ===================== FAQ ACCORDION ===================== */
const faqContents = document.querySelectorAll('.faq__content');

faqContents.forEach((item) => {
  const header = item.querySelector('.faq__header');
  header.addEventListener('click', () => {
    item.classList.toggle('faq__open');
    item.classList.toggle('faq__close');
  });
});

/* ===================== PORTFOLIO SWIPER ===================== */
var swiperPortfolio = new Swiper('.portfolio__container', {
  cssMode: true,
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
});

/* ===================== SCROLL ACTIVE LINK ===================== */
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
  const scrollY = window.pageYOffset;

  sections.forEach(current =>{
    const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
          sectionId = current.getAttribute('id'),
          sectionLink = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

    if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
      sectionLink.classList.add('active-link');
    }else{
      sectionLink.classList.remove('active-link');
    }
  })
}
window.addEventListener('scroll', scrollActive);

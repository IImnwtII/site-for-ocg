// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// Плавное появление блоков и анимация шкал навыков
document.querySelectorAll('.card, .step, .ach__item, .info li, .contact, .reasons li, .project, blockquote')
  .forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal, .skills').forEach(el => {
  if (el.classList.contains('skills')) {
    new IntersectionObserver(([en], ob) => { if (en.isIntersecting) { el.classList.add('show'); ob.disconnect(); } }, { threshold: 0.3 }).observe(el);
  } else io.observe(el);
});

// Подсветка текущего раздела в меню
const links = [...nav.querySelectorAll('a')];
const sections = links.map(a => document.querySelector(a.getAttribute('href')));
window.addEventListener('scroll', () => {
  const y = window.scrollY + 120;
  sections.forEach((s, i) => {
    links[i].classList.toggle('active', s.offsetTop <= y && s.offsetTop + s.offsetHeight > y);
  });
  document.getElementById('toTop').classList.toggle('visible', window.scrollY > 500);
});

document.getElementById('toTop').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

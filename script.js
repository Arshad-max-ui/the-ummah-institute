const progress = document.getElementById('progress');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
document.getElementById('year').textContent = new Date().getFullYear();

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
}, { passive: true });

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Gentle pointer parallax on desktop for the hero campus visual.
const hero = document.querySelector('.hero');
const visual = document.querySelector('.campus-window');
if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  hero.addEventListener('mousemove', (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    if (!visual.matches(':hover')) visual.style.transform = `rotateY(${-8 + x * 4}deg) rotateX(${2 - y * 3}deg)`;
  });
  hero.addEventListener('mouseleave', () => { if (!visual.matches(':hover')) visual.style.transform = ''; });
}

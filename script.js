const menu = document.querySelector('#site-menu');
const menuButton = document.querySelector('.menu-toggle');
const closeButton = document.querySelector('.menu-close');

function setMenu(open) {
  if (!menu || !menuButton) return;
  menu.classList.toggle('is-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.setAttribute('aria-hidden', String(!open));
  if (open) document.body.classList.add('menu-is-open');
  else document.body.classList.remove('menu-is-open');
  (open ? closeButton : menuButton)?.focus({ preventScroll: true });
}
menuButton?.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
closeButton?.addEventListener('click', () => setMenu(false));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) setMenu(false);
});

const rail = document.querySelector('#service-rail');
document.querySelector('.slide-next')?.addEventListener('click', () => rail?.scrollBy({ left: rail.clientWidth * 0.72, behavior: 'smooth' }));
document.querySelector('.slide-prev')?.addEventListener('click', () => rail?.scrollBy({ left: -rail.clientWidth * 0.72, behavior: 'smooth' }));
if (rail) {
  let dragStart;
  rail.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse') dragStart = { x: event.clientX, scroll: rail.scrollLeft };
  });
  rail.addEventListener('pointermove', (event) => {
    if (dragStart && event.buttons === 1) rail.scrollLeft = dragStart.scroll - (event.clientX - dragStart.x);
  });
  ['pointerup', 'pointerleave', 'pointercancel'].forEach((type) => rail.addEventListener(type, () => { dragStart = null; }));
}

const clamp = (number, min, max) => Math.min(max, Math.max(min, number));
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A short branded entry animation; never wait on the large background videos.
const siteLoader = document.querySelector('.site-loader');
if (siteLoader) {
  const minimumDisplay = new Promise((resolve) => setTimeout(resolve, reducedMotion ? 0 : 780));
  const pageReady = new Promise((resolve) => {
    if (document.readyState === 'complete') resolve();
    else window.addEventListener('load', resolve, { once: true });
    setTimeout(resolve, 2600);
  });
  Promise.all([minimumDisplay, pageReady]).then(() => {
    siteLoader.classList.add('is-done');
    setTimeout(() => siteLoader.remove(), 800);
  });
}

// Reveal components as they enter the viewport, with a small stagger for cards.
const revealTargets = document.querySelectorAll(
  '.services-head, .video-card, .appointment-inner, .appointment-form, .contact-layout > *, .visit-copy, .visit-map, .closing-copy'
);
if (!reducedMotion && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) return;
      target.classList.add('is-revealed');
      observer.unobserve(target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -42px 0px' });
  revealTargets.forEach((element, index) => {
    element.classList.add('motion-reveal');
    if (element.matches('.video-card')) element.style.setProperty('--reveal-order', index % 4);
    revealObserver.observe(element);
  });
}

const ambientVideos = document.querySelectorAll('.home-hero video, .appointment-video, .video-card video, .visit-map video');
const scrollVideos = document.querySelectorAll('[data-scroll-video]');
const heroSection = document.querySelector('.home-hero');
const heroAudio = heroSection?.querySelector('.hero-audio');
const heroSoundButton = heroSection?.querySelector('.hero-sound-note');
const heroSoundLabel = heroSoundButton?.querySelector('.sound-label');
let heroSoundEnabled = true;
function isHeroMostlyVisible() {
  if (!heroSection) return false;
  const box = heroSection.getBoundingClientRect();
  const visibleHeight = Math.max(0, Math.min(box.bottom, innerHeight) - Math.max(box.top, 0));
  return visibleHeight / Math.max(1, Math.min(box.height, innerHeight)) >= 0.65;
}

function setHeroSound(enabled, autoplayBlocked = false) {
  heroSoundEnabled = enabled;
  heroSoundButton?.setAttribute('aria-pressed', String(enabled));
  heroSoundButton?.setAttribute('aria-label', enabled ? 'Turn harbor sound off' : 'Turn harbor sound on');
  if (heroSoundLabel) heroSoundLabel.textContent = enabled ? 'SOUND ON · TAP TO MUTE' : autoplayBlocked ? 'SOUND OFF · TAP FOR SOUND' : 'SOUND OFF · HARBOR AMBIENCE';
  if (!enabled) heroAudio?.pause();
}

async function startHeroAudio() {
  if (!heroAudio || !heroSoundEnabled || !isHeroMostlyVisible() || document.hidden) return;
  if (heroAudio.readyState === 0) heroAudio.load();
  try {
    await heroAudio.play();
  } catch {
    setHeroSound(false, true);
  }
}

heroSoundButton?.addEventListener('click', () => {
  if (heroSoundEnabled) {
    setHeroSound(false);
    return;
  }
  setHeroSound(true);
  startHeroAudio();
});

if (heroSection && heroAudio) {
  const heroAudioObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) startHeroAudio();
    else heroAudio.pause();
  }, { threshold: 0.65 });
  heroAudioObserver.observe(heroSection);
  setHeroSound(true);
  startHeroAudio();
}

function playVideo(video) {
  if (!video || reducedMotion || document.hidden) return;
  if (video.readyState === 0) video.load();
  video.play().catch(() => {});
}

const playbackObserver = new IntersectionObserver((entries) => {
  entries.forEach(({ target, isIntersecting }) => {
    if (isIntersecting && target.hasAttribute('data-story-video')) target.pause();
    else if (isIntersecting) playVideo(target);
    else if (!target.hasAttribute('data-scroll-video')) target.pause();
  });
}, { threshold: 0.12, rootMargin: '120px 0px' });
[...ambientVideos, ...scrollVideos].forEach((video) => playbackObserver.observe(video));

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    [...ambientVideos, ...scrollVideos].forEach((video) => video.pause());
    heroAudio?.pause();
  }
  else if (!reducedMotion) ambientVideos.forEach((video) => {
    const box = video.getBoundingClientRect();
    if (box.bottom > 0 && box.top < innerHeight) playVideo(video);
  });
  if (!document.hidden && heroSoundEnabled && heroSection) {
    startHeroAudio();
  }
});

let scrollTicking = false;
function updateScrollScenes() {
  if (!reducedMotion) {
    const hero = document.querySelector('.home-hero');
    if (hero) {
      const heroVideo = hero.querySelector('video');
      const heroProgress = clamp(-hero.getBoundingClientRect().top / Math.max(1, hero.offsetHeight), 0, 1);
      heroVideo?.style.setProperty('--hero-drift', `${heroProgress * 22}px`);
    }
  }
  document.querySelectorAll('.story-scroll').forEach((frame) => {
    const bounds = frame.getBoundingClientRect();
    const span = Math.max(1, frame.offsetHeight - innerHeight);
    const progress = clamp(-bounds.top / span, 0, 1);
    const videos = [...frame.querySelectorAll('[data-story-video]')];
    videos.forEach((video, index) => {
      const chapterProgress = clamp(progress * videos.length - index, 0, 1);
      const isCurrentChapter = progress >= index / videos.length && progress <= (index + 1) / videos.length;
      video.style.opacity = isCurrentChapter ? '1' : '0';
      if (isCurrentChapter && video.readyState === 0) video.load();
      if (!isCurrentChapter) video.pause();
      if (!reducedMotion) video.style.setProperty('--story-drift', `${chapterProgress * -8}px`);
      if (!reducedMotion && video.readyState >= 1 && Number.isFinite(video.duration)) {
        const targetTime = Math.max(0, video.duration - 0.08) * chapterProgress;
        if (Math.abs(video.currentTime - targetTime) > 0.14) video.currentTime = targetTime;
      }
    });

    const beats = [...frame.querySelectorAll('[data-scene-beat]')];
    const activeIndex = Math.min(beats.length - 1, Math.floor(progress * beats.length));
    beats.forEach((beat, index) => beat.classList.toggle('is-active', index === activeIndex));
    frame.querySelector('.story-counter')?.replaceChildren(document.createTextNode(`0${activeIndex + 1} / 0${beats.length}`));
    frame.querySelector('.story-progress i')?.style.setProperty('width', `${progress * 100}%`);
    const cube = frame.querySelector('.cargo-cube');
    if (cube && !reducedMotion) cube.style.transform = `rotateX(${-22 + progress * 34}deg) rotateY(${-35 + progress * 260}deg) rotateZ(${progress * 18}deg)`;
    frame.style.setProperty('--story-progress', progress);
  });

  scrollVideos.forEach((video) => {
    const frame = video.closest('.closing-scene');
    if (!frame) return;
    const bounds = frame.getBoundingClientRect();
    const span = Math.max(1, bounds.height + innerHeight);
    const progress = clamp((innerHeight - bounds.top) / span, 0, 1);

    if (!reducedMotion && video.readyState >= 1 && Number.isFinite(video.duration)) {
      const targetTime = Math.max(0, video.duration - 0.08) * progress;
      if (Math.abs(video.currentTime - targetTime) > 0.14) video.currentTime = targetTime;
    }
    frame.querySelector('.closing-progress i')?.style.setProperty('transform', `scaleX(${progress})`);
  });
  scrollTicking = false;
}
function requestSceneUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  requestAnimationFrame(updateScrollScenes);
}
window.addEventListener('scroll', requestSceneUpdate, { passive: true });
window.addEventListener('resize', requestSceneUpdate);
scrollVideos.forEach((video) => video.addEventListener('loadedmetadata', requestSceneUpdate, { once: true }));
requestSceneUpdate();

if (!reducedMotion) {
  document.querySelectorAll('.video-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--pointer-x', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--pointer-y', `${(y + 0.5) * 100}%`);
      card.style.transform = `perspective(1050px) rotateX(${-y * 7}deg) rotateY(${x * 9}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

const pageProgress = document.querySelector('.page-progress i');
function updatePageProgress() {
  if (!pageProgress) return;
  const maxScroll = document.documentElement.scrollHeight - innerHeight;
  pageProgress.style.transform = `scaleX(${maxScroll > 0 ? clamp(scrollY / maxScroll, 0, 1) : 0})`;
}
window.addEventListener('scroll', updatePageProgress, { passive: true });
window.addEventListener('resize', updatePageProgress);
updatePageProgress();

document.querySelectorAll('[data-year]').forEach((element) => { element.textContent = new Date().getFullYear(); });
const localDate = document.querySelector('#app-date');
if (localDate) {
  const today = new Date();
  localDate.min = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
}
// Custom desktop pointer. Native cursors remain on touch and reduced-motion devices.
if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.querySelector('.custom-cursor');
  if (cursor) {
    document.body.classList.add('has-custom-cursor');
    const interactiveSelector = 'a,button,[role="button"],input,select,textarea,.video-card,.service-rail';
    document.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      cursor.style.setProperty('--cursor-x', `${event.clientX}px`);
      cursor.style.setProperty('--cursor-y', `${event.clientY}px`);
      cursor.classList.add('is-visible');
      cursor.classList.toggle('is-active', Boolean(event.target.closest(interactiveSelector)));
    }, { passive: true });
    document.addEventListener('pointerover', (event) => {
      if (event.pointerType === 'mouse') cursor.classList.toggle('is-active', Boolean(event.target.closest(interactiveSelector)));
    }, { passive: true });
    document.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
    document.addEventListener('pointerenter', () => cursor.classList.add('is-visible'));
  }
}

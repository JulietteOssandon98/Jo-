const cur = document.getElementById('cur');
const ring = document.getElementById('cur-ring');
let mx = -100, my = -100, rx = -100, ry = -100;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function loop() {
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
})();

const hoverEls = document.querySelectorAll('.svc-item,.proj-row,.skill-tag,.svc-tag,.proj-chip,.hero-stat,.proc-row,.f-input,.form-box');
hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-hover'));
});
const linkEls = document.querySelectorAll('a,button,.btn-primary-cta,.btn-ghost-cta,.btn-hire,.btn-band,.btn-send,.btn-cv,.proj-link');
linkEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-link'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-link'));
});
const textEls = document.querySelectorAll('input,textarea,select');
textEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cur-text'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cur-text'));
});

/* ── SCROLL PROGRESS ── */
const prog = document.getElementById('progress');
window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    prog.style.transform = `scaleX(${pct})`;
});

/* ── NAVBAR SHRINK ── */
const nav = document.querySelector('.navbar');
window.addEventListener('scroll', () => { nav.style.padding = window.scrollY > 50 ? '0.7rem 0' : '1.1rem 0'; });

/* ── REVEAL ON SCROLL ── */
const reveals = document.querySelectorAll('.reveal');
const revObs = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
        if (e.isIntersecting) {
            e.target.classList.add('on');
            revObs.unobserve(e.target);
        }
    });
}, { threshold: 0.08 });
reveals.forEach(el => revObs.observe(el));

/* ── HERO TITLE CHAR SPLIT ── */
const heroTitle = document.getElementById('heroTitle');
if (heroTitle) {
    const html = heroTitle.innerHTML;
    const parts = html.split(/(<br>|<em>.*?<\/em>)/g);
    let built = '';
    let delay = 0.3;
    parts.forEach(part => {
        if (part === '<br>') { built += '<br>'; return; }
        if (part.startsWith('<em>')) {
            const inner = part.replace('<em>', '').replace('</em>', '');
            let chars = '';
            [...inner].forEach(ch => {
                if (ch === ' ') { chars += ' '; return; }
                chars += `<span class="char" style="animation-delay:${delay.toFixed(2)}s">${ch}</span>`;
                delay += 0.035;
            });
            built += `<em>${chars}</em>`;
        } else {
            [...part].forEach(ch => {
                if (ch === ' ') { built += ' '; return; }
                built += `<span class="char" style="animation-delay:${delay.toFixed(2)}s">${ch}</span>`;
                delay += 0.035;
            });
        }
    });
    heroTitle.innerHTML = built;
}

/* ── COUNTER ANIMATION ── */
function animateCount(el, target, suffix) {
    let start = 0;
    const step = target / 40;
    const t = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = (Number.isInteger(target) ? Math.round(start) : start.toFixed(0)) + suffix;
        if (start >= target) clearInterval(t);
    }, 30);
}
const statObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const txt = el.textContent.trim();
        if (txt === '+15') animateCount(el, 15, '+');
        else if (txt === '100%') animateCount(el, 100, '%');
        statObs.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('.s-num').forEach(el => statObs.observe(el));

/* ── MAGNETIC BUTTONS ── */
document.querySelectorAll('.btn-primary-cta,.btn-hire,.btn-band,.btn-send,.btn-cv').forEach(btn => {
    btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        btn.style.transform = `translate(${dx * 0.22}px, ${dy * 0.22}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

/* ── PROJECT CARD 3D TILT ── */
document.querySelectorAll('.proj-row').forEach(card => {
    card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

/* ── SERVICE CARD LIFT ── */
document.querySelectorAll('.svc-item').forEach(item => {
    item.addEventListener('mousemove', e => {
        const r = item.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        item.style.transform = `perspective(600px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
    });
    item.addEventListener('mouseleave', () => { item.style.transform = ''; });
});

/* ── HERO PARALLAX ── */
const heroImg = document.querySelector('.hero-img-frame img');
window.addEventListener('scroll', () => {
    if (!heroImg) return;
    const y = window.scrollY * 0.18;
    heroImg.style.transform = `translateY(${y}px)`;
});

/* ── STAGGER SKILL TAGS on enter ── */
const skillWrap = document.querySelector('.skills-row');
if (skillWrap) {
    const tags = skillWrap.querySelectorAll('.skill-tag');
    const sObs = new IntersectionObserver(entries => {
        if (!entries[0].isIntersecting) return;
        tags.forEach((t, i) => {
            t.style.opacity = '0';
            t.style.transform = 'translateY(12px)';
            setTimeout(() => {
                t.style.transition = 'opacity 0.4s ease, transform 0.4s ease, background 0.2s, color 0.2s, border-color 0.2s';
                t.style.opacity = '1';
                t.style.transform = '';
            }, i * 70);
        });
        sObs.unobserve(skillWrap);
    }, { threshold: 0.3 });
    sObs.observe(skillWrap);
}

/* ── STAGGER SVC TAGS on hover ── */
document.querySelectorAll('.svc-item').forEach(item => {
    const tags = item.querySelectorAll('.svc-tag');
    item.addEventListener('mouseenter', () => {
        tags.forEach((t, i) => {
            t.style.transition = `transform 0.3s ${i * 0.05}s ease, background 0.2s, color 0.2s`;
            t.style.transform = 'translateY(-2px)';
        });
    });
    item.addEventListener('mouseleave', () => {
        tags.forEach(t => { t.style.transform = ''; });
    });
});

/* ── SECTION TITLE UNDERLINE DRAW ── */
document.querySelectorAll('.s-title em').forEach(em => {
    em.style.backgroundImage = 'linear-gradient(var(--accent2), var(--accent2))';
    em.style.backgroundRepeat = 'no-repeat';
    em.style.backgroundSize = '0% 2px';
    em.style.backgroundPosition = '0 100%';
    em.style.transition = 'background-size 0.6s 0.3s ease';
    const obs2 = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            em.style.backgroundSize = '100% 2px';
            obs2.unobserve(em);
        }
    }, { threshold: 0.8 });
    obs2.observe(em);
});

/* ── FORM SEND ── */
document.getElementById('sendBtn').addEventListener('click', function () {
    this.innerHTML = '<i class="bi bi-check-lg"></i> Enviado — te respondo pronto';
    this.style.background = '#3d3630';
    setTimeout(() => { this.innerHTML = 'Enviar mensaje <i class="bi bi-arrow-up-right"></i>'; this.style.background = ''; }, 3000);
});

/* ── TOUCH: slide-in from bottom for mobile ── */
if ('ontouchstart' in window) {
    document.querySelectorAll('.svc-item, .proj-row').forEach((el, i) => {
        el.classList.add('reveal');
        el.classList.add(`d${(i % 3) + 1}`);
        revObs.observe(el);
    });
}

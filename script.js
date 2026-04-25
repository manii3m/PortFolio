// ── LOADER ──
const loadTexts = ['Initializing...', 'Loading assets...', 'Building universe...', 'Almost ready...'];
let loadIdx = 0;
const loaderBar = document.getElementById('loader-bar');
const loaderText = document.getElementById('loader-text');
let progress = 0;
const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) { progress = 100; clearInterval(loadInterval); }
    loaderBar.style.width = progress + '%';
    loaderText.textContent = loadTexts[Math.floor(progress / 25)] || loadTexts[3];
    if (progress >= 100) {
        setTimeout(() => document.getElementById('loader').classList.add('hidden'), 400);
    }
}, 120);

// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursor-ring');
let cx = 0, cy = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
const animCursor = () => {
    cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
    rx += (cx - rx) * 0.12; ry += (cy - ry) * 0.12;
    cursorRing.style.left = rx + 'px'; cursorRing.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
};
animCursor();
document.querySelectorAll('a, button, .project-card, .about-card, .skills-cat-btn, .github-stat-card').forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

// ── THREE.JS HERO ──
const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// Particles
const pCount = 3000;
const pGeo = new THREE.BufferGeometry();
const pPos = new Float32Array(pCount * 3);
const pSizes = new Float32Array(pCount);
for (let i = 0; i < pCount; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 20;
    pPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    pSizes[i] = Math.random() * 2 + 0.5;
}
pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
pGeo.setAttribute('size', new THREE.BufferAttribute(pSizes, 1));
const pMat = new THREE.PointsMaterial({ color: 0x6c63ff, size: 0.04, transparent: true, opacity: 0.7, sizeAttenuation: true });
const particles = new THREE.Points(pGeo, pMat);
scene.add(particles);

// Floating geometric objects
const makeGeo = (geo, color, x, y, z) => {
    const mat = new THREE.MeshStandardMaterial({ color, transparent: true, opacity: 0.15, wireframe: true });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(x, y, z);
    scene.add(mesh);
    return mesh;
};
const objs = [
    makeGeo(new THREE.IcosahedronGeometry(0.8), 0x6c63ff, 3, 1, -2),
    makeGeo(new THREE.OctahedronGeometry(0.6), 0x22d3ee, -3, -1, -3),
    makeGeo(new THREE.TetrahedronGeometry(0.7), 0xf472b6, 2, -2, -1),
    makeGeo(new THREE.TorusGeometry(0.5, 0.15, 16, 100), 0xa78bfa, -2, 2, -2),
];
const ambientLight = new THREE.AmbientLight(0x6c63ff, 0.5);
const pointLight = new THREE.PointLight(0x22d3ee, 2, 20);
pointLight.position.set(3, 3, 3);
scene.add(ambientLight, pointLight);

let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', e => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
});
let t = 0;
const render = () => {
    t += 0.005;
    particles.rotation.y = t * 0.1;
    particles.rotation.x = t * 0.05;
    camera.position.x += (mouseX * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouseY * 0.3 - camera.position.y) * 0.05;
    objs.forEach((o, i) => {
        o.rotation.x = t * (0.3 + i * 0.1);
        o.rotation.y = t * (0.2 + i * 0.15);
        o.position.y += Math.sin(t + i) * 0.003;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
};
render();
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 50);
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SKILL BARS ──
const skillObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.pct + '%';
            });
        }
    });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-panels').forEach(el => skillObserver.observe(el));

// ── SKILL CATEGORY ──
document.querySelectorAll('.skills-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.skills-cat-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById('panel-' + btn.dataset.target).classList.add('active');
        setTimeout(() => {
            document.querySelectorAll('#panel-' + btn.dataset.target + ' .skill-bar-fill').forEach(bar => {
                bar.style.width = '0%';
                setTimeout(() => bar.style.width = bar.dataset.pct + '%', 50);
            });
        }, 50);
    });
});

// ── COUNTER ANIMATION ──
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseInt(el.dataset.count);
        let current = 0;
        const step = target / 40;
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { current = target; clearInterval(timer); }
            el.textContent = Math.floor(current);
        }, 30);
        counterObserver.unobserve(el);
    });
}, { threshold: 0.5 });
document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

// ── CONTRIBUTION GRAPH ──
const grid = document.getElementById('contrib-grid');
const colors = ['rgba(255,255,255,0.04)', 'rgba(108,99,255,0.2)', 'rgba(108,99,255,0.45)', 'rgba(108,99,255,0.7)', '#6c63ff'];
for (let i = 0; i < 364; i++) {
    const cell = document.createElement('div');
    cell.className = 'contrib-cell';
    const w = Math.random();
    const ci = w < 0.6 ? 0 : w < 0.75 ? 1 : w < 0.85 ? 2 : w < 0.93 ? 3 : 4;
    cell.style.background = colors[ci];
    cell.style.opacity = ci === 0 ? '1' : (0.6 + Math.random() * 0.4).toString();
    grid.appendChild(cell);
}

// ── PROJECT CARD GLOW ──
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const glow = card.querySelector('.project-card-glow');
        glow.style.left = (e.clientX - rect.left) + 'px';
        glow.style.top = (e.clientY - rect.top) + 'px';
    });
});

// ── FORM SUBMIT ──
document.getElementById('form-submit').addEventListener('click', () => {
    const n = document.getElementById('form-name').value;
    const e = document.getElementById('form-email').value;
    const m = document.getElementById('form-msg').value;
    if (!n || !e || !m) { alert('Please fill all fields!'); return; }
    const btn = document.getElementById('form-submit');
    btn.textContent = '✓ Message Sent!';
    btn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
    setTimeout(() => {
        btn.innerHTML = '<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"/></svg> Send Message';
        btn.style.background = '';
    }, 3000);
});

// ── EASTER EGG ──
document.getElementById('egg').addEventListener('click', () => document.getElementById('egg-modal').classList.add('open'));
document.getElementById('egg-close').addEventListener('click', () => document.getElementById('egg-modal').classList.remove('open'));
document.getElementById('egg-modal').addEventListener('click', e => { if (e.target === document.getElementById('egg-modal')) document.getElementById('egg-modal').classList.remove('open'); });

// Konami code easter egg bonus
let kk = '', kkTarget = 'ArrowUpArrowUpArrowDownArrowDownArrowLeftArrowRightArrowLeftArrowRightba';
document.addEventListener('keydown', e => {
    kk += e.key;
    if (kk.length > kkTarget.length) kk = kk.slice(-kkTarget.length);
    if (kk === kkTarget) {
        document.getElementById('egg-modal').classList.add('open');
        document.querySelector('.egg-title').textContent = '🎮 KONAMI CODE!';
        document.querySelector('.egg-text').textContent = 'You know the Konami Code! Mayank definitely knows it too. ↑↑↓↓←→←→BA — classic. You\'re hired. Just kidding. But seriously, reach out.';
    }
});

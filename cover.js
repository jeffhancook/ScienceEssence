// ===== The Essence of Science — Cover Animations =====

document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('.scene');

    // --- Dust motes floating in lamplight ---
    const dustContainer = document.getElementById('dustContainer');

    function createDustMote() {
        const mote = document.createElement('div');
        mote.className = 'dust-mote';
        const size = 1.5 + Math.random() * 3.5;
        // Concentrate dust in the lamplight area (center-right, upper-middle)
        const startX = 25 + Math.random() * 50;
        const startY = 20 + Math.random() * 50;

        mote.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${startX}%;
            top: ${startY}%;
            opacity: 0;
        `;

        const duration = 6000 + Math.random() * 8000;
        const driftX = (Math.random() - 0.5) * 80;
        const driftY = -20 + Math.random() * 40;
        const maxOpacity = 0.2 + Math.random() * 0.5;

        mote.animate([
            { opacity: 0, transform: `translate(0, 0) scale(${0.5 + Math.random() * 0.5})` },
            { opacity: maxOpacity, transform: `translate(${driftX * 0.3}px, ${driftY * 0.3}px) scale(1)`, offset: 0.3 },
            { opacity: maxOpacity * 0.8, transform: `translate(${driftX * 0.7}px, ${driftY * 0.7}px) scale(1.1)`, offset: 0.7 },
            { opacity: 0, transform: `translate(${driftX}px, ${driftY}px) scale(0.6)` }
        ], {
            duration,
            easing: 'ease-in-out'
        }).onfinish = () => mote.remove();

        dustContainer.appendChild(mote);
    }

    // Create initial batch
    for (let i = 0; i < 15; i++) {
        setTimeout(createDustMote, Math.random() * 3000);
    }
    // Continuous generation
    setInterval(createDustMote, 400);

    // --- Arcane symbols that drift faintly ---
    const arcaneContainer = document.getElementById('arcaneSymbols');
    const symbols = [
        '\u2609', // Sun
        '\u263D', // Moon
        '\u2641', // Earth
        '\u2642', // Mars
        '\u2643', // Jupiter
        '\u2644', // Saturn
        '\u2645', // Uranus
        '\u263F', // Mercury
        '\u2640', // Venus
        '\u2648', // Aries
        '\u2649', // Taurus
        '\u264A', // Gemini
        '\u03B1', // Alpha
        '\u03B2', // Beta
        '\u03B3', // Gamma
        '\u03B4', // Delta
        '\u03C0', // Pi
        '\u03A3', // Sigma
        '\u221E', // Infinity
        '\u2202', // Partial derivative
        '\u222B', // Integral
        '\u2207', // Nabla
        '\u0394', // Delta
        '\u03A9', // Omega
    ];

    function createArcaneSymbol() {
        const sym = document.createElement('div');
        sym.className = 'arcane-symbol';
        sym.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const x = 15 + Math.random() * 70;
        const y = 10 + Math.random() * 60;
        const size = 16 + Math.random() * 20;

        sym.style.cssText = `
            left: ${x}%;
            top: ${y}%;
            font-size: ${size}px;
            opacity: 0;
        `;

        const duration = 8000 + Math.random() * 10000;
        const maxOpacity = 0.03 + Math.random() * 0.05;

        sym.animate([
            { opacity: 0, transform: 'translateY(10px) scale(0.8)' },
            { opacity: maxOpacity, transform: 'translateY(0) scale(1)', offset: 0.3 },
            { opacity: maxOpacity, transform: 'translateY(-5px) scale(1)', offset: 0.7 },
            { opacity: 0, transform: 'translateY(-15px) scale(0.9)' }
        ], {
            duration,
            easing: 'ease-in-out'
        }).onfinish = () => sym.remove();

        arcaneContainer.appendChild(sym);
    }

    // Sparse arcane symbols
    for (let i = 0; i < 5; i++) {
        setTimeout(createArcaneSymbol, Math.random() * 5000);
    }
    setInterval(createArcaneSymbol, 2500);

    // --- Subtle lamp flicker on the ambient light ---
    const lampLight = document.querySelector('.lamp-light');
    const darkness = document.querySelector('.darkness');

    function flickerLight() {
        const intensity = 0.85 + Math.random() * 0.15;
        if (lampLight) {
            lampLight.style.opacity = String(intensity);
        }
        // Subtle darkness fluctuation
        if (darkness) {
            darkness.style.opacity = String(1.05 - intensity * 0.12);
        }
        setTimeout(flickerLight, 80 + Math.random() * 200);
    }
    flickerLight();

    // --- Book glow intensifies on hover ---
    const mainBook = document.querySelector('.main-book');
    const bookAura = document.querySelector('.book-aura');

    if (mainBook && bookAura) {
        mainBook.addEventListener('mouseenter', () => {
            bookAura.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            bookAura.style.opacity = '1';
            bookAura.style.transform = 'scale(1.15)';
            bookAura.style.background = `radial-gradient(
                ellipse 60% 50% at 50% 40%,
                rgba(218,165,32,0.12) 0%,
                rgba(180,120,20,0.06) 40%,
                transparent 70%
            )`;
        });

        mainBook.addEventListener('mouseleave', () => {
            bookAura.style.opacity = '';
            bookAura.style.transform = '';
            bookAura.style.background = '';
        });
    }

    // --- Subtle page-turn sound ambiance (visual: occasional golden sparkle on book) ---
    function bookSparkle() {
        const sparkle = document.createElement('div');
        const bookRect = mainBook ? mainBook.getBoundingClientRect() : null;
        if (!bookRect) return;

        const x = bookRect.left + 40 + Math.random() * (bookRect.width - 80);
        const y = bookRect.top + 20 + Math.random() * (bookRect.height - 40);
        const size = 2 + Math.random() * 3;

        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(218,165,32,0.9), rgba(218,165,32,0));
            border-radius: 50%;
            pointer-events: none;
            z-index: 16;
        `;

        sparkle.animate([
            { opacity: 0, transform: 'scale(0.3)' },
            { opacity: 0.8, transform: 'scale(1.5)' },
            { opacity: 0, transform: 'scale(0.5) translateY(-8px)' }
        ], {
            duration: 1200 + Math.random() * 800,
            easing: 'ease-out'
        }).onfinish = () => sparkle.remove();

        document.body.appendChild(sparkle);
    }

    setInterval(bookSparkle, 2000 + Math.random() * 2000);

    // --- Mouse-responsive lamplight glow ---
    scene.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        if (lampLight) {
            const glowX = 35 + x * 15;
            const glowY = 45 + y * 15;
            lampLight.style.background = `radial-gradient(
                ellipse 55% 65% at ${glowX}% ${glowY}%,
                rgba(255,200,100,0.07) 0%,
                rgba(255,160,60,0.03) 35%,
                transparent 65%
            )`;
        }
    });
});

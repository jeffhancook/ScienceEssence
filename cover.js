// ===== ScienceEssence Cover Page Animations =====

document.addEventListener('DOMContentLoaded', () => {

    const scene = document.querySelector('.scene');
    const treeGroup = document.querySelector('.tree-newton-group');
    const clouds = document.querySelectorAll('.cloud');
    const sun = document.querySelector('.sun');

    // --- Parallax on mouse move (sky elements only, tree stays fixed) ---
    scene.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        if (sun) sun.style.transform = `translate(${x * 15}px, ${y * 10}px) scale(${1 + y * 0.02})`;

        clouds.forEach((cloud, i) => {
            const factor = (i + 1) * 5;
            cloud.style.marginTop = `${y * factor}px`;
        });
    });

    // --- Create grass blades along the horizon ---
    const grassSvg = document.querySelector('.grass-blades');
    if (grassSvg) {
        const numBlades = 200;
        for (let i = 0; i < numBlades; i++) {
            const x = Math.random() * 1920;
            const height = 15 + Math.random() * 50;
            const sway = 5 + Math.random() * 12;
            const delay = Math.random() * 2;
            const g1 = Math.floor(100 + Math.random() * 80);
            const g2 = Math.floor(80 + Math.random() * 60);

            const blade = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const cp1x = x + (Math.random() - 0.5) * sway;
            const cp2x = x + (Math.random() - 0.5) * sway * 1.5;
            blade.setAttribute('d', `M${x} 120 Q${cp1x} ${120 - height * 0.6} ${cp2x} ${120 - height}`);
            blade.setAttribute('stroke', `rgb(${30 + Math.floor(Math.random() * 40)}, ${g1}, ${g2})`);
            blade.setAttribute('stroke-width', (1 + Math.random() * 2.5).toString());
            blade.setAttribute('fill', 'none');
            blade.setAttribute('stroke-linecap', 'round');
            blade.style.animation = `bladeSway ${2 + Math.random() * 2}s ease-in-out ${delay}s infinite alternate`;
            grassSvg.appendChild(blade);
        }
    }

    // Also populate the top grass blades layer
    const grassTop = document.querySelector('.grass-blades-top');
    if (grassTop) {
        const numBlades = 120;
        for (let i = 0; i < numBlades; i++) {
            const x = Math.random() * 1920;
            const height = 10 + Math.random() * 30;
            const sway = 3 + Math.random() * 8;
            const delay = Math.random() * 2;
            const g1 = Math.floor(120 + Math.random() * 60);
            const g2 = Math.floor(100 + Math.random() * 50);

            const blade = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const cp1x = x + (Math.random() - 0.5) * sway;
            blade.setAttribute('d', `M${x} 60 Q${cp1x} ${60 - height * 0.6} ${x + (Math.random()-0.5)*sway} ${60 - height}`);
            blade.setAttribute('stroke', `rgb(${50 + Math.floor(Math.random() * 30)}, ${g1}, ${g2})`);
            blade.setAttribute('stroke-width', (0.8 + Math.random() * 1.5).toString());
            blade.setAttribute('fill', 'none');
            blade.setAttribute('stroke-linecap', 'round');
            blade.style.animation = `bladeSway ${2.5 + Math.random() * 2}s ease-in-out ${delay}s infinite alternate`;
            grassTop.appendChild(blade);
        }
    }

    // Add blade sway keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bladeSway {
            from { transform: rotate(-2deg); transform-origin: bottom center; }
            to { transform: rotate(2deg); transform-origin: bottom center; }
        }
    `;
    document.head.appendChild(style);

    // --- Falling leaves from tree ---
    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.style.cssText = `
            position: absolute;
            width: ${6 + Math.random() * 8}px;
            height: ${4 + Math.random() * 6}px;
            background: ${['#4CAF50', '#66BB6A', '#81C784', '#A5D6A7', '#8BC34A', '#689F38'][Math.floor(Math.random() * 6)]};
            border-radius: 0 50% 50% 50%;
            top: ${30 + Math.random() * 20}%;
            left: ${55 + Math.random() * 30}%;
            z-index: 12;
            pointer-events: none;
            opacity: 0.8;
        `;

        const duration = 4 + Math.random() * 6;
        const xDrift = -50 + Math.random() * 100;
        leaf.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 0.8 },
            { transform: `translate(${xDrift * 0.3}px, 100px) rotate(${90 + Math.random() * 180}deg)`, opacity: 0.7 },
            { transform: `translate(${xDrift * 0.7}px, 250px) rotate(${180 + Math.random() * 180}deg)`, opacity: 0.5 },
            { transform: `translate(${xDrift}px, 400px) rotate(${360 + Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'ease-in'
        }).onfinish = () => leaf.remove();

        scene.appendChild(leaf);
    }

    setInterval(createLeaf, 2500);

    // --- Fireflies / sparkles ---
    function createSparkle() {
        const sparkle = document.createElement('div');
        const size = 2 + Math.random() * 4;
        sparkle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255,255,200,0.9), rgba(255,255,150,0));
            border-radius: 50%;
            top: ${30 + Math.random() * 35}%;
            left: ${Math.random() * 100}%;
            z-index: 15;
            pointer-events: none;
        `;

        const duration = 3 + Math.random() * 4;
        sparkle.animate([
            { opacity: 0, transform: 'scale(0.5)' },
            { opacity: 0.8, transform: 'scale(1.2)' },
            { opacity: 0, transform: 'scale(0.5) translateY(-30px)' }
        ], {
            duration: duration * 1000,
            easing: 'ease-in-out'
        }).onfinish = () => sparkle.remove();

        scene.appendChild(sparkle);
    }

    setInterval(createSparkle, 1000);

    // --- Physics-based falling apple ---
    const fallingApple = document.querySelector('.falling-apple-wrap');
    if (fallingApple) {
        const GRAVITY = 380;          // px/s² (acceleration)
        const HEAD_Y = 131;           // distance from apple start to top of Newton's head (px)
        const GROUND_Y = 320;         // distance from apple start to ground (px)
        const RESTITUTION = 0.35;     // bounciness (energy kept per bounce)
        const WOBBLE_AMP = 4;         // slight horizontal wobble during fall
        const SPIN_SPEED = 90;        // degrees per second rotation
        const INTERVAL = 7000;        // ms between drops
        const FADE_AFTER = 2;         // fade after N bounces off head

        function dropApple() {
            let y = 0;
            let vy = 0;               // vertical velocity
            let vx = 0;               // horizontal velocity after head bonk
            let x = 0;
            let rotation = 0;
            let bounceCount = 0;
            let opacity = 1;
            let hitHead = false;
            let phase = 'falling';     // falling -> bouncing -> rolling -> done
            let lastTime = null;

            fallingApple.style.opacity = '1';
            fallingApple.style.transform = 'translate(0, 0) rotate(0deg)';

            function frame(timestamp) {
                if (!lastTime) lastTime = timestamp;
                const dt = Math.min((timestamp - lastTime) / 1000, 0.05); // cap dt
                lastTime = timestamp;

                if (phase === 'falling' || phase === 'bouncing') {
                    // Apply gravity
                    vy += GRAVITY * dt;
                    y += vy * dt;
                    x += vx * dt;

                    // Slight wobble while in free-fall (air resistance asymmetry)
                    if (!hitHead) {
                        x = Math.sin(y * 0.03) * WOBBLE_AMP * (y / HEAD_Y);
                    }

                    // Spin proportional to velocity
                    rotation += SPIN_SPEED * dt * (vy > 0 ? 1 : -0.5);

                    // Hit Newton's head
                    if (!hitHead && y >= HEAD_Y) {
                        hitHead = true;
                        y = HEAD_Y;
                        vy = -vy * RESTITUTION;   // bounce up
                        vx = -30 - Math.random() * 20; // deflect to the left
                        bounceCount++;
                        phase = 'bouncing';
                    }

                    // Hit ground after bouncing off head
                    if (hitHead && y >= GROUND_Y) {
                        y = GROUND_Y;
                        vy = -vy * (RESTITUTION * 0.6); // less bouncy on ground
                        vx *= 0.7;                        // friction
                        bounceCount++;

                        // Stop bouncing when velocity is tiny
                        if (Math.abs(vy) < 15) {
                            phase = 'rolling';
                            vy = 0;
                        }
                    }

                    // Fade out after a couple bounces
                    if (bounceCount >= FADE_AFTER) {
                        opacity = Math.max(0, opacity - dt * 0.8);
                    }
                } else if (phase === 'rolling') {
                    // Roll along ground with friction
                    vx *= (1 - 2.5 * dt); // ground friction
                    x += vx * dt;
                    rotation += vx * dt * 3;
                    opacity = Math.max(0, opacity - dt * 0.6);

                    if (opacity <= 0) {
                        phase = 'done';
                    }
                }

                fallingApple.style.opacity = String(opacity);
                fallingApple.style.transform =
                    `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rotation.toFixed(1)}deg)`;

                if (phase !== 'done' && opacity > 0) {
                    requestAnimationFrame(frame);
                } else {
                    // Reset for next drop
                    fallingApple.style.opacity = '0';
                }
            }

            requestAnimationFrame(frame);
        }

        // First drop after a short delay, then repeat
        setTimeout(dropApple, 2500);
        setInterval(dropApple, INTERVAL);
    }

    // --- Cycle thought bubble text ---
    const thoughts = [
        'F = G(m₁m₂)/r²',
        'F = ma',
        'What if light is particles?',
        'Every action...',
        '∫ F·ds = ΔKE',
        'Gravity!',
        'Principia Mathematica',
        'v = u + at'
    ];

    const thoughtText = document.querySelector('.thought-text');
    let thoughtIndex = 0;

    if (thoughtText) {
        setInterval(() => {
            thoughtIndex = (thoughtIndex + 1) % thoughts.length;
            thoughtText.textContent = thoughts[thoughtIndex];
        }, 5000);
    }

    // --- Title letter glow on hover ---
    const titleWords = document.querySelectorAll('.title-word');
    titleWords.forEach(word => {
        word.addEventListener('mouseenter', () => {
            word.style.filter = 'drop-shadow(0 0 15px rgba(74, 45, 138, 0.5))';
            word.style.transition = 'filter 0.3s ease';
        });
        word.addEventListener('mouseleave', () => {
            word.style.filter = 'drop-shadow(2px 3px 4px rgba(0,0,0,0.15))';
        });
    });
});

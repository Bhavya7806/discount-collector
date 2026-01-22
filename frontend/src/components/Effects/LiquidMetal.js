import React, { useEffect, useRef } from 'react';
import './LiquidMetal.css';

const LiquidMetal = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    
    // Mouse state
    const mouse = { x: -100, y: -100 };

    // Resize handler
    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      createParticles();
    };

    // Particle Logic (The "Liquid" Grid)
    const createParticles = () => {
      particles = [];
      const gap = 30; // Spacing between liquid points
      const rows = Math.ceil(height / gap);
      const cols = Math.ceil(width / gap);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          particles.push({
            x: x * gap,
            y: y * gap,
            originX: x * gap,
            originY: y * gap,
            vx: 0,
            vy: 0,
            color: '#1e1e28' // Base charcoal color
          });
        }
      }
    };

    const update = () => {
      ctx.fillStyle = '#0a0a0f'; // Midnight Noir base
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        // 1. Calculate distance from mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // 2. Ripple Force (The "Push" when cursor moves)
        const force = Math.max(0, 200 - dist); 
        const angle = Math.atan2(dy, dx);
        
        if (dist < 200) {
          p.vx -= Math.cos(angle) * force * 0.02;
          p.vy -= Math.sin(angle) * force * 0.02;
        }

        // 3. Spring back to origin (Elasticity)
        p.vx += (p.originX - p.x) * 0.05;
        p.vy += (p.originY - p.y) * 0.05;

        // 4. Friction (Damping)
        p.vx *= 0.9;
        p.vy *= 0.9;

        p.x += p.vx;
        p.y += p.vy;

        // 5. Color Shifting (Oil Slick Effect based on speed)
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        let color = '#2a2a35'; // Default Dark Slate
        
        // If moving fast, shift to "Oil Slick" colors
        if (speed > 0.5) {
          // Cycle through Cyan, Violet, Emerald based on position/speed
          const hue = (p.x * 0.1 + p.y * 0.1 + speed * 20) % 360;
          color = `hsl(${hue}, 70%, 60%)`;
        } else {
          // Metallic sheen for static points
          const sheen = Math.min(255, 30 + p.x / width * 20);
          color = `rgb(${sheen}, ${sheen}, ${sheen + 10})`;
        }

        // Draw the point/blob
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(2, speed * 1.5), 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        
        // Draw connections for "Surface" feel (optional, expensive but looks good)
        // Kept off for performance, relying on dot density for "sheen"
      });

      requestAnimationFrame(update);
    };

    // Listeners
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    resize();
    update();

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="liquid-canvas" />;
};

export default LiquidMetal;
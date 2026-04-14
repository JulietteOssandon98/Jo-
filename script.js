/**
 * PORTAFOLIO PROFESIONAL - JULIETTE OSSANDÓN
 * Funcionalidades: Modo Oscuro, Smooth Scroll e Interacciones
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INICIALIZAR ICONOS (Lucide)
    // Esto dibuja todos los iconos <i data-lucide="..."></i>
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. MODO OSCURO (Lógica de persistencia)
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Verificar si el usuario ya tenía una preferencia guardada en su navegador
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    if (savedTheme) {
        body.classList.remove('light-mode', 'dark-mode');
        body.classList.add(savedTheme);
        actualizarIconoTema(savedTheme === 'dark-mode');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const esOscuro = body.classList.contains('dark-mode');
            
            if (esOscuro) {
                body.classList.replace('dark-mode', 'light-mode');
                localStorage.setItem('portfolio-theme', 'light-mode');
                actualizarIconoTema(false);
            } else {
                body.classList.replace('light-mode', 'dark-mode');
                localStorage.setItem('portfolio-theme', 'dark-mode');
                actualizarIconoTema(true);
            }
        });
    }

    function actualizarIconoTema(isDark) {
        const icon = document.getElementById('theme-icon');
        if (icon) {
            icon.setAttribute('data-lucide', isDark ? 'moon' : 'sun');
            lucide.createIcons(); // Re-dibujar el nuevo icono
        }
    }

    // 3. SCROLL SUAVE (Navegación fluida)
    // Hace que al hacer clic en los enlaces del Nav, la web baje suavemente
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = 80; // Altura de tu navbar para que no tape el título
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. ENVÍO DE FORMULARIO (Feedback visual)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', () => {
            // Mostramos un mensaje en consola para confirmar que sale hacia el Gmail
            console.log("Enviando mensaje a designerweb.juliette@gmail.com vía Formspree...");
            // Nota: Formspree se encarga de la redirección y el envío real.
        });
    }

    // 5. EFECTO REVELAR NAVBAR AL HACER SCROLL
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
        }
    });

});
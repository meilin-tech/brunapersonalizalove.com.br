// ===========================
// OTIMIZAÇÕES DE PERFORMANCE
// ===========================

// Lazy Loading de Imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===========================
// MENU RESPONSIVO - HAMBURGER
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu ao clicar no hamburger
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// ===========================
// EFEITO DE SCROLL NA NAVBAR
// ===========================

window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.15)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.08)';
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});

// ===========================
// ANIMAÇÃO DE SCROLL SUAVE
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            
            const targetElement = document.querySelector(href);
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===========================
// OBSERVADOR PARA ANIMAÇÕES
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos de portfólio
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(item);
});

// Observar itens de features
document.querySelectorAll('.feature-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(item);
});

// ===========================
// CONTADOR DE ANIMAÇÃO
// ===========================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ===========================
// EFEITO PARALLAX (OPCIONAL)
// ===========================

window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    
    const decorationCircle = document.querySelector('.decoration-circle');
    const decorationSquare = document.querySelector('.decoration-square');
    const decorationTriangle = document.querySelector('.decoration-triangle');
    
    if (decorationCircle) {
        decorationCircle.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
    if (decorationSquare) {
        decorationSquare.style.transform = `translateY(${scrollPosition * 0.3}px) rotate(45deg)`;
    }
    if (decorationTriangle) {
        decorationTriangle.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    }
});

// ===========================
// VALIDAÇÃO DE LINKS WHATSAPP
// ===========================

function updateWhatsAppLinks() {
    // Substitua pelo número real do WhatsApp
    const whatsappNumber = '5518997274433'; // Formato: 55 + DDD + número
    const message = 'Olá Bruna! Gostaria de solicitar um orçamento para meu projeto personalizado.';
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Atualizar todos os links do WhatsApp
    document.querySelectorAll('.whatsapp-float, .cta-button-large').forEach(link => {
        if (link.href.includes('wa.me')) {
            link.href = whatsappUrl;
        }
    });
}

// Chamar função ao carregar
updateWhatsAppLinks();

// ===========================
// EFEITO HOVER NOS CARDS
// ===========================

document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ===========================
// DETECÇÃO DE DISPOSITIVO MÓVEL
// ===========================

function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Ajustar comportamento para móvel
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    
    // Desabilitar parallax em dispositivos móveis para melhor performance
    window.removeEventListener('scroll', function() {});
}

// ===========================
// PRELOADER (OPCIONAL)
// ===========================

window.addEventListener('load', function() {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.5s ease-out';
});

// ===========================
// DARK MODE TOGGLE (FUTURO)
// ===========================

function initDarkMode() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDark) {
        // Implementar dark mode se necessário
        // document.body.classList.add('dark-mode');
    }
}

initDarkMode();

// ===========================
// ANALYTICS E RASTREAMENTO
// ===========================

// Rastrear cliques em CTA
document.querySelectorAll('.cta-button, .cta-button-large, .whatsapp-float').forEach(button => {
    button.addEventListener('click', function() {
        console.log('CTA clicado:', this.textContent);
        // Aqui você pode adicionar rastreamento do Google Analytics ou similar
    });
});

// ===========================
// FUNÇÃO DE COMPARTILHAMENTO
// ===========================

function shareOnSocial(platform) {
    const url = window.location.href;
    const title = 'Bruna Personaliza Love - Papelaria Personalizada';
    
    let shareUrl = '';
    
    switch(platform) {
        case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
        case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
            break;
        case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
    }
    
    if (shareUrl) {
        window.open(shareUrl, '_blank', 'width=600,height=400');
    }
}

// ===========================
// INICIALIZAÇÃO
// ===========================

// Registrar Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
        console.log('Service Worker não disponível:', err);
    });
}

console.log('Bruna Personaliza Love - Site carregado com sucesso! 💕');

// Monitorar Core Web Vitals
if ('web-vital' in window) {
    console.log('Monitorando Core Web Vitals...');
}


// ===========================
// FILTROS DE PORTFÓLIO
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');

            // Remover classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Adicionar classe active ao botão clicado
            this.classList.add('active');

            // Filtrar itens
            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'slideInUp 0.6s ease-out forwards';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// ===========================
// ANIMAÇÃO DE ENTRADA PARA ITENS FILTRADOS
// ===========================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ===========================
// INTERATIVIDADE INSTAGRAM
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const instagramStories = document.querySelectorAll('.instagram-story');
    
    instagramStories.forEach((story, index) => {
        story.addEventListener('click', function() {
            // Redirecionar para Instagram ao clicar em qualquer história
            window.open('https://www.instagram.com/bruna_personalizalove', '_blank');
        });

        // Adicionar animação de hover
        story.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
        });

        story.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Animar o telefone
    const instagramPhone = document.querySelector('.instagram-phone');
    if (instagramPhone) {
        instagramPhone.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 30px 80px rgba(0, 0, 0, 0.4)';
        });

        instagramPhone.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.3)';
        });
    }
});

// ===========================
// RASTREAMENTO DE CLIQUES INSTAGRAM
// ===========================

document.addEventListener('DOMContentLoaded', function() {
    const instagramButton = document.querySelector('.instagram-button');
    
    if (instagramButton) {
        instagramButton.addEventListener('click', function() {
            console.log('Clique no botão Instagram - Redirecionando para @brunapersonalizalove');
        });
    }
});

// ===========================
// LAZY LOADING APRIMORADO
// ===========================

if ('IntersectionObserver' in window) {
    const portfolioPhotos = document.querySelectorAll('.portfolio-photo');
    
    const photoObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Se a imagem não carregou ainda, carregar
                if (img.dataset.src && !img.src) {
                    img.src = img.dataset.src;
                }
                
                img.addEventListener('load', function() {
                    this.style.animation = 'fadeIn 0.5s ease-in';
                });
                
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    portfolioPhotos.forEach(photo => photoObserver.observe(photo));
}

// ===========================
// ANIMAÇÃO DE FADE IN
// ===========================

const fadeInStyle = document.createElement('style');
fadeInStyle.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(fadeInStyle);

console.log('Portfólio e Instagram - Funcionalidades ativadas! 📸');

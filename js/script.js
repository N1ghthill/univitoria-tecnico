// Dados dos cursos
const cursos = {
    saude: [
        "Técnico em Agente Comunitário de Saúde",
        "Técnico em Análises Clínicas", 
        "Técnico em Cuidador de Idosos",
        "Técnico em Enfermagem",
        "Técnico em Equipamentos Biomédicos",
        "Técnico em Estética",
        "Técnico em Farmácia",
        "Técnico em Gerência em Saúde",
        "Técnico em Nutrição e Dietética",
        "Técnico em Saúde Bucal",
        "Técnico em Veterinária"
    ],
    administracao: [
        "Técnico em Administração",
        "Técnico em Contabilidade",
        "Técnico em Logística",
        "Técnico em Marketing",
        "Técnico em Qualidade",
        "Técnico em Recursos Humanos",
        "Técnico em Secretaria Escolar",
        "Técnico em Segurança do Trabalho",
        "Técnico em Serviços Jurídicos",
        "Técnico em Transações Imobiliárias",
        "Técnico em Vendas",
        "Técnico em Eventos"
    ],
    tecnologia: [
        "Técnico em Biotecnologia",
        "Técnico em Design Gráfico",
        "Técnico em Desenvolvimento de Sistemas",
        "Técnico em Informática para Internet",
        "Técnico em Rede de Computadores",
        "Técnico em Sistemas de Energia Renovável",
        "Técnico em Telecomunicações",
        "Técnico em Tradução e Interpretação de Libras",
        "Técnico em Informática"
    ],
    engenharia: [
        "Técnico em Automação Industrial",
        "Técnico em Eletromecânica",
        "Técnico em Eletrotécnica",
        "Técnico em Eletrônica",
        "Técnico em Manutenção de Máquinas Industriais",
        "Técnico em Máquinas Pesadas",
        "Técnico em Metalurgia",
        "Técnico em Mecânica",
        "Técnico em Refrigeração e Climatização",
        "Técnico em Soldagem",
        "Técnico em Manutenção de Máquinas Navais"
    ],
    construcao: [
        "Técnico em Agrimensura",
        "Técnico em Edificações",
        "Técnico em Mineração",
        "Técnico em Segurança do Trabalho",
        "Técnico em Prevenção e Combate ao Incêndio",
        "Técnico em Defesa Civil",
        "Técnico em Trânsito"
    ],
    servicos: [
        "Técnico em Gastronomia",
        "Técnico em Óptica",
        "Técnico em Designer de Interiores",
        "Técnico em Guia de Turismo",
        "Técnico em Química"
    ]
};

// Cart functionality
let cart = {
    items: [],
    total: 0,
    count: 0
};

// Atualizar ano atual no footer
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
}

// Função para filtrar cursos
function setupCategoryCards() {
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            const categoryName = this.querySelector('h3').textContent;
            alert(`Cursos da área ${categoryName}:\n\n${cursos[category].join('\n')}`);
        });
    });
}

// Função para busca
function setupSearch() {
    const searchButton = document.querySelector('.search-box button');
    const searchInput = document.querySelector('.search-box input');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            alert('Por favor, digite um termo para buscar.');
            return;
        }
        
        let resultados = [];
        
        for (const categoria in cursos) {
            cursos[categoria].forEach(curso => {
                if (curso.toLowerCase().includes(searchTerm)) {
                    resultados.push(curso);
                }
            });
        }
        
        if (resultados.length > 0) {
            alert(`Cursos encontrados para "${searchTerm}":\n\n${resultados.join('\n')}`);
        } else {
            alert(`Nenhum curso encontrado para "${searchTerm}"`);
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Função para adicionar ao carrinho
function setupAddToCartButtons() {
    document.querySelectorAll('.course-card .btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const courseCard = this.closest('.course-card');
            const courseTitle = courseCard.querySelector('h3').textContent;
            const coursePrice = courseCard.querySelector('.price').textContent;
            const courseCategory = courseCard.querySelector('.course-category').textContent;
            
            // Adicionar ao carrinho
            cart.items.push({
                title: courseTitle,
                price: coursePrice,
                category: courseCategory
            });
            
            // Atualizar contador
            updateCartCount();
            
            // Feedback visual
            showCartNotification(courseTitle);
        });
    });
}

function updateCartCount() {
    cart.count = cart.items.length;
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.count;
        
        // Animação no contador
        cartCountElement.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCountElement.style.transform = 'scale(1)';
        }, 300);
    }
}

function showCartNotification(courseTitle) {
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>"${courseTitle}" adicionado ao carrinho!</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--blue-dark);
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Adicionar CSS para animação
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remover após 3 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Menu mobile
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        const icon = this.querySelector('i');
        if (nav.classList.contains('active')) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
        });
    });
}

// Smooth scroll para âncoras
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Ativar link ativo na navegação
function setupActiveNavLinks() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('nav-active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('nav-active');
            }
        });
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentYear();
    setupCategoryCards();
    setupSearch();
    setupAddToCartButtons();
    setupMobileMenu();
    setupSmoothScroll();
    setupActiveNavLinks();
    
    // Pré-carregar funcionalidades extras
    console.log('Site da Univitória Técnico carregado com sucesso!');
});
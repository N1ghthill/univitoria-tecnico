// main.js - Funcionalidades principais do site Univitória Técnico

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    console.log('Univitória Técnico - Site carregado com sucesso!');
    
    // Inicializar todos os módulos
    initSite();
});

/**
 * Inicializa todas as funcionalidades do site
 */
function initSite() {
    // 1. Menu Mobile
    setupMobileMenu();
    
    // 2. Atualizar ano no footer
    updateCurrentYear();
    
    // 3. Sistema de busca
    setupSearch();
    
    // 4. Navegação ativa
    setupActiveNavigation();
    
    // 5. Smooth scroll para âncoras
    setupSmoothScroll();
    
    // 6. Carregar categorias
    loadCategories();
    
    // 7. Sistema de notificações
    setupNotifications();
}

/**
 * Configura o menu mobile
 */
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileClose = document.getElementById('mobileClose');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuToggle || !mobileMenu) {
        console.warn('Elementos do menu mobile não encontrados');
        return;
    }
    
    /**
     * Abre o menu mobile
     */
    function openMobileMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleEscapeKey);
    }
    
    /**
     * Fecha o menu mobile
     */
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleEscapeKey);
    }
    
    /**
     * Manipula a tecla ESC
     * @param {KeyboardEvent} e - Evento do teclado
     */
    function handleEscapeKey(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    }
    
    // Event Listeners
    mobileMenuToggle.addEventListener('click', openMobileMenu);
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Fechar ao clicar em links do menu
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Não fechar imediatamente para links âncora
            if (!link.getAttribute('href').startsWith('#')) {
                setTimeout(closeMobileMenu, 300);
            } else {
                setTimeout(closeMobileMenu, 1000);
            }
        });
    });
    
    console.log('Menu mobile configurado com sucesso');
}

/**
 * Atualiza o ano atual no footer
 */
function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('#currentYear');
    
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });
}

/**
 * Configura o sistema de busca
 */
function setupSearch() {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;
    
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    /**
     * Executa a busca
     */
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        
        if (!searchTerm) {
            showNotification('Digite o nome de um curso para buscar', 'warning');
            searchInput.focus();
            return;
        }
        
        // Limpar termo de busca
        const cleanTerm = searchTerm.toLowerCase().replace(/[^\w\s]/gi, '');
        
        // Verificar se estamos na página de cursos
        if (window.location.pathname.includes('cursos.html')) {
            // Disparar busca na página de cursos
            const cursosSearchInput = document.getElementById('buscaInput');
            const cursosSearchButton = document.getElementById('buscaBtn');
            
            if (cursosSearchInput && cursosSearchButton) {
                cursosSearchInput.value = searchTerm;
                cursosSearchButton.click();
            }
        } else {
            // Redirecionar para página de cursos com o termo de busca
            window.location.href = `cursos.html?busca=${encodeURIComponent(cleanTerm)}`;
        }
    }
    
    // Event Listeners
    searchButton.addEventListener('click', performSearch);
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

/**
 * Configura a navegação ativa
 */
function setupActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('nav-active', 'active');
        
        const href = link.getAttribute('href');
        
        // Verificar se é a página atual
        if (currentPage === '' || currentPage === 'index.html') {
            if (href === 'index.html' || href === './') {
                link.classList.add('nav-active', 'active');
            }
        } else if (href === currentPage) {
            link.classList.add('nav-active', 'active');
        }
        
        // Verificar links âncora na página atual
        if (href.startsWith('#')) {
            link.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Atualizar classe ativa
                    navLinks.forEach(l => l.classList.remove('nav-active', 'active'));
                    this.classList.add('nav-active', 'active');
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
}

/**
 * Configura scroll suave para âncoras
 */
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignorar links vazios
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                
                // Calcular posição com offset do header
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Atualizar URL sem recarregar a página
                history.pushState(null, null, href);
            }
        });
    });
}

/**
 * Carrega as categorias na página inicial
 */
function loadCategories() {
    const categoriasGrid = document.querySelector('.categorias-grid');
    if (!categoriasGrid) return;
    
    const categorias = [
        {
            id: 'saude',
            nome: 'SAÚDE',
            icone: 'fas fa-heartbeat',
            descricao: '11 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=saude',
            cor: 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)'
        },
        {
            id: 'administracao',
            nome: 'ADMINISTRAÇÃO',
            icone: 'fas fa-chart-line',
            descricao: '12 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=administracao',
            cor: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)'
        },
        {
            id: 'tecnologia',
            nome: 'TECNOLOGIA',
            icone: 'fas fa-laptop-code',
            descricao: '9 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=tecnologia',
            cor: 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)'
        },
        {
            id: 'engenharia',
            nome: 'ENGENHARIA',
            icone: 'fas fa-cogs',
            descricao: '11 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=engenharia',
            cor: 'linear-gradient(135deg, var(--warning) 0%, #D97706 100%)'
        },
        {
            id: 'construcao',
            nome: 'CONSTRUÇÃO',
            icone: 'fas fa-hard-hat',
            descricao: '7 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=construcao',
            cor: 'linear-gradient(135deg, var(--accent) 0%, #059669 100%)'
        },
        {
            id: 'meio-ambiente',
            nome: 'MEIO AMBIENTE',
            icone: 'fas fa-leaf',
            descricao: '1 curso técnico disponível',
            link: 'cursos.html?categoria=meio-ambiente',
            cor: 'linear-gradient(135deg, var(--accent) 0%, #047857 100%)'
        },
        {
            id: 'servicos',
            nome: 'SERVIÇOS',
            icone: 'fas fa-concierge-bell',
            descricao: '4 cursos técnicos disponíveis',
            link: 'cursos.html?categoria=servicos',
            cor: 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
        }
    ];
    
    // Limpar conteúdo existente
    categoriasGrid.innerHTML = '';
    
    // Criar cards das categorias
    categorias.forEach(categoria => {
        const card = document.createElement('div');
        card.className = 'categoria-card';
        card.setAttribute('data-categoria', categoria.id);
        
        card.innerHTML = `
            <div class="categoria-icon" style="background: ${categoria.cor}">
                <i class="${categoria.icone}"></i>
            </div>
            <h3>${categoria.nome}</h3>
            <p>${categoria.descricao}</p>
            <a href="${categoria.link}" class="categoria-link">
                VER CURSOS <i class="fas fa-arrow-right"></i>
            </a>
        `;
        
        categoriasGrid.appendChild(card);
    });
    
    console.log(`Carregadas ${categorias.length} categorias`);
}

/**
 * Configura o sistema de notificações
 */
function setupNotifications() {
    // Adicionar estilos CSS para notificações
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 1rem 1.5rem;
                border-radius: var(--radius);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
                box-shadow: var(--shadow-xl);
                animation: slideInRight 0.3s ease-out;
                max-width: 350px;
            }
            
            .notification.success {
                background-color: var(--accent);
                color: white;
                border-left: 4px solid #059669;
            }
            
            .notification.warning {
                background-color: var(--warning);
                color: white;
                border-left: 4px solid #D97706;
            }
            
            .notification.error {
                background-color: #EF4444;
                color: white;
                border-left: 4px solid #DC2626;
            }
            
            .notification.info {
                background-color: var(--primary);
                color: white;
                border-left: 4px solid var(--primary-dark);
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOutRight {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Exibe uma notificação na tela
 * @param {string} message - Mensagem da notificação
 * @param {string} type - Tipo da notificação (success, warning, error, info)
 * @param {number} duration - Duração em milissegundos (padrão: 3000)
 */
function showNotification(message, type = 'success', duration = 3000) {
    // Criar elemento da notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Ícone baseado no tipo
    let icon = 'fas fa-check-circle';
    switch (type) {
        case 'warning':
            icon = 'fas fa-exclamation-triangle';
            break;
        case 'error':
            icon = 'fas fa-times-circle';
            break;
        case 'info':
            icon = 'fas fa-info-circle';
            break;
    }
    
    notification.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Remover após a duração especificada
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, duration);
}

/**
 * Formata valor monetário
 * @param {number} value - Valor a ser formatado
 * @returns {string} Valor formatado em Real
 */
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}

/**
 * Formata número com separadores
 * @param {number} value - Número a ser formatado
 * @returns {string} Número formatado
 */
function formatNumber(value) {
    return new Intl.NumberFormat('pt-BR').format(value);
}

/**
 * Verifica se um elemento está visível na viewport
 * @param {HTMLElement} element - Elemento a verificar
 * @returns {boolean} True se o elemento está visível
 */
function isElementInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Debounce para otimizar eventos de redimensionamento e scroll
 * @param {Function} func - Função a ser executada
 * @param {number} wait - Tempo de espera em ms
 * @returns {Function} Função debounced
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Exportar funções para uso global
window.UniVitóriaTecnico = {
    showNotification,
    formatCurrency,
    formatNumber,
    isElementInViewport
};

// Configurar debounced resize handler
window.addEventListener('resize', debounce(() => {
    // Recalcular elementos que dependem do tamanho da tela
}, 250));

console.log('Sistema principal inicializado com sucesso!');
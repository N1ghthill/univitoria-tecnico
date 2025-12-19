// Script principal - Funcionalidades gerais
document.addEventListener('DOMContentLoaded', function() {
    // 1. Menu Mobile
    setupMobileMenu();
    
    // 2. Carrinho de Compras
    setupCarrinho();
    
    // 3. Funcionalidades gerais
    setupGenerais();
    
    console.log('Univitória Técnico - Site carregado com sucesso!');
});

// Menu Mobile
function setupMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileClose = document.getElementById('mobileClose') || document.getElementById('mobileClose2');
    const mobileOverlay = document.getElementById('mobileOverlay') || document.getElementById('mobileOverlay2');
    const mobileMenu = document.getElementById('mobileMenu') || document.getElementById('mobileMenu2');
    
    if (!menuToggle || !mobileMenu) return;
    
    // Abrir menu
    menuToggle.addEventListener('click', () => {
        openMobileMenu();
    });
    
    // Fechar menu
    function closeMobileMenu() {
        if (mobileMenu) mobileMenu.classList.remove('active');
        if (mobileOverlay) mobileOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function openMobileMenu() {
        if (mobileMenu) mobileMenu.classList.add('active');
        if (mobileOverlay) mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    if (mobileClose) {
        mobileClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileOverlay) {
        mobileOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Fechar com ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMobileMenu();
        }
    });
    
    // Fechar ao clicar em links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(closeMobileMenu, 300);
        });
    });
}

// Carrinho de Compras
function setupCarrinho() {
    let carrinho = JSON.parse(localStorage.getItem('univitoria_carrinho')) || {
        items: [],
        total: 0,
        count: 0
    };
    
    // Atualizar contador inicial
    updateCartCount();
    
    // Configurar botões do carrinho
    document.querySelectorAll('.btn-carrinho, .btn[onclick*="adicionarAoCarrinho"]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Extrair dados do curso
            const cursoCard = this.closest('.curso-card, .carrossel-item');
            let nome, preco;
            
            if (cursoCard) {
                nome = cursoCard.querySelector('.curso-titulo, .carrossel-item-title')?.textContent || 'Curso Técnico';
                const precoText = cursoCard.querySelector('.preco-atual, .carrossel-price')?.textContent || 'R$ 0,00';
                preco = parseFloat(precoText.replace('R$', '').replace('.', '').replace(',', '.').trim());
            }
            
            if (nome && preco) {
                addToCart(nome, preco);
            }
        });
    });
    
    // Função para adicionar ao carrinho
    function addToCart(nome, preco) {
        // Verificar se item já existe
        const existingItem = carrinho.items.find(item => item.nome === nome);
        
        if (existingItem) {
            existingItem.quantidade += 1;
        } else {
            carrinho.items.push({
                id: Date.now(),
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }
        
        // Atualizar total e contagem
        carrinho.total = carrinho.items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);
        carrinho.count = carrinho.items.reduce((sum, item) => sum + item.quantidade, 0);
        
        // Salvar no localStorage
        localStorage.setItem('univitoria_carrinho', JSON.stringify(carrinho));
        
        // Atualizar UI
        updateCartCount();
        
        // Mostrar notificação
        showCartNotification(nome);
    }
    
    // Atualizar contador do carrinho
    function updateCartCount() {
        const cartCounts = document.querySelectorAll('.cart-count');
        cartCounts.forEach(count => {
            count.textContent = carrinho.count;
            
            // Animação
            if (carrinho.count > 0) {
                count.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    count.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
    
    // Notificação do carrinho
    function showCartNotification(nomeCurso) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>"${nomeCurso}" adicionado ao carrinho!</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--secondary, #FF6B00);
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 9999;
            animation: slideInRight 0.3s ease-out;
        `;
        
        // Adicionar estilos de animação
        if (!document.querySelector('#cart-animation-styles')) {
            const style = document.createElement('style');
            style.id = 'cart-animation-styles';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // Modal do carrinho
    document.querySelectorAll('.cart-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            showCartModal();
        });
    });
    
    function showCartModal() {
        const modal = document.createElement('div');
        modal.className = 'cart-modal-overlay';
        
        let itemsHTML = '';
        if (carrinho.items.length === 0) {
            itemsHTML = '<div class="cart-empty"><i class="fas fa-shopping-cart"></i><p>Seu carrinho está vazio</p></div>';
        } else {
            carrinho.items.forEach(item => {
                itemsHTML += `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.nome}</h4>
                            <p>${item.quantidade} x R$ ${item.preco.toFixed(2)}</p>
                        </div>
                        <div class="cart-item-total">
                            R$ ${(item.quantidade * item.preco).toFixed(2)}
                        </div>
                    </div>
                `;
            });
        }
        
        modal.innerHTML = `
            <div class="cart-modal">
                <div class="cart-modal-header">
                    <h3><i class="fas fa-shopping-cart"></i> Seu Carrinho</h3>
                    <button class="cart-modal-close">&times;</button>
                </div>
                <div class="cart-modal-body">
                    ${itemsHTML}
                </div>
                <div class="cart-modal-footer">
                    <div class="cart-total">
                        <strong>Total:</strong>
                        <span>R$ ${carrinho.total.toFixed(2)}</span>
                    </div>
                    <button class="btn btn-primary btn-checkout" ${carrinho.items.length === 0 ? 'disabled' : ''}>
                        <i class="fas fa-credit-card"></i> Finalizar Compra
                    </button>
                </div>
            </div>
        `;
        
        // Estilos do modal
        const style = document.createElement('style');
        style.textContent = `
            .cart-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0,0,0,0.5);
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s;
            }
            
            .cart-modal {
                background: white;
                border-radius: 10px;
                width: 90%;
                max-width: 500px;
                max-height: 80vh;
                display: flex;
                flex-direction: column;
                animation: slideUp 0.3s;
            }
            
            .cart-modal-header {
                padding: 20px;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            
            .cart-modal-header h3 {
                display: flex;
                align-items: center;
                gap: 10px;
                margin: 0;
                color: var(--primary, #0056A6);
            }
            
            .cart-modal-close {
                background: none;
                border: none;
                font-size: 28px;
                cursor: pointer;
                color: #666;
                transition: color 0.3s;
            }
            
            .cart-modal-close:hover {
                color: var(--secondary, #FF6B00);
            }
            
            .cart-modal-body {
                padding: 20px;
                flex: 1;
                overflow-y: auto;
            }
            
            .cart-empty {
                text-align: center;
                padding: 40px 20px;
                color: #666;
            }
            
            .cart-empty i {
                font-size: 48px;
                margin-bottom: 15px;
                opacity: 0.5;
            }
            
            .cart-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px 0;
                border-bottom: 1px solid #eee;
            }
            
            .cart-item:last-child {
                border-bottom: none;
            }
            
            .cart-item-info h4 {
                margin: 0 0 5px 0;
                font-size: 16px;
                color: #333;
            }
            
            .cart-item-info p {
                margin: 0;
                font-size: 14px;
                color: #666;
            }
            
            .cart-item-total {
                font-weight: bold;
                color: var(--secondary, #FF6B00);
                font-size: 16px;
            }
            
            .cart-modal-footer {
                padding: 20px;
                border-top: 1px solid #eee;
            }
            
            .cart-total {
                display: flex;
                justify-content: space-between;
                margin-bottom: 20px;
                font-size: 18px;
                padding: 10px 0;
                border-top: 1px solid #eee;
                border-bottom: 1px solid #eee;
            }
            
            .btn-checkout {
                width: 100%;
                padding: 15px;
                font-size: 16px;
            }
            
            .btn-checkout:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(modal);
        
        // Event listeners do modal
        modal.querySelector('.cart-modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
        
        // Finalizar compra
        modal.querySelector('.btn-checkout').addEventListener('click', () => {
            alert('Redirecionando para checkout...\n\nEsta é uma demonstração. Em um sistema real, aqui seria integrado com um gateway de pagamento.');
            document.body.removeChild(modal);
            
            // Limpar carrinho após compra
            carrinho = { items: [], total: 0, count: 0 };
            localStorage.setItem('univitoria_carrinho', JSON.stringify(carrinho));
            updateCartCount();
        });
    }
}

// Funcionalidades gerais
function setupGenerais() {
    // Atualizar ano no footer
    updateCurrentYear();
    
    // Smooth scroll para âncoras
    setupSmoothScroll();
    
    // Sistema de busca na página inicial
    setupSearch();
    
    // Navegação ativa
    setupActiveNav();
}

function updateCurrentYear() {
    const currentYear = new Date().getFullYear();
    document.querySelectorAll('#currentYear, #currentYear2').forEach(el => {
        el.textContent = currentYear;
    });
}

function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#' || href === '#!') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function setupSearch() {
    const searchBox = document.querySelector('.search-box');
    if (!searchBox) return;
    
    const input = searchBox.querySelector('input');
    const button = searchBox.querySelector('button');
    
    function performSearch() {
        const term = input.value.trim();
        
        if (!term) {
            alert('Digite o nome de um curso para buscar.');
            return;
        }
        
        // Verificar se estamos na página de cursos
        if (window.location.pathname.includes('cursos.html')) {
            // Disparar busca na página de cursos
            const buscaInput = document.getElementById('buscaInput');
            const buscaBtn = document.getElementById('buscaBtn');
            
            if (buscaInput && buscaBtn) {
                buscaInput.value = term;
                buscaBtn.click();
            }
        } else {
            // Redirecionar para página de cursos com o termo de busca
            window.location.href = `cursos.html?busca=${encodeURIComponent(term)}`;
        }
    }
    
    button.addEventListener('click', performSearch);
    
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

function setupActiveNav() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        
        if (currentPage === 'index.html' && href === 'index.html') {
            link.classList.add('active');
        } else if (currentPage === 'cursos.html' && href === 'cursos.html') {
            link.classList.add('active');
        }
    });
}

// Exportar funções para uso global
window.adicionarAoCarrinho = function(id, nome, preco) {
    if (typeof window.adicionarAoCarrinhoGlobal === 'function') {
        window.adicionarAoCarrinhoGlobal(id, nome, preco);
    } else {
        console.log(`Curso ${id} - ${nome} adicionado ao carrinho`);
        alert(`${nome} adicionado ao carrinho!`);
    }
};
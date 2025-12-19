// carrinho.js - Sistema de carrinho de compras

class CarrinhoManager {
    constructor() {
        this.carrinho = {
            items: [],
            total: 0,
            contador: 0,
            desconto: 0,
            subtotal: 0
        };
        
        this.init();
    }
    
    /**
     * Inicializa o carrinho
     */
    init() {
        this.carregarCarrinho();
        this.atualizarContador();
        this.setupEventListeners();
        
        console.log('Carrinho inicializado com sucesso');
    }
    
    /**
     * Carrega o carrinho do localStorage
     */
    carregarCarrinho() {
        try {
            const carrinhoSalvo = localStorage.getItem('univitoria_carrinho');
            if (carrinhoSalvo) {
                this.carrinho = JSON.parse(carrinhoSalvo);
                console.log('Carrinho carregado do localStorage');
            }
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            this.limparCarrinho();
        }
    }
    
    /**
     * Salva o carrinho no localStorage
     */
    salvarCarrinho() {
        try {
            localStorage.setItem('univitoria_carrinho', JSON.stringify(this.carrinho));
        } catch (error) {
            console.error('Erro ao salvar carrinho:', error);
        }
    }
    
    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Botão do carrinho no header
        const cartBtn = document.querySelector('.cart-btn');
        if (cartBtn) {
            cartBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.abrirCarrinho();
            });
        }
        
        // Fechar modal do carrinho
        const closeCartBtn = document.querySelector('.close-cart');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => {
                this.fecharCarrinho();
            });
        }
        
        // Overlay do modal
        const cartOverlay = document.getElementById('cartModal');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', (e) => {
                if (e.target === cartOverlay) {
                    this.fecharCarrinho();
                }
            });
        }
        
        // Fechar com ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isCarrinhoAberto()) {
                this.fecharCarrinho();
            }
        });
        
        // Botão de checkout
        const checkoutBtn = document.querySelector('.btn-checkout');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                this.finalizarCompra();
            });
        }
    }
    
    /**
     * Adiciona um item ao carrinho
     * @param {number} cursoId - ID do curso
     */
    adicionarItem(cursoId) {
        // Buscar curso no gerenciador de cursos
        if (!window.cursosManager) {
            console.error('Gerenciador de cursos não encontrado');
            return;
        }
        
        const curso = window.cursosManager.cursos.find(c => c.id === cursoId);
        if (!curso) {
            console.error('Curso não encontrado:', cursoId);
            return;
        }
        
        // Verificar se o item já está no carrinho
        const itemExistente = this.carrinho.items.find(item => item.id === cursoId);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
            itemExistente.subtotal = itemExistente.preco * itemExistente.quantidade;
        } else {
            this.carrinho.items.push({
                id: curso.id,
                nome: curso.nome,
                categoria: curso.categoria,
                preco: curso.preco,
                quantidade: 1,
                subtotal: curso.preco
            });
        }
        
        // Atualizar totais
        this.atualizarTotais();
        
        // Salvar no localStorage
        this.salvarCarrinho();
        
        // Atualizar UI
        this.atualizarContador();
        
        // Mostrar notificação
        this.mostrarNotificacao(`${curso.nome} adicionado ao carrinho!`);
        
        // Se o carrinho estiver aberto, atualizar
        if (this.isCarrinhoAberto()) {
            this.renderizarCarrinho();
        }
    }
    
    /**
     * Remove um item do carrinho
     * @param {number} cursoId - ID do curso
     */
    removerItem(cursoId) {
        this.carrinho.items = this.carrinho.items.filter(item => item.id !== cursoId);
        
        // Atualizar totais
        this.atualizarTotais();
        
        // Salvar no localStorage
        this.salvarCarrinho();
        
        // Atualizar UI
        this.atualizarContador();
        this.renderizarCarrinho();
        
        // Mostrar notificação
        this.mostrarNotificacao('Item removido do carrinho', 'warning');
    }
    
    /**
     * Atualiza a quantidade de um item
     * @param {number} cursoId - ID do curso
     * @param {number} novaQuantidade - Nova quantidade
     */
    atualizarQuantidade(cursoId, novaQuantidade) {
        const item = this.carrinho.items.find(item => item.id === cursoId);
        if (!item) return;
        
        if (novaQuantidade < 1) {
            this.removerItem(cursoId);
            return;
        }
        
        item.quantidade = novaQuantidade;
        item.subtotal = item.preco * item.quantidade;
        
        // Atualizar totais
        this.atualizarTotais();
        
        // Salvar no localStorage
        this.salvarCarrinho();
        
        // Atualizar UI
        this.atualizarContador();
        this.renderizarCarrinho();
    }
    
    /**
     * Atualiza os totais do carrinho
     */
    atualizarTotais() {
        this.carrinho.subtotal = this.carrinho.items.reduce((total, item) => total + item.subtotal, 0);
        this.carrinho.desconto = this.calcularDesconto();
        this.carrinho.total = this.carrinho.subtotal - this.carrinho.desconto;
        this.carrinho.contador = this.carrinho.items.reduce((total, item) => total + item.quantidade, 0);
    }
    
    /**
     * Calcula desconto do carrinho
     * @returns {number} Valor do desconto
     */
    calcularDesconto() {
        // Desconto de 10% para 3 ou mais cursos
        if (this.carrinho.contador >= 3) {
            return this.carrinho.subtotal * 0.1;
        }
        
        // Desconto de 5% para 2 cursos
        if (this.carrinho.contador >= 2) {
            return this.carrinho.subtotal * 0.05;
        }
        
        return 0;
    }
    
    /**
     * Atualiza o contador no header
     */
    atualizarContador() {
        const cartCounts = document.querySelectorAll('.cart-count');
        
        cartCounts.forEach(element => {
            element.textContent = this.carrinho.contador;
            
            // Animação
            if (this.carrinho.contador > 0) {
                element.style.transform = 'scale(1.3)';
                setTimeout(() => {
                    element.style.transform = 'scale(1)';
                }, 300);
            }
        });
    }
    
    /**
     * Abre o modal do carrinho
     */
    abrirCarrinho() {
        const cartModal = document.getElementById('cartModal');
        if (!cartModal) return;
        
        this.renderizarCarrinho();
        cartModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Fecha o modal do carrinho
     */
    fecharCarrinho() {
        const cartModal = document.getElementById('cartModal');
        if (!cartModal) return;
        
        cartModal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Verifica se o carrinho está aberto
     * @returns {boolean} True se o carrinho está aberto
     */
    isCarrinhoAberto() {
        const cartModal = document.getElementById('cartModal');
        return cartModal && cartModal.classList.contains('active');
    }
    
    /**
     * Renderiza o conteúdo do carrinho
     */
    renderizarCarrinho() {
        const cartModalBody = document.querySelector('.cart-modal-body');
        const cartTotal = document.querySelector('.cart-total span');
        const checkoutBtn = document.querySelector('.btn-checkout');
        
        if (!cartModalBody) return;
        
        // Verificar se o carrinho está vazio
        if (this.carrinho.items.length === 0) {
            cartModalBody.innerHTML = `
                <div class="cart-empty">
                    <i class="fas fa-shopping-cart"></i>
                    <p>Seu carrinho está vazio</p>
                    <a href="cursos.html" class="btn btn-primary mt-2" onclick="carrinhoManager.fecharCarrinho()">
                        <i class="fas fa-graduation-cap"></i> Ver Cursos
                    </a>
                </div>
            `;
            
            if (cartTotal) cartTotal.textContent = 'R$ 0,00';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        }
        
        // Renderizar itens do carrinho
        let itemsHTML = '<div class="cart-items">';
        
        this.carrinho.items.forEach(item => {
            const precoFormatado = this.formatarMoeda(item.preco);
            const subtotalFormatado = this.formatarMoeda(item.subtotal);
            
            itemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <h4>${item.nome}</h4>
                        <p>${precoFormatado} cada</p>
                    </div>
                    <div class="cart-item-actions">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn minus" onclick="carrinhoManager.atualizarQuantidade(${item.id}, ${item.quantidade - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <span class="quantity">${item.quantidade}</span>
                            <button class="quantity-btn plus" onclick="carrinhoManager.atualizarQuantidade(${item.id}, ${item.quantidade + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                        </div>
                        <div class="cart-item-total">
                            ${subtotalFormatado}
                        </div>
                        <button class="remove-item" onclick="carrinhoManager.removerItem(${item.id})" aria-label="Remover item">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });
        
        itemsHTML += '</div>';
        
        // Adicionar resumo se houver desconto
        if (this.carrinho.desconto > 0) {
            const descontoFormatado = this.formatarMoeda(this.carrinho.desconto);
            const subtotalFormatado = this.formatarMoeda(this.carrinho.subtotal);
            
            itemsHTML += `
                <div class="cart-summary">
                    <div class="summary-row">
                        <span>Subtotal:</span>
                        <span>${subtotalFormatado}</span>
                    </div>
                    <div class="summary-row discount">
                        <span>Desconto:</span>
                        <span>-${descontoFormatado}</span>
                    </div>
                </div>
            `;
        }
        
        cartModalBody.innerHTML = itemsHTML;
        
        // Atualizar totais
        if (cartTotal) {
            cartTotal.textContent = this.formatarMoeda(this.carrinho.total);
        }
        
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
        }
    }
    
    /**
     * Finaliza a compra
     */
    finalizarCompra() {
        if (this.carrinho.items.length === 0) {
            this.mostrarNotificacao('Adicione cursos ao carrinho antes de finalizar', 'warning');
            return;
        }
        
        // Criar resumo da compra
        let resumo = 'RESUMO DA COMPRA:\n\n';
        this.carrinho.items.forEach(item => {
            resumo += `• ${item.nome} (${item.quantidade}x) - ${this.formatarMoeda(item.subtotal)}\n`;
        });
        
        if (this.carrinho.desconto > 0) {
            resumo += `\nDesconto: -${this.formatarMoeda(this.carrinho.desconto)}`;
        }
        
        resumo += `\n\nTOTAL: ${this.formatarMoeda(this.carrinho.total)}`;
        resumo += '\n\nPara concluir sua matrícula, entre em contato conosco:';
        resumo += '\n📞 (31) 3822-1212';
        resumo += '\n📧 matricula@univitoriatec.com';
        resumo += '\n💬 WhatsApp: (31) 99123-4567';
        
        // Mostrar modal de confirmação
        const confirmModal = `
            <div class="confirm-modal-overlay" id="confirmModal">
                <div class="confirm-modal">
                    <div class="confirm-modal-header">
                        <h3><i class="fas fa-check-circle"></i> Compra Confirmada!</h3>
                    </div>
                    <div class="confirm-modal-body">
                        <div class="confirm-icon">
                            <i class="fas fa-graduation-cap"></i>
                        </div>
                        <h4>Parabéns pela sua escolha!</h4>
                        <p>Sua compra foi registrada com sucesso. Em breve nossa equipe entrará em contato para finalizar sua matrícula.</p>
                        
                        <div class="confirm-details">
                            <pre>${resumo}</pre>
                        </div>
                        
                        <div class="confirm-actions">
                            <p>Entre em contato para agilizar o processo:</p>
                            <div class="contact-buttons">
                                <a href="tel:3138221212" class="btn btn-primary">
                                    <i class="fas fa-phone"></i> Ligar Agora
                                </a>
                                <a href="https://wa.me/5531991234567" target="_blank" class="btn btn-secondary">
                                    <i class="fab fa-whatsapp"></i> WhatsApp
                                </a>
                                <a href="mailto:matricula@univitoriatec.com" class="btn btn-outline">
                                    <i class="fas fa-envelope"></i> Email
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="confirm-modal-footer">
                        <button class="btn btn-primary" onclick="carrinhoManager.concluirCompra()">
                            <i class="fas fa-check"></i> Entendido
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', confirmModal);
        
        // Fechar carrinho
        this.fecharCarrinho();
        
        // Adicionar estilos para o modal de confirmação
        if (!document.querySelector('#confirm-modal-styles')) {
            const style = document.createElement('style');
            style.id = 'confirm-modal-styles';
            style.textContent = `
                .confirm-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 1rem;
                    backdrop-filter: blur(3px);
                    animation: fadeIn 0.3s ease-out;
                }
                
                .confirm-modal {
                    background: var(--white);
                    border-radius: var(--radius-lg);
                    width: 100%;
                    max-width: 600px;
                    max-height: 90vh;
                    display: flex;
                    flex-direction: column;
                    animation: slideUp 0.3s ease-out;
                    box-shadow: var(--shadow-xl);
                }
                
                .confirm-modal-header {
                    padding: 1.5rem 2rem;
                    border-bottom: 1px solid var(--gray-200);
                    background: linear-gradient(135deg, var(--accent) 0%, #059669 100%);
                    color: var(--white);
                    border-radius: var(--radius-lg) var(--radius-lg) 0 0;
                }
                
                .confirm-modal-header h3 {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    margin: 0;
                    font-size: 1.5rem;
                }
                
                .confirm-modal-body {
                    padding: 2rem;
                    flex: 1;
                    overflow-y: auto;
                    text-align: center;
                }
                
                .confirm-icon {
                    font-size: 3rem;
                    color: var(--accent);
                    margin-bottom: 1.5rem;
                }
                
                .confirm-modal-body h4 {
                    font-size: 1.5rem;
                    color: var(--primary-dark);
                    margin-bottom: 1rem;
                }
                
                .confirm-modal-body p {
                    color: var(--gray-600);
                    margin-bottom: 2rem;
                    line-height: 1.6;
                }
                
                .confirm-details {
                    background-color: var(--light);
                    border-radius: var(--radius);
                    padding: 1.5rem;
                    margin-bottom: 2rem;
                    text-align: left;
                    overflow-x: auto;
                }
                
                .confirm-details pre {
                    margin: 0;
                    font-family: 'Courier New', monospace;
                    font-size: 0.875rem;
                    white-space: pre-wrap;
                    word-wrap: break-word;
                    color: var(--gray-700);
                }
                
                .confirm-actions {
                    margin-bottom: 2rem;
                }
                
                .confirm-actions p {
                    font-weight: 600;
                    color: var(--gray-700);
                    margin-bottom: 1rem;
                }
                
                .contact-buttons {
                    display: flex;
                    gap: 0.75rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }
                
                .contact-buttons .btn {
                    flex: 1;
                    min-width: 120px;
                }
                
                .confirm-modal-footer {
                    padding: 1.5rem 2rem;
                    border-top: 1px solid var(--gray-200);
                    text-align: center;
                }
                
                .confirm-modal-footer .btn {
                    min-width: 200px;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * Conclui a compra e limpa o carrinho
     */
    concluirCompra() {
        // Remover modal de confirmação
        const confirmModal = document.getElementById('confirmModal');
        if (confirmModal) {
            confirmModal.remove();
        }
        
        // Limpar carrinho
        this.limparCarrinho();
        
        // Mostrar notificação
        this.mostrarNotificacao('Compra concluída com sucesso! Em breve entraremos em contato.', 'success');
    }
    
    /**
     * Limpa todo o carrinho
     */
    limparCarrinho() {
        this.carrinho = {
            items: [],
            total: 0,
            contador: 0,
            desconto: 0,
            subtotal: 0
        };
        
        this.salvarCarrinho();
        this.atualizarContador();
        this.renderizarCarrinho();
    }
    
    /**
     * Formata valor monetário
     * @param {number} value - Valor a ser formatado
     * @returns {string} Valor formatado
     */
    formatarMoeda(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    /**
     * Mostra uma notificação
     * @param {string} message - Mensagem da notificação
     * @param {string} type - Tipo da notificação
     */
    mostrarNotificacao(message, type = 'success') {
        if (window.UniVitóriaTecnico && window.UniVitóriaTecnico.showNotification) {
            window.UniVitóriaTecnico.showNotification(message, type);
        } else {
            // Fallback simples
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-triangle'}"></i>
                <span>${message}</span>
            `;
            
            notification.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${type === 'success' ? '#10B981' : type === 'warning' ? '#F59E0B' : '#EF4444'};
                color: white;
                padding: 1rem 1.5rem;
                border-radius: var(--radius);
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 9999;
                box-shadow: var(--shadow-xl);
                animation: slideInRight 0.3s ease-out;
                max-width: 350px;
            `;
            
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.style.animation = 'slideOutRight 0.3s ease-out';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }, 3000);
        }
    }
}

// Inicializar o gerenciador de carrinho
document.addEventListener('DOMContentLoaded', function() {
    window.carrinhoManager = new CarrinhoManager();
    console.log('Gerenciador de carrinho inicializado');
});

// Função global para adicionar ao carrinho
window.adicionarAoCarrinho = function(cursoId) {
    if (window.carrinhoManager) {
        window.carrinhoManager.adicionarItem(cursoId);
    } else {
        console.error('Gerenciador de carrinho não encontrado');
    }
};
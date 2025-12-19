// carrossel.js - Sistema de carrossel para cursos em destaque

class CarrosselManager {
    constructor() {
        this.carrosselElement = null;
        this.trackElement = null;
        this.dotsElement = null;
        this.prevBtn = null;
        this.nextBtn = null;
        
        this.currentIndex = 0;
        this.itemsPerView = 3;
        this.totalSlides = 0;
        this.autoPlayInterval = null;
        this.isDragging = false;
        this.startPos = 0;
        this.currentTranslate = 0;
        this.prevTranslate = 0;
        this.animationID = null;
        
        this.cursos = [];
        
        this.init();
    }
    
    /**
     * Inicializa o carrossel
     */
    init() {
        this.carrosselElement = document.getElementById('carrosselCursos');
        if (!this.carrosselElement) return;
        
        this.carregarCursos();
        this.criarEstrutura();
        this.setupEventListeners();
        this.atualizarCarrossel();
        this.iniciarAutoPlay();
        
        console.log('Carrossel inicializado com sucesso');
    }
    
    /**
     * Carrega os cursos em destaque
     */
    carregarCursos() {
        // Buscar cursos em destaque do gerenciador de cursos
        if (window.cursosManager) {
            this.cursos = window.cursosManager.cursos.filter(curso => curso.destaque);
        } else {
            // Dados mock para cursos em destaque
            this.cursos = [
                {
                    id: 1,
                    nome: "Técnico em Enfermagem",
                    categoria: "SAÚDE",
                    icone: "fas fa-user-nurse",
                    preco: 1899.00,
                    precoOriginal: 2399.00,
                    badge: "Mais Vendido",
                    descricao: "Formação técnica reconhecida pelo COREN"
                },
                {
                    id: 2,
                    nome: "Técnico em Desenvolvimento de Sistemas",
                    categoria: "TECNOLOGIA",
                    icone: "fas fa-laptop-code",
                    preco: 2199.00,
                    precoOriginal: 2699.00,
                    badge: "Promoção",
                    descricao: "Programação e desenvolvimento de software"
                },
                {
                    id: 12,
                    nome: "Técnico em Administração",
                    categoria: "ADMINISTRAÇÃO",
                    icone: "fas fa-chart-line",
                    preco: 1599.00,
                    precoOriginal: 1999.00,
                    badge: "",
                    descricao: "Gestão empresarial e processos administrativos"
                },
                {
                    id: 44,
                    nome: "Técnico em Edificações",
                    categoria: "CONSTRUÇÃO",
                    icone: "fas fa-hard-hat",
                    preco: 1899.00,
                    precoOriginal: 2299.00,
                    badge: "",
                    descricao: "Projetos e execução de obras civis"
                },
                {
                    id: 45,
                    nome: "Técnico em Segurança do Trabalho",
                    categoria: "CONSTRUÇÃO",
                    icone: "fas fa-user-shield",
                    preco: 1799.00,
                    precoOriginal: 2199.00,
                    badge: "Novo",
                    descricao: "Normas de segurança e prevenção de acidentes"
                },
                {
                    id: 51,
                    nome: "Técnico em Meio Ambiente",
                    categoria: "MEIO AMBIENTE",
                    icone: "fas fa-leaf",
                    preco: 1699.00,
                    precoOriginal: 2099.00,
                    badge: "",
                    descricao: "Gestão ambiental e sustentabilidade"
                }
            ];
        }
        
        // Limitar a 6 cursos para o carrossel
        if (this.cursos.length > 6) {
            this.cursos = this.cursos.slice(0, 6);
        }
    }
    
    /**
     * Cria a estrutura HTML do carrossel
     */
    criarEstrutura() {
        this.carrosselElement.innerHTML = `
            <div class="carrossel-container">
                <div class="carrossel-track" id="carrosselTrack"></div>
                <button class="carrossel-btn prev" id="carrosselPrev" aria-label="Slide anterior">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="carrossel-btn next" id="carrosselNext" aria-label="Próximo slide">
                    <i class="fas fa-chevron-right"></i>
                </button>
                <div class="carrossel-dots" id="carrosselDots"></div>
            </div>
        `;
        
        this.trackElement = document.getElementById('carrosselTrack');
        this.prevBtn = document.getElementById('carrosselPrev');
        this.nextBtn = document.getElementById('carrosselNext');
        this.dotsElement = document.getElementById('carrosselDots');
        
        // Criar slides
        this.cursos.forEach((curso, index) => {
            const slide = this.criarSlide(curso, index);
            this.trackElement.appendChild(slide);
        });
        
        // Criar dots
        this.criarDots();
    }
    
    /**
     * Cria um slide do carrossel
     * @param {Object} curso - Dados do curso
     * @param {number} index - Índice do slide
     * @returns {HTMLElement} Elemento do slide
     */
    criarSlide(curso, index) {
        const slide = document.createElement('div');
        slide.className = 'carrossel-slide';
        slide.dataset.index = index;
        
        const precoFormatado = this.formatarMoeda(curso.preco);
        const precoOriginalFormatado = this.formatarMoeda(curso.precoOriginal);
        
        slide.innerHTML = `
            <div class="carrossel-item">
                <div class="carrossel-item-image">
                    <i class="${curso.icone}"></i>
                    ${curso.badge ? `<div class="carrossel-item-badge">${curso.badge}</div>` : ''}
                </div>
                <div class="carrossel-item-content">
                    <div class="carrossel-item-category">${curso.categoria}</div>
                    <h3 class="carrossel-item-title">${curso.nome}</h3>
                    <p class="carrossel-item-desc">${curso.descricao}</p>
                    <div class="carrossel-item-price">
                        <div>
                            <div class="carrossel-price">${precoFormatado}</div>
                            <div class="carrossel-price-original">${precoOriginalFormatado}</div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="carrosselManager.adicionarAoCarrinho(${curso.id})" aria-label="Adicionar ${curso.nome} ao carrinho">
                            <i class="fas fa-shopping-cart"></i> Comprar
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        return slide;
    }
    
    /**
     * Cria os dots de navegação
     */
    criarDots() {
        this.totalSlides = Math.ceil(this.cursos.length / this.itemsPerView);
        
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carrossel-dot';
            dot.dataset.slide = i;
            dot.setAttribute('aria-label', `Ir para slide ${i + 1}`);
            
            if (i === 0) {
                dot.classList.add('active');
            }
            
            dot.addEventListener('click', () => {
                this.goToSlide(i);
            });
            
            this.dotsElement.appendChild(dot);
        }
    }
    
    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Botões de navegação
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });
        
        // Touch events para mobile
        this.trackElement.addEventListener('touchstart', this.touchStart.bind(this));
        this.trackElement.addEventListener('touchmove', this.touchMove.bind(this));
        this.trackElement.addEventListener('touchend', this.touchEnd.bind(this));
        
        // Mouse events para desktop
        this.trackElement.addEventListener('mousedown', this.touchStart.bind(this));
        this.trackElement.addEventListener('mousemove', this.touchMove.bind(this));
        this.trackElement.addEventListener('mouseup', this.touchEnd.bind(this));
        this.trackElement.addEventListener('mouseleave', this.touchEnd.bind(this));
        
        // Pausar auto-play no hover
        this.carrosselElement.addEventListener('mouseenter', () => {
            this.pausarAutoPlay();
        });
        
        this.carrosselElement.addEventListener('mouseleave', () => {
            this.iniciarAutoPlay();
        });
        
        // Redimensionamento da janela
        window.addEventListener('resize', () => {
            this.atualizarResponsividade();
            this.atualizarCarrossel();
        });
        
        // Atualizar responsividade inicial
        this.atualizarResponsividade();
    }
    
    /**
     * Atualiza a responsividade do carrossel
     */
    atualizarResponsividade() {
        const width = window.innerWidth;
        
        if (width < 768) {
            this.itemsPerView = 1;
        } else if (width < 992) {
            this.itemsPerView = 2;
        } else {
            this.itemsPerView = 3;
        }
        
        this.totalSlides = Math.ceil(this.cursos.length / this.itemsPerView);
        
        // Atualizar dots
        this.atualizarDots();
        
        // Ajustar índice atual se necessário
        if (this.currentIndex >= this.totalSlides) {
            this.currentIndex = this.totalSlides - 1;
        }
    }
    
    /**
     * Atualiza os dots de navegação
     */
    atualizarDots() {
        if (!this.dotsElement) return;
        
        // Limpar dots existentes
        this.dotsElement.innerHTML = '';
        
        // Criar novos dots
        this.criarDots();
    }
    
    /**
     * Atualiza a posição do carrossel
     */
    atualizarCarrossel() {
        if (!this.trackElement || !this.trackElement.firstChild) return;
        
        const slideWidth = this.trackElement.firstChild.offsetWidth;
        const gap = 30; // gap do CSS
        const translateX = -this.currentIndex * (slideWidth + gap) * this.itemsPerView;
        
        this.trackElement.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar dots
        this.dotsElement.querySelectorAll('.carrossel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentIndex);
        });
        
        // Atualizar botões de navegação
        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.totalSlides - 1;
        
        // Atualizar ARIA labels
        this.prevBtn.setAttribute('aria-label', this.currentIndex === 0 ? 'Primeiro slide' : 'Slide anterior');
        this.nextBtn.setAttribute('aria-label', this.currentIndex === this.totalSlides - 1 ? 'Último slide' : 'Próximo slide');
    }
    
    /**
     * Navega para um slide específico
     * @param {number} slideIndex - Índice do slide
     */
    goToSlide(slideIndex) {
        this.currentIndex = Math.max(0, Math.min(slideIndex, this.totalSlides - 1));
        this.atualizarCarrossel();
    }
    
    /**
     * Vai para o slide anterior
     */
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.atualizarCarrossel();
        }
    }
    
    /**
     * Vai para o próximo slide
     */
    nextSlide() {
        if (this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
            this.atualizarCarrossel();
        } else {
            // Voltar ao primeiro slide
            this.currentIndex = 0;
            this.atualizarCarrossel();
        }
    }
    
    /**
     * Inicia o auto-play
     */
    iniciarAutoPlay() {
        this.pausarAutoPlay();
        
        this.autoPlayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // 5 segundos
    }
    
    /**
     * Pausa o auto-play
     */
    pausarAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    }
    
    /**
     * Reseta o auto-play
     */
    resetAutoPlay() {
        this.pausarAutoPlay();
        this.iniciarAutoPlay();
    }
    
    /**
     * Touch start handler
     * @param {Event} e - Evento de touch/mouse
     */
    touchStart(e) {
        if (e.type === 'touchstart') {
            this.startPos = e.touches[0].clientX;
        } else {
            this.startPos = e.clientX;
            e.preventDefault(); // Prevenir seleção de texto
        }
        
        this.isDragging = true;
        this.trackElement.style.cursor = 'grabbing';
        this.trackElement.style.userSelect = 'none';
        
        // Pausar auto-play durante o drag
        this.pausarAutoPlay();
        
        // Iniciar animação
        this.animationID = requestAnimationFrame(this.animation.bind(this));
    }
    
    /**
     * Touch move handler
     * @param {Event} e - Evento de touch/mouse
     */
    touchMove(e) {
        if (!this.isDragging) return;
        
        let currentPos;
        if (e.type === 'touchmove') {
            currentPos = e.touches[0].clientX;
        } else {
            currentPos = e.clientX;
        }
        
        const diff = currentPos - this.startPos;
        this.currentTranslate = this.prevTranslate + diff;
    }
    
    /**
     * Touch end handler
     */
    touchEnd() {
        if (!this.isDragging) return;
        
        this.isDragging = false;
        this.trackElement.style.cursor = 'grab';
        this.trackElement.style.userSelect = '';
        
        // Cancelar animação
        cancelAnimationFrame(this.animationID);
        
        // Determinar se mudou de slide
        const movedBy = this.currentTranslate - this.prevTranslate;
        const slideWidth = this.trackElement.firstChild.offsetWidth;
        const threshold = slideWidth / 4; // 25% do slide
        
        if (movedBy < -threshold && this.currentIndex < this.totalSlides - 1) {
            this.currentIndex++;
        } else if (movedBy > threshold && this.currentIndex > 0) {
            this.currentIndex--;
        }
        
        // Resetar translate
        this.currentTranslate = -this.currentIndex * slideWidth * this.itemsPerView;
        this.prevTranslate = this.currentTranslate;
        
        // Atualizar carrossel
        this.atualizarCarrossel();
        
        // Retomar auto-play
        this.iniciarAutoPlay();
    }
    
    /**
     * Animação do carrossel
     */
    animation() {
        this.trackElement.style.transform = `translateX(${this.currentTranslate}px)`;
        
        if (this.isDragging) {
            requestAnimationFrame(this.animation.bind(this));
        }
    }
    
    /**
     * Adiciona curso ao carrinho
     * @param {number} cursoId - ID do curso
     */
    adicionarAoCarrinho(cursoId) {
        if (window.carrinhoManager) {
            window.carrinhoManager.adicionarItem(cursoId);
        } else {
            console.error('Gerenciador de carrinho não encontrado');
        }
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
}

// Inicializar o carrossel
document.addEventListener('DOMContentLoaded', function() {
    window.carrosselManager = new CarrosselManager();
    console.log('Carrossel inicializado');
});

// Adicionar estilos CSS para o carrossel
document.addEventListener('DOMContentLoaded', function() {
    if (!document.querySelector('#carrossel-styles')) {
        const style = document.createElement('style');
        style.id = 'carrossel-styles';
        style.textContent = `
            .carrossel-container {
                position: relative;
                overflow: hidden;
                padding: 0 3.5rem;
            }
            
            .carrossel-track {
                display: flex;
                transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
                gap: 2rem;
                padding: 1.5rem 0;
                cursor: grab;
            }
            
            .carrossel-track:active {
                cursor: grabbing;
            }
            
            .carrossel-slide {
                flex: 0 0 calc(${100 / 3}% - 1.33rem);
                transition: transform 0.3s ease;
            }
            
            .carrossel-item {
                background-color: var(--white);
                border-radius: var(--radius);
                overflow: hidden;
                box-shadow: var(--shadow);
                transition: var(--transition);
                border-top: 4px solid var(--secondary);
                height: 100%;
                position: relative;
            }
            
            .carrossel-item::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 4px;
                background: linear-gradient(90deg, var(--secondary) 0%, var(--warning) 100%);
            }
            
            .carrossel-item:hover {
                transform: translateY(-10px);
                box-shadow: var(--shadow-xl);
            }
            
            .carrossel-item-image {
                height: 12rem;
                background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
                display: flex;
                align-items: center;
                justify-content: center;
                color: var(--white);
                font-size: 3.5rem;
                position: relative;
            }
            
            .carrossel-item-badge {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%);
                color: var(--white);
                padding: 0.375rem 0.75rem;
                border-radius: 2rem;
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                box-shadow: var(--shadow-md);
            }
            
            .carrossel-item-content {
                padding: 1.5rem;
            }
            
            .carrossel-item-category {
                color: var(--primary);
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.8px;
                margin-bottom: 0.75rem;
            }
            
            .carrossel-item-title {
                font-size: 1.125rem;
                color: var(--primary-dark);
                margin-bottom: 0.75rem;
                line-height: 1.4;
                min-height: 3rem;
                font-weight: 700;
            }
            
            .carrossel-item-desc {
                color: var(--gray-600);
                font-size: 0.875rem;
                line-height: 1.5;
                margin-bottom: 1.5rem;
                opacity: 0.9;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            
            .carrossel-item-price {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;
                margin-top: auto;
                padding-top: 1.5rem;
                border-top: 1px solid var(--gray-200);
            }
            
            .carrossel-price {
                font-size: 1.375rem;
                font-weight: 800;
                color: var(--secondary);
                line-height: 1;
            }
            
            .carrossel-price-original {
                font-size: 0.875rem;
                color: var(--gray-500);
                text-decoration: line-through;
                margin-top: 0.25rem;
                opacity: 0.7;
            }
            
            .carrossel-btn {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                background-color: var(--white);
                border: 2px solid var(--primary);
                color: var(--primary);
                font-size: 1.125rem;
                cursor: pointer;
                z-index: 10;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: var(--transition);
                box-shadow: var(--shadow);
            }
            
            .carrossel-btn:hover:not(:disabled) {
                background-color: var(--primary);
                color: var(--white);
                transform: translateY(-50%) scale(1.1);
                box-shadow: var(--shadow-lg);
            }
            
            .carrossel-btn:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
            
            .carrossel-btn.prev {
                left: 0;
            }
            
            .carrossel-btn.next {
                right: 0;
            }
            
            .carrossel-dots {
                display: flex;
                justify-content: center;
                gap: 0.75rem;
                margin-top: 2rem;
            }
            
            .carrossel-dot {
                width: 0.75rem;
                height: 0.75rem;
                border-radius: 50%;
                background-color: var(--gray-300);
                border: none;
                cursor: pointer;
                transition: var(--transition);
                padding: 0;
            }
            
            .carrossel-dot.active {
                background: linear-gradient(135deg, var(--secondary) 0%, var(--secondary-dark) 100%);
                transform: scale(1.2);
                box-shadow: var(--shadow-sm);
            }
            
            .carrossel-dot:hover:not(.active) {
                background-color: var(--primary);
                transform: scale(1.1);
            }
            
            /* Responsividade do Carrossel */
            @media (max-width: 992px) {
                .carrossel-slide {
                    flex: 0 0 calc(50% - 1rem);
                }
                
                .carrossel-container {
                    padding: 0 3rem;
                }
            }
            
            @media (max-width: 768px) {
                .carrossel-container {
                    padding: 0 2.5rem;
                }
                
                .carrossel-slide {
                    flex: 0 0 100%;
                }
                
                .carrossel-btn {
                    width: 2.5rem;
                    height: 2.5rem;
                    font-size: 1rem;
                }
            }
            
            @media (max-width: 576px) {
                .carrossel-container {
                    padding: 0 2rem;
                }
                
                .carrossel-item-image {
                    height: 10rem;
                    font-size: 2.5rem;
                }
                
                .carrossel-item-content {
                    padding: 1.25rem;
                }
                
                .carrossel-item-title {
                    font-size: 1rem;
                }
                
                .carrossel-btn {
                    width: 2rem;
                    height: 2rem;
                    font-size: 0.875rem;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
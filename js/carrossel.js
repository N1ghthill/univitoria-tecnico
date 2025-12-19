// Carrossel de Cursos em Destaque
document.addEventListener('DOMContentLoaded', function() {
    const carrosselTrack = document.getElementById('carrosselTrack');
    const carrosselDots = document.getElementById('carrosselDots');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Dados dos cursos em destaque
    const cursosDestaque = [
        {
            id: 1,
            nome: "Técnico em Enfermagem",
            categoria: "SAÚDE",
            icone: "fas fa-user-nurse",
            preco: 1899.00,
            precoOriginal: 2399.00,
            badge: "Mais Vendido"
        },
        {
            id: 2,
            nome: "Técnico em Desenvolvimento de Sistemas",
            categoria: "TECNOLOGIA",
            icone: "fas fa-laptop-code",
            preco: 2199.00,
            precoOriginal: 2699.00,
            badge: "Promoção"
        },
        {
            id: 3,
            nome: "Técnico em Administração",
            categoria: "ADMINISTRAÇÃO",
            icone: "fas fa-chart-line",
            preco: 1599.00,
            precoOriginal: 1999.00,
            badge: ""
        },
        {
            id: 4,
            nome: "Técnico em Segurança do Trabalho",
            categoria: "CONSTRUÇÃO",
            icone: "fas fa-hard-hat",
            preco: 1799.00,
            precoOriginal: 2299.00,
            badge: "Novo"
        },
        {
            id: 5,
            nome: "Técnico em Meio Ambiente",
            categoria: "MEIO AMBIENTE",
            icone: "fas fa-leaf",
            preco: 1699.00,
            precoOriginal: 2099.00,
            badge: ""
        },
        {
            id: 6,
            nome: "Técnico em Gastronomia",
            categoria: "SERVIÇOS",
            icone: "fas fa-utensils",
            preco: 1999.00,
            precoOriginal: 2499.00,
            badge: "Promoção"
        }
    ];
    
    let currentIndex = 0;
    let itemsPerView = 3;
    let autoPlayInterval;
    
    // Inicializar carrossel
    function initCarrossel() {
        // Limpar conteúdo
        carrosselTrack.innerHTML = '';
        carrosselDots.innerHTML = '';
        
        // Criar itens do carrossel
        cursosDestaque.forEach((curso, index) => {
            const carrosselItem = document.createElement('div');
            carrosselItem.className = 'carrossel-item';
            carrosselItem.dataset.index = index;
            
            const precoFormatado = formatCurrency(curso.preco);
            const precoOriginalFormatado = formatCurrency(curso.precoOriginal);
            
            carrosselItem.innerHTML = `
                <div class="carrossel-item-image">
                    <i class="${curso.icone}"></i>
                    ${curso.badge ? `<div class="carrossel-item-badge">${curso.badge}</div>` : ''}
                </div>
                <div class="carrossel-item-content">
                    <div class="carrossel-item-category">${curso.categoria}</div>
                    <h3 class="carrossel-item-title">${curso.nome}</h3>
                    <div class="carrossel-item-price">
                        <div>
                            <div class="carrossel-price">${precoFormatado}</div>
                            <div class="carrossel-price-original">${precoOriginalFormatado}</div>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="adicionarAoCarrinho(${curso.id}, '${curso.nome}', ${curso.preco})">
                            Comprar
                        </button>
                    </div>
                </div>
            `;
            
            carrosselTrack.appendChild(carrosselItem);
        });
        
        // Criar dots
        const totalSlides = Math.ceil(cursosDestaque.length / itemsPerView);
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.className = 'carrossel-dot';
            if (i === 0) dot.classList.add('active');
            dot.dataset.slide = i;
            dot.addEventListener('click', () => goToSlide(i));
            carrosselDots.appendChild(dot);
        }
        
        updateCarrossel();
    }
    
    // Formatar moeda
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    // Atualizar carrossel
    function updateCarrossel() {
        if (!carrosselTrack.firstChild) return;
        
        const itemWidth = carrosselTrack.firstChild.offsetWidth + 30;
        const translateX = -currentIndex * itemWidth * itemsPerView;
        carrosselTrack.style.transform = `translateX(${translateX}px)`;
        
        // Atualizar dots
        document.querySelectorAll('.carrossel-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
        
        // Atualizar botões
        const totalSlides = Math.ceil(cursosDestaque.length / itemsPerView);
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalSlides - 1;
    }
    
    // Navegação
    function goToSlide(slideIndex) {
        const totalSlides = Math.ceil(cursosDestaque.length / itemsPerView);
        currentIndex = Math.max(0, Math.min(slideIndex, totalSlides - 1));
        updateCarrossel();
    }
    
    function nextSlide() {
        const totalSlides = Math.ceil(cursosDestaque.length / itemsPerView);
        if (currentIndex < totalSlides - 1) {
            currentIndex++;
            updateCarrossel();
        }
    }
    
    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarrossel();
        }
    }
    
    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(() => {
            const totalSlides = Math.ceil(cursosDestaque.length / itemsPerView);
            if (currentIndex < totalSlides - 1) {
                nextSlide();
            } else {
                goToSlide(0);
            }
        }, 5000);
    }
    
    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }
    
    // Responsividade
    function handleResize() {
        const width = window.innerWidth;
        
        if (width < 768) {
            itemsPerView = 1;
        } else if (width < 992) {
            itemsPerView = 2;
        } else {
            itemsPerView = 3;
        }
        
        currentIndex = 0;
        updateCarrossel();
    }
    
    // Event Listeners
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });
    
    // Pausar auto-play no hover
    carrosselTrack.addEventListener('mouseenter', stopAutoPlay);
    carrosselTrack.addEventListener('mouseleave', startAutoPlay);
    
    // Inicializar
    initCarrossel();
    startAutoPlay();
    
    // Listeners de redimensionamento
    window.addEventListener('resize', handleResize);
    handleResize();
});

// Função global para adicionar ao carrinho
function adicionarAoCarrinho(id, nome, preco) {
    if (typeof window.adicionarAoCarrinhoGlobal === 'function') {
        window.adicionarAoCarrinhoGlobal(id, nome, preco);
    } else {
        console.log(`Curso ${id} - ${nome} adicionado ao carrinho`);
        // Mostrar notificação
        showNotification(`${nome} adicionado ao carrinho!`);
    }
}

function showNotification(message) {
    // Criar notificação
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #28a745;
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
    
    // Adicionar estilo de animação se não existir
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
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
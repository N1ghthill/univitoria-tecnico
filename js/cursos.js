// Página de Cursos - Funcionalidades
document.addEventListener('DOMContentLoaded', function() {
    // Elementos DOM
    const cursosGrid = document.getElementById('cursosGrid');
    const cursosCount = document.getElementById('cursosCount');
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    const buscaInput = document.getElementById('buscaInput');
    const buscaBtn = document.getElementById('buscaBtn');
    const ordenacaoSelect = document.getElementById('ordenacaoSelect');
    const semResultados = document.getElementById('semResultados');
    
    // Estado
    let cursosFiltrados = [];
    let categoriaAtiva = 'todos';
    let termoBusca = '';
    
    // Inicializar
    init();
    
    function init() {
        // Carregar cursos
        loadCursos();
        
        // Configurar event listeners
        setupEventListeners();
        
        // Atualizar contador
        updateContador();
    }
    
    function loadCursos() {
        // Verificar se já existem cursos carregados
        if (cursosGrid.children.length === 0) {
            renderCursos(getAllCursos());
        } else {
            cursosFiltrados = Array.from(cursosGrid.children).map(card => ({
                nome: card.querySelector('.curso-titulo').textContent,
                categoria: card.querySelector('.curso-categoria').textContent.toLowerCase(),
                // ... outras propriedades
            }));
        }
    }
    
    function renderCursos(cursos) {
        if (!cursosGrid) return;
        
        cursosGrid.innerHTML = '';
        
        if (cursos.length === 0) {
            semResultados.classList.add('active');
            return;
        }
        
        semResultados.classList.remove('active');
        
        cursos.forEach((curso, index) => {
            const cursoCard = createCursoCard(curso, index);
            cursosGrid.appendChild(cursoCard);
        });
        
        // Atualizar cursos filtrados
        cursosFiltrados = cursos;
    }
    
    function createCursoCard(curso, index) {
        const card = document.createElement('div');
        card.className = 'curso-card';
        
        // Formatar preços
        const precoFormatado = formatCurrency(curso.preco);
        const precoOriginalFormatado = formatCurrency(curso.precoOriginal);
        
        // Cor da categoria
        const categoriaCor = getCategoriaColor(curso.categoria);
        
        card.innerHTML = `
            <div class="curso-header">
                <span class="curso-categoria" style="background: ${categoriaCor}">${curso.categoriaNome}</span>
                <h3 class="curso-titulo">${curso.nome}</h3>
                <p class="curso-descricao">${curso.descricao}</p>
            </div>
            
            <div class="curso-detalhes">
                <div class="curso-info">
                    <span class="curso-info-label">Duração:</span>
                    <span class="curso-info-valor">${curso.duracao}</span>
                </div>
                <div class="curso-info">
                    <span class="curso-info-label">Carga Horária:</span>
                    <span class="curso-info-valor">${curso.cargaHoraria}</span>
                </div>
                <div class="curso-info">
                    <span class="curso-info-label">Certificação:</span>
                    <span class="curso-info-valor">Reconhecido pelo MEC</span>
                </div>
            </div>
            
            <div class="curso-footer">
                <div class="curso-preco">
                    <div>
                        <div class="preco-atual">${precoFormatado}</div>
                        <div class="preco-original">${precoOriginalFormatado}</div>
                    </div>
                </div>
                <div class="curso-botoes">
                    <button class="btn-detalhes" onclick="verDetalhesCurso(${index})">
                        <i class="fas fa-info-circle"></i> Detalhes
                    </button>
                    <button class="btn-carrinho" onclick="adicionarAoCarrinho(${curso.id || index}, '${curso.nome}', ${curso.preco})">
                        <i class="fas fa-shopping-cart"></i>
                    </button>
                </div>
            </div>
        `;
        
        return card;
    }
    
    function filtrarCursos() {
        const cursos = getAllCursos();
        
        let filtrados = cursos.filter(curso => {
            // Filtro por categoria
            if (categoriaAtiva !== 'todos' && curso.categoria !== categoriaAtiva) {
                return false;
            }
            
            // Filtro por busca
            if (termoBusca) {
                const searchTerm = termoBusca.toLowerCase();
                const nomeCurso = curso.nome.toLowerCase();
                const descricaoCurso = curso.descricao.toLowerCase();
                
                if (!nomeCurso.includes(searchTerm) && !descricaoCurso.includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Ordenar
        ordenarCursos(filtrados);
        
        renderCursos(filtrados);
        updateContador();
    }
    
    function ordenarCursos(cursos) {
        const ordenacao = ordenacaoSelect.value;
        
        switch (ordenacao) {
            case 'nome':
                cursos.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'preco-crescente':
                cursos.sort((a, b) => a.preco - b.preco);
                break;
            case 'preco-decrescente':
                cursos.sort((a, b) => b.preco - a.preco);
                break;
            case 'duracao':
                cursos.sort((a, b) => {
                    const mesesA = parseInt(a.duracao);
                    const mesesB = parseInt(b.duracao);
                    return mesesA - mesesB;
                });
                break;
        }
    }
    
    function updateContador() {
        if (cursosCount) {
            const count = cursosFiltrados.length || document.querySelectorAll('.curso-card').length;
            cursosCount.textContent = `${count} curso${count !== 1 ? 's' : ''} encontrado${count !== 1 ? 's' : ''}`;
        }
    }
    
    function setupEventListeners() {
        // Filtros por categoria
        filtroBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filtroBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                categoriaAtiva = btn.dataset.categoria;
                filtrarCursos();
            });
        });
        
        // Busca
        if (buscaBtn && buscaInput) {
            buscaBtn.addEventListener('click', () => {
                termoBusca = buscaInput.value.trim();
                filtrarCursos();
            });
            
            buscaInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    termoBusca = buscaInput.value.trim();
                    filtrarCursos();
                }
            });
        }
        
        // Ordenação
        if (ordenacaoSelect) {
            ordenacaoSelect.addEventListener('change', () => {
                filtrarCursos();
            });
        }
    }
    
    // Funções auxiliares
    function formatCurrency(value) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    }
    
    function getCategoriaColor(categoria) {
        const colors = {
            'saude': '#e74c3c',
            'administracao': '#3498db',
            'tecnologia': '#9b59b6',
            'engenharia': '#f39c12',
            'construcao': '#d35400',
            'meio-ambiente': '#27ae60',
            'servicos': '#16a085'
        };
        return colors[categoria] || '#0056A6';
    }
    
    // Dados completos dos cursos
    function getAllCursos() {
        return [
            // Saúde (11 cursos)
            {
                id: 1,
                nome: "Técnico em Enfermagem",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Formação técnica para auxiliar de enfermagem com certificação reconhecida.",
                duracao: "24 meses",
                cargaHoraria: "1800h",
                preco: 1899.00,
                precoOriginal: 2399.00
            },
            {
                id: 2,
                nome: "Técnico em Análises Clínicas",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Especialização em exames laboratoriais e análises clínicas.",
                duracao: "24 meses",
                cargaHoraria: "1600h",
                preco: 1899.00,
                precoOriginal: 2299.00
            },
            {
                id: 3,
                nome: "Técnico em Farmácia",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Atuação em farmácias e drogarias com manipulação de medicamentos.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1799.00,
                precoOriginal: 2199.00
            },
            // Administração (12 cursos)
            {
                id: 12,
                nome: "Técnico em Administração",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão empresarial, processos administrativos e controle financeiro.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1599.00,
                precoOriginal: 1999.00
            },
            {
                id: 13,
                nome: "Técnico em Logística",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de cadeia de suprimentos, transportes e distribuição.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1699.00,
                precoOriginal: 2099.00
            },
            {
                id: 14,
                nome: "Técnico em Recursos Humanos",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de pessoas, departamento pessoal e processos seletivos.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1599.00,
                precoOriginal: 1999.00
            },
            // Tecnologia (9 cursos)
            {
                id: 24,
                nome: "Técnico em Desenvolvimento de Sistemas",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Programação e desenvolvimento de softwares e aplicativos.",
                duracao: "24 meses",
                cargaHoraria: "1600h",
                preco: 2199.00,
                precoOriginal: 2699.00
            },
            {
                id: 25,
                nome: "Técnico em Informática para Internet",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Desenvolvimento web, aplicações online e e-commerce.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1899.00,
                precoOriginal: 2299.00
            },
            // Engenharia (11 cursos)
            {
                id: 33,
                nome: "Técnico em Mecânica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Manutenção automotiva e industrial com especialização técnica.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1799.00,
                precoOriginal: 2199.00
            },
            // Construção (7 cursos)
            {
                id: 44,
                nome: "Técnico em Edificações",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Projetos e execução de obras civis com segurança e qualidade.",
                duracao: "24 meses",
                cargaHoraria: "1600h",
                preco: 1899.00,
                precoOriginal: 2299.00
            },
            // Meio Ambiente (1 curso)
            {
                id: 51,
                nome: "Técnico em Meio Ambiente",
                categoria: "meio-ambiente",
                categoriaNome: "MEIO AMBIENTE",
                descricao: "Gestão ambiental, sustentabilidade e conservação de recursos.",
                duracao: "18 meses",
                cargaHoraria: "1200h",
                preco: 1699.00,
                precoOriginal: 2099.00
            },
            // Serviços (4 cursos)
            {
                id: 52,
                nome: "Técnico em Gastronomia",
                categoria: "servicos",
                categoriaNome: "SERVIÇOS",
                descricao: "Técnicas culinárias, gestão de cozinha e cardápios especiais.",
                duracao: "24 meses",
                cargaHoraria: "1600h",
                preco: 1999.00,
                precoOriginal: 2499.00
            }
        ];
    }
    
    // Inicializar filtragem
    filtrarCursos();
});

// Funções globais
function verDetalhesCurso(index) {
    const cursos = document.querySelectorAll('.curso-card');
    if (cursos[index]) {
        const titulo = cursos[index].querySelector('.curso-titulo').textContent;
        const preco = cursos[index].querySelector('.preco-atual').textContent;
        
        alert(`Detalhes do curso:\n\n${titulo}\n\nPreço: ${preco}\n\nPara mais informações, entre em contato conosco!`);
    }
}

// Integração com carrinho
window.adicionarAoCarrinhoGlobal = function(id, nome, preco) {
    console.log(`Curso ${id} - ${nome} adicionado ao carrinho por ${preco}`);
    showNotification(`${nome} adicionado ao carrinho!`);
    
    // Atualizar contador do carrinho
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        let count = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = count + 1;
        
        // Animação
        cartCount.style.transform = 'scale(1.3)';
        setTimeout(() => {
            cartCount.style.transform = 'scale(1)';
        }, 300);
    }
};

function showNotification(message) {
    // Reutilizar a função de notificação do carrossel.js
    if (typeof window.showNotification === 'function') {
        window.showNotification(message);
    } else {
        // Fallback simples
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 15px 20px;
            border-radius: 6px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 9999;
        `;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 3000);
    }
}
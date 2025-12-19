// cursos.js - Funcionalidades da página de cursos

class CursosManager {
    constructor() {
        this.cursos = [];
        this.cursosFiltrados = [];
        this.filtros = {
            categoria: 'todos',
            busca: '',
            ordenacao: 'relevancia',
            pagina: 1,
            porPagina: 12
        };
        
        this.init();
    }
    
    /**
     * Inicializa o gerenciador de cursos
     */
    init() {
        this.carregarCursos();
        this.setupEventListeners();
        this.carregarFiltros();
        this.aplicarFiltros();
        
        // Processar parâmetros da URL
        this.processarParametrosURL();
    }
    
    /**
     * Carrega os cursos do banco de dados (mock)
     */
    carregarCursos() {
        // Dados completos dos 55 cursos técnicos
        this.cursos = [
            // SAÚDE (11 cursos)
            {
                id: 1,
                nome: "Técnico em Enfermagem",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Formação técnica para auxiliar de enfermagem com certificação reconhecida pelo COREN. Aprenda procedimentos de enfermagem, administração de medicamentos e cuidados com pacientes.",
                duracao: "24 meses",
                cargaHoraria: "1800 horas",
                preco: 1899.00,
                precoOriginal: 2399.00,
                desconto: 21,
                icone: "fas fa-user-nurse",
                destaque: true,
                vagas: 40,
                turno: "Manhã/Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 2,
                nome: "Técnico em Análises Clínicas",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Especialização em exames laboratoriais e análises clínicas. Aprenda técnicas de coleta, processamento e análise de amostras biológicas.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-microscope",
                destaque: true,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 3,
                nome: "Técnico em Farmácia",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Atuação em farmácias e drogarias com manipulação de medicamentos. Conheça os processos de dispensação e controle de medicamentos.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-pills",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Noite",
                modalidade: "Presencial"
            },
            {
                id: 4,
                nome: "Técnico em Radiologia",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Operação de equipamentos de imagem médica e radioterapia. Formação completa em técnicas radiológicas e segurança.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-x-ray",
                destaque: false,
                vagas: 25,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 5,
                nome: "Técnico em Nutrição e Dietética",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Elaboração de cardápios e controle nutricional em UANs. Aprenda sobre planejamento alimentar e dietas especiais.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-utensils",
                destaque: false,
                vagas: 30,
                turno: "Manhã",
                modalidade: "Presencial"
            },
            {
                id: 6,
                nome: "Técnico em Saúde Bucal",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Auxiliar em procedimentos odontológicos e saúde bucal. Formação para atuar em consultórios e clínicas odontológicas.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1749.00,
                precoOriginal: 2149.00,
                desconto: 19,
                icone: "fas fa-tooth",
                destaque: false,
                vagas: 30,
                turno: "Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 7,
                nome: "Técnico em Prótese Dentária",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Confecção de próteses dentárias e aparelhos ortodônticos. Domine as técnicas de laboratório odontológico.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2099.00,
                precoOriginal: 2599.00,
                desconto: 19,
                icone: "fas fa-teeth",
                destaque: false,
                vagas: 20,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 8,
                nome: "Técnico em Massoterapia",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Técnicas de massagem terapêutica e relaxamento. Formação completa em diversas modalidades de massagem.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-spa",
                destaque: false,
                vagas: 25,
                turno: "Manhã/Noite",
                modalidade: "Presencial"
            },
            {
                id: 9,
                nome: "Técnico em Óptica",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Montagem e adaptação de lentes e armações ópticas. Aprenda sobre exames de visão e correção óptica.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-glasses",
                destaque: false,
                vagas: 20,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 10,
                nome: "Técnico em Acupuntura",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Técnicas de acupuntura e medicina tradicional chinesa. Formação para aplicação de agulhas e terapias complementares.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-stethoscope",
                destaque: false,
                vagas: 25,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 11,
                nome: "Técnico em Podologia",
                categoria: "saude",
                categoriaNome: "SAÚDE",
                descricao: "Cuidados com a saúde dos pés e tratamento de patologias. Especialização em podologia clínica e estética.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-shoe-prints",
                destaque: false,
                vagas: 20,
                turno: "Manhã",
                modalidade: "Presencial"
            },
            
            // ADMINISTRAÇÃO (12 cursos)
            {
                id: 12,
                nome: "Técnico em Administração",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão empresarial, processos administrativos e controle financeiro. Formação completa para atuar em diversos departamentos.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1599.00,
                precoOriginal: 1999.00,
                desconto: 20,
                icone: "fas fa-chart-line",
                destaque: true,
                vagas: 50,
                turno: "Manhã/Tarde/Noite",
                modalidade: "Presencial/EAD"
            },
            {
                id: 13,
                nome: "Técnico em Logística",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de cadeia de suprimentos, transportes e distribuição. Domine os processos logísticos e de supply chain.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-truck",
                destaque: false,
                vagas: 40,
                turno: "Manhã/Noite",
                modalidade: "Presencial"
            },
            {
                id: 14,
                nome: "Técnico em Recursos Humanos",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de pessoas, departamento pessoal e processos seletivos. Formação para atuar no setor de RH de empresas.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1599.00,
                precoOriginal: 1999.00,
                desconto: 20,
                icone: "fas fa-users",
                destaque: false,
                vagas: 35,
                turno: "Tarde/Noite",
                modalidade: "Presencial/EAD"
            },
            {
                id: 15,
                nome: "Técnico em Contabilidade",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Controle fiscal, contábil e tributário de empresas. Aprenda sobre escrituração contábil e obrigações fiscais.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1749.00,
                precoOriginal: 2149.00,
                desconto: 19,
                icone: "fas fa-calculator",
                destaque: false,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 16,
                nome: "Técnico em Finanças",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Análise financeira, controle orçamentário e investimentos. Formação especializada em gestão financeira.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-chart-pie",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "EAD"
            },
            {
                id: 17,
                nome: "Técnico em Marketing",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Estratégias de marketing, publicidade e pesquisa de mercado. Aprenda sobre marketing digital e tradicional.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-bullhorn",
                destaque: false,
                vagas: 40,
                turno: "Manhã/Tarde",
                modalidade: "Presencial/EAD"
            },
            {
                id: 18,
                nome: "Técnico em Vendas",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Técnicas de vendas, negociação e relacionamento com clientes. Formação para atuar no comercial de empresas.",
                duracao: "12 meses",
                cargaHoraria: "800 horas",
                preco: 1499.00,
                precoOriginal: 1899.00,
                desconto: 21,
                icone: "fas fa-shopping-cart",
                destaque: false,
                vagas: 45,
                turno: "Manhã/Noite",
                modalidade: "Presencial"
            },
            {
                id: 19,
                nome: "Técnico em Secretariado",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de agenda, documentos e comunicação empresarial. Formação para atuar como assistente administrativo.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1599.00,
                precoOriginal: 1999.00,
                desconto: 20,
                icone: "fas fa-briefcase",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 20,
                nome: "Técnico em Comércio Exterior",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Processos de importação, exportação e legislação aduaneira. Formação para atuar no comércio internacional.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-globe-americas",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 21,
                nome: "Técnico em Gestão de Qualidade",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Sistemas de gestão da qualidade e processos de melhoria contínua. Aprenda sobre normas ISO e certificações.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1749.00,
                precoOriginal: 2149.00,
                desconto: 19,
                icone: "fas fa-award",
                destaque: false,
                vagas: 30,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 22,
                nome: "Técnico em Processos Gerenciais",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Gestão de processos empresariais e tomada de decisão. Formação para supervisão e coordenação de equipes.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-tasks",
                destaque: false,
                vagas: 35,
                turno: "Noite",
                modalidade: "EAD"
            },
            {
                id: 23,
                nome: "Técnico em Empreendedorismo",
                categoria: "administracao",
                categoriaNome: "ADMINISTRAÇÃO",
                descricao: "Criação e gestão de negócios próprios. Aprenda sobre plano de negócios e gestão empreendedora.",
                duracao: "12 meses",
                cargaHoraria: "800 horas",
                preco: 1499.00,
                precoOriginal: 1899.00,
                desconto: 21,
                icone: "fas fa-lightbulb",
                destaque: false,
                vagas: 40,
                turno: "Manhã/Tarde",
                modalidade: "Presencial/EAD"
            },
            
            // TECNOLOGIA (9 cursos)
            {
                id: 24,
                nome: "Técnico em Desenvolvimento de Sistemas",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Programação e desenvolvimento de softwares e aplicativos. Aprenda Java, Python, JavaScript e banco de dados.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2199.00,
                precoOriginal: 2699.00,
                desconto: 19,
                icone: "fas fa-laptop-code",
                destaque: true,
                vagas: 35,
                turno: "Manhã/Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 25,
                nome: "Técnico em Informática para Internet",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Desenvolvimento web, aplicações online e e-commerce. Domine HTML, CSS, JavaScript e frameworks modernos.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-globe",
                destaque: false,
                vagas: 40,
                turno: "Manhã/Tarde",
                modalidade: "Presencial/EAD"
            },
            {
                id: 26,
                nome: "Técnico em Redes de Computadores",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Infraestrutura de redes, configuração de equipamentos e segurança. Formação para atuar como técnico em redes.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-network-wired",
                destaque: false,
                vagas: 30,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 27,
                nome: "Técnico em Manutenção de Computadores",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Manutenção e reparo de hardware e software de computadores. Formação completa para suporte técnico.",
                duracao: "12 meses",
                cargaHoraria: "800 horas",
                preco: 1599.00,
                precoOriginal: 1999.00,
                desconto: 20,
                icone: "fas fa-tools",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 28,
                nome: "Técnico em Programação de Jogos Digitais",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Desenvolvimento de jogos para diversas plataformas. Aprenda Unity, C# e técnicas de game design.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2299.00,
                precoOriginal: 2799.00,
                desconto: 18,
                icone: "fas fa-gamepad",
                destaque: false,
                vagas: 25,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 29,
                nome: "Técnico em Banco de Dados",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Modelagem, implementação e administração de bancos de dados. Domine SQL, MySQL, PostgreSQL e MongoDB.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-database",
                destaque: false,
                vagas: 30,
                turno: "Noite",
                modalidade: "Presencial/EAD"
            },
            {
                id: 30,
                nome: "Técnico em Suporte em TI",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Atendimento técnico, help desk e suporte a usuários. Formação para atuar em service desk de empresas.",
                duracao: "12 meses",
                cargaHoraria: "800 horas",
                preco: 1599.00,
                precoOriginal: 1999.00,
                desconto: 20,
                icone: "fas fa-headset",
                destaque: false,
                vagas: 40,
                turno: "Manhã/Tarde/Noite",
                modalidade: "Presencial/EAD"
            },
            {
                id: 31,
                nome: "Técnico em Segurança da Informação",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Proteção de sistemas, redes e dados contra ameaças cibernéticas. Aprenda sobre ethical hacking e segurança.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2099.00,
                precoOriginal: 2599.00,
                desconto: 19,
                icone: "fas fa-shield-alt",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 32,
                nome: "Técnico em Robótica",
                categoria: "tecnologia",
                categoriaNome: "TECNOLOGIA",
                descricao: "Programação e montagem de robôs e sistemas automatizados. Aprenda Arduino, Raspberry Pi e automação.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-robot",
                destaque: false,
                vagas: 20,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            
            // ENGENHARIA (11 cursos)
            {
                id: 33,
                nome: "Técnico em Mecânica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Manutenção automotiva e industrial com especialização técnica. Aprenda sobre máquinas, motores e sistemas mecânicos.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-cogs",
                destaque: false,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 34,
                nome: "Técnico em Eletrotécnica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Instalações elétricas, automação e manutenção de sistemas elétricos. Formação para atuar como eletrotécnico.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-bolt",
                destaque: true,
                vagas: 35,
                turno: "Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 35,
                nome: "Técnico em Eletrônica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Manutenção de equipamentos eletrônicos e circuitos digitais. Aprenda sobre componentes eletrônicos e microcontroladores.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1949.00,
                precoOriginal: 2449.00,
                desconto: 20,
                icone: "fas fa-microchip",
                destaque: false,
                vagas: 25,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 36,
                nome: "Técnico em Mecatrônica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Integração de mecânica, eletrônica e informática para automação. Formação em robótica industrial e sistemas automatizados.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2099.00,
                precoOriginal: 2599.00,
                desconto: 19,
                icone: "fas fa-industry",
                destaque: false,
                vagas: 20,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 37,
                nome: "Técnico em Automação Industrial",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Programação de CLPs e sistemas de automação industrial. Aprenda sobre controle de processos e instrumentação.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2049.00,
                precoOriginal: 2549.00,
                desconto: 20,
                icone: "fas fa-robot",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 38,
                nome: "Técnico em Refrigeração e Climatização",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Instalação e manutenção de sistemas de refrigeração e ar condicionado. Formação completa em climatização.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-snowflake",
                destaque: false,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 39,
                nome: "Técnico em Manutenção de Aeronaves",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Manutenção preventiva e corretiva de aeronaves. Formação especializada para manutenção aeronáutica.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 2499.00,
                precoOriginal: 2999.00,
                desconto: 17,
                icone: "fas fa-plane",
                destaque: false,
                vagas: 20,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 40,
                nome: "Técnico em Soldagem",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Técnicas de soldagem em diferentes materiais e processos. Formação completa em soldagem industrial.",
                duracao: "12 meses",
                cargaHoraria: "800 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-fire",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 41,
                nome: "Técnico em Instrumentação",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Calibração e manutenção de instrumentos de medição e controle. Aprenda sobre instrumentação industrial.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-tachometer-alt",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 42,
                nome: "Técnico em Petroquímica",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Processos petroquímicos, operação de unidades e segurança industrial. Formação para atuar na indústria petroquímica.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-oil-can",
                destaque: false,
                vagas: 30,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 43,
                nome: "Técnico em Manutenção Industrial",
                categoria: "engenharia",
                categoriaNome: "ENGENHARIA",
                descricao: "Manutenção de máquinas e equipamentos industriais. Formação em manutenção mecânica e preditiva.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-tools",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            
            // CONSTRUÇÃO (7 cursos)
            {
                id: 44,
                nome: "Técnico em Edificações",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Projetos e execução de obras civis com segurança e qualidade. Aprenda sobre topografia, desenho técnico e gestão de obras.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-hard-hat",
                destaque: true,
                vagas: 40,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 45,
                nome: "Técnico em Segurança do Trabalho",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Normas de segurança, prevenção de acidentes e saúde ocupacional. Formação para atuar como técnico em segurança.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-user-shield",
                destaque: true,
                vagas: 45,
                turno: "Manhã/Tarde/Noite",
                modalidade: "Presencial/EAD"
            },
            {
                id: 46,
                nome: "Técnico em Topografia",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Levantamentos topográficos, georreferenciamento e cartografia. Domine o uso de equipamentos de precisão.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1849.00,
                precoOriginal: 2249.00,
                desconto: 18,
                icone: "fas fa-map",
                destaque: false,
                vagas: 25,
                turno: "Tarde",
                modalidade: "Presencial"
            },
            {
                id: 47,
                nome: "Técnico em Agrimensura",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Demarcação de terrenos, divisão de lotes e regularização fundiária. Formação especializada em agrimensura.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-ruler-combined",
                destaque: false,
                vagas: 20,
                turno: "Manhã",
                modalidade: "Presencial"
            },
            {
                id: 48,
                nome: "Técnico em Desenho de Construção Civil",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Elaboração de projetos arquitetônicos e estruturais com AutoCAD. Aprenda desenho técnico e modelagem 3D.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1749.00,
                precoOriginal: 2149.00,
                desconto: 19,
                icone: "fas fa-drafting-compass",
                destaque: false,
                vagas: 30,
                turno: "Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 49,
                nome: "Técnico em Geoprocessamento",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Sistemas de Informação Geográfica (SIG) e sensoriamento remoto. Aprenda sobre QGIS, ArcGIS e análises espaciais.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1899.00,
                precoOriginal: 2299.00,
                desconto: 17,
                icone: "fas fa-globe-americas",
                destaque: false,
                vagas: 25,
                turno: "Noite",
                modalidade: "Presencial"
            },
            {
                id: 50,
                nome: "Técnico em Controle de Obras",
                categoria: "construcao",
                categoriaNome: "CONSTRUÇÃO",
                descricao: "Gestão de cronogramas, custos e qualidade em obras civis. Formação para atuar como fiscal de obras.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-clipboard-check",
                destaque: false,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            
            // MEIO AMBIENTE (1 curso)
            {
                id: 51,
                nome: "Técnico em Meio Ambiente",
                categoria: "meio-ambiente",
                categoriaNome: "MEIO AMBIENTE",
                descricao: "Gestão ambiental, sustentabilidade e conservação de recursos. Aprenda sobre licenciamento, educação ambiental e gestão de resíduos.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-leaf",
                destaque: true,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            
            // SERVIÇOS (4 cursos)
            {
                id: 52,
                nome: "Técnico em Gastronomia",
                categoria: "servicos",
                categoriaNome: "SERVIÇOS",
                descricao: "Técnicas culinárias, gestão de cozinha e cardápios especiais. Aprenda sobre cozinha nacional, internacional e confeitaria.",
                duracao: "24 meses",
                cargaHoraria: "1600 horas",
                preco: 1999.00,
                precoOriginal: 2499.00,
                desconto: 20,
                icone: "fas fa-utensils",
                destaque: true,
                vagas: 30,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 53,
                nome: "Técnico em Estética",
                categoria: "servicos",
                categoriaNome: "SERVIÇOS",
                descricao: "Tratamentos estéticos faciais e corporais, maquiagem e cosmetologia. Formação completa em estética e beleza.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1749.00,
                precoOriginal: 2149.00,
                desconto: 19,
                icone: "fas fa-spa",
                destaque: false,
                vagas: 35,
                turno: "Manhã/Tarde",
                modalidade: "Presencial"
            },
            {
                id: 54,
                nome: "Técnico em Guia de Turismo",
                categoria: "servicos",
                categoriaNome: "SERVIÇOS",
                descricao: "Roteiros turísticos, atendimento ao turista e patrimônio cultural. Formação para atuar como guia turístico.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1699.00,
                precoOriginal: 2099.00,
                desconto: 19,
                icone: "fas fa-map-signs",
                destaque: false,
                vagas: 25,
                turno: "Tarde/Noite",
                modalidade: "Presencial"
            },
            {
                id: 55,
                nome: "Técnico em Eventos",
                categoria: "servicos",
                categoriaNome: "SERVIÇOS",
                descricao: "Organização e produção de eventos sociais e corporativos. Aprenda sobre cerimonial, protocolo e logística de eventos.",
                duracao: "18 meses",
                cargaHoraria: "1200 horas",
                preco: 1799.00,
                precoOriginal: 2199.00,
                desconto: 18,
                icone: "fas fa-glass-cheers",
                destaque: false,
                vagas: 30,
                turno: "Noite",
                modalidade: "Presencial/EAD"
            }
        ];
        
        console.log(`Carregados ${this.cursos.length} cursos técnicos`);
    }
    
    /**
     * Configura os event listeners
     */
    setupEventListeners() {
        // Busca
        const buscaInput = document.getElementById('buscaInput');
        const buscaBtn = document.getElementById('buscaBtn');
        
        if (buscaInput && buscaBtn) {
            buscaBtn.addEventListener('click', () => {
                this.filtros.busca = buscaInput.value.trim();
                this.filtros.pagina = 1;
                this.aplicarFiltros();
            });
            
            buscaInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.filtros.busca = buscaInput.value.trim();
                    this.filtros.pagina = 1;
                    this.aplicarFiltros();
                }
            });
        }
        
        // Ordenação
        const ordenacaoSelect = document.getElementById('ordenacaoSelect');
        if (ordenacaoSelect) {
            ordenacaoSelect.addEventListener('change', (e) => {
                this.filtros.ordenacao = e.target.value;
                this.aplicarFiltros();
            });
        }
        
        // Limpar filtros
        const limparFiltrosBtn = document.getElementById('limparFiltros');
        if (limparFiltrosBtn) {
            limparFiltrosBtn.addEventListener('click', () => {
                this.limparFiltros();
            });
        }
    }
    
    /**
     * Carrega os filtros de categoria
     */
    carregarFiltros() {
        const filtrosContainer = document.getElementById('filtrosCategorias');
        if (!filtrosContainer) return;
        
        const categorias = [
            { id: 'todos', nome: 'Todos', count: this.cursos.length },
            { id: 'saude', nome: 'Saúde', count: this.cursos.filter(c => c.categoria === 'saude').length },
            { id: 'administracao', nome: 'Administração', count: this.cursos.filter(c => c.categoria === 'administracao').length },
            { id: 'tecnologia', nome: 'Tecnologia', count: this.cursos.filter(c => c.categoria === 'tecnologia').length },
            { id: 'engenharia', nome: 'Engenharia', count: this.cursos.filter(c => c.categoria === 'engenharia').length },
            { id: 'construcao', nome: 'Construção', count: this.cursos.filter(c => c.categoria === 'construcao').length },
            { id: 'meio-ambiente', nome: 'Meio Ambiente', count: this.cursos.filter(c => c.categoria === 'meio-ambiente').length },
            { id: 'servicos', nome: 'Serviços', count: this.cursos.filter(c => c.categoria === 'servicos').length }
        ];
        
        filtrosContainer.innerHTML = categorias.map(categoria => `
            <button class="filtro-btn ${this.filtros.categoria === categoria.id ? 'active' : ''}" 
                    data-categoria="${categoria.id}">
                ${categoria.nome} <span class="filtro-count">(${categoria.count})</span>
            </button>
        `).join('');
        
        // Adicionar event listeners aos botões
        filtrosContainer.querySelectorAll('.filtro-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const categoria = e.target.closest('.filtro-btn').dataset.categoria;
                
                // Atualizar estado dos botões
                filtrosContainer.querySelectorAll('.filtro-btn').forEach(b => {
                    b.classList.remove('active');
                });
                e.target.closest('.filtro-btn').classList.add('active');
                
                // Atualizar filtro
                this.filtros.categoria = categoria;
                this.filtros.pagina = 1;
                this.aplicarFiltros();
            });
        });
    }
    
    /**
     * Aplica os filtros e renderiza os cursos
     */
    aplicarFiltros() {
        // Filtrar cursos
        this.cursosFiltrados = this.cursos.filter(curso => {
            // Filtro por categoria
            if (this.filtros.categoria !== 'todos' && curso.categoria !== this.filtros.categoria) {
                return false;
            }
            
            // Filtro por busca
            if (this.filtros.busca) {
                const searchTerm = this.filtros.busca.toLowerCase();
                const nomeCurso = curso.nome.toLowerCase();
                const descricaoCurso = curso.descricao.toLowerCase();
                
                if (!nomeCurso.includes(searchTerm) && !descricaoCurso.includes(searchTerm)) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Ordenar cursos
        this.ordenarCursos();
        
        // Atualizar contador
        this.atualizarContador();
        
        // Renderizar cursos
        this.renderizarCursos();
        
        // Atualizar URL
        this.atualizarURL();
    }
    
    /**
     * Ordena os cursos com base no filtro selecionado
     */
    ordenarCursos() {
        switch (this.filtros.ordenacao) {
            case 'nome-asc':
                this.cursosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));
                break;
            case 'nome-desc':
                this.cursosFiltrados.sort((a, b) => b.nome.localeCompare(a.nome));
                break;
            case 'preco-asc':
                this.cursosFiltrados.sort((a, b) => a.preco - b.preco);
                break;
            case 'preco-desc':
                this.cursosFiltrados.sort((a, b) => b.preco - a.preco);
                break;
            case 'duracao-asc':
                this.cursosFiltrados.sort((a, b) => {
                    const mesesA = parseInt(a.duracao);
                    const mesesB = parseInt(b.duracao);
                    return (mesesA || 0) - (mesesB || 0);
                });
                break;
            case 'duracao-desc':
                this.cursosFiltrados.sort((a, b) => {
                    const mesesA = parseInt(a.duracao);
                    const mesesB = parseInt(b.duracao);
                    return (mesesB || 0) - (mesesA || 0);
                });
                break;
            case 'relevancia':
            default:
                // Ordem padrão: destaques primeiro, depois por nome
                this.cursosFiltrados.sort((a, b) => {
                    if (a.destaque && !b.destaque) return -1;
                    if (!a.destaque && b.destaque) return 1;
                    return a.nome.localeCompare(b.nome);
                });
                break;
        }
    }
    
    /**
     * Atualiza o contador de cursos
     */
    atualizarContador() {
        const cursosCount = document.getElementById('cursosCount');
        if (cursosCount) {
            const total = this.cursosFiltrados.length;
            const inicio = (this.filtros.pagina - 1) * this.filtros.porPagina + 1;
            const fim = Math.min(inicio + this.filtros.porPagina - 1, total);
            
            if (total === 0) {
                cursosCount.textContent = 'Nenhum curso encontrado';
            } else if (total <= this.filtros.porPagina) {
                cursosCount.textContent = `${total} curso${total !== 1 ? 's' : ''} encontrado${total !== 1 ? 's' : ''}`;
            } else {
                cursosCount.textContent = `Mostrando ${inicio}-${fim} de ${total} cursos`;
            }
        }
    }
    
    /**
     * Renderiza os cursos na grid
     */
    renderizarCursos() {
        const cursosGrid = document.getElementById('cursosGrid');
        const cursosEmpty = document.getElementById('cursosEmpty');
        const cursosPagination = document.getElementById('cursosPagination');
        
        if (!cursosGrid) return;
        
        // Verificar se há cursos
        if (this.cursosFiltrados.length === 0) {
            cursosGrid.innerHTML = '';
            if (cursosEmpty) cursosEmpty.style.display = 'flex';
            if (cursosPagination) cursosPagination.innerHTML = '';
            return;
        }
        
        // Ocultar mensagem de vazio
        if (cursosEmpty) cursosEmpty.style.display = 'none';
        
        // Calcular paginação
        const totalCursos = this.cursosFiltrados.length;
        const totalPaginas = Math.ceil(totalCursos / this.filtros.porPagina);
        const inicio = (this.filtros.pagina - 1) * this.filtros.porPagina;
        const fim = inicio + this.filtros.porPagina;
        const cursosPagina = this.cursosFiltrados.slice(inicio, fim);
        
        // Renderizar cursos da página atual
        cursosGrid.innerHTML = cursosPagina.map(curso => this.criarCardCurso(curso)).join('');
        
        // Renderizar paginação
        if (cursosPagination) {
            this.renderizarPaginacao(cursosPagination, totalPaginas);
        }
    }
    
    /**
     * Cria o card HTML para um curso
     * @param {Object} curso - Dados do curso
     * @returns {string} HTML do card
     */
    criarCardCurso(curso) {
        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(curso.preco);
        
        const precoOriginalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(curso.precoOriginal);
        
        // Cor da categoria
        const categoriaCor = this.getCategoriaColor(curso.categoria);
        
        // Badge de destaque
        const badgeDestaque = curso.destaque ? 
            `<div class="curso-badge destaque">DESTAQUE</div>` : '';
        
        // Badge de desconto
        const badgeDesconto = curso.desconto > 15 ? 
            `<div class="curso-badge desconto">-${curso.desconto}%</div>` : '';
        
        return `
            <div class="curso-card" data-id="${curso.id}" data-categoria="${curso.categoria}">
                ${badgeDestaque}
                ${badgeDesconto}
                
                <div class="curso-header">
                    <span class="curso-categoria" style="background: ${categoriaCor}">
                        ${curso.categoriaNome}
                    </span>
                    <h3 class="curso-titulo">${curso.nome}</h3>
                    <p class="curso-descricao">${curso.descricao}</p>
                </div>
                
                <div class="curso-detalhes">
                    <div class="curso-info">
                        <span class="curso-info-label"><i class="fas fa-clock"></i> Duração:</span>
                        <span class="curso-info-valor">${curso.duracao}</span>
                    </div>
                    <div class="curso-info">
                        <span class="curso-info-label"><i class="fas fa-book"></i> Carga Horária:</span>
                        <span class="curso-info-valor">${curso.cargaHoraria}</span>
                    </div>
                    <div class="curso-info">
                        <span class="curso-info-label"><i class="fas fa-user-friends"></i> Vagas:</span>
                        <span class="curso-info-valor">${curso.vagas}</span>
                    </div>
                    <div class="curso-info">
                        <span class="curso-info-label"><i class="fas fa-calendar-alt"></i> Turno:</span>
                        <span class="curso-info-valor">${curso.turno}</span>
                    </div>
                    <div class="curso-info">
                        <span class="curso-info-label"><i class="fas fa-laptop-house"></i> Modalidade:</span>
                        <span class="curso-info-valor">${curso.modalidade}</span>
                    </div>
                </div>
                
                <div class="curso-footer">
                    <div class="curso-preco">
                        <div>
                            <div class="preco-atual">${precoFormatado}</div>
                            <div class="preco-original">${precoOriginalFormatado}</div>
                        </div>
                        <div class="curso-desconto">${curso.desconto}% OFF</div>
                    </div>
                    <div class="curso-botoes">
                        <button class="btn-detalhes" onclick="cursosManager.verDetalhesCurso(${curso.id})">
                            <i class="fas fa-info-circle"></i> Detalhes
                        </button>
                        <button class="btn-carrinho" onclick="carrinhoManager.adicionarItem(${curso.id})" aria-label="Adicionar ao carrinho">
                            <i class="fas fa-shopping-cart"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    /**
     * Renderiza a paginação
     * @param {HTMLElement} container - Container da paginação
     * @param {number} totalPaginas - Total de páginas
     */
    renderizarPaginacao(container, totalPaginas) {
        if (totalPaginas <= 1) {
            container.innerHTML = '';
            return;
        }
        
        let paginacaoHTML = '<div class="pagination">';
        
        // Botão anterior
        if (this.filtros.pagina > 1) {
            paginacaoHTML += `
                <button class="pagination-btn prev" onclick="cursosManager.mudarPagina(${this.filtros.pagina - 1})">
                    <i class="fas fa-chevron-left"></i> Anterior
                </button>
            `;
        }
        
        // Números das páginas
        const maxBotoes = 5;
        let inicio = Math.max(1, this.filtros.pagina - Math.floor(maxBotoes / 2));
        let fim = Math.min(totalPaginas, inicio + maxBotoes - 1);
        
        if (fim - inicio + 1 < maxBotoes) {
            inicio = Math.max(1, fim - maxBotoes + 1);
        }
        
        for (let i = inicio; i <= fim; i++) {
            paginacaoHTML += `
                <button class="pagination-btn ${i === this.filtros.pagina ? 'active' : ''}" 
                        onclick="cursosManager.mudarPagina(${i})">
                    ${i}
                </button>
            `;
        }
        
        // Botão próximo
        if (this.filtros.pagina < totalPaginas) {
            paginacaoHTML += `
                <button class="pagination-btn next" onclick="cursosManager.mudarPagina(${this.filtros.pagina + 1})">
                    Próximo <i class="fas fa-chevron-right"></i>
                </button>
            `;
        }
        
        paginacaoHTML += '</div>';
        container.innerHTML = paginacaoHTML;
    }
    
    /**
     * Muda para uma página específica
     * @param {number} pagina - Número da página
     */
    mudarPagina(pagina) {
        this.filtros.pagina = pagina;
        this.aplicarFiltros();
        
        // Scroll para o topo dos cursos
        const cursosGrid = document.getElementById('cursosGrid');
        if (cursosGrid) {
            cursosGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    /**
     * Limpa todos os filtros
     */
    limparFiltros() {
        this.filtros = {
            categoria: 'todos',
            busca: '',
            ordenacao: 'relevancia',
            pagina: 1,
            porPagina: 12
        };
        
        // Atualizar UI
        const buscaInput = document.getElementById('buscaInput');
        const ordenacaoSelect = document.getElementById('ordenacaoSelect');
        const filtrosCategorias = document.getElementById('filtrosCategorias');
        
        if (buscaInput) buscaInput.value = '';
        if (ordenacaoSelect) ordenacaoSelect.value = 'relevancia';
        
        // Atualizar botões de categoria
        if (filtrosCategorias) {
            filtrosCategorias.querySelectorAll('.filtro-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.dataset.categoria === 'todos') {
                    btn.classList.add('active');
                }
            });
        }
        
        this.aplicarFiltros();
        window.showNotification('Filtros limpos com sucesso', 'success');
    }
    
    /**
     * Processa parâmetros da URL
     */
    processarParametrosURL() {
        const params = new URLSearchParams(window.location.search);
        
        // Categoria
        const categoria = params.get('categoria');
        if (categoria && this.isCategoriaValida(categoria)) {
            this.filtros.categoria = categoria;
            
            // Atualizar botão ativo
            const filtrosCategorias = document.getElementById('filtrosCategorias');
            if (filtrosCategorias) {
                filtrosCategorias.querySelectorAll('.filtro-btn').forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.categoria === categoria) {
                        btn.classList.add('active');
                    }
                });
            }
        }
        
        // Busca
        const busca = params.get('busca');
        if (busca) {
            this.filtros.busca = busca;
            const buscaInput = document.getElementById('buscaInput');
            if (buscaInput) buscaInput.value = busca;
        }
    }
    
    /**
     * Atualiza a URL com os filtros atuais
     */
    atualizarURL() {
        const params = new URLSearchParams();
        
        if (this.filtros.categoria !== 'todos') {
            params.set('categoria', this.filtros.categoria);
        }
        
        if (this.filtros.busca) {
            params.set('busca', this.filtros.busca);
        }
        
        const novaURL = params.toString() ? `?${params.toString()}` : window.location.pathname;
        window.history.replaceState({}, '', novaURL);
    }
    
    /**
     * Verifica se uma categoria é válida
     * @param {string} categoria - Categoria a verificar
     * @returns {boolean} True se a categoria é válida
     */
    isCategoriaValida(categoria) {
        const categoriasValidas = ['todos', 'saude', 'administracao', 'tecnologia', 'engenharia', 'construcao', 'meio-ambiente', 'servicos'];
        return categoriasValidas.includes(categoria);
    }
    
    /**
     * Retorna a cor da categoria
     * @param {string} categoria - Categoria
     * @returns {string} Cor em formato CSS
     */
    getCategoriaColor(categoria) {
        const colors = {
            'saude': 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)',
            'administracao': 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)',
            'tecnologia': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
            'engenharia': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
            'construcao': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            'meio-ambiente': 'linear-gradient(135deg, #10B981 0%, #047857 100%)',
            'servicos': 'linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)'
        };
        return colors[categoria] || 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)';
    }
    
    /**
     * Exibe detalhes de um curso
     * @param {number} id - ID do curso
     */
    verDetalhesCurso(id) {
        const curso = this.cursos.find(c => c.id === id);
        if (!curso) return;
        
        const precoFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(curso.preco);
        
        const precoOriginalFormatado = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(curso.precoOriginal);
        
        const modalHTML = `
            <div class="curso-modal-overlay" id="cursoModalOverlay">
                <div class="curso-modal">
                    <div class="curso-modal-header">
                        <h3>${curso.nome}</h3>
                        <button class="close-modal">&times;</button>
                    </div>
                    <div class="curso-modal-body">
                        <div class="curso-modal-info">
                            <div class="info-row">
                                <span class="info-label">Categoria:</span>
                                <span class="info-value" style="color: ${this.getCategoriaColor(curso.categoria)}">
                                    ${curso.categoriaNome}
                                </span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Duração:</span>
                                <span class="info-value">${curso.duracao}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Carga Horária:</span>
                                <span class="info-value">${curso.cargaHoraria}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Vagas Disponíveis:</span>
                                <span class="info-value">${curso.vagas}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Turno:</span>
                                <span class="info-value">${curso.turno}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-label">Modalidade:</span>
                                <span class="info-value">${curso.modalidade}</span>
                            </div>
                        </div>
                        
                        <div class="curso-modal-descricao">
                            <h4>Descrição do Curso</h4>
                            <p>${curso.descricao}</p>
                        </div>
                        
                        <div class="curso-modal-ofertas">
                            <h4>O que você vai aprender</h4>
                            <ul>
                                <li><i class="fas fa-check"></i> Conhecimentos teóricos e práticos da área</li>
                                <li><i class="fas fa-check"></i> Habilidades técnicas específicas</li>
                                <li><i class="fas fa-check"></i> Normas e regulamentações do setor</li>
                                <li><i class="fas fa-check"></i> Gestão e organização do trabalho</li>
                                <li><i class="fas fa-check"></i> Segurança e qualidade nos processos</li>
                            </ul>
                        </div>
                        
                        <div class="curso-modal-certificacao">
                            <h4>Certificação</h4>
                            <p><i class="fas fa-certificate"></i> Certificado reconhecido pelo MEC</p>
                            <p><i class="fas fa-check-circle"></i> Válido em todo território nacional</p>
                        </div>
                    </div>
                    <div class="curso-modal-footer">
                        <div class="curso-modal-preco">
                            <div class="preco-promocao">
                                <span class="preco-atual">${precoFormatado}</span>
                                <span class="preco-original">${precoOriginalFormatado}</span>
                                <span class="desconto">${curso.desconto}% OFF</span>
                            </div>
                            <p class="parcelamento">Em até 12x de R$ ${(curso.preco / 12).toFixed(2)} sem juros</p>
                        </div>
                        <div class="curso-modal-botoes">
                            <button class="btn btn-secondary" onclick="carrinhoManager.adicionarItem(${curso.id}); closeCursoModal();">
                                <i class="fas fa-shopping-cart"></i> Adicionar ao Carrinho
                            </button>
                            <button class="btn btn-primary" onclick="window.location.href='#contato'">
                                <i class="fas fa-phone"></i> Falar com Consultor
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Adicionar modal ao body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Adicionar event listeners
        const modalOverlay = document.getElementById('cursoModalOverlay');
        const closeBtn = modalOverlay.querySelector('.close-modal');
        
        function closeCursoModal() {
            modalOverlay.remove();
            document.body.style.overflow = '';
        }
        
        closeBtn.addEventListener('click', closeCursoModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeCursoModal();
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCursoModal();
            }
        });
        
        // Impedir scroll do body
        document.body.style.overflow = 'hidden';
        
        // Exportar função para uso global
        window.closeCursoModal = closeCursoModal;
    }
}

// Inicializar o gerenciador de cursos
document.addEventListener('DOMContentLoaded', function() {
    window.cursosManager = new CursosManager();
    console.log('Gerenciador de cursos inicializado');
});
# 🎓 Univitória Técnico - Site Institucional

Site institucional completo para a escola de cursos técnicos profissionalizantes Univitória Técnico, localizada em Ipatinga/MG.

## ✨ Funcionalidades

✅ **Site Responsivo**
- Design adaptável para mobile, tablet e desktop
- Menu mobile com animações suaves

✅ **Catálogo Completo de Cursos**
- 55 cursos técnicos organizados por categoria
- Página específica com todos os cursos
- Sistema de filtros por categoria
- Busca por nome do curso
- Ordenação por preço, nome ou duração

✅ **Carrossel Interativo**
- Cursos em destaque com navegação
- Auto-play com pausa no hover
- Indicadores de slide
- Design responsivo

✅ **Sistema de Carrinho**
- Adicionar/remover cursos
- Contador em tempo real
- Modal de visualização
- Persistência com localStorage
- Notificações visuais

✅ **Design Moderno**
- Paleta de cores profissional
- Tipografia consistente
- Ícones Font Awesome
- Animações e transições suaves

✅ **SEO Otimizado**
- Meta tags apropriadas
- Estrutura HTML semântica
- Imagens otimizadas
- URLs amigáveis

## 🛠 Tecnologias Utilizadas

- **HTML5** - Estrutura semântica
- **CSS3** - Estilização moderna
- **JavaScript Vanilla** - Interatividade
- **Font Awesome 6** - Ícones
- **Google Fonts** - Poppins e Roboto
- **LocalStorage** - Persistência de dados

## 📁 Estrutura de Arquivos
univitoria-tecnico/
├── index.html # Página inicial
├── cursos.html # Página de todos os cursos
├── README.md # Documentação
│
├── css/
│ ├── style.css # Estilos principais
│ ├── carrossel.css # Estilos do carrossel
│ └── cursos.css # Estilos da página de cursos
│
└── js/
├── script.js # Funcionalidades gerais
├── carrossel.js # Lógica do carrossel
└── cursos.js # Lógica da página de cursos

## 🚀 Como Executar

### Opção 1: Servidor Local
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/univitoria-tecnico.git

# Acesse a pasta
cd univitoria-tecnico

# Use um servidor local (Python)
python3 -m http.server 8000

# Ou use o Live Server do VS Code
# Abra o arquivo index.html com a extensão Live Server
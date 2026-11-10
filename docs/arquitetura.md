## Arquitetura do projeto

O Arboriza foi desenvolvido como uma aplicação web organizada em duas partes principais: a seção informativa e a plataforma interativa VerdeQuest. Essa divisão permite separar a disponibilização de conteúdos informativos das ferramentas destinadas à organização e manutenção de jardins pessoais.

### Seção informativa

É a seção destinada a disponibilizar fundamentação teórica e informações acerca da vegetação urbana. É composta por:
   Página inicial: apresenta o projeto e informações sobre os benefícios da vegetação nos ambientes urbanos.
   Artigos: reúne publicações externas relacionadas ao tema.
   Mídias: disponibiliza conteúdos audiovisuais, como vídeos e podcasts.
   Glossário: apresenta definições de termos relacionados à vegetação urbana.

### VerdeQuest

Responsável pelas funcionalidades interativas destinadas à organização de jardins pessoais. É composto por:
   Autenticação: permite o cadastro e o acesso dos usuários à plataforma.
   Catálogo de plantas: disponibiliza espécies cadastradas e filtros para facilitar sua localização.
   Meu Jardim: permite adicionar e organizar plantas em uma coleção pessoal.
   Missões e progresso: apresenta atividades e indicadores de evolução do usuário.
   Orçamento: realiza estimativas de custos com base nos preços e nas quantidades informados.
   Diário do Jardim: permite registrar e consultar cuidados realizados com as plantas, incluindo regas.

### Organização de dados

As informações utilizadas pelo Arboriza podem ser divididas em duas categorias principais:

#### Dados gerais da aplicação

Compreendem informações disponibilizadas aos visitantes, como artigos, materiais audiovisuais, termos do glossário e dados das espécies cadastradas no catálogo.

#### Dados individuais dos usuários

Compreendem informações relacionadas às contas e às atividades realizadas no VerdeQuest, incluindo:

   Dados de cadastro e autenticação.
   Plantas adicionadas ao jardim pessoal.
   Informações relacionadas ao progresso e às missões.
   Valores e quantidades utilizados no planejamento de orçamento.
   Histórico de cuidados realizados com as plantas.

Os dados individuais devem ser associados aos respectivos usuários, permitindo que cada pessoa acesse suas próprias informações ao retornar à plataforma.
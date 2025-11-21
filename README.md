# Algumas dificuldades encontrada no teste

1. Ajuste na Gestão da Data de Nascimento
Durante a fase de desenvolvimento, identifiquei um problema de desserialização (erro de carregamento de dados) ao tentar exibir a lista de animais no front-end, causado pelo uso do tipo DateOnly na API.

Para resolver o problema de compatibilidade entre as plataformas, a propriedade DataNascimento no modelo de dados do animal foi alterada para o tipo string.

No front-end em React, foi mantida a usabilidade com a utilização do atributo type="date" nos campos de input correspondentes, garantindo que o usuário visualize e insira a data no formato esperado, enquanto a API gerencia o dado como uma string validada.

2. Configuração do Ambiente SQL Server
O projeto foi desenvolvido utilizando o SQL Server Express para garantir um ambiente de banco de dados acessível e sem custos

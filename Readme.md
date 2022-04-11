Esta é uma automação feita para o teste LinkApi que deveria acessar a outra API construida nesse teste,
fazer uma transformação de dados e gravar no MongoDB.

Minha tentativa foi usando o AtlasDB com mongoose, infelizmente, não consegui concluir à tempo essa parte do desafio. 

A parte que foi desenvolvida utiliza o Cron Job para de hora em hora acessar a outra API, obter a listagem dos usuários cadastrados com seus respectivos endereços e contatos, fazer a transformação dos dados e imprimir no console apenas para validação (já que não foi possível concluir no mongo). Também foi utilizado um promisify
para evitar o ratelimit da mockApi.

Para utilizar esse serviço basta iniciar o comando cron.js no node.
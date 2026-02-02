# Senha_online

Sistema digital de geração e gerenciamento de senhas para restaurantes, desenvolvido do zero com foco em organização de filas, atendimento prioritário e acompanhamento em tempo real.

---

## Visão Geral do Sistema

O **Senha_online** é um sistema de gerenciamento de filas criado para restaurantes que operam com alta demanda presencial, especialmente em finais de semana e horários de pico.

O objetivo do projeto é **substituir o controle manual por senhas de papel**, oferecendo uma solução digital simples, eficiente e acessível para organizar o atendimento de mesas e retiradas. A proposta reduz filas físicas, retrabalho da equipe e incertezas para os clientes, melhorando a experiência geral no atendimento.

O sistema foi idealizado a partir de um **problema real de operação**, considerando limitações físicas do restaurante, regras específicas de atendimento prioritário e a necessidade de separar corretamente diferentes fluxos de clientes.

---

## Problema Identificado

Em restaurantes com grande movimento, são comuns os seguintes desafios:

- Distribuição manual de senhas em papel;
- Falta de controle preciso da ocupação das mesas;
- Crianças não contabilizadas corretamente na lotação;
- Atendimento prioritário sem regras claras de capacidade;
- Clientes perguntando constantemente sobre tempo de espera;
- Caixa distante da entrada, dificultando a comunicação;
- Confusão entre fila de mesas e pedidos para retirada.

Esses fatores impactam diretamente a **organização operacional** e a **experiência do cliente**.

---

## Proposta de Solução

O **Senha_online** propõe um sistema de fila digital segmentado por tipo de atendimento, com atualização em tempo real e acesso tanto para a equipe quanto para os clientes.

A solução contempla:

- Geração de senhas digitais por tipo de atendimento;
- Registro obrigatório da quantidade de adultos e crianças;
- Regras claras para atendimento prioritário;
- Painel público de chamadas em tempo real;
- Acompanhamento da fila pelo próprio cliente via celular (QR Code);
- Separação entre fila de mesas e fila de retirada;
- Reset diário automático da operação.

Tudo isso com uma arquitetura leve, escalável e de baixo custo.

---

## Tipos de Atendimento Suportados

- **Mesa – Normal**
- **Mesa – Prioridade**
  - Limitado a até 6 pessoas por mesa (crianças inclusas)
  - Capacidade física restrita a 2 mesas
- **Retirada**
  - Pedido realizado no local
  - Cliente aguarda apenas a chamada para buscar

Cada tipo de atendimento possui sua própria fila e controle independente.

---

## Principais Funcionalidades

- Criação de senha digital com identificação única
- Contagem automática de pessoas (adultos + crianças)
- Validações de regras de negócio no momento da geração da senha
- Chamada automática ou manual da próxima senha
- Painel público com “Agora chamando”
- Tela de acompanhamento para o cliente
- Cancelamento e finalização de atendimentos
- Reset diário da fila
- Estrutura preparada para estimativa de tempo e relatórios

---

## Público-Alvo

- Restaurantes de pequeno e médio porte
- Estabelecimentos com fila presencial
- Ambientes com atendimento prioritário
- Operações que buscam organização sem alto custo de infraestrutura

---

## Status do Projeto

🚧 **Em desenvolvimento**

Este repositório representa a construção incremental do sistema, seguindo boas práticas de engenharia de software, organização por backlog, evolução por sprints e foco em regras reais de negócio.

---

## Roadmap (Alto Nível)

- MVP funcional (fila, painel e acompanhamento do cliente)
- Estimativa de tempo de espera
- Relatórios operacionais
- Controle avançado de prioridade
- Notificações para clientes
- Autenticação e perfis de acesso

---

## Modelagem e Documentação

A modelagem de dados do sistema foi realizada em **PostgreSQL**, com foco na definição clara das entidades, relacionamentos e regras de integridade.  
O diagrama ER foi gerado a partir do banco utilizando o **DBeaver**.

📂 Documentação completa disponível em:
/docs/modelagem


**Principais entidades:**
- `queue_state`
- `tickets`

**Regras contempladas:**
- Numeração por dia
- Atendimento prioritário
- Estados do ticket (WAITING, CALLED, DONE, CANCELED)

---

## Observação

Este projeto é desenvolvido inicialmente em ambiente privado, com fins de **estudo, portfólio e validação prática em um restaurante real**.


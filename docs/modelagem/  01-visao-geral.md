# Visão geral — Sistema de Senhas

Este projeto implementa um sistema de geração e chamada de senhas para atendimento,
com controle por dia e suporte a diferentes tipos de senha (ex.: normal e prioritária).

## Atores
- **Atendente**: gera senhas e chama o próximo atendimento.
- **Cliente/Usuário**: acompanha a senha atual e a ordem de chamada.
- **Administrador (opcional)**: configurações e reset diário (se aplicável).

## Objetivo da modelagem
A modelagem foi construída para:
- manter **integridade** da numeração (evitar duplicidade);
- permitir **controle diário** (reset por dia);
- registrar **histórico** de atendimento por ticket (status/tempo).

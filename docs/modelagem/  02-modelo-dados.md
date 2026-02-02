# Modelo de Dados

O modelo foi implementado em **PostgreSQL** via SQL e o diagrama ER foi gerado no **DBeaver**
a partir do esquema criado no banco.

## Diagrama ER
![DER - Sistema de Senhas](./der-modelagem-senhas.png)

## Entidades

### queue_state
Representa o estado da fila em um determinado dia (1 registro por `day_key`).

Campos principais:
- `day_key` (**PK**): data do dia (chave da fila diária)
- `last_normal`: último número emitido para senhas normais
- `last_priority`: último número emitido para senhas prioritárias
- `last_pickup`: último número emitido para retirada (se aplicável)
- `updated_at`: controle de atualização do estado

### tickets
Representa uma senha gerada.

Campos principais:
- `id` (**PK**): identificador do ticket (UUID)
- `day_key` (**FK** → `queue_state.day_key`): associa o ticket ao dia
- `type`: tipo do ticket (NORMAL | PRIORITY | PICKUP)
- `number`: numeração sequencial por tipo e por dia
- `code`: código exibido (ex.: N001, P002)
- `status`: estado do ticket (WAITING | CALLED | DONE | CANCELED)
- `created_at`: data/hora de criação

## Regras de integridade (constraints/índices)
- **Unicidade por dia + tipo + número**: impede duplicação de numeração.
- **Unicidade por dia + code**: impede duplicação de código exibido.
- `number > 0`: validação básica de integridade.

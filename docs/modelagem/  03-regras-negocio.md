# Regras de Negócio — Sistema de Senhas

## Numeração por dia
- A fila é segmentada por dia (`day_key`).
- Ao mudar o dia, a numeração reinicia com base em um novo `queue_state`.

## Prioridade
- Em chamadas, **PRIORITY** deve ser atendida antes de **NORMAL** (quando houver tickets em espera).

## Estados do Ticket
Fluxo padrão:
- `WAITING` → `CALLED` → `DONE`
Alternativas:
- `WAITING` → `CANCELED` (caso cancelado/expirado)

## Integridade
- Não podem existir dois tickets com o mesmo `number` para o mesmo `day_key` e `type`.
- O `code` deve refletir `type` + `number` (ex.: NORMAL 1 = N001).

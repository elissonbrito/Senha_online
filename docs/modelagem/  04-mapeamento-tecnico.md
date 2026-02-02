# Mapeamento técnico (implementação)

## Por que modelar em PostgreSQL
A modelagem relacional foi usada para explicitar entidades, relacionamentos e regras
de integridade, facilitando documentação e comunicação técnica.

## Como aplicar na implementação (exemplo)
- Persistência pode ser feita em banco relacional (PostgreSQL) **ou**
  em banco NoSQL (ex.: Firestore), mantendo as regras no serviço de negócio.

### Caso use Firestore (exemplo conceitual)
- `queue_state` → `queueState/{dayKey}`
- `tickets` → `tickets/{ticketId}` com `dayKey`, `type`, `number`, `status`, etc.

Pontos importantes:
- geração de senha deve ser **atômica** (transaction) para evitar duplicidade;
- atualização do painel pode usar **listeners** (tempo real).

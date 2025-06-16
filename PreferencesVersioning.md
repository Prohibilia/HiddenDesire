# Preferences Versioning: Gestione Storica delle 7 Dimensioni

## Obiettivo
Consentire all'app di:
- Modificare le 7 dimensioni su una sola riga finché l'utente resta nella pagina delle preferenze.
- Usare il set di dimensioni "corrente" quando si entra in chat.
- Creare una nuova riga di preferenze ogni volta che l'utente torna a modificare le 7 dimensioni dopo una sessione di chat, così da mantenere una cronologia delle preferenze usate per ogni sessione.

---

## Flusso Funzionale

### 1. **Entrata nella pagina delle 7 dimensioni**
- L'app cerca la riga più recente (`ORDER BY created_at DESC LIMIT 1`) per l'utente loggato nella tabella `dimensions7`.
- Se esiste, quella riga diventa la "sessione di preferenze corrente".
- Se non esiste, viene creata una nuova riga (INSERT) e quella diventa la sessione corrente.

### 2. **Modifica delle dimensioni**
- Finché l'utente resta nella pagina delle 7 dimensioni, ogni modifica aggiorna (UPDATE) la riga corrente.
- L'`id` della riga corrente viene mantenuto nello stato React.

### 3. **Entrata in chat**
- La chat utilizza i valori della riga corrente delle preferenze.
- L'ID della riga delle preferenze usate può essere salvato nella sessione di chat per "storico".

### 4. **Nuova sessione di preferenze**
- Se l'utente torna a modificare le 7 dimensioni dopo la chat (o dopo aver lasciato la pagina), viene creata una nuova riga (INSERT) nella tabella `dimensions7`.
- Le modifiche successive aggiornano solo questa nuova riga.

---

## Schema Tabella `dimensions7` (esempio)

| id (PK) | user_id (FK) | dimension_1 ... dimension_7 | created_at (timestamp) |
|---------|--------------|-----------------------------|-----------------------|

- **Nessun vincolo UNIQUE su `user_id`**: ogni utente può avere più righe (versioni delle preferenze).
- **`created_at`** serve per ordinare e trovare la versione più recente.

---

## Query Utili

### Trovare la riga corrente:
```sql
SELECT * FROM dimensions7 WHERE user_id = '...' ORDER BY created_at DESC LIMIT 1;
```

### Aggiornare la riga corrente:
```sql
UPDATE dimensions7 SET dimension_1 = ..., ... WHERE id = ...;
```

### Creare una nuova riga (nuova versione):
```sql
INSERT INTO dimensions7 (user_id, dimension_1, ..., created_at) VALUES (..., ..., NOW());
```

---

## Vantaggi di questo approccio
- **Storico delle preferenze**: puoi vedere quali preferenze erano attive in ogni sessione di chat.
- **Flessibilità**: puoi implementare funzioni di "ripristina preferenze" o analisi delle evoluzioni delle preferenze dell'utente.
- **Semplicità di implementazione**: nessun vincolo UNIQUE, solo gestione dello stato della "riga corrente" lato frontend.

---

## Possibili Estensioni
- Associare ogni sessione di chat all'ID della riga delle preferenze usate.
- Visualizzare la cronologia delle preferenze e permettere all'utente di "riattivare" una versione precedente.
- Analisi statistiche sull'evoluzione delle preferenze nel tempo.

---

**Autore:**
AI Assistant per HiddenDesire
Giugno 2024 
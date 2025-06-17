# Preferences Versioning: Gestione Storica delle 7 Dimensioni

## Obiettivo
Consentire all'app di:
- Modificare le 7 dimensioni su un set identificato da un "indice di setting" (`setting_index`) finché l'utente resta nella pagina delle preferenze.
- Usare il set di dimensioni "corrente" (identificato da `setting_index`) quando si entra in chat.
- Creare una nuova riga di preferenze (nuovo `setting_index`) ogni volta che l'utente torna a modificare le 7 dimensioni dopo una sessione di chat, così da mantenere una cronologia delle preferenze usate per ogni sessione.
- Associare ogni sessione di chat al set di preferenze attivo in quel momento tramite `setting_index`.

---

## Flusso Funzionale

### 1. **Entrata nella pagina delle 7 dimensioni**
- L'app cerca il set di preferenze "corrente" per l'utente loggato nella tabella `dimensions7` (ad esempio, il set con il `setting_index` più alto o uno specifico selezionato).
- Se esiste, quel set diventa la "sessione di preferenze corrente".
- Se non esiste, viene creato un nuovo set (INSERT con nuovo `setting_index`) e quello diventa la sessione corrente.

### 2. **Modifica delle dimensioni**
- Finché l'utente resta nella pagina delle 7 dimensioni, ogni modifica aggiorna (UPDATE) la riga corrente (`user_id`, `setting_index`).
- L'`id` e il `setting_index` della riga corrente vengono mantenuti nello stato React.

### 3. **Entrata in chat**
- La chat utilizza i valori del set di preferenze corrente (`user_id`, `setting_index`).
- L'ID della sessione di chat viene associato al `setting_index` usato, così da poter ricostruire il "mood" di ogni sessione.

### 4. **Nuova sessione di preferenze**
- Se l'utente torna a modificare le 7 dimensioni dopo la chat (o dopo aver lasciato la pagina), viene creato un nuovo set (INSERT con nuovo `setting_index`) nella tabella `dimensions7`.
- Le modifiche successive aggiornano solo questa nuova riga.

---

## Schema Tabella `dimensions7` (esempio)

| id (PK) | user_id (FK) | setting_index | dimension_1 ... dimension_7 | created_at (timestamp) |
|---------|--------------|--------------|-----------------------------|-----------------------|

- **Vincolo UNIQUE su (`user_id`, `setting_index`)**: ogni utente può avere più set/versioni di preferenze.
- **`created_at`** serve per ordinare e trovare la versione più recente.
- **`setting_index`** può essere un numero progressivo, un UUID o un nome scelto dall'utente.

---

## Query Utili

### Trovare il set corrente:
```sql
SELECT * FROM dimensions7 WHERE user_id = '...' ORDER BY setting_index DESC LIMIT 1;
```

### Aggiornare il set corrente:
```sql
UPDATE dimensions7 SET dimension_1 = ..., ... WHERE user_id = '...' AND setting_index = ...;
```

### Creare un nuovo set (nuova versione):
```sql
INSERT INTO dimensions7 (user_id, setting_index, dimension_1, ..., created_at) VALUES (..., ..., ..., NOW());
```

---

## Relazione con la chat
- Ogni sessione di chat deve salvare anche il `setting_index` (o `set_id`) delle preferenze usate.
- In questo modo, puoi ricostruire la storia delle chat e sapere in che "mood" (preferenze) era l'utente in ogni sessione.

Esempio tabella `chat_sessions`:
| id (PK) | user_id | setting_index | ... |

---

## Vantaggi di questo approccio
- **Storico delle preferenze**: puoi vedere quali preferenze erano attive in ogni sessione di chat.
- **Flessibilità**: puoi implementare funzioni di "ripristina preferenze" o analisi delle evoluzioni delle preferenze dell'utente.
- **Semplicità di implementazione**: nessun vincolo UNIQUE solo su user_id, ma su (user_id, setting_index), e gestione dello stato della "riga corrente" lato frontend.
- **Collegamento tra chat e preferenze**: ogni chat è associata a un set di preferenze specifico.

---

## Possibili Estensioni
- Permettere all'utente di nominare i set di preferenze (es: "Mood romantico", "Mood trasgressivo").
- Visualizzare la cronologia delle preferenze e permettere all'utente di "riattivare" una versione precedente.
- Analisi statistiche sull'evoluzione delle preferenze nel tempo.
- Riprendere una chat con lo stesso set di preferenze di una sessione passata.

---

**Autore:**
AI Assistant per HiddenDesire
Giugno 2024 
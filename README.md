# OnsetTypescriptMariaDB
Onset MariaDB definitions and api in typescript

## Installation
```
npm install @onfire-network/onset-typescript-mariadb --save
```

## Example
```typescript
let conn = new MariaDB.Connection("localhost", "myuser", "changeme123", "mydatabase");
conn.query("SELECT * FROM players;", result => {
    while(result.next()){
        AddPlayerChatAll(result.getString("username"));
    }
});
conn.close();
```

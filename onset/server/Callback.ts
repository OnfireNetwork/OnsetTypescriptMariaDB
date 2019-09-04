namespace MariaDB {
    export interface Callback {
        onResult(result: MariaDB.ResultSet): void;
    }
}
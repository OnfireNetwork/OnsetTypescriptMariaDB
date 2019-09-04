namespace MariaDB {
    export class Connection {
        private id: number;
        constructor(host: string, username: string, password: string, database: string){
            this.id = mariadb_connect(host, username, password, database);
        }
        public getId(): number {
            return this.id;
        }
        public query(query: string, callback: (result: MariaDB.ResultSet) => void, ...values: any[]): void {
            mariadb_query(this.id, mariadb_prepare(this.id, query, values), () => {
                let result = new MariaDB.ResultSet(this);
                callback(result);
                result.close();
            });
        }
        public queryAsync(query: string, callback: (result: MariaDB.ResultSet) => void, ...values: any[]): void {
            mariadb_async_query(this.id, mariadb_prepare(this.id, query, values), () => {
                let result = new MariaDB.ResultSet(this);
                callback(result);
                result.close();
            });
        }
        public querySync(query: string, ...values: any[]): MariaDB.ResultSet {
            let resultId = mariadb_await_query(this.id, mariadb_prepare(this.id, query, values));
            return new MariaDB.ResultSet(this, resultId);
        }
        public getCharset(): string {
            return mariadb_get_charset(this.id);
        }
        public setCharset(charset: string): void {
            mariadb_set_charset(this.id, charset);
        }
        public getLastError(): MariaDB.Error {
            return new MariaDB.Error(mariadb_errno(this.id), mariadb_error(this.id));
        }
        public close(): void {
            mariadb_close(this.id);
        }
    }
}
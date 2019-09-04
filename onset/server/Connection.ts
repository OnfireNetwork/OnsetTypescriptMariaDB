namespace MariaDB {
    export class Connection {
        private id: number;
        constructor(host: string, username: string, password: string, database: string){
            this.id = mariadb_connect(host, username, password, database);
        }
        public getId(): number {
            return this.id;
        }
        public query(query: string, callback: MariaDB.Callback, ...values: any[]): void {
            mariadb_query(this.id, mariadb_prepare(this.id, query, values), (resultId: number) => {
                callback.onResult(new MariaDB.ResultSet(this, resultId));
            });
        }
        public queryAsync(query: string, callback: MariaDB.Callback, ...values: any[]): void {
            mariadb_async_query(this.id, mariadb_prepare(this.id, query, values), (resultId: number) => {
                callback.onResult(new MariaDB.ResultSet(this, resultId));
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
        public close(): void {
            mariadb_close(this.id);
        }
    }
}
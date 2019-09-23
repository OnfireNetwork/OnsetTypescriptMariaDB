namespace MariaDB {
    export class Connection {
        private id: number;
        constructor(host: string, username: string, password: string, database: string){
            this.id = mariadb_connect(host, username, password, database);
        }
        public getId(): number {
            return this.id;
        }
        public query(query: string, callback: (result: MariaDB.ResultSet) => void, values: any[]): void {
            mariadb_query(this.id, this.prepare(query, values), () => {
                let result = new MariaDB.ResultSet(this);
                callback(result);
                result.close();
            });
        }
        public queryAsync(query: string, callback: (result: MariaDB.ResultSet) => void, values: any[]): void {
            mariadb_async_query(this.id, this.prepare(query, values), () => {
                let result = new MariaDB.ResultSet(this);
                callback(result);
                result.close();
            });
        }
        public querySync(query: string, values: any[]): MariaDB.ResultSet {
            let resultId = mariadb_await_query(this.id, this.prepare(query, values));
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
        private prepare(query: string, values: any[]): string {
            if(values.length > 20){
                print("Error! Queries with more than 20 params can't be executed!");
                print("[ "+query+" ]");
                return ";";
            }
            switch(values.length){
                case 0:
                    return mariadb_prepare(this.id, query);
                case 1:
                    return mariadb_prepare(this.id, query, values[0]);
                case 2:
                    return mariadb_prepare(this.id, query, values[0], values[1]);
                case 3:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2]);
                case 4:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3]);
                case 5:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4]);
                case 6:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5]);
                case 7:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6]);
                case 8:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]);
                case 9:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8]);
                case 10:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9]);
                case 11:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10]);
                case 12:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11]);
                case 13:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12]);
                case 14:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13]);
                case 15:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14]);
                case 16:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15]);
                case 17:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[13]);
                case 18:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16], values[17]);    
                case 19:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16], values[17], values[18]);
                default:
                    return mariadb_prepare(this.id, query, values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], values[8], values[9], values[10], values[11], values[12], values[13], values[14], values[15], values[16], values[17], values[18], values[19]);
            }
        }
    }
}
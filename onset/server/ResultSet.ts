namespace MariaDB {
    export class ResultSet {
        private currentRow = 0;
        private rowCount: number;
        private insertId: number;
        constructor(private connection: MariaDB.Connection, private id: number){
            mariadb_set_active_result(id);
            this.rowCount = mariadb_get_row_count();
            this.insertId = mariadb_get_insert_id(this.connection.getId());
        }
        public getConnection(): MariaDB.Connection {
            return this.connection;
        }
        public next(): boolean {
            if(this.currentRow >= this.rowCount){
                return false;
            }
            this.currentRow++;
            return true;
        }
        public getString(column: number|string): string {
            mariadb_set_active_result(this.id);
            if(typeof column === 'string'){
                return mariadb_get_value_name(this.currentRow, column);
            }else{
                return mariadb_get_value_index(this.currentRow, column);
            }
        }
        public getInt(column: number|string): number {
            mariadb_set_active_result(this.id);
            if(typeof column === 'string'){
                return mariadb_get_value_name_int(this.currentRow, column);
            }else{
                return mariadb_get_value_index_int(this.currentRow, column);
            }
        }
        public getFloat(column: number|string): number {
            mariadb_set_active_result(this.id);
            if(typeof column === 'string'){
                return mariadb_get_value_name_float(this.currentRow, column);
            }else{
                return mariadb_get_value_index_float(this.currentRow, column);
            }
        }
        public getRowCount(): number {
            return this.rowCount;
        }
        public getColumnCount(): number {
            mariadb_set_active_result(this.id);
            return mariadb_get_field_count();
        }
        public getAffectedRows(): number {
            mariadb_set_active_result(this.id);
            return mariadb_get_affected_rows();
        }
        public getInsertId(): number {
            return this.insertId;
        }
        public getColumnName(index: number): string {
            mariadb_set_active_result(this.id);
            return mariadb_get_field_name(index);
        }
        public close(): void {
            mariadb_delete_result(this.id);
        }
    }
}
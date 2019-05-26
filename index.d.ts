import * as mysql from 'mysql';

export function createConnection(connectionUri: string | mysql.ConnectionConfig): Promise<Connection>;

export function createPool(config: mysql.PoolConfig | string): Pool;

export { Types, escape, escapeId, format, ConnectionOptions, ConnectionConfig, PoolConfig } from 'mysql';

export interface QueryFunction<T> {
    (query: mysql.Query | string | mysql.QueryOptions): T;

    (options: string, values: any): T;
}

export interface Connection {
    query: QueryFunction<Promise<any>>;

    beginTransaction(options?: mysql.QueryOptions): Promise<void>;

    commit(options?: mysql.QueryOptions): Promise<void>;

    rollback(options?: mysql.QueryOptions): Promise<void>;

    changeUser(options?: mysql.ConnectionOptions): Promise<void>;

    ping(options?: mysql.QueryOptions): Promise<void>;

    queryStream: QueryFunction<mysql.Query>

    statistics(options?: mysql.QueryOptions): Promise<void>;

    end(options?: mysql.QueryOptions): Promise<void>;

    destroy(): void;

    pause(): void;

    resume(): void;

    escape(value: any, stringifyObjects?: boolean, timeZone?: string): string;

    escapeId(value: string, forbidQualified?: boolean): string;

    format(sql: string, values: any[], stringifyObjects?: boolean, timeZone?: string): string;
}

export interface PoolConnection extends Connection {
    release(): any;

    destroy(): any;
}

export interface Pool {
    getConnection(): Promise<PoolConnection>;

    releaseConnection(connection: PoolConnection): void;

    query: QueryFunction<Promise<any>>;

    end(options?: mysql.QueryOptions): Promise<void>;

    release(options?: mysql.QueryOptions): Promise<void>;

    escape(value: any, stringifyObjects?: boolean, timeZone?: string): string;

    escapeId(value: string, forbidQualified?: boolean): string;

    on(ev: 'connection' | 'acquire' | 'release', callback: (connection: mysql.PoolConnection) => void): mysql.Pool;

    on(ev: 'error', callback: (err: mysql.MysqlError) => void): mysql.Pool;

    on(ev: 'enqueue', callback: (err?: mysql.MysqlError) => void): mysql.Pool;

    on(ev: string, callback: (...args: any[]) => void): mysql.Pool;
}

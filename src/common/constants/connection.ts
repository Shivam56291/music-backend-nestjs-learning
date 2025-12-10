export const connection: Connection = {
  CONNECTION_STRING: 'POSTGRES://postgres:postgres@localhost:5432',
  DB: 'POSTGRES',
  DBNAME: 'spotifyclone',
};

export type Connection = {
  CONNECTION_STRING: string;
  DB: string;
  DBNAME: string;
};

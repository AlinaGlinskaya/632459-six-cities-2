import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string | null;
}

export const configSchema = convict({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    default: 9000,
    env: 'PORT'
  },
  DB_HOST: {
    doc: 'IP address of the database server (Mongo DB)',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_HOST'
  },
  SALT: {
    doc: 'Salt for passwod hash',
    format: String,
    default: null,
    env: 'SALT'
  }
});

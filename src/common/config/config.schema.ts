import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type ConfigSchema = {
  PORT: number;
  DB_HOST: string;
  SALT: string;
  DB_USER: string,
  DB_PASSWORD: string,
  DB_PORT: number,
  DB_NAME: string,
  UPLOAD_DIRECTORY: string,
  JWT_SECRET: string
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
    default: '',
    env: 'SALT'
  },
  DB_USER: {
    doc: 'Username to connect to the database (MongoDB)',
    format: String,
    default: '',
    env: 'DB_USER'
  },
  DB_PASSWORD: {
    doc: 'Password to connect to the database (MongoDB)',
    format: String,
    default: '',
    env: 'DB_PASSWORD'
  },
  DB_PORT: {
    doc: 'Database port (MongoDB)',
    format: Number,
    default: 27017,
    env: 'DB_PORT'
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    default: 'six-cities',
    env: 'DB_NAME'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    default: '',
    env: 'UPLOAD_DIRECTORY'
  },
  JWT_SECRET: {
    doc: 'Secret for sing JWT',
    format: String,
    default: '',
    env: 'JWT_SECRET'
  }
});

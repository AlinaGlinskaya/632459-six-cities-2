import { FileWriterInterface } from './file-writer.interface.js';
import { createWriteStream, WriteStream } from 'fs';

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      encoding: 'utf-8',
      autoClose: true,
      highWaterMark: 2 ** 16,
      flags: 'w'
    });
  }

  public write(row: string): Promise<void> {
    if (!this.stream.write(`${row}\n`)) {
      return new Promise((resolve) => {
        this.stream.once('drain', () => resolve());
      });
    }

    return Promise.resolve();
  }
}

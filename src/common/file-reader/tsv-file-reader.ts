import { createReadStream } from 'fs';
import { EventEmitter } from 'events';
import { FileReader } from './file-reader.interface.js';

const HIGHWATERMARK = 16384; //16KB

export default class TSVFileReader extends EventEmitter implements FileReader {
  constructor(public filename: string) {
    super();
  }

  public async read(): Promise<void> {
    const stream = createReadStream(this.filename, {encoding: 'utf-8', highWaterMark: HIGHWATERMARK});

    let lineRead = '';
    let endLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of stream) {
      lineRead += chunk.toString();

      while ((endLinePosition = lineRead.indexOf('\n')) >= 0) {
        const completedRow = lineRead.slice(0, ++endLinePosition);
        lineRead = lineRead.slice(++endLinePosition);
        importedRowCount++;

        this.emit('lineCompleted', completedRow);
      }

      this.emit('end', importedRowCount);
    }
  }
}

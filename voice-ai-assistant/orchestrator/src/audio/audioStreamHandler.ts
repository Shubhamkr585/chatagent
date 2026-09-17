export class AudioStreamHandler {
  appendChunk(_chunk: Buffer): void {
    // Buffer streaming logic placeholder.
  }

  flush(): Buffer {
    return Buffer.from("");
  }
}

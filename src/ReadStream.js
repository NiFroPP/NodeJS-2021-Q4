const { Readable } = require("stream");
const fs = require("fs");

class ReadStream extends Readable {
  constructor(filePath) {
    super();
    this.filePath = filePath;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.filePath, (error, fd) => {
      if (error) {
        callback(error);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(n) {
    const buffer = Buffer.alloc(n);
    fs.read(this.fd, buffer, 0, n, null, (error, bytesRead) => {
      if (error) {
        this.destroy(error);
      } else {
        this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, err => callback(err || error));
    } else {
      callback(error);
    }
  }
}

module.exports = ReadStream;

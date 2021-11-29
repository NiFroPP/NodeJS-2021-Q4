const { Writable } = require("stream");
const fs = require("fs");

class WriteStream extends Writable {
  constructor(filePath, flag) {
    super();
    this.filePath = filePath;
    this.flag = flag;
  }

  _construct(callback, flag) {
    fs.open(this.filePath, this.flag, (error, fd) => {
      if (error) {
        callback(error);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(error, callback) {
    if (this.fd) {
      fs.close(this.fd, err => callback(err || error));
    } else {
      callback(error);
    }
  }
}

module.exports = WriteStream;

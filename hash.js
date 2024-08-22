const crypto = require('crypto');
const fs = require('fs');

function calculateHash(filePath) {
  return new Promise((resolve, reject) => {
    const hash = crypto.createHash("sha256");
    const input = fs.createReadStream(filePath);

    input.on("error", (err) => {
      reject(err);
    });

    hash.setEncoding("hex");

    input.pipe(hash);

    input.on("end", () => {
      hash.end();
      resolve(hash.read());
    });
  });
}

// File path to dfd.jpg in the uploads folder within fyp_project
const filePath = 'uploads/dfd.jpg';

calculateHash(filePath)
  .then(hash => {
    console.log('File hash:', hash);
  })
  .catch(err => {
    console.error('Error calculating hash:', err);
  });
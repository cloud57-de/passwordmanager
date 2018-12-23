import scrypt from 'scrypt-js';
import {Buffer} from 'buffer';
import aesjs from 'aes-js';


let encrypt = function (userpwd, content) {
    return new Promise((resolve, reject) => {
        
        var password = Buffer.from(userpwd.normalize('NFKC'));
        var salt = Buffer.from("ashfdaszuaaskldhfk".normalize('NFKC'));

        var N = 1024, r = 8, p = 1;
        var dkLen = 32;

        scrypt(password, salt, N, r, p, dkLen, function (error, progress, key) {
            if (error) {
                reject(error);
            } else if (key) {
                var textBytes = aesjs.utils.utf8.toBytes(content);

                // The counter is optional, and if omitted will begin at 1
                var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                var encryptedBytes = aesCtr.encrypt(textBytes);

                // To print or store the binary data, you may convert it to hex
                var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
                resolve(encryptedHex);

            }
        });
    });
}

export { encrypt };

let decrypt = function(userpwd, content) {
    return new Promise((resolve, reject) => {

        var password = Buffer.from(userpwd.normalize('NFKC'));
        var salt = Buffer.from("ashfdaszuaaskldhfk".normalize('NFKC'));
        
        var N = 1024, r = 8, p = 1;
        var dkLen = 32;
        scrypt(password, salt, N, r, p, dkLen, function (error, progress, key) {
            if (error) {
                reject(error);
            } else if (key) {
                var encryptedBytes = aesjs.utils.hex.toBytes(content);
 
                // The counter mode of operation maintains internal state, so to
                // decrypt a new instance must be instantiated.
                var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
                var decryptedBytes = aesCtr.decrypt(encryptedBytes);
                 
                // Convert our bytes back into text
                var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
                resolve(decryptedText);
            }
        });
    });

}

export {decrypt};
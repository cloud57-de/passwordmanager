import { scrypt } from 'scrypt-js';
import { Buffer } from 'buffer';
import aesjs from 'aes-js';

const SALT = Buffer.from("ashfdaszuaaskldhfk".normalize('NFKC'));
const N = 1024, r = 8, p = 1, dkLen = 32;

let encrypt = async function (userpwd, content) {
    var password = Buffer.from(userpwd.normalize('NFKC'));
    var key = await scrypt(password, SALT, N, r, p, dkLen);

    var textBytes = aesjs.utils.utf8.toBytes(content);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);
    return aesjs.utils.hex.fromBytes(encryptedBytes);
}

export { encrypt };

let decrypt = async function(userpwd, content) {
    var password = Buffer.from(userpwd.normalize('NFKC'));
    var key = await scrypt(password, SALT, N, r, p, dkLen);

    var encryptedBytes = aesjs.utils.hex.toBytes(content);
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);
    return aesjs.utils.utf8.fromBytes(decryptedBytes);
}

export { decrypt };

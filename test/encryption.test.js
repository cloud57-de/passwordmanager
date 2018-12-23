import { encrypt, decrypt } from '../src/js/api/encryption';
import regeneratorRuntime from 'regenerator-runtime';

test('Encrypt password', async () => {
    const encryptString = await encrypt("test", "content");
    return expect(decrypt("test", encryptString)).resolves.toBe("content");
});


test('Encrypt password with wrong password', async () => {
    const encryptString = await encrypt("test", "content");
    return expect(decrypt("test1", encryptString)).resolves.not.toBe("content");
});

test('Check if different password generates different strings', async () => {
    const encryptString = await encrypt("test", "content");
    return expect(encrypt("test1", "content")).resolves.not.toBe(encryptString);
});

test('Check if same password generates same strings', async () => {
    const encryptString = await encrypt("test", "content");
    return expect(encrypt("test", "content")).resolves.toBe(encryptString);
});

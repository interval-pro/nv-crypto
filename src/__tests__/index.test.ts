import { encrypt, decrypt } from '../index';

test('encrypt and decrypt message', () => {
    const message = 'Hello, World!';

    for (let i = 0; i < 100; i++) {
        const cryptoNumber = Math.floor(Math.random() * 1000) + 1;
        const encrypted = encrypt(message, cryptoNumber);
        const decrypted = decrypt(encrypted, cryptoNumber);
        expect(decrypted).toBe(message);
    }
});

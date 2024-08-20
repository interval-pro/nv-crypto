# Name Version Cryptography

**nv-crypto** is a simple encryption and decryption library written in TypeScript. It allows you to encrypt and decrypt strings by shifting the characters according to a given number. 

## Features

- Encrypts strings by shifting each vowel or consonant by a specified number.
- Decrypts strings encrypted with the same shift number.
- Preserves the case of each letter during encryption and decryption.
- Non-alphabetic characters are left unchanged.

## Installation

You can install the library using npm:

```bash
npm install nv-crypto
```

## Usage

### Importing the Library

First, import the `encrypt\` and `decrypt` functions from the library:

```typescript
import { encrypt, decrypt } from 'nv-crypto';
```

### Encrypting a Message

To encrypt a message, call the `encrypt` function with the message and a positive number for the shift (cryptoNumber):

```typescript
const message = 'Hello, World!';
const cryptoNumber = 3;
const encryptedMessage = encrypt(message, cryptoNumber);
console.log(encryptedMessage); // Outputs: 'Khoor, Wruog!'
```

### Decrypting a Message

To decrypt an encrypted message, call the `decrypt` function with the encrypted message and the same shift number (cryptoNumber) used during encryption:

```typescript
const decryptedMessage = decrypt(encryptedMessage, cryptoNumber);
console.log(decryptedMessage); // Outputs: 'Hello, World!'
```

## API Reference

### `encrypt(message: string, cryptoNumber: number): string`

- **message**: The string to be encrypted.
- **cryptoNumber**: A positive integer representing the number of positions each letter should be shifted.
- **returns**: The encrypted string.

### `decrypt(message: string, cryptoNumber: number): string`

- **message**: The encrypted string to be decrypted.
- **cryptoNumber**: A positive integer representing the number of positions each letter was shifted during encryption.
- **returns**: The decrypted string, which should match the original message.

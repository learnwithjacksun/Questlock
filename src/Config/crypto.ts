import cryptoJS from 'crypto-js';

const encryptData = (data: string, secretKey: string) => {
    const ciphertext = cryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
    return ciphertext;
};

const decryptData = async (ciphertext: string, secretKey: string) => {
    const bytes = cryptoJS.AES.decrypt(ciphertext, secretKey);
    try {
        const decryptedData = await JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
         return decryptedData
    } catch (error) {
        console.error("Decryption failed:", error);
        return bytes.toString(cryptoJS.enc.Utf8)
    }

};

export { encryptData, decryptData };
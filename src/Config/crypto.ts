import cryptoJS from 'crypto-js';

const SECRET = import.meta.env.VITE_SECRET;

const encryptData = (data: string) => {
    const ciphertext = cryptoJS.AES.encrypt(JSON.stringify(data), SECRET).toString();
    return ciphertext;
};

const decryptData = async (ciphertext: string) => {
    const bytes = cryptoJS.AES.decrypt(ciphertext, SECRET);
    try {
        const decryptedData = await JSON.parse(bytes.toString(cryptoJS.enc.Utf8));
         return decryptedData
    } catch (error) {
        console.error("Decryption failed:", error);
        return bytes.toString(cryptoJS.enc.Utf8)
    }

};

export { encryptData, decryptData };
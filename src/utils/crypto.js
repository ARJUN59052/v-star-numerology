// src/utils/crypto.js - AES-256-GCM Field-Level Encryption & Integrity Verification
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits for GCM
const TAG_LENGTH = 16; // 128 bits auth tag

function getMasterKey() {
  const hexKey = process.env.DB_ENCRYPTION_KEY || 'e7c65b12a849f3e4c8d20915ab739814c3e80912f718294a6b18c935d8e7a021';
  return Buffer.from(hexKey, 'hex');
}

/**
 * Encrypts a plaintext string using AES-256-GCM.
 * Output format: iv:authTag:ciphertext (all in hex)
 */
function encryptPII(plaintext) {
  if (plaintext === null || plaintext === undefined || plaintext === '') return plaintext;
  const key = getMasterKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  
  let encrypted = cipher.update(String(plaintext), 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag().toString('hex');
  
  return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts an AES-256-GCM encrypted string.
 */
function decryptPII(ciphertextEnvelope) {
  if (!ciphertextEnvelope || typeof ciphertextEnvelope !== 'string' || !ciphertextEnvelope.includes(':')) {
    return ciphertextEnvelope; // Return untouched if plaintext or legacy
  }
  
  const [ivHex, tagHex, encryptedHex] = ciphertextEnvelope.split(':');
  if (!ivHex || !tagHex || !encryptedHex) return ciphertextEnvelope;

  const key = getMasterKey();
  const iv = Buffer.from(ivHex, 'hex');
  const authTag = Buffer.from(tagHex, 'hex');
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

module.exports = { encryptPII, decryptPII };

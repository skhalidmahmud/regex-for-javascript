# 🍳 Advanced RegEx Cookbook & Recipes

A specialized collection of enterprise-grade, advanced regular expression recipes designed for complex string parsing, network validation, and security compliance in JavaScript.

---

## 📋 Recipe Index

1. [Network & DevOps](#1-network--devops)
   - [IPv4 Address Validation](#ipv4-address)
   - [IPv6 Address Validation](#ipv6-address)
   - [MAC Address Validation](#mac-address)
2. [E-Commerce & Finance](#2-e-commerce--finance)
   - [Credit Card Detection (By Major Vendor)](#credit-card-detection-by-major-vendor)
   - [Full Currency Amount Matching](#currency-matching-with-optional-cents)
3. [System & Security](#3-system--security)
   - [JSON Web Token (JWT) Format Verification](#json-web-token-jwt-verification)
   - [SemVer (Semantic Versioning) Parsing](#semver-semantic-versioning-parser)
4. [Data & Document Parsing](#4-data--document-parsing)
   - [Robust CSV Line Parser (Handles Quoted Cells)](#robust-csv-line-parser)

---

## 🌐 1. Network & DevOps

### IPv4 Address
Accurately matches numbers from `0.0.0.0` to `255.255.255.255` without allowing numbers like `256` or `999`.
```javascript
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/;
```

### IPv6 Address
Verifies standard 8-group 16-bit hexadecimal IPv6 addresses.
```javascript
const ipv6Regex = /^(?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}$/;
```

### MAC Address
Matches standard IEEE 802 MAC addresses separated by colons or hyphens.
```javascript
const macRegex = /^[a-fA-F0-9]{2}([:-])(?:[a-fA-F0-9]{2}\1){4}[a-fA-F0-9]{2}$/;
```

---

## 💳 2. E-Commerce & Finance

### Credit Card Detection (By Major Vendor)
Identifies card numbers and distinguishes between Visa, Mastercard, American Express, and Discover.

```javascript
function getCardType(cardNumber) {
  const cleanNumber = cardNumber.replace(/\D/g, ''); // strip spaces and dashes

  const patterns = {
    visa: /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/,
    amex: /^3[47][0-9]{13}$/,
    discover: /^6(?:011|5[0-9]{2})[0-9]{12}$/
  };

  for (const [card, regex] of Object.entries(patterns)) {
    if (regex.test(cleanNumber)) return card;
  }
  return 'unknown';
}
```

### Currency Matching (With Optional Cents)
Matches numbers formatted as currency (e.g., `$1,234,567.89`, `100.00`, `50`).
```javascript
const currencyRegex = /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*|\d+)(\.\d{2})?$/;
```

---

## 🔒 3. System & Security

### JSON Web Token (JWT) Verification
Verifies that a string conforms to the 3-part Base64URL encoded JWT structure (`header.payload.signature`).
```javascript
const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/;
```

### SemVer (Semantic Versioning) Parser
Fully compliant with official SemVer 2.0.0 specifications, capturing major, minor, patch, prerelease, and build metadata.
```javascript
const semverRegex = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-(?<prerelease>(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+(?<buildmetadata>[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
```

---

## 📊 4. Data & Document Parsing

### Robust CSV Line Parser
Parses a single line of CSV data correctly handling commas inside double-quoted values (e.g., `101,"Smith, John",New York`).

```javascript
function parseCSVLine(line) {
  const csvRegex = /(?!\s*$)\s*(?:'([^'\\]*(?:\\.[^'\\]*)*)'|"([^"\\]*(?:\\.[^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
  const result = [];
  let match;
  
  while ((match = csvRegex.exec(line)) !== null) {
    // Check which capturing group matched (single quotes, double quotes, or unquoted)
    const value = match[1] || match[2] || match[3] || '';
    result.push(value);
    if (match.index === csvRegex.lastIndex) {
      csvRegex.lastIndex++; // prevent infinite loop on zero-width match
    }
  }
  
  // Remove the trailing empty match from the end of string anchor
  if (result.length > 0 && result[result.length - 1] === '') {
    result.pop();
  }
  return result;
}
```

/**
 * JavaScript Regular Expressions - Comprehensive Practical Examples
 * ----------------------------------------------------------------
 * This file demonstrates real-world use cases of RegEx in JavaScript.
 * You can run this file using Node.js (`node examples.js`) or copy/paste
 * any function directly into your frontend or backend JS projects.
 */

// ================================================================
// 1. INPUT VALIDATION EXAMPLES
// ================================================================

/**
 * Validates an email address against a standard robust regular expression.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validates a North American Phone Number in various common formats.
 * Matches: (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890
 * @param {string} phone
 * @returns {boolean}
 */
function isValidNAPhone(phone) {
  const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Validates strong password security:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 * @param {string} password
 * @returns {boolean}
 */
function isStrongPassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}


// ================================================================
// 2. EXTRACTION & PARSING EXAMPLES
// ================================================================

/**
 * Extracts hashtags from a string of text.
 * @param {string} text
 * @returns {string[]} Array of hashtags without the '#' symbol
 */
function extractHashtags(text) {
  // Matches # followed by word characters, ensuring it's a valid tag
  const matches = text.match(/#(\w+)/g) || [];
  return matches.map(tag => tag.slice(1)); // strip '#'
}

/**
 * Parses a date string (YYYY-MM-DD) using Named Capturing Groups.
 * @param {string} dateString
 * @returns {object|null} { year, month, day } or null if invalid
 */
function parseDateString(dateString) {
  const dateRegex = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;
  const match = dateRegex.exec(dateString);
  if (!match) return null;
  return match.groups; // { year: 'YYYY', month: 'MM', day: 'DD' }
}

/**
 * Extracts query parameters from a URL string into an object.
 * @param {string} url
 * @returns {object} Key-value pairs of query parameters
 */
function getQueryParams(url) {
  const params = {};
  const queryRegex = /[?&](?<key>[^=#]+)=(?<value>[^&#]*)/g;
  let match;
  while ((match = queryRegex.exec(url)) !== null) {
    params[match.groups.key] = decodeURIComponent(match.groups.value);
  }
  return params;
}


// ================================================================
// 3. TEXT REPLACEMENT & FORMATTING EXAMPLES
// ================================================================

/**
 * Converts any title string into a URL-friendly slug.
 * @param {string} title
 * @returns {string}
 */
function createSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-') // Replace spaces/underscores with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}

/**
 * Censors profanity / sensitive keywords from a text string.
 * Uses the RegExp constructor for dynamic keyword matching.
 * @param {string} text
 * @param {string[]} badWords
 * @returns {string} Censored text
 */
function censorWords(text, badWords) {
  if (!badWords.length) return text;
  // Join words with '|' (OR) and create a global case-insensitive regex
  const regex = new RegExp(`\\b(${badWords.join('|')})\\b`, 'gi');
  return text.replace(regex, match => '*'.repeat(match.length));
}

/**
 * Highlights a search query in a text string by wrapping matches in <mark> tags.
 * @param {string} text
 * @param {string} query
 * @returns {string} HTML string with highlighted keywords
 */
function highlightKeyword(text, query) {
  if (!query) return text;
  // Escape special regex characters in query string first
  const escapedQuery = query.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}


// ================================================================
// 4. TEST EXECUTIONS / DEMO OUTPUTS
// ================================================================

console.log("=== 1. Validation Tests ===");
console.log("isValidEmail('khalid@example.com'):", isValidEmail('khalid@example.com')); // true
console.log("isValidNAPhone('(800) 555-0199'):", isValidNAPhone('(800) 555-0199')); // true
console.log("isStrongPassword('SuperS3cr3t!'):", isStrongPassword('SuperS3cr3t!')); // true

console.log("\n=== 2. Extraction Tests ===");
console.log("extractHashtags('Learning #JavaScript #RegEx with #AI'):", extractHashtags('Learning #JavaScript #RegEx with #AI'));
console.log("parseDateString('2026-06-26'):", parseDateString('2026-06-26'));
console.log("getQueryParams('https://example.com?page=1&limit=20&sort=asc'):", getQueryParams('https://example.com?page=1&limit=20&sort=asc'));

console.log("\n=== 3. Replacement Tests ===");
console.log("createSlug('Mastering RegEx in JavaScript (2026 Guide!):'):", createSlug('Mastering RegEx in JavaScript (2026 Guide!):'));
console.log("censorWords('The quick brown fox jumped over the lazy dog', ['fox', 'dog']):", censorWords('The quick brown fox jumped over the lazy dog', ['fox', 'dog']));
console.log("highlightKeyword('Search for JavaScript regex tips', 'JavaScript'):", highlightKeyword('Search for JavaScript regex tips', 'JavaScript'));

# The Ultimate JavaScript Regular Expression (RegEx) Guide: A–Z

Welcome to the comprehensive, step-by-step guide to mastering Regular Expressions in JavaScript. Whether you are validating user input, parsing complex text, or performing advanced find-and-replace operations, this guide covers everything from basic syntax to modern JavaScript regex features.

---

## 📚 Explore the Repository

Beyond this main masterclass guide, explore our specialized companion documents included in this repository:

* 📄 **[Quick Cheat Sheet](regex-cheatsheet.md)** — Fast syntax lookup, flags, and everyday copy-paste snippets.
* 🍳 **[Advanced Recipes](ADVANCED_RECIPES.md)** — Enterprise patterns for Network, E-Commerce, Security, and CSV parsing.
* ⚡ **[Performance & ReDoS Guide](PERFORMANCE_AND_REDOS.md)** — Preventing catastrophic backtracking and optimizing JS execution.
* 🎯 **[Practice Exercises](PRACTICE_EXERCISES.md)** — Interactive real-world challenges (with expandable solutions).
* ❓ **[Frequently Asked Questions (FAQ)](FAQ.md)** — Solutions to common pitfalls like global flag `lastIndex` bugs.
* 💻 **[Code Examples (`examples.js`)](examples.js)** — Fully runnable Node.js/browser utility functions.
* 🤝 **[Contributing Guide](CONTRIBUTING.md)** — How to submit pull requests and contribute to this repository.
* 📜 **[License](LICENSE.md)** — MIT Licensed for free adoption and sharing.

---

## Table of Contents

1. [What is a Regular Expression?](#1-what-is-a-regular-expression)
2. [Creating RegEx in JavaScript](#2-creating-regex-in-javascript)
3. [RegEx Flags (Modifiers)](#3-regex-flags-modifiers)
4. [Essential Syntax & Cheat Sheet](#4-essential-syntax--cheat-sheet)
5. [JavaScript RegEx Methods (The Action API)](#5-javascript-regex-methods-the-action-api)
6. [Step-by-Step: How to Build a RegEx from Scratch](#6-step-by-step-how-to-build-a-regex-from-scratch)
7. [Advanced Concepts (Groups & Lookarounds)](#7-advanced-concepts-groups--lookarounds)
8. [Modern JS RegEx Features (ES2018–ES2024)](#8-modern-js-regex-features-es2018es2024)
9. [Real-World Practical Examples](#9-real-world-practical-examples)
10. [Performance & Best Practices](#10-performance--best-practices)

---

## 1. What is a Regular Expression?

A Regular Expression (RegEx or RegExp) is a sequence of characters that forms a search pattern. When you search for data in a text, you can use this search pattern to describe what you are looking for.

In JavaScript, regular expressions are objects (`RegExp`). They can be used with both `RegExp` methods and `String` methods.

---

## 2. Creating RegEx in JavaScript

There are two ways to create a regular expression in JavaScript:

### Method 1: Regular Expression Literal (Recommended for Static Patterns)
Enclose the pattern between forward slashes `/`. This is evaluated at compile time, providing better performance when the pattern remains constant.

```javascript
const regex = /hello/i; // Matches "hello" case-insensitively
```

### Method 2: The `RegExp` Constructor (Best for Dynamic Patterns)
Use the built-in `RegExp` object constructor. This is essential when you need to construct a regular expression dynamically from variable inputs.

```javascript
const word = "hello";
// Note: When using strings for regex, you must double-escape special characters (e.g., "\\d" instead of "\d")
const regex = new RegExp(word, "i"); 
```

---

## 3. RegEx Flags (Modifiers)

Flags are optional parameters that modify the searching behavior of a regular expression. They are added after the closing slash (e.g., `/pattern/gim`).

| Flag | Name | Description | Example |
| :--- | :--- | :--- | :--- |
| `g` | **Global** | Search for all matches across the entire string, rather than stopping after the first match. | `/foo/g` |
| `i` | **Ignore Case** | Case-insensitive search (matches `foo`, `Foo`, `FOO`). | `/foo/i` |
| `m` | **Multiline** | Anchors `^` and `$` match the start and end of each *line* (separated by `\n`), not just the entire string. | `/^foo/m` |
| `s` | **DotAll** | Allows the dot `.` character to match newline characters (`\n`). | `/foo.bar/s` |
| `u` | **Unicode** | Enables full Unicode support (matching emojis, extended symbols, and `\p{...}`). | `/^\u{1F600}/u` |
| `y` | **Sticky** | Matches only at the exact index indicated by the `lastIndex` property of the regular expression. | `/foo/y` |
| `v` | **Unicode Sets** | (Modern JS) Upgrade to `u` flag. Enables set operations like intersection and difference inside `[...]`. | `/[\p{Script=Greek}--\p{Letter}]/v` |

---

## 4. Essential Syntax & Cheat Sheet

### Character Classes
| Pattern | Meaning | Example |
| :--- | :--- | :--- |
| `.` | Any character except a newline (unless `s` flag is active) | `/c.t/` matches `cat`, `cot`, `c3t` |
| `\d` | Any digit (equivalent to `[0-9]`) | `/\d+/` matches `42`, `2024` |
| `\D` | Any non-digit (`[^0-9]`) | `/\D+/` matches `abc`, `hello!` |
| `\w` | Any word character (alphanumeric & underscore `[a-zA-Z0-9_]`) | `/\w+/` matches `user_123` |
| `\W` | Any non-word character (`[^a-zA-Z0-9_]`) | `/\W+/` matches `!!!`, `@@@` |
| `\s` | Any whitespace character (space, tab, newline) | `/hello\sworld/` |
| `\S` | Any non-whitespace character | `/\S+/` matches any solid word |

### Sets & Ranges
| Pattern | Meaning | Example |
| :--- | :--- | :--- |
| `[abc]` | Matches any one of the characters in the brackets | `/[bcr]at/` matches `bat`, `cat`, `rat` |
| `[^abc]` | Matches any character *not* in the brackets (negated set) | `/[^bc]at/` matches `mat`, `hat`, but not `bat` |
| `[a-z]` | Matches any character in the specified alphabetical range | `/[a-z]/` matches lower case letters |
| `[0-9a-fA-F]` | Multiple ranges combined | Matches valid hexadecimal characters |

### Quantifiers (Specifying Frequency)
| Pattern | Meaning | Example |
| :--- | :--- | :--- |
| `*` | Matches **0 or more** times | `/ab*c/` matches `ac`, `abc`, `abbbc` |
| `+` | Matches **1 or more** times | `/ab+c/` matches `abc`, `abbbc`, but *not* `ac` |
| `?` | Matches **0 or 1** time (optional) | `/colou?r/` matches `color`, `colour` |
| `{n}` | Matches exactly `n` times | `/\d{3}/` matches exactly 3 digits (e.g., `123`) |
| `{n,}` | Matches at least `n` times | `/\d{3,}/` matches 3 or more digits |
| `{n,m}` | Matches between `n` and `m` times | `/\d{2,4}/` matches 2, 3, or 4 digits |
| `+?`, `*?` | **Lazy quantifiers** (matches as *few* characters as possible) | `/<.+?>/` matches `<div>` instead of `<div></div>` |

### Anchors & Boundaries
| Pattern | Meaning | Example |
| :--- | :--- | :--- |
| `^` | Start of string (or start of line with `m` flag) | `/^Hello/` matches `Hello` only at the beginning |
| `$` | End of string (or end of line with `m` flag) | `/world!$/` matches `world!` only at the end |
| `\b` | Word boundary (transition between `\w` and `\W`) | `/\bcat\b/` matches `cat` but not `category` |
| `\B` | Non-word boundary | `/\Bcat\B/` matches `cat` in `ecstatic` |

---

## 5. JavaScript RegEx Methods (The Action API)

JavaScript divides RegEx operations into two main categories: methods on the `RegExp` instance and methods on the `String` instance.

### RegExp Methods

#### 1. `RegExp.prototype.test(str)`
Returns `true` if the string contains a match, otherwise `false`. Best for simple validation.
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(emailRegex.test("test@example.com")); // true
console.log(emailRegex.test("invalid-email")); // false
```

#### 2. `RegExp.prototype.exec(str)`
Returns an array containing match details (including capturing groups, index, and input) or `null` if no match is found. If the `g` flag is used, calling `exec()` repeatedly advances through all matches.
```javascript
const regex = /(\d+)/g;
const text = "Item 1: 100 USD, Item 2: 250 USD";

let match;
while ((match = regex.exec(text)) !== null) {
  console.log(`Found ${match[1]} at index ${match.index}`);
}
// Found 1 at index 5
// Found 100 at index 8
// Found 2 at index 22
// Found 250 at index 25
```

---

### String Methods

#### 1. `String.prototype.match(regexp)`
Returns an array of matches. 
- Without the `g` flag: Returns the first match along with capturing groups (similar to `exec`).
- With the `g` flag: Returns an array of all full matches (capturing groups are ignored).
```javascript
const str = "The rain in SPAIN stays mainly in the plain";
console.log(str.match(/ain/g)); // ['ain', 'ain', 'ain']
```

#### 2. `String.prototype.matchAll(regexp)`
*(Modern JS)* Returns an iterator yielding all match objects including capturing groups. **Requires the `g` flag.**
```javascript
const str = "test1: 10, test2: 20";
const regex = /test(\d): (\d+)/g;

const matches = [...str.matchAll(regex)];
matches.forEach(match => {
  console.log(`Test ID: ${match[1]}, Value: ${match[2]}`);
});
// Test ID: 1, Value: 10
// Test ID: 2, Value: 20
```

#### 3. `String.prototype.replace(regexp, newSubstr | function)`
Replaces matches with a new string or a function return value. Use `g` flag to replace all instances.
```javascript
const str = "Apples are round, and apples are juicy.";
// Replace all "apples" case-insensitively
const newStr = str.replace(/apples/gi, "oranges");
console.log(newStr); // "oranges are round, and oranges are juicy."

// Advanced replacement using a function and capturing groups
const dates = "2024-05-12 and 2025-06-15";
const formatted = dates.replace(/(\d{4})-(\d{2})-(\d{2})/g, (match, year, month, day) => {
  return `${day}/${month}/${year}`;
});
console.log(formatted); // "12/05/2024 and 15/06/2025"
```

#### 4. `String.prototype.replaceAll(regexp, newSubstr | function)`
Behaves identically to `replace`, but enforces that the regular expression must have the `g` flag.

#### 5. `String.prototype.search(regexp)`
Returns the index of the first match in the string, or `-1` if not found. (Similar to `indexOf` but for regex).
```javascript
const str = "Hey, look here!";
console.log(str.search(/look/)); // 5
```

#### 6. `String.prototype.split(regexp)`
Splits a string into an array of substrings using a regular expression as the delimiter.
```javascript
const str = "apple, orange; banana|grape";
const fruits = str.split(/[,;|]\s*/);
console.log(fruits); // ['apple', 'orange', 'banana', 'grape']
```

---

## 6. Step-by-Step: How to Build a RegEx from Scratch

Let's build a regular expression to validate a complex structure: a **North American Phone Number** that might look like:
- `(123) 456-7890`
- `123-456-7890`
- `123.456.7890`
- `1234567890`

### Step 1: Identify the components
1. **Area Code**: 3 digits, optionally enclosed in parentheses.
2. **Separator 1**: Optional space, dash, or dot.
3. **Prefix**: 3 digits.
4. **Separator 2**: Optional space, dash, or dot.
5. **Line Number**: 4 digits.

### Step 2: Build piece by piece

#### Piece 1: The Area Code
- We want 3 digits: `\d{3}`
- Optional parentheses around it: `\(?` and `\)?`
- Result so far: `\(?\d{3}\)?`

#### Piece 2: The First Separator
- Can be a space `\s`, a dash `-`, or a dot `.`.
- Inside a character class: `[\s.-]`
- It's optional (e.g., for `1234567890`), so we add `?`: `[\s.-]?`

#### Piece 3: The Prefix & Second Separator
- 3 digits: `\d{3}`
- Optional separator: `[\s.-]?`

#### Piece 4: The Line Number
- 4 digits: `\d{4}`

### Step 3: Combine and add anchors
To ensure we match the *entire* string and not just a phone number hidden inside random text, we add `^` (start) and `$` (end).

```javascript
const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

console.log(phoneRegex.test("(123) 456-7890")); // true
console.log(phoneRegex.test("123-456-7890"));   // true
console.log(phoneRegex.test("1234567890"));     // true
console.log(phoneRegex.test("999.999.9999"));   // true
console.log(phoneRegex.test("invalid phone"));  // false
```

---

## 7. Advanced Concepts (Groups & Lookarounds)

### 1. Capturing Groups `(...)`
Grouping allows you to apply quantifiers to entire sequences and extracts matched subsections.
```javascript
const str = "ha ha ha";
const regex = /(ha\s*)+/;
```

### 2. Non-Capturing Groups `(?:...)`
Use `(?:...)` when you need to group elements for a quantifier or alternation `|`, but do not want to incur the memory/performance overhead of capturing the match.
```javascript
// Matches "http://" or "https://" but doesn't capture the protocol portion
const urlRegex = /^(?:https?:\/\/)?([\w.-]+)\.([a-z]{2,6})$/i;
```

### 3. Named Capturing Groups `(?<name>...)`
Allows you to assign descriptive names to capturing groups, accessible via `match.groups.name`.
```javascript
const dateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const match = dateRegex.exec("2024-05-12");
console.log(match.groups.year);  // "2024"
console.log(match.groups.month); // "05"
console.log(match.groups.day);   // "12"
```

### 4. Lookarounds (Lookahead & Lookbehind)
Lookarounds allow you to match a pattern only if it is (or isn't) preceded or followed by another pattern, without including the surrounding pattern in the match.

| Pattern | Type | Meaning | Example |
| :--- | :--- | :--- | :--- |
| `(?=...)` | **Positive Lookahead** | Matches if followed by `...` | `/\d+(?= dollars)/` matches `100` in `100 dollars` |
| `(?!...)` | **Negative Lookahead** | Matches if NOT followed by `...` | `/\d+(?! dollars)/` matches `100` in `100 euros` |
| `(?<=...)`| **Positive Lookbehind**| Matches if preceded by `...` | `/(?<=USD )\d+/` matches `50` in `USD 50` |
| `(?<!...)`| **Negative Lookbehind**| Matches if NOT preceded by `...`| `/(?<!USD )\d+/` matches `50` in `EUR 50` |

#### Lookahead Example: Password Strength Validation
Ensure a password is at least 8 characters long, contains at least one letter, one digit, and one special character:
```javascript
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
```

---

## 8. Modern JS RegEx Features (ES2018–ES2024)

### 1. `s` (dotAll) Flag (ES2018)
Traditionally, `.` matches anything except line breaks (`\n`, `\r`). The `s` flag allows `.` to match newlines.
```javascript
const multilineText = `First line
Second line`;
console.log(/First.*Second/s.test(multilineText)); // true
```

### 2. Unicode Property Escapes `\p{...}` (ES2018)
When using the `u` flag, you can match specific Unicode categories, scripts, or properties.
```javascript
const emojiRegex = /\p{Emoji}/u;
console.log(emojiRegex.test("🚀")); // true

const greekRegex = /\p{Script=Greek}/u;
console.log(greekRegex.test("Ω")); // true

const letterRegex = /\p{Letter}/u; // Matches any letter in any language
console.log(letterRegex.test("あ")); // true
```

### 3. Match Indices `d` Flag (ES2022)
Adding the `d` flag to a regular expression tells JavaScript to include the exact start and end indices of every captured group in the `.indices` property of the match object.
```javascript
const regex = /(?<word>hello)/d;
const match = regex.exec("Say hello to the world");
console.log(match.indices[0]); // [4, 9] (Indices of the full match)
console.log(match.indices.groups.word); // [4, 9] (Indices of the named group)
```

### 4. The `v` Flag (Unicode Sets) (ES2024)
The `v` flag is an evolution of the `u` flag. It enables advanced set operations inside character classes `[...]`:
- `&&` for intersection
- `--` for difference / subtraction
- Matching multi-character strings in sets `\q{...}`

```javascript
// Match all Greek letters EXCEPT alpha (α) and beta (β)
const regex = /[\p{Script=Greek}--[αβ]]/v;
console.log(regex.test("γ")); // true
console.log(regex.test("α")); // false
```

---

## 9. Real-World Practical Examples

Here are some highly practical, production-ready regular expressions for JavaScript:

### 1. Email Validator (HTML5 Spec Standard)
```javascript
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
```

### 2. URL Validator (HTTP / HTTPS)
```javascript
const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
```

### 3. Trim Leading & Trailing Whitespace (Custom Implementation)
```javascript
function customTrim(str) {
  return str.replace(/^\s+|\s+$/g, '');
}
```

### 4. Hex Color Validator (`#rgb`, `#rgba`, `#rrggbb`, `#rrggbbaa`)
```javascript
const hexColorRegex = /^#([A-Fa-f0-9]{3,4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/;
```

### 5. Slugify a String (Creating Clean URL Slugs)
```javascript
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove non-word characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with dashes
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing dashes
}
```

---

## 10. Performance & Best Practices

1. **Beware of Catastrophic Backtracking**: Patterns with nested quantifiers like `(a+)+` or `.*.*` can cause the regular expression engine to take exponential time on non-matching strings, freezing the main JavaScript thread (ReDoS vulnerability). Keep quantifiers precise.
2. **Use Lazy Quantifiers Where Appropriate**: `.*?` prevents greedy matching from consuming more text than necessary, particularly when parsing markup or quoted strings.
3. **Prefer `RegExp.prototype.test()` for Simple Checks**: If you only need a boolean `true`/`false`, `test()` is significantly faster than `match()` or `exec()`.
4. **Cache Static Regular Expressions**: Define static regular expressions outside of loops or hot functions to prevent the JavaScript engine from recompiling them repeatedly.
5. **Use `(?:...)` Non-Capturing Groups**: If you don't need to extract the matched group, use non-capturing groups to save memory and execution time.
6. **Leverage Named Groups for Readability**: Using `(?<name>...)` makes your code self-documenting and easier for other developers to maintain.

---

## ✍️ Author

**Md Khalid Mahmud**
* 🌐 **Website**: [https://mdkhalidmahmud.com/](https://mdkhalidmahmud.com/)
* 💼 **GitHub**: [@mdkhalidmahmud](https://github.com/mdkhalidmahmud) *(or your specific GitHub handle)*

If you found this guide helpful, please consider giving the repository a ⭐ on GitHub!
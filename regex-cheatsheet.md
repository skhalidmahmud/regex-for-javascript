# JavaScript Regular Expression (RegEx) Quick Cheat Sheet

A fast, handy reference guide for JavaScript developers to quickly look up RegEx syntax, flags, methods, and common patterns.

---

## 🚀 1. Quick Syntax Overview

### Character Classes
* `.` : Any character except newline (`\n`). (Matches newlines if `s` flag is used).
* `\d` : Digit `[0-9]`.
* `\D` : Non-digit `[^0-9]`.
* `\w` : Word character (Alphanumeric + Underscore `[a-zA-Z0-9_]`).
* `\W` : Non-word character (`[^a-zA-Z0-9_]`).
* `\s` : Whitespace (space, tab, newline).
* `\S` : Non-whitespace.

### Anchors & Boundaries
* `^` : Start of string (or line with `m` flag).
* `$` : End of string (or line with `m` flag).
* `\b` : Word boundary (start/end of a word).
* `\B` : Non-word boundary.

### Quantifiers
* `*` : 0 or more times (Greedy).
* `+` : 1 or more times (Greedy).
* `?` : 0 or 1 time (Greedy).
* `{n}` : Exactly `n` times.
* `{n,}` : At least `n` times.
* `{n,m}` : Between `n` and `m` times.
* `*?`, `+?`, `??`, `{n,m}?` : **Lazy** quantifiers (match as few characters as possible).

### Grouping & Alternation
* `(...)` : Capturing group.
* `(?:...)` : Non-capturing group (better performance if capturing isn't needed).
* `(?<name>...)` : Named capturing group (available in `match.groups.name`).
* `a|b` : Alternation (Matches `a` OR `b`).

### Lookarounds
* `(?=...)` : Positive Lookahead (matches if followed by `...`).
* `(?!...)` : Negative Lookahead (matches if NOT followed by `...`).
* `(?<=...)` : Positive Lookbehind (matches if preceded by `...`).
* `(?<!...)` : Negative Lookbehind (matches if NOT preceded by `...`).

---

## 🚩 2. JavaScript RegEx Flags

| Flag | Meaning | Behavior |
| :--- | :--- | :--- |
| `g` | **Global** | Doesn't return after first match, looks for all matches. |
| `i` | **Ignore Case** | Case-insensitive matching. |
| `m` | **Multiline** | `^` and `$` match start/end of lines, not just string. |
| `s` | **DotAll** | Allows `.` to match newline characters. |
| `u` | **Unicode** | Enables full Unicode support (`\p{Emoji}`, `\u{1F600}`). |
| `y` | **Sticky** | Matches exact index of `regexp.lastIndex`. |
| `d` | **Indices** | (ES2022) Generates match index bounds in `match.indices`. |
| `v` | **Unicode Sets**| (ES2024) Enables set operations (`&&`, `--`) in `[...]`. |

---

## 🛠️ 3. Essential JavaScript Methods

```javascript
const regex = /hello/g;
const str = "hello world, hello universe";

// 1. RegExp.test(str) -> Boolean
regex.test(str); // true

// 2. RegExp.exec(str) -> Array | null
regex.exec(str); // ['hello', index: 0, input: '...']

// 3. String.match(regex) -> Array | null
str.match(regex); // ['hello', 'hello'] (with 'g' flag)

// 4. String.matchAll(regex) -> Iterator
const matches = [...str.matchAll(/hello/g)];

// 5. String.replace(regex, replacement) -> String
str.replace(/hello/g, "hi"); // "hi world, hi universe"

// 6. String.search(regex) -> Integer (index or -1)
str.search(/world/); // 6

// 7. String.split(regex) -> Array
"a,b;c|d".split(/[,;|]/); // ['a', 'b', 'c', 'd']
```

---

## 🌟 4. Ready-to-Use Snippets

### Email Validation
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Strong Password (Min 8 chars, 1 letter, 1 number, 1 special)
```javascript
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
```

### Extract Domain from URL
```javascript
const domainRegex = /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n?]+)/i;
const domain = "https://www.example.com/path".match(domainRegex)[1]; // "example.com"
```

### Match Numbers (Integers and Decimals)
```javascript
const numberRegex = /^-?\d+(?:\.\d+)?$/;
```

### Match HTML Tag Content
```javascript
const tagRegex = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/g;
```

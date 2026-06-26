# ❓ Frequently Asked Questions (FAQ)

A collection of the most common pitfalls, tricky edge cases, and clarifying questions developers encounter when working with Regular Expressions in JavaScript.

---

### 1. Why does my global regex (`/g`) return `false` on the second call to `test()`?

This is one of the most common "gotchas" in JavaScript! When a regular expression has the `g` (global) or `y` (sticky) flag, JavaScript tracks the index of the last match in the `regexp.lastIndex` property.

```javascript
const regex = /hello/g;
console.log(regex.test("hello")); // true (lastIndex becomes 5)
console.log(regex.test("hello")); // false (search starts at index 5, finds nothing, resets lastIndex to 0)
```
**Solution**: If you are reusing a regex instance purely for boolean verification (`test()`), **do not use the `g` flag**, or explicitly reset `regex.lastIndex = 0` before testing.

---

### 2. When should I use `RegExp` methods vs `String` methods?

* **Use `RegExp.prototype.test(str)`** when you only need a boolean `true`/`false` answer (fastest performance).
* **Use `RegExp.prototype.exec(str)`** when you need to iterate through matches one by one in a loop or need full capturing group details without creating a massive array in memory.
* **Use `String.prototype.match(regex)`** when you want a quick array of all matching substrings (with `g` flag).
* **Use `String.prototype.matchAll(regex)`** when you want both all matches AND their associated capturing groups/indices.

---

### 3. Why does `.` (dot) not match newlines?

In regular expression standards, `.` matches any character *except* line terminators (`\n`, `\r`). 
**Solution**: Use the modern ES2018 **`s` (dotAll) flag** to allow `.` to match newlines:
```javascript
const multilineMatch = /hello.world/s.test("hello\nworld"); // true
```

---

### 4. How do I dynamically insert a variable into a regular expression?

You cannot pass a variable directly into a regular expression literal (e.g., `/var/`). You must use the `RegExp` constructor:

```javascript
const keyword = "JavaScript";
const regex = new RegExp(keyword, "i"); // /JavaScript/i
```
**⚠️ Warning**: If your variable contains special regex characters (like `.`, `+`, `?`, `[`), you must escape them first:
```javascript
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
```

---

### 5. What is the difference between `\b` and `\B`?

* `\b` matches a **word boundary**—the invisible position between a word character (`\w`) and a non-word character (`\W` or start/end of string). Example: `/\bcat\b/` matches `"cat"` but not `"category"`.
* `\B` matches a **non-word boundary**—a position inside a word. Example: `/\Bcat\B/` matches `"cat"` inside `"ecstatic"`.

---

### 6. What is the difference between `\p{...}` (Unicode property) and standard character classes?

Traditional classes like `\w` or `[a-zA-Z]` only match ASCII characters (English alphabet). They fail on accented letters, Cyrillic, Arabic, Kanji, or Emojis.

Using `\p{Letter}` with the `u` (unicode) flag correctly matches any human language letter in the world!
```javascript
const letterRegex = /^\p{Letter}+$/u;
console.log(letterRegex.test("déjà")); // true
console.log(letterRegex.test("日本語"));  // true
```

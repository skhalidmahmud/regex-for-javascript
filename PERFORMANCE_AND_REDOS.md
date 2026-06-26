# ⚡ RegEx Performance & ReDoS (Regular Expression Denial of Service)

While Regular Expressions are incredibly powerful, poorly optimized patterns can introduce severe performance bottlenecks and major security vulnerabilities in your JavaScript applications (especially on Node.js backends where the event loop can be blocked).

This guide covers how **Catastrophic Backtracking** happens, what **ReDoS** is, and how to write highly performant, bulletproof regular expressions in JavaScript.

---

## 🛑 1. What is ReDoS?

**ReDoS** stands for **Regular Expression Denial of Service**. It is a vulnerability that occurs when a regular expression takes exponential time (`O(2^n)`) to evaluate a specific crafted input string. 

Because JavaScript in Node.js and browsers runs on a **single-threaded event loop**, a single slow RegEx execution can completely freeze your server or tab, causing a total denial of service for all users.

---

## 💥 2. The Root Cause: Catastrophic Backtracking

JavaScript uses a **Nondeterministic Finite Automaton (NFA)** regex engine. When an NFA engine encounters a quantifier like `*` or `+`, it tries to match as many characters as possible (greedy matching). 

If the rest of the pattern fails to match, the engine **backtracks**, giving up characters one by one to see if an alternative path succeeds.

### An Example of Catastrophic Backtracking
Consider the following seemingly innocent pattern designed to match words separated by optional spaces or punctuation:

```javascript
const vulnerableRegex = /^(a+)+$/;
```

If we pass a string of 30 `a`s followed by an `X` (`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaX`), the engine will:
1. Match all `a`s with the first `a+`.
2. See `X`, which fails to match `$`.
3. Backtrack one `a` and try matching it with the outer `+`.
4. Continue creating permutations of group divisions (`(aaaa)(aaa)`, `(aa)(aa)(a)`, etc.).

For a string of length $N$, the engine evaluates $2^N$ execution paths. For $N=30$, that's over **1 billion** checks, instantly freezing your server.

---

## 🛡️ 3. How to Prevent ReDoS in JavaScript

### 1. Avoid Nested Quantifiers
Never put quantifiers directly inside other quantifiers without clear, mutually exclusive character separation.
* **Vulnerable**: `(a+)+`, `(a*)*`, `([a-zA-Z]+)*`
* **Fix**: Ensure the inner pattern has a required non-repeating separator, e.g., `([a-zA-Z]+[_-]?)*` where the trailing characters cannot overlap.

### 2. Avoid Overlapping Alternate Clauses
When using alternation `|`, ensure the left and right sides cannot match the same characters.
* **Vulnerable**: `.*(a|a?)+.*`
* **Fix**: Separate logic cleanly or remove redundant optional clauses.

### 3. Emulate Atomic Groups in JavaScript
Languages like PCRE/Python have "atomic groups" `(?>...)` which disable backtracking for a specific group. JavaScript does not natively support atomic groups, but you can emulate them using **Positive Lookaheads combined with capturing groups and backreferences**:

```javascript
// Emulating an atomic group in JavaScript: (?=(pattern))\1
const atomicRegex = /^h(?=(a+))\1c$/;
```
Once the lookahead matches `a+`, it locks it in place. The engine cannot backtrack into `a+` if the trailing `c` fails!

---

## 🏎️ 4. Everyday Performance Best Practices

1. **Keep `test()` over `match()`**: If you only need to verify if a string matches, use `RegExp.prototype.test()`. It skips creating match arrays and capturing group allocations.
2. **Pre-compile RegEx**: Define your `const regex = /.../` outside of hot execution paths, functions, and loops.
3. **Limit Input Length First**: Before running a complex regex on user input (like a massive bio or log file), check `if (input.length > 1000) return false;`.
4. **Use Non-Capturing Groups `(?:...)`**: Capturing groups require memory allocation. If you only need grouping for alternation or quantifiers, use `(?:...)`.

---

## 🧪 5. Testing Your RegEx for ReDoS

Before deploying complex regular expressions to production, test them with specialized analysis tools:
- **[safe-regex](https://www.npmjs.com/package/safe-regex)**: An npm package to detect potentially catastrophic exponential time regexes.
- **[Regex101](https://regex101.com/)**: Check the "Debugger" tab on Regex101 to see exactly how many backtracking steps your pattern takes.

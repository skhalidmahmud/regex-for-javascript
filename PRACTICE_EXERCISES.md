# 🎯 RegEx Practice Exercises & Challenges

The best way to truly master Regular Expressions is through active practice. Below is a curated set of real-world challenges ranging from Beginner to Advanced. 

For each exercise, try to write the regular expression on your own before checking the **Solution** toggle!

---

## 🟢 Beginner Level

### Exercise 1: Matching Zip Codes
**Goal**: Write a regular expression to validate a standard US Zip code (exactly 5 digits).
* **Matches**: `12345`, `90210`, `00123`
* **Fails**: `1234`, `123456`, `abcde`, `12 34`

<details>
<summary><b>👉 Click to reveal Solution 1</b></summary>

```javascript
const zipRegex = /^\d{5}$/;

// Explanation:
// ^      : Start of string
// \d{5}  : Exactly 5 digits
// $      : End of string
```
</details>

---

### Exercise 2: Hexadecimal Color Simple Verification
**Goal**: Match a 6-character hex color code starting with `#`.
* **Matches**: `#FFA500`, `#000000`, `#a1c2e3`
* **Fails**: `#FFA50`, `FFA500`, `#xyz123`, `#1234567`

<details>
<summary><b>👉 Click to reveal Solution 2</b></summary>

```javascript
const hexRegex = /^#[a-fA-F0-9]{6}$/;

// Explanation:
// ^               : Start of string
// #               : Literal '#' character
// [a-fA-F0-9]{6}  : Exactly 6 characters from a-f, A-F, or 0-9
// $               : End of string
```
</details>

---

## 🟡 Intermediate Level

### Exercise 3: File Extension Filter
**Goal**: Write a regular expression to match image filenames ending in `.jpg`, `.jpeg`, `.png`, or `.gif` (case-insensitive).
* **Matches**: `banner.jpg`, `icon.PNG`, `avatar.jpeg`, `animation.gif`
* **Fails**: `script.js`, `style.css`, `image.jpg.exe`, `banner_jpg`

<details>
<summary><b>👉 Click to reveal Solution 3</b></summary>

```javascript
const imageExtRegex = /^[\w\-. ]+\.(jpg|jpeg|png|gif)$/i;

// Explanation:
// ^           : Start of string
// [\w\-. ]+   : File name (word characters, dashes, dots, spaces)
// \.          : Literal dot separator
// (jpg|jpeg|png|gif) : Group matching any of the allowed extensions
// $           : End of string
// i           : Ignore case flag
```
</details>

---

### Exercise 4: Validating Time (24-Hour Format)
**Goal**: Match a valid 24-hour time format (`HH:MM`).
* **Matches**: `00:00`, `09:30`, `14:45`, `23:59`
* **Fails**: `24:00`, `29:99`, `12:60`, `9:30` (missing leading zero)

<details>
<summary><b>👉 Click to reveal Solution 4</b></summary>

```javascript
const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

// Explanation:
// ^               : Start of string
// (?:[01]\d|2[0-3]) : Non-capturing group: 0 or 1 followed by any digit (00-19) OR 2 followed by 0-3 (20-23)
// :               : Literal colon
// [0-5]\d         : Minutes from 00 to 59
// $               : End of string
```
</details>

---

## 🔴 Advanced Level

### Exercise 5: Extracting Quoted Text (Escaping Quotes)
**Goal**: Extract text inside double quotes, ensuring you handle escaped double quotes (`\"`) within the string!
* **String**: `She said "Hello, world!" and then "I love \"RegEx\" a lot!"`
* **Target matches**: `Hello, world!` and `I love \"RegEx\" a lot!`

<details>
<summary><b>👉 Click to reveal Solution 5</b></summary>

```javascript
const quoteRegex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;

// Explanation:
// "               : Leading literal double quote
// (               : Capturing group 1 (content inside quotes)
//   [^"\\]*       : 0 or more characters that are NOT quotes or backslashes
//   (?:\\.[^"\\]*)* : Non-capturing group matching an escaped character followed by non-quotes/backslashes
// )               : End capturing group
// "               : Closing literal double quote
```
</details>

---

### Exercise 6: Matching HTML Pairs (Using Backreferences)
**Goal**: Match simple matching HTML open and close tags with content inside.
* **Matches**: `<h1>Title</h1>`, `<div>Hello</div>`, `<p>Paragraph</p>`
* **Fails**: `<h1>Title</div>`, `<p>Paragraph`, `div>Hello</div>`

<details>
<summary><b>👉 Click to reveal Solution 6</b></summary>

```javascript
const htmlRegex = /<([a-zA-Z0-9]+)>.*?<\/\1>/;

// Explanation:
// <([a-zA-Z0-9]+)> : Matches opening tag and captures tag name in Group 1
// .*?              : Lazy match for content inside the tag
// <\/\1>           : Matches closing tag using \1 (backreference to Group 1)
```
</details>

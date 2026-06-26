# Contributing to `regex-for-javascript` 🚀

First off, thank you for considering contributing to `regex-for-javascript`! It's people like you that make the open-source community such a fantastic place to learn, inspire, and create.

Whether you want to add a new regex recipe, improve existing explanations, fix a typo, or add new practice exercises, all contributions are highly welcome!

---

## 📋 Table of Contents

1. [Code of Conduct](#1-code-of-conduct)
2. [How Can I Contribute?](#2-how-can-i-contribute)
   - [Reporting Bugs or Broken RegEx](#reporting-bugs-or-broken-regex)
   - [Suggesting New Features or Recipes](#suggesting-new-features-or-recipes)
   - [Submitting Pull Requests (PRs)](#submitting-pull-requests-prs)
3. [Submission Guidelines](#3-submission-guidelines)
4. [Community & Questions](#4-community--questions)

---

## 📜 1. Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming, inclusive, and harassment-free environment for everyone.

---

## 💡 2. How Can I Contribute?

### Reporting Bugs or Broken RegEx
Regular expressions can have unexpected edge cases or vulnerability issues (like ReDoS). If you find a pattern that fails on valid input or matches invalid input, please open an issue!

**When opening an issue, please provide:**
- The specific regular expression in question.
- The input string(s) that caused the unexpected behavior.
- Expected vs. actual output.
- Any suggestions you have for fixing the pattern.

### Suggesting New Features or Recipes
Have a great real-world RegEx snippet (e.g., matching ISBN numbers, specific crypto wallet addresses, or custom file parsing)? 
- Check the existing documentation and `ADVANCED_RECIPES.md` to make sure it isn't already covered.
- Open an issue titled `[Feature Request]: <Pattern Description>` to discuss it before opening a PR.

### Submitting Pull Requests (PRs)
1. **Fork** the repository on GitHub.
2. **Clone** your forked repository to your local machine:
   ```bash
   git clone https://github.com/<your-username>/regex-for-javascript.git
   ```
3. **Create a new branch** with a descriptive name:
   ```bash
   git checkout -b feature/add-credit-card-regex
   ```
4. **Make your changes** ensuring that any code snippets or markdown formatting are clean and easy to read.
5. **Test your RegEx** thoroughly across edge cases.
6. **Commit** your changes with clear, concise commit messages:
   ```bash
   git commit -m "docs: add comprehensive credit card matching recipe"
   ```
7. **Push** to your fork on GitHub:
   ```bash
   git push origin feature/add-credit-card-regex
   ```
8. **Open a Pull Request** from your branch to the `main` branch of this repository.

---

## 📐 3. Submission Guidelines

To maintain the high quality of this resource, please follow these guidelines when adding new RegEx patterns:

* **Include Explanations**: Don't just paste a long regex string. Break down the pattern piece by piece so learners understand *how* it works.
* **Use Flags Mindfully**: Only include flags (like `g`, `i`, `m`) if they are strictly necessary for the pattern to function.
* **Provide Example Inputs**: Show at least 3 valid matching examples and 2 invalid non-matching examples.
* **Format Correctly**: Ensure all JavaScript code and regex patterns are enclosed in appropriate Markdown code blocks.

---

## 💬 4. Community & Questions

If you have questions about how to implement a specific feature or want feedback on a regular expression before submitting a PR, feel free to open a discussion in the GitHub Issues tab.

Happy Regexing! 🎉

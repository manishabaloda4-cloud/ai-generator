# 🤖 AI Text Generator

> *Type a prompt. Get instant AI-written text.*

A sleek, feature-rich AI text generator powered by **Google Gemini API** — built with pure HTML, CSS & JavaScript. Supports 6 writing modes, auto-saves your API key, and works completely in the browser with no backend needed.

🔗 **[Live Demo](#)* https://manishabaloda4-cloud.github.io/ai-generator/ *

---

## ✨ Features

- 🧠 **6 Writing Modes** — General, Essay, Story, Email, Code, Summary
- ⚡ **Instant Generation** — powered by Google Gemini 2.5
- 🔄 **Auto Model Fallback** — tries Gemini 2.5 Flash → Flash-Lite → Pro automatically if quota is hit
- 💾 **API Key Saved Once** — stored in localStorage, never enter it again
- 📋 **Copy Output** — one-click copy of generated text
- 🔁 **Retry Button** — regenerate with same prompt instantly
- 📊 **Word & Character Count** — shown after every generation
- ⌨️ **Keyboard Shortcut** — `Ctrl + Enter` to generate
- 🎨 **Bold dark editorial UI** — minimal, distraction-free design
- 📱 **Responsive** — works on mobile and desktop
- ⚠️ **Smart Error Handling** — clear messages for quota, invalid key, empty prompt

---

## 🛠️ Tech Stack

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Gemini API](https://img.shields.io/badge/Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white)

**No frameworks. No npm. No backend. Just vanilla web tech + Gemini API.**

---

## 🚀 How to Use

1. Get a **free Gemini API key** from [Google AI Studio](https://aistudio.google.com) — no credit card needed
2. Open the app → paste your API key once (auto-saved forever)
3. Pick a **writing mode** (Essay, Story, Email, Code, etc.)
4. Type your prompt → click **Generate** or press `Ctrl + Enter`
5. Copy the result with one click!

---

## 🎯 Writing Modes

| Mode | Best For |
|------|----------|
| **General** | Anything — open-ended questions, ideas |
| **Essay** | Structured essays with intro, body, conclusion |
| **Story** | Creative fiction with dialogue and descriptions |
| **Email** | Professional emails with subject line |
| **Code** | Clean, commented code with explanations |
| **Summary** | Bullet-point summaries of any text |

---

## ⚙️ Run Locally

```bash
git clone https://github.com/manishabaloda4-cloud/ai-text-generator.git
cd ai-text-generator
open index.html
```

No installation. No dependencies. Just open in browser!

---

## 📂 Project Structure

```
ai-text-generator/
├── index.html    # App layout and structure
├── style1.css    # Dark editorial UI, animations
└── script1.js    # Gemini API logic, localStorage, modes
```

---

## 📊 Gemini Free Tier Limits (2026)

| Model | Requests/min | Requests/day |
|-------|-------------|-------------|
| gemini-2.5-flash | 10 | 250 |
| gemini-2.5-flash-lite | 15 | 1,000 |
| gemini-2.5-pro | 5 | 100 |

> The app automatically falls back to the next model if one hits its quota!

---

## 💡 What I Learned

- Integrating **Google Gemini API** using vanilla JavaScript fetch
- **Prompt engineering** — crafting mode-specific system prompts
- **localStorage** — saving API keys securely in the browser
- **Async/await + error handling** — graceful fallbacks for API failures
- **Model fallback logic** — automatically switching models on quota errors
- Building a complete **single-page app** without any framework
- Clean **dark UI design** from scratch with CSS animations

---

## 👩‍💻 Author

**Manisha Baloda**
B.Tech CSE (AI/ML) | 1st Year | LPU, Punjab

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat&logo=linkedin&logoColor=white)](https://linkedin.com/in/manisha-baloda-11a254393)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white)](https://github.com/manishabaloda4-cloud)
[![Email](https://img.shields.io/badge/Gmail-EA4335?style=flat&logo=gmail&logoColor=white)](mailto:manishabaloda4@gmail.com)

---

⭐ If this saved you time, give it a star!

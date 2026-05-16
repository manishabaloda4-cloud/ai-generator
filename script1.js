// DOM refs
const apiKeyInput  = document.getElementById('apiKey');
const keySaved     = document.getElementById('keySaved');
const promptInput  = document.getElementById('prompt');
const generateBtn  = document.getElementById('generateBtn');
const clearBtn     = document.getElementById('clearBtn');
const resultWrap   = document.getElementById('resultWrap');
const resultDiv    = document.getElementById('result');
const wordCount    = document.getElementById('wordCount');
const errorBox     = document.getElementById('errorBox');
const copyBtn      = document.getElementById('copyBtn');
const regenBtn     = document.getElementById('regenBtn');
const charCount    = document.getElementById('charCount');
const modeBtns     = document.querySelectorAll('.mode-btn');
 
let currentMode = 'general';
 
// ── Load saved API key ────────────────────────────────────────
const savedKey = localStorage.getItem('gemini_api_key');
if (savedKey) {
  apiKeyInput.value = savedKey;
  apiKeyInput.style.display = 'none';
  keySaved.classList.add('show');
}
 
apiKeyInput.addEventListener('input', function () {
  if (this.value.trim().length > 10) {
    localStorage.setItem('gemini_api_key', this.value.trim());
    this.style.display = 'none';
    keySaved.classList.add('show');
  }
});
 
// Show input again on click of "saved" text (to update key)
keySaved.addEventListener('click', () => {
  apiKeyInput.style.display = 'block';
  keySaved.classList.remove('show');
  apiKeyInput.focus();
});
 
// ── Character counter ─────────────────────────────────────────
promptInput.addEventListener('input', () => {
  charCount.textContent = promptInput.value.length;
});
 
// ── Mode selector ─────────────────────────────────────────────
modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    modeBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentMode = btn.dataset.mode;
 
    // Update placeholder based on mode
    const placeholders = {
      general: 'Ask me anything...',
      essay:   'Write an essay about climate change...',
      story:   'Write a short story about a girl who finds a magic door...',
      email:   'Write a professional email requesting a leave of absence...',
      code:    'Write a Python function to sort a list of dictionaries...',
      summary: 'Paste any text here and I will summarize it for you...'
    };
    promptInput.placeholder = placeholders[currentMode];
  });
});
 
// ── Mode system prompts ───────────────────────────────────────
const modePrompts = {
  general: '',
  essay:   'Write a well-structured essay with introduction, body paragraphs, and conclusion. ',
  story:   'Write a creative, engaging short story with vivid descriptions and dialogue. ',
  email:   'Write a professional, clear, and concise email. Include subject line. ',
  code:    'Write clean, well-commented code with explanations. ',
  summary: 'Provide a concise summary in bullet points highlighting the key points. '
};
 
// ── Generate ──────────────────────────────────────────────────
async function generateText() {
  const apiKey = localStorage.getItem('gemini_api_key') || apiKeyInput.value.trim();
  const prompt = promptInput.value.trim();
 
  // Clear errors
  errorBox.className = 'error-box';
 
  if (!apiKey) {
    showError('Please paste your Gemini API key first. Get one free at aistudio.google.com');
    apiKeyInput.style.display = 'block';
    apiKeyInput.focus();
    return;
  }
  if (!prompt) {
    showError('Please enter a prompt first!');
    promptInput.focus();
    return;
  }
 
  setLoading(true);
 
  const fullPrompt = modePrompts[currentMode] + prompt;
 
  try {
    // Try gemini-2.0-flash first, fallback to gemini-1.5-flash if quota exceeded
    const models = ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-2.5-pro'];
    let response, data;
 
    for (const model of models) {
      response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: fullPrompt }] }],
            generationConfig: { temperature: 0.9, maxOutputTokens: 1500 }
          })
        }
      );
      data = await response.json();
      if (!response.ok && data.error?.message?.includes('quota')) continue;
      break;
    }
 
    if (!response.ok) {
      const msg = data.error?.message || 'API request failed.';
      if (msg.includes('quota')) {
        throw new Error('Daily free quota exceeded. Please wait 24 hours or create a new API key at aistudio.google.com');
      }
      throw new Error(msg);
    }
 
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error('No response received. Please try again.');
 
    // Display result
    resultDiv.textContent = text;
    const words = text.trim().split(/\s+/).length;
    wordCount.textContent = `${words} words · ${text.length} characters`;
    resultWrap.classList.add('show');
    resultWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
 
  } catch (err) {
    console.error(err);
    showError(err.message || 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
  }
}
 
// ── Copy result ───────────────────────────────────────────────
function copyResult() {
  const text = resultDiv.textContent;
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    copyBtn.textContent = '✓ Copied!';
    copyBtn.style.color = 'var(--success)';
    setTimeout(() => {
      copyBtn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
      copyBtn.style.color = '';
    }, 2000);
  });
}
 
// ── Clear ─────────────────────────────────────────────────────
clearBtn.addEventListener('click', () => {
  promptInput.value = '';
  charCount.textContent = '0';
  promptInput.focus();
});
 
// ── Keyboard shortcut: Ctrl/Cmd + Enter ──────────────────────
promptInput.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generateText();
});
 
// ── Button listeners ──────────────────────────────────────────
generateBtn.addEventListener('click', generateText);
copyBtn.addEventListener('click', copyResult);
regenBtn.addEventListener('click', generateText);
 
// ── Helpers ───────────────────────────────────────────────────
function showError(msg) {
  errorBox.textContent = '⚠️ ' + msg;
  errorBox.className = 'error-box show';
}
 
function setLoading(on) {
  generateBtn.disabled = on;
  regenBtn.disabled = on;
  if (on) {
    generateBtn.innerHTML = `<span class="dots"><span></span><span></span><span></span></span>`;
    errorBox.className = 'error-box';
  } else {
    generateBtn.innerHTML = `<span class="btn-text">Generate</span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
      </svg>`;
  }
}

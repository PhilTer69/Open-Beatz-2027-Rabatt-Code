function copyCode() {
  const codeElement = document.getElementById('loyaltyCode');
  const code = codeElement.textContent.trim();
  const status = document.getElementById('copyStatus');

  const showStatus = (message) => {
    status.textContent = message;
    setTimeout(() => {
      status.textContent = '';
    }, 2200);
  };

  // Capture consent at the time of the click; do not track earlier actions later.
  const analyticsAllowed = window['ga-disable-G-1GSW1FLHVX'] === false;
  const onCopied = () => {
    showStatus('Code kopiert ✓');
    if (analyticsAllowed) trackCodeCopy();
  };

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code)
      .then(onCopied)
      .catch(() => fallbackCopy(code, codeElement, showStatus, onCopied));
    return;
  }

  fallbackCopy(code, codeElement, showStatus, onCopied);
}

function fallbackCopy(code, codeElement, showStatus, onCopied) {
  const textarea = document.createElement('textarea');
  textarea.value = code;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    if (successful) onCopied();
    else showStatus('Code bitte markieren und kopieren.');
  } catch {
    const range = document.createRange();
    range.selectNodeContents(codeElement);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    showStatus('Code markiert – bitte kopieren.');
  } finally {
    textarea.remove();
  }
}

function trackCodeCopy() {
  if (window['ga-disable-G-1GSW1FLHVX'] !== false || typeof window.gtag !== 'function') return;
  try {
    window.gtag('event', 'copy_code', { send_to: 'G-1GSW1FLHVX' });
  } catch {
    // Analytics must never interrupt copying.
  }
}

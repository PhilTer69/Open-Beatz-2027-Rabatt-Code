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

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(code)
      .then(() => showStatus('Code kopiert ✓'))
      .catch(() => fallbackCopy(code, codeElement, showStatus));
    return;
  }

  fallbackCopy(code, codeElement, showStatus);
}

function fallbackCopy(code, codeElement, showStatus) {
  const textarea = document.createElement('textarea');
  textarea.value = code;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    const successful = document.execCommand('copy');
    showStatus(successful ? 'Code kopiert ✓' : 'Code bitte markieren und kopieren.');
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

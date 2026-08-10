function copyCode() {
  const code = document.getElementById('loyaltyCode').textContent.trim();
  const status = document.getElementById('copyStatus');

  navigator.clipboard.writeText(code).then(() => {
    status.textContent = 'Code kopiert ✓';
    setTimeout(() => status.textContent = '', 2200);
  }).catch(() => {
    status.textContent = 'Kopieren nicht möglich – Code bitte markieren.';
  });
}

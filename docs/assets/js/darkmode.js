
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('dark-mode-toggle');
  if (!toggle) return;

  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('preferred-theme', mode);
  });

  const saved = localStorage.getItem('preferred-theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
  }
});

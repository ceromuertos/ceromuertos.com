(() => {
  const gate = document.getElementById('ageGate');
  const accept = document.querySelector('[data-age-accept]');
  if (gate && localStorage.getItem('okcm-age-confirmed') === 'yes') {
    gate.classList.add('is-hidden');
  }
  if (accept) {
    accept.addEventListener('click', () => {
      localStorage.setItem('okcm-age-confirmed', 'yes');
      gate?.classList.add('is-hidden');
    });
  }
})();
(() => {
  'use strict';

  const initAgeGate = () => {
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
  };

  const initTransparentImageShadows = () => {
    const transparentImages = document.querySelectorAll(
      '.hero-emblem, .product-card img, .origin .coin-img, .guardian-section .coin-img'
    );

    const prepareImage = (image) => {
      let prepared = false;

      const revealWithoutShadow = () => {
        if (prepared) return;
        prepared = true;
        image.classList.add('image-ready');
      };

      const prepareShadowAndReveal = () => {
        if (prepared) return;
        prepared = true;

        /*
          Primer cuadro: activa el drop-shadow mientras la imagen sigue oculta.
          Segundo cuadro: revela la imagen cuando la composición ya está lista.
        */
        requestAnimationFrame(() => {
          image.classList.add('shadow-ready');

          requestAnimationFrame(() => {
            image.classList.add('image-ready');
          });
        });
      };

      const decodeImage = () => {
        if (typeof image.decode === 'function') {
          image.decode()
            .then(prepareShadowAndReveal)
            .catch(prepareShadowAndReveal);
        } else {
          prepareShadowAndReveal();
        }
      };

      if (image.complete && image.naturalWidth > 0) {
        decodeImage();
      } else {
        image.addEventListener('load', decodeImage, { once: true });
        image.addEventListener('error', revealWithoutShadow, { once: true });
      }
    };

    transparentImages.forEach(prepareImage);
  };

  const init = () => {
    initAgeGate();
    initTransparentImageShadows();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();

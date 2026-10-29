/* ==========================================================================
   Luana Mendes · página de links
   - Botão de compartilhar: no celular abre o menu de compartilhar do aparelho;
     no computador copia o link e mostra um aviso.
   - E-mail embaixo do nome: copia o e-mail e mostra um aviso.
   ========================================================================== */

(function () {
  'use strict';

  var button = document.getElementById('share');
  var toast = document.getElementById('toast');
  if (!button || !toast) return;

  var url = button.getAttribute('data-url') || window.location.href;
  var title = button.getAttribute('data-title') || document.title;
  var hideTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(hideTimer);
    hideTimer = setTimeout(function () { toast.hidden = true; }, 2200);
  }

  function copyLink() {
    try {
      navigator.clipboard.writeText(url).then(
        function () { showToast('link copiado ✓'); },
        function () { showToast(url); }
      );
    } catch (error) {
      showToast(url);
    }
  }

  button.addEventListener('click', function () {
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function (error) {
        // se a pessoa só fechou o menu, não faz nada
        if (error && error.name !== 'AbortError') copyLink();
      });
    } else {
      copyLink();
    }
  });

  /* E-mail embaixo do nome: ao clicar, copia e mostra "e-mail copiado" */
  var emailButton = document.getElementById('copy-email');
  if (emailButton) {
    var email = emailButton.getAttribute('data-email');

    emailButton.addEventListener('click', function () {
      try {
        navigator.clipboard.writeText(email).then(
          function () { showToast('e-mail copiado ✓'); },
          function () { showToast(email); }
        );
      } catch (error) {
        showToast(email);
      }
    });
  }
})();

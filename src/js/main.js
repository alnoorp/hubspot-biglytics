(function() {

  // Variables
  var langToggle = document.querySelector(".header__language-switcher");
  var navToggle = document.querySelector("#nav-toggle");
  var blogCommentsButton = document.querySelector('.blog-comments__toggle');

  // Functions
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function showComments() {
    blogCommentsButton.style.display="none";
    var blogCommentsSection = document.querySelector('.blog-comments__listing');
    blogCommentsSection.style.display = 'block';
  }

  function toggleLang() {
    langToggle.classList.toggle('open');

    if (navToggle.checked) {
      navToggle.checked = false;
    }
  }

  function toggleNav() {
    if (langToggle.classList.contains('open')) {
      langToggle.classList.remove('open');
    }
  }

  // Event Listeners
  domReady(function() {
    if (!document.body) {
      return;
    } else {

      // Function dependent on navigation component
      if (navToggle) {
        // Toggles the mobile navigation
        navToggle.addEventListener('click', toggleNav);
      }

      // Function dependent on language switcher component
      if (langToggle) {
        // Toggles the mobile views for the language switcher
        langToggle.addEventListener('click', toggleLang);
      }

      // Function dependent on blog comments component
      if (blogCommentsButton) {
        // Displays the blog comment section on click
        blogCommentsButton.addEventListener('click', showComments);
      }
    }
  });
})();

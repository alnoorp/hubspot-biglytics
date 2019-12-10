(function() {
  // Variables
  var langToggle = document.querySelector('.header__language-switcher');
  var navToggle = document.querySelector('#nav-toggle');
  var blogCommentsButtons = document.querySelector(
    '.blog-post__comments-buttons'
  );
  var blogShowCommentsButton = document.querySelector(
    '.blog-post__show-comments'
  );
  var blogHideCommentsButton = document.querySelector(
    '.blog-post__hide-comments'
  );
  var blogCommentsListing = document.querySelector(
    '.blog-post__comments-listing'
  );

  // Functions
  function domReady(callback) {
    if (['interactive', 'complete'].indexOf(document.readyState) >= 0) {
      callback();
    } else {
      document.addEventListener('DOMContentLoaded', callback);
    }
  }

  function toggleNav() {
    if (langToggle.classList.contains('open')) {
      langToggle.classList.remove('open');
    }
  }

  function toggleLang() {
    langToggle.classList.toggle('open');

    if (navToggle.checked) {
      navToggle.checked = false;
    }
  }

  function toggleComments() {
    blogShowCommentsButton.classList.toggle('hide-button');
    blogHideCommentsButton.classList.toggle('hide-button');
    blogCommentsListing.classList.toggle('hide-comments');
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
        // Toggles the mobile language switcher
        langToggle.addEventListener('click', toggleLang);
      }
      // Function dependent on blog comments component
      if (blogCommentsButtons) {
        // Displays and hides the blog comment section on click
        blogShowCommentsButton.addEventListener('click', toggleComments);
        blogHideCommentsButton.addEventListener('click', toggleComments);
      }
    }
  });
})();

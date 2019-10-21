(function() {
  // Blog Comments Toggle

  var blogCommentsButton = document.querySelector('.blog-comments__toggle');

  if (blogCommentsButton) {
    blogCommentsButton.addEventListener('click', function() {
      var blogCommentsSection = document.querySelector(
        '.blog-comments__listing'
      );
      blogCommentsSection.style.display = 'block';
    });
  }
})();

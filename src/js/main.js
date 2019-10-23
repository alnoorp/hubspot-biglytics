(function() {
  // Blog Comments Toggle

  var blogCommentsButton = document.querySelector('.blog-comments__toggle');

  if (blogCommentsButton) {
    blogCommentsButton.addEventListener('click', function() {
      blogCommentsButton.style.display="none"; 
      var blogCommentsSection = document.querySelector('.blog-comments__listing');
      blogCommentsSection.style.display = 'block';
    });
  }
})();

var blogTagSelect = document.querySelector('.blog-tag-filter__dropdown select');

blogTagSelect.addEventListener('change', function (event) {
    if (blogTagSelect.value) {
      window.location = blogTagSelect.value;
    }
    return false;
});
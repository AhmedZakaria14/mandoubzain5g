document.addEventListener('DOMContentLoaded', function () {
    const tocHeader = document.querySelector('.toc-header');
    const tocNav = document.querySelector('.toc-nav');

    tocHeader.addEventListener('click', () => {
      tocHeader.classList.toggle('active');
      tocNav.classList.toggle('open');
    });
  });
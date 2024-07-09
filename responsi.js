document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav ul');

    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('showing');
    });
});

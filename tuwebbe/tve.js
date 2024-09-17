document.addEventListener('DOMContentLoaded', () => {
    const videoPlayer = document.getElementById('current-video');
    const videoItems = document.querySelectorAll('.video-item');
    const searchBar = document.getElementById('search-bar');
    const categories = document.querySelectorAll('.category');
    const themeToggleButton = document.getElementById('theme-toggle');

    function playVideo(src) {
        if (src) {
            videoPlayer.src = src;
            videoPlayer.play();
        }
    }

    videoItems.forEach(item => {
        item.addEventListener('click', () => {
            const videoSrc = item.getAttribute('data-src');
            playVideo(videoSrc);
        });
    });

    function filterVideos(query) {
        videoItems.forEach(item => {
            const title = item.querySelector('p').textContent.toLowerCase();
            item.style.display = title.includes(query) ? 'inline-block' : 'none';
        });
    }

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        filterVideos(query);
    });

    function filterByCategory(filter) {
        videoItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            item.style.display = filter === 'all' || itemCategory === filter ? 'inline-block' : 'none';
        });
    }

    categories.forEach(category => {
        category.addEventListener('click', () => {
            const filter = category.getAttribute('data-filter');
            filterByCategory(filter);
        });
    });

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggleButton.textContent = newTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';
    }

    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeToggleButton.textContent = savedTheme === 'dark' ? 'Modo Claro' : 'Modo Oscuro';

    themeToggleButton.addEventListener('click', toggleTheme);
});

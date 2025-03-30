document.addEventListener('DOMContentLoaded', function() {
    // Highlight service khi có hash trong URL
    if (window.location.hash) {
        const targetService = document.querySelector(window.location.hash);
        if (targetService) {
            targetService.scrollIntoView({ behavior: 'smooth' });
            targetService.style.animation = 'highlight 1.5s ease';
        }
    }

    // Thêm các hiệu ứng khác nếu cần
});

// Thêm vào CSS
@keyframes highlight {
    0% { background-color: rgba(241, 196, 15, 0.3); }
    100% { background-color: transparent; }
}
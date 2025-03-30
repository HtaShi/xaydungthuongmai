document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
            
            // Toggle body scroll when menu is open
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.backgroundColor = 'var(--dark-color)';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
                header.style.padding = '10px 0';
            } else {
                header.style.backgroundColor = 'transparent';
                header.style.boxShadow = 'none';
                header.style.padding = '15px 0';
            }
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const dotsContainer = document.querySelector('.slider-dots');
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((slide, index) => {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');
        const nextBtn = document.querySelector('.next-slide');
        const prevBtn = document.querySelector('.prev-slide');
        const sliderContainer = document.querySelector('.slider-container');

        function goToSlide(n) {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            
            currentSlide = (n + slides.length) % slides.length;
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }

        // Next/previous controls
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                resetInterval();
                goToSlide(currentSlide + 1);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                resetInterval();
                goToSlide(currentSlide - 1);
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                resetInterval();
                goToSlide(currentSlide + 1);
            } else if (e.key === 'ArrowLeft') {
                resetInterval();
                goToSlide(currentSlide - 1);
            }
        });

        // Touch events for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (sliderContainer) {
            sliderContainer.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                resetInterval();
            }, {passive: true});

            sliderContainer.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
        }

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                goToSlide(currentSlide + 1); // Swipe left
            } else if (touchEndX > touchStartX + 50) {
                goToSlide(currentSlide - 1); // Swipe right
            }
            startInterval();
        }

        // Pause on hover
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', pauseInterval);
            sliderContainer.addEventListener('mouseleave', startInterval);
        }

        function startInterval() {
            slideInterval = setInterval(() => {
                goToSlide(currentSlide + 1);
            }, slideDuration);
        }

        function pauseInterval() {
            clearInterval(slideInterval);
        }

        function resetInterval() {
            pauseInterval();
            startInterval();
        }

        // Start the slider
        startInterval();
    }

    // Animate stats counters
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {threshold: 0.5});

        statNumbers.forEach(number => {
            observer.observe(number);
        });

        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-count'));
            const duration = 2000; // 2 seconds
            const start = 0;
            const increment = target / (duration / 16);
            
            let current = start;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    clearInterval(timer);
                    current = target;
                }
                element.textContent = Math.floor(current);
            }, 16);
        }
    }
});

// // Hàm xử lý scroll đến section khi chuyển trang
// function handlePageScroll() {
//     // Kiểm tra nếu URL có hash (ví dụ: about.html#contact)
//     if (window.location.hash) {
//       const hash = window.location.hash;
//       const targetSection = document.querySelector(hash);
      
//       if (targetSection) {
//         // Tính toán vị trí scroll (trừ đi chiều cao header)
//         const header = document.querySelector('.main-header');
//         const headerHeight = header ? header.offsetHeight : 0;
//         const offset = 20; // Có thể điều chỉnh
        
//         // Delay để đảm bảo trang load hoàn toàn
//         setTimeout(() => {
//           const targetPosition = targetSection.getBoundingClientRect().top + 
//                                window.pageYOffset - 
//                                headerHeight - 
//                                offset;
          
//           window.scrollTo({
//             top: targetPosition,
//             behavior: 'smooth'
//           });
          
//           // Highlight section
//           targetSection.style.animation = 'none';
//           targetSection.offsetHeight; // Trigger reflow
//           targetSection.style.animation = 'highlight 1.5s ease';
//         }, 100);
//       }
//     }
//   }
  
//   // Gọi hàm khi trang load xong
//   document.addEventListener('DOMContentLoaded', handlePageScroll);
//   window.addEventListener('load', handlePageScroll);


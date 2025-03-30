document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for about navigation
    const aboutLinks = document.querySelectorAll('.about-nav a');
    
    aboutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            aboutLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Scroll to section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.about-header').offsetHeight;
                const navHeight = document.querySelector('.about-nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without reload
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                }
            }
        });
    });
    
    // Highlight current section on scroll
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('.about-header').offsetHeight;
        const navHeight = document.querySelector('.about-nav').offsetHeight;
        
        document.querySelectorAll('.about-section, .mission-section, .goals-section, .strategy-section, .hr-section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - navHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                const id = '#' + section.getAttribute('id');
                
                aboutLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
    
    // Animation for timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }
        });
    }
    
    // Initial check
    checkTimeline();
    window.addEventListener('scroll', checkTimeline);
});


document.addEventListener('DOMContentLoaded', function() {
    // Lấy các phần tử DOM cần thiết
    const aboutNav = document.querySelector('.about-nav');
    const header = document.querySelector('.about-header');
    const navLinks = document.querySelectorAll('.about-nav a');
    
    // Tính toán vị trí
    const headerHeight = header.offsetHeight;
    const navHeight = aboutNav.offsetHeight;
    let lastScrollPosition = 0;
    
    // Hàm xử lý scroll
    function handleScroll() {
        const currentScrollPosition = window.scrollY;
        
        // Thêm/xóa class sticky khi scroll qua header
        if (currentScrollPosition > headerHeight) {
            aboutNav.classList.add('sticky-nav');
        } else {
            aboutNav.classList.remove('sticky-nav');
        }
        
        // Highlight nav item tương ứng với section đang hiển thị
        document.querySelectorAll('.about-section, .mission-section, .goals-section, .strategy-section, .hr-section').forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - navHeight - 20;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (currentScrollPosition >= sectionTop && currentScrollPosition < sectionBottom) {
                const id = '#' + section.getAttribute('id');
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === id) {
                        link.classList.add('active');
                    }
                });
            }
        });
        
        lastScrollPosition = currentScrollPosition;
    }
    
    // Sự kiện click cho nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Tính toán vị trí scroll đến
                const targetPosition = targetSection.offsetTop - headerHeight - navHeight;
                
                // Scroll mượt đến section
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Cập nhật URL
                history.pushState(null, null, targetId);
                
                // Cập nhật active link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Thêm sự kiện scroll
    window.addEventListener('scroll', handleScroll);
    
    // Gọi hàm lần đầu để kiểm tra
    handleScroll();
});
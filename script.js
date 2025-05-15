const accessKey = "yN0XQzAbgTCfVqsx4bQOtNnpvnWSUHrGhXHwUhf_zA0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");
const loadingSpinner = document.getElementById("loading");
const themeToggle = document.getElementById('theme-toggle');
const cursorToggle = document.getElementById('cursor-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

let keyword = "";
let page = 1;
let isLoading = false;
let isCursorAnimationEnabled = true;

// Show loading spinner
const showLoading = () => {
    isLoading = true;
    loadingSpinner.style.display = 'flex';
};

// Hide loading spinner
const hideLoading = () => {
    isLoading = false;
    loadingSpinner.style.display = 'none';
};

// Show error message
const showError = (message) => {
    // Remove any existing error messages
    const existingErrors = document.querySelectorAll('.error-message');
    existingErrors.forEach(error => error.remove());

    const errorDiv = document.createElement("div");
    errorDiv.className = "error-message";
    errorDiv.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <p>${message}</p>
    `;
    document.body.appendChild(errorDiv);

    // Remove the error message after 4 seconds
    setTimeout(() => {
        errorDiv.style.animation = 'errorFadeOut 0.3s ease-out forwards';
        setTimeout(() => errorDiv.remove(), 300);
    }, 4000);
};

async function searchImages() {
    try {
        if (isLoading) return;
        
        keyword = searchBox.value.trim();
        if (!keyword) return;

        showLoading();
        
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(keyword)}&client_id=${accessKey}&per_page=12`;
        const response = await fetch(url);
        
        if (!response.ok) {
            hideLoading();
            throw new Error('Failed to fetch images');
        }

        const data = await response.json();
        hideLoading(); // Hide loading after data is received
        
        if (page === 1) {
            searchResult.innerHTML = "";
        }

        const results = data.results;
        
        if (results.length === 0 && page === 1) {
            showError("No images found. Try a different search term.");
            showMoreBtn.style.display = "none";
            return;
        }

        results.forEach(result => {
            const imageWrapper = document.createElement("div");
            imageWrapper.className = "image-wrapper";
            
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            
            const image = document.createElement("img");
            image.src = result.urls.regular;
            image.alt = result.alt_description || keyword;
            
            imageLink.appendChild(image);
            imageWrapper.appendChild(imageLink);
            searchResult.appendChild(imageWrapper);
            
            setTimeout(() => {
                imageWrapper.style.opacity = "1";
            }, 100);
        });

        if (results.length > 0) {
            showMoreBtn.style.display = "block";
        } else {
            showMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error:", error);
        showError("An error occurred while fetching images. Please try again.");
        hideLoading();
        showMoreBtn.style.display = "none";
    }
}

// Event Listeners
searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});

cursorToggle.addEventListener('click', () => {
    isCursorAnimationEnabled = !isCursorAnimationEnabled;
    cursorToggle.classList.toggle('active');
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    cursorToggle.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);

    // Clear all particles when disabled
    if (!isCursorAnimationEnabled) {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Remove the input event listener that was triggering immediate search
// searchBox.addEventListener("input", debounce(() => {
//     page = 1;
//     searchImages();
// }, 500));

// Cursor trail effect
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class with wave motion
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 2;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 20) + 1;
        this.angle = Math.random() * 360;
        this.life = 1;
        this.color = this.getRandomColor();
    }

    getRandomColor() {
        const theme = document.documentElement.getAttribute('data-theme');
        const colors = theme === 'dark' 
            ? ['#7f8ce2', '#5e60ce', '#6f7dae', '#7400b8'] 
            : ['#8ecae6', '#95d5b2', '#b7e4c7', '#a8dadc'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        // Wave motion
        this.angle += 0.05;
        this.x = this.baseX + Math.cos(this.angle) * 2 * this.density;
        this.y = this.baseY + Math.sin(this.angle) * 2 * this.density;
        
        // Drift effect
        this.baseX += Math.sin(this.angle * 0.02) * 0.8;
        this.baseY -= 0.5; // Gentle upward drift
        
        // Fade out
        this.life -= 0.012;
        
        // Size pulsing
        this.size = (Math.sin(this.angle * 0.5) + 2) * 2;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

// Particle system
let particles = [];
let mouseX = 0;
let mouseY = 0;
let isMoving = false;
let moveTimeout;

// Track mouse movement
document.addEventListener('mousemove', (e) => {
    if (!isCursorAnimationEnabled) return;
    
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    
    // Create particles on mouse move
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }

    // Reset moving flag after mouse stops
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        isMoving = false;
    }, 100);
});

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();

        // Remove dead particles
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }

    // Limit particles for performance
    if (particles.length > 80) {
        particles = particles.slice(-80);
    }

    requestAnimationFrame(animate);
}

animate();

// Dark mode toggle functionality
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Add ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    themeToggle.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 1000);
});

// Add styles for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes errorFadeOut {
        0% {
            opacity: 1;
            transform: translate(-50%, -50%);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -60%);
        }
    }

    .error-message {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        margin: 2rem 0;
    }

    .error-message i {
        font-size: 2rem;
        color: var(--accent-color);
        margin-bottom: 1rem;
    }

    .image-wrapper {
        opacity: 0;
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 1s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        0% {
            transform: scale(0);
            opacity: 0.5;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);



(function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="4kx84c2Rx0-N1LYwY5kVS";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();

// Theme and cursor toggles
const themeToggle = document.getElementById('theme-toggle');
const cursorToggle = document.getElementById('cursor-toggle');
const html = document.documentElement;
const canvas = document.getElementById('cursorCanvas');
const ctx = canvas.getContext('2d');

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    // Ripple effect
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    themeToggle.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 1000);
});

// Cursor magic wand toggle
let isCursorAnimationEnabled = true;
cursorToggle.addEventListener('click', () => {
    isCursorAnimationEnabled = !isCursorAnimationEnabled;
    cursorToggle.classList.toggle('active');
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    cursorToggle.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 1000);
    if (!isCursorAnimationEnabled) {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

// Show login/register modal
function showAuth() {
    const wrapper = document.getElementById('authWrapper');
    wrapper.style.display = 'block';
    setTimeout(() => wrapper.classList.add('show'), 10);
}
function hideAuth() {
    const wrapper = document.getElementById('authWrapper');
    wrapper.classList.remove('show');
    setTimeout(() => wrapper.style.display = 'none', 300);
}
function toggleForms() {
    const loginForm = document.querySelector('.login-form');
    const registerForm = document.querySelector('.register-form');
    if (loginForm.style.display !== 'none') {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
    } else {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
}

// Resize canvas for cursor effect
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle class for cursor trail
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
        const theme = html.getAttribute('data-theme');
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
        // Drift upward
        this.baseX += Math.sin(this.angle * 0.02) * 0.8;
        this.baseY -= 0.5;
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

let particles = [];
let mouseX = 0;
let mouseY = 0;
let isMoving = false;
let moveTimeout;

// Create particles on mouse move
document.addEventListener('mousemove', (e) => {
    if (!isCursorAnimationEnabled) return;
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouseX, mouseY));
    }
    clearTimeout(moveTimeout);
    moveTimeout = setTimeout(() => {
        isMoving = false;
    }, 100);
});

// Animation loop for particles
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].draw();
        if (particles[i].life <= 0) {
            particles.splice(i, 1);
        }
    }
    if (particles.length > 80) {
        particles = particles.slice(-80);
    }
    requestAnimationFrame(animate);
}
animate();

// Get DOM elements
var authModal = document.getElementById('auth-modal');
var loginTrigger = document.getElementById('login-trigger');
var closeBtn = document.querySelector('.auth-close');
var loginForm = document.getElementById('loginForm');
var registerForm = document.getElementById('registerForm');
var toRegister = document.getElementById('toRegister');
var toLogin = document.getElementById('toLogin');

// Show login form
loginTrigger.addEventListener('click', function() {
  authModal.style.display = 'flex';
  loginForm.style.display = 'block';
  registerForm.style.display = 'none';
});

// Close modal on close button click
closeBtn.addEventListener('click', function() {
  authModal.style.display = 'none';
});

// Toggle to register form link
toRegister.addEventListener('click', function(event) {
  event.preventDefault();
  loginForm.style.display = 'none';
  registerForm.style.display = 'block';
});

// Toggle to login form link
toLogin.addEventListener('click', function(event) {
  event.preventDefault();
  registerForm.style.display = 'none';
  loginForm.style.display = 'block';
});

// Close modal when clicking outside the modal content
window.addEventListener('click', function(event) {
  if (event.target === authModal) {
    authModal.style.display = 'none';
  }
});

// Gallery reveal
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-img-container');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        },
        {
            threshold: 0.3,
            rootMargin: '0px',
        }
    );

    galleryItems.forEach((item) => observer.observe(item));
});

document.getElementById('main-page-btn').addEventListener('click', function() {
    // Replace this with your real authentication check
    const isLoggedIn = false; // Set to true if user is authenticated

    if (isLoggedIn) {
        window.location.href = 'index.html';
    } else {
        // Show the login modal exactly like the login button
        authModal.style.display = 'flex';
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
    }
});

// 1) Firebase initialization
const firebaseConfig = {
  apiKey: "AIzaSyAkLHSR24G49ekGdy20xRK1YSCYJxPv3Tc",
  authDomain: "search-to-see.firebaseapp.com",
  projectId: "search-to-see",
  storageBucket: "search-to-see.appspot.com",
  messagingSenderId: "966951407002",
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 2) Helpers: redirect on success
function redirectToMain() {
  window.location.href = 'index.html';
}

// 3) Registration: create Auth user & Firestore document
async function registerUser(email, password, username) {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;
    const userRef = db.collection('users').doc(user.uid);

    await userRef.set({
      username: username,
      email: email,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      savedImages: []
    });

    redirectToMain();
  } catch (err) {
    showNotify(err.message);
    console.error('Registration error:', err);
  }
}

// 4) Login: sign in & redirect
async function loginUser(email, password) {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    redirectToMain();
  } catch (err) {
    if (
      err.code === "auth/invalid-login-credentials" ||
      err.code === "auth/wrong-password" ||
      err.code === "auth/user-not-found"
    ) {
      showNotify("Sorry, the credentials are incorrect.");
    } else {
      showNotify(err.message);
    }
    console.error('Login error:', err);
  }
}

// 5) Wire up form buttons
document.getElementById('register-btn').addEventListener('click', () => {
  const email = document.getElementById('register-email').value.trim();
  const password = document.getElementById('register-password').value;
  const username = document.getElementById('register-username').value.trim();
  registerUser(email, password, username);
});

document.getElementById('login-btn').addEventListener('click', () => {
  const email = document.getElementById('login-email').value.trim();
  const password = document.getElementById('login-password').value;
  loginUser(email, password);
});

// Reveal gallery text on scroll
document.addEventListener('DOMContentLoaded', () => {
  const galleryItems = document.querySelectorAll('.gallery-img-container');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        } else {
          entry.target.classList.remove('in-view');
        }
      });
    },
    {
      threshold: 0.3,
      rootMargin: '0px',
    }
  );
  galleryItems.forEach((item) => observer.observe(item));
});

function showNotify(message) {
    const notify = document.getElementById('custom-notify');
    notify.textContent = message;
    notify.classList.add('show');
    setTimeout(() => {
        notify.classList.remove('show');
    }, 3500);
}

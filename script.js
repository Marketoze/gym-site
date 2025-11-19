// ============================================
// ELITE GYM - ADVANCED JAVASCRIPT
// ============================================

// ============================================
// INITIALIZATION & CONFIG
// ============================================

// Configuration (GSAP removed - animations disabled)
const CONFIG = {
    animationDuration: 0.6,
    staggerDelay: 0.1,
    scrollSmooth: true,
    enableToastNotifications: true,
    toastShowInterval: 8000, // 8 seconds
};

// Indian, Pakistani, and Arabic names with business context
const purchaseNotifications = [
    {
        name: "Amit Kumar",
        country: "India",
        flag: "🇮🇳",
        message: " purchased Premium Membership",
    },
    {
        name: "Priya Sharma",
        country: "India",
        flag: "🇮🇳",
        message: " subscribed to Personal Training",
    },
    {
        name: "Muhammad Ali",
        country: "Pakistan",
        flag: "🇵🇰",
        message: " joined Yoga Classes",
    },
    {
        name: "Fatima Khan",
        country: "Pakistan",
        flag: "🇵🇰",
        message: " booked Fitness Consultation",
    },
    {
        name: "Ahmed Hassan",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        message: " purchased Elite Membership",
    },
    {
        name: "Sara Al-Mansouri",
        country: "United Arab Emirates",
        flag: "🇦🇪",
        message: " signed up for Group Classes",
    },
    {
        name: "Rajesh Patel",
        country: "India",
        flag: "🇮🇳",
        message: " enrolled in Weight Loss Program",
    },
    {
        name: "Neha Singh",
        country: "India",
        flag: "🇮🇳",
        message: " purchased 10 Personal Training Sessions",
    },
    {
        name: "Hassan Ahmed",
        country: "Pakistan",
        flag: "🇵🇰",
        message: " registered for Basic Membership",
    },
    {
        name: "Zainab Malik",
        country: "Pakistan",
        flag: "🇵🇰",
        message: " started Nutrition Coaching",
    },
];

// Chatbot responses based on user options
const chatbotResponses = {
    1: {
        bot: "Our membership plans are designed for all fitness levels! 💪\n\n✅ Basic: AED 299/month - Full gym access\n✅ Premium: AED 599/month - Includes 4 personal training sessions\n✅ Elite: AED 999/month - Unlimited everything\n\nWould you like to join?",
        suggestions: [
            "Compare Plans",
            "Special Offers",
            "Contact Sales Team",
            "Back to Menu",
        ],
    },
    2: {
        bot: "Our certified personal trainers offer:\n\n🏋️ One-on-one customized training\n📊 Body composition analysis\n🎯 Personalized workout plans\n🥗 Nutrition guidance\n📈 Progress tracking\n\nFirst session free! Ready to transform?",
        suggestions: [
            "Book Free Session",
            "Trainer Profiles",
            "Pricing",
            "Back to Menu",
        ],
    },
    3: {
        bot: "Elite Gym Location:\n📍 Dubai, UAE\n\n⏰ Operating Hours:\nMon-Fri: 6:00 AM - 11:00 PM\nSat-Sun: 7:00 AM - 10:00 PM\nHolidays: 9:00 AM - 9:00 PM\n\n☎️ Call us: +971 00 000 0000\n📧 Email: info@elitegym.com",
        suggestions: [
            "Get Directions",
            "Call Now",
            "Email Us",
            "Back to Menu",
        ],
    },
    4: {
        bot: "Let's schedule your visit! 📅\n\nDrop by any time during our operating hours for a facility tour and FREE fitness assessment.\n\n👇 Choose your preferred contact method:",
        suggestions: [
            "Call Now",
            "WhatsApp Message",
            "Email Request",
            "Back to Menu",
        ],
    },
};

// ============================================
// DOCUMENT READY
// ============================================

document.addEventListener("DOMContentLoaded", function () {
    initializeApp();
});

function initializeApp() {
    // Initialize components
    setupFancybox();
    setupFloatingButtons();
    setupChatbot();
    setupFormValidation();
    setupToastNotifications();
    setupLazyLoading();
    setupSmoothScrolling();

    // Log initialization
    console.log("✅ Elite Gym App Initialized Successfully!");
}

// ============================================
// FANCYBOX INITIALIZATION
// ============================================

function setupFancybox() {
    if (typeof Fancybox !== 'undefined') {
        Fancybox.bind('[data-fancybox]', {
            on: {
                reveal: (fancybox, $slide) => {
                    console.log("✅ Fancybox opened");
                },
            },
        });
    }
}

// ============================================
// FLOATING BUTTONS (Animations removed)
// ============================================

function setupFloatingButtons() {
    // WhatsApp Button
    const whatsappBtn = createFloatingButton(
        "https://wa.me/971XXXXXXX?text=Hi%20I%27m%20interested%20in%20Elite%20Gym%20membership",
        '<i class="fab fa-whatsapp"></i>',
        "whatsapp-btn",
        "bottom: 100px; left: 20px;"
    );

    // Vibrating Call Button
    const callBtn = createFloatingButton(
        "tel:+97100000000",
        '<i class="fas fa-phone"></i>',
        "vibrating-call-btn",
        "bottom: 170px; left: 20px;"
    );

    // Chatbot Button
    const chatbotBtn = createFloatingButton(
        null,
        '<i class="fas fa-comments"></i>',
        "chatbot-btn-toggle",
        "bottom: 20px; right: 20px;"
    );

    if (chatbotBtn) {
        chatbotBtn.addEventListener("click", function () {
            const modal = new bootstrap.Modal(
                document.getElementById("chatbotModal")
            );
            modal.show();
        });
    }
}

function createFloatingButton(href, icon, className, styles) {
    const btn = document.createElement("a");
    btn.href = href || "javascript:void(0)";
    btn.className = className;
    btn.innerHTML = icon;
    btn.style.cssText = `
        position: fixed;
        ${styles}
        width: 60px;
        height: 60px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.8rem;
        color: #fff;
        text-decoration: none;
        z-index: 999;
        cursor: pointer;
        border: none;
        transition: all 0.3s ease;
    `;

    if (href) {
        btn.target = "_blank";
    }

    document.body.appendChild(btn);
    return btn;
}

// ============================================
// CHATBOT FUNCTIONALITY
// ============================================

function setupChatbot() {
    const chatbotModal = document.getElementById("chatbotModal");
    if (!chatbotModal) return;

    const chatbotBody = document.getElementById("chatbotBody");
    const chatbotSuggestions = document.getElementById("chatbotSuggestions");
    let currentOption = 0;

    // Attach click handlers to suggestion buttons
    document.querySelectorAll(".chatbot-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
            const option = this.getAttribute("data-option");
            handleChatbotOption(option);
        });
    });

    function handleChatbotOption(option) {
        currentOption = option;
        const response = chatbotResponses[option];

        if (!response) return;

        // Add user message
        addChatMessage(
            "user",
            chatbotSuggestions.textContent.trim().split("\n")[0]
        );

        // Simulate bot typing
        setTimeout(() => {
            // Add bot response
            addChatMessage("bot", response.bot);

            // Update suggestions
            updateChatbotSuggestions(response.suggestions);
        }, 500);
    }

    function addChatMessage(sender, text) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `chat-message ${
            sender === "bot" ? "bot-message" : "user-message"
        }`;

        const p = document.createElement("p");
        p.textContent = text;

        messageDiv.appendChild(p);
        chatbotBody.appendChild(messageDiv);

        // Scroll to bottom
        chatbotBody.scrollTop = chatbotBody.scrollHeight;
    }

    function updateChatbotSuggestions(suggestions) {
        chatbotSuggestions.innerHTML = "";

        suggestions.forEach((suggestion, index) => {
            const btn = document.createElement("button");
            btn.className = "btn btn-sm btn-outline-danger w-100 text-start chatbot-btn";
            btn.innerHTML = `<i class="fas fa-arrow-right me-2"></i>${suggestion}`;

            // Map suggestion text to option number
            let optionNum = "0";
            let isSpecialAction = false;

            if (
                suggestion.includes("Plan") ||
                suggestion.includes("Offer") ||
                suggestion.includes("Special") ||
                suggestion.includes("Compare")
            ) {
                optionNum = "1";
            } else if (
                suggestion.includes("Personal") ||
                suggestion.includes("Trainer") ||
                suggestion.includes("Pricing") ||
                suggestion.includes("Session")
            ) {
                optionNum = "2";
            } else if (
                suggestion.includes("Location") ||
                suggestion.includes("Direction") ||
                suggestion.includes("Hours")
            ) {
                optionNum = "3";
            } else if (
                suggestion.includes("Visit") ||
                suggestion.includes("Book") ||
                suggestion.includes("Schedule")
            ) {
                optionNum = "4";
            } else if (suggestion.includes("Call") && !suggestion.includes("WhatsApp")) {
                // Handle direct call
                isSpecialAction = true;
                btn.className = "btn btn-sm btn-danger w-100 text-start chatbot-btn";
                btn.innerHTML = `<i class="fas fa-phone me-2"></i>${suggestion}`;
                btn.style.background = "linear-gradient(135deg, #ff006e 0%, #fb5607 100%)";
                btn.addEventListener("click", function () {
                    window.location.href = "tel:+97100000000";
                });
            } else if (suggestion.includes("Email")) {
                // Handle email
                isSpecialAction = true;
                btn.className = "btn btn-sm btn-info w-100 text-start chatbot-btn";
                btn.innerHTML = `<i class="fas fa-envelope me-2"></i>${suggestion}`;
                btn.addEventListener("click", function () {
                    window.location.href = "mailto:info@elitegym.com?subject=Elite%20Gym%20Inquiry";
                });
            } else if (suggestion.includes("WhatsApp")) {
                // Handle WhatsApp
                isSpecialAction = true;
                btn.className = "btn btn-sm btn-success w-100 text-start chatbot-btn";
                btn.innerHTML = `<i class="fab fa-whatsapp me-2"></i>${suggestion}`;
                btn.addEventListener("click", function () {
                    window.open(
                        "https://wa.me/971XXXXXXX?text=Hi%20I%27m%20interested%20in%20Elite%20Gym",
                        "_blank"
                    );
                });
            } else if (suggestion.includes("Back")) {
                optionNum = "0";
            }

            if (!isSpecialAction) {
                btn.setAttribute("data-option", optionNum);
                btn.addEventListener("click", function () {
                    if (optionNum === "0") {
                        // Reset to initial menu
                        chatbotBody.innerHTML =
                            '<div class="chat-message bot-message"><p>👋 Back to main menu. How can I help?</p></div>';
                        updateChatbotSuggestions([
                            "View Membership Plans",
                            "Personal Training Info",
                            "Location & Hours",
                            "Book a Visit",
                        ]);
                    } else {
                        handleChatbotOption(optionNum);
                    }
                });
            }

            chatbotSuggestions.appendChild(btn);
        });
    }
}

// ============================================
// FORM VALIDATION
// ============================================

function setupFormValidation() {
    // This can be extended with actual form handling
    const forms = document.querySelectorAll("form");

    forms.forEach((form) => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            // Add validation feedback
            if (form.checkValidity() === false) {
                e.preventDefault();
                e.stopPropagation();
                showToast("Please fill all required fields", "error");
            } else {
                showToast("Form submitted successfully!", "success");
                form.reset();
            }

            form.classList.add("was-validated");
        });
    });
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

function setupToastNotifications() {
    if (!CONFIG.enableToastNotifications) return;

    // Show random purchase notifications
    setInterval(() => {
        const randomNotification =
            purchaseNotifications[
                Math.floor(Math.random() * purchaseNotifications.length)
            ];

        showPurchaseToast(randomNotification);
    }, CONFIG.toastShowInterval);
}

function showPurchaseToast(notification) {
    const toastHTML = `${notification.flag} <strong>${notification.name}</strong> Just ${notification.message}`;

    Toastify({
        text: toastHTML,
        duration: 4000,
        gravity: "bottom",
        position: "center",
        backgroundColor: "linear-gradient(135deg, #ff006e 0%, #fb5607 100%)",
        className: "toast-notification",
        stopOnFocus: true,
        close: true,
        escapeMarkup: false,
        onClick: function () {
            // Trigger some action on click
        },
    }).showToast();
}

function showToast(message, type = "info") {
    const bgColor = {
        success: "linear-gradient(135deg, #25d366 0%, #20ba5a 100%)",
        error: "linear-gradient(135deg, #ff006e 0%, #fb5607 100%)",
        info: "linear-gradient(135deg, #00b4d8 0%, #0077b6 100%)",
        warning: "linear-gradient(135deg, #ffb800 0%, #ff9500 100%)",
    };

    Toastify({
        text: message,
        duration: 3000,
        gravity: "bottom",
        position: "center",
        backgroundColor: bgColor[type] || bgColor.info,
        stopOnFocus: true,
        close: true,
    }).showToast();
}

// ============================================
// LAZY LOADING
// ============================================

function setupLazyLoading() {
    if ("IntersectionObserver" in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add("lazy-loaded");
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll("img[data-src]").forEach((img) => {
            imageObserver.observe(img);
        });
    }
}

// ============================================
// SMOOTH SCROLLING (Standard anchor navigation)
// ============================================

function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            const href = this.getAttribute("href");

            // Skip if href is just "#"
            if (href === "#") return;

            const target = document.querySelector(href);

            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });
}

// ============================================
// NAVBAR BACKGROUND ON SCROLL
// ============================================

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 100) {
        navbar.style.background = "rgba(10, 10, 10, 0.98)";
        navbar.style.boxShadow = "0 5px 20px rgba(0, 0, 0, 0.1)";
    } else {
        navbar.style.background = "rgba(10, 10, 10, 0.95)";
        navbar.style.boxShadow = "none";
    }
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener("keydown", function (e) {
    // Ctrl/Cmd + T to show Toast
    if ((e.ctrlKey || e.metaKey) && e.key === "t") {
        e.preventDefault();
        showToast("Elite Gym is ready to serve you! 💪", "info");
    }

    // Escape key to close chatbot modal
    if (e.key === "Escape") {
        const chatbotModal = document.getElementById("chatbotModal");
        if (chatbotModal) {
            const modal = bootstrap.Modal.getInstance(chatbotModal);
            if (modal) modal.hide();
        }
    }
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener(
    "resize",
    debounce(function () {
        // Window resize handled
    }, 250)
);

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Format currency
function formatCurrency(amount, currency = "AED") {
    return new Intl.NumberFormat("en-AE", {
        style: "currency",
        currency: currency,
        minimumFractionDigits: 0,
    }).format(amount);
}

// Get current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-AE", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

// Get current date
function getCurrentDate() {
    const now = new Date();
    return now.toLocaleDateString("en-AE");
}

// ============================================
// EVENT LISTENERS
// ============================================

// Call button in navbar
document.querySelectorAll(".call-btn-nav").forEach((btn) => {
    btn.addEventListener("click", function () {
        // Button click handled
    });
});

// Membership plan buttons
document.querySelectorAll(".plan-card .btn").forEach((btn) => {
    btn.addEventListener("click", function () {
        showToast("Opening membership form...", "info");
    });
});

// ============================================
// ANALYTICS & TRACKING
// ============================================

// Track page views
window.addEventListener("load", function () {
    console.log("📊 Page loaded at", getCurrentDate(), getCurrentTime());
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log(`👁️ User viewed section: ${sectionId}`);
        }
    });
});

document.querySelectorAll("section[id]").forEach((section) => {
    sectionObserver.observe(section);
});

// ============================================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ============================================

window.EliteGym = {
    showToast,
    showPurchaseToast,
    formatCurrency,
    getCurrentTime,
    getCurrentDate,
    debounce,
};

// ============================================
// MOBILE MENU CLOSE ON LINK CLICK
// ============================================

document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function () {
        const navbar = document.querySelector(".navbar-collapse");
        if (navbar.classList.contains("show")) {
            const toggler = document.querySelector(".navbar-toggler");
            toggler.click();
        }
    });
});

// ============================================
// DARK MODE TOGGLE (OPTIONAL)
// ============================================

// Uncomment if you want to add dark mode toggle
/*
function toggleDarkMode() {
    document.documentElement.style.colorScheme =
        document.documentElement.style.colorScheme === "dark" ? "light" : "dark";
}

window.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault();
        toggleDarkMode();
    }
});
*/

// ============================================
// DOCUMENT READY COMPLETE
// ============================================

console.log(
    "%c🏋️ Elite Gym Website v1.0",
    "color: #ff006e; font-size: 16px; font-weight: bold;"
);
console.log(
    "%cDesigned & Developed by Dilawar Pro 💖",
    "color: #fb5607; font-size: 12px;"
);
 let deferredPrompt;

  // Listen for the `beforeinstallprompt` event
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default mini-infobar from appearing
    deferredPrompt = e; // Save the event for later use
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block'; // Show the "Add to Home" button

    // Add click event listener to the button
    installButton.addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
          console.log('User accepted the install prompt');
        } else {
          console.log('User dismissed the install prompt');
        }
        deferredPrompt = null; // Reset the deferred prompt
      }
    });
  });

  // Hide the button if the app is already installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA installed');
    const installButton = document.getElementById('install-button');
    installButton.style.display = 'none'; // Hide the "Add to Home" button
  });

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(registration => {
          console.log("Service Worker registered with scope:", registration.scope);
        })
        .catch(error => {
          console.error("Service Worker registration failed:", error);
        });
    });
  }
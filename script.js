// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
    }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed header
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Mortgage Calculator Function
function calculateMortgage() {
    // Get input values
    const housePrice = parseFloat(document.getElementById('housePrice').value) || 0;
    const ownFunds = parseFloat(document.getElementById('ownFunds').value) || 0;
    const interestRate = parseFloat(document.getElementById('interestRate').value) || 0;
    const numParticipants = parseInt(document.getElementById('numParticipants').value) || 2;

    // Validate inputs
    if (housePrice <= 0) {
        alert('Voer alstublieft een geldige woningprijs in.');
        return;
    }

    // Calculate mortgage amount
    const mortgageAmount = housePrice - ownFunds;

    // Calculate monthly payment (simplified annuity calculation)
    // Monthly interest rate
    const monthlyRate = (interestRate / 100) / 12;
    // Number of payments (30 years = 360 months)
    const numPayments = 360;

    let monthlyPayment;
    if (monthlyRate === 0) {
        // If interest rate is 0, simple division
        monthlyPayment = mortgageAmount / numPayments;
    } else {
        // Annuity formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
        const x = Math.pow(1 + monthlyRate, numPayments);
        monthlyPayment = mortgageAmount * (monthlyRate * x) / (x - 1);
    }

    // Calculate per person
    const perPersonPayment = monthlyPayment / numParticipants;
    const ownershipPercentage = (100 / numParticipants).toFixed(1);

    // Format numbers as currency
    const formatCurrency = (amount) => {
        return '€ ' + amount.toLocaleString('nl-NL', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });
    };

    // Update results
    document.getElementById('mortgageAmount').textContent = formatCurrency(mortgageAmount);
    document.getElementById('monthlyPayment').textContent = formatCurrency(monthlyPayment);
    document.getElementById('perPersonPayment').textContent = formatCurrency(perPersonPayment);
    document.getElementById('ownershipPercentage').textContent = ownershipPercentage + '%';

    // Show results with animation
    const resultsDiv = document.getElementById('calculatorResults');
    resultsDiv.style.opacity = '0';
    resultsDiv.style.transform = 'translateY(20px)';

    setTimeout(() => {
        resultsDiv.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        resultsDiv.style.opacity = '1';
        resultsDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Calculate on page load with default values
window.addEventListener('load', () => {
    calculateMortgage();
});

// Recalculate when inputs change
document.getElementById('housePrice').addEventListener('input', calculateMortgage);
document.getElementById('ownFunds').addEventListener('input', calculateMortgage);
document.getElementById('interestRate').addEventListener('input', calculateMortgage);
document.getElementById('numParticipants').addEventListener('change', calculateMortgage);

// FAQ Accordion Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        privacy: document.getElementById('privacy').checked
    };

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
        showFormMessage('Vul alstublieft alle verplichte velden in.', 'error');
        return;
    }

    if (!formData.privacy) {
        showFormMessage('U moet akkoord gaan met de privacyverklaring.', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Voer alstublieft een geldig e-mailadres in.', 'error');
        return;
    }

    // Simulate form submission (in production, this would send to a server)
    // For now, we'll just show a success message
    simulateFormSubmission(formData);
});

function simulateFormSubmission(formData) {
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Verzenden...';
    submitButton.disabled = true;

    // Simulate network delay
    setTimeout(() => {
        // In production, you would send this data to your backend
        console.log('Form data:', formData);

        // Show success message
        showFormMessage('Bedankt voor uw bericht! We nemen zo spoedig mogelijk contact met u op.', 'success');

        // Reset form
        contactForm.reset();

        // Reset button
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;

        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 1500);
}

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    // Hide message after 5 seconds for error messages
    if (type === 'error') {
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
}

// Add active state to navigation on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add shadow to navbar on scroll
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
            const sectionId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.style.borderBottomColor = 'transparent';
                link.style.color = '';

                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.borderBottomColor = '#003d82';
                    link.style.color = '#003d82';
                }
            });
        }
    });

    lastScrollTop = scrollTop;
});

// Add fade-in animation for elements when they come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
window.addEventListener('load', () => {
    const animatedElements = document.querySelectorAll('.content-block, .alternative-card, .info-box, .comparison-table-wrapper');

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add number formatting for calculator inputs
const currencyInputs = ['housePrice', 'ownFunds'];

currencyInputs.forEach(inputId => {
    const input = document.getElementById(inputId);

    input.addEventListener('blur', function() {
        // Format the number with thousand separators when user leaves the field
        const value = parseInt(this.value.replace(/\D/g, '')) || 0;
        this.value = value;
    });
});

// Prevent non-numeric input in number fields
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', (e) => {
        // Allow: backspace, delete, tab, escape, enter, decimal point
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

// Print-friendly styling toggle
window.addEventListener('beforeprint', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.add('active');
    });
});

window.addEventListener('afterprint', () => {
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
});

// Add year to footer dynamically
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText) {
    footerText.textContent = `© ${currentYear} Hypotheekdelen.nl - Alle rechten voorbehouden`;
}

// Accessibility: Allow keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            question.click();
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Hypotheekdelen.nl - Website successfully loaded');

/**
 * VisionUI Portfolio Demo - Interactive Features
 * Showcases different application types and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    initPortfolioDemo();
});

function initPortfolioDemo() {
    // Initialize all demo features
    initAppPreviews();
    initInteractiveElements();
    initCategoryFilters();
    initAnimationShowcase();

    console.log('🎨 VisionUI Portfolio Demo initialized');
}

// ==================================================
// APP PREVIEW INTERACTIONS
// ==================================================

function initAppPreviews() {
    const appCards = document.querySelectorAll('.app-card');
    const featuredApp = document.querySelector('.featured-app');

    // Add hover effects to app cards
    appCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
            // Pause other animations temporarily
            appCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.animationPlayState = 'paused';
                }
            });
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
            // Resume animations
            appCards.forEach(otherCard => {
                otherCard.style.animationPlayState = 'running';
            });
        });

        // Add click to expand preview
        card.addEventListener('click', function() {
            expandAppPreview(this);
        });
    });

    // Featured app interactions
    if (featuredApp) {
        initFeaturedAppInteractions(featuredApp);
    }
}

function initFeaturedAppInteractions(featuredApp) {
    const tradingChart = featuredApp.querySelector('.chart-area-large');
    const priceCandles = featuredApp.querySelector('.price-candles');
    const quickActions = featuredApp.querySelector('.quick-actions');

    // Simulate live trading data
    let priceIndex = 0;
    const prices = [45000, 45120, 44980, 45200, 45350, 45180, 45400];

    function updateTradingData() {
        if (priceIndex < prices.length - 1) {
            priceIndex++;
        } else {
            // Generate new random price movement
            const lastPrice = prices[prices.length - 1];
            const change = (Math.random() - 0.5) * 1000; // ±500 range
            prices.push(lastPrice + change);
        }

        // Update price display
        const balanceValue = featuredApp.querySelector('.balance-value');
        if (balanceValue) {
            const newBalance = 127459.32 + (prices[prices.length - 1] - prices[0]) * 2.5;
            balanceValue.textContent = `$${newBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        }

        // Update PNL
        const pnlElements = featuredApp.querySelectorAll('.pnl');
        pnlElements.forEach((pnl, index) => {
            const change = (Math.random() - 0.5) * 4; // ±2% range
            const isPositive = change >= 0;
            pnl.className = `pnl ${isPositive ? 'positive' : 'negative'}`;
            pnl.textContent = `${isPositive ? '+' : ''}${change.toFixed(2)}%`;
        });

        // Animate candles
        animateCandles(priceCandles);
    }

    // Update trading data every 3 seconds
    setInterval(updateTradingData, 3000);

    // Quick action buttons
    const actionButtons = quickActions.querySelectorAll('.action-btn');
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            // Show order confirmation
            showOrderNotification(this.classList.contains('buy') ? 'Compra' : 'Venta');
        });
    });
}

function animateCandles(candlesContainer) {
    const candles = candlesContainer.querySelectorAll('.candle');

    candles.forEach((candle, index) => {
        // Random height animation
        const newHeight = Math.random() * 40 + 20; // 20-60px range
        candle.style.height = `${newHeight}px`;

        // Color based on price movement
        if (Math.random() > 0.5) {
            candle.className = 'candle green';
        } else {
            candle.className = 'candle red';
        }

        // Stagger animation
        candle.style.animationDelay = `${index * 0.1}s`;
    });
}

function showOrderNotification(orderType) {
    const notification = document.createElement('div');
    notification.className = 'order-notification';
    notification.innerHTML = `
        <div class="notification-icon">📈</div>
        <div class="notification-content">
            <div class="notification-title">Orden Ejecutada</div>
            <div class="notification-message">${orderType} de BTC/USD completada</div>
        </div>
        <div class="notification-close">×</div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 4000);

    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}

function expandAppPreview(card) {
    const modal = document.createElement('div');
    modal.className = 'app-modal';
    modal.innerHTML = `
        <div class="modal-backdrop"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${card.querySelector('.app-title').textContent}</h3>
                <button class="modal-close">×</button>
            </div>
            <div class="modal-body">
                <div class="modal-app-preview">
                    ${card.querySelector('.app-visual').innerHTML}
                </div>
                <div class="modal-app-info">
                    <p class="modal-description">${card.querySelector('.app-description').textContent}</p>
                    <div class="modal-features">
                        ${card.querySelector('.app-features').innerHTML}
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary">Ver Demo Completa</button>
                        <button class="btn btn-secondary">Descargar Plantilla</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Animate in
    setTimeout(() => modal.classList.add('show'), 10);

    // Close modal
    const closeBtn = modal.querySelector('.modal-close');
    const backdrop = modal.querySelector('.modal-backdrop');

    const closeModal = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };

    closeBtn.addEventListener('click', closeModal);
    backdrop.addEventListener('click', closeModal);
}

// ==================================================
// INTERACTIVE ELEMENTS
// ==================================================

function initInteractiveElements() {
    // Progress bars animation
    const progressBars = document.querySelectorAll('.progress-fill, .volume-fill, .energy-fill');
    progressBars.forEach(bar => {
        animateProgressBar(bar);
    });

    // Metric counters
    const metricValues = document.querySelectorAll('.metric-value');
    metricValues.forEach(value => {
        if (value.textContent.includes('$') || value.textContent.includes('%') || /^\d+$/.test(value.textContent.replace(/[,$%]/g, ''))) {
            animateCounter(value);
        }
    });

    // Interactive switches
    const switches = document.querySelectorAll('.switch input');
    switches.forEach(switchEl => {
        switchEl.addEventListener('change', function() {
            const status = this.parentNode.nextElementSibling;
            if (status) {
                status.textContent = this.checked ? 'Encendido' : 'Apagado';
                status.className = this.checked ? 'online' : '';
            }
        });
    });

    // Temperature controls
    const tempButtons = document.querySelectorAll('.temp-btn');
    tempButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tempValue = this.parentNode.querySelector('.temp-value');
            const currentTemp = parseInt(tempValue.textContent);
            const newTemp = this.textContent === '+' ? currentTemp + 1 : currentTemp - 1;

            if (newTemp >= 15 && newTemp <= 30) {
                tempValue.textContent = `${newTemp}°C`;
                animateTemperatureChange(tempValue);
            }
        });
    });

    // Playlist interactions
    const playlistItems = document.querySelectorAll('.playlist-item');
    playlistItems.forEach(item => {
        item.addEventListener('click', function() {
            playlistItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function animateProgressBar(bar) {
    const targetWidth = Math.random() * 60 + 20; // 20-80% range
    bar.style.width = '0%';

    setTimeout(() => {
        bar.style.transition = 'width 1.5s ease-out';
        bar.style.width = `${targetWidth}%`;
    }, 500);
}

function animateCounter(element) {
    const targetValue = element.textContent;
    const isMoney = targetValue.includes('$');
    const isPercentage = targetValue.includes('%');
    const numericValue = parseFloat(targetValue.replace(/[,$%]/g, ''));

    let currentValue = 0;
    const increment = numericValue / 50; // 50 steps
    let steps = 0;

    const timer = setInterval(() => {
        steps++;
        currentValue += increment;

        if (steps >= 50) {
            currentValue = numericValue;
            clearInterval(timer);
        }

        let displayValue;
        if (isMoney) {
            displayValue = `$${currentValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
        } else if (isPercentage) {
            displayValue = `${currentValue.toFixed(1)}%`;
        } else {
            displayValue = Math.round(currentValue).toLocaleString();
        }

        element.textContent = displayValue;
    }, 30);
}

function animateTemperatureChange(element) {
    element.style.transform = 'scale(1.2)';
    element.style.color = 'var(--primary-color)';

    setTimeout(() => {
        element.style.transform = '';
        element.style.color = '';
    }, 300);
}

// ==================================================
// CATEGORY FILTERS
// ==================================================

function initCategoryFilters() {
    const categoryCards = document.querySelectorAll('.category-card');

    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove active class from all cards
            categoryCards.forEach(c => c.classList.remove('active'));
            // Add active class to clicked card
            this.classList.add('active');

            // Filter apps (simulation)
            const category = this.querySelector('.category-title').textContent.toLowerCase();
            filterAppsByCategory(category);
        });

        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

function filterAppsByCategory(category) {
    const appCards = document.querySelectorAll('.app-card');
    const categoryMap = {
        'business & analytics': ['nova analytics', 'quantum trading platform'],
        'multimedia & creative': ['aether music player', 'pixel forge studio'],
        'herramientas & utilidades': ['codecraft ide'],
        'entretenimiento': [],
        'salud & fitness': ['vitaltrack pro'],
        'industrial & automotive': ['smarthome hub'],
        'educación & learning': [],
        'ciencia & investigación': []
    };

    const relevantApps = categoryMap[category] || [];

    appCards.forEach(card => {
        const appTitle = card.querySelector('.app-title').textContent.toLowerCase();

        if (relevantApps.some(app => appTitle.includes(app.split(' ')[0]))) {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
            card.style.pointerEvents = 'auto';
        } else {
            card.style.opacity = '0.3';
            card.style.transform = 'scale(0.95)';
            card.style.pointerEvents = 'none';
        }
    });
}

// ==================================================
// ANIMATION SHOWCASE
// ==================================================

function initAnimationShowcase() {
    // Code editor typing effect
    const codeLines = document.querySelectorAll('.code-line');
    let currentLine = 0;

    function typeCodeLine() {
        if (currentLine < codeLines.length) {
            const line = codeLines[currentLine];
            line.style.opacity = '1';
            currentLine++;

            setTimeout(typeCodeLine, 500);
        }
    }

    // Start typing animation when code editor is visible
    const codeEditor = document.querySelector('.code-editor');
    if (codeEditor) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeCodeLine, 1000);
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(codeEditor);
    }

    // Dynamic chart animation
    const chartLines = document.querySelectorAll('.chart-line');
    chartLines.forEach(line => {
        animateChartLine(line);
    });

    // Energy bars animation
    const energyBars = document.querySelectorAll('.energy-bar');
    energyBars.forEach((bar, index) => {
        bar.style.animationDelay = `${index * 0.2}s`;
        animateEnergyBar(bar);
    });

    // Spinning album art
    const albumArts = document.querySelectorAll('.album-cover');
    albumArts.forEach(art => {
        if (art.classList.contains('animate-spin')) {
            art.style.animation = 'spin 3s linear infinite';
        }
    });

    // Pulsing elements
    const pulsingElements = document.querySelectorAll('.progress-fill, .volume-fill');
    pulsingElements.forEach(element => {
        element.classList.add('animate-pulse');
    });
}

function animateChartLine(line) {
    const points = [];
    for (let i = 0; i < 20; i++) {
        points.push(Math.random() * 100);
    }

    let pathData = 'M 0 50';
    points.forEach((point, index) => {
        const x = (index / points.length) * 100;
        const y = 50 + (point - 50) * 0.8; // Scale down the variation
        pathData += ` L ${x} ${y}`;
    });

    // Create SVG path
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.style.position = 'absolute';
    svg.style.top = '0';
    svg.style.left = '0';

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', 'var(--primary-color)');
    path.setAttribute('stroke-width', '2');
    path.setAttribute('fill', 'none');
    path.style.strokeDasharray = '1000';
    path.style.strokeDashoffset = '1000';
    path.style.animation = 'drawLine 2s ease-out forwards';

    svg.appendChild(path);
    line.appendChild(svg);
}

function animateEnergyBar(bar) {
    const targetHeight = Math.random() * 80 + 20; // 20-100% range
    bar.style.height = '0%';

    setTimeout(() => {
        bar.style.transition = 'height 1s ease-out';
        bar.style.height = `${targetHeight}%`;
    }, Math.random() * 1000);
}

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

function createParticleEffect(container, count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (Math.random() * 2 + 2) + 's';

        container.appendChild(particle);

        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, 5000);
    }
}

// ==================================================
// CSS ANIMATIONS
// ==================================================

// Add CSS for portfolio-specific animations
const portfolioStyles = document.createElement('style');
portfolioStyles.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    @keyframes drawLine {
        to {
            stroke-dashoffset: 0;
        }
    }

    @keyframes floatUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    .app-card {
        animation: floatUp 0.8s ease-out both;
    }

    .app-card:nth-child(1) { animation-delay: 0.1s; }
    .app-card:nth-child(2) { animation-delay: 0.2s; }
    .app-card:nth-child(3) { animation-delay: 0.3s; }
    .app-card:nth-child(4) { animation-delay: 0.4s; }
    .app-card:nth-child(5) { animation-delay: 0.5s; }
    .app-card:nth-child(6) { animation-delay: 0.6s; }

    .category-card {
        transition: all 0.3s ease;
        cursor: pointer;
    }

    .category-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
    }

    .category-card.active {
        border-color: var(--primary-color);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    }

    .case-study-card {
        animation: slideInLeft 0.8s ease-out both;
    }

    .case-study-card:nth-child(1) { animation-delay: 0.1s; }
    .case-study-card:nth-child(2) { animation-delay: 0.3s; }
    .case-study-card:nth-child(3) { animation-delay: 0.5s; }

    .floating-particle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--primary-color);
        border-radius: 50%;
        animation: floatUp 3s ease-out infinite;
        pointer-events: none;
    }

    .animate-pulse {
        animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0.6;
        }
    }

    .animate-wave {
        animation: wave 2s ease-in-out infinite;
    }

    @keyframes wave {
        0%, 100% {
            transform: scaleY(1);
        }
        50% {
            transform: scaleY(1.2);
        }
    }

    .order-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-lg);
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }

    .order-notification.show {
        transform: translateX(0);
    }

    .notification-icon {
        font-size: 1.5rem;
        flex-shrink: 0;
    }

    .notification-content {
        flex: 1;
    }

    .notification-title {
        font-weight: 600;
        color: var(--text-primary);
        font-size: 0.875rem;
    }

    .notification-message {
        color: var(--text-secondary);
        font-size: 0.75rem;
    }

    .notification-close {
        cursor: pointer;
        color: var(--text-tertiary);
        font-size: 1.25rem;
        line-height: 1;
        padding: 0 0 0 var(--spacing-sm);
    }

    .app-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    .app-modal.show {
        opacity: 1;
    }

    .modal-backdrop {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
    }

    .modal-content {
        position: relative;
        background: var(--bg-card);
        border-radius: var(--radius-xl);
        border: 1px solid var(--border-primary);
        max-width: 800px;
        max-height: 80vh;
        overflow: hidden;
        transform: scale(0.9);
        transition: transform 0.3s ease;
    }

    .app-modal.show .modal-content {
        transform: scale(1);
    }

    .modal-header {
        padding: var(--spacing-lg);
        border-bottom: 1px solid var(--border-primary);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .modal-header h3 {
        color: var(--text-primary);
        margin: 0;
        font-size: 1.25rem;
    }

    .modal-close {
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: all 0.2s ease;
    }

    .modal-close:hover {
        background: var(--bg-secondary);
        color: var(--text-primary);
    }

    .modal-body {
        padding: var(--spacing-lg);
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--spacing-lg);
        max-height: calc(80vh - 80px);
        overflow-y: auto;
    }

    .modal-app-preview {
        background: var(--bg-secondary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        border: 1px solid var(--border-primary);
    }

    .modal-app-info {
        display: flex;
        flex-direction: column;
        gap: var(--spacing-md);
    }

    .modal-description {
        color: var(--text-secondary);
        line-height: 1.6;
    }

    .modal-features {
        display: flex;
        flex-wrap: wrap;
        gap: var(--spacing-xs);
    }

    .modal-actions {
        display: flex;
        gap: var(--spacing-md);
        margin-top: var(--spacing-md);
    }

    .modal-actions .btn {
        flex: 1;
    }

    @media (max-width: 768px) {
        .modal-body {
            grid-template-columns: 1fr;
        }

        .order-notification {
            left: 20px;
            right: 20px;
            max-width: none;
        }
    }

    /* Enhanced app card hover effects */
    .app-card.hovered {
        transform: scale(1.02);
        z-index: 10;
    }

    .app-card.hovered .app-visual {
        transform: scale(1.05);
    }

    /* Progress ring animation */
    .progress-ring {
        transform: rotate(-90deg);
        transition: stroke-dasharray 1s ease;
    }

    .progress-fill {
        stroke-dasharray: 0 100;
        animation: progressFill 2s ease-out forwards;
    }

    @keyframes progressFill {
        to {
            stroke-dasharray: 75 100; /* 75% progress */
        }
    }

    /* Mini app showcase */
    .mini-app {
        background: var(--bg-card);
        border-radius: var(--radius-lg);
        border: 1px solid var(--border-primary);
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .mini-app:hover {
        transform: scale(1.05);
        border-color: var(--primary-color);
    }

    .mini-header {
        background: var(--bg-tertiary);
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-secondary);
        border-bottom: 1px solid var(--border-primary);
    }

    .mini-content {
        padding: var(--spacing-sm);
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .mini-chart, .mini-player, .mini-stats, .mini-canvas {
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        border-radius: var(--radius-sm);
        opacity: 0.8;
    }

    /* Code editor cursor */
    .code-editor {
        position: relative;
    }

    .code-editor::after {
        content: '';
        position: absolute;
        width: 2px;
        height: 1.2em;
        background: var(--primary-color);
        animation: blink 1s infinite;
        left: 50px;
        top: 50px;
    }

    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }

    /* Enhanced trading interface */
    .candle {
        transition: all 0.5s ease;
        border-radius: 2px;
    }

    .candle.green {
        background: linear-gradient(180deg, #28CA42, #1E8E33);
        box-shadow: 0 0 5px rgba(40, 202, 66, 0.5);
    }

    .candle.red {
        background: linear-gradient(180deg, #FF6B35, #E55A2B);
        box-shadow: 0 0 5px rgba(255, 107, 53, 0.5);
    }

    /* Security status animation */
    .security-status.armed {
        animation: armedPulse 2s ease-in-out infinite;
    }

    @keyframes armedPulse {
        0%, 100% {
            box-shadow: 0 0 0 0 rgba(40, 202, 66, 0.7);
        }
        50% {
            box-shadow: 0 0 0 5px rgba(40, 202, 66, 0);
        }
    }
`;

document.head.appendChild(portfolioStyles);

console.log('🎯 VisionUI Portfolio Demo features loaded successfully');

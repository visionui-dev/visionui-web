/**
 * VisionUI Designer Demo - Interactive Features
 * Demonstrates the designer interface functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    initDesignerDemo();
});

function initDesignerDemo() {
    // Initialize all demo features
    initComponentDragging();
    initCanvasInteractions();
    initPropertyEditor();
    initColorPicker();
    initAnimationDemo();

    console.log('🎨 VisionUI Designer Demo initialized');
}

// ==================================================
// COMPONENT DRAGGING SYSTEM
// ==================================================

function initComponentDragging() {
    const dragItems = document.querySelectorAll('.drag-item');
    const canvas = document.querySelector('.canvas-area');

    if (!canvas) return;

    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.setAttribute('draggable', 'true');
    });

    canvas.addEventListener('dragover', handleDragOver);
    canvas.addEventListener('drop', handleDrop);

    let draggedElement = null;

    function handleDragStart(e) {
        draggedElement = this;
        this.classList.add('dragging');

        // Create drag image
        const dragImage = this.cloneNode(true);
        dragImage.style.opacity = '0.8';
        dragImage.style.transform = 'scale(0.8)';
        e.dataTransfer.setDragImage(dragImage, 0, 0);

        e.dataTransfer.effectAllowed = 'copy';
        e.dataTransfer.setData('text/plain', this.querySelector('span').textContent);
    }

    function handleDragEnd(e) {
        this.classList.remove('dragging');
        draggedElement = null;
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';

        // Add visual feedback
        canvas.classList.add('drag-over');
    }

    function handleDrop(e) {
        e.preventDefault();
        canvas.classList.remove('drag-over');

        if (!draggedElement) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Create new element on canvas
        createCanvasElement(draggedElement, x, y);

        // Visual feedback
        showDropFeedback(x, y);
    }

    function createCanvasElement(sourceElement, x, y) {
        const componentType = sourceElement.querySelector('span').textContent.toLowerCase().replace(' ', '-');
        const element = document.createElement('div');
        element.className = `canvas-element ${componentType}-element`;
        element.style.left = `${x}px`;
        element.style.top = `${y}px`;

        // Add selection handles
        element.innerHTML = `
            <div class="element-selection"></div>
            <div class="element-content">${sourceElement.querySelector('span').textContent}</div>
            <div class="element-handles">
                <div class="handle nw"></div>
                <div class="handle ne"></div>
                <div class="handle sw"></div>
                <div class="handle se"></div>
            </div>
        `;

        canvas.appendChild(element);

        // Make it selectable
        element.addEventListener('click', () => selectElement(element));

        // Add animation
        element.style.animation = 'elementDrop 0.3s ease-out';
    }

    function showDropFeedback(x, y) {
        const feedback = document.createElement('div');
        feedback.className = 'drop-feedback';
        feedback.style.left = `${x - 25}px`;
        feedback.style.top = `${y - 25}px`;

        feedback.innerHTML = `
            <div class="feedback-pulse"></div>
            <div class="feedback-check">✓</div>
        `;

        canvas.appendChild(feedback);

        setTimeout(() => {
            feedback.remove();
        }, 1000);
    }
}

// ==================================================
// CANVAS INTERACTIONS
// ==================================================

function initCanvasInteractions() {
    const canvas = document.querySelector('.canvas-area');
    const elements = document.querySelectorAll('.canvas-element');

    if (!canvas) return;

    let selectedElement = null;
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    // Element selection
    elements.forEach(element => {
        element.addEventListener('mousedown', (e) => {
            selectElement(element);
            startDrag(e, element);
        });
    });

    // Canvas click to deselect
    canvas.addEventListener('click', (e) => {
        if (e.target === canvas) {
            deselectAll();
        }
    });

    function selectElement(element) {
        // Remove previous selection
        deselectAll();

        // Select new element
        element.classList.add('selected');
        selectedElement = element;

        // Show selection handles
        const handles = element.querySelector('.element-handles');
        if (handles) {
            handles.style.display = 'block';
        }

        // Update property panel
        updatePropertyPanel(element);
    }

    function deselectAll() {
        document.querySelectorAll('.canvas-element.selected').forEach(el => {
            el.classList.remove('selected');
            const handles = el.querySelector('.element-handles');
            if (handles) {
                handles.style.display = 'none';
            }
        });
        selectedElement = null;
    }

    function startDrag(e, element) {
        isDragging = true;
        const rect = element.getBoundingClientRect();
        dragOffset.x = e.clientX - rect.left;
        dragOffset.y = e.clientY - rect.top;

        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
    }

    function drag(e) {
        if (!isDragging || !selectedElement) return;

        const canvasRect = canvas.getBoundingClientRect();
        const newX = e.clientX - canvasRect.left - dragOffset.x;
        const newY = e.clientY - canvasRect.top - dragOffset.y;

        // Constrain to canvas bounds
        const maxX = canvasRect.width - selectedElement.offsetWidth;
        const maxY = canvasRect.height - selectedElement.offsetHeight;

        selectedElement.style.left = `${Math.max(0, Math.min(newX, maxX))}px`;
        selectedElement.style.top = `${Math.max(0, Math.min(newY, maxY))}px`;

        // Update alignment guides
        updateAlignmentGuides(selectedElement);
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', drag);
        document.removeEventListener('mouseup', stopDrag);
    }

    function updateAlignmentGuides(element) {
        const guides = canvas.querySelector('.alignment-guides');
        if (!guides) return;

        const rect = element.getBoundingClientRect();
        const canvasRect = canvas.getBoundingClientRect();

        // Simple center alignment guide
        const centerX = canvasRect.width / 2;
        const centerY = canvasRect.height / 2;
        const elementCenterX = rect.left + rect.width / 2 - canvasRect.left;
        const elementCenterY = rect.top + rect.height / 2 - canvasRect.top;

        const horizontalGuide = guides.querySelector('.guide-line.horizontal');
        const verticalGuide = guides.querySelector('.guide-line.vertical');

        if (Math.abs(elementCenterX - centerX) < 10) {
            verticalGuide.style.display = 'block';
            verticalGuide.style.left = `${centerX}px`;
        } else {
            verticalGuide.style.display = 'none';
        }

        if (Math.abs(elementCenterY - centerY) < 10) {
            horizontalGuide.style.display = 'block';
            horizontalGuide.style.top = `${centerY}px`;
        } else {
            horizontalGuide.style.display = 'none';
        }
    }
}

// ==================================================
// PROPERTY EDITOR
// ==================================================

function initPropertyEditor() {
    const propertyInputs = document.querySelectorAll('.property-input, .property-slider, .property-value');
    const colorInputs = document.querySelectorAll('.color-input');

    propertyInputs.forEach(input => {
        input.addEventListener('input', updateElementStyle);
        input.addEventListener('change', updateElementStyle);
    });

    colorInputs.forEach(input => {
        input.addEventListener('input', updateElementColor);
        input.addEventListener('change', updateElementColor);
    });

    function updateElementStyle(e) {
        const selectedElement = document.querySelector('.canvas-element.selected');
        if (!selectedElement) return;

        const property = e.target.closest('.property-row').querySelector('label').textContent.toLowerCase();

        switch (property) {
            case 'font size':
                selectedElement.style.fontSize = e.target.value + 'px';
                break;
            case 'border radius':
                selectedElement.style.borderRadius = e.target.value + 'px';
                break;
        }
    }

    function updateElementColor(e) {
        const selectedElement = document.querySelector('.canvas-element.selected');
        if (!selectedElement) return;

        selectedElement.style.background = `linear-gradient(135deg, ${e.target.value}, #0000FF)`;
    }
}

function updatePropertyPanel(element) {
    // Update property panel values based on selected element
    const fontSizeInput = document.querySelector('input[type="number"][min="8"]');
    const borderRadiusSlider = document.querySelector('input[type="range"]');

    if (fontSizeInput) {
        const computedStyle = window.getComputedStyle(element);
        fontSizeInput.value = parseInt(computedStyle.fontSize);
    }

    if (borderRadiusSlider) {
        const computedStyle = window.getComputedStyle(element);
        borderRadiusSlider.value = parseInt(computedStyle.borderRadius);
    }
}

// ==================================================
// COLOR PICKER
// ==================================================

function initColorPicker() {
    const colorSwatches = document.querySelectorAll('.color-swatch');

    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Simple color picker simulation
            const colors = ['#00FFFF', '#FF00FF', '#FFFF00', '#00FF00', '#FF0000', '#0000FF'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];

            this.style.background = `linear-gradient(135deg, ${randomColor}, #0000FF)`;

            // Update corresponding input
            const input = this.parentNode.querySelector('.color-input');
            if (input) {
                input.value = randomColor;
            }

            // Update selected element
            const selectedElement = document.querySelector('.canvas-element.selected');
            if (selectedElement) {
                selectedElement.style.background = `linear-gradient(135deg, ${randomColor}, #0000FF)`;
            }
        });
    });
}

// ==================================================
// ANIMATION DEMO
// ==================================================

function initAnimationDemo() {
    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    });

    // Observe animated elements
    const animatedElements = document.querySelectorAll('.workflow-step, .interface-panel, .example-card');
    animatedElements.forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });

    // Add hover animations to components
    const componentItems = document.querySelectorAll('.component-item');
    componentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 255, 255, 0.2)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Dynamic background animation
    const canvasArea = document.querySelector('.canvas-area');
    if (canvasArea) {
        let animationId;
        let time = 0;

        function animateBackground() {
            time += 0.01;
            const hue = (time * 10) % 360;
            canvasArea.style.background = `
                radial-gradient(circle at 20% 20%, hsla(${hue}, 70%, 50%, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, hsla(${hue + 120}, 70%, 50%, 0.1) 0%, transparent 50%),
                var(--bg-tertiary)
            `;
            animationId = requestAnimationFrame(animateBackground);
        }

        // Start animation when canvas is visible
        const canvasObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateBackground();
                } else {
                    cancelAnimationFrame(animationId);
                }
            });
        });

        canvasObserver.observe(canvasArea);
    }
}

// ==================================================
// UTILITY FUNCTIONS
// ==================================================

function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.designer-notification');
    existingNotifications.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `designer-notification designer-notification-${type}`;

    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '⚠️'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================================================
// CSS ANIMATIONS
// ==================================================

// Add CSS for demo-specific animations
const demoStyles = document.createElement('style');
demoStyles.textContent = `
    @keyframes elementDrop {
        0% {
            transform: scale(0.8);
            opacity: 0;
        }
        50% {
            transform: scale(1.1);
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes dropFeedback {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    .drop-feedback {
        position: absolute;
        pointer-events: none;
        z-index: 1000;
    }

    .feedback-pulse {
        width: 50px;
        height: 50px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        animation: dropFeedback 1s ease-out;
    }

    .feedback-check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--primary-color);
        font-size: 24px;
        font-weight: bold;
        animation: fadeIn 0.5s ease-out 0.2s both;
    }

    .canvas-element.selected {
        box-shadow: 0 0 0 2px var(--primary-color), 0 4px 12px rgba(0, 255, 255, 0.3);
    }

    .element-handles {
        display: none;
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        pointer-events: none;
    }

    .element-handles .handle {
        position: absolute;
        width: 8px;
        height: 8px;
        background: var(--primary-color);
        border: 2px solid var(--bg-primary);
        border-radius: 50%;
        pointer-events: auto;
        cursor: pointer;
    }

    .handle.nw { top: -4px; left: -4px; cursor: nw-resize; }
    .handle.ne { top: -4px; right: -4px; cursor: ne-resize; }
    .handle.sw { bottom: -4px; left: -4px; cursor: sw-resize; }
    .handle.se { bottom: -4px; right: -4px; cursor: se-resize; }

    .alignment-guides {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    }

    .guide-line {
        position: absolute;
        background: var(--primary-color);
        opacity: 0.7;
    }

    .guide-line.horizontal {
        height: 1px;
        left: 0;
        right: 0;
        display: none;
    }

    .guide-line.vertical {
        width: 1px;
        top: 0;
        bottom: 0;
        display: none;
    }

    .canvas-area.drag-over {
        background: rgba(0, 255, 255, 0.1);
        border: 2px dashed var(--primary-color);
    }

    .component-item.dragging {
        opacity: 0.5;
        transform: scale(0.95);
    }

    .designer-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-lg);
        padding: var(--spacing-md);
        box-shadow: var(--shadow-lg);
        transform: translateX(400px);
        transition: transform 0.3s ease;
        z-index: 10000;
        max-width: 300px;
    }

    .designer-notification.show {
        transform: translateX(0);
    }

    .designer-notification-success {
        border-color: #28CA42;
    }

    .designer-notification-error {
        border-color: #FF6B35;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .notification-icon {
        font-size: 1.25rem;
        flex-shrink: 0;
    }

    .notification-message {
        color: var(--text-primary);
        font-size: 0.875rem;
    }

    .toggle-switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
    }

    .toggle-slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: var(--border-primary);
        transition: 0.4s;
        border-radius: 24px;
    }

    .toggle-slider:before {
        position: absolute;
        content: "";
        height: 18px;
        width: 18px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.4s;
        border-radius: 50%;
    }

    input:checked + .toggle-slider {
        background-color: var(--primary-color);
    }

    input:checked + .toggle-slider:before {
        transform: translateX(26px);
    }

    .property-control {
        display: flex;
        align-items: center;
        gap: var(--spacing-sm);
    }

    .property-value {
        font-family: var(--font-mono);
        font-size: 0.75rem;
        color: var(--text-secondary);
        min-width: 40px;
    }

    .size-inputs {
        display: flex;
        gap: var(--spacing-xs);
    }

    .size-input {
        width: 50px;
        padding: var(--spacing-xs);
        border: 1px solid var(--border-primary);
        border-radius: var(--radius-sm);
        background: var(--bg-secondary);
        color: var(--text-primary);
        text-align: center;
    }

    .btn-sm {
        padding: var(--spacing-xs) var(--spacing-sm);
        font-size: 0.875rem;
    }

    /* Workflow animations */
    .workflow-step {
        animation: workflowSlideIn 0.8s ease-out both;
    }

    .workflow-step:nth-child(1) { animation-delay: 0.1s; }
    .workflow-step:nth-child(2) { animation-delay: 0.3s; }
    .workflow-step:nth-child(3) { animation-delay: 0.5s; }
    .workflow-step:nth-child(4) { animation-delay: 0.7s; }

    @keyframes workflowSlideIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .workflow-connector {
        animation: connectorFadeIn 0.8s ease-out both;
    }

    .workflow-connector:nth-child(2) { animation-delay: 0.2s; }
    .workflow-connector:nth-child(4) { animation-delay: 0.4s; }
    .workflow-connector:nth-child(6) { animation-delay: 0.6s; }

    @keyframes connectorFadeIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    /* Interface panel animations */
    .interface-panel {
        animation: panelSlideUp 0.8s ease-out both;
    }

    .interface-panel:nth-child(1) { animation-delay: 0.1s; }
    .interface-panel:nth-child(2) { animation-delay: 0.3s; }
    .interface-panel:nth-child(3) { animation-delay: 0.5s; }

    @keyframes panelSlideUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    /* Example card animations */
    .example-card {
        animation: cardFlipIn 0.8s ease-out both;
    }

    .example-card:nth-child(1) { animation-delay: 0.1s; }
    .example-card:nth-child(2) { animation-delay: 0.3s; }
    .example-card:nth-child(3) { animation-delay: 0.5s; }

    @keyframes cardFlipIn {
        from {
            opacity: 0;
            transform: rotateY(90deg);
        }
        to {
            opacity: 1;
            transform: rotateY(0deg);
        }
    }
`;

document.head.appendChild(demoStyles);

// Initialize drag and drop feedback
document.addEventListener('dragstart', function(e) {
    if (e.target.classList.contains('drag-item')) {
        showNotification('Arrastra el componente al canvas', 'info');
    }
});

console.log('🎯 VisionUI Designer Demo features loaded successfully');

/**
 * Hero Mockup: sliders Claude/Gemini/GPT + Bitcoin widget draggable
 */
(function() {
    function initSliders() {
        const tracks = document.querySelectorAll('.vui-mockup-slider');
        tracks.forEach(function(track, idx) {
            const knob = track.querySelector('.vui-slider-knob');
            if (!knob) return;
            track.dataset.model = ['claude', 'gemini', 'gpt'][idx];
            track.dataset.on = idx === 0 ? '1' : '0';
            setSliderState(track, idx === 0);
            track.addEventListener('click', function(e) { e.preventDefault(); toggleSlider(track); });
        });
    }

    function setSliderState(track, on) {
        const knob = track.querySelector('.vui-slider-knob');
        if (!knob) return;
        track.dataset.on = on ? '1' : '0';
        knob.style.left = on ? '100%' : '0%';
        knob.style.transform = on ? 'translateX(-100%)' : 'translateX(0)';
        if (on) {
            track.style.background = 'rgba(59, 216, 216, 0.35)';
            knob.classList.add('bg-primary');
            knob.classList.remove('bg-slate-500');
        } else {
            track.style.background = 'rgba(255,255,255,0.1)';
            knob.classList.remove('bg-primary');
            knob.classList.add('bg-slate-500');
        }
    }

    function toggleSlider(clickedTrack) {
        const all = document.querySelectorAll('.vui-mockup-slider');
        all.forEach(function(t) { setSliderState(t, t === clickedTrack); });
    }

    function initBitcoinWidget() {
        const canvas = document.getElementById('vui-mockup-canvas');
        const widget = document.getElementById('vui-bitcoin-widget');
        if (!canvas || !widget) return;

        widget.style.position = 'absolute';
        widget.style.left = '50%';
        widget.style.top = '50%';
        widget.style.margin = '0';

        const cr = canvas.getBoundingClientRect();
        let offsetX = 0;
        let offsetY = Math.round(-cr.height * 0.12);

        function applyPosition() {
            const cr = canvas.getBoundingClientRect();
            const wr = widget.getBoundingClientRect();
            const maxX = Math.max(0, (cr.width - wr.width) / 2);
            const maxY = Math.max(0, (cr.height - wr.height) / 2);
            offsetX = Math.max(-maxX, Math.min(maxX, offsetX));
            offsetY = Math.max(-maxY, Math.min(maxY, offsetY));
            widget.style.transform = 'translate(calc(-50% + ' + offsetX + 'px), calc(-50% + ' + offsetY + 'px))';
        }
        applyPosition();
        let startMouseX = 0, startMouseY = 0, startOffsetX = 0, startOffsetY = 0;

        widget.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            if (e.target.closest('.vui-btc-close')) return;
            e.preventDefault();
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startOffsetX = offsetX;
            startOffsetY = offsetY;
            widget.classList.add('cursor-grabbing');
            widget.classList.remove('cursor-grab');
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onDragEnd);
        });

        widget.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            if (e.target.closest('.vui-btc-close')) return;
            e.preventDefault();
            startMouseX = e.touches[0].clientX;
            startMouseY = e.touches[0].clientY;
            startOffsetX = offsetX;
            startOffsetY = offsetY;
            document.addEventListener('touchmove', onTouchDrag, { passive: false });
            document.addEventListener('touchend', onDragEnd);
        });

        function onDrag(e) {
            offsetX = startOffsetX + (e.clientX - startMouseX);
            offsetY = startOffsetY + (e.clientY - startMouseY);
            applyPosition();
        }

        function onTouchDrag(e) {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            offsetX = startOffsetX + (e.touches[0].clientX - startMouseX);
            offsetY = startOffsetY + (e.touches[0].clientY - startMouseY);
            applyPosition();
        }

        function onDragEnd() {
            widget.classList.remove('cursor-grabbing');
            widget.classList.add('cursor-grab');
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onDragEnd);
            document.removeEventListener('touchmove', onTouchDrag, { passive: false });
            document.removeEventListener('touchend', onDragEnd);
        }

        widget.querySelector('.vui-btc-close')?.addEventListener('click', function(e) {
            e.stopPropagation();
            widget.style.opacity = '0';
            widget.style.pointerEvents = 'none';
            setTimeout(function() { widget.style.display = 'none'; }, 300);
        });
    }

    function initPropertiesPanel() {
        const canvas = document.getElementById('vui-mockup-canvas');
        const panel = document.getElementById('vui-properties-panel');
        if (!canvas || !panel) return;

        const cr = canvas.getBoundingClientRect();
        const panelW = panel.offsetWidth;
        const panelH = panel.offsetHeight;
        let left = (cr.width - panelW) / 2;
        let top = cr.height * 0.62 - panelH / 2;
        panel.style.position = 'absolute';
        panel.style.left = left + 'px';
        panel.style.top = top + 'px';
        panel.style.bottom = 'auto';
        panel.style.right = 'auto';

        let startMouseX = 0, startMouseY = 0, startLeft = 0, startTop = 0;

        function applyPosition() {
            const pr = panel.getBoundingClientRect();
            const cr = canvas.getBoundingClientRect();
            const maxLeft = cr.width - pr.width;
            const maxTop = cr.height - pr.height;
            left = Math.max(0, Math.min(maxLeft, left));
            top = Math.max(0, Math.min(maxTop, top));
            panel.style.left = left + 'px';
            panel.style.top = top + 'px';
        }

        panel.querySelector('.vui-panel-close')?.addEventListener('click', function(e) {
            e.stopPropagation();
            panel.style.opacity = '0';
            panel.style.pointerEvents = 'none';
            setTimeout(function() { panel.style.display = 'none'; }, 300);
        });

        panel.addEventListener('mousedown', function(e) {
            if (e.button !== 0) return;
            if (e.target.closest('.vui-panel-close')) return;
            e.preventDefault();
            startMouseX = e.clientX;
            startMouseY = e.clientY;
            startLeft = left;
            startTop = top;
            panel.classList.add('cursor-grabbing');
            panel.classList.remove('cursor-grab');
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('mouseup', onDragEnd);
        });

        panel.addEventListener('touchstart', function(e) {
            if (e.touches.length !== 1) return;
            if (e.target.closest('.vui-panel-close')) return;
            e.preventDefault();
            startMouseX = e.touches[0].clientX;
            startMouseY = e.touches[0].clientY;
            startLeft = left;
            startTop = top;
            document.addEventListener('touchmove', onTouchDrag, { passive: false });
            document.addEventListener('touchend', onDragEnd);
        });

        function onDrag(e) {
            left = startLeft + (e.clientX - startMouseX);
            top = startTop + (e.clientY - startMouseY);
            applyPosition();
        }

        function onTouchDrag(e) {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            left = startLeft + (e.touches[0].clientX - startMouseX);
            top = startTop + (e.touches[0].clientY - startMouseY);
            applyPosition();
        }

        function onDragEnd() {
            panel.classList.remove('cursor-grabbing');
            panel.classList.add('cursor-grab');
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('mouseup', onDragEnd);
            document.removeEventListener('touchmove', onTouchDrag, { passive: false });
            document.removeEventListener('touchend', onDragEnd);
        }
    }

    function initWidgetsPanel() {
        const panel = document.getElementById('vui-widgets-panel');
        const btn = panel?.querySelector('.vui-widgets-hide-btn');
        if (!panel || !btn) return;
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            panel.style.opacity = '0';
            panel.style.width = '0';
            panel.style.minWidth = '0';
            panel.style.padding = '0';
            panel.style.overflow = 'hidden';
            panel.style.pointerEvents = 'none';
            panel.style.borderRight = 'none';
            setTimeout(function() { panel.style.display = 'none'; }, 300);
        });
    }

    function init() {
        initSliders();
        initBitcoinWidget();
        initPropertiesPanel();
        initWidgetsPanel();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    document.addEventListener('vui-page-changed', init);
})();

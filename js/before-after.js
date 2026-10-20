/**
 * Esparza's Carpet Cleaning - Before & After Interactive Slider Engine
 * Full support for Mouse, Touch, Pointer events, and keyboard accessibility
 * Includes organic auto-demo animation and interactive hint dismissal
 */

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initBeforeAfterSliders);
} else {
  initBeforeAfterSliders();
}

function initBeforeAfterSliders() {
  const containers = document.querySelectorAll('.before-after-container');

  containers.forEach((container, index) => {
    if (container._baInitialized) return;
    container._baInitialized = true;

    const afterImage = container.querySelector('.ba-image-after');
    const handle = container.querySelector('.ba-handle');
    const rangeInput = container.querySelector('.ba-range-input');
    const dragHint = container.querySelector('.ba-drag-hint');

    if (!afterImage || !handle) return;

    // Prevent native HTML5 image drag which cancels pointer/mouse events
    container.querySelectorAll('img').forEach((img) => {
      img.setAttribute('draggable', 'false');
      img.style.webkitUserDrag = 'none';
      img.style.userSelect = 'none';
      img.style.pointerEvents = 'none';
    });
    container.addEventListener('dragstart', (e) => e.preventDefault());

    let isPointerDown = false;
    let isDragging = false;
    let userInteracted = false;
    let startX = 0;
    let startY = 0;
    let currentPercent = 50;

    function setPosition(percent) {
      const clamped = Math.max(0, Math.min(100, percent));
      currentPercent = clamped;

      const poly = `polygon(${clamped}% 0, 100% 0, 100% 100%, ${clamped}% 100%)`;
      afterImage.style.webkitClipPath = poly;
      afterImage.style.clipPath = poly;

      handle.style.left = `${clamped}%`;

      if (rangeInput) {
        rangeInput.value = clamped;
      }
    }

    container._resetSlider = () => {
      setPosition(50);
    };

    function dismissHint() {
      userInteracted = true;
      if (dragHint && !dragHint.classList.contains('is-hidden')) {
        dragHint.classList.add('is-hidden');
      }
    }

    function handleMove(clientX) {
      const rect = container.getBoundingClientRect();
      if (!rect.width) return;
      const position = clientX - rect.left;
      const percent = (position / rect.width) * 100;
      setPosition(percent);
    }

    // Pointer Events (Mouse, Touch, Pen)
    container.addEventListener('pointerdown', (e) => {
      if (e.button && e.button !== 0) return;
      isPointerDown = true;
      startX = e.clientX;
      startY = e.clientY;

      const rect = container.getBoundingClientRect();
      const handleX = rect.left + (currentPercent / 100) * rect.width;
      const nearHandle = Math.abs(e.clientX - handleX) <= 44;

      if (e.pointerType === 'mouse' || nearHandle) {
        if (e.pointerType === 'mouse') {
          e.preventDefault();
        }
        isDragging = true;
        dismissHint();
        try {
          container.setPointerCapture(e.pointerId);
        } catch (err) {}
        handleMove(e.clientX);
      } else {
        isDragging = false;
      }
    });

    container.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      if (!isDragging) {
        // If user is scrolling vertically on touch, release slider interaction
        if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 8) {
          isPointerDown = false;
          return;
        }
        // Engage horizontal drag as soon as horizontal movement starts
        if (Math.abs(dx) >= 3) {
          isDragging = true;
          dismissHint();
          try {
            container.setPointerCapture(e.pointerId);
          } catch (err) {}
        } else {
          return;
        }
      }

      handleMove(e.clientX);
    });

    const endDrag = (e) => {
      if (!isPointerDown) return;
      const dx = (e.clientX || startX) - startX;
      const dy = (e.clientY || startY) - startY;

      // Support simple tap anywhere on the Before/After container on touch devices
      if (!isDragging && e.type === 'pointerup' && Math.abs(dx) < 8 && Math.abs(dy) < 8 && typeof e.clientX === 'number') {
        dismissHint();
        handleMove(e.clientX);
      }

      isPointerDown = false;
      if (isDragging) {
        isDragging = false;
        try {
          container.releasePointerCapture(e.pointerId);
        } catch (err) {}
      }
    };

    container.addEventListener('pointerup', endDrag);
    container.addEventListener('pointercancel', endDrag);

    // Explicit Touch fallback to prevent vertical scroll hijacking during active horizontal drag
    container.addEventListener('touchmove', (e) => {
      if (isDragging && e.touches && e.touches[0]) {
        if (e.cancelable) e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    }, { passive: false });

    // Range input fallback (keyboard accessibility & assistive devices)
    if (rangeInput) {
      rangeInput.addEventListener('input', (e) => {
        dismissHint();
        setPosition(parseFloat(e.target.value));
      });
      rangeInput.addEventListener('change', (e) => {
        dismissHint();
        setPosition(parseFloat(e.target.value));
      });
    }

    // Initial default position: centered at 50%
    setPosition(50);

    // Run graceful auto-demo on Hero slider (index 0) if user hasn't interacted
    if (index === 0 && container.id === 'hero-slider') {
      setTimeout(() => {
        if (userInteracted) return;

        const startTime = performance.now();
        const duration = 2200;

        function animateDemo(now) {
          if (userInteracted) return;
          const elapsed = now - startTime;
          const progress = Math.min(1, elapsed / duration);

          // Smooth sine oscillation: 50% -> 36% -> 64% -> 50%
          const offset = Math.sin(progress * Math.PI * 2) * 14;
          setPosition(50 - offset);

          if (progress < 1) {
            requestAnimationFrame(animateDemo);
          } else {
            setPosition(50);
          }
        }

        requestAnimationFrame(animateDemo);
      }, 900);
    }
  });
}

window.resetBeforeAfterSliders = function () {
  document.querySelectorAll('.before-after-container').forEach((container) => {
    if (typeof container._resetSlider === 'function') {
      container._resetSlider();
    }
  });
};

let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchX = 0;
  touchY = 0;
  prevTouchX = 0;
  prevTouchY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    const moveEvent = ('ontouchstart' in window) ? 'touchmove' : 'mousemove';
    const startEvent = ('ontouchstart' in window) ? 'touchstart' : 'mousedown';
    const endEvent = ('ontouchstart' in window) ? 'touchend' : 'mouseup';

    document.addEventListener(moveEvent, (e) => {
      if (!this.rotating) {
        if ('ontouchstart' in window) {
          this.touchX = e.touches[0].clientX;
          this.touchY = e.touches[0].clientY;
        } else {
          this.touchX = e.clientX;
          this.touchY = e.clientY;
        }
        this.velX = this.touchX - this.prevTouchX;
        this.velY = this.touchY - this.prevTouchY;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;
        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener(startEvent, (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;
      paper.style.zIndex = highestZ;
      highestZ += 1;

      if ('ontouchstart' in window) {
        this.touchX = e.touches[0].clientX;
        this.touchY = e.touches[0].clientY;
        this.prevTouchX = this.touchX;
        this.prevTouchY = this.touchY;
      } else {
        this.prevTouchX = e.clientX;
        this.prevTouchY = e.clientY;
      }

      if (e.button === 2) {
        this.rotating = true;
      }
    });

    window.addEventListener(endEvent, () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));
papers.forEach(paper => {
  const p = new Paper();
  p.init(paper);
});

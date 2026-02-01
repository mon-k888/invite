import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],   
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  answeredYes = false;

  // 💕 CHANGE NAME
  herName = 'Adithi & Poonam';

  showMessage = false;

  noTexts = [
    'No 😒',
    'Are you sure? 😳',
    'Really sure?? 😬',
    'Think again 😤',
    'Last chance 😭',
    'Seriousllllyyyyy??? 😳',
    'Okay now you’re just playing 😅'
  ];
  noIndex = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  sayYes() {
    this.answeredYes = true;

    if (isPlatformBrowser(this.platformId)) {
      // show text after 0.8s
      setTimeout(() => {
        this.showMessage = true;
      }, 5000);

      // fire confetti immediately
      this.fireHearts();
      setTimeout(() => this.fireHearts(), 800);
    }
  }

  async fireHearts() {
    const confettiModule = await import('canvas-confetti');
    const confetti = confettiModule.default;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      shapes: ['heart'],
      colors: ['#ff2e63', '#ff6f91', '#ffc1cc','#d6b2ba']
    });
  }

  moveNoButton(event: MouseEvent) {
    const btn = event.target as HTMLElement;

    const x = Math.random() * 220 - 110;
    const y = Math.random() * 220 - 110;
    btn.style.transform = `translate(${x}px, ${y}px)`;

    this.noIndex = (this.noIndex + 1) % this.noTexts.length;
    btn.innerText = this.noTexts[this.noIndex];
  }
}

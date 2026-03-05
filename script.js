const countdownElement = document.getElementById('countdown');
const celebrationMessageElement = document.getElementById('celebration-message');
const confettiContainer = document.getElementById('confetti-container');

const TARGET_DATE = new Date('2026-03-19T00:09:00-05:00');
let countdownIntervalId = null;
let hasCelebrated = false;

function formatCountdown(diffMs) {
  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return [
    `${days} DAY${days !== 1 ? 'S' : ''}`,
    `${hours.toString().padStart(2, '0')} HOUR${hours !== 1 ? 'S' : ''}`,
    `${minutes.toString().padStart(2, '0')} MIN${minutes !== 1 ? 'S' : ''}`,
    `${seconds.toString().padStart(2, '0')} SEC${seconds !== 1 ? 'S' : ''}`,
  ].join(' • ');
}

function celebrate() {
  if (hasCelebrated) {
    return;
  }

  hasCelebrated = true;
  countdownElement.textContent = '00 DAYS • 00 HOURS • 00 MINS • 00 SECS';
  celebrationMessageElement.hidden = false;
  launchConfettiBurst();

  if (countdownIntervalId) {
    clearInterval(countdownIntervalId);
    countdownIntervalId = null;
  }
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    celebrate();
    return;
  }

  countdownElement.textContent = formatCountdown(diff);
}

function launchConfettiBurst() {
  if (!confettiContainer) {
    return;
  }

  const colors = ['#22d3ee', '#60a5fa', '#818cf8', '#facc15', '#34d399'];
  const confettiCount = 220;

  for (let i = 0; i < confettiCount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';

    const size = (Math.random() * 0.5 + 0.5).toFixed(2);
    const duration = (Math.random() * 1.8 + 2.8).toFixed(2);
    const delay = (Math.random() * 1.2).toFixed(2);
    const drift = `${(Math.random() * 260 - 130).toFixed(0)}px`;
    const rotation = `${Math.random() > 0.5 ? '' : '-'}${(
      Math.random() * 540 + 540
    ).toFixed(0)}deg`;

    piece.style.left = `${Math.random() * 100}%`;
    piece.style.setProperty('--size', `${size}rem`);
    piece.style.setProperty('--duration', `${duration}s`);
    piece.style.setProperty('--delay', `${delay}s`);
    piece.style.setProperty('--drift', drift);
    piece.style.setProperty('--rotation', rotation);
    piece.style.setProperty(
      '--color',
      colors[Math.floor(Math.random() * colors.length)]
    );
    piece.style.setProperty('--opacity', (Math.random() * 0.4 + 0.55).toFixed(2));

    piece.addEventListener('animationend', () => {
      piece.remove();
    });

    confettiContainer.appendChild(piece);
  }
}

updateCountdown();
countdownIntervalId = setInterval(updateCountdown, 1000);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateCountdown();
  }
});

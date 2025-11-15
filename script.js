const countdownElement = document.getElementById('countdown');
const targetDate = new Date('2025-11-22T10:00:00-05:00');
const confettiContainer = document.getElementById('confetti-container');
const rootElement = document.documentElement;
const HOURGLASS_WINDOW_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
let countdownIntervalId = null;

function setHourglassState(remainingMs) {
  if (!rootElement) {
    return;
  }

  const remaining = Math.max(remainingMs, 0);
  const cappedRemaining = Math.min(remaining, HOURGLASS_WINDOW_MS);
  const topFill = HOURGLASS_WINDOW_MS
    ? Math.max(0, Math.min(1, cappedRemaining / HOURGLASS_WINDOW_MS))
    : 0;
  const bottomFill = Math.max(0, Math.min(1, 1 - topFill));
  const streamActive = remaining > 0;

  rootElement.style.setProperty('--hourglass-top-fill', topFill.toFixed(4));
  rootElement.style.setProperty(
    '--hourglass-bottom-fill',
    bottomFill.toFixed(4)
  );
  rootElement.style.setProperty(
    '--hourglass-stream-opacity',
    streamActive ? '1' : '0'
  );
}

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    // Force the hourglass into its finished state so the bottom bulb is full
    // and the stream shuts off exactly when the countdown completes.
    setHourglassState(0);
    countdownElement.textContent = 'THE COLAB IS LIVE!';
    if (countdownIntervalId !== null) {
      clearInterval(countdownIntervalId);
      countdownIntervalId = null;
    }
    return;
  }

  setHourglassState(diff);

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (24 * 60 * 60));
  const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  const formatted = [
    `${days} DAY${days !== 1 ? 'S' : ''}`,
    `${hours.toString().padStart(2, '0')} HOUR${hours !== 1 ? 'S' : ''}`,
    `${minutes.toString().padStart(2, '0')} MIN${minutes !== 1 ? 'S' : ''}`,
    `${seconds.toString().padStart(2, '0')} SEC${seconds !== 1 ? 'S' : ''}`,
  ].join(' \u2022 ');

  countdownElement.textContent = formatted;
}

updateCountdown();
countdownIntervalId = setInterval(updateCountdown, 1000);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateCountdown();
  }
});

function createConfetti() {
  if (!confettiContainer) {
    return;
  }

  const colors = ['#f97316', '#38bdf8', '#fcd34d', '#34d399', '#c084fc', '#f472b6'];
  const confettiCount = 140;

  for (let i = 0; i < confettiCount; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti-piece';

    const size = (Math.random() * 0.5 + 0.6).toFixed(2);
    const duration = (Math.random() * 6 + 7).toFixed(2);
    const delay = (Math.random() * 4).toFixed(2);
    const drift = `${(Math.random() * 220 - 110).toFixed(0)}px`;
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

    confettiContainer.appendChild(piece);
  }
}

createConfetti();

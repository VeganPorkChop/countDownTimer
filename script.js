const countdownElement = document.getElementById('countdown');

const targetDate = new Date('2025-11-01T07:30:00');

function updateCountdown() {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    countdownElement.textContent = 'THE COLAB IS LIVE!';
    return;
  }

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
const intervalId = setInterval(updateCountdown, 1000);

document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    updateCountdown();
  }
});

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const destinationCards = document.querySelectorAll('.destination-card');
const noResults = document.getElementById('noResults');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(item => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    let visibleCount = 0;
    destinationCards.forEach(card => {
      const show = filter === 'all' || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visibleCount++;
    });
    noResults.hidden = visibleCount > 0;
  });
});

document.querySelectorAll('[data-place]').forEach(link => {
  link.addEventListener('click', () => {
    const destination = document.getElementById('tripDestination');
    destination.value = link.dataset.place;
  });
});

document.getElementById('newsletterForm').addEventListener('submit', event => {
  event.preventDefault();
  const emailInput = document.getElementById('newsletterEmail');
  const message = document.getElementById('newsletterMessage');
  message.textContent = `Thanks for joining us, ${emailInput.value}! This demo doesn't store email addresses.`;
  emailInput.value = '';
});

document.getElementById('tripForm').addEventListener('submit', event => {
  event.preventDefault();
  const name = document.getElementById('visitorName').value.trim();
  const destination = document.getElementById('tripDestination').value;
  const status = document.getElementById('tripMessageStatus');
  status.textContent = `Thanks, ${name}! Your demo inquiry about ${destination} is ready. No message was sent because this website has no connected backend yet.`;
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});

document.getElementById('year').textContent = new Date().getFullYear();

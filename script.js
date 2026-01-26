
const scrollProgressBar = document.getElementById('scrollProgressBar');
window.addEventListener('scroll', () => {
  const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  scrollProgressBar.style.width = scrollPercentage + '%';
});

const sections = document.querySelectorAll('.step');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

const buttons = document.querySelectorAll('[data-choice]');
const result = document.getElementById('decision-result');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const choice = btn.dataset.choice;
    result.style.display = 'block';
    result.textContent = choice === 'mobile'
      ? 'Mobile-first ensures better performance and scalability across devices.'
      : 'Desktop-first can speed up initial design but risks mobile usability.';
  });
});

const fixBtn = document.getElementById('fixBugBtn');
const demoNav = document.getElementById('demoNav');
const bugResult = document.getElementById('bugResult');

fixBtn.addEventListener('click', () => {
  demoNav.classList.remove('broken');
  bugResult.textContent =
    'Bug fixed: incorrect flex alignment removed, restoring proper navigation layout.';
  bugResult.style.display = 'block';
});

const animToggle = document.getElementById('animToggle');
const toggleSwitch = document.getElementById('toggleSwitch');
const toggleStatus = document.getElementById('toggleStatus');
const playgroundResult = document.getElementById('playgroundResult');

animToggle.addEventListener('change', () => {
  const root = document.documentElement;
  if (animToggle.checked) {
    root.style.setProperty('--animations', '1');
  } else {
    root.style.setProperty('--animations', '0');
  }
  playgroundResult.textContent = animToggle.checked
    ? 'Animations enabled using CSS transitions.'
    : 'Animations disabled for reduced motion preference.';
  playgroundResult.style.display = 'block';
});


toggleSwitch.addEventListener('change', () => {
  toggleStatus.textContent = toggleSwitch.checked ? 'Enabled' : 'Disabled';
  playgroundResult.textContent = toggleSwitch.checked
    ? 'Switch is ON'
    : 'Switch is OFF';
  playgroundResult.style.display = 'block';
});

const componentButtons = document.querySelectorAll('.ui-btn:not([disabled])');
componentButtons.forEach((btn) => {
  if (!btn.hasListener) {
    btn.addEventListener('click', (e) => {
      if (e.target.textContent.includes('Primary')) {
        playgroundResult.textContent = 'Primary button clicked.';
      } else if (e.target.textContent.includes('Secondary')) {
        playgroundResult.textContent = 'Secondary action triggered.';
      } else if (e.target.textContent.includes('Learn') || e.target.textContent.includes('View')) {
        playgroundResult.textContent = 'Card button clicked: ' + e.target.parentElement.parentElement.querySelector('.card-header').textContent;
      } else {
        playgroundResult.textContent = 'Button interaction: ' + e.target.textContent;
      }
      playgroundResult.style.display = 'block';
    });
    btn.hasListener = true;
  }
});

const inputs = document.querySelectorAll('input[type="text"], textarea');
inputs.forEach((input) => {
  input.addEventListener('focus', () => {
    playgroundResult.textContent = 'Form field focused: ' + (input.placeholder || 'input');
    playgroundResult.style.display = 'block';
  });
});

const checkboxes = document.querySelectorAll('input[type="checkbox"]:not(#animToggle):not(#toggleSwitch)');
checkboxes.forEach((cb) => {
  cb.addEventListener('change', () => {
    playgroundResult.textContent = 'Checkbox ' + (cb.checked ? 'checked' : 'unchecked');
    playgroundResult.style.display = 'block';
  });
});

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

themeToggle.addEventListener('click', () => {
  const isLight = root.getAttribute('data-theme') === 'light';
  const newTheme = isLight ? 'dark' : 'light';

  root.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  themeToggle.textContent = newTheme === 'light' ? '☀️' : '🌙';
});

const howBuiltBtn = document.getElementById('howBuiltBtn');
const viewSourceBtn = document.getElementById('viewSourceBtn');
const sourceModal = document.getElementById('sourceModal');
const closeModal = document.getElementById('closeModal');

howBuiltBtn.addEventListener('click', () => {
  sourceModal.classList.remove('hidden');
  sourceModal.setAttribute('aria-hidden', 'false');
});

if (viewSourceBtn) {
  viewSourceBtn.addEventListener('click', () => {
    sourceModal.classList.remove('hidden');
    sourceModal.setAttribute('aria-hidden', 'false');
  });
}

closeModal.addEventListener('click', () => {
  sourceModal.classList.add('hidden');
  sourceModal.setAttribute('aria-hidden', 'true');
});

const copyButtons = document.querySelectorAll('.copy-btn');
copyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const snippetId = btn.dataset.snippet;
    const codeElement = document.getElementById(snippetId);
    const text = codeElement.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
      const originalText = btn.textContent;
      btn.textContent = 'Copied!';
      setTimeout(() => {
        btn.textContent = originalText;
      }, 2000);
    });
  });
});

const validationForm = document.getElementById('validationForm');
const passwordInput = document.getElementById('passwordInput');
const passwordStrength = document.getElementById('passwordStrength');
const formResult = document.getElementById('formResult');

if (passwordInput) {
  passwordInput.addEventListener('input', () => {
    const password = passwordInput.value;
    let strength = 0;
    const feedback = [];

    if (password.length >= 8) strength++;
    else feedback.push('At least 8 characters');

    if (/[0-9]/.test(password)) strength++;
    else feedback.push('At least 1 number');

    if (/[!@#$%^&*]/.test(password)) strength++;
    else feedback.push('At least 1 symbol');

    if (/[A-Z]/.test(password)) strength++;
    else feedback.push('At least 1 uppercase');

    passwordStrength.className = 'password-strength';
    if (strength === 0) passwordStrength.classList.add('weak');
    else if (strength === 1) passwordStrength.classList.add('weak');
    else if (strength === 2) passwordStrength.classList.add('fair');
    else if (strength === 3) passwordStrength.classList.add('good');
    else passwordStrength.classList.add('strong');

    passwordStrength.textContent = strength === 4 ? '✓ Strong' : feedback.join(', ');
  });
}

if (validationForm) {
  validationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = validationForm.querySelector('input[type="email"]').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
      formResult.innerHTML = '<div class="alert alert-success">✓ Form validated and submitted successfully!</div>';
      formResult.style.display = 'block';
    } else {
      formResult.innerHTML = '<div class="alert alert-error">✕ Please fix validation errors.</div>';
      formResult.style.display = 'block';
    }
  });
}

const loadDataBtn = document.getElementById('loadDataBtn');
const skeletonCard = document.getElementById('skeletonCard');
const loadedCard = document.getElementById('loadedCard');

if (loadDataBtn) {
  loadDataBtn.addEventListener('click', () => {
    skeletonCard.classList.remove('hidden');
    loadedCard.classList.add('hidden');
    loadDataBtn.disabled = true;

    setTimeout(() => {
      skeletonCard.classList.add('hidden');
      loadedCard.classList.remove('hidden');
      loadDataBtn.disabled = false;
    }, 2000);
  });
}

document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + K to focus search/scroll to to
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // ? for help
  if (e.key === '?') {
    console.log('%c Keyboard Shortcuts', 'font-size: 16px; font-weight: bold;');
    console.log('Ctrl/Cmd + K: Scroll to top');
    console.log('Scroll through sections for interactive demos');
  }
});

window.addEventListener('error', (event) => {
  console.error('Error caught:', event.message);
});

const trackEvent = (eventName, eventData = {}) => {
  console.log(`📊 Event: ${eventName}`, eventData);  
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const sectionName = entry.target.querySelector('h2')?.textContent || 'Hero';
      trackEvent('section_viewed', { section: sectionName });
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('section.step').forEach(section => {
  sectionObserver.observe(section);
});

const debugCases = [
  {
    title: 'Button not clickable',
    issue: 'A disabled attribute prevents interaction.',
    fix: 'Removed the disabled attribute to restore click events.'
  },
  {
    title: 'Layout overflow on mobile',
    issue: 'Fixed width causing horizontal scroll.',
    fix: 'Replaced fixed width with responsive max-width.'
  },
  {
    title: 'Text not visible',
    issue: 'Text color matched background.',
    fix: 'Updated CSS variable for contrast.'
  },
  {
    title: 'Hover animation lag',
    issue: 'Heavy box-shadow recalculation.',
    fix: 'Optimized animation using transform instead.'
  },
  {
    title: 'Navbar misalignment',
    issue: 'Incorrect flex alignment value.',
    fix: 'Restored proper justify-content setting.'
  },
  {
    title: 'Form submit reloads page',
    issue: 'Missing preventDefault().',
    fix: 'Stopped default form submission behavior.'
  },
  {
    title: 'Image stretching',
    issue: 'Missing object-fit property.',
    fix: 'Applied object-fit: cover.'
  },
  {
    title: 'Dark mode not persisting',
    issue: 'Theme state not saved.',
    fix: 'Stored theme preference in localStorage.'
  },
  {
    title: 'Animation ignores reduced motion',
    issue: 'No prefers-reduced-motion handling.',
    fix: 'Disabled transitions for motion-sensitive users.'
  }
];

const debugList = document.getElementById('debugList');

debugCases.forEach((item, index) => {
  const card = document.createElement('div');
  card.className = 'debug-card';

  const resultId = `debug-result-${index}`;

  card.innerHTML = `
    <h3>${item.title}</h3>
    <p><strong>Issue:</strong> ${item.issue}</p>
    <button data-index="${index}">Fix issue</button>
    <p class="result" id="${resultId}"></p>
  `;

  if (item.title === 'Button not clickable') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper';

    const sampleBtn = document.createElement('button');
    sampleBtn.className = 'sample-btn';
    sampleBtn.id = `sample-btn-${index}`;
    sampleBtn.textContent = 'Sample action';
    sampleBtn.disabled = true; // simulate the bug

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Not clickable';

    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'This button is disabled due to a stray "disabled" attribute.';
      res.style.display = 'block';
    });

    wrapper.appendChild(sampleBtn);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }

  if (item.title === 'Layout overflow on mobile') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper overflow-sample';

    const box = document.createElement('div');
    box.className = 'overflow-box fixed-width';
    box.textContent = 'Fixed width content (causes overflow on narrow viewports)';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Causes horizontal scroll';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: fixed width causes layout overflow on small screens.';
      res.style.display = 'block';
    });

    wrapper.appendChild(box);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }

  if (item.title === 'Text not visible') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper';

    const txt = document.createElement('p');
    txt.className = 'sample-text hidden-text';
    txt.id = `sample-text-${index}`;
    txt.textContent = 'This text is currently not visible because of color contrast.';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Text blends into background';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: text color matches background; low contrast makes it unreadable.';
      res.style.display = 'block';
    });

    wrapper.appendChild(txt);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }

  if (item.title === 'Hover animation lag') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper';

    const box = document.createElement('div');
    box.className = 'anim-box heavy-shadow';
    box.textContent = 'Hover me';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Heavy shadow causes lag';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: expensive box-shadow on hover causes repaint/reflow; use transform-based effects.';
      res.style.display = 'block';
    });

    wrapper.appendChild(box);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }


  if (item.title === 'Navbar misalignment') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper';
    const nav = document.createElement('nav');
    nav.className = 'demo-nav nav-broken';
    nav.id = `nav-sample-${index}`;
    nav.innerHTML = '<span>Logo</span><button>Menu</button>';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Misaligned navbar';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: incorrect justify-content caused misalignment in navbar.';
      res.style.display = 'block';
    });

    wrapper.appendChild(nav);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }


  if (item.title === 'Form submit reloads page') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper form-sample';

    const form = document.createElement('form');
    form.id = `sample-form-${index}`;
    form.innerHTML = `<input placeholder="Name" required/><button type="submit">Submit</button>`;

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Submits and reloads';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: form lacks preventDefault(); a normal submit will reload the page.';
      res.style.display = 'block';
    });

    wrapper.appendChild(form);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }

  if (item.title === 'Image stretching') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper img-sample';

    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/400x200';
    img.alt = 'Sample';
    img.id = `sample-img-${index}`;
    img.className = 'stretched-image';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Image stretches incorrectly';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: missing object-fit causes images to distort.';
      res.style.display = 'block';
    });

    wrapper.appendChild(img);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }


  if (item.title === 'Dark mode not persisting') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper theme-sample';

    const tbtn = document.createElement('button');
    tbtn.textContent = 'Toggle theme (not persistent)';
    tbtn.id = `theme-sample-btn-${index}`;
    tbtn.addEventListener('click', () => {
      const root = document.documentElement;
      const isLight = root.getAttribute('data-theme') === 'light';
      root.setAttribute('data-theme', isLight ? 'dark' : 'light');
    });

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Preference not saved';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: theme toggle does not save preference to localStorage.';
      res.style.display = 'block';
    });

    wrapper.appendChild(tbtn);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }


  if (item.title === 'Animation ignores reduced motion') {
    const wrapper = document.createElement('div');
    wrapper.className = 'sample-wrapper motion-sample';

    const bar = document.createElement('div');
    bar.className = 'motion-bar';
    bar.textContent = 'Animated';

    const overlay = document.createElement('div');
    overlay.className = 'sample-overlay';
    overlay.textContent = 'Ignores reduced motion';
    overlay.addEventListener('click', () => {
      const res = document.getElementById(resultId);
      res.textContent = 'Issue: animations do not respect prefers-reduced-motion user setting.';
      res.style.display = 'block';
    });

    wrapper.appendChild(bar);
    wrapper.appendChild(overlay);
    card.appendChild(wrapper);
  }

  debugList.appendChild(card);
});

debugList.addEventListener('click', (e) => {
  if (!e.target.matches('button[data-index]')) return;

  const i = e.target.dataset.index;
  const result = document.getElementById(`debug-result-${i}`);

  result.textContent = `Fix applied: ${debugCases[i].fix}`;
  result.style.display = 'block';


  if (debugCases[i].title === 'Button not clickable') {
    const sample = document.getElementById(`sample-btn-${i}`);
    if (sample) {
      sample.disabled = false;
      // remove overlay if present
      const wrapper = sample.parentElement;
      const overlay = wrapper && wrapper.querySelector('.sample-overlay');
      if (overlay) overlay.remove();


      sample.addEventListener('click', () => {
        result.textContent = 'Sample button clicked — interaction restored.';
        result.style.display = 'block';
      });
    }
  }

  if (debugCases[i].title === 'Layout overflow on mobile') {
    const box = document.querySelector('.overflow-box.fixed-width');
    if (box) {
      box.classList.remove('fixed-width');
      const overlay = box.parentElement && box.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Text not visible') {
    const txt = document.getElementById(`sample-text-${i}`);
    if (txt) {
      txt.classList.remove('hidden-text');
      const overlay = txt.parentElement && txt.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Hover animation lag') {
    const box = document.querySelector('.anim-box.heavy-shadow');
    if (box) {
      box.classList.remove('heavy-shadow');
      box.classList.add('fast-transform');
      const overlay = box.parentElement && box.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Navbar misalignment') {
    const nav = document.querySelector('.demo-nav.nav-broken');
    if (nav) {
      nav.classList.remove('nav-broken');
      const overlay = nav.parentElement && nav.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Form submit reloads page') {
    const form = document.getElementById(`sample-form-${i}`);
    if (form) {
      form.addEventListener('submit', (ev) => {
        ev.preventDefault();
        const res = document.getElementById(`debug-result-${i}`);
        res.textContent = 'Form submitted (default prevented) — no reload.';
        res.style.display = 'block';
      });
      const overlay = form.parentElement && form.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Image stretching') {
    const img = document.getElementById(`sample-img-${i}`);
    if (img) {
      img.style.objectFit = 'cover';
      const overlay = img.parentElement && img.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Dark mode not persisting') {
    const tbtn = document.getElementById(`theme-sample-btn-${i}`);
    if (tbtn) {
      tbtn.addEventListener('click', () => {
        const root = document.documentElement;
        const isLight = root.getAttribute('data-theme') === 'light';
        const newTheme = isLight ? 'dark' : 'light';
        root.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
      });
      const overlay = tbtn.parentElement && tbtn.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }

  if (debugCases[i].title === 'Animation ignores reduced motion') {
    const bar = document.querySelector('.motion-bar');
    if (bar) {
      bar.classList.add('respects-reduced-motion');
      const overlay = bar.parentElement && bar.parentElement.querySelector('.sample-overlay');
      if (overlay) overlay.remove();
    }
  }
});

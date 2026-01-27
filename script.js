// ---------- Default config used by the page/SDK ----------
const defaultConfig = {
  background_color: "#667eea",
  surface_color: "#ffffff",
  text_color: "#374151",
  primary_action_color: "#8b5cf6",
  secondary_action_color: "#6366f1",
  font_family: "Inter",
  font_size: 16,
  designer_name: "Alex Rivera",
  tagline: "Creative Visual Designer",
  hero_description: "Crafting stunning visual experiences that captivate audiences and bring brands to life through innovative design solutions.",
  about_title: "About Me",
  about_text: "I'm a passionate visual designer with over 8 years of experience creating compelling brand identities and digital experiences. My approach combines strategic thinking with creative execution to deliver designs that not only look beautiful but also drive results for my clients.",
  contact_email: "hello@alexrivera.com",
  contact_phone: "+1 (555) 123-4567"
};

// ---------- Element SDK implementation ----------
const element = {
  defaultConfig,
  onConfigChange: async (config) => {
    const customFont = config.font_family || defaultConfig.font_family;
    const baseSize = config.font_size || defaultConfig.font_size;
    const baseFontStack = 'system-ui, -apple-system, sans-serif';

    // Apply hero gradient from config
    const heroSection = document.querySelector('.gradient-bg');
    if (heroSection) {
      heroSection.style.background = `linear-gradient(135deg, ${config.background_color || defaultConfig.background_color} 0%, ${config.primary_action_color || defaultConfig.primary_action_color} 100%)`;
    }

    // Apply text colors to elements that are not intentionally white/gradient
    const textElements = document.querySelectorAll('h1, h2, h3, p, span, div');
    textElements.forEach(el => {
      if (!el.classList.contains('text-white') && !el.closest('.gradient-bg') && !el.closest('.bg-gradient-to-br')) {
        el.style.color = config.text_color || defaultConfig.text_color;
      }
    });

    // Sync profile ring colors with theme
const ring = document.getElementById('profile-ring');
if (ring) {
  ring.style.setProperty(
    '--ring-start',
    config.surface_color || '#ffffff'
  );
  ring.style.setProperty(
    '--ring-end',
    config.primary_action_color || '#8b5cf6'
  );
}

    // Apply surface color
    const surfaceElements = document.querySelectorAll('.bg-white, .bg-gray-50');
    surfaceElements.forEach(el => {
      el.style.backgroundColor = config.surface_color || defaultConfig.surface_color;
    });

    // Buttons: primary / secondary
    const primaryButtons = document.querySelectorAll('button:not(.border-2)');
    primaryButtons.forEach(btn => {
      if (!btn.classList.contains('bg-white')) {
        btn.style.backgroundColor = config.primary_action_color || defaultConfig.primary_action_color;
      }
    });
    const secondaryButtons = document.querySelectorAll('button.border-2');
    secondaryButtons.forEach(btn => {
      btn.style.borderColor = config.secondary_action_color || defaultConfig.secondary_action_color;
      btn.style.color = config.secondary_action_color || defaultConfig.secondary_action_color;
    });

    // Apply fonts and sizes
    document.body.style.fontFamily = `${customFont}, ${baseFontStack}`;
    document.body.style.fontSize = `${baseSize}px`;
    document.querySelectorAll('h1').forEach(el => el.style.fontSize = `${baseSize * 3}px`);
    document.querySelectorAll('h2').forEach(el => el.style.fontSize = `${baseSize * 2.25}px`);
    document.querySelectorAll('h3').forEach(el => el.style.fontSize = `${baseSize * 1.5}px`);

    // Update text content
    document.querySelectorAll('#nav-name, #hero-name, #footer-name').forEach(el => el.textContent = config.designer_name || defaultConfig.designer_name);
    const taglineElement = document.getElementById('hero-tagline');
    if (taglineElement) taglineElement.textContent = config.tagline || defaultConfig.tagline;
    const heroDescElement = document.getElementById('hero-description');
    if (heroDescElement) heroDescElement.textContent = config.hero_description || defaultConfig.hero_description;
    const aboutTitleElement = document.getElementById('about-title');
    if (aboutTitleElement) aboutTitleElement.textContent = config.about_title || defaultConfig.about_title;
    const aboutTextElement = document.getElementById('about-text');
    if (aboutTextElement) aboutTextElement.textContent = config.about_text || defaultConfig.about_text;
    const emailElement = document.getElementById('contact-email');
    if (emailElement) emailElement.textContent = config.contact_email || defaultConfig.contact_email;
    const phoneElement = document.getElementById('contact-phone');
    if (phoneElement) phoneElement.textContent = config.contact_phone || defaultConfig.contact_phone;
  },

  mapToCapabilities: (config) => ({
    recolorables: [
      {
        get: () => config.background_color || defaultConfig.background_color,
        set: (value) => {
          config.background_color = value;
          window.elementSdk.setConfig({ background_color: value });
        }
      },
      {
        get: () => config.surface_color || defaultConfig.surface_color,
        set: (value) => {
          config.surface_color = value;
          window.elementSdk.setConfig({ surface_color: value });
        }
      },
      {
        get: () => config.text_color || defaultConfig.text_color,
        set: (value) => {
          config.text_color = value;
          window.elementSdk.setConfig({ text_color: value });
        }
      },
      {
        get: () => config.primary_action_color || defaultConfig.primary_action_color,
        set: (value) => {
          config.primary_action_color = value;
          window.elementSdk.setConfig({ primary_action_color: value });
        }
      },
      {
        get: () => config.secondary_action_color || defaultConfig.secondary_action_color,
        set: (value) => {
          config.secondary_action_color = value;
          window.elementSdk.setConfig({ secondary_action_color: value });
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => config.font_family || defaultConfig.font_family,
      set: (value) => {
        config.font_family = value;
        window.elementSdk.setConfig({ font_family: value });
      }
    },
    fontSizeable: {
      get: () => config.font_size || defaultConfig.font_size,
      set: (value) => {
        config.font_size = value;
        window.elementSdk.setConfig({ font_size: value });
      }
    }
  }),

  mapToEditPanelValues: (config) => new Map([
    ["designer_name", config.designer_name || defaultConfig.designer_name],
    ["tagline", config.tagline || defaultConfig.tagline],
    ["hero_description", config.hero_description || defaultConfig.hero_description],
    ["about_title", config.about_title || defaultConfig.about_title],
    ["about_text", config.about_text || defaultConfig.about_text],
    ["contact_email", config.contact_email || defaultConfig.contact_email],
    ["contact_phone", config.contact_phone || defaultConfig.contact_phone]
  ])
};

// Initialize SDK when available
if (window.elementSdk) {
  try {
    window.elementSdk.init(element);
  } catch (err) {
    console.warn('elementSdk init error:', err);
  }
}

// ---------- Smooth scrolling for anchor links ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ---------- Animate skill bars on scroll ----------
const observerOptions = { threshold: 0.5, rootMargin: '0px 0px -100px 0px' };

// helper: extract percent from class like w-[95%] or from data-percent
function getPercentFromElement(el) {
  if (!el) return 0;
  // prefer explicit data-percent
  const data = el.getAttribute('data-percent');
  if (data && /^\d{1,3}$/.test(data)) return Number(data);

  // fallback: regex on className
  const m = el.className.match(/w-\[(\d+)%\]/);
  if (m && m[1]) return Number(m[1]);

  // as last resort, try width style (if set)
  const styleWidth = el.style.width;
  if (styleWidth && styleWidth.endsWith('%')) return Number(styleWidth.replace('%', ''));

  return 0;
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const skillBars = entry.target.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
      const pct = getPercentFromElement(bar) || 0;
      // animate to percent
      requestAnimationFrame(() => {
        bar.style.width = pct + '%';
      });
    });
  });
}, observerOptions);

const aboutSection = document.getElementById('about');
if (aboutSection) skillsObserver.observe(aboutSection);

// ---------- Optional: observe many sections instead ----------
document.querySelectorAll('section').forEach(sec => {
  // if you want skill bars in other sections animate too, uncomment:
  // skillsObserver.observe(sec);
});

const form = document.getElementById("project-form");
const successMsg = document.getElementById("success-message");
const errorMsg = document.getElementById("error-message");

const submitBtn = document.getElementById("submit-btn");
const submitText = document.getElementById("submit-text");
const submitSpinner = document.getElementById("submit-spinner");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Reset UI
  successMsg.classList.add("hidden");
  errorMsg.classList.add("hidden");

  // Loading state
  submitBtn.disabled = true;
  submitText.textContent = "Sending...";
  submitSpinner.classList.remove("hidden");

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      successMsg.classList.remove("hidden");
      form.reset();
    } else {
      errorMsg.classList.remove("hidden");
      console.error(result);
    }
  } catch (err) {
    errorMsg.classList.remove("hidden");
    console.error(err);
  }

  // Restore button
  submitBtn.disabled = false;
  submitText.textContent = "Send Request";
  submitSpinner.classList.add("hidden");
});

// ---------- End of script ----------

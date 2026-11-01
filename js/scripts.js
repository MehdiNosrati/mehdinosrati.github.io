(() => {
  // 1. Dynamic copyright year
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 2. Two-state theme toggle (System default vs explicit override)
  const metaScheme = document.querySelector('meta[name="color-scheme"]');
  const themeToggle = document.getElementById("theme-toggle");

  const getStoredScheme = () => {
    try {
      const val = localStorage.getItem("color-scheme");
      return val === "light" || val === "dark" ? val : null;
    } catch {
      return null;
    }
  };

  const getSystemScheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const applySchemeMeta = (scheme) => {
    if (metaScheme) {
      metaScheme.content = scheme ?? "light dark";
    }
  };

  if (themeToggle && metaScheme) {
    themeToggle.addEventListener("click", () => {
      const currentMeta = metaScheme.content;
      const currentRendered =
        currentMeta === "light" || currentMeta === "dark"
          ? currentMeta
          : getStoredScheme() ?? getSystemScheme();

      const target = currentRendered === "dark" ? "light" : "dark";
      const system = getSystemScheme();

      if (target !== system) {
        try {
          localStorage.setItem("color-scheme", target);
        } catch {}
        applySchemeMeta(target);
      } else {
        try {
          localStorage.removeItem("color-scheme");
        } catch {}
        applySchemeMeta(null);
      }
    });

    window.addEventListener("storage", (e) => {
      if (e.key === "color-scheme") {
        const next = e.newValue === "light" || e.newValue === "dark" ? e.newValue : null;
        applySchemeMeta(next);
      }
    });
  }

  // 3. Mobile navigation menu
  const menuBtn = document.getElementById("mobile-menu-open");
  const siteNav = document.querySelector(".site-nav");

  const closeMenu = () => {
    if (!menuBtn || !siteNav) return;
    siteNav.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
  };

  if (menuBtn && siteNav) {
    menuBtn.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("active");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => closeMenu());
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && siteNav.classList.contains("active")) {
        closeMenu();
        menuBtn.focus();
      }
    });
  }

  // 4. Back to top button
  const toTopBtn = document.getElementById("to-top");
  if (toTopBtn) {
    toTopBtn.addEventListener("click", () => {
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({
        top: 0,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
  }
})();

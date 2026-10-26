/* =====================================================================
   Louise' Arsenal — interactions
   ===================================================================== */
(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
        initNavigation();
        initScrollEffects();
        initReveal();
        initGallery();
        initMediaModal();
        initContactForm();
        initFooter();
    });

    /* ---------------- Navigation ---------------- */
    function initNavigation() {
        const toggle = document.getElementById('nav-toggle');
        const menu = document.getElementById('nav-menu');
        const header = document.getElementById('site-header');
        if (!toggle || !menu) return;

        const closeMenu = function () {
            menu.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        };

        toggle.addEventListener('click', function () {
            const isOpen = menu.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        menu.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });

        document.addEventListener('click', function (event) {
            if (!menu.classList.contains('is-open')) return;
            if (menu.contains(event.target) || toggle.contains(event.target)) return;
            closeMenu();
        });

        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') closeMenu();
        });

        window.addEventListener('resize', function () {
            if (window.innerWidth > 900) closeMenu();
        });

        // Sticky header state
        const setHeaderState = function () {
            if (!header) return;
            header.classList.toggle('is-scrolled', window.scrollY > 20);
        };
        setHeaderState();
        window.addEventListener('scroll', setHeaderState, { passive: true });
    }

    /* ---------------- Scroll effects ---------------- */
    function initScrollEffects() {
        const bar = document.getElementById('scroll-progress-bar');
        const backToTop = document.getElementById('back-to-top');
        const sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
        const navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-menu > a[href^="#"]'));

        const update = function () {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            if (bar) bar.style.width = Math.min(100, Math.max(0, progress)) + '%';
            if (backToTop) backToTop.classList.toggle('is-visible', scrollTop > 600);

            let currentId = '';
            sections.forEach(function (section) {
                if (section.getBoundingClientRect().top <= 140) currentId = section.id;
            });

            navLinks.forEach(function (link) {
                const target = link.getAttribute('href').slice(1);
                link.classList.toggle('is-active', target === currentId);
            });
        };

        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);

        if (backToTop) {
            backToTop.addEventListener('click', function () {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    /* ---------------- Reveal on scroll ---------------- */
    function initReveal() {
        const items = document.querySelectorAll('.reveal');
        if (!items.length) return;

        if (!('IntersectionObserver' in window)) {
            items.forEach(function (item) { item.classList.add('is-visible'); });
            return;
        }

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        items.forEach(function (item, index) {
            item.style.transitionDelay = Math.min(index % 4, 3) * 60 + 'ms';
            observer.observe(item);
        });
    }

    /* ---------------- Internship gallery ---------------- */
    function initGallery() {
        const track = document.getElementById('gallery-track');
        const dots = Array.prototype.slice.call(document.querySelectorAll('.gallery-dot'));
        const prev = document.getElementById('gallery-prev');
        const next = document.getElementById('gallery-next');
        if (!track) return;

        const slides = track.children.length;
        let index = 0;
        let timer = null;

        const render = function () {
            track.style.transform = 'translateX(-' + index * 100 + '%)';
            dots.forEach(function (dot, i) {
                dot.classList.toggle('active', i === index);
            });
        };

        const go = function (nextIndex) {
            index = (nextIndex + slides) % slides;
            render();
        };

        const startAuto = function () {
            if (slides < 2) return;
            stopAuto();
            timer = window.setInterval(function () { go(index + 1); }, 7000);
        };

        const stopAuto = function () {
            if (timer) window.clearInterval(timer);
            timer = null;
        };

        dots.forEach(function (dot, i) {
            dot.addEventListener('click', function () {
                go(i);
                startAuto();
            });
        });

        if (prev) prev.addEventListener('click', function () { go(index - 1); startAuto(); });
        if (next) next.addEventListener('click', function () { go(index + 1); startAuto(); });

        const shell = track.closest('.gallery-shell');
        if (shell) {
            shell.addEventListener('mouseenter', stopAuto);
            shell.addEventListener('mouseleave', startAuto);
        }

        render();
        startAuto();
    }

    /* ---------------- Media modal (images & PDFs) ---------------- */
    function initMediaModal() {
        const modal = document.getElementById('media-modal');
        const body = document.getElementById('modal-body');
        const title = document.getElementById('modal-title');
        const closeBtn = document.getElementById('modal-close');
        const openNew = document.getElementById('modal-open-new');
        if (!modal || !body) return;

        let lastFocused = null;

        const openModal = function (src, type, label) {
            if (!src) return;
            lastFocused = document.activeElement;
            body.innerHTML = '';

            if (type === 'pdf' || /\.pdf($|\?)/i.test(src)) {
                const iframe = document.createElement('iframe');
                iframe.src = encodeURI(src) + '#toolbar=0&navpanes=0';
                iframe.title = label || 'Document preview';
                body.appendChild(iframe);
            } else {
                const img = document.createElement('img');
                img.src = src;
                img.alt = label || 'Screenshot preview';
                body.appendChild(img);
            }

            if (title) title.textContent = label || 'Preview';
            if (openNew) openNew.href = encodeURI(src);
            modal.classList.add('is-open');
            document.body.style.overflow = 'hidden';
            if (closeBtn) closeBtn.focus();
        };

        const closeModal = function () {
            modal.classList.remove('is-open');
            body.innerHTML = '';
            document.body.style.overflow = '';
            if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
        };

        document.querySelectorAll('[data-media-src]').forEach(function (el) {
            el.addEventListener('click', function () {
                openModal(
                    el.getAttribute('data-media-src'),
                    el.getAttribute('data-media-type') || 'image',
                    el.getAttribute('data-media-title')
                );
            });

            if (el.tagName === 'IMG') {
                el.style.cursor = 'zoom-in';
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
                el.addEventListener('keydown', function (event) {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        el.click();
                    }
                });
            }
        });

        document.querySelectorAll('.view-cert-btn').forEach(function (btn) {
            btn.addEventListener('click', function (event) {
                event.preventDefault();
                const src = btn.getAttribute('data-pdf-src');
                const label = btn.closest('.cert-card, .doc-card');
                const heading = label ? label.querySelector('h3') : null;
                openModal(src, 'pdf', heading ? heading.textContent : 'Certificate');
            });
        });

        if (closeBtn) closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', function (event) {
            if (event.target === modal) closeModal();
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
        });
    }

    /* ---------------- Contact form ---------------- */
    function initContactForm() {
        const form = document.getElementById('contact-form');
        const status = document.getElementById('form-status');
        if (!form || !status) return;

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const button = form.querySelector('button[type="submit"]');
            const original = button ? button.innerHTML : '';
            if (button) {
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-circle-notch fa-spin" aria-hidden="true"></i> Sending…';
            }

            status.className = 'form-status';
            status.textContent = '';

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            })
                .then(function (response) {
                    if (!response.ok) throw new Error('Request failed');
                    status.classList.add('is-success');
                    status.textContent = 'Message sent — thank you! I\'ll reply within 24–48 hours.';
                    form.reset();
                })
                .catch(function () {
                    status.classList.add('is-error');
                    status.innerHTML = 'Something went wrong. Please email me directly at ' +
                        '<a href="mailto:johnlouisebergs123@gmail.com" style="color:#fff;text-decoration:underline;">johnlouisebergs123@gmail.com</a>.';
                })
                .finally(function () {
                    if (button) {
                        button.disabled = false;
                        button.innerHTML = original;
                    }
                });
        });
    }

    /* ---------------- Footer ---------------- */
    function initFooter() {
        document.querySelectorAll('.current-year').forEach(function (el) {
            el.textContent = new Date().getFullYear();
        });
    }
})();

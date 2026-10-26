
/* =================================
   ASAN'S PORTFOLIO JAVASCRIPT
================================= */

document.addEventListener("DOMContentLoaded", () => {

    // 1. Select the navigation elements
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const links = document.querySelectorAll(".nav-links a");

    // 2. Open and close mobile menu
    function closeMenu() {
        navLinks.classList.remove("show");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
        menuToggle.textContent = "☰";
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("show");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // 3. Close the menu after selecting a link
    links.forEach(link => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });

    // 4. Close menu when Escape is pressed
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    // 5. Highlight the active navigation link
    const sections = document.querySelectorAll(
        "main section[id]"
    );

    function updateActiveLink() {
        let currentSection = "home";

        sections.forEach(section => {
            const sectionTop =
                section.getBoundingClientRect().top;

            if (sectionTop <= 180) {
                currentSection = section.id;
            }
        });

        links.forEach(link => {
            const isActive =
                link.getAttribute("href") ===
                "#" + currentSection;

            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute("aria-current", "location");
            } else {
                link.removeAttribute("aria-current");
            }
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    updateActiveLink();

    // 6. Animate sections when they enter the screen
    const revealElements = document.querySelectorAll(
    "#about, #education, #skills, #experience, #projects, #contact"
);

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !reducedMotion) {

        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.08
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            observer.observe(element);
        });

    }

});

/* =========================================================
   GARASI MOTOR
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   DOM READY
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    initMobileMenu();

    initFAQ();

    initScrollReveal();

    initBackToTop();

    initHeaderScroll();

    initSmoothScroll();

});


/* =========================================================
   MOBILE MENU
========================================================= */

function initMobileMenu() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    if (!menuToggle || !navMenu) {
        return;
    }


    menuToggle.addEventListener("click", () => {

        const isOpen =
            navMenu.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

        menuToggle.classList.toggle(
            "active",
            isOpen
        );

    });


    const navLinks =
        navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });


    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedToggle =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedToggle &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove("open");

            menuToggle.classList.remove("active");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        }

    });

}


/* =========================================================
   FAQ
========================================================= */

function initFAQ() {

    const faqItems =
        document.querySelectorAll(".faq-item");

    if (!faqItems.length) {
        return;
    }


    faqItems.forEach((item) => {

        const question =
            item.querySelector(".faq-question");

        if (!question) {
            return;
        }


        question.addEventListener("click", () => {

            const wasOpen =
                item.classList.contains("open");


            /*
             * Tutup FAQ lain agar hanya
             * satu pertanyaan terbuka.
             */

            faqItems.forEach((otherItem) => {

                if (otherItem !== item) {

                    otherItem.classList.remove(
                        "open"
                    );

                    const otherQuestion =
                        otherItem.querySelector(
                            ".faq-question"
                        );

                    if (otherQuestion) {

                        otherQuestion.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            });


            if (wasOpen) {

                item.classList.remove("open");

                question.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                item.classList.add("open");

                question.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });

}


/* =========================================================
   SCROLL REVEAL
========================================================= */

function initScrollReveal() {

    const elements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    if (!elements.length) {
        return;
    }


    /*
     * Fallback untuk browser lama.
     */

    if (!("IntersectionObserver" in window)) {

        elements.forEach((element) => {

            element.classList.add("visible");

        });

        return;
    }


    const observer =
        new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    entry.target.classList.add(
                        "visible"
                    );


                    observerInstance.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach((element) => {

        observer.observe(element);

    });

}


/* =========================================================
   BACK TO TOP
========================================================= */

function initBackToTop() {

    let button =
        document.querySelector(".back-to-top");


    /*
     * Kalau tombol belum ada di HTML,
     * buat otomatis menggunakan JavaScript.
     */

    if (!button) {

        button =
            document.createElement("button");

        button.type = "button";

        button.className =
            "back-to-top";

        button.setAttribute(
            "aria-label",
            "Kembali ke atas"
        );

        button.innerHTML =
            "↑";

        document.body.appendChild(button);

    }


    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add("show");

            } else {

                button.classList.remove("show");

            }

        },
        {
            passive: true
        }
    );


    button.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================================
   HEADER SCROLL
========================================================= */

function initHeaderScroll() {

    const header =
        document.querySelector(".site-header");

    if (!header) {
        return;
    }


    const updateHeader =
        () => {

            if (window.scrollY > 30) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );

}


/* =========================================================
   SMOOTH SCROLL
========================================================= */

function initSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute("href");


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const header =
                    document.querySelector(
                        ".site-header"
                    );


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    headerHeight;


                window.scrollTo({

                    top:
                        Math.max(
                            0,
                            targetPosition
                        ),

                    behavior:
                        "smooth"

                });

            }
        );

    });

}


/* =========================================================
   ACTIVE NAVIGATION
========================================================= */

function initActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const navLinks =
        document.querySelectorAll(
            '.nav-menu a[href^="#"]'
        );


    if (
        !sections.length ||
        !navLinks.length
    ) {
        return;
    }


    if (!("IntersectionObserver" in window)) {
        return;
    }


    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const id =
                        entry.target.getAttribute(
                            "id"
                        );


                    navLinks.forEach((link) => {

                        const href =
                            link.getAttribute(
                                "href"
                            );


                        link.classList.toggle(
                            "active",
                            href === `#${id}`
                        );

                    });

                });

            },
            {
                threshold: 0.25,

                rootMargin:
                    "-80px 0px -55% 0px"
            }
        );


    sections.forEach((section) => {

        sectionObserver.observe(section);

    });

}


/* =========================================================
   YEAR AUTOMATIC
========================================================= */

function initCurrentYear() {

    const yearElements =
        document.querySelectorAll(
            "[data-current-year]"
        );


    if (!yearElements.length) {
        return;
    }


    const currentYear =
        new Date().getFullYear();


    yearElements.forEach((element) => {

        element.textContent =
            currentYear;

    });

}


/* =========================================================
   EXTERNAL LINKS
========================================================= */

function initExternalLinks() {

    const links =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    links.forEach((link) => {

        try {

            const url =
                new URL(
                    link.href,
                    window.location.href
                );


            if (
                url.hostname !==
                window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        } catch (error) {

            /*
             * URL tidak valid dibiarkan
             * tanpa mengganggu halaman.
             */

        }

    });

}


/* =========================================================
   IMAGE FALLBACK
========================================================= */

function initImageFallback() {

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

            },
            {
                once: true
            }
        );

    });

}


/* =========================================================
   ACCESSIBILITY
========================================================= */

function initAccessibility() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    if (menuToggle) {

        if (
            !menuToggle.hasAttribute(
                "aria-expanded"
            )
        ) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }

        if (
            !menuToggle.hasAttribute(
                "aria-label"
            )
        ) {

            menuToggle.setAttribute(
                "aria-label",
                "Buka menu navigasi"
            );

        }

    }

}


/* =========================================================
   INITIALIZE OPTIONAL FEATURES
========================================================= */

initActiveNavigation();

initCurrentYear();

initExternalLinks();

initImageFallback();

initAccessibility();


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

if (
    typeof console !== "undefined" &&
    typeof console.info === "function"
) {

    console.info(
        "Garasi Motor website initialized."
    );

}

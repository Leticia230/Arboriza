document.addEventListener("DOMContentLoaded", () => {
    const internalLinks = document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    const brand = document.querySelector(".brand");

    if (brand) {
        brand.addEventListener("click", (event) => {
            const target = document.querySelector("#inicio");

            if (!target) {
                return;
            }

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
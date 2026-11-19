
const isHtmlPage = window.location.pathname.toLowerCase().includes("/html/");

const homeLink = isHtmlPage ? "../index.html" : "index.html";
const pagePrefix = isHtmlPage ? "" : "Html/";
const assetPrefix = isHtmlPage ? "../" : "";

const navHTML = `
<header class="site-navigation">

    <div class="navigation-bar">

        <a href="${homeLink}" class="nav-logo">
            <img src="${assetPrefix}Assets/Logo/Frame 64.png" alt="Echoes of the South">
        </a>

        <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav-bar">
            <li><a href="${homeLink}">Home</a></li>
            <li><a href="${pagePrefix}Artists.html">Artists</a></li>
            <li><a href="${pagePrefix}Genres.html">Genres</a></li>
            <li><a href="${pagePrefix}Stories.html">Stories</a></li>
        </ul>

    </div>

    <nav class="mobile-menu">
        <a href="${homeLink}">Home</a>
        <a href="${pagePrefix}Artists.html">Artists</a>
        <a href="${pagePrefix}Genres.html">Genres</a>
        <a href="${pagePrefix}Stories.html">Stories</a>
    </nav>

</header>
`;

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("navigation-container");

    if (!container) return;

    container.innerHTML = navHTML;

    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    document.querySelectorAll(".site-navigation a[href]").forEach(link => {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

    const menuToggle = document.querySelector(".menu-toggle");
    const mobileMenu = document.querySelector(".mobile-menu");

    menuToggle.addEventListener("click", () => {

        const isOpen = mobileMenu.classList.toggle("show");

        menuToggle.classList.toggle("open", isOpen);

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation" : "Open navigation"
        );

    });

});

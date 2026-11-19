
const navHTML = `
<header class="site-navigation">

    <div class="navigation-bar">
        <a href="index.html" class="nav-logo">
            <img src="../Assets/Logo/Frame 64.png" alt="Echoes of the South">
        </a>

        <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">
            <span></span>
            <span></span>
            <span></span>
        </button>

        <ul class="nav-bar">
            <li><a href="index.html">Home</a></li>
            <li><a href="Artists.html">Artists</a></li>
            <li><a href="Genres.html">Genres</a></li>
            <li><a href="Stories.html">Stories</a></li>
        </ul>
    </div>

    <nav class="mobile-menu">
        <a href="index.html">Home</a>
        <a href="Artists.html">Artists</a>
        <a href="Genres.html">Genres</a>
        <a href="Stories.html">Stories</a>
    </nav>

</header>
`;

document.addEventListener("DOMContentLoaded", () => {

    const container = document.getElementById("navigation-container");

    // Stop if the navigation container does not exist
    if (!container) return;

    // Insert navigation once
    container.innerHTML = navHTML;

    // Detect current page
    const currentPage = window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();

    // Highlight active desktop and mobile links
    document.querySelectorAll(".site-navigation a[href]").forEach(link => {

        const linkPage = link.getAttribute("href")
            .split("/")
            .pop()
            .toLowerCase();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

    // Mobile menu
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

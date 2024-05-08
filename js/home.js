function handleScroll() {
    const header = document.getElementById("home-logo");
    const displayImg = document.getElementById("logo-img");
    let scrollPos = window.scrollY;
    const initialWidth = 80;
    const minWidth = 41;
    const stopScroll = 100;

    let newWidth;

    if (scrollPos >= 100) {
        header.classList.add("fixed");
    } else {
        header.classList.remove("fixed");
    }
    if (scrollY <= stopScroll) {
        newWidth =
            initialWidth - (scrollY / stopScroll) * (initialWidth - minWidth);
    } else {
        newWidth = minWidth;
    }
    displayImg.width = newWidth;
}

window.addEventListener("scroll", handleScroll);

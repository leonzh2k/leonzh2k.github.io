(() => {
    console.log("ready");
    let main = document.querySelector('main');
    let gallery = document.querySelector('#gallery');

    let viewGallery = document.querySelector("header nav li:first-child");
    let creatViz = document.querySelector("header nav li:last-child");

    let state = "gallery";
    // switch to gallery if not already in gallery
    viewGallery.addEventListener("click", () => {
        console.log(state);
        if (state !== "gallery") {
            let child = main.firstElementChild;
            main.removeChild(child);

            let vizCount = 16;
            let gallery = document.createElement("section");
            gallery.id = "gallery";
            for (let i = 0; i < vizCount; i++) {
                let vizThumbNail = document.createElement("div");
                vizThumbNail.textContent = "viz thumbnail";
                gallery.appendChild(vizThumbNail);
            }

            main.append(gallery);
            state = "gallery";
        }
    });
    // switch to create viz if not already in create viz
    creatViz.addEventListener("click", () => {
        console.log(state);
        if (state !== "create") {
            let child = main.firstElementChild;
            main.removeChild(child);
            let createSection = document.createElement("section");
            createSection.id = "create";
            createSection.textContent = "viz graphic"
            main.appendChild(createSection);

            state = "create";
        }
    });
    // will be fetched from database later
    let vizCount = 18;
    for (let i = 0; i < vizCount; i++) {
        let vizThumbNail = document.createElement("div");
        vizThumbNail.textContent = "viz thumbnail";
        gallery.appendChild(vizThumbNail);
    }
})();
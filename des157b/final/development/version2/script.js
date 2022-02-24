(() => {
    Parse.initialize("01t8qb2FLCXC70NIrlplthJEfFpLVhvx6RCK2S2Z", "MfK5pEk5haJ95TcyTeIkYQdodIQJ2sk1Pn3jZCXX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    
    let main = document.querySelector('main');
    let gallery = document.querySelector('#gallery');

    let viewGallery = document.querySelector("header nav li:first-child");
    let createViz = document.querySelector("header nav li:last-child");

    let state = "gallery";
    // switch to gallery if not already in gallery
    viewGallery.addEventListener("click", () => {
        console.log(state);
        if (state !== "gallery") {
            fetchAndDisplayVizInGallery();
            state = "gallery";
        }
    });

    // switch to create viz if not already in create viz
    createViz.addEventListener("click", () => {
        console.log(state);
        if (state !== "create") {
            let child = main.firstElementChild;
            main.removeChild(child);
            let createSection = document.createElement("section");
            createSection.id = "create";
            createSection.textContent = "viz graphic";
            main.appendChild(createSection);

            state = "create";
        }
    });

    async function fetchAndDisplayVizInGallery() {
        let results = await fetchVizData();
        showVizInGallery(results);
    }

    async function fetchVizData() {
        console.log("fetch data")
        const vizMetadata = Parse.Object.extend('vizMetadata');
        const query = new Parse.Query(vizMetadata);
        const results = await query.descending('createdAt').find();

        console.log(results);
        return results;
    }
    
    function showVizInGallery(vizMetadata) {
        // clear everything from what is supposed to be dynamically populated
        emptyElement([main, gallery]);        
        for (let i = 0; i < vizMetadata.length; i++) {
            let vizThumbNail = document.createElement("div");
            let thumbnail = document.createElement("img");
            console.log(vizMetadata[i].attributes.vizThumbnail);
            // error checking if thumbnail doesn't exist?
            if (!vizMetadata[i].attributes.vizThumbnail) {
                console.log("thumbnail no exist")
            } else {
                thumbnail.src = vizMetadata[i].attributes.vizThumbnail.url();
            }
            vizThumbNail.appendChild(thumbnail);
            gallery.appendChild(vizThumbNail);
        }

        main.append(gallery);
    }

    // clears all child elements of each element in ele array
    function emptyElement(elements) {
        for (let i = 0; i < elements.length; i++) {
            let child = elements[i].firstElementChild;
            while (child) {
                elements[i].removeChild(child);
                child = elements[i].firstElementChild;
            }
        }
    }

    
    fetchAndDisplayVizInGallery();
    console.log("ready");
})();
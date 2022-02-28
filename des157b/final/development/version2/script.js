import squares from "./viz/squares.js";
(() => {
    Parse.initialize("01t8qb2FLCXC70NIrlplthJEfFpLVhvx6RCK2S2Z", "MfK5pEk5haJ95TcyTeIkYQdodIQJ2sk1Pn3jZCXX"); //PASTE HERE YOUR Back4App APPLICATION ID AND YOUR JavaScript KEY
    Parse.serverURL = "https://parseapi.back4app.com/";
    
    let main = document.querySelector('main');
    let gallery = document.querySelector('#gallery');

    let viewGallery = document.querySelector("header nav li:first-child");
    let createViz = document.querySelector("header nav li:last-child");

    let currentViz;
    


    let state = "gallery";
    // switch to gallery if not already in gallery
    viewGallery.addEventListener("click", () => {
        if (state !== "gallery") {
            console.log("switching to gallery viz")
            fetchAndDisplayVizInGallery();
            state = "gallery";
        }
    });

    // switch to create viz if not already in create viz
    createViz.addEventListener("click", () => {
        console.log(state);
        if (state !== "create") {
            console.log("switching to edit viz")
            removeViz();
            emptyElement([main]);
            let createSection = document.createElement("section");
            createSection.id = "create";
            createSection.textContent = "viz graphic";
            main.appendChild(createSection);

            state = "create";
        }
    });

    async function fetchAndDisplayVizInGallery() {
        // clear everything before doing anything else
        removeViz();
        emptyElement([main, gallery]);  
        let results = await fetchVizData();
        showVizInGallery(results);
    }

    async function fetchVizData() {
        console.log("fetch data")
        const vizMetadata = Parse.Object.extend('vizMetadata');
        const query = new Parse.Query(vizMetadata);
        // results shown by most recent order
        const results = await query.descending('createdAt').find();

        // console.log(results);
        return results;
    }
    
    function showVizInGallery(vizMetadata) {
        for (let i = 0; i < vizMetadata.length; i++) {
            let vizThumbnail = document.createElement("div");
            vizThumbnail.addEventListener("click", () => {
                console.log("switching to view viz")
        
                displayVizInViewViz(vizMetadata[i]);
                // console.log(vizMetadata[i].get("vizParams"));
                state = "view";
            });
            let thumbnail = document.createElement("img");
            // console.log(vizMetadata[i].attributes.vizThumbnail);
            // error checking if thumbnail doesn't exist?
            if (!vizMetadata[i].attributes.vizThumbnail) {
                console.log("thumbnail no exist");
            } else {
                thumbnail.src = vizMetadata[i].get("vizThumbnail").url();
            }
            vizThumbnail.appendChild(thumbnail);
            gallery.appendChild(vizThumbnail);
        }

        main.append(gallery);
    }

    function removeViz() {
        if (currentViz) {
            console.log("removing sketch");
            currentViz.remove();
        }
    }

    // clears all child elements of each element in ele array
    // also cleans up any p5 sketch on the screen
    function emptyElement(elements) {
        for (let i = 0; i < elements.length; i++) {
            let child = elements[i].firstElementChild;
            while (child) {
                elements[i].removeChild(child);
                child = elements[i].firstElementChild;
            }
        }
    }

    function displayVizInViewViz(vizMetadata) {
        // console.log(vizMetadata);
        emptyElement([main, gallery]);
        // section.textContent = vizMetadata.get("vizParams").bassColor;
        let section = document.createElement("section");
        section.id = "view-viz";
        

        // assume data has no errors for now (viz always shows), 
        // perform proper error checking later
        emptyElement([main, gallery]);
        main.appendChild(section);
        // decide which viz to show
        // try {
        switch (vizMetadata.get("vizType")) {
            case("Squares"):
                console.log("Squares!");
                currentViz = new p5(squares(vizMetadata),"view-viz");
                break;
            default:
                throw `no viz of type ${vizMetadata.get("vizType")} supported!`;
        }
            
        // } catch (e) {
        //     console.error(e);
        // }
    }

    fetchAndDisplayVizInGallery();
    
    console.log("ready");

    // console.log("vizParams: ", vizMetadata[i].get("vizParams"));
                // const vizMetadata = Parse.Object.extend("vizMetadata");
                // const VizMetadata = new vizMetadata();
                // VizMetadata.save({
                //     vizType: "Squares",
                //     vizParams: {
                //         bassColor: "#4DFF00",
                //         trebleColor: "#00FFD5",

                //     }
                // }).then((VizMetadata) => {
                //     console.log("succes");
                // }, (error) => {
                //     console.log(error);
                // });
})();
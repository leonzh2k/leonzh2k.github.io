import squares from "./viz/squares.js";
// import squaresExperimental from "./viz/squaresExperimental.js";
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
            createSection.id = "create-viz";
            // createSection.textContent = "viz graphic";
            main.appendChild(createSection);
            createSection.innerHTML = `
                <span>Search for a song</span>
                <div id="currentsong"></div>
                <input type=text id="searchsong">
                
                </input>
                <button id="search">search</button>
                <div>Click on a song to select it for the viz and then submit when you're ready. The viz will show up on the gallery.</div>
                <div id="searchresults"><div>t</div></div>
                <button id="submit">Submit</button>
            
            `
            let vizParams = {
                "bassColor": "#646ffc",
                "trebleColor": "#fc41a5",
                "songUrl": null,
                "artist": null,
                "songTitle": null
            }
            document.querySelector("#submit").addEventListener("click", () => {
                const vizMetadata = Parse.Object.extend("vizMetadata");
                const VizMetadata = new vizMetadata();
                VizMetadata.save({
                    vizType: "Squares",
                    vizParams: vizParams
                }).then((VizMetadata) => {
                    console.log("succes");
                }, (error) => {
                    console.log(error);
                });
            })
            
            document.querySelector("#search").addEventListener("click", async () => {
                console.log(document.querySelector("#searchsong").value);
                const songToSearch = document.querySelector("#searchsong").value;
                if (songToSearch !== "") {
                    asyncFetchTrackData("ZDIxMDM1NTEtYjk3OS00YTI1LWIyYjItYjBjOWVmMWYyN2I3", songToSearch).then(searchResults => {
                        emptyElement([document.querySelector("#searchresults")]);
                        console.log(searchResults);
                        searchResults.search.data.tracks.forEach(track => {
                            let div = document.createElement("div");
                            div.textContent = `${track.artistName} - ${track.name}`;
                            document.querySelector("#searchresults").appendChild(div);

                            div.addEventListener("click", () => {
                                vizParams.songUrl = track.previewURL;
                                vizParams.artist = track.artistName;
                                vizParams.songTitle = track.name;
                                document.querySelector("#currentsong").textContent = `CURRENTLY SELECTED SONG: ${vizParams.artist} - ${vizParams.songTitle}`
                                // console.log(trackURL);
                            })
                            // finalTrackData.push({
                            //   trackImageSrc: "https://api.napster.com/imageserver/v2/albums/" + track.albumId + "/images/500x500.jpg",
                            //   trackID: track.id,
                            //   trackShortcut: track.shortcut,
                            //   trackName: track.name,
                            //   trackArtist: track.artistName,
                            //   trackOrder: trackOrder
                            // })
                            // trackOrder++;
                          })
                    })
                }
            
            })
        
            // let defaultVizData = {

            // }
            // currentViz = new p5(squares(vizMetadata),"create-viz");
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
            currentViz.stopAudio();
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
        console.log("viz data: ", vizMetadata);
        emptyElement([main, gallery]);

        let section = document.createElement("section");
        section.id = "view-viz";
        
        // assume data has no errors for now (viz always shows), 
        // perform proper error checking later
        main.appendChild(section);
        // decide which viz to show
        // try {
        switch (vizMetadata.get("vizType")) {
            case("Squares"):
                console.log("Squares!");
                currentViz = new p5(squares(vizMetadata),"view-viz");
                console.log(currentViz.jf)
                break;
            default:
                throw `no viz of type ${vizMetadata.get("vizType")} supported!`;
        }
            
        // } catch (e) {
        //     console.error(e);
        // }
    }

    async function asyncFetchTrackData(API_KEY, queryParameters) {
        const response = await fetch(`https://api.napster.com/v2.2/search?apikey=${API_KEY}&query=${queryParameters}&type=track`);
        const trackData = await response.json();
        return trackData;
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
    alert("Hello.\nPlease do the following:\n1. View some audio visualizations. \n2. Figure out how to play and pause the audio in a viz.\n3. Create a viz using your favorite song, then view it in the gallery. ");
})();
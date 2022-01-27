(() => {
    'use strict';
    
    async function getData() {
        const promise = await fetch("data/data.json");
        const data = await promise.json();
        // setup event listeners only when data is finished loading
        setupEventListeners(data); 
    }
    
    function setupEventListeners(data) {
        const datapointDOMReps = document.querySelectorAll(".datapoint");
        datapointDOMReps.forEach(domRep => {
            domRep.addEventListener("mouseover", (e) => {
                document.querySelector("#blink-text").innerHTML = data[e.currentTarget.id].blinks;
                document.querySelector("#activity-text").innerHTML = data[e.currentTarget.id].activity;
            })
        })
    }
    
    getData();
})();
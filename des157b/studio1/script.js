(function () {
    'use strict';


    const replayButton = document.getElementById("replay-button");
    let canReplay = false;

    const shore = document.getElementById("shore");

    shore.addEventListener("mouseover", () => {
        if (line1Shown) {
            myVideo.style.filter = "saturate(720%)";
        }        
    })

    shore.addEventListener("mouseout", () => {
        myVideo.style.filter = "none";
    })
    const loadingMsg = document.querySelector('#loading-message');

    myVideo.addEventListener('playing', function() {
        loadingMsg.style.display = 'none';
        replayButton.className = "hidden";
        replayButton.style.zIndex = '1';
    })

    replayButton.addEventListener('click', () => {
        if (canReplay) {
            myVideo.currentTime = 0;
            myVideo.play();
            canReplay = false;
        }
    })


    const line1 = document.querySelector('#line1');
    let line1Shown = false;
    const line2 = document.querySelector('#line2');
    const line3 = document.querySelector('#line3');
    const line4 = document.querySelector('#line4');

    const poem = {
        start: [2, 7.3, 10.7, 15.9],
        stop: [5.4, 10.6, 14.5, 18.3],
        line: [line1, line2, line3, line4]
    }

    const intervalID = setInterval(checkTime, 100);

    function checkTime() {
        // console.log(myVideo.currentTime);

        if (poem.start[0] < myVideo.currentTime && myVideo.currentTime < poem.stop[0]) {
            poem.line[0].className = "showing";
            line1Shown = true;
        } else {
            poem.line[0].className = "hidden";
            line1Shown = false;
        }
        if (poem.start[1] < myVideo.currentTime && myVideo.currentTime < poem.stop[1]) {
            poem.line[1].className = "showing";
        } else {
            poem.line[1].className = "hidden";
        }
        if (poem.start[2] < myVideo.currentTime && myVideo.currentTime < poem.stop[2]) {
            poem.line[2].className = "showing";
        } else {
            poem.line[2].className = "hidden";
        }
        if (poem.start[3] < myVideo.currentTime && myVideo.currentTime < poem.stop[3]) {
            poem.line[3].className = "showing";
        } else {
            poem.line[3].className = "hidden";
        }
    }

    myVideo.addEventListener('ended', () => {
        console.log("ended");
        canReplay = true;
        replayButton.className = "showing";
        replayButton.style.zIndex = '4';
    });

    
})();
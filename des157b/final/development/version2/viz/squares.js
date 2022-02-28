function squares(vizMetadata) {
    const s = ( sketch ) => {
        // console.log(currentSketch);
        let x = 100;
        let y = 100;
        let rotate = 0;
        let windowHeight = window.innerHeight;
        let songName = 'https://listen.hs.llnwd.net/g1/prvw/9/2/8/8/0/978308829.mp3';
        let song;
        let fft;
        // console.log(di);

        sketch.preload = () => {
            sketch.soundFormats('mp3');
            song = sketch.loadSound(songName);
        }
        sketch.setup = () => {
            // console.log(document.getElementById("view-viz").clientHeight);
            sketch.createCanvas(document.getElementById("view-viz").clientWidth, windowHeight / 1.2);
            // sketch.parent("main");

            fft = new p5.FFT();
            sketch.rectMode(sketch.CENTER);
        };
    
        sketch.windowResized = () => {
            windowHeight = window.innerHeight;
            sketch.resizeCanvas(document.getElementById("view-viz").clientWidth, windowHeight / 1.2);
            console.log("resize");
        };
    
        sketch.draw = () => {
            sketch.background(0); // clears previous drawings (without it would keep)
            sketch.fill(255);

            fft.analyze();
            let trebEnergy = fft.getEnergy("treble");
            let lowMidEnergy = fft.getEnergy("lowMid");

            sketch.translate(document.getElementById("view-viz").clientWidth / 2, windowHeight / (2 * 1.2));
            sketch.rotate(-rotate);
            sketch.noFill();
            sketch.stroke(vizMetadata.get("vizParams").bassColor);
            sketch.rect(0,0,lowMidEnergy,lowMidEnergy);

            sketch.rotate(rotate*2);
            sketch.noFill();
            sketch.stroke(vizMetadata.get("vizParams").trebleColor);
            sketch.rect(0,0,trebEnergy,trebEnergy);


            rotate += 0.01;
        };

        sketch.mousePressed = () => {
            console.log("canvas pressed");
            if (song.isPlaying()) {
                song.pause();
                sketch.noLoop();
            } else {
                song.play();
                sketch.loop();
            }
            // sketch.noLoop();
            // let fs = sketch.fullscreen();
            // sketch.fullscreen(!fs);
        };
        console.log("squres ready");
    };
    return s;
}




export default squares;
function squares(vizMetadata) {
    const s = ( sketch ) => {
        // console.log(currentSketch);
        let x = 100;
        let y = 100;
        let rotate = 0;
        let windowHeight = window.innerHeight;
        let songName = 'http://api.soundcloud.com/tracks/148976759/stream?client_id=95f22ed54a5c297b1c41f72d713623ef';
        let song;
        let fft;
        let context;
        let src;
        let analyzer;
        let bufferLength;
        let dataArray;
        let osc;
        // let x = 0;
        let playing = false;
        let up = true;
        // console.log(di);
        // const player = new Tone.Player(songName).toDestination();
        // Tone.loaded().then(() => {
        //     player.start();
        // });
        sketch.preload = () => {
            // loadSound doesn't seem to work for web urls
            // sketch.soundFormats('mp3');
            // song = sketch.loadSound(songName);
            // osc = new p5.Oscillator('sine');
            // song = new Audio(songName);
            // song.crossOrigin = "anonymous";
            // context = new AudioContext();
            // src = context.createMediaElementSource(song); //create src inside ctx
            // analyzer = context.createAnalyser(); //create analyser in ctx
            // src.connect(analyzer);         //connect analyser node to the src
            // analyzer.connect(context.destination); // connect the destination 
            //                                     // node to the analyser

            // analyzer.fftSize = 512;
            // bufferLength = analyzer.frequencyBinCount;
            // dataArray = new Uint8Array(bufferLength);   
        }
        sketch.setup = () => {
            // console.log(document.getElementById("view-viz").clientHeight);
            osc = new p5.Oscillator("sawtooth");
            osc.freq(x);
            osc.amp(0.1);
            osc.pan(0.1, 1)
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
            console.log("draw")
            // console.log(analyzer.getByteFrequencyData(dataArray));
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

            osc.freq(x);
            rotate += 0.01;
            console.log(x)
            if (up) {
                x += 1;
            } else {
                x -= 1;
            }
            
            if (x == 50) {
                up = true;
            }

            if (x == 200) {
                up = false;
            }
            
        };

        sketch.mousePressed = () => {
            // console.log("canvas pressed");
            // if (!song.paused) {
            //     song.pause();
            //     sketch.noLoop();
            // } else {
            //     song.play();
            //     sketch.loop();
            // }
            if (!playing) {
                osc.start();
                playing = !playing;
            } else {
                osc.stop();
                playing = !playing;
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
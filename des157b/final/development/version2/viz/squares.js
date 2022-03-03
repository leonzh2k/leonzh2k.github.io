function squares(vizMetadata) {
    const s = ( sketch ) => {
        // console.log(currentSketch);
        // let x = 100;
        let y = 100;
        let rotate = 0;
        let windowHeight = window.innerHeight;
        let songName = 'https://cors-anywhere.herokuapp.com/https://listen.hs.llnwd.net/g3/prvw/2/8/4/0/6/2387160482.mp3';
        let song;
        let fft;
        
        sketch.preload = () => {
            sketch.soundFormats('mp3');
            var request = new XMLHttpRequest();
            request.open('GET', songName);
            request.responseType = 'blob';
            // I put "XMLHttpRequest" here, but you can use anything you want.
            request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            request.onload = function() {
                // alert(x.responseText);
                console.log(request);
                var url = URL.createObjectURL(request.response);
                console.log(url);
                // song = new Audio(url);
                song = sketch.loadSound(request.response);
                // song.play();
            };
            request.send();

            // song = sketch.loadSound(songName);
            // song = new Audio("https://cors-anywhere.herokuapp.com/https://listen.hs.llnwd.net/g3/prvw/2/8/4/0/6/2387160482.mp3")
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
            // osc = new p5.Oscillator("sawtooth");
            // osc.freq(x);
            // osc.amp(0.1);
            // osc.pan(0.1, 1)
            sketch.createCanvas(document.getElementById("view-viz").clientWidth, windowHeight / 1.2);

            fft = new p5.FFT();
            sketch.rectMode(sketch.CENTER);
        };
    
        sketch.windowResized = () => {
            windowHeight = window.innerHeight;
            sketch.resizeCanvas(document.getElementById("view-viz").clientWidth, windowHeight / 1.2);
            console.log("resize");
        };
    
        sketch.draw = () => {
            // console.log("draw")
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
            // if (!playing) {
            //     osc.start();
            //     playing = !playing;
            // } else {
            //     osc.stop();
            //     playing = !playing;
            // }
           
            // sketch.noLoop();
            // let fs = sketch.fullscreen();
            // sketch.fullscreen(!fs);
        };
        console.log("squres ready");
    };
    return s;
}




export default squares;
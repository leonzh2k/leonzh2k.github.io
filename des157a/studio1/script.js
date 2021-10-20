(function () {
    "use strict";
    function displayCodeOutput(userInputs) {
        let outputLines = [];
        outputLines.push("First for loop running...");

        for (let i = 0; i < userInputs.unnestedForLoopMaxIterVal; i++) {
            outputLines.push(userInputs.unnestedForLoopConsoleLogVal);
        }
        outputLines.push("First for loop ended.");
        outputLines.push("Nested for loop running...");
        for (let i = 0; i < userInputs.nestedForLoopOuterLoopMaxIterVal; i++) {
            let emptyStr = "";
            for (let j = 0; j < userInputs.nestedForLoopInnerLoopMaxIterVal; j++) {
                emptyStr += userInputs.nestedForLoopBoxSymbol;
            }
            outputLines.push(emptyStr);
        }
        outputLines.push("Nested for loop ended.");

        let output = document.querySelector("#output");
        
        outputLines.forEach(line => {
            output.appendChild(document.createTextNode(line));
            output.appendChild(document.createElement("br"));
        });
        
    }

    function getUserInputs() {
        const unnestedForLoopMaxIterVal = Number(document.querySelector("#unnested-for-loop-max-iter-input").value);
        const unnestedForLoopConsoleLogVal = document.querySelector("#unnested-for-loop-console-log-input").value;
        const nestedForLoopOuterLoopMaxIterVal = Number(document.querySelector("#nested-for-loop-outer-loop-max-iter-input").value);
        const nestedForLoopInnerLoopMaxIterVal = Number(document.querySelector("#nested-for-loop-inner-loop-max-iter-input").value);
        const nestedForLoopBoxSymbol = document.querySelector("#nested-for-loop-box-symbol").value;

        // console.log(unnestedForLoopMaxIterVal);
        // console.log( unnestedForLoopConsoleLogVal);
        // console.log( nestedForLoopOuterLoopMaxIterVal);
        // console.log( nestedForLoopInnerLoopMaxIterVal);
        // console.log( nestedForLoopBoxSymbol);


        let userInputs = {
            unnestedForLoopMaxIterVal,
            unnestedForLoopConsoleLogVal,
            nestedForLoopOuterLoopMaxIterVal,
            nestedForLoopInnerLoopMaxIterVal,
            nestedForLoopBoxSymbol
        };

        return userInputs;
    }
    let button = document.querySelector("#run-code-button");
    button.addEventListener("click", () => {
        let userInputs = getUserInputs();
        displayCodeOutput(userInputs);
    });
}());




console.log("First for loop running...")
                            
for (let i = 0; i < 6; i++) { 
    console.log("bru")
}

console.log("First for loop ended.")

console.log("Nested for loop running...")

for (let i = 0; i < 6; i++) { 
    let emptyStr = "";
    for (let j = 0; j < 6; j++) {
        emptyStr += "*"   
    }
    console.log(emptyStr);
}

console.log("Nested for loop ended.")
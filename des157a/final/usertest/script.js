(function () {
    "use strict";
    console.log("reading js...");
    // clears terminal of everything. Also removes the loading icon.
    function clearTerminal() {
        let output = document.querySelector("#output");
        output.textContent = "";
    }

    function displayCodeOnTerminal(userInputs) {
        // remove quotations
        userInputs.unnestedForLoopConsoleLogVal = userInputs.unnestedForLoopConsoleLogVal.replace("\"", "");
        userInputs.unnestedForLoopConsoleLogVal = userInputs.unnestedForLoopConsoleLogVal.replace("\"", "");

        userInputs.nestedForLoopBoxSymbol = userInputs.nestedForLoopBoxSymbol.replace("\"", "");
        userInputs.nestedForLoopBoxSymbol = userInputs.nestedForLoopBoxSymbol.replace("\"", "");

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
        
        let displayDelay = 0;
        outputLines.forEach(line => {
            setTimeout(() => {
                let spanDOMElement = document.createElement("span");
                spanDOMElement.classList.add("code-output-line");
                spanDOMElement.appendChild(document.createTextNode(line));
                output.appendChild(spanDOMElement);
                // output.appendChild(document.createElement("br"));
            }, displayDelay);
            displayDelay += 5;
        });
        
    }
    
    function displayErrorsOnTerminal(errorMsgs) {
        let displayDelay = 0;
        errorMsgs.forEach(msg => {
            setTimeout(() => {
                let errorMsgDOMElement = document.createElement("span");
                errorMsgDOMElement.classList.add("error-msg");
                errorMsgDOMElement.appendChild(document.createTextNode(msg.errorMsg));
                output.appendChild(errorMsgDOMElement);
                output.appendChild(document.createElement("br"));

                let descriptiveMsgDOMElement = document.createElement("span");
                descriptiveMsgDOMElement.classList.add("error-msg");
                descriptiveMsgDOMElement.classList.add("desc-error-msg");
                descriptiveMsgDOMElement.appendChild(document.createTextNode(msg.descriptiveErrorMsg));
                output.appendChild(descriptiveMsgDOMElement);
                output.appendChild(document.createElement("br"));
                output.appendChild(document.createElement("br"));
            }, displayDelay);
            displayDelay += 10;
        })
    }

    function getUserInputs() {
        const unnestedForLoopMaxIterVal = document.querySelector("#unnested-for-loop-max-iter-input").value;
        const unnestedForLoopConsoleLogVal = document.querySelector("#unnested-for-loop-console-log-input").value;
        const nestedForLoopOuterLoopMaxIterVal = document.querySelector("#nested-for-loop-outer-loop-max-iter-input").value;
        const nestedForLoopInnerLoopMaxIterVal = document.querySelector("#nested-for-loop-inner-loop-max-iter-input").value;
        const nestedForLoopBoxSymbol = document.querySelector("#nested-for-loop-box-symbol").value;

        console.log(unnestedForLoopMaxIterVal);
        console.log(unnestedForLoopConsoleLogVal);
        console.log(nestedForLoopOuterLoopMaxIterVal);
        console.log(nestedForLoopInnerLoopMaxIterVal);
        console.log(nestedForLoopBoxSymbol);


        let userInputs = {
            unnestedForLoopMaxIterVal,
            unnestedForLoopConsoleLogVal,
            nestedForLoopOuterLoopMaxIterVal,
            nestedForLoopInnerLoopMaxIterVal,
            nestedForLoopBoxSymbol
        };
        console.log(userInputs);
        return userInputs;
    }

    function validateUserInputs(userInputs) {
        console.log(userInputs.unnestedForLoopMaxIterVal);
        console.log(userInputs.unnestedForLoopConsoleLogVal);
        console.log(userInputs.nestedForLoopOuterLoopMaxIterVal);
        console.log(userInputs.nestedForLoopInnerLoopMaxIterVal);
        console.log(userInputs.nestedForLoopBoxSymbol);

        let errors = [];

        console.log(userInputs.unnestedForLoopMaxIterVal === "");
        if (userInputs.unnestedForLoopMaxIterVal === "") {
            errors.push({
                line: 3,
                input: userInputs.unnestedForLoopMaxIterVal,
                errorType: "SyntaxError",
                expectedInput: "integer"
            });
        } else {
            if (Number.isNaN(Number(userInputs.unnestedForLoopMaxIterVal))) {
                errors.push({
                    line: 3,
                    input: userInputs.unnestedForLoopMaxIterVal,
                    errorType: "TypeError",
                    expectedType: "integer"
                });
            } 
        }

        if (userInputs.unnestedForLoopConsoleLogVal === "") {
            errors.push({
                line: 4,
                input: userInputs.unnestedForLoopConsoleLogVal,
                errorType: "SyntaxError",
                expectedType: "string",
                expectedInput: "string"
            });
        } else {
            if (!(userInputs.unnestedForLoopConsoleLogVal[0] === '"' && userInputs.unnestedForLoopConsoleLogVal[userInputs.unnestedForLoopConsoleLogVal.length - 1] === '"')) {
                errors.push({ 
                    line: 4,
                    input: userInputs.unnestedForLoopConsoleLogVal,
                    errorType: "TypeError",
                    expectedType: "string"
                });
            } 
        }
        
        if (userInputs.nestedForLoopOuterLoopMaxIterVal === "") {
            errors.push({
                line: 11,
                input: userInputs.nestedForLoopOuterLoopMaxIterVal,
                errorType: "SyntaxError",
                expectedInput: "integer"
            });
        } else {
            if (Number.isNaN(Number(userInputs.nestedForLoopOuterLoopMaxIterVal))) {
                errors.push({
                    line: 11,
                    input: userInputs.nestedForLoopOuterLoopMaxIterVal,
                    errorType: "TypeError",
                    expectedType: "integer"
                });
            }
        }
        if (userInputs.nestedForLoopInnerLoopMaxIterVal === "") {
            errors.push({
                line: 13,
                input: userInputs.nestedForLoopInnerLoopMaxIterVal,
                errorType: "SyntaxError",
                expectedInput: "integer"
            });
        } else {
            if (Number.isNaN(Number(userInputs.nestedForLoopInnerLoopMaxIterVal))) {
                errors.push({
                    line: 13,
                    input: userInputs.nestedForLoopInnerLoopMaxIterVal,
                    errorType: "TypeError",
                    expectedType: "integer"
                });
            } 
        }
        
        
        
        if (userInputs.nestedForLoopBoxSymbol === "") {
            errors.push({
                line: 14,
                input: userInputs.nestedForLoopBoxSymbol,
                errorType: "SyntaxError",
                expectedInput: "string"
            });
        } else {
            if (!(userInputs.nestedForLoopBoxSymbol[0] === '"' && userInputs.nestedForLoopBoxSymbol[userInputs.nestedForLoopBoxSymbol.length - 1] === '"')) {
                errors.push({ 
                    line: 14,
                    input: userInputs.nestedForLoopBoxSymbol,
                    errorType: "TypeError",
                    expectedType: "string"
                });
            } 
        }
        

        console.log(errors);
        return errors;
    }

    function generateErrorMsgs(errors) {
        let errorMsgs = [];
        errors.forEach(error => {
            let errorMsg;
            let descriptiveErrorMsg;
            switch (error.errorType) {
                case ("TypeError"):
                    errorMsg = "TypeError on line " + String(error.line) + ":";
                    descriptiveErrorMsg = `${error.input} is not a ${error.expectedType}. Please enter a ${error.expectedType}.`;
                    errorMsgs.push({
                        errorMsg,
                        descriptiveErrorMsg
                    });
                    break;
                case ("SyntaxError"):
                    errorMsg = "SyntaxError on line " + String(error.line) + ":";
                    descriptiveErrorMsg = `Expected ${error.expectedInput} as input, got nothing.`;
                    errorMsgs.push({
                        errorMsg,
                        descriptiveErrorMsg
                    });
                    break;
                default:
                    console.log("soomething bad happend");
            }
        })
        console.log(errorMsgs);
        return errorMsgs;
    }

    function highlightErrorLines(errors) {
        errors.forEach(error => {
            let lineDOMElement = document.getElementById("code-line-" + error.line);
            lineDOMElement.classList.add("error-highlighted");
        });
    }

    function unHighlightErrorLines() {
        let possibleErrorLineNums = [3, 4, 11, 13, 14];
        possibleErrorLineNums.forEach(num => {
            let lineDOMElement = document.getElementById("code-line-" + num);
            lineDOMElement.classList.remove("error-highlighted");
        });
    }

    function showFakeLoadingIcon(imageSrc) {
        let loadingIconDOMElement = document.createElement('img');
        loadingIconDOMElement.setAttribute("src", imageSrc);
        loadingIconDOMElement.setAttribute("id", "loading-icon");
        loadingIconDOMElement.setAttribute("width", "150");
        loadingIconDOMElement.setAttribute("height", "150");
        loadingIconDOMElement.setAttribute("alt", "Loading Icon");
        let output = document.querySelector("#output");
        output.appendChild(loadingIconDOMElement);
    }

    let button = document.querySelector("#run-code-button");
    button.addEventListener("click", () => {
        let userInputs = getUserInputs();
        let errors = validateUserInputs(userInputs);
        unHighlightErrorLines();
        clearTerminal();
        showFakeLoadingIcon("images/loading.svg");
        setTimeout(() => {
            clearTerminal();
            if (!errors.length) {
                displayCodeOnTerminal(userInputs);
            } else {
                let errorMsgs = generateErrorMsgs(errors);
                // hideFakeLoadingIcon();
                displayErrorsOnTerminal(errorMsgs);
                highlightErrorLines(errors);
            }
        }, 500);
    });

    function switchToJSCode() {
        let codeArea = document.querySelector("#code-input pre");
        // has to be indented like this so it shows up indented properly on screen
        codeArea.innerHTML = 
        `
                        <span class="line-number">01</span>   <span class="console">console</span>.<span class="log">log</span>(<span class="string">"First for loop running..."</span>);
                        <span class="line-number">02</span>
                        <span id="code-line-3"></span><label for="unnested-for-loop-max-iter-input"><span class="line-number">03</span>   <span class="for">for</span> (<span class="var-declaration">let</span> <span class="var-name">i</span> = <span class="number">0</span>; <span class="var-name">i</span> &lt; <input id="unnested-for-loop-max-iter-input" title="input type: integer" class="number-input" maxlength="2" autocomplete="off">; <span class="var-name">i</span>++) <span class="for-outer-bracket">{</span></label>
                        <span id="code-line-4"></span><label for="unnested-for-loop-console-log-input"><span class="line-number">04</span>       <span class="console">console</span>.<span class="log">log</span>(<input type="text" title="input type: string (ex: &quot;Hello, World!&quot;)" id="unnested-for-loop-console-log-input" maxlength="20" autocomplete="off">);</label>
                        <span class="line-number">05</span>   <span class="for-outer-bracket">}</span>
                        <span class="line-number">06</span>
                        <span class="line-number">07</span>   <span class="console">console</span>.<span class="log">log</span>(<span class="string">"First for loop ended."</span>);
                        <span class="line-number">08</span>
                        <span class="line-number">09</span>   <span class="console">console</span>.<span class="log">log</span>(<span class="string">"Nested for loop running..."</span>);
                        <span class="line-number">10</span>
                        <span id="code-line-11"></span><label for="nested-for-loop-outer-loop-max-iter-input"><span class="line-number">11</span>   <span class="for">for</span> (<span class="var-declaration">let</span> <span class="var-name">i</span> = <span class="number">0</span>; <span class="var-name">i</span> &lt; <input id="nested-for-loop-outer-loop-max-iter-input" title="input type: integer" class="number-input" maxlength="2" autocomplete="off">; <span class="var-name">i</span>++) <span class="for-outer-bracket">{</span></label>
                        <span class="line-number">12</span>      <span class="var-declaration">let</span> <span class="var-name">emptyStr</span> = <span class="string">""</span>;
                        <span id="code-line-13"></span><label for="nested-for-loop-inner-loop-max-iter-input"><span class="line-number">13</span>      <span class="for">for</span> (<span class="var-declaration">let</span> <span class="var-name">j</span> = <span class="number">0</span>; <span class="var-name">j</span> &lt; <input id="nested-for-loop-inner-loop-max-iter-input" title="input type: integer" class="number-input" maxlength="2" autocomplete="off">; <span class="var-name">i</span>++) <span class="for-inner-bracket">{</span></label>
                        <span id="code-line-14"></span><label for="nested-for-loop-box-symbol"><span class="line-number">14</span>          <span class="var-name">emptyStr</span> += <input type="text" id="nested-for-loop-box-symbol" title="input type: string (ex: &quot;Hello, World!&quot;)" maxlength="3" autocomplete="off">;  </label>
                        <span class="line-number">15</span>      <span class="for-inner-bracket">}</span>
                        <span class="line-number">16</span>      <span class="console">console</span>.<span class="log">log</span>(<span class="var-name">emptyStr</span>);
                        <span class="line-number">17</span>   <span class="for-outer-bracket">}</span>
                        <span class="line-number">18</span>
                        <span class="line-number">19</span>  <span class="console">console</span>.<span class="log">log</span>(<span class="string">"Nested for loop ended."</span>);
                        <span class="line-number">20</span>
                        <span class="line-number">21</span>
                        <span class="line-number">22</span>
                        <span class="line-number">23</span>
        
        `
        console.log(codeArea);
    }

    function switchToPythonCode() {
        let codeArea = document.querySelector("#code-input pre");
        codeArea.innerHTML = "";
        console.log(codeArea);
    }

    // Language switching logic
    let selectLang = document.querySelector("#language");
    selectLang.addEventListener("change", (e) => {
        clearTerminal();
        // console.log("change", e.target.value);
        switch (e.target.value) {
            case ("JavaScript"):
                // console.log("Switch to JavaScript code");
                switchToJSCode();
                break;
            case("Python"):
                // console.log("Switch to python code");
                switchToPythonCode();
                break;


        }
    })
    
}());

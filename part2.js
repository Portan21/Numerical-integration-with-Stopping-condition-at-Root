let functionP;
let functionQ;
let outputA;
let outputB;
let c;

//Initiate Calculation
function StartCalculate(){
    ClearOutput();
    ShowLoading();
    setTimeout(ReadInputs, 10);
}

//Read Inputs and initiate Calculate
function ReadInputs(){
    const p = document.getElementById("pinput").value;
    const q = document.getElementById("qinput").value;
    let a = Number(document.getElementById("ainput").value);
    let b = Number(document.getElementById("binput").value);
    let n = Number(document.getElementById("ninput").value);

    //Stop Function when there is an error in input
    if(CheckInput()){
        HideLoading();
        return false;
    }
    Calculate(p, q, a, b, n);
}

//Function to initiate calculation of Trapezoid Rule and Simpson's Rule
function Calculate(p, q, a, b, n){
    let deltaX = ((b-a)/n);
    let x = a;
    let functionOfX;
    let sum = 0;
    let answer;
    
    //Check if there is a root or not
    //If there is root it will output the code inside else, and if there is not it will continue to Integration
    if (Bisection(a, b, q) && Newton(a, b, q) && Secant(a, b, q)){
        TrapezoidRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer);
        SimpsonRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer);
        HideLoading();
    }
    else{
        HideLoading();
        document.getElementById("outputT").innerHTML = "T: ";
        document.getElementById("outputS").innerHTML = "S: ";
        document.getElementById("outputStop").innerHTML = "f(x) = (" + p + ") / (" + q + ") is not defined at " + c;
        document.getElementById("outputStop2").innerHTML = "which is inside [" + a + ", " + b + "]";
    }
}

//Trapezoid Rule
function TrapezoidRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer){

    for (let i = a; i <= b; i += deltaX){
        if (i == a || n == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX;
        }
        else{
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX * 2;
        }
        x += deltaX;
        n--;
    }

    answer = (deltaX / 2) * sum;

    document.getElementById("outputT").innerHTML = "T: " + answer;
}

//Simpson's Rule
function SimpsonRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer){

    let counter = 0;

    for (let i = a; i <= b; i += deltaX){
        if (i == a || n == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX;
        }
        else if(counter%2 == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX * 2;
        }
        else{
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX * 4;
        }
        x += deltaX;
        n--;
        counter++;
    }

    answer = (deltaX / 3) * sum;

    document.getElementById("outputS").innerHTML = "S: " + answer;
    document.getElementById("outputStop").innerHTML = "";
    document.getElementById("outputStop2").innerHTML = "";
}

//Check Root by using bisection
function Bisection(a, b, q){
    let tempA = a;
    let tempB = b;
    let functionC = 0;
    let computeError;
    let error = 1;

    if(q == 0){
        c = 0;
        return false;
    }

    for(let i = 0; i <= 1000; i++){
        c = (tempA+tempB)/2;
        functionC = math.evaluate(q, { x : c });

        if(functionC == 0 || functionC == -4.440892098500626e-16){
            return false;
        }

        //Subtitution of Values
        if(functionC > 0){
            tempA = c
        }

        if(functionC < 0){
            tempB = c
        }

        //Error computation
        computeError = (tempA * 10 - tempB * 10) / 10;
        error = math.abs(computeError);

        if (error == 0 || error == 4.440892098500626e-16){
            return true;
        }
    }
    return true;
}

function Newton(a, b, q){
    let tempA = a;
    let tempB = b;
    let Xn = 0
    let computeError = 0;
    let error = 1;
    let XnPrevious = 0;


    for(let i = 0; i <= 1000; i++){
        functionA = math.evaluate(q, { x : tempB });

        derivative = math.derivative(q, 'x').evaluate({x : tempB});

        XnPrevious = Xn;
        Xn = tempB - (functionA/derivative);

        functionXn = math.evaluate(q, { x : Xn });

        computeError = (Xn * 10 - tempB * 10) / 10;
        error = math.abs(computeError);

        if(error == 0 || error == 4.440892098500626e-16){
            c = XnPrevious;
            return false;
        }

        if(a > Xn){
            return true;
        }

        if(functionXn == 0 || functionXn == -4.440892098500626e-16){
            if(!isFinite(Xn)){
                c = Xn;
                return false;
            }
            if(b < Xn){
                return true;
            }
            c = Xn;
            return false;
        }

        if(Xn < tempA){
            return true;
        }
        tempB = Xn;

    }
    return true;
}

//Check Root by using Secant
function Secant(a, b, q){
    let tempA = a;
    let tempB = b;
    let computeError = 0;
    let error = 1;
    let secFormula = 0;
    let secFormulaMultiply = 0;
    let secFormulaAnswer = 0;
    let functionOfE = 0;

    for(let i = 0; i <= 1000; i++){
        functionA = math.evaluate(q, { x : tempA });
        functionB = math.evaluate(q, { x : tempB });

        //Xn+1 Formula
        secFormula = (tempB-tempA)/(functionB-functionA);
        secFormulaMultiply = (secFormula * functionB);
        secFormulaAnswer = (tempB - secFormulaMultiply);

        functionOfE = math.evaluate(q, { x : secFormulaAnswer });

        if (functionOfE == 0 || functionOfE == -4.440892098500626e-16){
            if(!isFinite(secFormulaAnswer)){
                c = secFormulaAnswer;
                return false;
            }
            if(secFormulaAnswer < a || secFormulaAnswer > b){
                return true;
            }
            c = secFormulaAnswer;
            return false;
        }

        //Error computation
        computeError = (secFormulaAnswer * 10 - tempB * 10) / 10;
        error = math.abs(computeError);

        if (error == 0 || error == 4.440892098500626e-16){
            c = secFormulaAnswer;
            return false;
        }

        //Subtitution of values
        tempA = tempB;
        tempB = secFormulaAnswer;
    }
    return true;
}

//Clear Input
function ClearInput(){
    document.getElementById("pinput").value = "";
    document.getElementById("qinput").value = "";
    document.getElementById("ainput").value = "";
    document.getElementById("binput").value = "";
    document.getElementById("ninput").value = "";

    document.getElementById("pinput").style.borderColor = "";
    document.getElementById("qinput").style.borderColor = "";
    document.getElementById("ainput").style.borderColor = "";
    document.getElementById("binput").style.borderColor = "";
    document.getElementById("ninput").style.borderColor = "";
}

//Clear Output
function ClearOutput(){
    document.getElementById("outputS").innerHTML = "S: ";
    document.getElementById("outputT").innerHTML = "T: ";
    document.getElementById("outputStop").innerHTML = "";
    document.getElementById("outputStop2").innerHTML = "";
}

//Check input then show various errors when necessary
function CheckInput(){
    const p = document.getElementById("pinput").value;
    const q = document.getElementById("qinput").value;
    let a = parseFloat(document.getElementById("ainput").value);
    let b = parseFloat(document.getElementById("binput").value);
    let n = parseFloat(document.getElementById("ninput").value);
    let error = 0;
    let functionError = 0;

    if(a >= b){
        ClearOutput();
        document.getElementById("outputStop").innerHTML = "a cannot be higher than or equal to b";
        error++
    }

    if (p == ""){
        document.getElementById("pinput").style.borderColor = "red";
        error++;
    }
    else{
        document.getElementById("pinput").style.borderColor = "";
    }

    if (q == ""){
        document.getElementById("qinput").style.borderColor = "red";
        error++;
    }
    else{
        document.getElementById("qinput").style.borderColor = "";
    }
    
    if (isNaN(a)){
        document.getElementById("ainput").style.borderColor = "red";
        error++;
    }
    else{
        document.getElementById("ainput").style.borderColor = "";
    }
    
    if (isNaN(b)){
        document.getElementById("binput").style.borderColor = "red";
        error++;
    }
    else{
        document.getElementById("binput").style.borderColor = "";
    }
    
    if (isNaN(n)){
        document.getElementById("ninput").style.borderColor = "red";
        error++;
    }
    else{
        document.getElementById("ninput").style.borderColor = "";
    }

    try{
        functionP = math.evaluate(p, { x : 1 });

    }catch{
        document.getElementById("pinput").style.borderColor = "red";
        error++;
        functionError++;
    }

    try{
        functionQ = math.evaluate(q, { x : 1 });
    }catch{
        document.getElementById("qinput").style.borderColor = "red";
        error++;
        functionError++;
    }

    if(functionError > 0){
        alert("Please Enter a Valid Function");
    }
    
    if (error > 0){
        return true;
    }
    else{
        return false;
    }
}

//Show loading animation
function ShowLoading() {
    var elms = document.getElementsByClassName("cube");
    Array.from(elms).forEach((x) => {
          x.style.visibility = "visible";
      })
}

//Hide loading animation
function HideLoading() {
    var elms = document.getElementsByClassName("cube");
    Array.from(elms).forEach((x) => {
          x.style.visibility = "hidden";
      })
}
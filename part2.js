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
    let a = parseFloat(document.getElementById("ainput").value);
    let b = parseFloat(document.getElementById("binput").value);
    let n = parseFloat(document.getElementById("ninput").value);

    if(CheckInput()){
        HideLoading();
        return false;
    }
    Calculate(p, q, a, b, n);
}

//Calculate Function to initiate calculation of Trapezoid Rule and Simpson's Rule
function Calculate(p, q, a, b, n){
    let deltaX = ((b-a)/n);
    let x = a;
    let functionOfX;
    let sum = 0;
    let answer;
    
    if (Bisection(a, b, q) && Newton(a, b, q) && Secant(a, b, q)){
        TrapezoidRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer);
        SimpsonRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer);
        HideLoading();
    }
    else{
        HideLoading();
        document.getElementById("outputS").innerHTML = "S: ";
        document.getElementById("outputT").innerHTML = "T: ";
        document.getElementById("outputStop").innerHTML = "Stopped at " + c + " ∈ [" + a + ", " + b + "] on which";
        document.getElementById("outputStop2").innerHTML = "f(x) = (" + p + ") / (" + q + ") is not defined";
    }
}

//Trapezoid Rule
function TrapezoidRule(p, q, a, b, n, deltaX, x, functionOfX, sum, answer){

    for (let i = a; i <= b; i += deltaX){
        if (i == a || n == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            console.log("FunctionofX: " + functionOfX);
            sum += functionOfX;
        }
        else{
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            console.log("FunctionofX222: " + functionOfX * 2);
            sum += functionOfX * 2;
        }
        x += deltaX;
        n--;
        console.log("AAAAA: " + a);
        console.log("BBBBB: " + b);
        console.log("IIIII: " + i);
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
            console.log("X: " + x);
            console.log("P: " + functionP);
            console.log("Q: " + functionQ);
            functionOfX = functionP/functionQ;
            sum += functionOfX;
            console.log("1Function: " + functionOfX);
        }
        else if(counter%2 == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            console.log("X: " + x);
            console.log("P: " + functionP);
            console.log("Q: " + functionQ);
            functionOfX = functionP/functionQ;
            sum += functionOfX * 2;
            console.log("2Function: " + functionOfX * 2);
        }
        else{
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            console.log("X: " + x);
            console.log("P: " + functionP);
            console.log("Q: " + functionQ);
            functionOfX = functionP/functionQ;
            sum += functionOfX * 4;
            console.log("3Function: " + functionOfX * 4);
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

/*
//Read Function of P(x)
const userDefP = (expression, x) => {
    const f = math.parser();
    f.set('x', x);
    return f.evaluate(expression);
};

//Read Function of Q(x)
const userDefQ = (expression, x) => {
    const f = math.parser();
    f.set('x', x);
    return f.evaluate(expression);
};*/


/*const userDefP = (x) => {
    const f = math.parser();
    f.evaluate(p);
    return f.get('p');
};

const userDefQ = (x) => {
    const f = math.parser();
    f.evaluate(q);
    return f.get('q');
};*/

//===================== ROOT FINDING =====================

//Check Root by using bisection
function Bisection(a, b, q){
    console.log("Bisection");
    let tempA = a;
    let tempB = b;
    let functionC = 0;
    let computeError;
    let error = 1;

    while(error != 0){
        c = (tempA+tempB)/2;
        functionC = math.evaluate(q, { x : c });
        console.log("A: " + tempA);
        console.log("B: " + tempB);
        console.log("c: " + c);
        console.log("functionC: " + functionC);

        //Subtitution of Values
        if(functionC == 0){
            return false;
        }

        if(functionC > 0){
            tempA = c
        }

        if(functionC < 0){
            tempB = c
        }

        //Error computation
        computeError = (tempA * 10 - tempB * 10) / 10;
        error = math.abs(computeError);

        if (error == 0){
            return true;
        }
    }
    return true;
}

//Check Root by using Secant
function Secant(a, b, q){
    console.log("Secant");
    let tempA = a;
    let tempB = b;
    let computeError = 0;
    let error = 0;
    let secFormula = 0;
    let secFormulaMultiply = 0;
    let secFormulaAnswer = 0;
    let functionOfE = 0;

    for(let i = 0; i <= 10000; i++){
        functionA = math.evaluate(q, { x : tempA });
        functionB = math.evaluate(q, { x : tempB });
        console.log("A: " + tempA);
        console.log("B: " + tempB);
        console.log("FunctionA: " + functionA);
        console.log("FunctionB: " + functionB);

        //Xn+1 Formula
        secFormula = (tempB-tempA)/(functionB-functionA);
        secFormulaMultiply = (secFormula * functionB);
        secFormulaAnswer = (tempB - secFormulaMultiply);
        console.log("Secant: " + secFormulaAnswer);

        functionOfE = math.evaluate(q, { x : secFormulaAnswer });
        console.log("E: " + functionOfE);

        if(secFormulaAnswer < a || secFormulaAnswer > b){
            return true;
        }

        if (functionOfE == 0){
            console.log("FunctionE: " + functionOfE);
            c = secFormulaAnswer;
            return false;
        }

        //Error computation
        computeError = (secFormulaAnswer * 10 - tempB * 10) / 10;
        error = math.abs(computeError);
        console.log("Error: " + error);

        //Subtitution of values
        tempA = tempB;
        tempB = secFormulaAnswer;
    }
    return true;
}

function Newton(a, b, q){
    console.log("Newton");
    let tempA = a;
    let tempB = b;
    let Xn = 0
    let computeError = 0;
    let error = 1;

    for(let i = 0; i <= 10000; i++){
        functionA = math.evaluate(q, { x : tempB });
        console.log("FunctionA: " + functionA);

        derivative = math.derivative(q, 'x').evaluate({x : tempB});
        Xn = tempB - (functionA/derivative);

        functionXn = math.evaluate(q, { x : Xn });

        console.log("Xn: " + Xn);
        console.log("Function: " + functionXn);

        computeError = (Xn * 10 - tempB * 10) / 10;
        error = math.abs(computeError);
        console.log("Error: " + error);

        if(error = 0){
            return true;
        }

        if(a > Xn){
            return true;
        }

        if(b < Xn){
            return true;
        }

        if(functionXn == 0){
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


function ShowLoading() {
    var elms = document.getElementsByClassName("cube");
    console.log("Show");
    Array.from(elms).forEach((x) => {
          x.style.visibility = "visible";
      })
}

function HideLoading() {
    var elms = document.getElementsByClassName("cube");
    console.log("Hide");
    Array.from(elms).forEach((x) => {
          x.style.visibility = "hidden";
      })
}

function CheckInput(){
    const p = document.getElementById("pinput").value;
    const q = document.getElementById("qinput").value;
    let a = parseFloat(document.getElementById("ainput").value);
    let b = parseFloat(document.getElementById("binput").value);
    let n = parseFloat(document.getElementById("ninput").value);
    let error = 0;
    let functionError = 0;
    console.log(a);

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

let functionP;
let functionQ;
let outputA;
let outputB;
let c;

//Initiate Calculation
function StartCalculate(){
    ReadInputs();
}

//Read Inputs and initiate Calculate
function ReadInputs(){
    const p = document.getElementById("pinput").value;
    const q = document.getElementById("qinput").value;
    let a = parseFloat(document.getElementById("ainput").value);
    let b = parseFloat(document.getElementById("binput").value);
    let n = parseFloat(document.getElementById("ninput").value);
    Calculate(p, q, a, b, n);
}

//Calculate Function to initiate calculation of Trapezoid Rule and Simpson's Rule
function Calculate(p, q, a, b, n){
    let deltaX = ((b-a)/n);
    let x = a;
    let functionOfX;
    let sum = 0;
    let answer;
    
    if (Bisection(a, b, p, q, deltaX) && Newton(a, b, p ,q) && Secant(a, b, p, q, deltaX)){
        TrapezoidRule(p, q, a, b, deltaX, x, functionOfX, sum, answer);
        SimpsonRule(p, q, a, b, deltaX, x, functionOfX, sum, answer);
    }
    else{
        document.getElementById("outputS").innerHTML = "S: ";
        document.getElementById("outputT").innerHTML = "T: ";
        document.getElementById("outputStop").innerHTML = "Stopped at " + c + " ∈ [" + a + ", " + b + "] on which";
        document.getElementById("outputStop2").innerHTML = "f(x) = (" + p + ") / (" + q + ") is not defined";
    }

    

}

//Trapezoid Rule
function TrapezoidRule(p, q, a, b, deltaX, x, functionOfX, sum, answer){

    for (let i = a; i <= b; i += deltaX){
        if (i == a || i ==b){
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
    }

    answer = (deltaX / 2) * sum;

    document.getElementById("outputT").innerHTML = "T: " + answer;
}

//Simpson's Rule
function SimpsonRule(p, q, a, b, deltaX, x, functionOfX, sum, answer){

    let counter = 0;

    for (let i = a; i <= b; i += deltaX){
        if (i == a || i == b){
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
function Bisection(a, b, p, q, deltaX){
    let tempA = a;
    let tempB = b;
    let functionC = 0;
    let computeError;
    let error = 1;

    while(error != 0){
        c = (tempA+tempB)/2;
        numerator = math.evaluate(p, { x : c });
        denominator = math.evaluate(q, { x : c });
        functionC = numerator/denominator;
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
function Secant(a, b, p, q, deltaX){
    let tempA = a;
    let tempB = b;
    let computeError = 0;
    let error = 0;
    let secFormula = 0;
    let secFormulaMultiply = 0;
    let secFormulaAnswer = 0;
    let functionOfE = 0;

    for (let i = 0; i <= 100000; i++){
        if(a <= tempA && b >= tempB){
            numeratorA = math.evaluate(p, { x : tempA });
            denominatorA = math.evaluate(q, { x : tempA });
            functionA = numeratorA/denominatorA;

            numeratorB = math.evaluate(p, { x : tempB });
            denominatorB = math.evaluate(q, { x : tempB });
            functionB = numeratorB/denominatorB;
            console.log("A: " + tempA);
            console.log("B: " + tempB);
            console.log("FunctionA: " + functionA);
            console.log("FunctionB: " + functionB);

            //Xn+1 Formula
            secFormula = (tempB-tempA)/(functionB-functionA);
            secFormulaMultiply = (secFormula * functionB);
            secFormulaAnswer = (tempB - secFormulaMultiply);
            console.log("Secant: " + secFormulaAnswer);

            numeratorE = math.evaluate(p, { x : secFormulaAnswer });
            denominatorE = math.evaluate(q, { x : secFormulaAnswer });
            functionOfE = numeratorE/denominatorE;
            console.log("E: " + functionOfE);

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
    }
    return true;
}

function Newton(a, b, p ,q){
    let tempB = b;
    let Xn = 0
    let computeError = 0;
    let error = 1;

    functionPQ = "(" + p + ")/(" + q + ")";    

    while (error != 0){
        numeratorA = math.evaluate(p, { x : tempB });
        denominatorA = math.evaluate(q, { x : tempB });
        functionA = numeratorA/denominatorA;
        console.log("FunctionA: " + functionA);

        derivative = math.derivative(functionPQ, 'x').evaluate({x : tempB});
        console.log(functionPQ);
        Xn = tempB - (functionA/derivative);

        numeratorXn = math.evaluate(p, { x : Xn });
        denominatorXn = math.evaluate(q, { x : Xn });
        functionXn = numeratorXn/denominatorXn;

        console.log("Xn: " + Xn);
        console.log("Function: " + functionXn);

        if(functionXn == 0){
            c = Xn;
            return false;
        }

        if(a > Xn){
            return true;
        }

        computeError = (Xn * 10 - tempB * 10) / 10;
        error = math.abs(computeError);
        console.log("Error: " + error);

        tempB = Xn;

    }
    return true;
}
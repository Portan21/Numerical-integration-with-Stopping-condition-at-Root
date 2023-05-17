//Initiate Calculation
function StartCalculate(){
    ReadInputs();
}

//Read Inputs and initiate Calculate
function ReadInputs(){
    let a = parseInt(document.getElementById("ainput").value);
    let b = parseInt(document.getElementById("binput").value);
    let n = parseInt(document.getElementById("ninput").value);
    Calculate(a, b, n);
}

//Calculate Function to initiate calculation of Trapezoid Rule and Simpson's Rule
function Calculate(a, b, n){
    let deltaX = ((b-a)/n);
    let x = a;
    let functionOfX;
    let sum = 0;
    let answer;

    TrapezoidRule(a, b, deltaX, x, functionOfX, sum, answer);
    SimpsonRule(a, b, deltaX, x, functionOfX, sum, answer);
}

//Trapezoid Rule
function TrapezoidRule(a, b, deltaX, x, functionOfX, sum, answer){
    
    for (let i = a; i <= b; i += deltaX){
        if (i == a || i ==b){
            functionOfX = math.sinh(x);
            sum += functionOfX;
        }
        else{
            functionOfX = math.sinh(x);
            sum += functionOfX * 2;
        }
        x += deltaX;
    }

    answer = (deltaX / 2) * sum;

    document.getElementById("outputT").innerHTML = "T: " + answer;
}

//Simpson's Rule
function SimpsonRule(a, b, deltaX, x, functionOfX, sum, answer){

    let counter = 0;

    for (let i = a; i <= b; i += deltaX){
        if (i == a || i == b){
            functionOfX = math.sinh(x);
            sum += functionOfX;
            console.log("1Function: " + functionOfX);
        }
        else if(counter%2 == 0){
            functionOfX = math.sinh(x);
            sum += functionOfX * 2;
            console.log("2Function: " + functionOfX * 2);
        }
        else{
            functionOfX = math.sinh(x);
            sum += functionOfX * 4;
            console.log("3Function: " + functionOfX * 4);
        }
        x += deltaX;
        counter++;
    }

    answer = (deltaX / 3) * sum;

    document.getElementById("outputS").innerHTML = "S: " + answer;
}

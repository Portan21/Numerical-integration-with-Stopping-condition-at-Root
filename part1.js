//Initiate Calculation
function StartCalculate(){
    ReadInputs();
}

//Read Inputs and initiate Calculate
function ReadInputs(){
    let a = parseFloat(document.getElementById("ainput").value);
    let b = parseFloat(document.getElementById("binput").value);
    let n = parseFloat(document.getElementById("ninput").value);
    if(CheckInput(a, b, n)){
        Calculate(a, b, n);
    }
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

    document.getElementById("outputStop").innerHTML = "";
    document.getElementById("outputS").innerHTML = "S: " + answer;
}

//Clear Input
function ClearInput(){
    document.getElementById("ainput").value = "";
    document.getElementById("binput").value = "";
    document.getElementById("ninput").value = "";
}

//Clear Output
function ClearOutput(){
    document.getElementById("outputS").innerHTML = "S: ";
    document.getElementById("outputT").innerHTML = "T: ";
    document.getElementById("outputStop").innerHTML = "";
}

//Check input and show various errors when necessary
function CheckInput(a, b, n){
    let error = 0;

    if(a > b){
        ClearOutput();
        document.getElementById("outputStop").innerHTML = "a cannot be higher than b";
        return false;
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

    if(error > 0){
        ClearOutput();
        return false;
    }

    if ((a <= 0 && b > 0) || (a < 0 && b == 0)){
        ClearOutput();
        document.getElementById("outputStop").innerHTML = "f(x) = sinh(x) is not defined at 0 which is inside [" + a + ", " + b + "]";
        return false;
    }
    return true;
}


let functionP;
let functionQ;

function StartCalculate(){
    ReadInputs();
}

function ReadInputs(){
    const p = document.getElementById("pinput").value;
    const q = document.getElementById("qinput").value;
    let a = parseInt(document.getElementById("ainput").value);
    let b = parseInt(document.getElementById("binput").value);
    let n = parseInt(document.getElementById("ninput").value);
    Calculate(p, q, a, b, n);
}

function Calculate(p, q, a, b, n){
    let deltaX = ((b-a)/n);
    let x = a;
    let functionOfX;
    let sum = 0;
    let answer;
    
    TrapezoidRule(p, q, a, b, deltaX, x, functionOfX, sum, answer);
    SimpsonRule(p, q, a, b, deltaX, x, functionOfX, sum, answer);
}

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

function SimpsonRule(p, q, a, b, deltaX, x, functionOfX, sum, answer){

    let counter = 0;

    for (let i = a; i <= b; i += deltaX){
        if (i == a || i == b){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX;
            console.log("1Function: " + functionOfX);
        }
        else if(counter%2 == 0){
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX * 2;
            console.log("2Function: " + functionOfX * 2);
        }
        else{
            functionP = math.evaluate(p, { x : x });
            functionQ = math.evaluate(q, { x : x });
            functionOfX = functionP/functionQ;
            sum += functionOfX * 4;
            console.log("3Function: " + functionOfX * 4);
        }
        x += deltaX;
        counter++;
    }

    answer = (deltaX / 3) * sum;

    document.getElementById("outputS").innerHTML = "S: " + answer;
}

const userDefP = (expression, x) => {
    const f = math.parser();
    f.set('x', x);
    return f.evaluate(expression);
};

const userDefQ = (expression, x) => {
    const f = math.parser();
    f.set('x', x);
    return f.evaluate(expression);
};

function ClearInput(){
    document.getElementById("pinput").value = "";
    document.getElementById("qinput").value = "";
    document.getElementById("ainput").value = "";
    document.getElementById("binput").value = "";
    document.getElementById("ninput").value = "";
}

function ClearOutput(){
    document.getElementById("outputS").innerHTML = "S: ";
    document.getElementById("outputT").innerHTML = "T: ";
}

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
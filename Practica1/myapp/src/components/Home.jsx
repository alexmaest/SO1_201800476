import React, { useState } from "react";

const API = 'http://localhost:5000';

const Home = () => {
  var [consoleContent, setConsoleContent] = useState("");
  var [sign, setSign] = useState("");
  var [numberOne, setNumberOne] = useState("");
  var [numberTwo, setNumberTwo] = useState("");

  const metodoSubmit = async () => {
   //e.preventDefault();
    console.log("num1: " + numberOne);
    console.log("num2: " + numberTwo);
    console.log("sign: " + sign);
    fetch(`${API}/Home`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({num1 : numberOne,
                            num2 : numberTwo,
                            sign : sign})
    });
    //const access = await res.json();
    console.log("Another log");
    //console.log("message: " + access['message']);
    //console.log("value: " + access['value']);
    getMetodo();
  };

  const getMetodo = async () => {
    const res = await fetch(`${API}/Home`);
    const access = await res.json();
    console.log("Another log 2");
    console.log(access);
    if (access['message'] === 'Success'){
    }else{
      window.alert("Error: No se puede dividir entre 0");
    }
    consoleContent = access['resultado'];
    update();
  };

  const update = () => {setConsoleContent(consoleContent);};

  const addNumber = (singleNumber) => {
    if(sign !== ""){
      if(consoleContent === "+"){consoleContent = "";}
      else if(consoleContent === "-"){consoleContent = "";}
      else if(consoleContent === "*"){consoleContent = "";}
      else if(consoleContent === "/"){consoleContent = "";}
    }
    consoleContent = consoleContent + singleNumber;
    update();
  };

  const addSign = (singleSign) => {
    setSign(singleSign);
    setNumberOne(consoleContent);
    consoleContent = singleSign;
    update();
  };

  const getResult = () => {
    numberTwo = consoleContent;
    //window.alert("Error: No se puede dividir entre 0");
    consoleContent = "";
    metodoSubmit();
    update();
  };

  const clean = () => {
    consoleContent = "";
    setNumberOne("");
    setNumberTwo("");
    setSign("");
    update();
  };

  return (
    <div style={{paddingTop: 60, paddingLeft: 400}}>

      <div style={{width: 550, height: 120, paddingLeft: 20}} className="form-group">
        <fieldset>
          <input style={{textAlign:"right", fontSize:40}} className="form-control" type="text" value={consoleContent} onChange={update}/>
        </fieldset>
      </div>

      <div id="outer" style={{paddingTop: 30}}>
        <div className="inner">
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(7)} className="btn btn-primary">7</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(8)} className="btn btn-primary">8</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(9)} className="btn btn-primary">9</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 190, height: 85, fontSize: 34}} onClick={clean} className="btn btn-outline-dark">C</button>
        </div>
      </div>

      <div id="outer" style={{paddingTop: 30}}>
        <div className="inner">
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(4)} className="btn btn-primary">4</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(5)} className="btn btn-primary">5</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(6)} className="btn btn-primary">6</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addSign("*")} className="btn btn-outline-primary">*</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addSign("/")} className="btn btn-outline-primary">/</button>
        </div>
      </div>

      <div id="outer" style={{paddingTop: 30}}>
        <div className="inner">
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(1)} className="btn btn-primary">1</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(2)} className="btn btn-primary">2</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(3)} className="btn btn-primary">3</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addSign("+")} className="btn btn-outline-primary">+</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addSign("-")} className="btn btn-outline-primary">-</button>
        </div>
      </div>

      <div id="outer" style={{paddingTop: 30}}>
        <div className="inner">
          <button style={{width: 85, height: 85, fontSize: 34}} className="btn btn-outline-secondary disabled"></button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} onClick={() => addNumber(0)} className="btn btn-primary">0</button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 85, height: 85, fontSize: 34}} className="btn btn-outline-secondary disabled"></button>
        </div>
        <div className="inner" style={{paddingLeft: 30}}>
          <button style={{width: 190, height: 85, fontSize: 34}} onClick={getResult} className="btn btn-outline-warning">=</button>
        </div>
      </div>

    </div>
  );
};

export default Home;
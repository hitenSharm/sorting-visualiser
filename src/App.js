import { Element } from "./components/element";
import "./App.css";
import { useState } from "react";

function App() {
  const [arraySize, setArraySize] = useState(20);
  const makeArray = () => {
    var elements = [];
    for (var i = 0; i < arraySize; i++) {
      var value = Math.floor(81 * Math.random() + 20);
      var ht = `${value * 3}px`;
      var tr = `translate(${i * 30}px)`;
      var bar = <Element height={ht} transform={tr} value={value} />;
      elements.push(bar);
    }
    return elements;
  };

  const waitFor = (delayTime) =>
    new Promise((resolve) => setTimeout(resolve, delayTime));
  //this is done as setTimeout doesent return a promise like some API call so we wrap it in a promise if we wanna use await later
  //this way we are returning a promise so we can use await later

  const swapper = (bar1, bar2) => {
    var tmp = bar1.style.transform;
    bar1.style.transform = bar2.style.transform;
    bar2.style.transform = tmp;
    var container = document.getElementById("array");
    container.insertBefore(bar2, bar1);
  };

  const sorter = async () => {
    var bars = document.querySelectorAll(".block");
    for (var i = 0; i < bars.length; i += 1) {
      for (var j = 0; j < bars.length - i - 1; j += 1) {
        bars[j].style.backgroundColor = "yellow";
        bars[j + 1].style.backgroundColor = "yellow";

        await waitFor(150);
        //custom setTimeout that returns a promise

        var value1 = Number(bars[j].childNodes[0].innerHTML);
        var value2 = Number(bars[j + 1].childNodes[0].innerHTML);
        if (value1 > value2) {
          swapper(bars[j], bars[j + 1]);
          bars = document.querySelectorAll(".block");
        }

        bars[j].style.backgroundColor = "#561ee3";
        bars[j + 1].style.backgroundColor = "#561ee3";
      }
      bars[bars.length - i - 1].style.backgroundColor = "#13CE66";
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h2>Bubble Sort visualiser. Refresh the page for new values , You can also change the array size!</h2>
      <div id="array">{makeArray()}</div>
      <button onClick={sorter}>Sort!</button>
      <input
        placeholder="Change array size!"
        value={arraySize}
        onChange={(event) => setArraySize(event.target.value)}
        style={{
          textAlign:"center"
        }}
      ></input>
    </div>
  );
}

export default App;


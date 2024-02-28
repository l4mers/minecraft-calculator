import React, { useState } from 'react';

function RaiseOrLowerLandMass({ goToMainPage }) {
  // State hooks for each input field
  const [lowerCornerX, setLowerCornerX] = useState('');
  const [lowerCornerZ, setLowerCornerZ] = useState('');
  const [lowerCornerY, setLowerCornerY] = useState('');
  const [upperCornerX, setupperCornerX] = useState('');
  const [upperCornerZ, setupperCornerZ] = useState('');
  const [upperCornerY, setupperCornerY] = useState('');
  const [xArea, setXArea] = useState('');
  const [zArea, setZArea] = useState('');
  const [yArea, setYArea] = useState('');
  const [commands, setCommands] = useState([]);

  // Function to handle the calculation (simplified example)
  const generateCommands = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page

    let lcx = parseInt(lowerCornerX, 10);
    let lcz = parseInt(lowerCornerZ, 10);
    let lcy = parseInt(lowerCornerY, 10);
    let ucx = parseInt(upperCornerX, 10);
    let ucz = parseInt(upperCornerZ, 10);
    let ucy = parseInt(upperCornerY, 10);
    let baseY = lcy;
    let xa = parseInt(xArea, 10);
    let za = parseInt(zArea, 10);
    let ya = parseInt(yArea, 10);

    let incrementY = ucy - lcy;
    let incrementX = ucx - lcx;
  
    let newCommands = [];

    let count = 1;

    while(lcy < ya){
      newCommands.push("/clone " + lcx + " " + lcz + " " +  lcy + " " +  ucx + " " +  ucz + " " +  ucy + " " +  lcx + " " +  za + " " +  lcy);


      count++;

      if(count == 1000){
        console.log("avbryten");
        lcy = ya;
      }

      console.log("upper y: " + ucy);

      lcy += incrementY;
      ucy += incrementY;

      console.log("upper after increment y: " + ucy);

      if(lcy == ya){
        console.log("upper x: " + ucx);
        lcx += incrementX;
        ucx += incrementX;
        lcy = baseY;
        ucy = baseY + incrementY;
        console.log("upper after increment x: " + ucx);
        if(lcx > xa){
          lcy = ya;
        }
      }
    }
    setCommands(newCommands);
  };

  return (
    <div className='flex flex-col'>
      <h2>Raise or lower landmass</h2>
    
      <div>
        <form className="landmass grid grid-cols-3 gap-4" onSubmit={generateCommands}>
          <input type="text" placeholder="lowerCornerX" name="lowerCornerX" required value={lowerCornerX} onChange={(e) => setLowerCornerX(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="lowerCornerZ" name="lowerCornerZ" required value={lowerCornerZ} onChange={(e) => setLowerCornerZ(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="lowerCornerY" name="lowerCornerY" required value={lowerCornerY} onChange={(e) => setLowerCornerY(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerX" name="upperCornerX" required value={upperCornerX} onChange={(e) => setupperCornerX(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerZ" name="upperCornerZ" required value={upperCornerZ} onChange={(e) => setupperCornerZ(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerY" name="upperCornerY" required value={upperCornerY} onChange={(e) => setupperCornerY(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="xArea" name="xArea" required value={xArea} onChange={(e) => setXArea(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="zArea" name="zArea" required value={zArea} onChange={(e) => setZArea(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="yArea" name="yArea" required value={yArea} onChange={(e) => setYArea(e.target.value)} className="text-gray-900 bg-slate-200" />
          <button type="submit">Calculate</button>
          <button onClick={goToMainPage} className="backButton">Back to Main Page</button>
        </form>
      </div>
      <div className="result-container mt-4 text-gray-900 bg-slate-200" style={{ maxHeight: '800px', overflowY: 'auto' }}>
        {commands.map((command, index) => (
          <p key={index}>{command}</p>
        ))}
      </div>
    </div>

  );
}

export default RaiseOrLowerLandMass;
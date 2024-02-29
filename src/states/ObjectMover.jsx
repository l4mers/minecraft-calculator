import React, { useState } from 'react';

function ObjectMover({ goToMainPage }) {
  // State hooks for each input field
  const [lowerCornerX, setLowerCornerX] = useState('');
  const [lowerCornerZ, setLowerCornerZ] = useState('');
  const [lowerCornerY, setLowerCornerY] = useState('');
  const [upperCornerX, setupperCornerX] = useState('');
  const [upperCornerZ, setupperCornerZ] = useState('');
  const [upperCornerY, setupperCornerY] = useState('');
  const [newLowerCornerX, setNewLowerCornerX] = useState('');
  const [newLowerCornerZ, setNewLowerCornerZ] = useState('');
  const [newLowerCornerY, setNewLowerCornerY] = useState('');
  const [commands, setCommands] = useState([]);
  const [zLevel, setZLevel] = useState('');
  const [maxSteps, setMaxSteps] = useState('');


  // Function to handle the calculation (simplified example)
  const generateCommands = (e) => {
    e.preventDefault(); // Prevent form submission from reloading the page


    let maxStepsXY = parseInt(maxSteps, 10);
    let zLvl = parseInt(zLevel, 10);
    let lx = parseInt(lowerCornerX, 10);
    let lz = parseInt(lowerCornerZ, 10);
    let ly = parseInt(lowerCornerY, 10);
    let ux = parseInt(upperCornerX, 10);
    let uz = parseInt(upperCornerZ, 10);
    let uy = parseInt(upperCornerY, 10);
    let newLx = parseInt(newLowerCornerX, 10);
    let newLz = parseInt(newLowerCornerZ, 10);
    let newLy = parseInt(newLowerCornerY, 10);

    let tempZ = (uz - lz) + zLvl;

    let count = 1;

    let newCommands = [];
    newCommands.push(`/clone ${lx} ${lz} ${ly} ${ux} ${uz} ${uy} ${lx} ${zLvl} ${ly}`);
  

    while (!(lx === newLx && ly === newLy)) {
        let deltaX = Math.min(maxStepsXY, Math.abs(newLx - lx)) * Math.sign(newLx - lx);
        let deltaY = Math.min(maxStepsXY, Math.abs(newLy - ly)) * Math.sign(newLy - ly);

        count++;
        if (count === 100){
            console.log("break");
            break;
        }

        console.log("in loop");

        let lastLx = lx;
        let lastLy = ly;

        let lastUx = ux;
        let lastUy = uy;

        lx += deltaX;
        ux += deltaX;
        ly += deltaY;
        uy += deltaY;

        newCommands.push(`/clone ${lastLx} ${zLvl} ${lastLy} ${lastUx} ${tempZ} ${lastUy} ${lx} ${zLvl} ${ly}`);

        if (deltaX !== 0 || deltaY !== 0) {
          newCommands.push(`/fill ${lastLx} ${zLvl} ${lastLy} ${lastUx} ${tempZ} ${lastUy} air`);
        }
    }

    newCommands.push("/clone " + lx + " " + zLvl + " " +  ly + " " + ux + " " + tempZ + " " +  uy + " " +  newLx + " " +  newLz  + " " +  newLy);
    newCommands.push("/fill " + lx + " " + zLvl + " " +  ly + " " + ux + " " + tempZ + " " +  uy  + " air");
    console.log("out");
    console.log(newCommands);
    setCommands(newCommands);
  };

  return (
    <div className='flex flex-col'>
      <h2>Move a Object</h2>
      <div>
        <form className="landmass grid grid-cols-3 gap-4" onSubmit={generateCommands}>
          <input type="text" placeholder="lowerCornerX" name="lowerCornerX" required value={lowerCornerX} onChange={(e) => setLowerCornerX(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="lowerCornerZ" name="lowerCornerZ" required value={lowerCornerZ} onChange={(e) => setLowerCornerZ(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="lowerCornerY" name="lowerCornerY" required value={lowerCornerY} onChange={(e) => setLowerCornerY(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerX" name="upperCornerX" required value={upperCornerX} onChange={(e) => setupperCornerX(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerZ" name="upperCornerZ" required value={upperCornerZ} onChange={(e) => setupperCornerZ(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="upperCornerY" name="upperCornerY" required value={upperCornerY} onChange={(e) => setupperCornerY(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="newLowerCornerX" name="newLowerCornerX" required value={newLowerCornerX} onChange={(e) => setNewLowerCornerX(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="newLowerCornerZ" name="newLowerCornerZ" required value={newLowerCornerZ} onChange={(e) => setNewLowerCornerZ(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="newLowerCornerY" name="newLowerCornerY" required value={newLowerCornerY} onChange={(e) => setNewLowerCornerY(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="zLevel" name="zLevel" required value={zLevel} onChange={(e) => setZLevel(e.target.value)} className="text-gray-900 bg-slate-200" />
          <input type="text" placeholder="maxSteps" name="maxSteps" required value={maxSteps} onChange={(e) => setMaxSteps(e.target.value)} className="text-gray-900 bg-slate-200" />
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

export default ObjectMover;
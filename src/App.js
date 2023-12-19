import React, { useState } from 'react';
import './App.css';
import UserDataTable from './components/userDataTable';

function App() {
  const [region, setRegion] = useState('poland');
  const [error, setError] = useState(0);
  const [seed, setSeed] = useState('');
  const [generatedData, setGeneratedData] = useState([]); 

  const generateRandomSeed = () => {
    const randomSeed = Math.floor(Math.random() * 1000000).toString();
    setSeed(randomSeed);
  };

  const generateRandomName = () => {
    const firstNames = ['Auggie', 'Marysia', 'Stephan', 'Giorgi', 'John', 'Jane', 'Michael', 'Emily'];
    const lastNames = ['Pullman', 'Tomczyk', 'Brown', 'Sakashvili', 'Doe', 'Smith', 'Johnson', 'Williams'];
  
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
    return `${firstName} ${lastName}`;
  };
  
  const generateRandomAddress = () => {
    const streets = ['Main St', 'Pulawska St', '7th St', 'Gergeti St'];
    const cities = ['San Francisco', 'Warsaw', 'Los Angeles', 'Tbilisi'];
    const countries = ['USA', 'Poland', 'USA', 'Georgia'];
  
    const street = streets[Math.floor(Math.random() * streets.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const country = countries[Math.floor(Math.random() * countries.length)];
  
    return `${Math.floor(Math.random() * 1000) + 1} ${street}, ${city}, ${country}`;
  };
  
  const generateRandomPhone = () => {
    const countryCode = '+';
    const areaCode = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const phoneNumber = Math.floor(Math.random() * 1000000000).toString().padStart(9, '0');
  
    return `${countryCode}${areaCode}${phoneNumber}`;
  };
  
  const generateData = () => {
    const data = [];
  
    const numberOfRecords = 20;
  
    for (let i = 0; i < numberOfRecords; i++) {
      const id = i + 1;
      const name = generateRandomName();
      const address = generateRandomAddress();
      const phone = generateRandomPhone();
  
      data.push({ id, name, address, phone });
    }
  
    setGeneratedData(data);
  };
  

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "Index,Random Identifier,Name,Address,Phone\n" +
      generatedData.map(row => (
        `${row.id},${row.id},${row.name},"${row.address}",${row.phone}`
      )).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "user_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="region">Select Region:</label>
        <select
          id="region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <option value="poland">Poland</option>
          <option value="usa">USA</option>
          <option value="georgia">Georgia</option>
        </select>
      </div>

      <div>
        <label htmlFor="errorSlider">Number of Errors per Record:</label>
        <input
          type="range"
          id="errorSlider"
          min="0"
          max="1000"
          step="0.1"
          value={error}
          onChange={(e) => setError(parseFloat(e.target.value, 10))}
        />
        <input
          type="number"
          min="0"
          max="1000"
          step="0.1"
          value={error}
          onChange={(e) => setError(parseFloat(e.target.value, 10))}
        />
        <button onClick={generateRandomSeed}>Randomize Seed</button>
      </div>

      <div>
        <button onClick={generateData}>Generate Data</button>
        <button onClick={exportToCSV}>Export to CSV</button>
      </div>
      <UserDataTable data={generatedData} />
    </div>
  );
}

export default App;


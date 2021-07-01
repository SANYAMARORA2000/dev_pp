import React, { useState } from 'react';
import Profile from './Profile';
import Settings from './Settings';


export const ThemeContext=React.createContext();//context create ho gaya 

export function App() {

  const[lightTheme,Settheme]=useState(true);//mana ki application lighttheme ki hogi

  function toggleTheme(){
    Settheme((prevTheme)=>!prevTheme);

  }
  return (

    <ThemeContext.Provider value={lightTheme}>
      <div className="App">
     <button onClick={toggleTheme}>Toggle theme</button>
      <div>
        <Profile></Profile>
        <ThemeContext.Provider value={!lightTheme}>
        <Settings></Settings>
        </ThemeContext.Provider>
      </div>
    </div>

     </ThemeContext.Provider>
    
  );
}

export default App;

import React from 'react'
import { useState, useEffect } from 'react';
import { useStore } from '../store/useStore';

const ThemeSwitch = () => {
    const {theme, setTheme} = useStore((state) => state);
    const [isDarkMode, setIsDarkMode] = useState(theme === "dark");

    useEffect(() => {
        setIsDarkMode(theme === "dark");
      }, [theme]);
    
    const toggleTheme = () => {
        const newTheme = isDarkMode ? "light" : "dark";
        setIsDarkMode(!isDarkMode);

        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

  return (
    <div className={`switch ${isDarkMode ? "light" : "dark"}`} onClick={toggleTheme}>
        <div className={`ball ${isDarkMode ? "dark" : "light"}`}></div>
    </div>
  )
}

export default ThemeSwitch;

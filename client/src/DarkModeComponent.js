import useDarkMode from "./useDarkMode";
import "./App.css";
import switchpng from "./assets/switch.png";

export default function DarkModeComponent() {
  const [darkMode, setDarkMode] = useDarkMode()

  return (
    <button
      onClick={() => setDarkMode(prevDarkMode => !prevDarkMode)}
      style={{
        border: `none`,
        background: 'none',
      }}
    >
      <img src={switchpng}></img>
    </button>
  )
}
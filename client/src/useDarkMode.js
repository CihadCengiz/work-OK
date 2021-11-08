import { useEffect } from "react"
import useMediaQuery from "./useMediaQuery"
import { useLocalStorage } from "./useStorage"

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useLocalStorage("useDarkMode")
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  const enabled = darkMode ?? prefersDarkMode
  const containerClass = document.getElementsByClassName("container-custom");
  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled);
    for(let i=0; i<containerClass.length; i++){
      containerClass.item(i).classList.toggle("dark-mode", enabled);
    }
    
  }, [enabled, containerClass])

  return [enabled, setDarkMode]
}
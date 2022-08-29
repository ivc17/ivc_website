import { SkyboxContext } from "context/SkyboxContext";
import { useContext } from "react";

export default function useSkybox() {
  const state = useContext(SkyboxContext)

  return state
}
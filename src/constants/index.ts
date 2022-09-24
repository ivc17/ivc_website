import { Vector3 } from "three";
import { routes } from "./routes";

export const initCameraPosition = new Vector3(0, 0, 300)

export const cameraPositions = {
  [routes.about]: new Vector3(300, 0, 50),
  [routes.contact]: new Vector3(-300, 0, 50),
  // [routes.gallery]: new Vector3(0, 0, 100)
  [routes.gallery]: new Vector3(0, -300, 100),
  [routes.singlWork]: new Vector3(0, 300, 100)
}

export const cameraPositionsXs = {
  [routes.about]: new Vector3(1000, 0, -900),
  [routes.contact]: new Vector3(-1000, 0, -900),
  // [routes.gallery]: new Vector3(0, 0, 100)
  [routes.gallery]: new Vector3(0, -300, -600),
  [routes.singlWork]: new Vector3(0, 300, -600)
}

export const defaultZoom = {
  md: 1,
  xs:0.6
}
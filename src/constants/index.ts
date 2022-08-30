import { Vector3 } from "three";
import { routes } from "./routes";

export const initCameraPosition = new Vector3(0, 0, 30)

export const cameraPositions = {
  [routes.about]: new Vector3(30, 0, 5),
  [routes.contact]: new Vector3(-30, 0, 5),
  [routes.gallery]: new Vector3(0, 0, 10)
}
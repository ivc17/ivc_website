export function getPlaneArg() {
  const width = 1000
  const aspect = window.innerWidth / window.innerHeight
  const defaultHeight= width / aspect 
  const height = defaultHeight + (aspect > 1 ? +0.1*width : -0.1*defaultHeight)
  const halfHeight = height / 2

  return {
    width,
    aspect,
    height,
    halfHeight
  }
}
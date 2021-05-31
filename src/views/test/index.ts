export default function test () {
  return Object.entries(import.meta.glob('./*.vue'))
    .filter(([path]) => !path.endsWith('index.vue'))
    .map(([path, component]) => ({
      path: /\/([^\/]+?)(-test)?\.vue$/.exec(path)![1],
      component,
  }))
}
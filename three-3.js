//import * as THREE from "three";
//import "three.min.js";
import Stat from "./three/examples/jsm/libs/stats.module.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// 房间 == 3d容器
// Scene 场景
const scene = new THREE.Scene();

//obeject
const axes = new THREE.AxesHelper(2, 2, 2);
scene.add(axes);

let cubes = [];
function createCube() {
  let w = Math.random();
  //物体：geometry 几何体  + material 材质、皮肤
  const geometry = new THREE.BoxGeometry(w, w, w);
  const material = new THREE.MeshBasicMaterial({
    //color: "rgb(255,0,0)",
    color: 0xffff00 * Math.random(),
    //color: "red",
  });

  const cube = new THREE.Mesh(geometry, material);

  cube.position.set(
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4,
    (Math.random() - 0.5) * 4
  );

  cubes.push(cube);
}

let n = 20;
for (let i = 0; i < n; i++) {
  createCube();
}

cubes.forEach((cube) => {
  scene.add(cube);
});

const light = new THREE.AmbientLight();

scene.add(light);

//camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(1, 3, 5);
camera.lookAt(0, 0, 0);

//Renderer
//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, camera);

document.body.append(renderer.domElement);
document.body.append(stat.domElement);

//动效 根据时间
const clock = new THREE.Clock();
tick();
function tick() {
  //time一直均匀增加
  const time = clock.getElapsedTime();

  cubes.forEach((cube, index) => {
    cube.rotation.x = time * 0.1 + index;
    cube.rotation.y = time * 0.1 + index;
  });

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
}

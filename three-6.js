import Stat from "./three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// Scene 场景
const scene = new THREE.Scene();

//坐标系
const axes = new THREE.AxesHelper(200000, 200000, 200000);
scene.add(axes);

//obejects
//group
const group1 = new THREE.Group();
const group2 = new THREE.Group();

//立方体

/*----Cube 1   🚗   ---------------------------------------------------*/
const g1 = new THREE.BoxGeometry(1, 1, 1);
const m1 = new THREE.MeshNormalMaterial();
const cube1 = new THREE.Mesh(g1, m1);
//cube1.position.y = -1.5;
group1.add(cube1);

/*----Cube 2   🌏   ---------------------------------------------------*/

const g2 = new THREE.BoxGeometry(0.3, 0.3, 0.3);
const m2 = new THREE.MeshNormalMaterial();
const cube2 = new THREE.Mesh(g2, m2);
group2.add(cube2);

/*----Cube 3   🌙   ---------------------------------------------------*/

const g3 = new THREE.BoxGeometry(0.1, 0.1, 0.1);
const m3 = new THREE.MeshNormalMaterial();
const cube3 = new THREE.Mesh(g3, m3);

cube3.position.y = 0.5;
group2.position.y = 3;

group2.add(cube3);

group1.add(group2);

scene.add(group1);

//camera
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 100);
camera.position.set(1, 1, 1);
camera.lookAt(0, 0, 0);

//Renderer
//创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
renderer.render(scene, camera);

document.body.append(renderer.domElement);
document.body.append(stat.domElement);

//control初始化
const orbitControls = new OrbitControls(camera, renderer.domElement);

//动效 根据时间
const clock = new THREE.Clock();
tick();
function tick() {
  //time一直均匀增加
  const time = clock.getElapsedTime();
  group1.rotation.z = time;
  group2.rotation.z = time;

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}

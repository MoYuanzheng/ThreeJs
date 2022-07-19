import Stat from "./three/examples/jsm/libs/stats.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.126.1/examples/jsm/controls/OrbitControls.js";
//import { add } from "./three/examples/jsm/nodes/Nodes.js";

const w = window.innerWidth;
const h = window.innerHeight;
const stat = new Stat();

// Scene 场景
const scene = new THREE.Scene();

//坐标系
const axes = new THREE.AxesHelper(200000, 200000, 200000);
scene.add(axes);

//公共材质
const m = new THREE.MeshNormalMaterial();

//car
const car = new THREE.Group();

//轮子 左前 右前  左后 右后
const wheelGroup1 = new THREE.Group();
const wheelGroup2 = new THREE.Group();
const wheelGroup3 = new THREE.Group();
const wheelGroup4 = new THREE.Group();

const wheel1G = new THREE.TorusGeometry(0.5, 0.1, 10, 20);
const wheel1Mesh = new THREE.Mesh(wheel1G, m);

//辐条
const n = 10;
for (let i = 0; i < n; i++) {
  const g = new THREE.CylinderGeometry(0.03, 0.03, 1);
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.z = ((2 * Math.PI) / n) * i;
  wheel1Mesh.add(mesh);
}

//车轴
const len = 2;
const cylinder1G = new THREE.CylinderGeometry(0.1, 0.1, len);
const cylinder1Mesh = new THREE.Mesh(cylinder1G, m);
cylinder1Mesh.rotation.x = 0.5 * Math.PI;
cylinder1Mesh.position.z = 1;

const cylinder2G = new THREE.CylinderGeometry(0.1, 0.1, len);
const cylinder2Mesh = new THREE.Mesh(cylinder2G, m);
cylinder2Mesh.rotation.x = 0.5 * Math.PI;
cylinder2Mesh.position.z = 1;

//车身body
const bodyGroup = new THREE.Group();
const bodyG = new THREE.BoxGeometry(3, 0.5, 1.8);
const bodyMesh = new THREE.Mesh(bodyG, m);
bodyGroup.position.set(1, 0, 1);

//车顶

bodyGroup.add(bodyMesh);
car.add(bodyGroup);
wheelGroup1.add(cylinder1Mesh);
wheelGroup3.add(cylinder2Mesh);

wheelGroup1.add(wheel1Mesh);
wheelGroup2.add(wheel1Mesh.clone());
wheelGroup3.add(wheel1Mesh.clone());
wheelGroup4.add(wheel1Mesh.clone());

wheelGroup1.position.set(0, 0, 0);
wheelGroup2.position.set(0, 0, 2);
wheelGroup3.position.set(2, 0, 0);
wheelGroup4.position.set(2, 0, 2);

car.position.set(-1, 0, -1);
car.add(wheelGroup1);
car.add(wheelGroup2);
car.add(wheelGroup3);
car.add(wheelGroup4);

scene.add(car);

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

  // car.position.y = Math.sin(time);
  wheelGroup1.rotation.z = time;
  wheelGroup2.rotation.z = time;
  wheelGroup3.rotation.z = time;
  wheelGroup4.rotation.z = time;

  requestAnimationFrame(tick);
  renderer.render(scene, camera);
  stat.update();
  orbitControls.update();
}

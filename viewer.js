const urlParams = new URLSearchParams(window.location.search);
const animationFile = urlParams.get('file');

if (!animationFile) {
  alert('No animation file specified.');
} else {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const light = new THREE.AmbientLight(0xffffff, 1);
  scene.add(light);

  const loader = new THREE.GLTFLoader();
  loader.load(`animations/${animationFile}`, (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    const mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => mixer.clipAction(clip).play());

    const clock = new THREE.Clock();
    camera.position.set(0, 2, 5);

    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();
      mixer.update(delta);
      renderer.render(scene, camera);
    }
    animate();
  });
}
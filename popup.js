document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById("renderCanvas");
  const engine = new BABYLON.Engine(canvas, true);
  const scene = new BABYLON.Scene(engine);
  
  // Create a camera and light
  const camera = new BABYLON.ArcRotateCamera("camera1", Math.PI / 2, Math.PI / 2, 10, BABYLON.Vector3.Zero(), scene);
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight("light1", BABYLON.Vector3.Up(), scene);

  
  // Load .glb files from the animations folder
  const animations = ['able.glb', 'above.glb', 'absent.glb', 'accept.glb', 'access.glb', 'action.glb', 'add.glb', 'after.glb', 'better.glb', 'big.glb', 'bill.glb', 'bite.glb', 'boy.glb', 'brain.glb', 'break.glb', 'breakfast.glb', 'deaf.glb', 'devil.glb', 'different.glb', 'director.glb', 'energy.glb', 'english.glb', 'environment.glb', 'event.glb', 'funny.glb', 'future.glb', 'get.glb', 'give.glb', 'go.glb', 'house.glb', 'icecream.glb', 'join.glb', 'know.glb', 'knowledge.glb', 'last.glb', 'let down.glb', 'never.glb', 'new.glb', 'next.glb', 'nice to meet you.glb', 'other.glb', 'our.glb', 'part.glb', 'past.glb', 'see.glb', 'shallow.glb', 'share.glb', 'up.glb', 'yaer.glb', 'you.glb'];  // Add more .glb file names here
  const listContainer = document.getElementById('animations-list');

  animations.forEach((file) => {
    const item = document.createElement('button');
    item.innerText = file;
    item.onclick = () => loadAnimation(file);
    listContainer.appendChild(item);
  });

  // Function to load a .glb animation
  function loadAnimation(file) {
    BABYLON.SceneLoader.Append('animations/', file, scene, function (scene) {
      console.log("Model loaded!");
    });
  }

  // Render the scene
  engine.runRenderLoop(() => {
    scene.render();
  });

  // Adjust canvas size when window is resized
  window.addEventListener("resize", function () {
    engine.resize();
  });
});

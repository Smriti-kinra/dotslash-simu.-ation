(async () => {
  const canvas = document.getElementById("animationCanvas");

  // Get the processed text from storage
  chrome.storage.local.get("processedText", async ({ processedText }) => {
    if (!processedText) {
      console.error("No processed text found in storage.");
      return;
    }

    console.log("Processed Text:", processedText);

    // Map text to animations
    const mappings = {
      "hello": "hello.glb",
      "welcome": "welcome.glb",
      // Add more mappings
    };

    const animationFile = mappings[processedText.trim().toLowerCase()];
    if (!animationFile) {
      console.error("No animation mapping found for:", processedText);
      return;
    }

    console.log("Animation File:", animationFile);

    // Load and render the animation
    const { GLTFLoader } = await import("https://cdn.jsdelivr.net/npm/three/examples/jsm/loaders/GLTFLoader.js");
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.width, canvas.height);
    renderer.setClearColor(0xffffff); // White background

    // Add a camera
    const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    camera.position.set(0, 1, 5); // Adjust position for better visibility

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft global light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light for shadows
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the GLB file
    const loader = new GLTFLoader();
    loader.load(
      chrome.runtime.getURL(`animations/${animationFile}`),
      (gltf) => {
        const model = gltf.scene;
        console.log("Animation Loaded:", model);

        // Scale the model to a visible size
        model.scale.set(1, 1, 1); // Adjust scale if necessary

        // Center the model in the scene
        const boundingBox = new THREE.Box3().setFromObject(model);
        const center = boundingBox.getCenter(new THREE.Vector3());
        model.position.sub(center);

        scene.add(model);

        // Play animations if they exist
        if (gltf.animations.length > 0) {
          const mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            mixer.clipAction(clip).play();
          });

          // Update animation frame in the render loop
          const clock = new THREE.Clock();
          const animate = () => {
            requestAnimationFrame(animate);
            const delta = clock.getDelta();
            mixer.update(delta);
            renderer.render(scene, camera);
          };
          animate();
        } else {
          console.warn("No animations found in the GLB file.");
        }
      },
      undefined,
      (error) => {
        console.error("Error loading GLB file:", error);
      }
    );
  });
})();

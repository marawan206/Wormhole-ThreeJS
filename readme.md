# Wormhole in ThreeJS

This project is part of my learning of Three.js, I've made a dynamic 3D scene that has a camera going through a glowing tube along a spline path with some post-processing effects

## Features

- **Tube Geometry**: A visually striking 3D tube generated from a spline curve (`CatmullRomCurve3`) and (`Vector3`) to change the spline coordinates for ThreeJS
- **RGB Glowing Effect**: The tube's vertices emit an animated RGB glow.
- **Post-Processing**: Added bloom effect using `UnrealBloomPass` for an enhanced glowing effect.
- **Dynamic Camera**: The camera follows along the spline path for an immersive effect.
- **OrbitControls**: Interact with the scene using mouse controls.
- **Boxes Along the Tube**: Randomly positioned and rotated boxes follow the tube, with wireframe rendering and custom coloring.
  
## Technologies Used

- **Three.js**: Core 3D library.
- **OrbitControls**: For smooth camera control.
- **EffectComposer**: For post-processing.
- **UnrealBloomPass**: For glowing bloom effects.
- **Vite**: Fast dev server and bundler.

## Setup Instructions

1. Clone the repository:

```bash
git clone https://github.com/yourusername/threejs-learning-journey.git
```

2. Navigate into the project directory:

```bash
cd threejs-learning-journey
```

3. Install the dependencies:

```bash
npm install
```

4. Run the development server:

```bash
npm run dev
```

5. Open the project in your browser at `http://localhost:3000`.

## Using the included Dockerfile

1. **Build the Docker image**: Run the following command in the terminal from the project directory (where the Dockerfile is located):

   ```bash
   docker build -t threejs-app .
   ```

2. **Run the Docker container**: After building, you can run the container and map port `3000` to your local machine:

   ```bash
   docker run -p 3000:3000 threejs-app
   ```

3. **Access the app**: Once the container is running, you can access your Three.js project by navigating to `http://localhost:3000` in your browser.

### Notes:

- This is not optimized for production, this is only for development purposes


## File Structure

- **script.js**: Main script where the 3D scene is set up. It initializes the renderer, camera, controls, and geometry.
- **spline.js**: Defines the spline curve used to generate the tube geometry. The curve is based on a set of predefined points.
  
## Future Improvements

- Make the tube dark and the floating Boxes glow to light the tube from inside
- Add Text for users to read inside the tube



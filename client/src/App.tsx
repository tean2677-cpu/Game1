import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { KeyboardControls } from "@react-three/drei";
import "@fontsource/inter";
import { CameraController } from "./components/CameraController";
import { Flashlight } from "./components/Flashlight";
import { CenterWall, LeftWall, RightWall, Floor, Bed } from "./components/Walls";
import { GameUI } from "./components/GameUI";
import { GameTimer } from "./components/GameTimer";
import { GameOverScreen } from "./components/GameOverScreen";
import { FlashlightBeamWithCamera } from "./components/FlashlightBeam";
import { BatteryUI } from "./components/Battery UI";
import { FlashlightBatteryController } from "./components/FlashlightBatteryController";
import { FillerWallLeft, FillerWallRight } from "./components/FillerWalls";

enum Controls {
  lookLeft = "lookLeft",
  lookCenter = "lookCenter",
  lookRight = "lookRight",
  lookDown = "lookDown",
  useItem = "useItem",
}

function App() {
  const keyMap = [
    { name: Controls.lookLeft, keys: ["KeyA", "ArrowLeft"] },
    { name: Controls.lookCenter, keys: ["KeyS", "ArrowDown"] },
    { name: Controls.lookRight, keys: ["KeyD", "ArrowRight"] },
    { name: Controls.lookDown, keys: ["KeyW"] },
    { name: Controls.useItem, keys: ["KeyE"] },
  ];

  return (
    <KeyboardControls map={keyMap}>
      <div style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
        <Canvas
          camera={{
            position: [0, 0, 0],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
          gl={{
            antialias: true,
            powerPreference: "default",
          }}
        >
          <color attach="background" args={["#0a0a0a"]} />

          <ambientLight intensity={0.3} />
          <directionalLight position={[0, 5, 2]} intensity={0.5} />
          <pointLight position={[0, 2, 0]} intensity={0.4} color="#fff8dc" />

          <Suspense fallback={null}>
            <CenterWall />
            <LeftWall />
            <RightWall />
            <FillerWallLeft />
            <FillerWallRight />
            <Floor />
            <Bed />
          </Suspense>

          <CameraController />
          <Flashlight />
          <FlashlightBeamWithCamera />
          <FlashlightBatteryController />
        </Canvas>

        <GameUI />
        <GameTimer />
        <GameOverScreen />
        <BatteryUI />
      </div>
    </KeyboardControls>
  );
}

export { Controls };

export default App;

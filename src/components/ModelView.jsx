import { Suspense, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import Lights from "./Lights";
import Iphone from "./Iphones";
import * as THREE from 'three';
import Loader from "./Loader";

const ModelScene = ({ groupRef, controlRef, setRotationState, item, size, scale }) => {
  // Optional: rotate model based on controls or state
  // You can add animation here if you want.

  return (
    <>
      <ambientLight intensity={0.3} />
      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} position={[0, 0, 0]}>
        <Suspense fallback={<Loader />}>
          <Iphone scale={scale} item={item} size={size} />
        </Suspense>
      </group>
    </>
  );
};

const ModelView = ({ index, groupRef, gsapType, controlRef, setRotationState, size, item }) => {
  return (
    <div
      id={gsapType}
      className={`w-full h-full absolute top-0 left-0 ${index === 2 ? "right-[-100%]" : ""}`}
      style={{ touchAction: "none" }} // Prevent touch gestures on mobile
    >
      <Canvas>
        <ModelScene
          groupRef={groupRef}
          controlRef={controlRef}
          setRotationState={setRotationState}
          item={item}
          size={size}
          scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
        />
      </Canvas>
    </div>
  );
};

export default ModelView;

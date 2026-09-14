import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useOceanDepth } from '../../hooks/useOceanDepth';
import { useDeviceTier } from '../../hooks/useDeviceTier';

export const OceanCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { depthPercent } = useOceanDepth();
  const { particleMultiplier } = useDeviceTier();

  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    particles: THREE.Points;
    bubbles: THREE.Points;
    causticsMesh: THREE.Mesh;
    lightRays: THREE.Group;
    targetColors: { top: THREE.Color; bottom: THREE.Color };
    currentColors: { top: THREE.Color; bottom: THREE.Color };
    mouse: THREE.Vector2;
    targetMouse: THREE.Vector2;
  } | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020d1a, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 30;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Volumetric Marine Snow / Particles
    const particleCount = Math.floor(1200 * particleMultiplier);
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    const scaleArray = new Float32Array(particleCount);
    const speedArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 80;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 60;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 50;

      scaleArray[i] = Math.random() * 2.5 + 0.5;
      speedArray[i * 3] = (Math.random() - 0.5) * 0.015; // x drift
      speedArray[i * 3 + 1] = Math.random() * 0.02 + 0.005; // y drift
      speedArray[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particleGeo.setAttribute('scale', new THREE.BufferAttribute(scaleArray, 1));

    // Particle Shader
    const particleMat = new THREE.PointsMaterial({
      size: 0.35,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // 4. Rising Micro-bubbles
    const bubbleCount = Math.floor(300 * particleMultiplier);
    const bubbleGeo = new THREE.BufferGeometry();
    const bubblePos = new Float32Array(bubbleCount * 3);

    for (let i = 0; i < bubbleCount; i++) {
      bubblePos[i * 3] = (Math.random() - 0.5) * 60;
      bubblePos[i * 3 + 1] = (Math.random() - 0.5) * 60;
      bubblePos[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }

    bubbleGeo.setAttribute('position', new THREE.BufferAttribute(bubblePos, 3));
    const bubbleMat = new THREE.PointsMaterial({
      size: 0.65,
      color: 0x67e8f9,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const bubbles = new THREE.Points(bubbleGeo, bubbleMat);
    scene.add(bubbles);

    // 5. Volumetric Light Rays (Light Shafts)
    const lightRays = new THREE.Group();
    for (let i = 0; i < 7; i++) {
      const rayGeo = new THREE.CylinderGeometry(0.2, 5 + Math.random() * 4, 60, 16, 1, true);
      const rayMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.08 - i * 0.008,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const rayMesh = new THREE.Mesh(rayGeo, rayMat);
      rayMesh.position.x = (i - 3) * 12 + Math.random() * 4;
      rayMesh.position.y = 15;
      rayMesh.position.z = -10 + Math.random() * 8;
      rayMesh.rotation.z = (Math.PI / 180) * (15 + (i - 3) * 4);
      rayMesh.rotation.x = 0.2;
      lightRays.add(rayMesh);
    }
    scene.add(lightRays);

    // 6. Surface Wave Caustic Plane
    const causticGeo = new THREE.PlaneGeometry(90, 90, 32, 32);
    const causticMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending
    });
    const causticsMesh = new THREE.Mesh(causticGeo, causticMat);
    causticsMesh.rotation.x = -Math.PI / 2.2;
    causticsMesh.position.y = 22;
    scene.add(causticsMesh);

    // Initial Colors
    const currentColors = {
      top: new THREE.Color(0x0a3c5a),
      bottom: new THREE.Color(0x020a14)
    };
    const targetColors = {
      top: new THREE.Color(0x0a3c5a),
      bottom: new THREE.Color(0x020a14)
    };

    sceneRef.current = {
      scene,
      camera,
      renderer,
      particles,
      bubbles,
      causticsMesh,
      lightRays,
      targetColors,
      currentColors,
      mouse: new THREE.Vector2(0, 0),
      targetMouse: new THREE.Vector2(0, 0)
    };

    // Mouse listener
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      if (sceneRef.current) {
        sceneRef.current.targetMouse.set(x, y);
      }
    };

    // Resize listener
    const handleResize = () => {
      if (!sceneRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // Animation loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      if (sceneRef.current) {
        const { camera, particles, bubbles, causticsMesh, lightRays, mouse, targetMouse } = sceneRef.current;

        // Smooth mouse dampening
        mouse.lerp(targetMouse, 0.04);
        camera.position.x = mouse.x * 3;
        camera.position.y = mouse.y * 2;
        camera.lookAt(0, 0, 0);

        // Move particles
        const pos = particles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          pos[i * 3] += Math.sin(elapsedTime * 0.5 + i) * 0.01 + speedArray[i * 3];
          pos[i * 3 + 1] -= speedArray[i * 3 + 1] * 0.8;
          if (pos[i * 3 + 1] < -30) pos[i * 3 + 1] = 30;
        }
        particles.geometry.attributes.position.needsUpdate = true;

        // Rising Bubbles
        const bPos = bubbles.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < bubbleCount; i++) {
          bPos[i * 3 + 1] += 0.05 + Math.sin(elapsedTime + i) * 0.01;
          bPos[i * 3] += Math.sin(elapsedTime * 2 + i) * 0.01;
          if (bPos[i * 3 + 1] > 30) {
            bPos[i * 3 + 1] = -30;
            bPos[i * 3] = (Math.random() - 0.5) * 60;
          }
        }
        bubbles.geometry.attributes.position.needsUpdate = true;

        // Caustic wave distortion
        causticsMesh.rotation.z = elapsedTime * 0.03;

        // Light rays slow swaying
        lightRays.children.forEach((ray, idx) => {
          ray.rotation.z = (Math.PI / 180) * (15 + (idx - 3) * 4) + Math.sin(elapsedTime * 0.8 + idx) * 0.03;
        });

        renderer.render(scene, camera);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [particleMultiplier]);

  // Depth-driven background color interpolation & fog density
  useEffect(() => {
    if (!sceneRef.current) return;
    const { scene, lightRays, particles } = sceneRef.current;

    // Depth zones:
    // 0.0 -> Surface (Cyan/Teal)
    // 0.3 -> Shallow/Mid (Deep Ocean Blue)
    // 0.6 -> Deep Water (Navy Abyss)
    // 0.85 -> Hadal Abyss (Dark Midnight Cyan)
    // 1.0 -> Core (Holographic Deep Cyan-Blue)
    let rayOpacity = Math.max(0, 0.08 * (1 - depthPercent * 1.5));
    let particleColor = new THREE.Color(0x38bdf8);

    if (depthPercent < 0.2) {
      scene.fog = new THREE.FogExp2(0x03182b, 0.02);
      particleColor.setHex(0x38bdf8);
    } else if (depthPercent < 0.5) {
      scene.fog = new THREE.FogExp2(0x021020, 0.026);
      particleColor.setHex(0x0284c7);
    } else if (depthPercent < 0.8) {
      scene.fog = new THREE.FogExp2(0x010814, 0.032);
      particleColor.setHex(0x06b6d4);
    } else {
      scene.fog = new THREE.FogExp2(0x00050c, 0.04);
      particleColor.setHex(0x22d3ee);
    }

    lightRays.children.forEach(ray => {
      if (ray instanceof THREE.Mesh) {
        (ray.material as THREE.MeshBasicMaterial).opacity = rayOpacity;
      }
    });

    (particles.material as THREE.PointsMaterial).color = particleColor;
  }, [depthPercent]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-colors duration-1000"
      style={{
        background: depthPercent < 0.25
          ? 'radial-gradient(ellipse at 50% 0%, rgba(14, 75, 110, 0.4) 0%, rgba(2, 9, 20, 0.95) 75%)'
          : depthPercent < 0.6
          ? 'radial-gradient(ellipse at 50% 15%, rgba(3, 40, 75, 0.3) 0%, rgba(1, 6, 14, 0.98) 80%)'
          : depthPercent < 0.88
          ? 'radial-gradient(ellipse at 50% 30%, rgba(2, 25, 50, 0.25) 0%, rgba(1, 4, 10, 0.99) 85%)'
          : 'radial-gradient(ellipse at 50% 50%, rgba(6, 40, 65, 0.3) 0%, rgba(0, 3, 8, 1) 90%)'
      }}
    />
  );
};

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Clone, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}models/mascot-walk.glb`
const FIT_HEIGHT = 1.85

const _e = new THREE.Euler()
const _dq = new THREE.Quaternion()
const _t = new THREE.Quaternion()

// global pointer so the mascot tracks the cursor across the whole page
const clientPointer = { x: 0, y: 0 }
if (typeof window !== 'undefined') {
  clientPointer.x = window.innerWidth / 2
  clientPointer.y = window.innerHeight / 2
  window.addEventListener('pointermove', (e) => {
    clientPointer.x = e.clientX
    clientPointer.y = e.clientY
  })
}

function canvasPointer(gl) {
  const rect = gl.domElement.getBoundingClientRect()
  const cx = rect.left + rect.width / 2
  const cy = rect.top + rect.height / 2
  return {
    x: THREE.MathUtils.clamp((clientPointer.x - cx) / (rect.width * 0.8), -1, 1),
    y: THREE.MathUtils.clamp(-(clientPointer.y - cy) / (rect.height * 0.8), -1, 1),
  }
}

// pose bone deltas: [x, y, z] radians in bone-local space
const POSES = {
  idle: {},
  walk: {},
  wave: {
    'upper_arm.L': (t) => [0.1, 0, 1.75],
    'forearm.L': (t) => [0.55 + Math.sin(t * 5.5) * 0.42, 0, 0],
    'hand.L': (t) => [0, 0, Math.sin(t * 5.5 + 1.1) * 0.35],
    'upper_arm.R': (t) => [0.2, 0, -0.15],
    'forearm.R': () => [0.35, 0, 0],
    head: () => [0.06, 0, -0.12],
  },
  hang: {
    'upper_arm.L': (t) => [0, 0, 2.3],
    'upper_arm.R': (t) => [0, 0, -2.3],
    'forearm.L': () => [0.55, 0, 0],
    'forearm.R': () => [0.55, 0, 0],
    'hand.L': () => [0.3, 0, 0],
    'hand.R': () => [0.3, 0, 0],
    'thigh.L': (t) => [0.25 + Math.sin(t * 1.15) * 0.13, 0, 0],
    'thigh.R': (t) => [0.25 + Math.sin(t * 1.15 + 1.4) * 0.13, 0, 0],
    'shin.L': () => [-0.4, 0, 0],
    'shin.R': () => [-0.45, 0, 0],
    head: (t) => [-0.2, 0, Math.sin(t * 0.9) * 0.07],
  },
}

const BONE_NAMES = [
  'head', 'neck', 'chest', 'spine.001', 'hips',
  'upper_arm.L', 'upper_arm.R', 'forearm.L', 'forearm.R', 'hand.L', 'hand.R',
  'thigh.L', 'thigh.R', 'shin.L', 'shin.R', 'foot.L', 'foot.R', 'toe.L', 'toe.R',
]

function Model({ pose }) {
  const { scene, animations } = useGLTF(MODEL_URL)
  const group = useRef()
  const inner = useRef()
  const rig = useRef(null)
  const mixer = useRef(null)

  const { scale, offset } = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = FIT_HEIGHT / size.y
    return {
      scale: s,
      offset: new THREE.Vector3(-center.x * s, -center.y * s, -center.z * s),
    }
  }, [scene])

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime
    const swings = POSES[pose] ?? POSES.idle
    const pointer = canvasPointer(state.gl)

    if (group.current) {
      if (pose === 'hang') {
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, 0, 4, delta)
        group.current.rotation.z = Math.sin(t * 0.9) * 0.1
        group.current.position.y = Math.abs(Math.sin(t * 0.9)) * 0.02
      } else {
        group.current.rotation.z = THREE.MathUtils.damp(group.current.rotation.z, pose === 'wave' ? -0.05 : 0, 4, delta)
        group.current.position.y = pose === 'wave' ? Math.abs(Math.sin(t * 5.5)) * 0.012 : 0
        const target = Math.sin(t * 0.45) * 0.18 + pointer.x * 0.35
        group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, target, 4, delta)
        group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * -0.06, 4, delta)
      }
    }

    if (!inner.current) return
    if (!rig.current) {
      const bones = {}
      for (const name of BONE_NAMES) {
        // GLTFLoader sanitizes node names: 'upper_arm.L' -> 'upper_armL'
        const bone =
          inner.current.getObjectByName(name) ??
          inner.current.getObjectByName(name.replace(/[^a-zA-Z0-9_-]/g, ''))
        if (bone) bones[name] = { bone, rest: bone.quaternion.clone() }
      }
      rig.current = bones
    }

    if (pose === 'walk') {
      if (!mixer.current) {
        mixer.current = new THREE.AnimationMixer(inner.current)
        const clip = animations.find((a) => a.name === 'walk')
        if (clip) mixer.current.clipAction(clip).play()
      }
      mixer.current.update(delta)
      return
    }

    const pointerYaw = pointer.x * 0.45
    const pointerPitch = pointer.y * -0.16 + Math.sin(t * 0.8) * 0.02

    for (const [name, entry] of Object.entries(rig.current)) {
      const fn = swings[name]
      let x = 0, y = 0, z = 0
      if (fn) [x, y, z] = fn(t)
      if (name === 'head') {
        x += pointerPitch * 0.7
        y += pointerYaw * 0.7
      } else if (name === 'neck') {
        x += pointerPitch * 0.3
        y += pointerYaw * 0.3
      } else if (name === 'chest') {
        x += Math.sin(t * 1.6) * 0.025
      }
      if (!x && !y && !z) {
        entry.bone.quaternion.slerp(entry.rest, 1 - Math.exp(-4 * delta))
        continue
      }
      _t.copy(entry.rest).multiply(_dq.setFromEuler(_e.set(x, y, z)))
      entry.bone.quaternion.slerp(_t, 1 - Math.exp(-6 * delta))
    }
  })

  return (
    <group ref={group}>
      <group ref={inner}>
        <Clone object={scene} scale={scale} position={offset} />
      </group>
      {pose === 'hang' && (
        <mesh position={[0, 1.5, -0.03]}>
          <cylinderGeometry args={[0.006, 0.006, 0.75, 8]} />
          <meshStandardMaterial color="#8b94a3" roughness={0.9} />
        </mesh>
      )}
    </group>
  )
}

export default function Mascot3D({ className = '', pose = 'idle' }) {
  return (
    <Canvas
      className={className}
      camera={{ position: [0, 0.1, 3.2], fov: 34 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.0} />
      <directionalLight position={[3, 4, 5]} intensity={1.7} />
      <directionalLight position={[-4, 1, -2]} intensity={0.5} color="#ffb020" />
      <Model pose={pose} />
    </Canvas>
  )
}

useGLTF.preload(MODEL_URL)

import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Clone, useGLTF } from '@react-three/drei'
import * as THREE from 'three'

const MODEL_URL = `${import.meta.env.BASE_URL}models/climber.glb`
const FIT_HEIGHT = 1.1
const TWIST_MAX = 0.1 // ~6 degrees
// twist fades to zero below the knees so both pole segments stay put
const TWIST_LO = 0.42
const TWIST_HI = 0.58

// shared uniform so every material/instance stays in sync
const twistUniform = { value: 0 }

const TWIST_VERT = `
  vec4 twWorld = uModel * vec4(transformed, 1.0);
  float twT = (twWorld.y - uMinY) / uSizeY;
  float twAng = uTwist * smoothstep(uKneeLo, uKneeHi, twT);
  float twC = cos(twAng);
  float twS = sin(twAng);
  vec3 twRel = twWorld.xyz - uPivot;
  twWorld.xyz = uPivot + uAxis * dot(twRel, uAxis) * (1.0 - twC) + twRel * twC + cross(uAxis, twRel) * twS;
  transformed = (uModelInv * twWorld).xyz;
`

function ClimberModel() {
  const { scene } = useGLTF(MODEL_URL)
  const motion = useRef({ angle: 0, target: 0, next: 0 })

  const { scale, offset } = useMemo(() => {
    scene.updateMatrixWorld(true)
    const box = new THREE.Box3().setFromObject(scene)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const s = FIT_HEIGHT / size.y
    // align the pole axis (measured x ~ +0.058, z ~ +0.044), not the silhouette
    const off = new THREE.Vector3(-0.0577 * s, -center.y * s, -0.0436 * s)

    // fit the upper-pole line from vertices in the top band — above the head only the pole is there
    const sums = [new THREE.Vector3(), new THREE.Vector3()]
    const counts = [0, 0]
    const v = new THREE.Vector3()
    scene.traverse((o) => {
      if (!o.isMesh) return
      const pos = o.geometry.attributes.position
      for (let i = 0; i < pos.count; i++) {
        v.fromBufferAttribute(pos, i).applyMatrix4(o.matrixWorld)
        const t = (v.y - box.min.y) / size.y
        const j = t >= 0.93 ? 1 : t >= 0.84 ? 0 : -1
        if (j >= 0) {
          sums[j].add(v)
          counts[j]++
        }
      }
    })

    let axis, pivot
    if (counts[0] > 20 && counts[1] > 20) {
      sums.forEach((sum, j) => sum.divideScalar(counts[j]))
      axis = sums[1].clone().sub(sums[0]).normalize()
      pivot = sums[0].clone().addScaledVector(axis, (center.y - sums[0].y) / axis.y)
    } else {
      axis = new THREE.Vector3(-0.066, -1, 0).normalize()
      pivot = new THREE.Vector3(0.02, center.y, 0.044)
    }

    // inject the waist twist into each mesh's material
    scene.traverse((o) => {
      if (!o.isMesh) return
      if (!o.userData.twistReady) {
        o.material = Array.isArray(o.material)
          ? o.material.map((m) => m.clone())
          : o.material.clone()
        o.userData.twistReady = true
      }
      const uModel = o.matrixWorld
      const uModelInv = uModel.clone().invert()
      const mats = Array.isArray(o.material) ? o.material : [o.material]
      mats.forEach((mat) => {
        mat.onBeforeCompile = (shader) => {
          Object.assign(shader.uniforms, {
            uTwist: twistUniform,
            uAxis: { value: axis },
            uPivot: { value: pivot },
            uModel: { value: uModel },
            uModelInv: { value: uModelInv },
            uMinY: { value: box.min.y },
            uSizeY: { value: size.y },
            uKneeLo: { value: TWIST_LO },
            uKneeHi: { value: TWIST_HI },
          })
          shader.vertexShader = shader.vertexShader
            .replace(
              '#include <common>',
              `#include <common>
              uniform float uTwist; uniform vec3 uAxis; uniform vec3 uPivot;
              uniform mat4 uModel; uniform mat4 uModelInv;
              uniform float uMinY; uniform float uSizeY; uniform float uKneeLo; uniform float uKneeHi;`
            )
            .replace('#include <begin_vertex>', `#include <begin_vertex>\n${TWIST_VERT}`)
        }
        mat.needsUpdate = true
      })
    })

    return { scale: s, offset: off }
  }, [scene])

  useFrame((state, dt) => {
    const m = motion.current
    const t = state.clock.elapsedTime
    if (t >= m.next) {
      m.target = (Math.random() * 2 - 1) * TWIST_MAX
      m.next = t + 2 + Math.random() * 3.5
    }
    m.angle = THREE.MathUtils.damp(m.angle, m.target, 1.4, dt)
    twistUniform.value = m.angle
  })

  return (
    <group rotation-y={-0.45}>
      <Clone object={scene} scale={scale} position={offset} />
    </group>
  )
}

export default function ScrollClimber() {
  return (
    <div
      className="pointer-events-none fixed top-[4vh] z-30 hidden w-[min(32rem,calc(50vw-30rem))] lg:block"
      style={{ left: 'clamp(0px, 1vw, 1rem)' }}
      aria-hidden="true"
    >
      <Canvas
        className="!aspect-[3/4]"
        style={{ pointerEvents: 'none' }}
        camera={{ position: [0, 0, 3.4], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.1} />
        <directionalLight position={[3, 4, 5]} intensity={1.6} />
        <directionalLight position={[-3, 1, -1]} intensity={0.4} color="#ffb020" />
        <Suspense fallback={null}>
          <ClimberModel />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload(MODEL_URL)

import { Suspense, lazy } from 'react'

const Mascot3D = lazy(() => import('./Mascot3D'))

const anims = {
  float: 'animate-float',
  wave: 'animate-wave',
  sway: 'animate-sway',
  still: '',
}

export default function Mascot({
  anim = 'float',
  pose = 'idle',
  className = '',
  alt = 'Верхолаз — маскот компании',
}) {
  return (
    <div className={`aspect-[4/5] select-none ${anims[anim] ?? ''} ${className}`}>
      <Suspense fallback={null}>
        <Mascot3D className="!h-full !w-full" pose={pose} />
      </Suspense>
    </div>
  )
}

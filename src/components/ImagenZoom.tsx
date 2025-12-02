'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ImagenZoom({ src, alt, width, height, className, overlayTargetSelector }: { src: string; alt: string; width: number; height: number; className?: string; overlayTargetSelector?: string }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [hover, setHover] = useState(false)
  const [pos, setPos] = useState<{ x: number; y: number; w: number; h: number }>({ x: 0, y: 0, w: 0, h: 0 })
  const target = typeof document !== 'undefined' && overlayTargetSelector ? document.querySelector(overlayTargetSelector) as HTMLElement | null : null

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className ?? ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top, w: r.width, h: r.height })
      }}
    >
      <Image src={src} alt={alt} width={width} height={height} className="object-contain h-80 w-auto" />
      {hover && (
        target
          ? createPortal(
              <div
                className="absolute top-2 right-2 h-40 w-40 rounded-lg ring-1 ring-white/60 shadow-lg bg-black/60 backdrop-blur-xl z-50"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200% 200%',
                  backgroundPosition: `${(pos.x / Math.max(pos.w, 1)) * 100}% ${(pos.y / Math.max(pos.h, 1)) * 100}%`,
                }}
                aria-hidden
              />,
              target
            )
          : (
              <div
                className="absolute top-2 right-2 h-40 w-40 rounded-lg ring-1 ring-white/60 shadow-lg bg-black/60 backdrop-blur-xl"
                style={{
                  backgroundImage: `url(${src})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '200% 200%',
                  backgroundPosition: `${(pos.x / Math.max(pos.w, 1)) * 100}% ${(pos.y / Math.max(pos.h, 1)) * 100}%`,
                }}
                aria-hidden
              />
            )
      )}
    </div>
  )
}

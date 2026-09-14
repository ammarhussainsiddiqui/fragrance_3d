'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Environment, Lightformer, MeshTransmissionMaterial, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import gsap from 'gsap'
import { brand } from '../lib/brand'

export const FRAGRANCES = {
  amber: { number: 'Nº 01', name: "Bois d'Ambre", liquid: '#8a4616', glow: '#3d1c05' },
  noir: { number: 'Nº 02', name: 'Fleur Noire', liquid: '#3a2624', glow: '#1a0f0e' },
  clair: { number: 'Nº 03', name: 'Sel Blanc', liquid: '#dcc088', glow: '#6b5a30' },
  vert: { number: 'Nº 04', name: 'Encens Vert', liquid: '#4a5c40', glow: '#1e2a19' },
}

const GLASS = '#ffffff'
const CAP = '#121110'
const COLLAR = '#d6c094'

function makeLabelTexture({ number, name }) {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 640
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = '#f4efe6'
  ctx.fillRect(0, 0, 512, 640)

  ctx.strokeStyle = 'rgba(28,26,23,0.6)'
  ctx.lineWidth = 2
  ctx.strokeRect(22, 22, 468, 596)

  ctx.fillStyle = '#1c1a17'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'

  ctx.letterSpacing = '9px'
  ctx.font = '500 24px "Helvetica Neue", Helvetica, Arial, sans-serif'
  ctx.fillText(brand.name.toUpperCase(), 258, 118)

  ctx.fillRect(206, 156, 100, 1.5)

  ctx.letterSpacing = '5px'
  ctx.font = '400 22px "Helvetica Neue", Helvetica, Arial, sans-serif'
  ctx.fillText(number, 258, 222)

  ctx.letterSpacing = '1px'
  ctx.font = 'italic 400 60px Georgia, "Times New Roman", serif'
  const words = name.split(' ')
  if (words.length > 1 && name.length > 11) {
    const mid = Math.ceil(words.length / 2)
    ctx.fillText(words.slice(0, mid).join(' '), 256, 300)
    ctx.fillText(words.slice(mid).join(' '), 256, 372)
  } else {
    ctx.fillText(name, 256, 336)
  }

  ctx.letterSpacing = '7px'
  ctx.font = '400 20px "Helvetica Neue", Helvetica, Arial, sans-serif'
  ctx.fillText('EAU DE PARFUM', 259, 470)

  ctx.letterSpacing = '2px'
  ctx.font = '400 18px "Helvetica Neue", Helvetica, Arial, sans-serif'
  ctx.fillText('50 ml  ·  1.7 fl oz', 257, 560)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 8
  texture.needsUpdate = true
  return texture
}

export default function PerfumeBottle({
  variant = 'amber',
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  quality = 'low',
  spin = true,
  spinSpeed = 0.006,
  animateIn = true,
  glassBackground,
}) {
  const groupRef = useRef(null)
  const labelRef = useRef(null)
  const fragrance = FRAGRANCES[variant] ?? FRAGRANCES.amber
  const labelMap = useMemo(() => makeLabelTexture(fragrance), [fragrance])
  const background = useMemo(
    () => (glassBackground ? new THREE.Color(glassBackground) : undefined),
    [glassBackground]
  )

  useEffect(() => () => labelMap.dispose(), [labelMap])

  useEffect(() => {
    if (!groupRef.current || !animateIn) return
    gsap.fromTo(
      groupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: scale, y: scale, z: scale, duration: 0.9, ease: 'power3.out' }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!groupRef.current) return
    gsap.to(groupRef.current.scale, { x: scale, y: scale, z: scale, duration: 0.6, ease: 'power2.out' })
  }, [scale])

  useFrame(() => {
    if (spin && groupRef.current) groupRef.current.rotation.y += spinSpeed
  })

  // The label sits on the outer glass. Hide it while MeshTransmissionMaterial
  // captures its refraction buffer (priority 0, subscribed earlier by the child
  // material) so the glass does not refract a ghost copy of it; restore before
  // the main render so the printed label stays crisp.
  useFrame(() => {
    if (labelRef.current) labelRef.current.visible = false
  }, -1)
  useFrame(() => {
    if (labelRef.current) labelRef.current.visible = true
  }, 0)

  const resolution = { low: 512, high: 1024, ultra: 2048 }[quality] ?? 512
  const samples = quality === 'low' ? 4 : 8

  return (
    <group ref={groupRef} scale={scale} position={position} rotation={rotation}>
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={2.2} form="rect" position={[0, 5, 0]} scale={[8, 4, 1]} rotation-x={Math.PI / 2} color="#fff7ea" />
        <Lightformer intensity={1.4} form="rect" position={[-5, 1, 2]} scale={[1.2, 7, 1]} rotation-y={Math.PI / 2} color="#ffffff" />
        <Lightformer intensity={1.4} form="rect" position={[5, 1, 2]} scale={[1.2, 7, 1]} rotation-y={-Math.PI / 2} color="#ffffff" />
        <Lightformer intensity={0.9} form="rect" position={[0, 2, 7]} scale={[6, 6, 1]} color="#f4efe6" />
        <Lightformer intensity={2.4} form="rect" position={[-2.4, 1.5, 6]} scale={[0.5, 6, 1]} color="#ffffff" />
        <Lightformer intensity={0.7} form="rect" position={[0, 0, -6]} scale={[10, 10, 1]} color="#cdb98e" />
        <Lightformer intensity={0.5} form="rect" position={[0, -5, 0]} scale={[8, 4, 1]} rotation-x={-Math.PI / 2} color="#b9a98a" />
      </Environment>

      <group position={[0, -0.44, 0]}>
        {/* Glass body */}
        <RoundedBox args={[1.4, 2.25, 0.6]} radius={0.08} smoothness={6}>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={0.55}
            roughness={0.02}
            ior={1.5}
            chromaticAberration={0.015}
            anisotropicBlur={0}
            distortion={0}
            temporalDistortion={0}
            samples={samples}
            resolution={resolution}
            color={GLASS}
            attenuationColor="#efe6d4"
            attenuationDistance={2}
            background={background}
          />
        </RoundedBox>

        {/* Liquid */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[1.18, 1.8, 0.4]} />
          <meshPhysicalMaterial
            color={fragrance.liquid}
            emissive={fragrance.glow}
            emissiveIntensity={0.4}
            roughness={0.12}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
          />
        </mesh>

        {/* Label — printed on the front face of the glass */}
        <mesh ref={labelRef} position={[0, -0.1, 0.3015]}>
          <planeGeometry args={[0.84, 1.05]} />
          <meshStandardMaterial map={labelMap} roughness={0.9} />
        </mesh>

        {/* Collar */}
        <mesh position={[0, 1.285, 0]}>
          <cylinderGeometry args={[0.25, 0.25, 0.32, 48]} />
          <meshStandardMaterial color={COLLAR} metalness={1} roughness={0.3} />
        </mesh>

        {/* Cap */}
        <mesh position={[0, 1.725, 0]}>
          <cylinderGeometry args={[0.34, 0.34, 0.56, 64]} />
          <meshPhysicalMaterial color={CAP} roughness={0.28} clearcoat={1} clearcoatRoughness={0.12} />
        </mesh>
      </group>
    </group>
  )
}

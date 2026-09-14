import { brand } from '../lib/brand'

export default function Logo({ className = '', compact = false }) {
  return (
    <span
      className={`inline-flex flex-col items-start leading-none select-none text-ivory ${className}`}
      aria-label={brand.name}
    >
      <span
        className={`font-sans font-medium uppercase tracking-[0.5em] text-taupe ${compact ? 'text-[8px]' : 'text-[9px] md:text-[10px]'}`}
      >
        {brand.house}
      </span>
      <span
        className={`font-display tracking-[0.12em] uppercase mt-1 ${compact ? 'text-lg' : 'text-xl md:text-2xl'}`}
      >
        {brand.mark}
      </span>
    </span>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown, Globe, Smartphone, Zap, Target, ShoppingCart, Briefcase } from "lucide-react"

export function CustomDropdown({ dropdownValue, name, label }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedType, setSelectedType] = useState(null)

  const handleSelect = (value) => {
    setSelectedType(value)
    setIsOpen(false)
  }

  const selectedProject = dropdownValue.find((type) => type.value === selectedType)
  const SelectedIcon = selectedProject?.icon
  return (
    <div className="relative w-full">
      {/* Dropdown Trigger */}
      <input type="hidden" name={name} value={selectedType || ""} />

      <button
        name={name}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
        className={`field text-left transition-all duration-200 ${isOpen ? "border-champagne" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {SelectedIcon && <SelectedIcon className="h-5 w-5 text-taupe" />}
            <span className={selectedProject ? "text-ivory" : "text-stone"}>
              {selectedProject?.label ?? label}
            </span>
          </div>
          <ChevronDown
            strokeWidth={1.5}
            className={`h-4 w-4 text-taupe transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Menu Content */}
          <div className="absolute h-56  z-20 w-full mt-2   overflow-y-scroll bg-ink-soft border border-ivory/10 rounded-xl shadow-2xl shadow-black/60 overflow-hidden animate-in fade-in-0 zoom-in-95 slide-in-from-top-2 duration-200">
            <div className="p-2">
              {dropdownValue.map((type, index) => {
                const Icon = type.icon
                return (
                  <button
                    key={type.value}
                    onClick={() => handleSelect(type.value)}
                    className={`w-full px-4  py-3 rounded-lg flex items-center gap-3 text-left transition-all duration-150 hover:bg-ivory/5 hover:translate-x-1 focus:outline-none focus:bg-ivory/5 animate-in fade-in-0 slide-in-from-left-1 group ${selectedType === type.value ? "bg-ivory/10" : ""
                      }`}
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animationFillMode: "backwards",
                    }}
                  >
                    {/* <Icon className="h-5 w-5 text-neutral-400 transition-transform duration-200 group-hover:scale-110" /> */}
                    <span className="text-ivory font-light">{type.label}</span>
                    {selectedType === type.value && (
                      <ChevronDown className="ml-auto h-4 w-4 text-champagne -rotate-90" />
                    )}
                  </button>
                )
              })}
            </div>

            {/* Decorative gradient border at bottom */}
            <div className="h-px bg-gradient-to-r from-transparent via-champagne/40 to-transparent" />
          </div>
        </>
      )}
    </div>
  )
}

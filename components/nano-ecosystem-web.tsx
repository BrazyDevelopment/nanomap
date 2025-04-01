"use client"

import { useState, useRef, useEffect, useCallback, JSX } from "react"
import { motion, useDragControls } from "framer-motion"
import type { Node, CategoryNode } from "@/types/ecosystem"
import { ecosystemData } from "@/data/ecosystem-data"
import { ZoomIn, ZoomOut, Move } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useMobile } from "@/hooks/use-mobile"
import React from 'react'

export default function NanoEcosystemWeb() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 1000 })
  const [zoom, setZoom] = useState(2)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [initialPinchDistance, setInitialPinchDistance] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const dragControls = useDragControls()
  const isMobile = useMobile()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect()
      const size = Math.min(width, height)
      setDimensions({ width: size, height: size })
    }
  }, [])

  useEffect(() => {
    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [updateDimensions])

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.2, 5))
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.2, 0.5))

  const handleCategoryClick = (categoryId: string) => {
    if (!isDragging) setHoveredCategory(categoryId)
  }

  const startDrag = (event: React.PointerEvent) => {
    dragControls.start(event)
    setIsDragging(true)
  }

  const stopDrag = () => {
    setIsDragging(false)
  }

  const resetPosition = () => setPosition({ x: 0, y: 0 })

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY
    if (delta > 0) handleZoomIn()
    else handleZoomOut()
  }, [])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const distance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      setInitialPinchDistance(distance)
    } else if (e.touches.length === 1) {
      setInitialPinchDistance(null)
      const touchEvent = e.touches[0]
      const simulatedPointerEvent = {
        clientX: touchEvent.clientX,
        clientY: touchEvent.clientY,
        pointerId: touchEvent.identifier,
        pointerType: 'touch' as const,
        isPrimary: true,
        button: 0,
        buttons: 1,
        preventDefault: e.preventDefault.bind(e),
      } as unknown as PointerEvent 
      dragControls.start(simulatedPointerEvent)
      setIsDragging(true)
    }
  }, [])

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      const scale = currentDistance / initialPinchDistance
      setZoom(prev => Math.min(Math.max(prev * scale, 0.5), 5))
      setInitialPinchDistance(currentDistance)
    }
  }, [initialPinchDistance])

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    if (e.touches.length < 2) {
      setInitialPinchDistance(null)
      setIsDragging(false)
    }
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Add event listeners with passive: false
    container.addEventListener("wheel", handleWheel, { passive: false })
    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd, { passive: false })

    // Cleanup
    return () => {
      container.removeEventListener("wheel", handleWheel)
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd])

  const { width, height } = dimensions
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) * 2

  // Rest of your existing functions (generateCenterToCategoryPath, generateCategoryToNodePath, etc.) remain unchanged

  return (
    <div className="w-full h-full flex flex-col bg-transparent text-white">
      <header className="flex justify-between items-center p-2 md:p-4 backdrop-blur-md">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleZoomIn} className="bg-gray-950/50 backdrop-blur-sm border-sky-600 text-white hover:bg-gray-700">
            <ZoomIn size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomOut} className="bg-gray-950/50 backdrop-blur-sm border-sky-600 text-white hover:bg-gray-700">
            <ZoomOut size={16} />
          </Button>
          <Button variant="outline" size="sm" onClick={resetPosition} className="bg-gray-950/50 backdrop-blur-sm border-sky-600 text-white hover:bg-gray-700">
            <Move size={16} />
          </Button>
        </div>
        <div className="flex flex-col text-center">
          <div className="flex flex-row text-center">
            <h1 className="pl-9 md:pl-16 font-bold mb-2 text-3xl text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-sky-500 to-cyan-400 text-center">NanoMap</h1>
            <h1 className="font-bold mb-2 text-3xl text-center">🗺️</h1>
          </div>
          <p className="pl-2 text-center text-xs md:text-md">Interact with the map to explore the Nano ecosystem.</p>
        </div>
      </header>
      <div
        ref={containerRef}
        className="relative flex-grow overflow-hidden bg-transparent"
        onPointerDown={startDrag}
        onPointerUp={stopDrag}
      >
        {isMounted && (
          <motion.div
            drag
            dragControls={dragControls}
            dragMomentum={false}
            dragElastic={0.1}
            dragTransition={{ power: 0.1, timeConstant: 200 }}
            whileDrag={{ cursor: "grabbing" }}
            style={{ width: "100%", height: "100%" }}
            animate={position}
            onDragEnd={(e, info) => setPosition({ x: position.x + info.offset.x, y: position.y + info.offset.y })}
          >
            <svg
              ref={svgRef}
              viewBox={`-${width * 0.5} -${height * 0.5} ${width * 2.0} ${height * 2.0}`}
              className="w-full h-full cursor-grab active:cursor-grabbing"
              style={{ position: "relative", transform: `scale(${zoom})`, transition: "transform 0.3s ease-out", overflow: "visible", pointerEvents: "all" }}
            >
              {/* Rest of your SVG content remains unchanged */}
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}
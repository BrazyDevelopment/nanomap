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

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault()
    const delta = -e.deltaY
    if (delta > 0) handleZoomIn()
    else handleZoomOut()
  }

  const handleTouchStart = (e: React.TouchEvent) => {
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
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDistance !== null) {
      e.preventDefault()
      const touch1 = e.touches[0]
      const touch2 = e.touches[1]
      const currentDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY)
      const scale = currentDistance / initialPinchDistance
      setZoom(prev => Math.min(Math.max(prev * scale, 0.5), 5))
      setInitialPinchDistance(currentDistance)
    }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      setInitialPinchDistance(null)
      setIsDragging(false)
    }
  }

  const { width, height } = dimensions
  const centerX = width / 2
  const centerY = height / 2
  const maxRadius = Math.min(width, height) * 2

  const generateCenterToCategoryPath = (category: CategoryNode): string => {
    const startX = centerX
    const startY = centerY
    const endX = category.x * width
    const endY = category.y * height
    const dx = endX - startX
    const dy = endY - startY
    const cpX = startX + dx * 0.3
    const cpY = startY + dy * 0.3
    return `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`
  }

  const generateCategoryToNodePath = (node: Node, categoryNode: CategoryNode): string => {
    const startX = categoryNode.x * width
    const startY = categoryNode.y * height
    const endX = node.x * width
    const endY = node.y * height
    const dx = endX - startX
    const dy = endY - startY
    const cpX = startX + dx * 0.3
    const cpY = startY + dy * 0.3
    return `M ${startX} ${startY} Q ${cpX} ${cpY} ${endX} ${endY}`
  }

  const generateNodeConnections = () => {
    const connections: JSX.Element[] = []
    ecosystemData.categories.forEach((category) => {
      const categoryNodes = ecosystemData.nodes.filter((node) => node.categoryId === category.id)
      const categoryNode = ecosystemData.categoryNodes.find((cn) => cn.categoryId === category.id)
      if (!categoryNode) return

      for (let i = 0; i < categoryNodes.length; i++) {
        const currentNode = categoryNodes[i]
        const nextNode = categoryNodes[(i + 1) % categoryNodes.length]
        const startX = currentNode.x * width
        const startY = currentNode.y * height
        const endX = nextNode.x * width
        const endY = nextNode.y * height
        const midX = (startX + endX) / 2
        const midY = (startY + endY) / 2
        const isHighlighted = hoveredCategory === category.id || hoveredNode === currentNode.id || hoveredNode === nextNode.id

        connections.push(
          <motion.path
            key={`connection-${currentNode.id}-${nextNode.id}`}
            d={`M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`}
            fill="none"
            stroke={category.color}
            strokeWidth={isHighlighted ? 3 : 1.5}
            strokeOpacity={isHighlighted ? 0.9 : 0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: isHighlighted ? 0.9 : 0.3, strokeWidth: isHighlighted ? 3 : 1.5 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: i * 0.1 }}
            style={{ zIndex: 1 }}
          />
        )
      }
    })
    return connections
  }

  const categoryElements: (JSX.Element | null)[] = ecosystemData.categoryNodes.map((categoryNode) => {
    const category = ecosystemData.categories.find((c) => c.id === categoryNode.categoryId)
    if (!category) return null
    const isHovered = hoveredCategory === category.id
    const nodeX = categoryNode.x * width
    const nodeY = categoryNode.y * height
    const rectWidth = isMobile ? 140 : 240
    const rectHeight = isMobile ? 40 : 80
    const textColor = category.color.toLowerCase() === "#ffffff" ? "black" : "white"

    return (
      <g
        key={`category-${category.id}`}
        onMouseEnter={() => !isDragging && setHoveredCategory(category.id)}
        onMouseLeave={() => !isDragging && setHoveredCategory(null)}
        onClick={() => handleCategoryClick(category.id)}
        className="cursor-pointer"
      >
        <motion.path
          d={generateCenterToCategoryPath(categoryNode)}
          fill="none"
          stroke={category.color}
          strokeWidth={isHovered ? 4 : 3}
          strokeOpacity={isHovered ? 0.9 : 0.7}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          style={{ zIndex: 2 }}
        />
        <motion.rect
          x={nodeX - rectWidth / 2}
          y={nodeY - rectHeight / 2}
          width={rectWidth}
          height={rectHeight}
          rx="6"
          fill={category.color}
          className={isHovered ? "filter drop-shadow-lg" : ""}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.1 }}
          style={{ zIndex: 10 }}
        />
        {isHovered && (
          <motion.rect
            x={nodeX - rectWidth / 2 - 10}
            y={nodeY - rectHeight / 2 - 10}
            width={rectWidth + 20}
            height={rectHeight + 20}
            rx="10"
            fill={category.color}
            fillOpacity={0.2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.6 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
            style={{ zIndex: 9 }}
          />
        )}
        <text
          x={nodeX}
          y={nodeY}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={textColor}
          className={isMobile ? `text-lg font-bold ${isHovered ? "font-bold" : ""}` : `text-3xl font-bold ${isHovered ? "font-bold" : ""}`}
          style={{ zIndex: 11 }}
        >
          {category.name}
        </text>
      </g>
    )
  })

  const nodeElements = ecosystemData.nodes.map((node) => {
    const category = ecosystemData.categories.find((c) => c.id === node.categoryId)
    const categoryNode = ecosystemData.categoryNodes.find((cn) => cn.categoryId === node.categoryId)
    if (!category || !categoryNode) return null
  
    const nodeX = node.x * width
    const nodeY = node.y * height
    const logoWidth = node.shape === "rectangle" ? (isMobile ? 120 : 156) : (isMobile ? 60 : 80)
    const logoHeight = node.shape === "rectangle" ? (isMobile ? 48 : 64) : (isMobile ? 60 : 80)
    const isHovered = hoveredNode === node.id || hoveredCategory === category.id

    return (
      <g
        key={node.id}
        className="cursor-pointer"
        onMouseEnter={() => !isDragging && setHoveredNode(node.id)}
        onMouseLeave={() => !isDragging && setHoveredNode(null)}
      >
        <motion.path
          d={generateCategoryToNodePath(node, categoryNode)}
          fill="none"
          stroke={category.color}
          strokeWidth={isHovered ? 3 : 2}
          strokeOpacity={isHovered ? 0.9 : 0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: isHovered ? 0.9 : 0.5, strokeWidth: isHovered ? 3 : 2 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ zIndex: 3 }}
        />
        {node.shape === "rectangle" ? (
          <motion.rect
            x={nodeX - logoWidth / 2 - 4}
            y={nodeY - logoHeight / 2 - 4}
            width={logoWidth + 10}
            height={logoHeight + 10}
            rx="4"
            fill="#0066ff"
            fillOpacity={0.1}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            style={{ zIndex: 4 }}
          />
        ) : (
          <motion.circle
            cx={nodeX}
            cy={nodeY}
            r={logoWidth / 2 + 4}
            fill="#0066ff"
            fillOpacity={0.2}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            style={{ zIndex: 4 }}
          />
        )}
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (isDragging) e.preventDefault()
          }}
        >
          <motion.g
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            whileHover={{ scale: 1.05 }}
            style={{ zIndex: 5, pointerEvents: "auto" }}
          >
            <clipPath id={`clip-${node.id}`}>
              {node.shape === "rectangle" ? (
                <rect x={nodeX - logoWidth / 2} y={nodeY - logoHeight / 2} width={logoWidth} height={logoHeight} rx={4} />
              ) : (
                <circle cx={nodeX} cy={nodeY} r={logoWidth / 1.5} />
              )}
            </clipPath>
            <motion.image
              href={node.logo}
              x={nodeX - logoWidth / 2}
              y={nodeY - logoHeight / 2}
              width={logoWidth}
              height={logoHeight}
              clipPath={`url(#clip-${node.id})`}
              style={{ pointerEvents: "auto" }}
            />
          </motion.g>
        </a>
      </g>
    )
  })

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
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
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
              <defs>
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                  <stop offset="0%" stopColor="#0066ff" stopOpacity="0.15" />
                  <stop offset="70%" stopColor="#0066ff" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                </radialGradient>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="nanoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0066ff" />
                  <stop offset="100%" stopColor="#00f7ff" />
                </linearGradient>
              </defs>
              <motion.circle 
                cx={centerX} 
                cy={centerY} 
                r={maxRadius * 1.8} 
                fill="url(#centerGlow)" 
                initial={{ opacity: 0, scale: 0.5 }} 
                animate={{ opacity: 1, scale: 1 }} 
                transition={{ duration: 1.5, ease: "easeOut" }} 
                style={{ zIndex: 0 }} 
              />
              {generateNodeConnections()}
              {nodeElements}
              {categoryElements}
              <g className="nano-center" style={{ zIndex: 15 }}>
                <motion.image
                  href="/logos/nano.png"
                  x={centerX - 60}
                  y={centerY - 60}
                  width={120}
                  height={120}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 4, ease: "easeOut" }}
                />
                <motion.circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={60.5} 
                  fill="url(#nanoGradient)" 
                  fillOpacity={0.33}
                  filter="url(#glow)" 
                  initial={{ scale: 0, opacity: 0 }} 
                  animate={{ scale: 1, opacity: 1 }} 
                  transition={{ duration: 0.8, ease: "easeOut" }} 
                />
                <motion.circle 
                  cx={centerX} 
                  cy={centerY} 
                  r={60} 
                  fill="url(#nanoGradient)" 
                  fillOpacity={0.2} 
                  initial={{ scale: 0.8, opacity: 0 }} 
                  animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }} 
                  transition={{ repeat: Infinity, duration: 3 }} 
                />
              </g>
            </svg>
          </motion.div>
        )}
      </div>
    </div>
  )
}
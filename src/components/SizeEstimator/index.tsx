'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

type SizeOption = {
  label: string
  size: string
  isDefault?: boolean
  image?: {
    url: string
    alt?: string
  }
}

type SizeEstimatorProps = {
  title: string
  sizes: SizeOption[]
}

const SizeEstimator: React.FC<SizeEstimatorProps> = ({ title, sizes }) => {
  // Find default size or use first size
  const defaultSize = sizes.find((size) => size.isDefault) || sizes[0]
  const [selectedSize, setSelectedSize] = useState<SizeOption>(defaultSize)

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-2xl font-bold text-blue-800 mb-6">{title}</h3>

      {/* Size selector buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            className={cn(
              'px-4 py-2 border-2 rounded-md transition-colors',
              selectedSize.label === size.label
                ? 'bg-blue-800 text-white border-blue-800'
                : 'bg-white text-blue-800 border-gray-300 hover:border-blue-800',
            )}
          >
            {size.label} ({size.size})
          </button>
        ))}
      </div>

      {/* Display selected size image */}
      {selectedSize.image && (
        <div className="relative h-[400px] w-full">
          <Image
            src={selectedSize.image.url}
            alt={selectedSize.image.alt || selectedSize.label}
            fill
            className="object-contain"
          />
        </div>
      )}

      {/* View details button */}
      <div className="mt-6 text-center">
        <button className="bg-blue-800 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
          VIEW DETAILS
        </button>
      </div>
    </div>
  )
}

export default SizeEstimator

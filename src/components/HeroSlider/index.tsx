'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface Banner {
  image: {
    url: string
    alt?: string
  }
  title?: string
  subtitle?: string
}

interface HeroSliderProps {
  banners: Banner[]
  mainTitle: string
  mainSubtitle?: string
  callToAction?: string
  phoneNumber?: string
  qrCode?: {
    url: string
  }
  qrCodeText?: string
  autoScroll?: {
    enabled: boolean
    interval: number
  }
  showDotIndicators?: boolean
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  banners,
  mainTitle,
  mainSubtitle,
  callToAction,
  phoneNumber,
  qrCode,
  qrCodeText,
  autoScroll = { enabled: true, interval: 5000 },
  showDotIndicators = true,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1))
  }, [banners.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1))
  }, [banners.length])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  useEffect(() => {
    if (autoScroll.enabled && banners.length > 1) {
      const interval = setInterval(nextSlide, autoScroll.interval)
      return () => clearInterval(interval)
    }
  }, [autoScroll.enabled, autoScroll.interval, banners.length, nextSlide])

  if (!banners || banners.length === 0) return null

  return (
    <div className="relative h-[600px] overflow-hidden">
      {/* Banners */}
      {banners.map((banner, index) => (
        <div
          key={index}
          className={cn(
            'absolute inset-0 transition-all duration-1000 ease-in-out',
            index === currentSlide
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-105 pointer-events-none',
          )}
        >
          <Image
            src={banner.image.url}
            alt={banner.image.alt || 'Hero Banner'}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-900/40">
            <div className="container mx-auto px-4 h-full flex flex-col justify-center text-white">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  {banner.title || mainTitle}
                </h1>
                {(banner.subtitle || mainSubtitle) && (
                  <p className="text-xl md:text-3xl mb-8 opacity-90">
                    {banner.subtitle || mainSubtitle}
                  </p>
                )}
                <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                  {callToAction && (
                    <div className="text-xl md:text-2xl font-semibold">{callToAction}</div>
                  )}
                  {phoneNumber && (
                    <div className="text-2xl md:text-4xl font-bold bg-orange-500 px-6 py-3 rounded-lg shadow-lg hover:bg-orange-600 transition-colors cursor-pointer">
                      {phoneNumber}
                    </div>
                  )}
                </div>

                {qrCode && (
                  <div className="mt-12 flex items-center bg-white/10 p-4 rounded-lg backdrop-blur-sm max-w-md">
                    <div className="bg-white p-2 rounded-md">
                      <Image src={qrCode.url} alt="QR Code" width={100} height={100} />
                    </div>
                    {qrCodeText && <p className="ml-4 text-lg">{qrCodeText}</p>}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows (for multiple banners) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full z-10 backdrop-blur-sm transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {showDotIndicators && banners.length > 1 && (
        <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-10">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-3 h-3 rounded-full transition-all',
                index === currentSlide
                  ? 'bg-white scale-125 shadow-lg'
                  : 'bg-white/40 hover:bg-white/70',
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default HeroSlider

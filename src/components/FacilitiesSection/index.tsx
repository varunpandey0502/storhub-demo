'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'

interface Location {
  id: string
  name: string
  districts: District[]
}

interface District {
  id: string
  name: string
}

interface StorageFacility {
  id: string
  name: string
  slug: string
  address: string
  district: {
    id: string
    name: string
  }
  contactNumber: string
  images: {
    image: {
      url: string
      alt?: string
    }
  }[]
  nearbyDistricts: string[]
}

interface FacilitiesSectionProps {
  locations: Location[]
  facilities: StorageFacility[]
  title?: string
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({
  locations,
  facilities,
  title = 'Our Facilities',
}) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null)
  const [filteredFacilities, setFilteredFacilities] = useState<StorageFacility[]>([])
  const [availableDistricts, setAvailableDistricts] = useState<District[]>([])

  // Set initial location if available
  useEffect(() => {
    if (locations.length > 0 && !selectedLocation) {
      setSelectedLocation(locations[0].id)
    }
  }, [locations, selectedLocation])

  // Update available districts when location changes
  useEffect(() => {
    if (selectedLocation) {
      const location = locations.find((loc) => loc.id === selectedLocation)
      if (location) {
        setAvailableDistricts(location.districts)
        // Reset district selection when location changes
        setSelectedDistrict(null)
      }
    }
  }, [selectedLocation, locations])

  // Filter facilities based on selected location and district
  useEffect(() => {
    let filtered = [...facilities]

    if (selectedLocation) {
      // Get all district IDs for the selected location
      const locationDistricts = availableDistricts.map((district) => district.id)

      // Filter facilities that belong to the selected location's districts
      filtered = filtered.filter((facility) => locationDistricts.includes(facility.district.id))
    }

    if (selectedDistrict) {
      // Filter by specific district (either direct match or nearby)
      filtered = filtered.filter(
        (facility) =>
          facility.district.id === selectedDistrict ||
          (facility.nearbyDistricts && facility.nearbyDistricts.includes(selectedDistrict)),
      )
    }

    setFilteredFacilities(filtered)
  }, [selectedLocation, selectedDistrict, facilities, availableDistricts])

  const handleLocationChange = (locationId: string) => {
    setSelectedLocation(locationId)
  }

  const handleDistrictChange = (districtId: string) => {
    setSelectedDistrict(districtId)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-blue-800 text-center mb-10">{title}</h2>

        {/* Filters - Simplified UI similar to the image */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-10">
          <div className="space-y-6">
            {/* City Selection */}
            <div>
              <div className="text-lg font-semibold text-gray-700 mb-3">City:</div>
              <div className="flex flex-wrap gap-2">
                {locations.map((location) => (
                  <button
                    key={location.id}
                    onClick={() => handleLocationChange(location.id)}
                    className={cn(
                      'px-4 py-2 rounded-md font-medium transition-colors',
                      selectedLocation === location.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    )}
                  >
                    {location.name}
                  </button>
                ))}
              </div>
            </div>

            {/* District Selection */}
            <div>
              <div className="text-lg font-semibold text-gray-700 mb-3">District:</div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedDistrict(null)}
                  className={cn(
                    'px-4 py-2 rounded-md font-medium transition-colors',
                    selectedDistrict === null
                      ? 'bg-blue-700 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                  )}
                >
                  All
                </button>
                {availableDistricts.map((district) => (
                  <button
                    key={district.id}
                    onClick={() => handleDistrictChange(district.id)}
                    className={cn(
                      'px-4 py-2 rounded-md font-medium transition-colors',
                      selectedDistrict === district.id
                        ? 'bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                    )}
                  >
                    {district.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredFacilities.map((facility) => (
            <div key={facility.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Facility Image */}
              <div className="relative h-48">
                {facility.images && facility.images.length > 0 ? (
                  <Image
                    src={facility.images[0].image.url}
                    alt={facility.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400">No image available</span>
                  </div>
                )}
              </div>

              {/* Facility Info */}
              <div className="p-4">
                <h3 className="text-xl font-bold text-blue-800 mb-2">{facility.name}</h3>

                <div className="flex items-start mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <address className="text-gray-600 not-italic">{facility.address}</address>
                </div>

                <div className="flex items-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${facility.contactNumber}`}
                    className="text-blue-600 hover:underline"
                  >
                    {facility.contactNumber}
                  </a>
                </div>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <span>
                    Close to:{' '}
                    {facility.nearbyDistricts
                      ?.map((districtId) => {
                        const district = availableDistricts.find((d) => d.id === districtId)
                        return district ? district.name : ''
                      })
                      .filter(Boolean)
                      .join(', ')}
                  </span>
                </div>

                <Link
                  href={`/facilities/${facility.slug}`}
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center py-3 rounded-md font-bold transition-colors"
                >
                  BOOK NOW
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500 text-lg">No facilities found for the selected filters.</p>
            <p className="text-gray-500">Please try a different location or district.</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default FacilitiesSection

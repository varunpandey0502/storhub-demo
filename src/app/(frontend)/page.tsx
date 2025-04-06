import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import RichText from '@/components/RichText'
import HeroSlider from '@/components/HeroSlider'
import FacilitiesSection from '@/components/FacilitiesSection'
import QuoteForm from '@/components/QuoteForm'
import SizeEstimator from '@/components/SizeEstimator'

import config from '@/payload.config'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  // Fetch homepage data
  const homePage = await payload.findGlobal({
    slug: 'home-page',
    depth: 3,
  })

  if (!homePage) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl">Please configure your homepage in the admin panel</h1>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Phone Number at Top */}
      {homePage.phoneNumber && (
        <div className="bg-blue-800 text-white py-1">
          <div className="container mx-auto px-4 flex justify-end">
            <div className="rounded-full bg-blue-800 text-white px-4 py-1 text-lg font-bold">
              {homePage.phoneNumber}
            </div>
          </div>
        </div>
      )}

      {/* Header/Navigation */}
      <header className="sticky top-0 z-50 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-end">
          <div className="flex items-center">
            {homePage.logo && typeof homePage.logo !== 'number' && (
              <Image
                src={homePage.logo.url}
                alt="StorHub Logo"
                width={200}
                height={60}
                className="mr-4"
              />
            )}
          </div>

          <div className="flex items-center">
            <nav className="hidden md:flex space-x-6">
              {homePage.navigation?.map((navItem, index) => (
                <Link
                  key={index}
                  href={typeof navItem.link !== 'number' ? navItem.link.url : '#'}
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  {typeof navItem.link !== 'number' ? navItem.link.label : ''}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button className="md:hidden ml-4 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="bg-blue-800 py-2">
          <div className="container mx-auto px-4 flex flex-wrap justify-center md:justify-start gap-2">
            {homePage.quickLinks?.map((quickLink, index) => (
              <Link
                key={index}
                href={typeof quickLink.link !== 'number' ? quickLink.link.url : '#'}
                className={cn(
                  'flex items-center px-4 py-2 rounded-md text-white',
                  index % 3 === 0
                    ? 'bg-blue-700'
                    : index % 3 === 1
                      ? 'bg-orange-500'
                      : 'bg-blue-600',
                )}
              >
                {typeof quickLink.link !== 'number' &&
                  quickLink.link.icon &&
                  typeof quickLink.link.icon !== 'number' && (
                    <Image
                      src={quickLink.link.icon.url}
                      alt={quickLink.link.title || ''}
                      width={24}
                      height={24}
                      className="mr-2"
                    />
                  )}
                <span>{typeof quickLink.link !== 'number' ? quickLink.link.title : ''}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {homePage.hero &&
        typeof homePage.hero !== 'number' &&
        homePage.hero.banners &&
        homePage.hero.banners.length > 0 && (
          <section>
            <HeroSlider
              banners={homePage.hero.banners}
              mainTitle={homePage.hero.title}
              mainSubtitle={homePage.hero.subtitle}
              callToAction={homePage.hero.callToAction}
              phoneNumber={homePage.hero.phoneNumber}
              qrCode={homePage.hero.qrCode}
              qrCodeText={homePage.hero.qrCodeText}
              autoScroll={homePage.hero.autoScroll}
              showDotIndicators={homePage.hero.showDotIndicators}
            />
          </section>
        )}

      {/* Locations */}
      {homePage.locations && homePage.locations.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">Our Locations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {homePage.locations.map((location, index) => (
                <Link
                  key={index}
                  href={typeof location.location !== 'number' ? location.location.url || '#' : '#'}
                  className="group"
                >
                  <div className="relative h-48 overflow-hidden rounded-md">
                    {typeof location.location !== 'number' &&
                      location.location.image &&
                      typeof location.location.image !== 'number' && (
                        <Image
                          src={location.location.image.url}
                          alt={location.location.name || ''}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                      )}
                    <div className="absolute inset-0 bg-blue-900/40 flex items-center justify-center">
                      <h3 className="text-white text-2xl font-bold">
                        {typeof location.location !== 'number' ? location.location.name : ''}
                      </h3>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Us */}
      {homePage.aboutUs && typeof homePage.aboutUs !== 'number' && (
        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {homePage.aboutUs.image && typeof homePage.aboutUs.image !== 'number' && (
                <div className="relative h-[400px]">
                  <Image
                    src={homePage.aboutUs.image.url}
                    alt={homePage.aboutUs.title || ''}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              )}
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">{homePage.aboutUs.title}</h2>
                <div className="prose max-w-none">
                  <RichText content={homePage.aboutUs.content} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Storage Facilities Section */}
      {homePage.featuredFacilities && homePage.featuredFacilities.length > 0 && (
        <FacilitiesSection
          title="Our Facilities"
          locations={
            homePage.locations
              ?.map((loc) => {
                if (typeof loc.location === 'number') return null
                return {
                  id: loc.location.id,
                  name: loc.location.name,
                  districts:
                    loc.location.districts?.map((district: any) => ({
                      id: district.id,
                      name: district.name,
                    })) || [],
                }
              })
              .filter(Boolean) || []
          }
          facilities={homePage.featuredFacilities
            .map((item) => {
              if (typeof item.facility === 'number') return null
              return {
                id: item.facility.id,
                name: item.facility.name,
                slug: item.facility.slug,
                address: item.facility.address,
                district:
                  typeof item.facility.district !== 'number'
                    ? {
                        id: item.facility.district.id,
                        name: item.facility.district.name,
                      }
                    : { id: '', name: '' },
                contactNumber: item.facility.contactNumber || '',
                images:
                  item.facility.images?.map((img: any) => ({
                    image: {
                      url: img.image.url,
                      alt: item.facility.name,
                    },
                  })) || [],
                nearbyDistricts: item.facility.nearbyDistricts || [],
              }
            })
            .filter(Boolean)}
        />
      )}

      {/* Services */}
      {homePage.services && homePage.services.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-blue-800 text-center mb-10">
              {homePage.servicesTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {homePage.services.map((service, index) => (
                <div key={index} className="bg-blue-800 text-white rounded-lg overflow-hidden">
                  {typeof service.service !== 'number' &&
                    service.service.image &&
                    typeof service.service.image !== 'number' && (
                      <div className="relative h-48">
                        <Image
                          src={service.service.image.url}
                          alt={service.service.title || ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">
                      {typeof service.service !== 'number' ? service.service.title : ''}
                    </h3>
                    {typeof service.service !== 'number' &&
                      service.service.features &&
                      service.service.features.length > 0 && (
                        <ul className="space-y-1">
                          {service.service.features.map((feature: any, idx: number) => (
                            <li key={idx}>{feature.feature}</li>
                          ))}
                        </ul>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Size Estimator and Contact Form */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Size Estimator */}
            {homePage.sizeEstimator && typeof homePage.sizeEstimator !== 'number' && (
              <div>
                <SizeEstimator
                  title={homePage.sizeEstimator.title || 'Storage Size Estimator'}
                  sizes={
                    homePage.sizeEstimator.sizes?.map((size) => ({
                      label: size.label,
                      size: size.size,
                      isDefault: size.isDefault,
                      image:
                        typeof size.image !== 'number' && size.image
                          ? {
                              url: size.image.url,
                              alt: size.label,
                            }
                          : undefined,
                    })) || []
                  }
                />
              </div>
            )}

            {/* Quote Form */}
            {homePage.quoteForm && typeof homePage.quoteForm !== 'number' && (
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-6">
                  {homePage.contactFormTitle || 'Get A Quote'}
                </h2>
                <QuoteForm form={homePage.quoteForm} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {homePage.logo && typeof homePage.logo !== 'number' && (
              <Image
                src={homePage.logo.url}
                alt="StorHub Logo"
                width={180}
                height={50}
                className="mb-4 md:mb-0"
              />
            )}

            <div className="flex flex-wrap justify-center gap-6">
              {homePage.navigation?.map((navItem, index) => (
                <Link
                  key={index}
                  href={typeof navItem.link !== 'number' ? navItem.link.url : '#'}
                  className="text-white hover:text-gray-300"
                >
                  {typeof navItem.link !== 'number' ? navItem.link.label : ''}
                </Link>
              ))}
            </div>

            {homePage.phoneNumber && (
              <div className="mt-4 md:mt-0 text-xl font-bold">{homePage.phoneNumber}</div>
            )}
          </div>
          <div className="mt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} StorHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

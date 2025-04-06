import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'navigation-links',
          required: true,
        },
      ],
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'hero',
      type: 'relationship',
      relationTo: 'heroes',
      required: true,
    },
    {
      name: 'quickLinks',
      type: 'array',
      fields: [
        {
          name: 'link',
          type: 'relationship',
          relationTo: 'quick-links',
          required: true,
        },
      ],
    },
    {
      name: 'locations',
      type: 'array',
      fields: [
        {
          name: 'location',
          type: 'relationship',
          relationTo: 'locations',
          required: true,
        },
      ],
    },
    {
      name: 'aboutUs',
      type: 'relationship',
      relationTo: 'about-us',
      required: true,
    },
    {
      name: 'servicesTitle',
      type: 'text',
      defaultValue: 'Our Service',
    },
    {
      name: 'services',
      type: 'array',
      fields: [
        {
          name: 'service',
          type: 'relationship',
          relationTo: 'services',
          required: true,
        },
      ],
    },
    {
      name: 'sizeEstimator',
      type: 'relationship',
      relationTo: 'size-estimators',
    },

    {
      name: 'featuredFacilities',
      type: 'array',
      fields: [
        {
          name: 'facility',
          type: 'relationship',
          relationTo: 'storage-facilities',
          required: true,
        },
      ],
    },
    {
      name: 'quoteForm',
      type: 'relationship',
      relationTo: 'forms',
      admin: {
        description: 'Select the form to use for the "Get a Quote" section',
      },
    },
  ],
}

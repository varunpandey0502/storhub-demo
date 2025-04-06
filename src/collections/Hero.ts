import type { CollectionConfig } from 'payload'

export const Hero: CollectionConfig = {
  slug: 'heroes',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
    },
    {
      name: 'callToAction',
      type: 'text',
    },
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'banners',
      type: 'array',
      required: true,
      admin: {
        description: 'Add multiple banner images for the hero slider',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Optional title specific to this banner (overrides main title)',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Optional subtitle specific to this banner (overrides main subtitle)',
          },
        },
      ],
    },
    {
      name: 'autoScroll',
      type: 'group',
      admin: {
        description: 'Configure auto-scrolling behavior',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          defaultValue: true,
          label: 'Enable auto-scrolling',
        },
        {
          name: 'interval',
          type: 'number',
          defaultValue: 5000,
          admin: {
            description: 'Time in milliseconds between slides (5000 = 5 seconds)',
          },
        },
      ],
    },
    {
      name: 'showDotIndicators',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show dot indicators',
    },
    {
      name: 'qrCode',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'qrCodeText',
      type: 'text',
    },
  ],
}

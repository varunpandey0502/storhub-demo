import type { CollectionConfig } from 'payload'

export const SizeEstimator: CollectionConfig = {
  slug: 'size-estimators',
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
      name: 'sizes',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'size',
          type: 'text',
          required: true,
          admin: {
            description: 'Size in cubic meters (e.g., "0.1-5m³")',
          },
        },
        {
          name: 'isDefault',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}

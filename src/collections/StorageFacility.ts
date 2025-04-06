import type { CollectionConfig } from 'payload'

export const StorageFacility: CollectionConfig = {
  slug: 'storage-facilities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'district', 'address'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'district',
      type: 'relationship',
      relationTo: 'districts',
      required: true,
      hasMany: false,
    },
    {
      name: 'address',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
        },
      ],
    },
    {
      name: 'availableSizes',
      type: 'array',
      fields: [
        {
          name: 'size',
          type: 'text',
          required: true,
        },
        {
          name: 'price',
          type: 'text',
        },
        {
          name: 'available',
          type: 'checkbox',
          defaultValue: true,
        },
      ],
    },
    {
      name: 'contactNumber',
      type: 'text',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'openingHours',
      type: 'text',
    },
    {
      name: 'mapLocation',
      type: 'group',
      fields: [
        {
          name: 'latitude',
          type: 'text',
        },
        {
          name: 'longitude',
          type: 'text',
        },
      ],
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'nearbyDistricts',
      type: 'relationship',
      relationTo: 'districts',
      hasMany: true,
      admin: {
        description: 'Select districts that are close to this facility',
      },
    },
  ],
}

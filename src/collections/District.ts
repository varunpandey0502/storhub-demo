import type { CollectionConfig } from 'payload'

export const District: CollectionConfig = {
  slug: 'districts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'city'],
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
      name: 'city',
      type: 'relationship',
      relationTo: 'locations',
      required: true,
      hasMany: false,
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
  ],
}

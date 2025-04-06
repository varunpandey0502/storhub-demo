import type { CollectionConfig } from 'payload'

export const AboutUs: CollectionConfig = {
  slug: 'about-us',
  labels: {
    singular: 'About Us',
    plural: 'About Us',
  },
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
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}

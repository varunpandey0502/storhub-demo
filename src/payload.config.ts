// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'

import { s3Storage } from '@payloadcms/storage-s3'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Hero } from './collections/Hero'
import { Location } from './collections/Location'
import { AboutUs } from './collections/AboutUs'
import { Service } from './collections/Service'
import { SizeEstimator } from './collections/SizeEstimator'
import { NavigationLink } from './collections/NavigationLink'
import { QuickLink } from './collections/QuickLink'
import { HomePage } from './globals/HomePage'
import { District } from './collections/District'
import { StorageFacility } from './collections/StorageFacility'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '- StorHub Admin',
    },
  },
  collections: [
    Users,
    Media,
    Hero,
    Location,
    District,
    StorageFacility,
    AboutUs,
    Service,
    SizeEstimator,
    NavigationLink,
    QuickLink,
  ],
  globals: [HomePage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(dirname, 'generated-schema.graphql'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
      },
      bucket: process.env.S3_BUCKET || '',
    }),
    formBuilderPlugin({
      fields: {
        text: true,
        textarea: true,
        select: true,
        email: true,
        state: false, // Not needed for international use
        country: true,
        checkbox: true,
        number: true,
        message: true,
        payment: false, // Enable if you need payment processing
      },
      formOverrides: {
        admin: {
          description: 'Create and manage forms for your website',
          group: 'Content',
        },
      },
      formSubmissionOverrides: {
        admin: {
          description: 'View form submissions',
          group: 'Content',
        },
      },
    }),
  ],
})

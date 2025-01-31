// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'

import { s3Storage } from '@payloadcms/storage-s3'
import brevoAdapter from './utils/brevoAdapter'
import { Customers } from './collections/Customers'
import { Members } from '@/collections/Members'
import { Memberships } from '@/collections/Memberships'
import { Events } from '@/collections/Events'
import sendInvitationEmail from '@/app/(app)/(authenticated)/member/memberships/actions/sendInvitationEmail'
import Invitations from '@/collections/Invitations'
import { adminAuthPlugin } from 'payload-auth-plugin'
import { GoogleAuthProvider } from 'payload-auth-plugin/providers'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  email: brevoAdapter(),
  collections: [Users, Media, Customers, Members, Memberships, Invitations, Events],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  serverURL: process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI,
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET_NAME || '',
      config: {
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY || '',
          secretAccessKey: process.env.S3_SECRET_KEY || '',
        },
      },
    }),

    adminAuthPlugin({
      providers: [
        {
          name: 'zoom',
          client_id: process.env.ZOOM_CLIENT_ID,
          client_secret: process.env.ZOOM_CLIENT_SECRET,
          authorizationURL: 'https://zoom.us/oauth/authorize',
          serverURL: 'https://zoom.us/oauth/authorize',
          tokenURL: 'https://zoom.us/oauth/token',
          userInfoURL: 'https://api.zoom.us/v2/users/me',
          scope: 'user:read',
          mapUser: (user) => ({
            email: user.email,
            name: user.first_name + ' ' + user.last_name,
          }),
        }],
    }),
  ],
  endpoints: [
    {
      path: '/api/send-invitation',
      method: 'post',
      handler: sendInvitationEmail,
    },
  ],
})

import type { CollectionConfig } from 'payload'

export const Customers: CollectionConfig = {
  slug: 'customers',
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: () => true,
  },
  auth: true,
  fields: [
    {
      name: 'associatedMember',
      type: 'relationship',
      relationTo: 'members', // References the "members" collection
      required: true, // Ensure every customer is associated with a member
    },
    {
      name: 'invitation',
      type: 'relationship',
      relationTo: 'invitations',
      required: true,
    },
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Generate a unique token
          const crypto = await import('crypto')
          data.password = crypto.randomBytes(8).toString('hex')
          data.firstName = crypto.randomBytes(8).toString('hex')
          data.lastName = crypto.randomBytes(8).toString('hex')
        }
      },
    ],
  },
}
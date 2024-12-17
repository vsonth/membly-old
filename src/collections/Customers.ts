import type { CollectionConfig } from 'payload';

export const Customers: CollectionConfig = {
  slug: "customers",
  admin: {
    useAsTitle: "email",
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
      name: 'invitedBy',
      type: 'relationship',
      relationTo: 'members',
      required: true, // Not required since some customers may not be invited
    }
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Generate a unique token
          const crypto = await import('crypto')
          data.password = crypto.randomBytes(8).toString('hex')
        }
      },
    ],
  }
}
import type { CollectionConfig } from 'payload'

export const Memberships: CollectionConfig = {
  slug: 'memberships',
  admin: {
    useAsTitle: 'planName',
  },
  labels: {
    singular: 'Plan',
    plural: 'Plans',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'planName',
      type: 'text',
      required: true,
    },
    {
      name: 'cost',
      type: 'number',
      required: true,
    },
    {
      name: 'numberOfSessions',
      type: 'number',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'memberId',
      type: 'relationship',
      relationTo: 'members',
      required: true,
    },
  ],
}
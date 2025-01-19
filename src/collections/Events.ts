import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    create: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'start',
      type: 'date',
      required: true,
    },
    {
      name: 'end',
      type: 'date',
      required: true,
    },
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members', // References the "members" collection
      required: true,
    },
    {
      name: 'ruleString',
      type: 'text',
      required: false,
    },
  ],
}

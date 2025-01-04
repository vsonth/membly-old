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
      name: 'startStr',
      type: 'date',
      required: true,
    },
    {
      name: 'endStr',
      type: 'date',
      required: true,
    },
  ],
}
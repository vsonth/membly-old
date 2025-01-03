import type { CollectionConfig } from 'payload'

type EventsConfig = {
  admin: { useAsTitle: string };
  fields: ({
    name: string;
    type: string;
    required: boolean
  } | { name: string; type: string } | {
    defaultValue: boolean;
    name: string;
    type: string
  })[];
  slug: string
}
export const Events: EventsConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'start',
      type: 'datetime',
      required: true,
    },
    {
      name: 'end',
      type: 'datetime',
      required: true,
    },
    {
      name: 'startStr',
      type: 'text',
    },
    {
      name: 'endStr',
      type: 'text',
    },
    {
      name: 'allDay',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
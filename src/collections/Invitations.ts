import type { CollectionConfig } from 'payload';

const Invitations: CollectionConfig = {
  slug: 'invitations',
  labels: {
    singular: 'Invitation',
    plural: 'Invitations',
  },
  admin: {
    useAsTitle: 'customerEmail',
  },
  fields: [
    {
      name: 'member',
      type: 'relationship',
      relationTo: 'members', // Links the invitation to the inviting member
      required: true,
    },
    {
      name: 'customerEmail',
      type: 'email',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Expired', value: 'expired' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'invitationToken',
      type: 'text',
      unique: true,
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
      defaultValue: () => {
        const date = new Date();
        date.setDate(date.getDate() + 7); // Default expiration: 7 days from now
        return date.toISOString();
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Generate a unique token
          const crypto = await import('crypto');
          data.invitationToken = crypto.randomBytes(32).toString('hex');
        }
      },
    ],
  },
};

export default Invitations;

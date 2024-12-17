import type { CollectionConfig } from 'payload'
import payload from 'payload'

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
        const date = new Date()
        date.setDate(date.getDate() + 7) // Default expiration: 7 days from now
        return date.toISOString()
      },
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data, operation }) => {
        if (operation === 'create') {
          // Generate a unique token
          const crypto = await import('crypto')
          data.invitationToken = crypto.randomBytes(32).toString('hex')
        }
      },
    ],
    afterChange: [
      async ({ doc, operation }) => {
        if (operation === 'create') {
          try {
            // Example: Send an email notification, log a message, or trigger an external API
            console.log('Document created successfully:', doc)
            const invitationToken = doc.invitationToken
            const customerEmail = doc.customerEmail;
            const name = doc.member.id;
            // Example of triggering an external service:
            const invitationLink = `localhost:3001/invite/${invitationToken}`
            console.log(invitationLink)
            console.log(doc)
            console.log(payload)
            await payload.sendEmail({
              to: customerEmail,
              subject: 'You’ve been invited to join!',
              html: `<p>${name} has invited you to join. Click <a href='${invitationLink}'>here</a> to accept.</p>`,
            })

            console.log('Post-creation action completed successfully.')
          } catch (error) {
            console.error('Error in post-creation action:', error)
          }
        }
      },
    ],

  },
}

export default Invitations

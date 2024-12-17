import payload from 'payload';
import { getUser } from '@/app/(app)/(authenticated)/actions/getUser'

const sendInvitationEmail = async ({ customerEmail }) => {
  const { id } = await getUser()

  // Check that the member exists
  const member = await payload.findByID({
    collection: 'members',
    id: id,
  });

  if (!member) {
    return res.status(404).json({ message: 'Member not found' });
  }

  // Create the invitation
  const invitation = await payload.create({
    collection: 'invitations',
    data: {
      member: memberId,
      customerEmail,
    },
  });

  // Send the invitation email
  const invitationLink = `https://your-frontend.com/invite/${invitation.invitationToken}`;
  await payload.sendEmail({
    to: customerEmail,
    subject: 'You’ve been invited to join!',
    html: `<p>${member.name} has invited you to join. Click <a href="${invitationLink}">here</a> to accept.</p>`,
  });

  res.status(200).json({ message: 'Invitation sent successfully' });
};

export default sendInvitationEmail;

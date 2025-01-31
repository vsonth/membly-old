import { Button } from '@headlessui/react';

const ZoomAuthButton = () => {
  const handleAuthRedirect = () => {
    const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_ZOOM_REDIRECT_URI)}`;

    window.location.href = authUrl;
  };

  return (
    <Button onClick={handleAuthRedirect} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
      Connect Zoom Account
    </Button>
  );
};

export default ZoomAuthButton;

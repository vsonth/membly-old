export const getZoomAuthUrl = () => {
  console.log(process.env.ZOOM_CLIENT_ID)
  const authUrl = `https://zoom.us/oauth/authorize?response_type=code&client_id=${process.env.ZOOM_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL)}`;
  return authUrl;
};

import React, { useState, useEffect } from 'react';
import { FacebookShareButton, FacebookIcon } from 'react-share';

const FaceBookShareButton = () => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  return (
    <FacebookShareButton url={currentUrl}>
      <FacebookIcon round size={40} style={{ marginLeft: '10px' }} />
    </FacebookShareButton>
  );
};

export { FaceBookShareButton };

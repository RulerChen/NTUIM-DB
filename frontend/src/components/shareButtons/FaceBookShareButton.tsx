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
      <FacebookIcon round size={48} />
    </FacebookShareButton>
  );
};

export { FaceBookShareButton };

import React, { useEffect, useRef, useState } from 'react';

export default function AvatarBuilder() {
  const iframeRef = useRef(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    const receiveMessage = (event) => {
      if (event.origin !== 'https://demo.readyplayer.me') return;
      const data = event.data;
      if (data?.source === 'readyplayerme' && data?.eventName === 'v1.avatar.exported') {
        setAvatarUrl(data.data.url);
      }
    };

    window.addEventListener('message', receiveMessage);
    return () => window.removeEventListener('message', receiveMessage);
  }, []);

  const openAvatarCreator = () => {
    iframeRef.current.style.display = 'block';
    iframeRef.current.src = 'https://demo.readyplayer.me/avatar?frameApi';
  };

  return (
    <div className="min-h-screen text-center p-6" style={{ backgroundColor: '#e0f7ff' }}>
      <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#0284c7' }}>MAD 3D Avatar Builder</h1>

      {!avatarUrl && (
        <>
          <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>Click below to start customizing your 3D avatar.</p>
          <button onClick={openAvatarCreator} style={{ backgroundColor: '#0284c7', color: 'white', padding: '0.75rem 2rem', borderRadius: '8px', fontSize: '1rem' }}>
            Launch Avatar Creator
          </button>
        </>
      )}

      {avatarUrl && (
        <>
          <h2 style={{ fontSize: '1.5rem', marginTop: '2rem', color: '#0369a1' }}>Your Avatar</h2>
          <model-viewer
            src={avatarUrl}
            alt="Your Avatar"
            auto-rotate
            camera-controls
            style={{ width: '100%', height: '600px', marginTop: '1rem' }}
            exposure="0.9"
            environment-image="neutral"
          ></model-viewer>
        </>
      )}

      <iframe
        ref={iframeRef}
        title="Ready Player Me"
        style={{ display: 'none', width: '100%', height: '700px', border: 'none', marginTop: '20px' }}
        allow="camera *; microphone *"
      ></iframe>
    </div>
  );
}

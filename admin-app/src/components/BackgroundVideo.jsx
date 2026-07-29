import React from 'react';

export default function BackgroundVideo() {
  return (
    <>
      <video
        autoPlay
        loop
        muted
        playsInline
        className="app-background-video"
      >
        <source src="/Hero page.mp4" type="video/mp4" />
      </video>
      <div className="app-background-overlay" />
    </>
  );
}

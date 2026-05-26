import React, { useEffect, useRef } from 'react';

interface AdSenseProps {
  client: string;
  slot?: string;
  format?: string;
  responsive?: string;
  style?: React.CSSProperties;
  className?: string;
}

const AdSense: React.FC<AdSenseProps> = ({ 
  client, 
  slot, 
  format = 'auto', 
  responsive = 'true',
  style = { display: 'block' },
  className = ""
}) => {
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    try {
      // Check if the ad is already rendered to avoid double push errors in React StrictMode
      if (insRef.current && !insRef.current.hasAttribute('data-adsbygoogle-status')) {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e: any) {
      // Suppress normal AdSense behaviors that throw errors as these do not break the app
      const msg = e.message || '';
      if (!msg.includes('already have ads') && !msg.includes('No slot size')) {
        console.error('AdSense error:', e);
      }
    }
  }, []);

  // If no slot is provided, we can't render a specific ad unit.
  // However, if the user just wants "Auto Ads", the script in index.html is enough.
  // This component is for manual ad units.
  if (!slot) return null;

  return (
    <div className={`ad-container my-12 flex justify-center overflow-hidden ${className}`}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdSense;

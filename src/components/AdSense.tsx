import React, { useEffect } from 'react';

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
  useEffect(() => {
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  // If no slot is provided, we can't render a specific ad unit.
  // However, if the user just wants "Auto Ads", the script in index.html is enough.
  // This component is for manual ad units.
  if (!slot) return null;

  return (
    <div className={`ad-container my-12 flex justify-center overflow-hidden ${className}`}>
      <ins
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

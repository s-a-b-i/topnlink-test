import React from 'react';

// Import images
import featured1 from '../../assets/featured-1.png';
import featured2 from '../../assets/featured-2.png';
import featured3 from '../../assets/featured-3.png';
import featured4 from '../../assets/featured-4.png';
import featured5 from '../../assets/featured-5.png';
import featured6 from '../../assets/featured-6.png';

const LogosSection = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-x-6 flex-nowrap overflow-hidden">
          <img
            src={featured1}
            alt="Zendesk"
            className="w-auto h-12 object-contain"
          />
          <img
            src={featured2}
            alt="Hubstaff"
            className="w-auto h-12 object-contain"
          />
          <img
            src={featured3}
            alt="Slack"
            className="w-auto h-12 object-contain"
          />
          <img
            src={featured4}
            alt="Intercom"
            className="w-auto h-12 object-contain"
          />
          <img
            src={featured5}
            alt="HubSpot"
            className="w-auto h-12 object-contain"
          />
          <img
            src={featured6}
            alt="Docker"
            className="w-auto h-12 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default LogosSection;

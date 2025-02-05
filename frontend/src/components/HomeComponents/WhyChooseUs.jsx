import React from 'react';
import WhiteLabelAssurance from '../../assets/White-Label-Assurance.png';
import ComprehensiveResearch from '../../assets/Comprehensive-Research.png';
import EffectiveClustering from '../../assets/Effective-Clustering.png';
import CostEffectiveSolutions from '../../assets/Cost-Effective-Solutions.png';

const WhyChooseUs = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-900 text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-blue-400 w-full">
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              <img
                src={WhiteLabelAssurance}
                alt="Extensive Network Access"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Extensive Network Access
              </h3>
              <p className="text-sm text-gray-600">
              iCopify's guest posting marketplace provides access to a vast network of blogs and websites across numerous industries. This diverse selection allows users to target specific audiences effectively, maximizing the reach and impact of their content.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-blue-400 w-full">
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              <img
                src={ComprehensiveResearch}
                alt="Quality Assurance Standards"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Quality Assurance Standards
              </h3>
              <p className="text-sm text-gray-600">
              iCopify maintains stringent editorial standards to ensure the guest post's quality. Through vetting processes and adherence to industry best practices, users can trust that their content will be published on reputable platforms, enhancing their brand credibility and authority.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-blue-400 w-full">
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              <img
                src={EffectiveClustering}
                alt="Seamless Collaboration Tools"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Seamless Collaboration Tools
              </h3>
              <p className="text-sm text-gray-600">
              The platform offers intuitive collaboration tools that facilitates smooth communication between Advertisers(Buyers) and publishers. From negotiating terms to submitting content and tracking progress, Icopify streamlines the guest posting process, fostering efficient and productive partnerships.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border-2 border-blue-400 w-full">
            <div className="h-48 bg-blue-100 flex items-center justify-center">
              <img
                src={CostEffectiveSolutions}
                alt="Cost-Effective Solutions"
                className="h-32 w-32 object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-blue-600 mb-3">
                Cost-Effective Solutions
              </h3>
              <p className="text-sm text-gray-600">
              iCopify offers competitive pricing options, making guest posting accessible to businesses of all sizes. Whether operating on a limited budget or seeking to maximize ROI, users can find cost-effective solutions that align with their financial goals while still reaping the benefits of guest posting.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;

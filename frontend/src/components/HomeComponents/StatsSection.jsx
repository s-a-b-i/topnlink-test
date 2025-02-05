// src/components/StatsSection.js
import React from 'react';
import CountUp from 'react-countup';

const StatsSection = () => {
  return (
    <section className="py-10 bg-gray-800 text-center">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-16">
        <div>
          <h2 className="text-3xl font-bold text-white-500">
            <CountUp start={0} end={48575} duration={2.5} separator="," />+
          </h2>
          <p className="text-gray-300">Registered Websites</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white-500">
            <CountUp start={0} end={30185} duration={2.5} separator="," />+
          </h2>
          <p className="text-gray-300">Publishers & Writers</p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-white-500">
            <CountUp start={0} end={269077} duration={2.5} separator="," />+
          </h2>
          <p className="text-gray-300">Tasks Completed</p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
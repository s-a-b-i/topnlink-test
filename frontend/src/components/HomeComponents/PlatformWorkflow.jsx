import React from 'react';

const PlatformWorkflow = () => {
  const steps = [
    {
      id: 1,
      title: "Buyer Registration and Account Setup",
      description:
        "Prospective buyers start their journey on the iCopify guest posting marketplace by registering an account. They can sign up using their email address or social media accounts like Facebook or Gmail. Once registered, they receive a confirmation email and are ready to begin accessing thousands of quality sites for guest posting.",
    },
    {
      id: 2,
      title: "Publisher Search and Task Assignment",
      description:
        "Buyers navigate through the platform's inventory to search for suitable publishers to collaborate with. They can utilize various filters to refine their search based on metrics like domain authority, domain rating, and organic traffic. After identifying preferred publishers, buyers can send direct tasks to initiate collaboration.",
    },
    {
      id: 3,
      title: "Task Creation and Submission",
      description:
        "Buyers proceed to create tasks for the selected publishers, specifying their requirements and providing URLs for promotion. They have the option to choose between Content Placement, Content Creation & Placement, and Link Insertions. Tasks are submitted immediately for publisher review.",
    },
    {
      id: 4,
      title: "Task Progress Monitoring and Communication",
      description:
        "Buyers utilize the MY ORDERS section to track the progress of their tasks and communicate directly with publishers regarding any task-related queries. Buyers can explore features like Open Offer to receive suggestions from publishers who are open to collaboration.",
    },
  ];

  return (
    <div className="bg-gray-50 py-12 px-6">
      <h2 className="text-5xl font-bold text-center mb-8 text-blue-900">
        How Our Platform Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {steps.map((step) => (
          <div
            key={step.id}
            className="bg-white shadow-md rounded-lg p-6 border border-blue-600 max-w-sm mx-auto"
          >
            <div className="flex items-start mb-4">
              {/* Circle with number */}
              <div className="bg-blue-900 text-yellow-300 w-8 h-8 rounded-full flex-shrink-0 flex justify-center items-center font-bold text-lg">
                {step.id}
              </div>
              {/* Title */}
              <h3 className="ml-4 text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
            </div>
            {/* Description */}
            <p className="text-gray-600 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformWorkflow;
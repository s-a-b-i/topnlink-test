import React from "react";
import profileImage from "../../assets/user-profile.png";
import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome for icons

const testimonials = [
  {
    name: "Gary G.",
    text: "Being a startup company, we were very pleased with the performance and ranking results delivered through iCopify platform. We were able to achieve quality backlinks & branded guest blogs on our website in a relatively short period of time. The team has been very responsive in addressing any type of query.",
    rating: 5,
    image: profileImage,
  },
  {
    name: "David R.",
    text: "The work of an SEO manager is an ongoing process with lots of ups & downs. But, since I have been associated with iCopify, my SEO procedures have become very seamless. Getting sponsored articles along with the highest level of transparency and professionalism has been the biggest benefit.",
    rating: 5,
    image: profileImage,
  },
  {
    name: "Michaela W.",
    text: "Being a marketeer, I understand the importance of content marketing strategy and getting relevant content placed on the website. I have had a great experience working with iCopify as it helped me connect with professionals who could provide me cost-effective & top-notch content.",
    rating: 5,
    image: profileImage,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Here's What Our Clients Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 text-center transition-transform transform hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex justify-center items-center mb-3">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile`}
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-md text-gray-800">
                {testimonial.name}
              </h3>
              <p className="text-gray-600 text-sm mt-2">{testimonial.text}</p>
              <div className="flex justify-center mt-3">
                {Array.from({ length: testimonial.rating }, (_, i) => (
                  <i key={i} className="fas fa-star text-yellow-500 mx-1"></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

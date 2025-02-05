import React from "react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // All Categories data
  const allCategories = [
    "Agriculture",
    "Animals and Pets",
    "Art",
    "Automobiles",
    "Business",
    "Books",
    "Beauty",
    "Career and Employment",
    "Computers",
    "Construction and Repairs",
    "Culture",
    "E-commerce",
    "Education",
    "Entertainment",
    "Environment",
    "Equipment",
    "Fashion",
    "Finance",
    "Food",
    "For Kids",
    "For Men",
    "For Women",
    "Gadgets",
    "Games",
    "General",
    "Hardware development",
    "Health",
    "Home and Family",
    "Humor",
    "Internet",
    "Law",
    "Leisure and Hobbies",
    "Lifestyle",
    "Literature",
    "Manufacturing",
    "Marketing",
    "Miscellaneous",
    "Mobile",
    "Movies",
    "Music",
    "Nature",
    "News and Media",
    "Personal Blogs",
    "Photography",
    "Places",
    "Politics",
    "Programming",
    "Public Service",
    "Real Estate",
    "Science",
    "Shopping",
    "Society",
    "Software development",
    "Sports",
    "Startups",
    "Technology",
    "Travelling",
    "Transport",
  ];

  // Split the categories into 5 columns
  const columns = [[], [], [], [], []];
  allCategories.forEach((item, index) => {
    columns[index % 5].push(item);
  });

  return (
    <footer className="bg-gray-900 text-white py-10 relative">
      {/* Scroll-to-Top Arrow */}
      <div
        onClick={scrollToTop}
        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-8 h-8 text-gray-400 hover:text-white"
        >
          <path d="M12 4l6 6H6z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Footer Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
          {/* Left Side: 5 Columns for All Categories */}
          <div className="col-span-1 lg:col-span-5">
            <h3 className="text-blue-400 font-bold text-base mb-4">ALL CATEGORIES</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {/* Dynamically generate columns */}
              {columns.map((column, colIndex) => (
                <div key={colIndex} className="space-y-2">
                  {column.map((item) => (
                    <span key={item} className="text-gray-300 text-xs block">
                      {item}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Useful Links and Contact Info in One Column */}
          <div className="col-span-1">
            {/* Useful Links */}
            <div className="mb-8">
              <h3 className="text-blue-400 font-bold text-base mb-4">USEFUL LINKS</h3>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>Link Building</li>
                <li>Content Writing</li>
                <li>FAQs</li>
                <li>Privacy Policy</li>
                <li>Terms And Conditions</li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-blue-400 font-bold text-base mb-4">CONTACT INFO</h3>
              <ul className="text-xs text-gray-300 space-y-2">
                <li>
                  <span className="font-semibold">Address:</span> Office 304, 58 Breckfield Road
                  South, Liverpool, L6 5DR, England
                </li>
                <li>
                  <span className="font-semibold">Phone:</span> +44 (0)151 203 9866
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-left text-gray-400 text-xs">
          &copy; 2025 ICOPIFY. All Rights Reserved. UK Company: 12507502
        </div>
      </div>
    </footer>
  );
};

export default Footer;
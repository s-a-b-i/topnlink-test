// import React, { useEffect } from "react";
// import { useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Loader } from "lucide-react";
// import { useAuthStore } from "../store/authStore";
// import toast from "react-hot-toast";

// const EmailVerificationPage = () => {
//   const [code, setCode] = useState(["", "", "", "", "", ""]);
//   const inputRefs = useRef([]);
//   const navigate = useNavigate();

//   const { verifyEmail, error, isLoading } = useAuthStore();

//   const handleChange = (index, value) => {
//     const newCode = [...code];

//     // Handle pasted value
//     if (value.length > 1) {
//       const pastedValue = value.slice(0, 6).split("");
//       for (let i = 0; i < 6; i++) {
//         newCode[i] = pastedValue[i] || "";
//       }
//       setCode(newCode);

//       // Focus on the last non-empty input or the first empty one 
//       const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
//       const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
//       inputRefs.current[focusIndex].focus();
//     } else {
//       newCode[index] = value;
//       setCode(newCode);

//       // Check if all inputs are filled
//       if (value && index < 5) {
//         inputRefs.current[index + 1].focus();
//       }
//     }
//   };

//   const handleKeyDown = (e, index) => {
//     if (e.key === "Backspace" && !code[index] && index > 0) {
//       inputRefs.current[index - 1].focus();
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const verificationCode = code.join("");
//     try {
//       await verifyEmail(verificationCode);
//       navigate("/");
//       toast.success("Email verified successfully");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     if (code.every((digit) => digit !== "")) {
//       handleSubmit(new Event("submit"));
//     }
//   }, [code]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//     >
//       <div className="p-8">
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-foundations-primary to-foundations-secondary text-transparent bg-clip-text">
//           Welcome Back
//         </h2>

//         <p className="text-center text-foundations-light mb-6">
//           Please enter the 6-digit code sent to your email
//         </p>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="flex justify-between">
//             {code.map((digit, index) => (
//               <input
//                 key={index}
//                 ref={(el) => (inputRefs.current[index] = el)}
//                 type="text"
//                 maxLength={1}
//                 value={digit}
//                 onChange={(e) => handleChange(index, e.target.value)}
//                 onKeyDown={(e) => handleKeyDown(e, index)}
//                 className="w-12 h-12 text-center text-2xl font-bold bg-foundations-dark text-white border-2 border-foundations-dark bg-opacity-50 rounded-lg focus:border-foundations-primary focus:outline-none"
//               />
//             ))}
//           </div>

//           {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

//           <motion.button
//             className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             type="submit"
//             disabled={isLoading || code.some((digit) => !digit)}
//           >
//             {isLoading ? (
//               <Loader className="w-6 h-6 animate-spin mx-auto" />
//             ) : (
//               "Verify Email"
//             )}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default EmailVerificationPage;


import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import Logo from "../assets/Logo.svg";
import Typing from "../assets/Typing.webp";

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, error, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted value
    if (value.length > 1) {
      const pastedValue = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedValue[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one 
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Check if all inputs are filled
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      await verifyEmail(verificationCode);
      navigate("/");
      toast.success("Email verified successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <img src={Logo} alt="Logo" className="h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-6">Email Verification</h2>

            <p className="text-center text-foundations-light mb-6">
              Please enter the 6-digit code sent to your email
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="w-12 h-12 text-center text-2xl font-bold bg-foundations-dark text-white border-2 border-foundations-dark bg-opacity-50 rounded-lg focus:border-foundations-primary focus:outline-none"
                  />
                ))}
              </div>

              {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || code.some((digit) => !digit)}
              >
                {isLoading ? (
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Verify Email"
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-orange-50 relative">
        <img
          src={Typing}
          alt="Email Verification"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <div className="text-4xl font-bold mb-4">
            VERIFY YOUR EMAIL IN SECONDS.
          </div>
          <div className="text-3xl font-bold">
            ACCESS YOUR ACCOUNT NOW!
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;

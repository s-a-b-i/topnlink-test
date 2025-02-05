
// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import Inputs from "../components/Inputs";
// import { Mail, User, Lock, Loader } from "lucide-react";
// import { useNavigate, Link } from "react-router-dom";
// import PasswordStrength from "../components/PasswordStrenght";
// import { useAuthStore } from "../store/authStore";
// import Logo from '../assets/Logo.svg';
// import Typing from '../assets/Typing.webp';

// const SignUpPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { signUp, isLoading, error } = useAuthStore();

//   const handleSignUp = async (e) => {
//     e.preventDefault();

//     try {
//       await signUp(name, email, password);
//       navigate("/verify-email");
//     } catch (error) {
//       console.log(error);
//       // The error handling is already done in the signUp function of the authStore
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Side - Form */}
//       <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
//         <div className="max-w-md w-full">
//           <div className="p-8">
//             <div className="flex items-center mb-8">
//               <img src={Logo} alt="Rankister" className="h-8" />
//             </div>

//             <h2 className="text-2xl font-bold mb-6">Create your account</h2>

//             <form onSubmit={handleSignUp} className="space-y-6">
//               <Inputs
//                 icon={User}
//                 type="text"
//                 placeholder="Full Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//               <Inputs
//                 icon={Mail}
//                 type="email"
//                 placeholder="Email Address"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <Inputs
//                 icon={Lock}
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />

//               {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

//               <PasswordStrength password={password} />

//               <motion.button
//                 className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <Loader className="animate-spin mx-auto size-6" />
//                 ) : (
//                   "Sign Up"
//                 )}
//               </motion.button>
//             </form>
//           </div>

//           <div className="bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl px-8 py-4 flex justify-center">
//             <p className="text-foundations-light">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="text-foundations-primary hover:text-foundations-hover transition duration-200"
//               >
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image */}
//       <div className="hidden md:block md:w-1/2 bg-orange-50 relative">
//         <img 
//           src={Typing} 
//           alt="Typing" 
//           className="w-full h-full object-cover" 
//         />
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
//           <div className="text-4xl font-bold mb-4">
//             REGISTRATI IN POCHI ISTANTI.
//           </div>
//           <div className="text-3xl font-bold">
//             INIZIA SUBITO AD USARE IL MARKETPLACE!
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import Inputs from "../components/Inputs";
import { Mail, User, Lock, Loader } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrenght";
import { useAuthStore } from "../store/authStore";
import Logo from '../assets/Logo.svg';
import Typing from '../assets/Typing.webp';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  const { signUp, isLoading, error } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Ensure captcha is verified
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }

    try {
      await signUp(name, email, password, captchaToken);
      navigate("/verify-email");
      
      // Reset captcha after successful signup
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    } catch (error) {
      console.log(error);
      
      // Reset captcha after failed signup
      recaptchaRef.current.reset();
      setCaptchaToken(null);
    }
  };

  const handleCaptchaChange = (token) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <img src={Logo} alt="Rankister" className="h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-6">Create your account</h2>

            <form onSubmit={handleSignUp} className="space-y-6">
              <Inputs
                icon={User}
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Inputs
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Inputs
                icon={Lock}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}

              <PasswordStrength password={password} />

              {/* ReCAPTCHA Component */}
              <div className="mt-4">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  onChange={handleCaptchaChange}
                />
              </div>

              <motion.button
                className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader className="animate-spin mx-auto size-6" />
                ) : (
                  "Sign Up"
                )}
              </motion.button>
            </form>
          </div>

          <div className="bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl px-8 py-4 flex justify-center">
            <p className="text-foundations-light">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-foundations-primary hover:text-foundations-hover transition duration-200"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-orange-50 relative">
        <img 
          src={Typing} 
          alt="Typing" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <div className="text-4xl font-bold mb-4">
            REGISTRATI IN POCHI ISTANTI.
          </div>
          <div className="text-3xl font-bold">
            INIZIA SUBITO AD USARE IL MARKETPLACE!
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
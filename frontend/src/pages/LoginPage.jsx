import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader } from 'lucide-react';
import ReCAPTCHA from "react-google-recaptcha";
import Inputs from '../components/Inputs';
import { Link } from 'react-router-dom'; 
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';
import Logo from '../assets/Logo.svg';
import Typing from '../assets/Typing.webp';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const navigate = useNavigate();
  
  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!captchaToken) {
      toast.error("Please complete the captcha");
      return;
    }
  
    try {
      const response = await login(email, password, captchaToken);
  
      // Reset captcha after login attempt
      recaptchaRef.current.reset();
      setCaptchaToken(null);
      
    } catch (error) {
      console.log(error);
  
      recaptchaRef.current.reset();
      setCaptchaToken(null);
  
      if (error.response && error.response.data.msg === "Please verify your email to login") {
        navigate('/verify-email', { state: { email } });
      }
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

            <h2 className="text-2xl font-bold mb-6">Sign in to your account</h2>

            {/* Display error message in center if exists */}
            {error && (
              <div className="text-center my-4 p-4 bg-red-100 text-red-600 rounded-lg">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <Inputs
                icon={Mail}
                type="email"
                placeholder="Email"
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
              <div className="flex items-center justify-between">
                <Link to="/forgot-password" className="text-sm text-foundations-primary hover:underline">
                  Forgot Password?
                </Link>
              </div>

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
                  <Loader className="w-6 h-6 animate-spin mx-auto" />
                ) : (
                  "Login"
                )}
              </motion.button>
            </form>
          </div>

          <div className="bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl px-8 py-4 flex justify-center">
             <p className="text-foundations-light">
               Don't have an account?{" "}
               <Link
                 to="/signup"
                 className="text-foundations-primary hover:text-foundations-hover transition duration-200"
               >
                 Sign Up
               </Link>
             </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-orange-50 relative">
        <img 
          src={Typing} 
          alt="Keyboard" 
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
}

export default LoginPage;

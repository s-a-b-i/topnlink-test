// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useAuthStore } from "../store/authStore";
// import { useNavigate, useParams } from "react-router-dom";
// import Input from "../components/Inputs";
// import { Lock } from "lucide-react";
// import toast from "react-hot-toast";

// const ResetPasswordPage = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const { resetPassword, error, isLoading, message } = useAuthStore();

//   const { token } = useParams();
//   const navigate = useNavigate();

//   // Log when component mounts or token changes
//   useEffect(() => {
//     console.log("ResetPasswordPage loaded");
//     console.log("Token from URL:", token);
//   }, [token]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log("Attempting password reset...");
//     console.log("Password:", password);
//     console.log("Confirm Password:", confirmPassword);

//     if (password !== confirmPassword) {
//       alert("Passwords do not match");
//       console.log("Error: Passwords do not match");
//       return;
//     }

//     try {
//       console.log("Calling resetPassword with token:", token);
//       await resetPassword(token, password);

//       console.log("Password reset successful!");
//       toast.success("Password reset successfully, redirecting to login page...");
      
//       setTimeout(() => {
//         navigate("/login");
//       }, 2000);
//     } catch (error) {
//       console.error("Error occurred during password reset:", error);
//       toast.error(error.message || "Error resetting password");
//     }
//   };

//   useEffect(() => {
//     if (error) {
//       console.error("Error from store:", error);
//     }
//     if (message) {
//       console.log("Message from store:", message);
//     }
//     console.log("isLoading:", isLoading);
//   }, [error, message, isLoading]);

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='max-w-md w-full bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
//     >
//       <div className='p-8'>
//         <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-foundations-primary to-foundations-secondary text-transparent bg-clip-text'>
//           Reset Password
//         </h2>
//         {error && <p className='text-foundations-tertiary text-sm mb-4'>{error}</p>}
//         {message && <p className='text-foundations-primary text-sm mb-4'>{message}</p>}

//         <form onSubmit={handleSubmit}>
//           <Input
//             icon={Lock}
//             type='password'
//             placeholder='New Password'
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           <Input
//             icon={Lock}
//             type='password'
//             placeholder='Confirm New Password'
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className='w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg shadow-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-foundations-primary focus:ring-offset-2 focus:ring-offset-foundations-dark transition duration-200'
//             type='submit'
//             disabled={isLoading}
//           >
//             {isLoading ? "Resetting..." : "Set New Password"}
//           </motion.button>
//         </form>
//       </div>
//     </motion.div>
//   );
// };

// export default ResetPasswordPage;


import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Inputs";
import PasswordStrength from "../components/PasswordStrenght";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";
import Logo from "../assets/Logo.svg";
import Typing from "../assets/Typing.webp";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { resetPassword, error, isLoading, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ResetPasswordPage loaded");
    console.log("Token from URL:", token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);
      toast.success("Password reset successfully, redirecting to login page...");
      
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.message || "Error resetting password");
    }
  };

  useEffect(() => {
    if (error) {
      console.error("Error from store:", error);
    }
    if (message) {
      console.log("Message from store:", message);
    }
  }, [error, message, isLoading]);

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div className="p-8">
            <div className="flex items-center mb-8">
              <img src={Logo} alt="Logo" className="h-8" />
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">
              Reset Password
            </h2>

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                icon={Lock}
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <PasswordStrength password={password} />

              <Input
                icon={Lock}
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg shadow-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-foundations-primary focus:ring-offset-2 focus:ring-offset-foundations-dark transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Resetting..." : "Set New Password"}
              </motion.button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden md:block md:w-1/2 bg-orange-50 relative">
        <img
          src={Typing}
          alt="Reset Password"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white z-10">
          <div className="text-4xl font-bold mb-4">
            RESET YOUR PASSWORD
          </div>
          <div className="text-3xl font-bold">
            GAIN ACCESS TO YOUR ACCOUNT AGAIN
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;

// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { useAuthStore } from '../store/authStore';
// import Inputs from '../components/Inputs';
// import { ArrowLeft, Loader, Mail } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

// const ForgotPasswordPage = () => {
//     const [email, setEmail] = useState('');
//     const [isSubmitted, setIsSubmitted] = useState(false);

//     const { forgotPassword, isLoading } = useAuthStore();

//     const handleSubmit = async (e) => {
//         try {
//             e.preventDefault();
//             await forgotPassword(email);
//             toast.success("Password reset link sent to your email successfully");
//             setIsSubmitted(true);
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return (
//         <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             className="max-w-md w-full bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//         >
//             <div className="p-8">
//                 <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-foundations-primary to-foundations-secondary text-transparent bg-clip-text">
//                     Forgot Password
//                 </h2>

//                 {!isSubmitted ? (
//                     <form onSubmit={handleSubmit}>
//                         <p className="text-foundations-light mb-6 text-center">
//                             Enter your email address and we'll send you a link to reset your password.
//                         </p>
//                         <Inputs
//                             icon={Mail}
//                             type="email"
//                             placeholder="Email Address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             required
//                         />

//                         <motion.button
//                             whileHover={{ scale: 1.02 }}
//                             whileTap={{ scale: 0.98 }}
//                             className="w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg shadow-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
//                             type="submit"
//                         >
//                             {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
//                         </motion.button>
//                     </form>
//                 ) : (
//                     <div className="text-center">
//                         <motion.div
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             transition={{ type: "spring", stiffness: 500, damping: 30 }}
//                             className="w-16 h-16 bg-foundations-primary rounded-full flex items-center justify-center mx-auto mb-4"
//                         >
//                             <Mail className="h-8 w-8 text-foundations-light" />
//                         </motion.div>
//                         <p className="text-foundations-light mb-6">
//                             If an account exists for {email}, you will receive a password reset link shortly.
//                         </p>
//                     </div>
//                 )}
//             </div>
//             <div className="px-8 py-4 bg-foundations-dark bg-opacity-50 flex justify-center">
//                 <Link to="/login" className="text-sm text-foundations-primary hover:underline flex items-center">
//                     <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
//                 </Link>
//             </div>
//         </motion.div>
//     );
// };

// export default ForgotPasswordPage;


import { motion } from 'framer-motion';
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import Inputs from '../components/Inputs';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import Logo from '../assets/Logo.svg';
import Typing from '../assets/Typing.webp';

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { forgotPassword, isLoading } = useAuthStore();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await forgotPassword(email);
            toast.success("Password reset link sent to your email successfully");
            setIsSubmitted(true);
        } catch (error) {
            console.log(error);
        }
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

                        <h2 className="text-2xl font-bold mb-6">Forgot Password</h2>

                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <p className="text-foundations-light mb-6 text-center">
                                    Enter your email address and we'll send you a link to reset your password.
                                </p>
                                <Inputs
                                    icon={Mail}
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-3 px-4 bg-gradient-to-r from-foundations-primary to-foundations-secondary text-foundations-light font-bold rounded-lg shadow-lg hover:from-foundations-hover hover:to-foundations-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-foundations-primary focus:ring-offset-foundations-dark transition duration-200"
                                    type="submit"
                                >
                                    {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
                                </motion.button>
                            </form>
                        ) : (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    className="w-16 h-16 bg-foundations-primary rounded-full flex items-center justify-center mx-auto mb-4"
                                >
                                    <Mail className="h-8 w-8 text-foundations-light" />
                                </motion.div>
                                <p className="text-foundations-light mb-6">
                                    If an account exists for {email}, you will receive a password reset link shortly.
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-foundations-dark bg-opacity-50 backdrop-filter backdrop-blur-xl px-8 py-4 flex justify-center">
                        <Link to="/login" className="text-sm text-foundations-primary hover:underline flex items-center">
                            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
                        </Link>
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
                        RESET YOUR PASSWORD IN SECONDS.
                    </div>
                    <div className="text-3xl font-bold">
                        GET BACK TO YOUR ACCOUNT EASILY!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;

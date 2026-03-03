import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { loginAPI } from '../features/auth/authAPI';
import ErrorAlert from '../components/ErrorAlert';
import emailIcon from '../assets/icons/sms.svg';
import eyeIcon from '../assets/icons/eye.svg';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAPI(email, password);
      setUser(data.data || data);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F1F2] flex items-center justify-center p-4">
      {/* Main Container - Exactly matching Figma */}
      <div className="w-full max-w-[587px] bg-white rounded-[20px] shadow-xl overflow-hidden">
        
        {/* Header Section - Figma exact spacing */}
        <div className="px-5 sm:px-8 pt-8 sm:pt-10 pb-4 sm:pb-6">
          <div className="text-center space-y-3 sm:space-y-4">
            <h1 className="font-roboto font-semibold text-2xl sm:text-3xl lg:text-[32px] text-[#333333] leading-[150%]">
              Welcome Back
            </h1>
            <p className="font-roboto text-base sm:text-lg lg:text-2xl text-[rgba(51,51,51,0.8)] leading-[150%]">
              Secure access to your fleet anytime, anywhere
            </p>
          </div>
        </div>

        {/* Form Section - White container with padding */}
        <div className="px-5 sm:px-8 pb-8 sm:pb-10">
          <div className="bg-white">
            
            {/* Sign In Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="font-roboto font-semibold text-xl sm:text-2xl text-[#333333] text-center">
                Sign in
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6 sm:space-y-8">
              
              {/* Email Field - Figma exact */}
              <div className="space-y-2">
                <label className="block font-roboto font-medium text-sm sm:text-base text-[rgba(51,51,51,0.8)]">
                  Email or User Name
                </label>
                <div className="bg-[#FAFAFB] rounded-lg p-3 sm:p-4 border border-transparent focus-within:border-[#043677] transition">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Email Icon */}
                    <img src={emailIcon} alt="email" className="w-5 h-5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="flex-1 bg-transparent font-roboto font-medium text-sm sm:text-base text-[#043677] placeholder-[#043677] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Field - Figma exact */}
              <div className="space-y-2">
                <label className="block font-roboto font-medium text-sm sm:text-base text-[rgba(51,51,51,0.8)]">
                  Password
                </label>
                <div className="bg-[#FAFAFB] rounded-lg p-3 sm:p-4 border border-transparent focus-within:border-[#043677] transition">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {/* Email Icon */}
                    <img src={emailIcon} alt="email" className="w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      className="flex-1 bg-transparent font-roboto font-medium text-sm sm:text-base text-[#043677] placeholder-[#043677] focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <img src={eyeIcon} alt="eye" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Forgot Password - Figma exact */}
              <div className="text-right">
                <button 
                  type="button"
                  className="font-roboto font-medium text-sm sm:text-base text-[#043677] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              {/* Submit Button - Figma exact */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#043677] hover:bg-[#032a5c] text-white font-roboto font-medium text-sm sm:text-base py-3 sm:py-4 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  'Sign in'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
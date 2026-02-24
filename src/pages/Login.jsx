import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: 'ubktowing@gmail.com',
    password: 'Ubk.ali@2025'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(credentials.email, credentials.password);

    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex items-center justify-center p-5">
      <div className="w-[587px] h-[619px] bg-[#F5F7FA] rounded-2xl overflow-hidden">
        {/* Top Section - Welcome Back */}
        <div className="pt-8 px-10">
          <h2 className="text-[28px] font-semibold text-[#1A1D26] text-center">
            Welcome Back
          </h2>
          <p className="font-['Roboto'] text-[22px] font-normal leading-[150%] text-center text-[#333333CC] w-[497px] mx-auto mt-2">
            Secure access to your fleet anytime, anywhere
          </p>
        </div>

        {/* Bottom Section - White Card */}
        <div className="bg-white w-[587px] h-[498px] rounded-t-3xl mt-6 px-10 pt-8">
          <h3 className="text-[24px] font-semibold text-[#1A1D26] text-center mb-8">
            Sign In
          </h3>

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-5">
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Email or User Name
              </label>
              <input
                type="email"
                placeholder="name@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                className="w-full h-[43px] bg-[#F5F7FA] px-4 border border-[#E5E7EB] rounded-lg text-[14px] text-[#043677] outline-none focus:border-[#2A3FF5] transition-colors placeholder:text-[#043677] placeholder:opacity-60"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label className="block text-[14px] font-medium text-[#374151] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="********"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                className="w-full h-[43px] bg-[#F5F7FA] px-4 border border-[#E5E7EB] rounded-lg text-[14px] text-[#043677] outline-none focus:border-[#2A3FF5] transition-colors placeholder:text-[#043677] placeholder:opacity-60"
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-[#EF4444] text-xs text-center mb-3">
                {error}
              </p>
            )}

            {/* Forgot Password */}
            <div className="text-right mb-6">
              <button
                type="button"
                className="text-[14px] font-medium text-[#043677] bg-transparent border-none cursor-pointer hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-[47px] bg-[#043677] text-white rounded-lg text-[16px] font-medium border-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#052a5c] transition-colors"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
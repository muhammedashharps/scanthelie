import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Scan, ShieldCheck, Brain, Sparkles, ArrowRight } from 'lucide-react';

export default function Login() {
  const { user, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      // Navigation will be handled by the useEffect above
    } catch (error) {
      console.error('Failed to sign in:', error);
    }
  };

  const features = [
    {
      icon: <Scan className="h-6 w-6 text-primary-600" />,
      title: "Smart Product Scanning",
      description: "Instantly analyze product ingredients and nutritional information using advanced AI technology."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary-600" />,
      title: "Health Safety Verification",
      description: "Verify product claims and get personalized health insights based on your dietary needs and restrictions."
    },
    {
      icon: <Brain className="h-6 w-6 text-primary-600" />,
      title: "AI-Powered Analysis",
      description: "Leverage Google's Gemini AI to understand complex ingredient lists and potential health impacts."
    },
    {
      icon: <Sparkles className="h-6 w-6 text-primary-600" />,
      title: "Personalized Recommendations",
      description: "Receive tailored advice and alternatives based on your health profile and preferences."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          {/* Left Column - App Info */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                Welcome to Scan The Lie
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your AI-powered companion for making informed decisions about the products you consume. We help you understand what's really in your food and personal care items.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Login Form */}
          <div className="lg:max-w-md w-full mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <div className="inline-block p-3 bg-primary-50 rounded-full mb-4">
                  <Scan className="h-8 w-8 text-primary-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Get Started
                </h2>
                <p className="text-gray-600">
                  Join thousands of users making informed decisions about their health
                </p>
              </div>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-xl text-base font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm transition-colors duration-200"
              >
                <img
                  className="h-5 w-5 mr-3"
                  src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                  alt="Google logo"
                />
                Continue with Google
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>

              <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                  By signing in, you agree to our{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                    Privacy Policy
                  </a>
                </p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm">
                <ShieldCheck className="h-5 w-5 text-success-500 mr-2" />
                <span className="text-sm text-gray-600">Your data is secure and private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
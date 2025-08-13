import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';
import { Toast } from '../components/Toast';
import { Loader, LocateIcon, Mail, Phone } from 'lucide-react';
import {
  EMAILJS_PUBLIC_KEY,
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
} from '../assets/environment_variables';

// Define types for form data
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface MathCaptcha {
  question: string;
  answer: number;
}

export function Contact() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [showToast, setShowToast] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Bot protection states with proper types
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [submissionCount, setSubmissionCount] = useState<number>(0);
  const [lastSubmissionTime, setLastSubmissionTime] = useState<number>(0);
  // Fix 1 & 4: Use number | null and provide initial value
  const [formStartTime, setFormStartTime] = useState<number | null>(null);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);

  // Simple math CAPTCHA with proper typing
  const [mathCaptcha, setMathCaptcha] = useState<MathCaptcha>({ question: '', answer: 0 });
  const [userCaptchaAnswer, setUserCaptchaAnswer] = useState<string>('');

  // Fix 2: Properly type the refs
  const formRef = useRef<HTMLFormElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  // Initialize form protection measures
  useEffect(() => {
    setFormStartTime(Date.now()); // Now works because state accepts number
    generateMathCaptcha();

    // Check for existing rate limiting in localStorage
    const lastSubmission = localStorage.getItem('lastEmailSubmission');
    const submissionHistory = JSON.parse(
      localStorage.getItem('emailSubmissionHistory') || '[]'
    ) as number[];

    if (lastSubmission) {
      const timeDiff = Date.now() - parseInt(lastSubmission);
      if (timeDiff < 300000) {
        // 5 minutes
        setIsRateLimited(true);
        setTimeout(() => setIsRateLimited(false), 300000 - timeDiff);
      }
    }

    // Clean old submissions (older than 1 hour)
    const oneHourAgo = Date.now() - 3600000;
    const recentSubmissions = submissionHistory.filter((time: number) => time > oneHourAgo);
    setSubmissionCount(recentSubmissions.length);
    localStorage.setItem('emailSubmissionHistory', JSON.stringify(recentSubmissions));
  }, []);

  // Generate simple math CAPTCHA
  const generateMathCaptcha = (): void => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ['+', '-'] as const;
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer: number;
    if (operator === '+') {
      answer = num1 + num2;
    } else {
      answer = num1 - num2;
    }

    setMathCaptcha({
      question: `What is ${num1} ${operator} ${num2}?`,
      answer: answer,
    });
  };

  // Track user interaction
  const handleUserInteraction = (): void => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };

  // Validate submission timing and behavior
  const validateSubmission = (): boolean => {
    const now = Date.now();

    // Fix 3: Check if formStartTime is not null before using it
    if (formStartTime && now - formStartTime < 3000) {
      // Less than 3 seconds
      setError('Please take your time to fill out the form properly.');
      return false;
    }

    // Check if user has interacted with the form
    if (!userInteracted) {
      setError('Please interact with the form before submitting.');
      return false;
    }

    // Check honeypot field (should be empty) - now properly typed
    if (honeypotRef.current && honeypotRef.current.value !== '') {
      setError('Bot detected. Submission blocked.');
      return false;
    }

    // Check math CAPTCHA
    if (parseInt(userCaptchaAnswer) !== mathCaptcha.answer) {
      setError('Please solve the math problem correctly.');
      generateMathCaptcha(); // Generate new question
      setUserCaptchaAnswer('');
      return false;
    }

    // Rate limiting - max 3 submissions per hour
    if (submissionCount >= 3) {
      setError('Too many submissions. Please try again later.');
      return false;
    }

    // Rate limiting - minimum 5 minutes between submissions
    if (lastSubmissionTime && now - lastSubmissionTime < 300000) {
      setError('Please wait before sending another message.');
      setIsRateLimited(true);
      return false;
    }

    return true;
  };

  // Update submission tracking
  const updateSubmissionTracking = (): void => {
    const now = Date.now();
    const submissionHistory = JSON.parse(
      localStorage.getItem('emailSubmissionHistory') || '[]'
    ) as number[];

    submissionHistory.push(now);
    localStorage.setItem('emailSubmissionHistory', JSON.stringify(submissionHistory));
    localStorage.setItem('lastEmailSubmission', now.toString());

    setLastSubmissionTime(now);
    setSubmissionCount((prev) => prev + 1);
    setIsRateLimited(true);

    // Remove rate limit after 5 minutes
    setTimeout(() => setIsRateLimited(false), 300000);
  };

  const onSubmit = (data: FormData): void => {
    // Validate before proceeding
    if (!validateSubmission()) {
      return;
    }

    setLoading(true);
    setError('');

    // Add timestamp and user agent for additional verification
    // Fix 3: Handle null formStartTime properly
    const emailData = {
      ...data,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent.substring(0, 100), // Limit length
      formFillTime: formStartTime ? Date.now() - formStartTime : 0,
    };

    emailjs
      .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, emailData, EMAILJS_PUBLIC_KEY)
      .then(() => {
        reset();
        setUserCaptchaAnswer('');
        generateMathCaptcha();
        setShowToast(true);
        setLoading(false);
        setError('');
        updateSubmissionTracking();

        // Reset interaction tracking for next use
        setUserInteracted(false);
        setFormStartTime(Date.now()); // Now works with proper typing
      })
      .catch((error) => {
        setLoading(false);
        setError('Failed to send your message. Please try again after some time.');
        console.error('Error sending email:', error.text);
      });
  };

  return (
    <section id="contact" className="section">
      {showToast && (
        <Toast message="Message sent successfully!" onClose={() => setShowToast(false)} />
      )}
      <div className="container">
        <div className="section-header fade-in">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                / ping_me
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8"></div>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              Let's discuss your next project or collaboration opportunity
            </p>
          </div>
        </div>
        <div className="contact-content fade-in">
          <div className="contact-info">
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              I'm always interested in new opportunities and exciting projects. Whether you have a
              question about my work, want to collaborate, or just want to say hello, I'd love to
              hear from you.
            </p>
            <div className="contact-details">
              <div className="contact-item">
                <Mail color="rgb(34 211 238 / var(--tw-text-opacity, 1))" />
                <div>
                  <strong>Email</strong>
                  <br />
                  mahi3.mathews@gmail.com
                </div>
              </div>
              <div className="contact-item">
                <Phone color="rgb(34 211 238 / var(--tw-text-opacity, 1))" />
                <div>
                  <strong>Phone</strong>
                  <br />
                  +44 (783) 382-7363
                </div>
              </div>
              <div className="contact-item">
                <LocateIcon color="rgb(34 211 238 / var(--tw-text-opacity, 1))" />
                <div>
                  <strong>Location</strong>
                  <br />
                  Coventry, UK
                </div>
              </div>
            </div>
          </div>
          <form
            ref={formRef}
            onSubmit={handleSubmit(onSubmit)}
            className="contact-form"
            id="contactForm"
            onFocus={handleUserInteraction}
            onMouseMove={handleUserInteraction}
            onKeyDown={handleUserInteraction}
          >
            {/* Honeypot field - hidden from users but visible to bots */}
            <div
              style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
            >
              <input
                ref={honeypotRef}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                placeholder="Leave this field empty"
              />
            </div>

            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                id="name"
                {...register('name', {
                  required: true,
                  minLength: 2,
                  maxLength: 100,
                  pattern: /^[a-zA-Z\s]+$/,
                })}
                required
                className="outline-none focus:border-cyan-500 focus:shadow-cyan"
                onFocus={handleUserInteraction}
              />
            </div>

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: true,
                  maxLength: 254,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                required
                className="outline-none focus:border-cyan-500 focus:shadow-cyan"
                onFocus={handleUserInteraction}
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                id="subject"
                {...register('subject', {
                  required: true,
                  minLength: 5,
                  maxLength: 200,
                })}
                required
                className="outline-none focus:border-cyan-500 focus:shadow-cyan"
                onFocus={handleUserInteraction}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                id="message"
                {...register('message', {
                  required: true,
                  minLength: 10,
                  maxLength: 2000,
                })}
                required
                className="outline-none focus:border-cyan-500 focus:shadow-cyan"
                onFocus={handleUserInteraction}
              ></textarea>
            </div>

            {/* Math CAPTCHA */}
            <div className="form-group">
              <label className="text-cyan-400">{mathCaptcha.question}</label>
              <input
                type="number"
                value={userCaptchaAnswer}
                onChange={(e) => setUserCaptchaAnswer(e.target.value)}
                required
                className="outline-none focus:border-cyan-500 focus:shadow-cyan w-20"
                placeholder="Answer"
                onFocus={handleUserInteraction}
              />
              <small className="text-gray-400 block mt-1">
                Math time! A simple check to verify it’s really you
              </small>
            </div>

            {/* Rate limiting warning */}
            {isRateLimited && (
              <div className="mb-4 p-3 bg-yellow-900/20 border border-yellow-600/30 rounded-lg">
                <p className="text-yellow-400 text-sm">
                  You can send another message in a few minutes. This helps prevent spam.
                </p>
              </div>
            )}

            {/* Submission count warning */}
            {submissionCount >= 2 && (
              <div className="mb-4 p-3 bg-orange-900/20 border border-orange-600/30 rounded-lg">
                <p className="text-orange-400 text-sm">
                  You've sent {submissionCount} message(s) recently. Limit: 3 per hour.
                </p>
              </div>
            )}

            {loading ? (
              <div className="flex justify-center">
                <Loader className="h-10 w-10 text-cyan-600 animate-spin" />
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <button
                  type="submit"
                  disabled={isRateLimited || submissionCount >= 3}
                  className={`px-8 py-4 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
                    isRateLimited || submissionCount >= 3
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-xl hover:scale-105'
                  }`}
                >
                  Send Message
                </button>
                {error && <p className="mt-[10px] text-red-400">{error}</p>}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

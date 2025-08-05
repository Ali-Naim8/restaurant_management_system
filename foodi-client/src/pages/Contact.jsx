import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai';
import { validateEmail, validateFullName, validateMessage, validatePhone } from '../components/Validation';
import InlineError from '../components/InlineError';

const ContactForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState('');
  const [fullNameError, setFullNameError] = useState();
  const [emailError, setEmailError] = useState();
  const [phoneError, setPhoneError] = useState();
  const [messageError, setMessageError] = useState();

  useEffect(() => {

    validateFullName({fullName, setFullNameError});
    validateEmail({email, setEmailError});
    validatePhone({phone, setPhoneError});
    validateMessage({message, setMessageError});

  }, [fullName, email, phone, message]);

  console.log(fullNameError);

  return (
    <div className="max-w-screen-lg mx-auto p-8 flex flex-col lg:flex-row mt-8">
      {/* Left Section with Improved Border Radius */}
      <motion.div 
        className="lg:w-1/2 bg-green p-8 flex flex-col items-center justify-center rounded-lg shadow-lg mb-8 lg:mb-0"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src="/logo.png" alt="Foodi Logo" className="w-32 mb-4" />
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Foodi</h1>
        <p className="text-lg text-white mb-8">We are here to serve you! Whether you have questions about our services or want to provide feedback, feel free to reach out to us.</p>
        <p className="text-lg text-white">Contact us via email, phone, or by filling out the form on the right. We'll get back to you as soon as possible!</p>
        <br />
        <p className="text-lg text-white">We detected you are <br /> current in 
        <span className='font-bold text-black'>(Tanzania)</span></p>

      </motion.div>
      
      {/* Right Section with Contact Form */}
      <div className="lg:w-1/2 p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h2>
        <form className="space-y-6">

          {/* fullName */}
          <div className="relative">
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full Name"
              className="mt-1 p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-600" 
              required 
            />
            <AiOutlineUser className="absolute top-3 left-3 text-gray-400" />
            {fullNameError && <InlineError error={fullNameError} />}
          </div>

          {/* email */}
          <div className="relative">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="mt-1 p-3 pl-10 border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-600" 
              required 
            />
            <AiOutlineMail className="absolute top-3 left-3 text-gray-400" />
            {emailError && <InlineError error={emailError} />}
          </div>

          {/* Phone Number */}
          <div className="relative flex items-center">
            <select className="border bg-green text-white border-gray-300 rounded-md p-2 focus:outline-none focus:border-green-600 mr-2">
              <option>Tanzania</option>
              <option>Kenya</option>
              <option>Uganda</option>
            </select>
            <div className="text-gray-600 mr-2">+255</div>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="tel" 
              id="phone"
              name="phone"
              placeholder="Phone"
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-600" 
              required 
            />
            {phoneError && <InlineError error={phoneError} />}

            
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-lg font-medium text-gray-800 mb-2">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              id="message"
              name="message"
              rows="4"
              className="mt-1 p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:border-green-600"
              placeholder="Write your message here..."
              required
            ></textarea>
            {messageError && <InlineError error={messageError} />}

          </div>
          <div className="flex justify-center mt-6">
            <button type="submit" className="btn bg-green text-white w-48">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;

/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FaStar } from "react-icons/fa";

const Testimonials = () => {
  const [reviewsData, setReviewsData] = useState({ rating: 0, reviewCount: 0 });

  useEffect(() => {
    const fetchReviewsData = async () => {
      try {
        const response = await axios.get('http://localhost:6001/reviews/summary');
        setReviewsData({
          rating: response.data.averageRating,
          reviewCount: response.data.reviewCount
        });
      } catch (error) {
        console.error('Error fetching reviews data:', error);
      }
    };

    fetchReviewsData();
  }, []);

  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" alt="" />
        </div>
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Testimonials</p>
            <h2 className="title">What Our Customers Say About Us</h2>
            <blockquote className="my-5 text-secondary leading-[30px]">
              “I had the pleasure of dining at Foodi last night, and I'm still
              raving about the experience! The attention to detail in
              presentation and service was impeccable”
            </blockquote>
           
           {/* avatar */}
           <div className="flex items-center gap-4 flex-wrap">
             <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial1.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial2.png" />
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12 cursor-pointer">
                    <img src="/images/home/testimonials/testimonial3.png" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-1">
                <h5 className="text-lg font-semibold">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-yellow-400"/> 
                  <span className="font-medium">{reviewsData.rating.toFixed(1)}</span> 
                  <span className="text-[#807E7E]">({reviewsData.reviewCount} Reviews)</span>
                </div>
              </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;

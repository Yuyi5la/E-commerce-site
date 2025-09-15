import React from "react";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  CameraIcon,
} from "@heroicons/react/24/solid";

const ContactSection = () => {
  return (
    <>
      {/* Section Title */}
      <section
  id="contact"
  className="bg-black text-white py-32 flex items-center justify-center"
>
  <h2 className="text-5xl font-extrabold tracking-wide uppercase">
    Contact Us
  </h2>
</section>

      {/* Get In Touch & Form Section */}
      <section className="bg-white text-black py-20 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left Column */}
          <div>
            <h3 className="text-3xl font-bold text-black mb-4">
              Get In Touch
            </h3>
            <p className="text-gray-700 mb-8 max-w-md">
              Contact us for any question using the info below or fill the
              contact form and we will get back to you on your enquiry.
            </p>

            {/* Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded">
                  <PhoneIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Phone</p>
                  <p className="text-gray-600 text-sm">08034031530</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded">
                  <EnvelopeIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Email</p>
                  <p className="text-gray-600 text-sm">chromehalo@gmail.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded">
                  <MapPinIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Address</p>
                  <p className="text-gray-600 text-sm">lagos State, Nigeria</p>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-4">
                <div className="bg-black p-3 rounded">
                  <CameraIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <p className="font-semibold">Instagram</p>
                  <p className="text-gray-600 text-sm">@chrome_halo</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="mt-10 border-t pt-6 border-gray-300">
              <p className="font-semibold text-black mb-2">Social Media</p>
              <div className="flex space-x-4 text-2xl text-black">
                <a href="#">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#">
                  <i className="fab fa-x-twitter" />
                </a>
                <a href="#">
                  <i className="fab fa-instagram" />
                </a>
                <a href="#">
                  <i className="fab fa-youtube" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-gray-200 p-8 rounded-lg shadow-md">
            <form className="space-y-6">
              <div>
                <label className="block font-medium mb-1">Name</label>
                <input
                  type="text"
                  className="w-full border border-black rounded px-4 py-2 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input
                    type="email"
                    className="w-full border border-black rounded px-4 py-2 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    className="w-full border border-black rounded px-4 py-2 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium mb-1">Message</label>
                <textarea
                  rows="5"
                  className="w-full border border-black- rounded px-4 py-2 focus:outline-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-black text-white px-6 py-2 rounded hover:bg-black transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactSection;
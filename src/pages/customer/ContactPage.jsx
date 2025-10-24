// 🔧 Core React
import React from "react";

// 🧱 Components
import PageWrapper from "../../components/common/PageWrapper";

function ContactPage() {
  return (
    <PageWrapper title="Contact Us">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact Info */}
        <div className="space-y-4  dark:text-gray-300">
          <h2 className="text-lg font-semibold text-sunrice-brown dark:text-sunrice-yellow">
            Manila Sunrice — Calgary Location
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            We’re proud to serve Filipino breakfast classics with a modern twist. Reach out to us for reservations, catering inquiries, or general questions.
          </p>

          <div className="space-y-2">
            <p><strong>📍 Address:</strong> 123 Heritage Blvd SE, Calgary, AB T2H 1M9</p>
            <p><strong>📞 Phone:</strong> (403) 555-9274</p>
            <p><strong>✉️ Email:</strong> hello@manilasunrice.ca</p>
            <p><strong>🕒 Hours:</strong> Mon–Sun, 8:00 AM – 3:00 PM</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Follow Us</h3>
            <div className="flex gap-4 text-sunrice-brown dark:text-sunrice-yellow">
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">TikTok</a>
            </div>
          </div>
        </div>

        {/* Map Embed */}
        <div className="rounded-lg overflow-hidden shadow-md dark:shadow-lg">
          <iframe
            title="Manila Sunrice Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2519.123456789!2d-114.0719!3d51.0447!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x53716f3c12345678%3A0xabcdef1234567890!2s123%20Heritage%20Blvd%20SE%2C%20Calgary%2C%20AB!5e0!3m2!1sen!2sca!4v1634567890123"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </PageWrapper>
  );
}

export default ContactPage;
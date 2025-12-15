import React from "react";
import { Link } from "react-router-dom";
import PageWrapper from "../../components/common/PageWrapper";

function HomePage() {
  return (
    <PageWrapper title="Home">
      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-sunrice-cream dark:bg-white/10 transition-all duration-300">
        <div className="max-w-4xl mx-auto mb-8">
          <img
            src="/images/branding/hero-image.png"
            alt="Manila Sunrice hero"
            className="rounded-xl w-full shadow-lg"
          />
        </div>
        <h1 className="text-5xl font-bold text-sunrice-brown dark:text-sunrice-yellow mb-6 tracking-tight">
          Bringing the warmth of Manila to the heart of Calgary.
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
          Discover Filipino breakfast classics reimagined with local flair. From sizzling silogs to handcrafted drinks, we serve comfort with every bite.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/menu" className="px-5 py-3 bg-sunrice-brown text-white rounded-xl shadow-md hover:bg-sunrice-yellow hover:text-sunrice-brown transition">
            Explore Menu
          </Link>
          <Link to="/reservations" className="px-5 py-3 border border-sunrice-brown text-sunrice-brown dark:border-sunrice-yellow dark:text-sunrice-yellow rounded-xl shadow-md hover:bg-sunrice-brown hover:text-white transition">
            Book a Table
          </Link>
        </div>
      </section>


      {/* Featured Dish Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto rounded-xl bg-white shadow-xl p-8
          dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src="/images/branding/Filipino-silog.png" alt="Filipino silog dish" className="rounded-xl w-full" />
            <div>
              <h2 className="text-3xl font-semibold text-sunrice-brown dark:text-sunrice-yellow mb-4">Comfort in Every Bite</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Our signature silog plates bring together garlic rice, eggs, and savory meats — a true taste of home.
              </p>
              <Link to="/menu" className="text-sunrice-brown dark:text-sunrice-yellow underline hover:text-sunrice-yellow transition">
                View Breakfast Options →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Drinks Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto rounded-xl bg-sunrice-cream shadow-xl p-8
          dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-semibold text-sunrice-brown dark:text-sunrice-yellow mb-4">Handcrafted Filipino Drinks</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                From ube lattes to calamansi coolers, our drinks are crafted to refresh and delight.
              </p>
              <Link to="/menu" className="text-sunrice-brown dark:text-sunrice-yellow underline hover:text-sunrice-yellow transition">
                Browse Drinks →
              </Link>
            </div>
            <img src="/images/branding/handcrafted-Filipino-drink.png" alt="Handcrafted Filipino drink" className="rounded-xl w-full" />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-12 px-6">
        <div className="max-w-6xl mx-auto rounded-xl bg-white shadow-xl p-8
          dark:bg-white/10 dark:backdrop-blur-md dark:border dark:border-white/20 transition-all duration-300">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <img src="/images/branding/event-platter.png" alt="Filipino event platter" className="rounded-xl w-full" />
            <div>
              <h2 className="text-3xl font-semibold text-sunrice-brown dark:text-sunrice-yellow mb-4">Celebrate With Us</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Whether it’s a birthday brunch or a business lunch, Manila Sunrice is your go-to for flavorful gatherings.
              </p>
              <Link to="/reservations" className="text-sunrice-brown dark:text-sunrice-yellow underline hover:text-sunrice-yellow transition">
                Book an event →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default HomePage;
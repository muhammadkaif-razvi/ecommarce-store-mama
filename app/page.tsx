"use client";

import { Features } from "@/components/features";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { About } from "@/components/about";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/howitwork";
import { ChatBot } from "@/components/chatbot";

export default function AdminDashboard() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 ">
      <ChatBot />
      {/* Hero Section */}
      <section id="hero">
        {" "}
        <Hero />
      </section>
      {/* Features Section */}
      <section id="features">
        {" "}
        <Features />
      </section>
      {/* how it work */}
      <section id="howitwork">
        {" "}
        <HowItWorks />
      </section>{" "}
      {/* about us */}
      <section id="about">
        {" "}
        <About />
      </section>
      <section id="contact">
        <Contact />
      </section>
      {/* contact */}
      <Footer />
    </div>
  );
}

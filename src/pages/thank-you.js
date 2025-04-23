// pages/thank-you.js
import Link from "next/link";
import Header from "../layouts/header";
import Footer from "../layouts/footer";
import SEO from "@/components/SEO";

const ThankYouPage = () => {
  return (
    <>
      <SEO
        title="Thank You | Call Center Solutions Africa"
        description="Thank you for contacting Call Center Solutions Africa. We’ve received your request and will get back to you shortly. We're here to help you scale your business with the best BPO & contact center services in Africa."
        keywords="thank you, Call Center Solutions Africa, BPO services Africa, customer service, contact center, African business solutions"
        image="https://callcentersolutionsafrica.com/assets/images/logo.svg"
        noindex={true} // Add noindex prop
      />
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center px-4 py-16">
          <div className="text-center max-w-2xl">
            <h1 className="text-4xl font-semibold text-[#172840] mb-4">
              Thank You for Reaching Out!
            </h1>
            <p className="text-gray-600 mb-6">
              Your proposal request has been successfully submitted. We'll get
              back to you soon.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/">
                <button className="bg-[#ED761E] text-white px-8 py-3 rounded-full font-medium text-sm hover:bg-[#D7641B] transition duration-300">
                  Back to Homepage
                </button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
};

export default ThankYouPage;

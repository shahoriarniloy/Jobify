const WhyChooseUs = () => {
  return (
    <section>
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-black">Why Choose Us?</h2>
        <p className="mt-4 text-lg text-gray-600 mx-auto">
          We are a platform designed to make the hiring and job-seeking process
          effortless for everyone. Here’s why you should choose{" "}
          <strong>Jobify</strong>.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              Experienced Professionals
            </h3>
            <p className="mt-4 text-gray-600">
              Our team is comprised of industry experts with years of experience
              in recruitment and technology, ensuring you receive the best
              possible support.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              Cutting-Edge Technology
            </h3>
            <p className="mt-4 text-gray-600">
              We use advanced algorithms and AI-powered tools to match
              candidates with the right job opportunities, making the process
              faster and more efficient.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              User-Centric Approach
            </h3>
            <p className="mt-4 text-gray-600">
              At Jobify, we prioritize user experience, ensuring our platform is
              easy to navigate and tailored to meet the needs of both job
              seekers and employers.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              Innovation & Growth
            </h3>
            <p className="mt-4 text-gray-600">
              We continuously update our platform with the latest features to
              stay ahead of industry trends and meet the evolving needs of the
              market.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              Trusted by Industry Leaders
            </h3>
            <p className="mt-4 text-gray-600">
              Top companies and organizations trust us to provide them with
              high-quality candidates, making Jobify a trusted partner in the
              recruitment process.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
            <h3 className="text-2xl font-semibold text-black">
              Comprehensive Job Solutions
            </h3>
            <p className="mt-4 text-gray-600">
              Whether you're an employer or a job seeker, we offer solutions
              tailored to your needs, helping you find the best match quickly
              and effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

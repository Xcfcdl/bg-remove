import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-br from-orange-50 to-orange-100 border-t border-orange-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Features Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t.footer.features.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.footer.features.items.map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-gray-700 font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
              {t.footer.howItWorks.title}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transform your images in just a few simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden lg:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-orange-300 via-orange-400 to-orange-300"></div>
            
            {t.footer.howItWorks.steps.map((step, index) => {
              const icons = [
                // Upload icon
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>,
                // AI detection icon
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>,
                // Processing icon
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>,
                // Download icon
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              ];
              
              return (
                <div key={index} className="relative group">
                  <div className="text-center transform transition-all duration-300 hover:scale-105">
                    {/* Icon container with gradient background */}
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <div className="text-white">
                          {icons[index]}
                        </div>
                      </div>
                      {/* Step number badge */}
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white border-2 border-orange-500 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold shadow-md">
                        {index + 1}
                      </div>
                      {/* Pulse animation for active step */}
                      <div className="absolute inset-0 w-20 h-20 bg-orange-400 rounded-2xl opacity-0 group-hover:opacity-20 animate-pulse"></div>
                    </div>
                    
                    {/* Step description */}
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-orange-100 group-hover:shadow-md transition-all duration-300">
                      <p className="text-gray-700 font-medium leading-relaxed">
                        {step.replace(/^\d+\.\s*/, '')}
                      </p>
                    </div>
                  </div>
                  
                  {/* Arrow connector for mobile */}
                  {index < 3 && (
                    <div className="lg:hidden flex justify-center mt-4 mb-4">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Call to action */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <span>Try It Now - It's Free!</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t.footer.pricing.title}
          </h2>
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-orange-500">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {t.footer.pricing.free.title}
                </h3>
                <div className="text-4xl font-bold text-orange-500 mb-4">$0</div>
              </div>
              <ul className="space-y-3 mb-6">
                {t.footer.pricing.free.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                {t.footer.pricing.free.cta}
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t.footer.testimonials.title}
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {t.footer.testimonials.items.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="flex text-orange-400 mt-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t.footer.faq.title}
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {t.footer.faq.items.map((faq, index) => (
              <details key={index} className="bg-white rounded-lg shadow-sm">
                <summary className="p-6 cursor-pointer font-semibold text-gray-800 hover:text-orange-600 transition-colors">
                  {faq.question}
                </summary>
                <div className="px-6 pb-6 text-gray-700">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Contact & Legal */}
        <div className="border-t border-orange-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <h3 className="font-semibold text-gray-800">{t.footer.contact.title}</h3>
              <a href="mailto:contact@waicto.com" className="text-orange-600 hover:text-orange-700 transition-colors">
                {t.footer.contact.email}
              </a>
              <a href="https://github.com/addyosmani/bg-remove" className="text-orange-600 hover:text-orange-700 transition-colors">
                {t.footer.contact.github}
              </a>
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a href="/privacy" className="hover:text-orange-600 transition-colors">
                {t.footer.legal.privacy}
              </a>
              <a href="/terms" className="hover:text-orange-600 transition-colors">
                {t.footer.legal.terms}
              </a>
              <span>{t.footer.legal.copyright}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
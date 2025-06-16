import React from 'react'

const footerLinks = [
  'Privacy Policy',
  'Terms of Use',
  'Sales and Refunds',
  'Legal',
  'Site Map'
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-white py-8 sm:py-10">
      <div className="screen-max-width px-5 sm:px-10">
        {/* Top Section - Shopping Info */}
        <div className="mb-6 text-center md:text-left">
          <p className="text-xs sm:text-sm text-gray-400">
            More ways to shop:{' '}
            <a 
              href="/retail" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
              aria-label="Find an Apple Store"
            >
              Find an Apple Store
            </a>{' '}
            or{' '}
            <a 
              href="/resellers" 
              className="text-blue-400 hover:text-blue-300 transition-colors underline"
              aria-label="Find other retailers"
            >
              other retailer
            </a>{' '}
            near you.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Or call <a href="tel:0008000401966" className="hover:underline">000800-040-1966</a>
          </p>
        </div>

        {/* Divider Line */}
        <div className="bg-neutral-700 h-px w-full my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-xs text-gray-400 order-2 md:order-1">
            Copyright © {currentYear} Apple Inc. All rights reserved.
          </p>
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2">
            {footerLinks.map((link, i) => (
              <React.Fragment key={link}>
                <a 
                  href="#" 
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                  aria-label={link}
                >
                  {link}
                </a>
                {i !== footerLinks.length - 1 && (
                  <span className="text-gray-400 hidden md:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import React from 'react'

// Footer links data
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
    <footer className="py-8 sm:px-10 px-5 bg-neutral-900 text-white">
      <div className="screen-max-width">
        {/* Top Section - Shopping Info */}
        <div className="mb-6 text-center md:text-left">
          <p className="font-semibold text-gray-400 text-xs md:text-sm leading-5">
            More ways to shop:{' '}
            <a 
              href="/retail" 
              className="underline text-blue-500 hover:text-blue-400 transition-colors duration-200"
            >
              Find an Apple Store
            </a>{' '}
            or{' '}
            <a 
              href="/resellers" 
              className="underline text-blue-500 hover:text-blue-400 transition-colors duration-200"
            >
              other retailer
            </a>{' '}
            near you.
          </p>
          <p className="font-semibold text-gray-400 text-xs md:text-sm mt-2">
            Or call 000600-094-4589
          </p>
        </div>

        {/* Divider Line */}
        <div className="bg-neutral-700 my-5 h-[1px] w-full" />

        {/* Bottom Section - Copyright and Links */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Copyright */}
          <p className="font-semibold text-gray-400 text-xs order-2 md:order-1 text-center md:text-left">
            Copyright © {currentYear} Apple Inc. All rights reserved.
          </p>
          
          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 order-1 md:order-2">
            {footerLinks.map((link, index) => (
              <React.Fragment key={link}>
                <a 
                  href="#" 
                  className="font-semibold text-gray-400 text-xs hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
                {index !== footerLinks.length - 1 && (
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
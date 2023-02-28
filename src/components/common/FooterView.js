import React from "react";
import connextarFavicon from "../../resources/images/connextarFavicon.png";

const FooterView = () => {
  return (
    // <footer className="bg-gray-800 py-6 mt-auto absolute bottom-0 w-full">
    //   <div className="container mx-auto text-gray-100 text-center">
    //     <p>Copyright &copy; 2023 | Connextar Technologies!</p>
    //   </div>
    // </footer>

    <footer class="bg-gray-900 text-gray-300 py-10">
      <div class="container mx-auto px-4">
        <div class="flex flex-wrap justify-between">
          <div class="w-full md:w-1/2 lg:w-1/3">
            <h2 class="text-xl mb-4">About Us</h2>
            <p class="text-sm">
              Building high-performance software for tomorrow's needs.
            </p>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3 mt-6 md:mt-0">
            <h2 class="text-xl mb-4">Contact Us</h2>
            <p class="text-sm">
              Connextar Technologies Ltd
              <br /> 39 Seldon Street, Bradford, BD5 9HH
            </p>
            <p class="text-sm mt-4">
              Phone: (123) 456-7890
              <br /> Email: support@connextar.com
            </p>
          </div>
          <div class="w-full md:w-1/2 lg:w-1/3 mt-6 md:mt-0">
            <h2 class="text-xl mb-4">Links</h2>
            <ul class="text-sm">
              <li>
                <a href="#" class="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" class="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-10 border-t border-gray-800 pt-4">
          <div class="flex items-center justify-between">
            <a href="#">
              <img src={connextarFavicon} alt="logo" />
            </a>
            <p className="text-sm">
              Copyright &copy; 2023 | Connextar Technologies
            </p>
            <p class="text-sm">
              <a href="#" className="hover:text-white">
                Terms of Use
              </a>
              <span class="mx-2 text-gray-500">|</span>
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterView;

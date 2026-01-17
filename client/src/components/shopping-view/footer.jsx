import { Facebook, Instagram, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative bg-[#1F2933] text-[#E5E7EB]">
      {/* TOP BORDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">
          {/* BRAND */}
          <div>
            <h3 className="text-xl font-bold tracking-widest text-[#C9A24D]">
              KALEEN GHAR
            </h3>
            <p className="mt-6 text-sm text-[#9CA3AF] leading-relaxed">
              Handcrafted carpets made with timeless designs, premium
              materials, and generations of craftsmanship.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Shop
            </h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF]">
              <li><Link to="/shop/listing" className="hover:text-white">All Products</Link></li>
              <li><Link to="/shop/listing?category=handtufedCarpet" className="hover:text-white">Hand Tufted</Link></li>
              <li><Link to="/shop/listing?category=shaggyCarpet" className="hover:text-white">Shaggy Carpets</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-[#9CA3AF]">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider mb-6">
              Get in Touch
            </h4>
            <p className="text-sm text-[#9CA3AF] mb-4">
              support@kaleenghar.com
            </p>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-[#C9A24D] hover:text-black transition"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-[#C9A24D] hover:text-black transition"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-white/10 hover:bg-[#C9A24D] hover:text-black transition"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-[#9CA3AF]">
          <span>
            © {new Date().getFullYear()} Kaleen Ghar. All rights reserved.
          </span>
          <span className="mt-3 md:mt-0">
            Crafted with care in India 🇮🇳
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

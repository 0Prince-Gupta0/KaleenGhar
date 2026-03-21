import { Link } from "react-router-dom";
import { Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#1F2933] text-[#E5E7EB]">
      
      {/* TOP BORDER */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#C9A24D] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">

        {/* GRID */}
        <div className="
          grid grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-5 
          gap-10 sm:gap-12 lg:gap-14
        ">

          {/* BRAND */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-bold tracking-widest text-[#C9A24D]">
              QALEEN GHAR
            </h3>

            <p className="mt-4 sm:mt-6 text-sm text-[#9CA3AF] leading-relaxed max-w-sm">
              Handcrafted carpets inspired by Bhadohi’s rich heritage, blending
              timeless artistry with modern elegance.
            </p>
          </div>

          {/* SHOP */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              Shop
            </h4>

            <ul className="space-y-2 sm:space-y-3 text-sm text-[#9CA3AF]">
              <li><Link to="/shop/listing" className="hover:text-white">Explore All</Link></li>
               <li><Link to="/shop/listing?category=iraniPersian" className="hover:text-white">Irani Persian</Link></li>
              <li><Link to="/shop/listing?category=iraniBambooSilk" className="hover:text-white">Irani Bamboo Silk</Link></li>
               <li><Link to="/shop/listing?category=turkeyPersianGeometrical" className="hover:text-white">Turkey Persian & Geometrical</Link></li>
              <li><Link to="/shop/listing?category=indianPersianGeometrical" className="hover:text-white">Indian Persian & Geometrical</Link></li>
               <li><Link to="/shop/listing?category=handTufted" className="hover:text-white">Hand Tufted</Link></li>
              <li><Link to="/shop/listing?category=shaggyCarpet" className="hover:text-white">Shaggy Carpets</Link></li>
              <li><Link to="/shop/listing?category=importedRabbitFur" className="hover:text-white">Imported Rabbit Fur </Link></li>
              <li><Link to="/shop/listing?category=doormat" className="hover:text-white">Doormat</Link></li>
             
            </ul>
          </div>

          {/* EXPLORE */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              Explore
            </h4>

            <ul className="space-y-2 sm:space-y-3 text-sm text-[#9CA3AF]">
              <li><Link to="/about" onClick={() => window.scrollTo(0,0)} className="hover:text-white">About Us</Link></li>
              <li><Link to="/contact" onClick={() => window.scrollTo(0,0)} className="hover:text-white">Contact</Link></li>
              <li><Link to="/privacy" onClick={() => window.scrollTo(0,0)} className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" onClick={() => window.scrollTo(0,0)} className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/shipping-policy" onClick={() => window.scrollTo(0,0)} className="hover:text-white">Shipping Policy</Link></li>
              <li><Link to="/return-refund-policy" onClick={() => window.scrollTo(0,0)} className="hover:text-white">Return & Refund Policy</Link></li>
            </ul>
          </div>

          {/* VISIT US */}
          <div>
  <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
    Visit Us
  </h4>

  {/* Map */}
  <a
    href="https://maps.app.goo.gl/QfPKM6EijUKsk2s97"
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-xl overflow-hidden border border-white/10 hover:border-[#C9A24D] transition"
  >
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.2820747153537!2d77.36280437529804!3d28.561291275703734!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce50043460f1b%3A0x5425f44741a55d6f!2sQaleen%20Ghar!5e0!3m2!1sen!2sus!4v1773685210427!5m2!1sen!2sus"
      className="w-full h-[140px] sm:h-[170px]"
      style={{ border: 0 }}
      loading="lazy"
    />
  </a>

  {/* Address */}
  <a
    href="https://maps.app.goo.gl/QfPKM6EijUKsk2s97"
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-start gap-2 text-xs sm:text-sm text-[#9CA3AF] mt-3 sm:mt-4 hover:text-[#C9A24D] transition"
  >
    <MapPin size={16} />
    J-152 Sector-41, Noida
  </a>

  {/* Phone */}
  <a
    href="tel:+919810868799" 
    className="flex items-center gap-2 text-xs sm:text-sm text-[#9CA3AF] mt-2 hover:text-[#C9A24D] transition"
  >
    <Phone size={16} />
     +91 9810868799
  </a>
<a
    href="tel:+919810875599" 
    className="flex items-center gap-2 text-xs sm:text-sm text-[#9CA3AF] mt-2 hover:text-[#C9A24D] transition"
  >
    <Phone size={16} />
     +91 9810875599
  </a>
  {/* Email */}
  <a
    href="mailto:qaleengharr@gmail.com" 
    className="flex items-center gap-2 text-xs sm:text-sm text-[#9CA3AF] mt-2 hover:text-[#C9A24D] transition"
  >
    <Mail size={16} />
    qaleengharr@gmail.com
  </a>
</div>

          {/* SOCIAL */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold uppercase tracking-wider mb-4 sm:mb-6">
              Follow Us
            </h4>

            <div className="flex gap-3 sm:gap-4">
              <a
                href="https://www.instagram.com/qaleengharr/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-[#C9A24D] hover:text-black transition hover:scale-110 shadow-md"
              >
                <Instagram size={18} />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61585270484149"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-[#C9A24D] hover:text-black transition hover:scale-110 shadow-md"
              >
                <Facebook size={18} />
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10">
        <div className="
          max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6
          flex flex-col sm:flex-row items-center justify-between
          text-xs sm:text-sm text-[#9CA3AF]
          text-center sm:text-left
          gap-2
        ">
          <span>
            © {new Date().getFullYear()} Qaleen Ghar. All rights reserved.
          </span>

          <span>Crafted with care in India 🇮🇳</span>
        </div>
      </div>

    </footer>
  );
}

export default Footer;
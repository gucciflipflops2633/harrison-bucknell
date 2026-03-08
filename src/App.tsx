import { motion } from "motion/react";
import { 
  CheckCircle2, 
  ArrowRight, 
  Smartphone, 
  Zap, 
  ShieldCheck, 
  TrendingUp, 
  Star, 
  XCircle,
  Clock,
  Layout,
  MousePointer2,
  MessageSquare,
  Menu,
  X,
  CreditCard,
  Lock
} from "lucide-react";
import React, { useState, useEffect } from "react";

// --- Components ---

const CardPaymentModal = ({ isOpen, onClose, onPay, planPrice, isProcessing }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onPay: () => void, 
  planPrice: string,
  isProcessing: boolean
}) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    zip: ''
  });

  if (!isOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Basic formatting for card number and expiry
    let formattedValue = value;
    if (name === 'number') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').slice(0, 5);
    } else if (name === 'cvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4);
    }
    setCardData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const isCardValid = cardData.number.length >= 16 && cardData.expiry.length === 5 && cardData.cvc.length >= 3;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-black flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> Card Details
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-black/40" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Card Number</label>
              <div className="relative">
                <input 
                  type="text" 
                  name="number"
                  value={cardData.number}
                  onChange={handleInputChange}
                  placeholder="0000 0000 0000 0000"
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-black font-mono"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 opacity-40">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" referrerPolicy="no-referrer" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-3" referrerPolicy="no-referrer" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Expiry Date</label>
                <input 
                  type="text" 
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-black font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">CVC</label>
                <input 
                  type="text" 
                  name="cvc"
                  value={cardData.cvc}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-black font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Billing Zip / Postal Code</label>
              <input 
                type="text" 
                name="zip"
                value={cardData.zip}
                onChange={handleInputChange}
                placeholder="12345"
                className="w-full bg-black/5 border border-black/10 rounded-xl px-4 py-3 focus:outline-none focus:border-black transition-colors text-black"
              />
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <button 
              onClick={onPay}
              disabled={!isCardValid || isProcessing}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 hover:bg-zinc-800 transition-all shadow-lg shadow-black/10 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <Lock className="w-4 h-4" />
              )}
              {isProcessing ? 'Processing...' : `Pay ${planPrice}`}
            </button>
            <p className="text-[10px] text-center text-black/40 uppercase tracking-widest font-bold">
              Secure 256-bit SSL Encrypted Payment
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Navbar = ({ onGetStarted, onHome, onScrollToSection }: { 
  onGetStarted: () => void, 
  onHome: () => void,
  onScrollToSection: (id: string) => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    onScrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass py-4" : "py-6"}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <button onClick={onHome} className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-black">Growth<span className="text-black/40">Websites</span></span>
        </button>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-black/60">
          <button onClick={(e) => handleNavClick(e, 'problem')} className="hover:text-black transition-colors">The Problem</button>
          <button onClick={(e) => handleNavClick(e, 'solution')} className="hover:text-black transition-colors">Our Solution</button>
          <button onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-black transition-colors">Pricing</button>
          <button onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-black transition-colors">Contact</button>
        </div>

        <div className="hidden md:block">
          <button onClick={onGetStarted} className="bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            Get My Website
          </button>
        </div>

        <button className="md:hidden text-black" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 glass border-t-0 p-6 flex flex-col gap-4"
        >
          <button onClick={(e) => handleNavClick(e, 'problem')} className="text-left text-lg font-medium text-black">The Problem</button>
          <button onClick={(e) => handleNavClick(e, 'solution')} className="text-left text-lg font-medium text-black">Our Solution</button>
          <button onClick={(e) => handleNavClick(e, 'pricing')} className="text-left text-lg font-medium text-black">Pricing</button>
          <button onClick={(e) => handleNavClick(e, 'contact')} className="text-left text-lg font-medium text-black">Contact</button>
          <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} className="bg-black text-white w-full py-4 rounded-xl font-bold mt-2">
            Get My Website
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onGetStarted, onContact }: { onGetStarted: () => void, onContact: () => void }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-black/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block glass px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-black mb-6">
            Built for Local Businesses
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-black">
            Websites That Turn <br />
            <span className="text-gradient-blue">Visitors Into Customers</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            We build modern, high-converting websites for local businesses so you can attract more customers and grow online. No more losing leads to outdated designs.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={onGetStarted} className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-black/10">
              Get My Website
            </button>
            <button onClick={onContact} className="w-full sm:w-auto glass hover:bg-black/10 text-black px-10 py-5 rounded-2xl font-bold text-lg transition-all">
              Request Free Preview
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Fast & Optimized</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Mobile First</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Designed to Convert</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Problem = () => {
  const problems = [
    { icon: <Clock className="w-6 h-6" />, title: "Slow Loading", desc: "40% of people leave a site that takes more than 3 seconds to load." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Not Mobile Friendly", desc: "Most customers find you on their phones. If your site breaks, they leave." },
    { icon: <Layout className="w-6 h-6" />, title: "Outdated Design", desc: "An old website makes your business look unprofessional and untrustworthy." },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Hard to Contact", desc: "If customers can't call or book in one click, they'll call your competitor." },
  ];

  return (
    <section id="problem" className="py-24 bg-[#fcfcfc] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">
            Most Small Businesses Are <br />
            <span className="text-red-600">Losing Customers Online</span>
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Your website is your digital storefront. If it's slow, ugly, or hard to use, you're literally handing money to your competitors.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {problems.map((p, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-3xl bg-white border border-black/5 shadow-sm hover:border-red-600/30 transition-all"
            >
              <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-600 mb-6">
                {p.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-black">{p.title}</h3>
              <p className="text-sm text-black/50 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Solution = () => {
  const features = [
    { title: "Modern Designs", desc: "Beautiful, custom layouts that reflect your brand's quality." },
    { title: "Fast Loading", desc: "Lightning-fast performance that keeps visitors on your page." },
    { title: "Mobile Optimized", desc: "Perfect experience on every device, from iPhone to Desktop." },
    { title: "Conversion Focused", desc: "Strategic call-to-actions designed to generate more leads." },
    { title: "Google Reviews", desc: "Integrated social proof to build instant trust with new visitors." },
    { title: "SEO Ready", desc: "Built to rank higher on Google so local customers can find you." },
  ];

  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-black font-bold tracking-widest uppercase text-xs mb-4 block">The Solution</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-black">
              A Website Built to <br />
              <span className="text-gradient-blue">Grow Your Business</span>
            </h2>
            <p className="text-black/60 mb-10 text-lg">
              We don't just build websites; we build growth engines. Our sites are engineered to turn casual browsers into paying customers.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-black mt-1 shrink-0" />
                  <div>
                    <h4 className="font-bold text-black mb-1">{f.title}</h4>
                    <p className="text-xs text-black/50">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Main Growth Card */}
            <div className="col-span-2 md:col-span-2 aspect-[16/10] rounded-3xl overflow-hidden glass p-4">
              <div className="w-full h-full rounded-2xl bg-white border border-black/10 overflow-hidden relative group flex items-center justify-center" style={{ backgroundImage: 'linear-gradient(#00000010 1px, transparent 1px), linear-gradient(90deg, #00000010 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
                {/* Sales Graphic: Green Arrow Going Up */}
                <div className="relative w-full h-full flex items-center justify-center">
                  <motion.div 
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="w-1/2 h-1/2"
                  >
                    <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                      <motion.path
                        d="M10 90 L30 70 L50 75 L90 20"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <motion.path
                        d="M70 20 L90 20 L90 40"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
                </div>
                
                <div className="absolute bottom-6 left-6">
                  <div className="glass px-4 py-2 rounded-xl bg-white/80 flex items-center gap-2 border border-black/5">
                    <TrendingUp className="w-4 h-4 text-black" />
                    <p className="text-xs font-bold text-black uppercase tracking-wider">+142% Revenue Growth</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Speed Card */}
            <div className="aspect-square rounded-3xl glass p-3">
              <div className="w-full h-full rounded-2xl bg-white border border-black/10 p-5 flex flex-col justify-between">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Performance</p>
                  <p className="text-2xl font-bold text-black tracking-tight">99/100</p>
                  <div className="mt-2 h-1 w-full bg-black/5 rounded-full overflow-hidden">
                    <div className="h-full w-[99%] bg-emerald-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Card */}
            <div className="aspect-square rounded-3xl glass p-3">
              <div className="w-full h-full rounded-2xl bg-white border border-black/10 p-5 flex flex-col justify-between">
                <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Responsive</p>
                  <p className="text-2xl font-bold text-black tracking-tight">Mobile First</p>
                  <p className="text-[10px] text-black/40 mt-1">Optimized for all screens</p>
                </div>
              </div>
            </div>

            {/* Trust Card */}
            <div className="col-span-2 aspect-[21/9] md:aspect-auto md:col-span-2 rounded-3xl glass p-3">
              <div className="w-full h-full rounded-2xl bg-white border border-black/10 p-5 flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Social Proof</p>
                  <p className="text-xl font-bold text-black tracking-tight">Google Reviews</p>
                  <div className="flex gap-1 mt-2">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                  </div>
                </div>
                <div className="flex -space-x-3">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-zinc-100">
                      <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


const Pricing = ({ onSelectPlan }: { onSelectPlan: (plan: { name: string, price: string, monthly: string }) => void }) => {
  const plans = [
    {
      name: "Starter Plan",
      price: "$500",
      monthly: "$99/mo",
      desc: "Perfect for businesses looking for a professional refresh.",
      features: [
        "Custom Website Design",
        "High-Speed Hosting",
        "Mobile Optimization",
        "Google Reviews Integration",
        "Monthly Updates",
        "Basic SEO Setup"
      ],
      popular: true
    },
    {
      name: "All-Inclusive Plan",
      price: "$0",
      monthly: "$150/mo",
      desc: "Zero upfront costs, just growth. All inclusive.",
      features: [
        "Everything in Starter",
        "Zero Upfront Cost",
        "Unlimited Small Changes",
        "Priority Support",
        "Advanced SEO Strategy",
        "Premium Hosting & Security"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">Simple, Transparent Pricing</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Choose the plan that fits your business. Both options include everything you need to succeed online.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((p, i) => (
            <div 
              key={i}
              className={`relative p-10 rounded-[2.5rem] flex flex-col ${p.popular ? 'bg-black text-white shadow-2xl shadow-black/10' : 'glass bg-white'}`}
            >
              {p.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-white/20">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={p.popular ? "text-white/80" : "text-black/50"}>upfront</span>
              </div>
              <div className="text-xl font-medium mb-6">
                + {p.monthly}
              </div>
              <p className={`text-sm mb-8 ${p.popular ? "text-white/80" : "text-black/50"}`}>{p.desc}</p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {p.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <CheckCircle2 className={`w-5 h-5 shrink-0 ${p.popular ? "text-white" : "text-black"}`} />
                    <span className="text-sm font-medium">{f}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => onSelectPlan({ name: p.name, price: p.price, monthly: p.monthly })} 
                className={`w-full py-4 rounded-2xl font-bold transition-all hover:scale-[1.02] active:scale-[0.98] ${p.popular ? 'bg-white text-black' : 'bg-black text-white'}`}
              >
                Choose {p.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const reasons = [
    { title: "Built for Local", desc: "We understand the specific needs of local service businesses and retail shops." },
    { title: "Affordable Pricing", desc: "Enterprise-grade design at a price point that makes sense for small businesses." },
    { title: "Fast Delivery", desc: "Get your new website live in weeks, not months. We value your time." },
    { title: "Modern Design", desc: "We use the latest design trends to ensure your business looks like a leader." },
    { title: "Ongoing Support", desc: "We don't just build and leave. We're your long-term digital partners." },
  ];

  return (
    <section className="py-24 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="grid gap-8">
              {reasons.map((r, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0 text-black">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 text-black">{r.title}</h4>
                    <p className="text-black/50 leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-black font-bold tracking-widest uppercase text-xs mb-4 block">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-black">
              We Help You Grow, <br />
              <span className="text-gradient">Not Just Build a Site</span>
            </h2>
            <p className="text-black/60 mb-8 text-lg">
              Most agencies just want to sell you a template. We want to help you dominate your local market. Our success is measured by your phone ringing.
            </p>
            <div className="p-8 rounded-3xl glass border-black/10 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-black/10 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-black">Trusted by 50+ Local Businesses</p>
                  <div className="flex text-black">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="italic text-black/70 text-sm">
                "Growth Websites doubled our monthly leads in just 60 days. The $0 upfront plan was a no-brainer for us."
              </p>
              <p className="mt-4 text-xs font-bold text-black">— Mike R., Elite Plumbing</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CTA = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    business: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setFormStatus('success');
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormStatus('idle');
      setFormData({ name: '', business: '', email: '', phone: '' });
    }, 3000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-white">
      <div className="absolute inset-0 bg-black/5 -z-10" />
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.02)_0%,transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-8 text-black leading-tight">
              Ready to Grow Your <br />
              <span className="text-gradient-blue">Business Online?</span>
            </h2>
            <p className="text-lg text-black/60 mb-10 max-w-xl">
              Stop losing customers to outdated websites. Get a modern, high-converting site built specifically for your local business.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">Free Preview of Your New Site</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">No Long-Term Contracts</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">Cancel Anytime</p>
              </div>
            </div>

            <button onClick={onGetStarted} className="bg-black hover:bg-zinc-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-black/10">
              Get My Website
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass p-8 md:p-12 rounded-[3rem] border-black/10 bg-white/50 relative"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-2">Message Sent!</h3>
                <p className="text-black/60">We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-8 text-black">Request Free Preview</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required 
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-black/10 focus:border-black focus:ring-0 transition-all outline-none text-black placeholder:text-black/30"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Business Name" 
                      value={formData.business}
                      onChange={e => setFormData({...formData, business: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-black/10 focus:border-black focus:ring-0 transition-all outline-none text-black placeholder:text-black/30"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-black/10 focus:border-black focus:ring-0 transition-all outline-none text-black placeholder:text-black/30"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white border border-black/10 focus:border-black focus:ring-0 transition-all outline-none text-black placeholder:text-black/30"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-5 bg-black hover:bg-zinc-800 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Request'}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onHome, onAgreement, onPrivacy }: { onHome: () => void, onAgreement: () => void, onPrivacy: () => void }) => {
  return (
    <footer className="py-12 border-t border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <button onClick={onHome} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-black rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold tracking-tight text-black">Growth<span className="text-black/40">Websites</span></span>
          </button>
          
          <div className="flex gap-8 text-sm text-black/40">
            <button onClick={onAgreement} className="hover:text-black transition-colors">Service Agreement</button>
            <button onClick={onPrivacy} className="hover:text-black transition-colors">Privacy Policy</button>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="mailto:growthwebsites.ca@gmail.com" className="text-sm text-black/40 hover:text-black transition-colors">growthwebsites.ca@gmail.com</a>
            <a href="tel:+14383651338" className="text-sm text-black/40 hover:text-black transition-colors">+1 (438) 365-1338</a>
            <p className="text-xs text-black/20 mt-2">
              © {new Date().getFullYear()} Growth Websites. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

const PrivacyPolicyPage = () => {
  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-16 rounded-[3rem] bg-white shadow-xl"
      >
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-black">Privacy Policy</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-sm">Last Updated: March 4, 2026</p>
        </div>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg text-black/70 mb-12">
            Growth Websites values your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and protect information when you visit our website or use our services.
          </p>

          <hr className="border-black/10 mb-12" />

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">1. Information We Collect</h2>
              <p className="text-black/70 mb-4">We may collect the following information when you interact with our website or services:</p>
              <div className="bg-black/5 p-6 rounded-2xl border border-black/5 mb-6">
                <h3 className="font-bold text-black mb-3">Personal Information</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black/70">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Name</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Email address</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Phone number</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Business name</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Website information</li>
                </ul>
              </div>
              <p className="text-black/70">This information is typically collected when you fill out a contact form, request a quote, or communicate with us by email.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">2. How We Use Your Information</h2>
              <p className="text-black/70 mb-4">Growth Websites may use your information to:</p>
              <ul className="space-y-3 text-black/70 mb-6">
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Respond to inquiries</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Provide website design services</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Communicate project updates</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Improve our services</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Send occasional service updates</li>
              </ul>
              <p className="font-bold text-black">We will never sell or rent your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">3. Website Analytics</h2>
              <p className="text-black/70 mb-6">Our website may use analytics tools to understand how visitors use the site. These tools may collect anonymous information such as pages visited, time spent on pages, browser type, and device type. This information helps us improve website performance and user experience.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">4. Cookies</h2>
              <p className="text-black/70 mb-6">Our website may use cookies to improve website functionality, remember user preferences, and analyze traffic. You can disable cookies through your browser settings if you prefer.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">5. Third-Party Services</h2>
              <p className="text-black/70 mb-6">Growth Websites may use trusted third-party services such as website hosting providers, analytics tools, and email services. These services may process limited data necessary to operate our website and services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">6. Data Protection</h2>
              <p className="text-black/70 mb-6">We take reasonable steps to protect your information, including secure hosting environments, website security measures, and limited access to sensitive information. However, no internet transmission is completely secure.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">7. Your Rights</h2>
              <p className="text-black/70 mb-6">You may request to access your personal information, update your information, or request deletion of your data. To make a request, contact us using the information below.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">8. Changes to This Policy</h2>
              <p className="text-black/70 mb-6">Growth Websites may update this Privacy Policy from time to time. Updates will be posted on this page.</p>
            </section>

            <section className="bg-black text-white p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">9. Contact Information</h2>
              <p className="mb-4">If you have questions about this Privacy Policy, please contact:</p>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-xl">Growth Websites</p>
                </div>
                <div className="flex flex-col gap-2">
                  <a href="mailto:growthwebsites.ca@gmail.com" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" /> growthwebsites.ca@gmail.com
                  </a>
                  <a href="tel:+14383651338" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
                    <Smartphone className="w-4 h-4" /> +1 (438) 365-1338
                  </a>
                </div>
              </div>
            </section>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

const AgreementPage = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  const handleAgree = () => {
    const subject = encodeURIComponent("Agreement Acceptance - Growth Websites");
    const body = encodeURIComponent("I have read and agree to the Scope of Work and Website Service Agreement provided by Growth Websites.");
    window.location.href = `mailto:growthwebsites.ca@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-16 rounded-[2.5rem] bg-white shadow-xl prose prose-zinc max-w-none"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-black border-b border-black/10 pb-8">Service Documents</h1>
        
        {/* Scope of Work */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Scope of Work</h2>
          <p className="text-black/60 mb-8 italic">Growth Websites – Website Design & Maintenance</p>
          
          <h3 className="text-xl font-bold mb-4 text-black">1. Project Overview</h3>
          <p className="text-black/70 mb-8">Growth Websites will design and launch a modern, professional, mobile-optimized website for the client’s business. The goal of the website is to improve the client’s online presence, build credibility, and help attract more customers.</p>
          
          <h3 className="text-xl font-bold mb-4 text-black">2. Website Design & Development</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-black/5 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 text-black">Website Creation</h4>
              <ul className="text-sm text-black/70 space-y-2 list-disc pl-4">
                <li>Custom website design tailored to business</li>
                <li>Modern, professional layout</li>
                <li>Mobile-optimized design</li>
                <li>Fast loading pages</li>
                <li>Clean navigation</li>
              </ul>
            </div>
            <div className="bg-black/5 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 text-black">Website Pages</h4>
              <ul className="text-sm text-black/70 space-y-2 list-disc pl-4">
                <li>Home page</li>
                <li>About page</li>
                <li>Services / Products page</li>
                <li>Contact page</li>
                <li>Reviews / Testimonials section</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">3. Features Included</h3>
          <ul className="text-black/70 mb-8 space-y-2 list-disc pl-4">
            <li>Google Reviews integration</li>
            <li>Contact form</li>
            <li>Mobile optimization</li>
            <li>Basic search engine optimization (SEO)</li>
            <li>Professional design layout</li>
            <li>Clear call-to-action buttons</li>
            <li>Basic analytics setup</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-black">4. Hosting & Maintenance</h3>
          <p className="text-black/70 mb-8">Growth Websites will provide ongoing website maintenance which includes: Secure website hosting, Website updates, Minor content changes, Performance monitoring, Security updates, and Technical support.</p>

          <h3 className="text-xl font-bold mb-4 text-black">5. Pricing Options</h3>
          <div className="space-y-4 mb-8">
            <div className="border border-black/10 p-6 rounded-2xl">
              <h4 className="font-bold text-black">Option 1 – Standard Plan</h4>
              <p className="text-sm text-black/70">Build: $500 (one-time) | Maintenance: $99/month</p>
            </div>
            <div className="border border-black/10 p-6 rounded-2xl">
              <h4 className="font-bold text-black">Option 2 – All-Inclusive Plan</h4>
              <p className="text-sm text-black/70">Upfront: $0 | Monthly: $129/month</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">6. Client Responsibilities</h3>
          <p className="text-black/70 mb-8">Client agrees to provide: Business info, Logo, Images, Service descriptions, Contact details, and Feedback during design.</p>

          <h3 className="text-xl font-bold mb-4 text-black">7. Timeline</h3>
          <p className="text-black/70 mb-8">Typical delivery: 5–10 business days after receiving all content.</p>

          <h3 className="text-xl font-bold mb-4 text-black">8. Revisions</h3>
          <p className="text-black/70 mb-8">Includes up to 2 design revisions during development.</p>

          <h3 className="text-xl font-bold mb-4 text-black">9. Ownership</h3>
          <p className="text-black/70 mb-8">Upon full payment of build fee, client owns design. For $0 upfront plan, website remains managed by Growth Websites.</p>
        </section>

        <hr className="border-black/10 mb-20" />

        {/* Service Agreement */}
        <section id="service" className="mb-20 scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Service Agreement</h2>
          <p className="text-black/70 mb-8">
            By purchasing this service you agree that our company will design and manage your website.
            Delivery timelines may vary depending on project requirements.
            Hosting and maintenance are included in active subscription plans.
          </p>
        </section>

        {/* Payment Agreement */}
        <section id="payment" className="mb-20 scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Payment Agreement</h2>
          <p className="text-black/70 mb-8">
            All payments are processed securely via PayPal. By subscribing, you authorize recurring monthly charges 
            as specified in your chosen plan. You may cancel your subscription at any time through your PayPal account 
            or by contacting our support team.
          </p>
        </section>

        <div className="bg-black text-white p-12 rounded-[2rem] text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Ready to Proceed?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">By clicking the button below, you agree to the terms and scope outlined in these documents. We will be notified immediately to start your project.</p>
          <button 
            onClick={handleAgree}
            className="bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
          >
            I Agree to the Terms
          </button>
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-sm text-white/40 italic">This will open your email client to send your approval to <a href="mailto:growthwebsites.ca@gmail.com" className="underline hover:text-white transition-colors">growthwebsites.ca@gmail.com</a></p>
            <p className="text-sm text-white/40 italic">Or call us at <a href="tel:+14383651338" className="underline hover:text-white transition-colors">+1 (438) 365-1338</a> to confirm</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CheckoutPage = ({ onViewAgreement }: { onViewAgreement: () => void }) => {
  const [agreed1, setAgreed1] = useState({ service: false, payment: false });
  const [agreed2, setAgreed2] = useState({ service: false, payment: false });
  const [contactInfo, setContactInfo] = useState({ name: '', business: '', email: '', phone: '' });
  const [detailsConfirmed, setDetailsConfirmed] = useState(false);

  const canPay1 = agreed1.service && agreed1.payment && detailsConfirmed;
  const canPay2 = agreed2.service && agreed2.payment && detailsConfirmed;

  const isContactValid = contactInfo.name.trim() !== '' && contactInfo.email.trim() !== '';

  return (
    <section className="font-sans py-20 bg-white text-black text-center min-h-screen pt-32">
      <h1 className="text-[42px] mb-2 font-bold">Launch Your Website</h1>
      <p className="text-gray-600 mb-16">Complete your details to unlock payment options.</p>

      {/* STEP 1: CONTACT FORM */}
      <div className={`max-w-md mx-auto px-6 transition-all duration-500 ${detailsConfirmed ? 'opacity-50 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="bg-white p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
          <h2 className="text-2xl font-bold mb-6 text-black">1. Business Details</h2>
          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Your Name *</label>
              <input 
                type="text" 
                value={contactInfo.name}
                onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                placeholder="John Doe" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Business Name</label>
              <input 
                type="text" 
                value={contactInfo.business}
                onChange={(e) => setContactInfo({ ...contactInfo, business: e.target.value })}
                placeholder="Acme Corp" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Email Address *</label>
              <input 
                type="email" 
                value={contactInfo.email}
                onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                placeholder="john@example.com" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">Phone Number</label>
              <input 
                type="tel" 
                value={contactInfo.phone}
                onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                placeholder="+1 (555) 000-0000" 
                className="w-full px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
              />
            </div>
            <button 
              onClick={() => isContactValid && setDetailsConfirmed(true)}
              disabled={!isContactValid}
              className={`w-full py-5 rounded-xl font-bold text-lg transition-all ${
                isContactValid 
                ? "bg-black hover:bg-zinc-800 text-white hover:scale-[1.02] active:scale-[0.98]" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm & Continue
            </button>
          </div>
        </div>
      </div>

      {detailsConfirmed && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold mb-10 text-black">2. Select Your Plan</h2>
          <div className="flex justify-center gap-10 flex-wrap px-6">
            {/* PLAN 1 */}
            <div className="bg-white text-black w-[320px] p-10 rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Starter Plan</h2>
              <h1 className="text-[46px] font-bold">$500</h1>
              <p className="text-gray-500">Setup Fee</p>
              <p className="mt-2.5 text-[18px] font-medium">$99/month after setup</p>

              <hr className="my-6 border-gray-200" />

              <ul className="text-left leading-[2] mb-8">
                <li>✔ Custom Website</li>
                <li>✔ Hosting Included</li>
                <li>✔ Monthly Maintenance</li>
                <li>✔ Support</li>
              </ul>

              <div className="text-left mb-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed1.service}
                    onChange={(e) => setAgreed1({ ...agreed1, service: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>I agree to the <a href="#service" onClick={(e) => { e.preventDefault(); window.location.hash = "service"; onViewAgreement(); }} className="text-blue-600 hover:underline">Service Agreement</a></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed1.payment}
                    onChange={(e) => setAgreed1({ ...agreed1, payment: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>I agree to the <a href="#payment" onClick={(e) => { e.preventDefault(); window.location.hash = "payment"; onViewAgreement(); }} className="text-blue-600 hover:underline">Payment Agreement</a></span>
                </label>
              </div>

              {/* $500 SETUP PAYMENT */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                <input type="hidden" name="cmd" value="_xclick" />
                <input type="hidden" name="business" value="harrison.bucknell@gmail.com" />
                <input type="hidden" name="item_name" value={`Website Setup Fee - ${contactInfo.business || contactInfo.name}`} />
                <input type="hidden" name="amount" value="500.00" />
                <input type="hidden" name="currency_code" value="CAD" />
                <input type="hidden" name="custom" value={JSON.stringify(contactInfo)} />

                <button 
                  type="submit"
                  disabled={!canPay1}
                  className={`mt-5 w-full border-none p-4 text-[18px] rounded-lg font-bold text-white transition-all active:scale-95 ${
                    canPay1 ? "bg-[#0070ba] cursor-pointer hover:bg-[#005ea6]" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Pay $500 Setup
                </button>
              </form>

              <p className="mt-4 text-[14px] text-gray-400">
                After setup you will activate the $99/month plan
              </p>
            </div>

            {/* PLAN 2 */}
            <div className="bg-white text-black w-[320px] p-10 rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Growth Plan</h2>
              <h1 className="text-[46px] font-bold">$0</h1>
              <p className="text-gray-500">Setup</p>
              <p className="mt-2.5 text-[18px] font-medium">$150/month</p>

              <hr className="my-6 border-gray-200" />

              <ul className="text-left leading-[2] mb-8">
                <li>✔ Premium Website</li>
                <li>✔ Hosting Included</li>
                <li>✔ Unlimited Updates</li>
                <li>✔ Priority Support</li>
              </ul>

              <div className="text-left mb-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed2.service}
                    onChange={(e) => setAgreed2({ ...agreed2, service: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>I agree to the <a href="#service" onClick={(e) => { e.preventDefault(); window.location.hash = "service"; onViewAgreement(); }} className="text-blue-600 hover:underline">Service Agreement</a></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed2.payment}
                    onChange={(e) => setAgreed2({ ...agreed2, payment: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>I agree to the <a href="#payment" onClick={(e) => { e.preventDefault(); window.location.hash = "payment"; onViewAgreement(); }} className="text-blue-600 hover:underline">Payment Agreement</a></span>
                </label>
              </div>

              {/* SUBSCRIPTION */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                <input type="hidden" name="business" value="harrison.bucknell@gmail.com" />
                <input type="hidden" name="item_name" value={`Growth Website Plan - ${contactInfo.business || contactInfo.name}`} />
                <input type="hidden" name="a3" value="150.00" />
                <input type="hidden" name="p3" value="1" />
                <input type="hidden" name="t3" value="M" />
                <input type="hidden" name="currency_code" value="CAD" />
                <input type="hidden" name="custom" value={JSON.stringify(contactInfo)} />

                <button 
                  type="submit"
                  disabled={!canPay2}
                  className={`mt-5 w-full border-none p-4 text-[18px] rounded-lg font-bold text-white transition-all active:scale-95 ${
                    canPay2 ? "bg-[#111827] cursor-pointer hover:bg-black" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  Start $150 / Month
                </button>
              </form>
            </div>
          </div>
          
          <button 
            onClick={() => setDetailsConfirmed(false)}
            className="mt-10 text-sm text-gray-400 hover:text-black transition-colors underline"
          >
            Edit Business Details
          </button>
        </motion.div>
      )}

      <p className="mt-10 text-gray-500">
        Secure checkout powered by PayPal
      </p>
    </section>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<'home' | 'checkout' | 'agreement' | 'privacy'>('home');
  const [selectedPlan, setSelectedPlan] = useState<{ name: string, price: string, monthly: string } | null>(null);
  const [targetSection, setTargetSection] = useState<string | null>(null);

  useEffect(() => {
    if (view === 'home' && targetSection) {
      // Small delay to ensure DOM is ready after view switch
      const timer = setTimeout(() => {
        const element = document.getElementById(targetSection);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
        setTargetSection(null);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [view, targetSection]);

  useEffect(() => {
    if (!targetSection) {
      window.scrollTo(0, 0);
    }
  }, [view, targetSection]);

  const handleSelectPlan = (plan: { name: string, price: string, monthly: string }) => {
    setSelectedPlan(plan);
    setView('checkout');
  };

  const handleGetStarted = () => {
    // Default to Starter Plan if they just click "Get Started" without choosing
    if (!selectedPlan) {
      setSelectedPlan({
        name: "Starter Plan",
        price: "$500",
        monthly: "$99/mo"
      });
    }
    setView('checkout');
  };

  const scrollToSection = (id: string) => {
    if (view !== 'home') {
      setTargetSection(id);
      setView('home');
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        onGetStarted={handleGetStarted} 
        onHome={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        onScrollToSection={scrollToSection}
      />
      <main>
        {view === 'home' && (
          <>
            <Hero onGetStarted={handleGetStarted} onContact={() => scrollToSection('contact')} />
            <Problem />
            <Solution />
            <Pricing onSelectPlan={handleSelectPlan} />
            <WhyUs />
            <CTA onGetStarted={handleGetStarted} />
          </>
        )}
        {view === 'checkout' && <CheckoutPage onViewAgreement={() => setView('agreement')} />}
        {view === 'agreement' && <AgreementPage />}
        {view === 'privacy' && <PrivacyPolicyPage />}
      </main>
      <Footer 
        onHome={() => { setView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        onAgreement={() => setView('agreement')} 
        onPrivacy={() => setView('privacy')}
      />
    </div>
  );
}

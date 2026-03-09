import { motion } from "motion/react";
import emailjs from '@emailjs/browser';

emailjs.init("H7zPiGEzHb927ISm6");
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
              <CreditCard className="w-5 h-5" /> Détails de la carte
            </h3>
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X className="w-5 h-5 text-black/40" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Numéro de carte</label>
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
                <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Date d'expiration</label>
                <input 
                  type="text" 
                  name="expiry"
                  value={cardData.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
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
              <label className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Code postal de facturation</label>
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
              {isProcessing ? 'Traitement...' : `Payer ${planPrice}`}
            </button>
            <p className="text-[10px] text-center text-black/40 uppercase tracking-widest font-bold">
              Paiement sécurisé crypté SSL 256 bits
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
          <button onClick={(e) => handleNavClick(e, 'problem')} className="hover:text-black transition-colors">Le Problème</button>
          <button onClick={(e) => handleNavClick(e, 'solution')} className="hover:text-black transition-colors">Notre Solution</button>
          <button onClick={(e) => handleNavClick(e, 'pricing')} className="hover:text-black transition-colors">Tarifs</button>
          <button onClick={(e) => handleNavClick(e, 'contact')} className="hover:text-black transition-colors">Contact</button>
        </div>

        <div className="hidden md:block">
          <button onClick={onGetStarted} className="bg-black hover:bg-zinc-800 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95">
            Obtenir mon site web
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
          <button onClick={(e) => handleNavClick(e, 'problem')} className="text-left text-lg font-medium text-black">Le Problème</button>
          <button onClick={(e) => handleNavClick(e, 'solution')} className="text-left text-lg font-medium text-black">Notre Solution</button>
          <button onClick={(e) => handleNavClick(e, 'pricing')} className="text-left text-lg font-medium text-black">Tarifs</button>
          <button onClick={(e) => handleNavClick(e, 'contact')} className="text-left text-lg font-medium text-black">Contact</button>
          <button onClick={() => { onGetStarted(); setMobileMenuOpen(false); }} className="bg-black text-white w-full py-4 rounded-xl font-bold mt-2">
            Obtenir mon site web
          </button>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ onGetStarted, onScrollToSection }: { onGetStarted: () => void, onScrollToSection: (id: string) => void }) => {
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
            Conçu pour les entreprises locales
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-8 leading-[1.1] text-black">
            Des sites web qui transforment <br />
            <span className="text-gradient-blue">vos visiteurs en clients</span>
          </h1>
          <p className="text-lg md:text-xl text-black/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Nous créons des sites web modernes et performants pour les entreprises locales afin que vous puissiez attirer plus de clients et vous développer en ligne. Ne perdez plus de prospects à cause de designs obsolètes.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button onClick={onGetStarted} className="w-full sm:w-auto bg-black hover:bg-zinc-800 text-white px-10 py-5 rounded-2xl font-bold text-lg transition-all hover:scale-105 shadow-lg shadow-black/10">
              Obtenir mon site web
            </button>
            <button onClick={() => onScrollToSection('contact')} className="w-full sm:w-auto glass hover:bg-black/10 text-black px-10 py-5 rounded-2xl font-bold text-lg transition-all">
              Contactez-nous
            </button>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-50">
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Rapide et optimisé</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Priorité au mobile</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-black" />
              <span className="text-sm font-medium text-black">Conçu pour convertir</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="inline-block px-4 py-1.5 rounded-full bg-black/5 text-black text-xs font-bold uppercase tracking-widest mb-6">
          Contactez-nous pour un aperçu gratuit
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">
          Contactez-<span className="text-gradient-blue">nous</span>
        </h2>
        <p className="text-black/60 mb-12 max-w-xl mx-auto">
          Vous avez des questions ou vous êtes prêt à lancer votre projet ? Contactez-nous directement et nous vous répondrons dans les plus brefs délais.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Écrivez-nous</h3>
            <p className="text-black/50 mb-4 text-sm">Pour toute question générale ou support</p>
            <a 
              href="mailto:growthwebsites.ca@gmail.com" 
              className="text-lg font-bold text-black hover:text-black/70 transition-colors underline underline-offset-4"
            >
              growthwebsites.ca@gmail.com
            </a>
          </div>

          <div className="p-8 rounded-[2rem] bg-gray-50 border border-gray-100 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-black">Appelez-nous</h3>
            <p className="text-black/50 mb-4 text-sm">Parlez directement avec notre équipe</p>
            <a 
              href="tel:+14383651338" 
              className="text-lg font-bold text-black hover:text-black/70 transition-colors underline underline-offset-4"
            >
              +1 (438) 365-1338
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Problem = () => {
  const problems = [
    { icon: <Clock className="w-6 h-6" />, title: "Chargement lent", desc: "40 % des gens quittent un site qui met plus de 3 secondes à charger." },
    { icon: <Smartphone className="w-6 h-6" />, title: "Pas adapté aux mobiles", desc: "La plupart des clients vous trouvent sur leur téléphone. Si votre site ne fonctionne pas bien, ils partent." },
    { icon: <Layout className="w-6 h-6" />, title: "Design obsolète", desc: "Un vieux site web donne à votre entreprise un aspect peu professionnel et peu fiable." },
    { icon: <MessageSquare className="w-6 h-6" />, title: "Difficile à contacter", desc: "Si les clients ne peuvent pas appeler ou réserver en un clic, ils appelleront votre concurrent." },
  ];

  return (
    <section id="problem" className="py-24 bg-[#fcfcfc] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">
            La plupart des petites entreprises <br />
            <span className="text-red-600">perdent des clients en ligne</span>
          </h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Votre site web est votre vitrine numérique. S'il est lent, peu attrayant ou difficile à utiliser, vous donnez littéralement de l'argent à vos concurrents.
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
    { title: "Designs modernes", desc: "Des mises en page magnifiques et personnalisées qui reflètent la qualité de votre marque." },
    { title: "Chargement rapide", desc: "Des performances ultra-rapides qui retiennent les visiteurs sur votre page." },
    { title: "Optimisé pour mobile", desc: "Une expérience parfaite sur tous les appareils, de l'iPhone à l'ordinateur de bureau." },
    { title: "Axé sur la conversion", desc: "Des appels à l'action stratégiques conçus pour générer plus de prospects." },
    { title: "Avis Google", desc: "Preuve sociale intégrée pour instaurer une confiance immédiate avec les nouveaux visiteurs." },
    { title: "Prêt pour le SEO", desc: "Conçu pour être mieux classé sur Google afin que les clients locaux puissent vous trouver." },
  ];

  return (
    <section id="solution" className="py-24 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 blur-[100px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-black font-bold tracking-widest uppercase text-xs mb-4 block">La Solution</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-black">
              Un site web conçu pour <br />
              <span className="text-gradient-blue">faire croître votre entreprise</span>
            </h2>
            <p className="text-black/60 mb-10 text-lg">
              Nous ne nous contentons pas de créer des sites web ; nous construisons des moteurs de croissance. Nos sites sont conçus pour transformer les visiteurs occasionnels en clients payants.
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
                    <p className="text-xs font-bold text-black uppercase tracking-wider">+142 % de croissance des revenus</p>
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
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Réactif</p>
                  <p className="text-2xl font-bold text-black tracking-tight">Priorité au mobile</p>
                  <p className="text-[10px] text-black/40 mt-1">Optimisé pour tous les écrans</p>
                </div>
              </div>
            </div>

            {/* Trust Card */}
            <div className="col-span-2 aspect-[21/9] md:aspect-auto md:col-span-2 rounded-3xl glass p-3">
              <div className="w-full h-full rounded-2xl bg-white border border-black/10 p-5 flex items-center justify-between">
                <div className="flex flex-col justify-center">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-1">Preuve sociale</p>
                  <p className="text-xl font-bold text-black tracking-tight">Avis Google</p>
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
      name: "Forfait de départ",
      price: "$500",
      monthly: "$99/mo",
      desc: "Parfait pour les entreprises à la recherche d'un rafraîchissement professionnel.",
      features: [
        "Conception de site web personnalisée",
        "Hébergement haute vitesse",
        "Optimisation mobile",
        "Intégration des avis Google",
        "Mises à jour mensuelles",
        "Configuration SEO de base"
      ],
      popular: true
    },
    {
      name: "Forfait tout inclus",
      price: "$0",
      monthly: "$150/mo",
      desc: "Zéro coût initial, juste de la croissance. Tout inclus.",
      features: [
        "Tout ce qui est dans le forfait de départ",
        "Zéro coût initial",
        "Petites modifications illimitées",
        "Support prioritaire",
        "Stratégie SEO avancée",
        "Hébergement et sécurité premium"
      ],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-black">Tarification simple et transparente</h2>
          <p className="text-black/60 max-w-2xl mx-auto">
            Choisissez le forfait qui convient à votre entreprise. Les deux options incluent tout ce dont vous avez besoin pour réussir en ligne.
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
                  Le plus populaire
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{p.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-bold">{p.price}</span>
                <span className={p.popular ? "text-white/80" : "text-black/50"}>au départ</span>
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
                Choisir {p.name}
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
    { title: "Conçu pour le local", desc: "Nous comprenons les besoins spécifiques des entreprises de services locales et des commerces de détail." },
    { title: "Prix abordables", desc: "Un design de qualité entreprise à un prix qui a du sens pour les petites entreprises." },
    { title: "Livraison rapide", desc: "Mettez votre nouveau site en ligne en quelques semaines, pas en mois. Nous apprécions votre temps." },
    { title: "Design moderne", desc: "Nous utilisons les dernières tendances en matière de design pour garantir que votre entreprise ressemble à un leader." },
    { title: "Support continu", desc: "Nous ne nous contentons pas de construire et de partir. Nous sommes vos partenaires numériques à long terme." },
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
            <span className="text-black font-bold tracking-widest uppercase text-xs mb-4 block">Pourquoi nous choisir</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-8 leading-tight text-black">
              Nous vous aidons à croître, <br />
              <span className="text-gradient">pas seulement à créer un site</span>
            </h2>
            <p className="text-black/60 mb-8 text-lg">
              La plupart des agences veulent simplement vous vendre un modèle. Nous voulons vous aider à dominer votre marché local. Notre succès se mesure par la sonnerie de votre téléphone.
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
                  <p className="font-bold text-black">Approuvé par plus de 50 entreprises locales</p>
                  <div className="flex text-black">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-3 h-3 fill-current" />)}
                  </div>
                </div>
              </div>
              <p className="italic text-black/70 text-sm">
                "Growth Websites a doublé nos prospects mensuels en seulement 60 jours. Le forfait à 0 $ au départ était une évidence pour nous."
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
              Prêt à faire croître votre <br />
              <span className="text-gradient-blue">entreprise en ligne ?</span>
            </h2>
            <p className="text-lg text-black/60 mb-10 max-w-xl">
              Arrêtez de perdre des clients à cause de sites web obsolètes. Obtenez un site moderne et performant conçu spécifiquement pour votre entreprise locale.
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">Support et communication directs</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">Pas de contrats à long terme</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-black" />
                </div>
                <p className="font-medium text-black">Annulez à tout moment</p>
              </div>
            </div>
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
                <h3 className="text-2xl font-bold text-black mb-2">Message envoyé !</h3>
                <p className="text-black/60">Nous vous répondrons dans les 24 heures.</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-2xl font-bold mb-8 text-black">Contactez-nous directement</h3>
                <div className="space-y-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black mb-4">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-black/40 uppercase font-bold tracking-widest mb-1">E-mail</p>
                    <a href="mailto:growthwebsites.ca@gmail.com" className="text-xl font-bold text-black hover:underline">
                      growthwebsites.ca@gmail.com
                    </a>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-black/5 rounded-2xl flex items-center justify-center text-black mb-4">
                      <Smartphone className="w-6 h-6" />
                    </div>
                    <p className="text-sm text-black/40 uppercase font-bold tracking-widest mb-1">Téléphone</p>
                    <a href="tel:+14383651338" className="text-xl font-bold text-black hover:underline">
                      +1 (438) 365-1338
                    </a>
                  </div>
                </div>
              </div>
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
            <button onClick={onAgreement} className="hover:text-black transition-colors">Accord de service</button>
            <button onClick={onPrivacy} className="hover:text-black transition-colors">Politique de confidentialité</button>
            <a href="#" className="hover:text-black transition-colors">Conditions de service</a>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-2">
            <a href="mailto:growthwebsites.ca@gmail.com" className="text-sm text-black/40 hover:text-black transition-colors">growthwebsites.ca@gmail.com</a>
            <a href="tel:+14383651338" className="text-sm text-black/40 hover:text-black transition-colors">+1 (438) 365-1338</a>
            <p className="text-xs text-black/20 mt-2">
              © {new Date().getFullYear()} Growth Websites. Tous droits réservés.
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
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-black">Politique de confidentialité</h1>
          <p className="text-black/40 font-bold uppercase tracking-widest text-sm">Dernière mise à jour : 4 mars 2026</p>
        </div>

        <section className="prose prose-zinc max-w-none">
          <p className="text-lg text-black/70 mb-12">
            Growth Websites accorde une grande importance à votre vie privée et s'engage à protéger vos informations personnelles. Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons les informations lorsque vous visitez notre site web ou utilisez nos services.
          </p>

          <hr className="border-black/10 mb-12" />

          <div className="space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">1. Informations que nous collectons</h2>
              <p className="text-black/70 mb-4">Nous pouvons collecter les informations suivantes lorsque vous interagissez avec notre site web ou nos services :</p>
              <div className="bg-black/5 p-6 rounded-2xl border border-black/5 mb-6">
                <h3 className="font-bold text-black mb-3">Informations personnelles</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-black/70">
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Nom</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Adresse e-mail</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Numéro de téléphone</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Nom de l'entreprise</li>
                  <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /> Informations sur le site web</li>
                </ul>
              </div>
              <p className="text-black/70">Ces informations sont généralement collectées lorsque vous remplissez un formulaire de contact, demandez un devis ou communiquez avec nous par e-mail.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">2. Comment nous utilisons vos informations</h2>
              <p className="text-black/70 mb-4">Growth Websites peut utiliser vos informations pour :</p>
              <ul className="space-y-3 text-black/70 mb-6">
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Répondre aux demandes</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Fournir des services de conception de sites web</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Communiquer les mises à jour du projet</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Améliorer nos services</li>
                <li className="flex items-start gap-3"><ShieldCheck className="w-5 h-5 text-black mt-0.5" /> Envoyer des mises à jour de service occasionnelles</li>
              </ul>
              <p className="font-bold text-black">Nous ne vendrons ni ne louerons jamais vos informations personnelles à des tiers.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">3. Analyses du site web</h2>
              <p className="text-black/70 mb-6">Notre site web peut utiliser des outils d'analyse pour comprendre comment les visiteurs utilisent le site. Ces outils peuvent collecter des informations anonymes telles que les pages visitées, le temps passé sur les pages, le type de navigateur et le type d'appareil. Ces informations nous aident à améliorer les performances du site et l'expérience utilisateur.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">4. Cookies</h2>
              <p className="text-black/70 mb-6">Notre site web peut utiliser des cookies pour améliorer les fonctionnalités du site, mémoriser les préférences des utilisateurs et analyser le trafic. Vous pouvez désactiver les cookies via les paramètres de votre navigateur si vous le préférez.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">5. Services tiers</h2>
              <p className="text-black/70 mb-6">Growth Websites peut utiliser des services tiers de confiance tels que des fournisseurs d'hébergement de sites web, des outils d'analyse et des services de messagerie. Ces services peuvent traiter les données limitées nécessaires au fonctionnement de notre site web et de nos services.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">6. Protection des données</h2>
              <p className="text-black/70 mb-6">Nous prenons des mesures raisonnables pour protéger vos informations, notamment des environnements d'hébergement sécurisés, des mesures de sécurité du site web et un accès limité aux informations sensibles. Cependant, aucune transmission sur Internet n'est totalement sécurisée.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">7. Vos droits</h2>
              <p className="text-black/70 mb-6">Vous pouvez demander à accéder à vos informations personnelles, à les mettre à jour ou à demander la suppression de vos données. Pour faire une demande, contactez-nous en utilisant les informations ci-dessous.</p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-6 text-black">8. Modifications de cette politique</h2>
              <p className="text-black/70 mb-6">Growth Websites peut mettre à jour cette politique de confidentialité de temps à autre. Les mises à jour seront publiées sur cette page.</p>
            </section>

            <section className="bg-black text-white p-8 rounded-3xl">
              <h2 className="text-2xl font-bold mb-6">9. Informations de contact</h2>
              <p className="mb-4">Si vous avez des questions sur cette politique de confidentialité, veuillez contacter :</p>
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
    const subject = encodeURIComponent("Acceptation de l'accord - Growth Websites");
    const body = encodeURIComponent("J'ai lu et j'accepte l'étendue des travaux et l'accord de service de site web fournis par Growth Websites.");
    window.location.href = `mailto:growthwebsites.ca@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-32 pb-24 max-w-4xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 md:p-16 rounded-[2.5rem] bg-white shadow-xl prose prose-zinc max-w-none"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-12 text-black border-b border-black/10 pb-8">Documents de service</h1>
        
        {/* Scope of Work */}
        <section className="mb-20">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Étendue des travaux</h2>
          <p className="text-black/60 mb-8 italic">Growth Websites – Conception et maintenance de sites web</p>
          
          <h3 className="text-xl font-bold mb-4 text-black">1. Aperçu du projet</h3>
          <p className="text-black/70 mb-8">Growth Websites concevra et lancera un site web moderne, professionnel et optimisé pour mobile pour l'entreprise du client. L'objectif du site web est d'améliorer la présence en ligne du client, de renforcer sa crédibilité et d'aider à attirer plus de clients.</p>
          
          <h3 className="text-xl font-bold mb-4 text-black">2. Conception et développement de sites web</h3>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-black/5 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 text-black">Création du site web</h4>
              <ul className="text-sm text-black/70 space-y-2 list-disc pl-4">
                <li>Conception de site web personnalisée adaptée à l'entreprise</li>
                <li>Mise en page moderne et professionnelle</li>
                <li>Design optimisé pour mobile</li>
                <li>Pages à chargement rapide</li>
                <li>Navigation claire</li>
              </ul>
            </div>
            <div className="bg-black/5 p-6 rounded-2xl">
              <h4 className="font-bold mb-3 text-black">Pages du site web</h4>
              <ul className="text-sm text-black/70 space-y-2 list-disc pl-4">
                <li>Page d'accueil</li>
                <li>Page À propos</li>
                <li>Page Services / Produits</li>
                <li>Page Contact</li>
                <li>Section Avis / Témoignages</li>
              </ul>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">3. Fonctionnalités incluses</h3>
          <ul className="text-black/70 mb-8 space-y-2 list-disc pl-4">
            <li>Intégration des avis Google</li>
            <li>Formulaire de contact</li>
            <li>Optimisation mobile</li>
            <li>Optimisation de base pour les moteurs de recherche (SEO)</li>
            <li>Mise en page professionnelle</li>
            <li>Boutons d'appel à l'action clairs</li>
            <li>Configuration analytique de base</li>
          </ul>

          <h3 className="text-xl font-bold mb-4 text-black">4. Hébergement et maintenance</h3>
          <p className="text-black/70 mb-8">Growth Websites assurera la maintenance continue du site web, ce qui comprend : l'hébergement sécurisé du site web, les mises à jour du site web, les modifications mineures du contenu, la surveillance des performances, les mises à jour de sécurité et le support technique.</p>

          <h3 className="text-xl font-bold mb-4 text-black">5. Options de tarification</h3>
          <div className="space-y-4 mb-8">
            <div className="border border-black/10 p-6 rounded-2xl">
              <h4 className="font-bold text-black">Option 1 – Forfait Standard</h4>
              <p className="text-sm text-black/70">Construction : 500 $ (une seule fois) | Maintenance : 99 $/mois</p>
            </div>
            <div className="border border-black/10 p-6 rounded-2xl">
              <h4 className="font-bold text-black">Option 2 – Forfait Tout Inclus</h4>
              <p className="text-sm text-black/70">Initial : 0 $ | Mensuel : 129 $/mois</p>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">6. Responsabilités du client</h3>
          <p className="text-black/70 mb-8">Le client accepte de fournir : les informations sur l'entreprise, le logo, les images, les descriptions de services, les coordonnées et les commentaires pendant la conception.</p>

          <h3 className="text-xl font-bold mb-4 text-black">7. Calendrier</h3>
          <p className="text-black/70 mb-8">Livraison typique : 5 à 10 jours ouvrables après réception de tout le contenu.</p>

          <h3 className="text-xl font-bold mb-4 text-black">8. Révisions</h3>
          <p className="text-black/70 mb-8">Comprend jusqu'à 2 révisions de conception pendant le développement.</p>

          <h3 className="text-xl font-bold mb-4 text-black">9. Propriété</h3>
          <p className="text-black/70 mb-8">Dès le paiement intégral des frais de construction, le client est propriétaire du design. Pour le forfait à 0 $ au départ, le site web reste géré par Growth Websites.</p>
        </section>

        <hr className="border-black/10 mb-20" />

        {/* Service Agreement */}
        <section id="service" className="mb-20 scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Accord de service</h2>
          <p className="text-black/70 mb-8">
            En achetant ce service, vous acceptez que notre entreprise conçoive et gère votre site web.
            Les délais de livraison peuvent varier en fonction des exigences du projet.
            L'hébergement et la maintenance sont inclus dans les plans d'abonnement actifs.
          </p>
        </section>

        {/* Payment Agreement */}
        <section id="payment" className="mb-20 scroll-mt-32">
          <h2 className="text-3xl font-display font-bold mb-8 text-black">Accord de paiement</h2>
          <p className="text-black/70 mb-8">
            Tous les paiements sont traités de manière sécurisée via PayPal. En vous abonnant, vous autorisez des prélèvements mensuels récurrents 
            tels que spécifiés dans le forfait que vous avez choisi. Vous pouvez annuler votre abonnement à tout moment via votre compte PayPal 
            ou en contactant notre équipe de support.
          </p>
        </section>

        <div className="bg-black text-white p-12 rounded-[2rem] text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Prêt à continuer ?</h2>
          <p className="text-white/60 mb-10 max-w-xl mx-auto">En cliquant sur le bouton ci-dessous, vous acceptez les conditions et l'étendue définies dans ces documents. Nous serons informés immédiatement pour commencer votre projet.</p>
          <button 
            onClick={handleAgree}
            className="bg-white text-black px-12 py-6 rounded-2xl font-bold text-xl hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/10"
          >
            J'accepte les conditions
          </button>
          <div className="mt-6 flex flex-col items-center gap-2">
            <p className="text-sm text-white/40 italic">Cela ouvrira votre client de messagerie pour envoyer votre approbation à <a href="mailto:growthwebsites.ca@gmail.com" className="underline hover:text-white transition-colors">growthwebsites.ca@gmail.com</a></p>
            <p className="text-sm text-white/40 italic">Ou appelez-nous au <a href="tel:+14383651338" className="underline hover:text-white transition-colors">+1 (438) 365-1338</a> pour confirmer</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const CheckoutPage = ({ onViewAgreement }: { onViewAgreement: () => void }) => {
  const [agreed1, setAgreed1] = useState({ service: false, payment: false });
  const [agreed2, setAgreed2] = useState({ service: false, payment: false });
  const [contactInfo] = useState({ name: '', business: '', email: '', phone: '' });
  const [detailsConfirmed] = useState(true);

  const canPay1 = agreed1.service && agreed1.payment && detailsConfirmed;
  const canPay2 = agreed2.service && agreed2.payment && detailsConfirmed;

  return (
    <section className="font-sans py-20 bg-white text-black text-center min-h-screen pt-32">
      <h1 className="text-[42px] mb-2 font-bold">Lancez votre site web</h1>

      <div className="flex flex-col items-center gap-3 mb-12">
        <h2 className="text-2xl font-bold text-black">Contactez-nous pour votre site web</h2>
        <p className="text-sm text-gray-500 max-w-md">Nous avons besoin de vos informations pour créer votre site web, veuillez donc nous contacter avant de payer</p>
        <div className="flex flex-col items-center gap-2 text-lg text-gray-600 mt-4">
          <p>Contactez-nous à <a href="mailto:growthwebsites.ca@gmail.com" className="text-black font-bold hover:underline">growthwebsites.ca@gmail.com</a></p>
          <p>Ou appelez-nous au <a href="tel:+14383651338" className="text-black font-bold hover:underline">+1 (438) 365-1338</a></p>
        </div>
      </div>

      {/* PLANS SECTION */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-20"
        >
          <h2 className="text-2xl font-bold mb-10 text-black">2. Sélectionnez votre forfait</h2>
          <div className="flex justify-center gap-10 flex-wrap px-6">
            {/* PLAN 1 */}
            <div className="bg-white text-black w-[320px] p-10 rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Forfait de départ</h2>
              <h1 className="text-[46px] font-bold">$500</h1>
              <p className="text-gray-500">Frais de configuration</p>
              <p className="mt-2.5 text-[18px] font-medium">$99/mois après configuration</p>

              <hr className="my-6 border-gray-200" />

              <ul className="text-left leading-[2] mb-8">
                <li>✔ Site web personnalisé</li>
                <li>✔ Hébergement inclus</li>
                <li>✔ Maintenance mensuelle</li>
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
                  <span>J'accepte l' <a href="#service" onClick={(e) => { e.preventDefault(); window.location.hash = "service"; onViewAgreement(); }} className="text-blue-600 hover:underline">Accord de service</a></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed1.payment}
                    onChange={(e) => setAgreed1({ ...agreed1, payment: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>J'accepte l' <a href="#payment" onClick={(e) => { e.preventDefault(); window.location.hash = "payment"; onViewAgreement(); }} className="text-blue-600 hover:underline">Accord de paiement</a></span>
                </label>
              </div>

              {/* $500 SETUP PAYMENT */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                <input type="hidden" name="cmd" value="_xclick" />
                <input type="hidden" name="business" value="harrison.bucknell@gmail.com" />
                <input type="hidden" name="item_name" value="Website Setup Fee" />
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
                  Payer 500 $ de configuration
                </button>
              </form>

              <p className="mt-4 text-[14px] text-gray-400">
                Après la configuration, vous activerez le forfait à 99 $/mois
              </p>
            </div>

            {/* PLAN 2 */}
            <div className="bg-white text-black w-[320px] p-10 rounded-[14px] shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100">
              <h2 className="text-xl font-bold mb-4">Forfait Croissance</h2>
              <h1 className="text-[46px] font-bold">$0</h1>
              <p className="text-gray-500">Configuration</p>
              <p className="mt-2.5 text-[18px] font-medium">$150/mois</p>

              <hr className="my-6 border-gray-200" />

              <ul className="text-left leading-[2] mb-8">
                <li>✔ Site web premium</li>
                <li>✔ Hébergement inclus</li>
                <li>✔ Mises à jour illimitées</li>
                <li>✔ Support prioritaire</li>
              </ul>

              <div className="text-left mb-6 space-y-3">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed2.service}
                    onChange={(e) => setAgreed2({ ...agreed2, service: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>J'accepte l' <a href="#service" onClick={(e) => { e.preventDefault(); window.location.hash = "service"; onViewAgreement(); }} className="text-blue-600 hover:underline">Accord de service</a></span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600">
                  <input 
                    type="checkbox" 
                    checked={agreed2.payment}
                    onChange={(e) => setAgreed2({ ...agreed2, payment: e.target.checked })}
                    className="mt-1" 
                  />
                  <span>J'accepte l' <a href="#payment" onClick={(e) => { e.preventDefault(); window.location.hash = "payment"; onViewAgreement(); }} className="text-blue-600 hover:underline">Accord de paiement</a></span>
                </label>
              </div>

              {/* SUBSCRIPTION */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post">
                <input type="hidden" name="cmd" value="_xclick-subscriptions" />
                <input type="hidden" name="business" value="harrison.bucknell@gmail.com" />
                <input type="hidden" name="item_name" value="Growth Website Plan" />
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
                  Démarrer à 150 $ / mois
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      <p className="mt-10 text-gray-500">
        Paiement sécurisé propulsé par PayPal
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
            <Hero onGetStarted={handleGetStarted} onScrollToSection={scrollToSection} />
            <ContactSection />
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

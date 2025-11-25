import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Users, Globe, TrendingUp, Star, Zap, Shield, Play, Layers, Clock, Award } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ModeToggle } from "@/components/mode-toggle";

const LandingPage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  
  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border/40 supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="text-2xl font-bold tracking-tighter">NEXUS<span className="text-primary">HIRE</span></div>
          </div>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Button variant="ghost" onClick={() => navigate('/dashboard')} className="hidden md:inline-flex">Recruiter Login</Button>
            <Button onClick={() => navigate('/dashboard')} className="rounded-full px-6">Get Started</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            style={{ y: y1 }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80" 
              alt="Modern Office" 
              className="w-full h-full object-cover opacity-20 dark:opacity-10 scale-110"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/80 to-background" />
          
          {/* Floating Orbs */}
          <motion.div 
            animate={{ 
              y: [0, -50, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" 
          />
          <motion.div 
            animate={{ 
              y: [0, 50, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px]" 
          />
        </div>

        <div className="container mx-auto px-6 z-10 relative">
          <motion.div 
            initial="initial"
            animate="animate"
            variants={stagger}
            className="max-w-5xl mx-auto text-center"
          >
            <motion.div variants={fadeIn} className="flex justify-center mb-6">
              <span className="px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20 backdrop-blur-sm">
                ✨ India's #1 Recruitment Platform
              </span>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn}
              className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[1.1]"
            >
              Architecting <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-500 animate-gradient-x">World-Class Teams</span>
            </motion.h1>
            
            <motion.p 
              variants={fadeIn}
              className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              Orchestrate your entire hiring pipeline with a cinematic, data-driven platform designed for high-growth Indian startups and enterprises.
            </motion.p>
            
            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-lg px-10 h-16 rounded-full shadow-2xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:scale-105" onClick={() => navigate('/dashboard')}>
                Start Hiring Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex -space-x-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                    </div>
                  ))}
                </div>
                <p>Trusted by 500+ teams</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating UI Mockup */}
          <motion.div 
            style={{ y: y2 }}
            className="mt-8 relative mx-auto max-w-5xl"
          >
            <div className="rounded-xl border border-border/50 bg-card/50 backdrop-blur-md shadow-2xl overflow-hidden p-2">
              <div className="rounded-lg bg-background border border-border/50 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1661956602116-aa6865609028?auto=format&fit=crop&q=80" 
                  alt="Dashboard Preview" 
                  className="w-full h-auto opacity-90"
                />
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Smooth Gradient Transition */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-b from-transparent via-background/70 to-background pointer-events-none" />
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y border-border/50 bg-muted/20 relative -mt-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Candidates Placed", value: "10k+" },
              { label: "Success Rate", value: "98%" },
              { label: "Time Saved", value: "40%" },
              { label: "Cities Covered", value: "25+" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">How NexusHire Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined process to get you from job post to offer letter in record time.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-border -z-10" />
            
            {[
              {
                icon: <Layers className="h-8 w-8" />,
                title: "1. Create Profile",
                desc: "Define your ideal candidate profile with our AI-assisted job description builder."
              },
              {
                icon: <Users className="h-8 w-8" />,
                title: "2. Smart Match",
                desc: "Our algorithm instantly matches you with pre-vetted candidates from top Indian tech hubs."
              },
              {
                icon: <Award className="h-8 w-8" />,
                title: "3. Hire & Onboard",
                desc: "Seamlessly schedule interviews, send offers, and manage onboarding paperwork."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-background p-8 rounded-3xl border border-border shadow-lg relative"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center mb-6 text-2xl font-bold mx-auto md:mx-0">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 relative bg-muted/30">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Precision at Scale</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Why leading companies choose NexusHire to build their dream teams.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8" />,
                title: "Elite Talent Pool",
                desc: "Access a curated network of top 1% professionals across industries, vetted by AI and human experts."
              },
              {
                icon: <TrendingUp className="h-8 w-8" />,
                title: "Data-Driven Insights",
                desc: "Make decisions based on comprehensive analytics, market trends, and predictive success modeling."
              },
              {
                icon: <Globe className="h-8 w-8" />,
                title: "Pan-India Reach",
                desc: "Hire from Bengaluru, Gurugram, Hyderabad, Pune, and beyond with localized compliance."
              },
              {
                icon: <Zap className="h-8 w-8" />,
                title: "Instant Matching",
                desc: "Our proprietary algorithm matches candidates to your open roles in seconds, not days."
              },
              {
                icon: <Clock className="h-8 w-8" />,
                title: "24/7 Support",
                desc: "Dedicated account managers available round the clock to assist with your hiring needs."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1"
              >
                <div className="mb-6 p-4 bg-primary/10 rounded-2xl w-fit text-primary group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground">Choose the plan that fits your hiring scale.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Startup",
                price: "₹0",
                period: "/month",
                desc: "Perfect for early-stage startups hiring their first 5 employees.",
                features: ["5 Active Jobs", "Basic Candidate Search", "Email Support"]
              },
              {
                name: "Growth",
                price: "₹15,000",
                period: "/month",
                desc: "For growing teams scaling their operations rapidly.",
                features: ["Unlimited Jobs", "Advanced AI Matching", "Priority Support", "Custom Branding"],
                popular: true
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "",
                desc: "Tailored solutions for large organizations with complex needs.",
                features: ["Dedicated Account Manager", "API Access", "SLA Support", "On-premise Deployment"]
              }
            ].map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative p-8 rounded-3xl border ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10' : 'border-border'} bg-card flex flex-col`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground mb-8">{plan.desc}</p>
                <ul className="space-y-4 mb-8 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button variant={plan.popular ? "default" : "outline"} className="w-full rounded-full h-12 text-lg">
                  Choose {plan.name}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1638262052640-82e94d64664a?auto=format&fit=crop&q=80" 
            alt="Handshake" 
            className="w-full h-full object-cover opacity-20 dark:opacity-10"
          />
          <div className="absolute inset-0 bg-primary/90 mix-blend-multiply dark:bg-primary/20 dark:mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">Ready to Transform Your Hiring?</h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-2xl mx-auto">
              Join thousands of companies finding their next unicorn with NexusHire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="text-lg px-12 h-16 rounded-full shadow-2xl hover:scale-105 transition-transform"
                onClick={() => navigate('/dashboard')}
              >
                Get Started for Free
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-12 h-16 rounded-full bg-background/50 backdrop-blur-md hover:bg-background/80"
              >
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border bg-muted/10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="text-2xl font-bold mb-4">NEXUS<span className="text-primary">HIRE</span></div>
              <p className="text-muted-foreground">The future of recruitment is here.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Features</li>
                <li>Pricing</li>
                <li>Enterprise</li>
                <li>Case Studies</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
                <li>Security</li>
              </ul>
            </div>
          </div>
          <div className="text-center text-muted-foreground pt-8 border-t border-border/50">
            <p>&copy; 2025 NexusHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  Globe,
  Star,
  CheckCircle,
  Smartphone,
  CreditCard,
  TrendingUp,
  Lock,
  HeadphonesIcon,
  Clock,
  Wallet,
  SendHorizontal,
  Receipt,
  BarChart3,
  Play,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const features = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Bank-Level Security",
      description: "256-bit encryption, multi-factor authentication, and advanced fraud protection keep your money safe.",
      highlight: true
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "Instant Transfers",
      description: "Send money anywhere in seconds with our lightning-fast payment infrastructure.",
      highlight: false
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-600" />,
      title: "Mobile First",
      description: "Fully responsive design works seamlessly across all your devices and platforms.",
      highlight: false
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Reach",
      description: "Send and receive money across 45+ countries with competitive exchange rates.",
      highlight: true
    }
  ];

  const stats = [
    { number: "2.5M+", label: "Active Users", icon: <Users className="w-6 h-6" /> },
    { number: "$50B+", label: "Transacted", icon: <TrendingUp className="w-6 h-6" /> },
    { number: "45+", label: "Countries", icon: <Globe className="w-6 h-6" /> },
    { number: "99.9%", label: "Uptime", icon: <Clock className="w-6 h-6" /> }
  ];

  const services = [
    {
      icon: <Wallet className="w-12 h-12 text-primary" />,
      title: "Personal Wallet",
      description: "Manage your daily expenses, save money, and track spending with powerful analytics.",
      features: ["Expense tracking", "Savings goals", "Bill reminders", "Budget insights"]
    },
    {
      icon: <SendHorizontal className="w-12 h-12 text-primary" />,
      title: "Money Transfer",
      description: "Send money to friends, family, or businesses instantly with just their phone number.",
      features: ["Instant transfers", "QR code payments", "Split bills", "Payment requests"]
    },
    {
      icon: <CreditCard className="w-12 h-12 text-primary" />,
      title: "Agent Network",
      description: "Cash in and cash out through our extensive network of verified agents nationwide.",
      features: ["Nationwide coverage", "24/7 availability", "Verified agents", "Competitive rates"]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1494790108755-2616b9a1d78a?w=400&h=400&fit=crop&crop=face",
      content: "This wallet has transformed how I manage my business payments. The agent network makes cash flow management so much easier.",
      rating: 5
    },
    {
      name: "Ahmed Hassan",
      role: "Freelancer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      content: "I love how secure and fast the transfers are. My clients can pay me instantly, and I can access my money through agents anywhere.",
      rating: 5
    },
    {
      name: "Maria Rodriguez",
      role: "Student",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      content: "Perfect for managing my student budget. The spending insights help me save money, and sending money to family is super easy.",
      rating: 5
    }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Sign Up",
      description: "Create your account in minutes with just your phone number and basic information.",
      icon: <Smartphone className="w-8 h-8" />
    },
    {
      step: "02",
      title: "Verify Identity",
      description: "Complete quick verification to ensure security and unlock all features.",
      icon: <Shield className="w-8 h-8" />
    },
    {
      step: "03",
      title: "Add Money",
      description: "Visit any agent or use bank transfer to load money into your wallet.",
      icon: <Wallet className="w-8 h-8" />
    },
    {
      step: "04",
      title: "Start Transacting",
      description: "Send money, pay bills, or make purchases with complete peace of mind.",
      icon: <SendHorizontal className="w-8 h-8" />
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 pt-8 pb-16 lg:pt-16 lg:pb-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center lg:text-left"
            >
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20" variant="outline">
                🚀 Trusted by 2.5M+ Users Worldwide
              </Badge>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Your Digital Wallet for
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {" "}Modern Life
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Send money, pay bills, and manage finances with the most secure and user-friendly 
                digital wallet. Join millions who trust us with their financial future.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Get Started Free
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="#demo" className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Watch Demo
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Free to join</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Bank-level security</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>24/7 support</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative z-10 bg-gradient-to-br from-white to-gray-50 p-8 rounded-3xl shadow-2xl border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Wallet Dashboard</h3>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Live</Badge>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-4 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                    <p className="text-3xl font-bold text-primary">$2,847.50</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background p-4 rounded-xl border">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-sm font-medium">Income</span>
                      </div>
                      <p className="text-xl font-bold">$3,240</p>
                    </div>
                    <div className="bg-background p-4 rounded-xl border">
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium">Expenses</span>
                      </div>
                      <p className="text-xl font-bold">$1,425</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium mb-3">Quick Actions</h4>
                    <div className="grid grid-cols-3 gap-2">
                      <Button size="sm" className="flex-col h-auto py-3">
                        <SendHorizontal className="w-4 h-4 mb-1" />
                        Send
                      </Button>
                      <Button size="sm" variant="outline" className="flex-col h-auto py-3">
                        <Wallet className="w-4 h-4 mb-1" />
                        Request
                      </Button>
                      <Button size="sm" variant="outline" className="flex-col h-auto py-3">
                        <BarChart3 className="w-4 h-4 mb-1" />
                        Analytics
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-4 -right-4 bg-green-100 p-3 rounded-full shadow-lg"
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                className="absolute -bottom-4 -left-4 bg-blue-100 p-3 rounded-full shadow-lg"
              >
                <Shield className="w-6 h-6 text-blue-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center text-primary-foreground"
              >
                <div className="flex justify-center mb-2">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4" variant="outline">Core Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Digital Wallet?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the perfect blend of security, speed, and simplicity in one powerful platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className={`h-full text-center border-0 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  feature.highlight ? 'ring-2 ring-primary/20 bg-primary/5' : ''
                }`}>
                  <CardContent className="p-6">
                    <div className="flex justify-center mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                    {feature.highlight && (
                      <Badge className="mt-3" variant="secondary">Most Popular</Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 lg:py-24 bg-primary-foreground">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4" variant="outline">Our Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Complete Financial Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From personal banking to business payments, we've got all your financial needs covered.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-center mb-4">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-center">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 lg:py-24">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4" variant="outline">Getting Started</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes with our simple and secure onboarding process.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-sm font-bold w-8 h-8 rounded-full flex items-center justify-center">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-4 w-8">
                    <ArrowRight className="w-6 h-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 lg:py-24 bg-primary-foreground">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge className="mb-4" variant="outline">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of satisfied customers who trust our platform every day.
            </p>
          </motion.div>

          <div className="relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <Card className="border-0 shadow-sm">
                <CardContent className="p-8">
                  <Quote className="w-8 h-8 text-primary mx-auto mb-6" />
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonials[currentTestimonial].content}"
                  </p>
                  <div className="flex items-center justify-center gap-4">
                    <img
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <p className="font-semibold">{testimonials[currentTestimonial].name}</p>
                      <p className="text-sm text-muted-foreground">{testimonials[currentTestimonial].role}</p>
                    </div>
                  </div>
                  <div className="flex justify-center gap-1 mt-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <div className="flex justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={prevTestimonial}
                className="rounded-full"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <div className="flex gap-2 items-center">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted'
                    }`}
                    onClick={() => setCurrentTestimonial(index)}
                  />
                ))}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={nextTestimonial}
                className="rounded-full"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-16">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4" variant="outline">Trust & Security</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Money, Your Security
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We employ the same security standards used by major banks and financial institutions 
                to protect your money and personal information.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Lock className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="font-semibold">256-bit SSL</div>
                  <div className="text-sm text-muted-foreground">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="font-semibold">PCI DSS</div>
                  <div className="text-sm text-muted-foreground">Certified</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <HeadphonesIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="font-semibold">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <CheckCircle className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="font-semibold">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>

              <Button size="lg" variant="outline" asChild>
                <Link to="/about" className="flex items-center gap-2">
                  Learn More About Security
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl">
                <div className="space-y-4">
                  {[
                    "Multi-factor authentication protects your account",
                    "Real-time fraud monitoring and alerts",
                    "Encrypted data storage and transmission",
                    "Regular security audits and compliance checks",
                    "Secure agent verification process"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-primary/80">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-primary-foreground"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Financial Life?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join millions of users who have already made the switch to smarter, safer digital payments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/register" className="flex items-center gap-2">
                  Get Started Now - It's Free
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8" asChild>
                <Link to="/features">Explore Features</Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-8 mt-8 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>Instant setup</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                <span>24/7 support</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-12 bg-background">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="text-2xl font-semibold mb-4">
              Still have questions?
            </h3>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you get started and answer any questions you might have.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/faqs">View FAQs</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
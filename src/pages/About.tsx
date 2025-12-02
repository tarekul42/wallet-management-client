import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Users,
  Globe,
  Trophy,
  Heart,
  Target,
  Zap,
  Award,
  CheckCircle,
  ArrowRight,
  Linkedin,
  Github,
  Mail,
} from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const About = () => {
  const stats = [
    {
      label: "Active Users",
      value: "2.5M+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Transactions Daily",
      value: "50K+",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      label: "Countries Served",
      value: "45+",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      label: "Security Rating",
      value: "99.9%",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  const values = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Security First",
      description:
        "Bank-level encryption and multi-layer security protocols protect every transaction and user data.",
    },
    {
      icon: <Heart className="w-8 h-8 text-red-500" />,
      title: "User-Centric",
      description:
        "Every feature is designed with user experience in mind, making financial management intuitive and accessible.",
    },
    {
      icon: <Target className="w-8 h-8 text-green-600" />,
      title: "Innovation",
      description:
        "Constantly evolving with cutting-edge technology to provide the most advanced digital wallet experience.",
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Reach",
      description:
        "Breaking down financial barriers to enable seamless transactions across borders and currencies.",
    },
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Co-Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b9a1d78a?w=400&h=400&fit=crop&crop=face",
      bio: "Former Goldman Sachs executive with 15+ years in fintech innovation.",
      social: {
        linkedin: "#",
        github: "#",
        email: "sarah@walletmanagement.com",
      },
    },
    {
      name: "Marcus Rodriguez",
      role: "CTO & Co-Founder",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Former Google engineer specializing in blockchain and security architecture.",
      social: {
        linkedin: "#",
        github: "#",
        email: "marcus@walletmanagement.com",
      },
    },
    {
      name: "Priya Patel",
      role: "Head of Product",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Product strategy expert with experience at Stripe and Square in payment solutions.",
      social: {
        linkedin: "#",
        github: "#",
        email: "priya@walletmanagement.com",
      },
    },
    {
      name: "James Wilson",
      role: "Head of Security",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Cybersecurity specialist with expertise in financial systems and compliance.",
      social: {
        linkedin: "#",
        github: "#",
        email: "james@walletmanagement.com",
      },
    },
  ];

  const milestones = [
    {
      year: "2019",
      title: "Company Founded",
      description: "Started with a vision to democratize financial services",
    },
    {
      year: "2020",
      title: "First Million Users",
      description: "Reached 1M users within the first year of launch",
    },
    {
      year: "2021",
      title: "Series A Funding",
      description: "Secured $25M in Series A funding from leading VCs",
    },
    {
      year: "2022",
      title: "Global Expansion",
      description: "Expanded to 25+ countries across 4 continents",
    },
    {
      year: "2023",
      title: "Agent Network Launch",
      description: "Launched agent network for cash-in/cash-out services",
    },
    {
      year: "2024",
      title: "Advanced Features",
      description: "Introduced multi-currency support and business accounts",
    },
  ];

  const achievements = [
    "ISO 27001 Certified Security",
    "PCI DSS Level 1 Compliance",
    "SOC 2 Type II Certified",
    "GDPR Compliant",
    "FinCEN Registered MSB",
  ];

  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-primary/5 py-16 lg:py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-6"
            >
              <Badge className="mx-auto w-fit" variant="outline">
                About Wallet Management
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Revolutionizing Digital Finance
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We're building the future of digital payments with secure,
                accessible, and innovative financial solutions that empower
                individuals and businesses worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link to="/register">Join Our Mission</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-3 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-foreground">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4" variant="outline">
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Democratizing Financial Access for Everyone
                </h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Our mission is to create an inclusive financial ecosystem
                  where anyone, anywhere can access secure, fast, and affordable
                  digital payment solutions. We believe that financial services
                  should be a right, not a privilege.
                </p>
                <div className="space-y-3">
                  {[
                    "Provide secure, user-friendly digital wallet solutions",
                    "Enable financial inclusion for underserved communities",
                    "Foster economic growth through innovative payment technology",
                    "Build trust through transparency and security",
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 rounded-2xl"
              >
                <Badge className="mb-4" variant="outline">
                  Our Vision
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  A World Without Financial Barriers
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  We envision a future where geographical boundaries,
                  traditional banking limitations, and economic disparities no
                  longer prevent people from participating in the global
                  economy.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-primary" />
                    <span className="font-medium">
                      Industry Leadership in Security & Innovation
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Globe className="w-6 h-6 text-primary" />
                    <span className="font-medium">
                      Global Reach with Local Understanding
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-primary" />
                    <span className="font-medium">
                      Empowering 100M+ Users by 2030
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge className="mb-4" variant="outline">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What Drives Us Forward
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our core values shape every decision we make and every feature
                we build.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full text-center border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-center mb-4">
                        {value.icon}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline">
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Meet the Innovators Behind the Platform
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our diverse team of experts brings together decades of
                experience in fintech, security, and user experience.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="text-center border-0 shadow-sm hover:shadow-md transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-primary/10">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xl font-semibold mb-1">
                        {member.name}
                      </h3>
                      <Badge variant="secondary" className="mb-3">
                        {member.role}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {member.bio}
                      </p>
                      <div className="flex justify-center gap-3">
                        <Button size="icon" variant="ghost" className="w-8 h-8">
                          <Linkedin className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-8 h-8">
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="w-8 h-8">
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Journey/Timeline Section */}
        <section className="py-16 bg-muted/50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <Badge className="mb-4" variant="outline">
                Our Journey
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Milestones That Shaped Our Growth
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From a startup idea to a global fintech platform, here's how
                we've evolved over the years.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-l-4 border-l-primary border-t-0 border-r-0 border-b-0 rounded-l-none shadow-sm">
                    <CardContent className="p-6">
                      <Badge variant="secondary" className="mb-3">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {milestone.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications & Achievements */}
        <section className="py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Badge className="mb-4" variant="outline">
                  Trust & Security
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Certified for Your Peace of Mind
                </h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We maintain the highest industry standards for security,
                  compliance, and data protection. Your trust is our foundation,
                  and these certifications prove our commitment.
                </p>

                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-center gap-3"
                    >
                      <Award className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="font-medium">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  {
                    icon: <Shield className="w-8 h-8" />,
                    title: "Bank-Level Security",
                    desc: "256-bit encryption",
                  },
                  {
                    icon: <Users className="w-8 h-8" />,
                    title: "2.5M+ Users",
                    desc: "Trusted worldwide",
                  },
                  {
                    icon: <Globe className="w-8 h-8" />,
                    title: "45+ Countries",
                    desc: "Global presence",
                  },
                  {
                    icon: <Trophy className="w-8 h-8" />,
                    title: "99.9% Uptime",
                    desc: "Always available",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className="text-center p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-center text-primary mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </Card>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary/80">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-primary-foreground"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Join Our Financial Revolution?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Experience the future of digital payments with security,
                simplicity, and innovation at its core.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register" className="flex items-center gap-2">
                    Get Started Today
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                  asChild
                >
                  <Link to="/features">Explore Features</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default About;

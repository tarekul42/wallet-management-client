import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  ShieldCheck,
  Zap,
  Clock,
  Info,
  CheckCircle2,
  ThumbsUp,
  Wallet,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAppSelector } from "@/redux/hook";
import { useGetServiceByIdQuery, useGetRelatedServicesQuery } from "@/redux/features/services/services.api";

const ServiceDetails = () => {
  const { id } = useParams();
  const { token } = useAppSelector((state) => state.auth);
  const { data: serviceRes, isLoading } = useGetServiceByIdQuery(id || "");
  const { data: relatedRes } = useGetRelatedServicesQuery(id || "", { skip: !id });

  const service = serviceRes?.data;
  const relatedServices = relatedRes?.data ?? [];

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-8 w-32 mb-8" />
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <Skeleton className="h-[400px] w-full rounded-xl" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Service not found</h2>
          <Button asChild>
            <Link to="/explore">Back to Explore</Link>
          </Button>
        </div>
      </div>
    );
  }

  const reviews = service.reviews || [];
  const securityFeatures = [
    "End-to-end encryption",
    "Multi-factor authentication",
    "Fraud protection",
    "24/7 Monitoring",
  ];
  const whyUse = [
    "Zero hidden fees",
    "Instant processing",
    "Tax-ready receipts",
    "Loyalty rewards",
  ];

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Button
          variant="ghost"
          asChild
          className="mb-8 gap-2 hover:gap-3 transition-all"
        >
          <Link to="/explore">
            <ArrowLeft className="h-4 w-4" />
            Back to Explore
          </Link>
        </Button>

        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="relative h-[400px] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-6 left-6 text-lg py-1 px-4">
                  {service.category}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <h1 className="text-4xl md:text-5xl font-bold">
                  {service.title}
                </h1>
                <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full font-bold">
                  <Star className="h-5 w-5 fill-current" />
                  {service.rating} ({reviews.length}+ Reviews)
                </div>
              </div>

              <div className="flex flex-wrap gap-6 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  {service.location}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {service.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Processing: Instant
                </div>
              </div>

              <div className="prose prose-lg max-w-none">
                <h3 className="text-2xl font-bold mb-4">Service Description</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {service.description}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 bg-muted/30 shadow-none p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    Security Features
                  </h4>
                  <ul className="space-y-3">
                    {securityFeatures.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
                <Card className="border-0 bg-muted/30 shadow-none p-6 rounded-xl">
                  <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Why use this?
                  </h4>
                  <ul className="space-y-3">
                    {whyUse.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>

              {reviews.length > 0 && (
                <div className="pt-12">
                  <h3 className="text-2xl font-bold mb-8">Customer Reviews</h3>
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <Card key={review._id} className="border-0 bg-muted/30 shadow-none p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar}
                            alt={review.name}
                            className="w-12 h-12 rounded-full bg-primary/10"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                              <div>
                                <h4 className="font-bold">{review.name}</h4>
                                <p className="text-xs text-muted-foreground">{review.role}</p>
                              </div>
                              <div
                                className="flex items-center gap-1"
                                role="img"
                                aria-label={`${review.rating} out of 5 stars`}
                              >
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < review.rating
                                        ? "text-primary fill-primary"
                                        : "text-muted-foreground/30"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                              {review.content}
                            </p>
                            <div className="flex items-center gap-4 mt-4 text-xs text-muted-foreground">
                              <span>{review.date}</span>
                              <span className="flex items-center gap-1">
                                <ThumbsUp className="h-3 w-3" /> Helpful
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {relatedServices.length > 0 && (
                <div className="pt-12">
                  <h3 className="text-2xl font-bold mb-8">Related Services</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {relatedServices.map((item) => (
                      <Card
                        key={item._id}
                        className="overflow-hidden shadow-sm group"
                      >
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-4">
                          <h4 className="font-bold mb-2">{item.title}</h4>
                          <Button
                            variant="link"
                            asChild
                            className="p-0 h-auto text-primary"
                          >
                            <Link to={`/explore/${item._id}`}>View Details</Link>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-24"
            >
              <Card className="overflow-hidden">
                <div className="bg-primary p-6 text-primary-foreground">
                  <p className="text-sm opacity-80 mb-1">Price starts at</p>
                  <h3 className="text-4xl font-bold">{service.price}</h3>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Service Fee</span>
                      <span className="font-medium text-primary">FREE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Tax (approx.)
                      </span>
                      <span className="font-medium">
                        Calculated at checkout
                      </span>
                    </div>
                    <div className="border-t pt-4 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{service.price}</span>
                    </div>
                  </div>

                  <Button asChild className="w-full h-14 text-lg rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    <Link to={token ? `/checkout/${id}` : "/login"} state={token ? undefined : { from: `/explore/${id}` }}>
                      <Wallet className="h-5 w-5 mr-2" />
                      Pay with Wallet
                    </Link>
                  </Button>

                  <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
                    <Info className="h-3 w-3" />
                    Secure payment processed via Wallet Management API
                  </div>
                </CardContent>
              </Card>

              <div className="mt-8 space-y-4 px-2">
                <h4 className="font-bold">Need Help?</h4>
                <p className="text-sm text-muted-foreground">
                  Our support team is available 24/7 to assist you with this
                  service.
                </p>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/support">Contact Support</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

import { testimonials } from "@/assets/data/Home/testimonials";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const handleImgError = (index: number) => {
    setImgErrors((prev) => ({ ...prev, [index]: true }));
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="outline">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our Users Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of satisfied customers who trust our platform.
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
            <div className="p-8">
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed italic">
                &ldquo;{testimonials[currentTestimonial].content}&rdquo;
              </p>

              <div className="flex items-center justify-center gap-4 mb-4">
                {imgErrors[currentTestimonial] ? (
                  <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
                    {getInitials(testimonials[currentTestimonial].name)}
                  </div>
                ) : (
                  <img
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-11 h-11 rounded-full object-cover"
                    onError={() => handleImgError(currentTestimonial)}
                  />
                )}
                <div className="text-left">
                  <p className="font-semibold text-sm">
                    {testimonials[currentTestimonial].name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {testimonials[currentTestimonial].role}
                  </p>
                </div>
              </div>

              <div className="flex justify-center gap-0.5">
                {[...Array(testimonials[currentTestimonial].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  )
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex justify-center gap-4 mt-2">
            <Button
              variant="outline"
              size="icon"
              onClick={prevTestimonial}
              className="rounded-full h-9 w-9"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2 items-center">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentTestimonial ? "bg-primary" : "bg-muted"
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={nextTestimonial}
              className="rounded-full h-9 w-9"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

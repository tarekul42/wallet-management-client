import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Calendar,
  ArrowRight,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { exploreServices } from "@/assets/data/exploreServices";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("rating");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 4;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const categories = [
    "All",
    ...new Set(exploreServices.map((s) => s.category)),
  ];

  const filteredItems = useMemo(() => {
    return exploreServices
      .filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory =
          selectedCategory === "All" || item.category === selectedCategory;
        const matchesRating = item.rating >= minRating;
        return matchesSearch && matchesCategory && matchesRating;
      })
      .sort((a, b) => {
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "title") return a.title.localeCompare(b.title);
        return 0;
      });
  }, [searchTerm, selectedCategory, sortBy]);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const ServiceSkeleton = () => (
    <Card className="h-full flex flex-col overflow-hidden border-0 shadow-md">
      <Skeleton className="h-48 w-full" />
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between mb-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="p-5 pt-0 flex-1">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-4" />
        <Skeleton className="h-3 w-24" />
      </CardContent>
      <CardFooter className="p-5 pt-0 border-t mt-auto bg-muted/20">
        <div className="flex justify-between w-full mt-4">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardFooter>
    </Card>
  );

  return (
    <div className="min-h-screen pt-20 pb-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">Explore Services</h1>
            <p className="text-muted-foreground">
              Find and pay for services directly from your wallet.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search services..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filters & Sorting */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center gap-2 bg-background p-1 rounded-lg border shadow-sm overflow-x-auto no-scrollbar max-w-full">
            <Filter className="h-4 w-4 ml-2 text-muted-foreground shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-background border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              value={minRating}
              onChange={(e) => { setMinRating(Number(e.target.value)); setCurrentPage(1); }}
            >
              <option value={0}>Any Rating</option>
              <option value={3}>3+ Stars</option>
              <option value={4}>4+ Stars</option>
              <option value={4.5}>4.5+ Stars</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
            <select
              className="bg-background border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-primary/20"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="rating">Top Rated</option>
              <option value="title">Alphabetical</option>
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => <ServiceSkeleton key={i} />)
          ) : (
            <AnimatePresence mode="popLayout">
              {paginatedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-md group">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background">
                        {item.category}
                      </Badge>
                    </div>
                    <CardHeader className="p-5 pb-2">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="h-4 w-4 fill-current" />
                          <span className="text-sm font-bold">
                            {item.rating}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                          <MapPin className="h-3 w-3" />
                          {item.location}
                        </div>
                      </div>
                      <CardTitle className="text-xl line-clamp-1">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-5 pt-0 flex-1">
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground font-medium">
                        <Calendar className="h-3 w-3" />
                        {item.date}
                      </div>
                    </CardContent>
                    <CardFooter className="p-5 pt-0 border-t mt-auto bg-muted/20">
                      <div className="flex items-center justify-between w-full mt-4">
                        <span className="font-bold text-primary">
                          {item.price}
                        </span>
                        <Button
                          size="sm"
                          asChild
                          variant="ghost"
                          className="gap-1 group/btn"
                        >
                          <Link to={`/explore/${item.id}`}>
                            View Details
                            <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Empty State */}
        {!isLoading && filteredItems.length === 0 && (
          <div className="text-center py-20 bg-background rounded-2xl border shadow-sm">
            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No services found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
            >
              Clear all filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-all ${
                      currentPage === page
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-background border hover:bg-muted"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, MapPin, Camera, Save, Loader2, Lock, CalendarDays, BadgeCheck } from "lucide-react";
import { Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/user/user.api";
import DashboardShell from "@/components/modules/Dashboard/DashboardShell";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import type { IUserProfile } from "@/types/api";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { data: profileRes, isLoading, isError: hasError } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const profileUser = profileRes?.data ?? authUser as unknown as IUserProfile;

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (profileUser) {
      form.reset({
        name: profileUser.name || "",
        email: profileUser.email || "",
        phone: profileUser.phone || "",
        address: profileUser.address || "",
      });
    }
  }, [profileUser, form]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile({ name: data.name, phone: data.phone, address: data.address }).unwrap();
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  const memberSince = profileUser?.createdAt
    ? new Date(profileUser.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "N/A";

  const avatarSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${profileUser?.name || "User"}`;

  const profileSkeleton = (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="space-y-6">
        <Card>
          <CardContent className="p-0">
            <Skeleton className="h-24 w-full rounded-t-xl" />
            <div className="flex flex-col items-center -mt-10 pb-6 px-6">
              <Skeleton className="w-20 h-20 rounded-full mb-4" />
              <Skeleton className="h-5 w-32 mb-2" />
              <Skeleton className="h-4 w-20 mb-3" />
              <Skeleton className="h-5 w-28 rounded-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><Skeleton className="h-4 w-28" /></CardHeader>
          <CardContent className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-10 w-36" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <DashboardShell
      title="Account Profile"
      subtitle="Manage your personal information and account settings."
      isLoading={isLoading}
      hasError={hasError}
      skeleton={profileSkeleton}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-border/70 shadow-sm">
            <CardContent className="p-0">
              <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5" />
              <div className="flex flex-col items-center -mt-10 pb-6 px-6">
                <div className="relative group mb-4">
                  <div className="w-20 h-20 rounded-full border-4 border-background bg-muted overflow-hidden shadow-md">
                    <img
                      src={avatarSrc}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-neutral-950/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Camera className="h-5 w-5" />
                  </button>
                </div>
                <h3 className="text-lg font-bold">{profileUser?.name || "User"}</h3>
                <p className="text-sm text-muted-foreground mb-3">{profileUser?.role || "USER"}</p>
                <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/15 gap-1">
                  <BadgeCheck className="h-3 w-3" />
                  Verified Account
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-2">
                  <CalendarDays className="h-3.5 w-3.5" />
                  Member Since
                </span>
                <span className="font-medium">{memberSince}</span>
              </div>
              <hr className="border-border/70" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">Trust Score</span>
                <span className="font-semibold text-success">98/100</span>
              </div>
              <hr className="border-border/70" />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground flex items-center gap-1.5">Two-Factor Auth</span>
                <Badge variant="outline" className="text-xs text-muted-foreground font-normal">
                  N/A
                </Badge>
              </div>
              <hr className="border-border/70" />
              <Link to={profileUser?.role === "ADMIN" ? "/dashboard/admin/profile/security" : profileUser?.role === "AGENT" ? "/dashboard/agent/profile/security" : "/dashboard/user/profile/security"}>
                <Button variant="outline" size="sm" className="w-full gap-2 mt-1">
                  <Lock className="h-3.5 w-3.5" />
                  Change Password
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <Card className="border-border/70 shadow-sm">
            <CardHeader>
              <CardTitle className="text-xl">Personal Information</CardTitle>
              <CardDescription>
                Update your contact details and address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} disabled />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Address</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-9" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <hr className="border-border/70" />

                  <div className="flex justify-end gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button type="submit" className="gap-2" disabled={isSaving}>
                      {isSaving ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                      ) : (
                        <><Save className="h-4 w-4" /> Save Changes</>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
};

export default Profile;

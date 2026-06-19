import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Phone, MapPin, Camera, Info, Save, Loader2, Lock as LockIcon, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { useAppSelector } from "@/redux/hook";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/redux/features/user/user.api";
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
import { toast } from "sonner";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Invalid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user: authUser } = useAppSelector((state) => state.auth);
  const { data: profileRes, isError: profileError } = useGetProfileQuery();
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const profileUser = (profileRes?.data as Record<string, unknown> | undefined) ?? authUser;

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
        name: (profileUser?.name as string) || "",
        email: (profileUser?.email as string) || "",
        phone: (profileUser?.phone as string) || "",
        address: (profileUser?.address as string) || "",
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
    ? new Date(profileUser.createdAt as string).toLocaleDateString("en-US", { month: "long", year: "numeric" })
    : "N/A";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {profileError && (
        <div className="p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
          Failed to load profile data. Showing cached information.
        </div>
      )}
      <div>
        <h1 className="text-3xl font-bold">Account Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and account settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Quick Info */}
        <div className="space-y-6">
          <Card className="shadow-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="h-32 bg-primary/10 relative">
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full border-4 border-background bg-muted overflow-hidden">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${(profileUser?.name as string) || "User"}`}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute inset-0 flex items-center justify-center bg-neutral-950/60 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="h-6 w-6" />
                    </button>
                  </div>
                </div>
                <div className="pt-16 pb-6 px-6 text-center">
                  <h3 className="text-xl font-bold">{(profileUser?.name as string) || "User"}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{(profileUser?.role as string) || "USER"}</p>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Verified Account
                </Badge>
              </div>
            </div>
            </CardContent>
          </Card>


          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground">
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-medium">{memberSince}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Trust Score</span>
                <span className="font-medium text-green-600">98/100</span>
              </div>
              <div className="flex justify-between text-sm items-center">
                <span className="text-muted-foreground">2FA</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 text-xs"
                  disabled
                  title="Coming soon"
                >
                  <Info className="h-3 w-3 mr-1" /> N/A
                </Button>
              </div>
              <div className="pt-2">
                <Link to={profileUser?.role === "ADMIN" ? "/dashboard/admin/profile/security" : profileUser?.role === "AGENT" ? "/dashboard/agent/profile/security" : "/dashboard/user/profile/security"}>
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <LockIcon className="h-3 w-3 mr-1" /> Change Password
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Edit Form */}
        <div className="md:col-span-2">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your contact details and address.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" {...field} />
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
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" {...field} readOnly />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" {...field} />
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
                              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input className="pl-10" {...field} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button type="submit" className="gap-2" disabled={isLoading}>
                      {isLoading ? (
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
    </div>
  );
};

export default Profile;

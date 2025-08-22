import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  message: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const ContactForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("Message has been sent successfully");
    console.log(data);
  }

  return (
    <>
      <section className="w-full">
        <div className="flex h-full items-center justify-center">
          <div className="flex flex-col items-center gap-6 lg:justify-start">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="min-w-sm min-h-full border-primary-foreground bg-background w-full gap-y-4 rounded-md border px-6 py-8 shadow-md"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input
                          type="name"
                          placeholder="Your Name"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Your Email"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your Email.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Input
                          type="phone"
                          placeholder="Your Phone"
                          className="w-full"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        This is your public phone number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel />
                      <FormControl>
                        <Textarea
                          placeholder="Your Message"
                          className="resize-none bg-background"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="sr-only">
                        You can <span>@mention</span> other users and
                        organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full mt-4">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};

export { ContactForm };

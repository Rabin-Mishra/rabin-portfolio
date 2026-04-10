"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to send message");

      setStatus("success");
      reset();
      
      // Reset back to idle after 10s so they can send another if they need
      setTimeout(() => setStatus("idle"), 10000);
    } catch (error) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-surface border border-border rounded-xl text-center min-h-[400px]">
        <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-8 h-8 text-green-500" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-textMuted mb-8">Thank you for reaching out. I'll get back to you within 24 hours.</p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="rounded-full">
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-surface p-6 md:p-8 rounded-xl border border-border">
      {status === "error" && (
        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-3 text-red-500 text-sm">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p>Failed to send message. Please try again later or email me directly.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-textPrimary">Your Name</label>
          <Input id="name" placeholder="John Doe" {...register("name")} className={errors.name ? "border-red-500" : ""} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-textPrimary">Email Address</label>
          <Input id="email" type="email" placeholder="john@example.com" {...register("email")} className={errors.email ? "border-red-500" : ""} />
          {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-textPrimary">Subject</label>
        <Select id="subject" {...register("subject")} className={errors.subject ? "border-red-500 text-textPrimary" : "text-textPrimary"}>
          <option value="">Select a topic...</option>
          <option value="Job Opportunity">Job Opportunity</option>
          <option value="Collaboration">Technical Collaboration</option>
          <option value="Freelance">Freelance Project</option>
          <option value="Just Saying Hi">Just Saying Hi</option>
          <option value="Other">Other</option>
        </Select>
        {errors.subject && <p className="text-xs text-red-500">{errors.subject.message}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-textPrimary">Message</label>
        <Textarea 
          id="message" 
          placeholder="How can we work together...?" 
          rows={6}
          {...register("message")} 
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && <p className="text-xs text-red-500">{errors.message.message}</p>}
      </div>

      <Button type="submit" size="lg" disabled={status === "loading"} className="w-full text-white font-semibold">
        {status === "loading" ? (
          <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Sending...</>
        ) : (
          "Send Message"
        )}
      </Button>
    </form>
  );
}

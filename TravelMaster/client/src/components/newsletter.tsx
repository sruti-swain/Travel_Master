import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const subscribeMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest('POST', '/api/newsletter', { email });
    },
    onSuccess: () => {
      setShowSuccess(true);
      setEmail("");
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    },
    onError: (error: any) => {
      toast({
        title: "Subscription Failed",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email Required",
        description: "Please enter your email address.",
        variant: "destructive"
      });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    subscribeMutation.mutate(email);
  };

  return (
    <section className="newsletter-section section-padding" id="newsletter">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title" style={{ color: 'white' }} data-aos="fade-up">
            Stay Updated
          </h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }} data-aos="fade-up" data-aos-delay="100">
            Subscribe to our newsletter for exclusive deals and travel tips
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
            <div className="row g-3">
              <div className="col-md-8">
                <input
                  type="email"
                  className="newsletter-input"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={subscribeMutation.isPending}
                  required
                />
              </div>
              <div className="col-md-4">
                <button
                  type="submit"
                  className="btn btn-light w-100"
                  style={{ borderRadius: '50px', padding: '1rem' }}
                  disabled={subscribeMutation.isPending}
                >
                  {subscribeMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin me-2"></i>Subscribing...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane me-2"></i>Subscribe
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
          
          {showSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              Thank you for subscribing! You'll receive our latest deals and travel tips.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

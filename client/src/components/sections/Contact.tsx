import React, { useState } from 'react';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  Github,
  Linkedin,
  Terminal,
  Clock,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../../services/api';
import { PersonalInfo, ContactFormData } from '../../types';

interface ContactProps {
  profile: PersonalInfo;
  onShowToast: (msg: string, type?: 'success' | 'error') => void;
}

export const Contact: React.FC<ContactProps> = ({ profile, onShowToast }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      onShowToast('Please fill in your name, email, and message.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await api.sendContactMessage(formData);
      if (response.success) {
        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#00f0ff', '#10b981', '#a855f7', '#ffffff']
          });
        } catch {
          // ignore confetti error if canvas unmounted
        }

        onShowToast(response.message || 'Thank you! Message dispatched successfully.', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        onShowToast('Failed to send message. Please try emailing directly.', 'error');
      }
    } catch {
      onShowToast('An unexpected error occurred. Please contact via email.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
      onShowToast('Email copied to clipboard!', 'success');
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
      onShowToast('Phone number copied to clipboard!', 'success');
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-cyber-bg/80">
      {/* Glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyber-card border border-cyber-cyan/30 text-xs font-mono text-cyber-cyan">
            <MessageSquare size={13} />
            <span>COMMUNICATION CHANNEL // CONTACT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
            Let's Collaborate & Build <br />
            <span className="cyber-gradient-text">Next-Gen Architecture</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 font-sans">
            Ready to discuss DevOps engineering, CI/CD pipeline automation, or Flutter mobile solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Info & Quick Copy (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Contact Card */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyber-border space-y-6">
              <h3 className="text-xl font-bold text-white font-display">
                Direct Contact Points
              </h3>

              {/* Email Item */}
              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-cyan/15 border border-cyber-cyan/40 flex items-center justify-center text-cyber-cyan">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Email Address</span>
                    <a
                      href={profile.links.email}
                      className="text-sm font-semibold text-white hover:text-cyber-cyan transition-colors truncate max-w-[190px] sm:max-w-none block"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(profile.email, 'email')}
                  className="p-2 rounded-lg bg-cyber-bg border border-cyber-border text-slate-400 hover:text-cyber-cyan hover:border-cyber-cyan transition-all"
                  title="Copy Email"
                >
                  {copiedEmail ? <Check size={16} className="text-cyber-green" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Phone Item */}
              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-cyber-green/15 border border-cyber-green/40 flex items-center justify-center text-cyber-green">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-slate-400 block">Direct Line & WhatsApp</span>
                    <a
                      href={profile.links.phone}
                      className="text-sm font-semibold text-white hover:text-cyber-green transition-colors"
                    >
                      {profile.phone}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(profile.phone, 'phone')}
                  className="p-2 rounded-lg bg-cyber-bg border border-cyber-border text-slate-400 hover:text-cyber-green hover:border-cyber-green transition-all"
                  title="Copy Phone"
                >
                  {copiedPhone ? <Check size={16} className="text-cyber-green" /> : <Copy size={16} />}
                </button>
              </div>

              {/* Location Item */}
              <div className="p-4 rounded-xl bg-cyber-card border border-cyber-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <MapPin size={18} />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 block">Current Location</span>
                  <span className="text-sm font-semibold text-white">{profile.location} (PKT / UTC+5)</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-2 border-t border-cyber-border">
                <span className="text-xs font-mono text-slate-400 block mb-3">Professional Profiles:</span>
                <div className="flex gap-3">
                  <a
                    href={profile.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyber-card border border-cyber-border text-xs font-mono text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
                  >
                    <Github size={15} />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={profile.links.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyber-card border border-cyber-border text-xs font-mono text-slate-300 hover:border-cyber-cyan hover:text-cyber-cyan transition-all"
                  >
                    <Linkedin size={15} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-cyber-cyan/30 shadow-2xl relative">
              {/* Form Title */}
              <div className="flex items-center justify-between pb-6 border-b border-cyber-border mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Send a Message</h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    POST /api/contact · MongoDB Synced
                  </p>
                </div>
                <div className="px-3 py-1 rounded-full bg-cyber-green/10 border border-cyber-green/40 text-[11px] font-mono text-cyber-green flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyber-green animate-ping" />
                  <span>API Online</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Your Name <span className="text-cyber-cyan">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300 block">
                      Email Address <span className="text-cyber-cyan">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">Subject / Project Type</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. AWS Migration / Flutter Mobile App Inquiry"
                    className="w-full px-4 py-2.5 rounded-xl bg-cyber-bg border border-cyber-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all"
                  />
                </div>

                {/* Message Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-300 block">
                    Message <span className="text-cyber-cyan">*</span>
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your technical requirements or timeline..."
                    required
                    className="w-full px-4 py-3 rounded-xl bg-cyber-bg border border-cyber-border text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyber-cyan focus:ring-1 focus:ring-cyber-cyan transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-cyber-cyan via-teal-400 to-cyber-green text-black font-bold text-sm hover:opacity-95 disabled:opacity-50 transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send size={16} className={isSubmitting ? 'animate-bounce' : ''} />
                  <span>{isSubmitting ? 'Transmitting Message...' : 'Transmit Message'}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

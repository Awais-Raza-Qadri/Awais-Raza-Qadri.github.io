import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp, FaLinkedin, FaGithub, FaCopy, FaCheck } from 'react-icons/fa';

export default function Contact() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  // Clean self-contained credentials for robust execution
  const contactDetails = {
    email: 'awaisrazaqadri.741422@gmail.com',
    phone: '0335-9803167',
    whatsappUrl: 'https://wa.me/923359803167', // Correct international formatting
    linkedinUrl: 'https://www.linkedin.com/in/awais-raza-qadri',
    linkedinDisplay: 'linkedin.com/in/awais-raza-qadri',
    githubUrl: 'https://github.com/Awais-Raza-Qadri',
    githubDisplay: 'github.com/Awais-Raza-Qadri',
    location: 'VPO Kotsarang, Talagang, Punjab, Pakistan'
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const contactOptions = [
    {
      label: 'Email Address',
      value: contactDetails.email,
      href: `mailto:${contactDetails.email}`,
      icon: <FaEnvelope size={18} />,
      type: 'email'
    },
    {
      label: 'WhatsApp & Phone',
      value: contactDetails.phone,
      href: contactDetails.whatsappUrl,
      icon: <FaWhatsapp size={20} />,
      type: 'whatsapp'
    },
    {
      label: 'LinkedIn Professional Profile',
      value: contactDetails.linkedinDisplay,
      href: contactDetails.linkedinUrl,
      icon: <FaLinkedin size={18} />,
      type: 'linkedin'
    },
    {
      label: 'GitHub Developer Profile',
      value: contactDetails.githubDisplay,
      href: contactDetails.githubUrl,
      icon: <FaGithub size={18} />,
      type: 'github'
    },
    {
      label: 'Global Location',
      value: contactDetails.location,
      icon: <FaMapMarkerAlt size={18} />,
      type: 'location'
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-darkBg/50 relative">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="rounded-full bg-accentCyan/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-accentCyan border border-accentCyan/10 uppercase">
            Connection Hub
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl bg-gradient-to-r from-accentCyan to-accentIndigo bg-clip-text text-transparent inline-block">
            Let's Collaborate
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Reach out directly via any of the professional channels below. I am available for development bookings, full-stack projects, or consulting consultations.
          </p>
        </div>

        {/* Contact Grid layout adapts dynamically from single column on mobile to 3 columns on large screens */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {contactOptions.map((opt, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`glass-panel flex gap-4 p-6 rounded-2xl hover:border-accentCyan/20 transition-all duration-300 ${
                opt.type === 'location' ? 'md:col-span-2 lg:col-span-3' : ''
              }`}
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accentCyan/10 text-accentCyan border border-accentCyan/20">
                {opt.icon}
              </div>
              <div className="space-y-1.5 w-full min-w-0">
                <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">{opt.label}</span>
                {opt.href ? (
                  <a
                    href={opt.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm font-semibold text-slate-200 hover:text-accentCyan transition-colors truncate focus:outline-none focus:underline"
                  >
                    {opt.value}
                  </a>
                ) : (
                  <span className="block text-sm font-semibold text-slate-300 leading-snug">{opt.value}</span>
                )}

                {/* Direct Action Utility Buttons */}
                <div className="flex gap-4 mt-2">
                  {opt.href && (
                    <a
                      href={opt.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accentCyan hover:text-accentIndigo transition-colors"
                    >
                      Open Link
                    </a>
                  )}
                  {opt.type !== 'location' && (
                    <button
                      onClick={() => copyToClipboard(opt.type === 'whatsapp' ? contactDetails.phone : opt.value, opt.type)}
                      className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-accentIndigo hover:text-accentCyan transition-colors"
                      aria-label={`Copy ${opt.label} value`}
                    >
                      {copiedText === opt.type ? (
                        <>
                          <FaCheck size={10} /> Copied!
                        </>
                      ) : (
                        <>
                          <FaCopy size={10} /> Copy Details
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
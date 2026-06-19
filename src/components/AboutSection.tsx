"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Layers } from "lucide-react";

const experience = [
  {
    role: "Lead Creative Technologist",
    company: "Disyn Labs",
    duration: "2024 - Present",
    desc: "Architecting Web3 and Generative AI micro-SaaS structures, design systems, and frontend frameworks.",
  },
  {
    role: "Senior UI/UX Designer & Dev",
    company: "PixelPerfect Agency",
    duration: "2022 - 2024",
    desc: "Coordinated design-to-code pipelines using Figma and React. Delivered 40+ high-end business applications.",
  },
  {
    role: "Digital Brand Specialist",
    company: "Vivid Media",
    duration: "2020 - 2022",
    desc: "Created graphic templates, logos, and high-fidelity mockups for digital marketing campaigns.",
  },
];

const education = [
  {
    degree: "B.Sc. in Interactive Media & Web Dev",
    school: "Design & Technology University",
    year: "2017 - 2020",
  },
  {
    degree: "Specialization in Generative AI Systems",
    school: "AI Pioneer Institute",
    year: "2023",
  },
];

const skills = [
  { name: "UI/UX & Figma", percentage: 95, color: "bg-accent-cyan" },
  { name: "Next.js & React", percentage: 90, color: "bg-accent-purple" },
  { name: "Tailwind CSS", percentage: 95, color: "bg-accent-cyan" },
  { name: "TypeScript & Prisma", percentage: 85, color: "bg-accent-purple" },
  { name: "Generative AI Systems", percentage: 80, color: "bg-accent-cyan" },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 relative overflow-hidden bg-secondary-bg/50">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-80 h-80 rounded-full bg-accent-purple/5 blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-widest text-accent-cyan uppercase">CURRICULUM VITAE</span>
          <h2 className="text-3xl md:text-5xl font-black font-space mt-2 text-text-primary">
            THE CREATIVE JOURNEY
          </h2>
          <div className="w-12 h-1 bg-gradient-to-r from-accent-cyan to-accent-purple mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Experience Timeline */}
          <div className="lg:col-span-7">
            <h3 className="text-xl font-bold font-space text-text-primary mb-8 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-accent-cyan" />
              Work History
            </h3>

            <div className="border-l-2 border-white/5 pl-6 ml-3 space-y-10">
              {experience.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline bullet indicator */}
                  <span className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-primary-bg border-2 border-accent-cyan group-hover:bg-accent-cyan group-hover:shadow-[0_0_10px_rgba(0,229,255,0.8)] transition-all" />
                  
                  <div className="card-standard p-6 border-white/5 hover:border-accent-cyan/20">
                    <span className="text-xs font-semibold text-accent-cyan">{item.duration}</span>
                    <h4 className="text-lg font-bold font-space text-text-primary mt-1 group-hover:text-glow-cyan transition-all">
                      {item.role}
                    </h4>
                    <p className="text-sm font-medium text-text-muted mt-0.5">{item.company}</p>
                    <p className="text-sm text-text-secondary mt-3 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Skills & Education */}
          <div className="lg:col-span-5 space-y-12">
            {/* Skills Progress Bars */}
            <div>
              <h3 className="text-xl font-bold font-space text-text-primary mb-8 flex items-center gap-2">
                <Layers className="w-5 h-5 text-accent-cyan" />
                Technical Mastery
              </h3>

              <div className="space-y-6 card-standard p-6 border-white/5">
                {skills.map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-semibold text-text-secondary">{skill.name}</span>
                      <span className="font-bold text-accent-cyan">{skill.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className={`h-full ${skill.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Timeline */}
            <div>
              <h3 className="text-xl font-bold font-space text-text-primary mb-8 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-accent-purple" />
                Education & Accreditations
              </h3>

              <div className="space-y-6">
                {education.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="card-standard p-5 border-white/5 hover:border-accent-purple/20 flex gap-4"
                  >
                    <div className="p-2 rounded-lg bg-accent-purple/10 text-accent-purple h-fit">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-accent-purple font-semibold">{item.year}</span>
                      <h4 className="text-base font-bold text-text-primary mt-0.5">{item.degree}</h4>
                      <p className="text-xs text-text-muted">{item.school}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

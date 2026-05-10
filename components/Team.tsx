'use client'

export function Team() {
  return (
    <section id="team" className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-primary font-semibold text-sm md:text-base tracking-wide uppercase">
            Our Team
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Leadership & Expertise
          </h2>
          <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
            Dedicated professionals with strong academic backgrounds and hands-on experience across the agricultural value chain.
          </p>
        </div>

       {/* CEO Section */}
        <div className="mb-16 bg-card rounded-xl p-8 md:p-12 border border-border overflow-hidden">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1">
              <div className="w-full aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl overflow-hidden mb-6 shadow-lg">
                <img
                  src="/CEO image.jpg"
                  alt="Roseline Delali Ashigbui - CEO and Founder"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Roseline Delali Ashigbui</h3>
              <p className="text-primary font-semibold">Chief Executive Officer & Founder</p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-lg font-bold text-foreground mb-4">About the CEO</h4>
              <p className="text-foreground/70 leading-relaxed mb-4">
                Roseline is a passionate, ambitious young entrepreneur with a Master's degree in Public Health Nutrition from the University of Health and Allied Sciences. She brings extensive expertise in cassava value chain development and SME entrepreneurship through studies in Brazil and China.
              </p>
              
              <h4 className="text-sm font-bold text-foreground/60 uppercase mb-3">Professional Background</h4>
              <ul className="space-y-2 text-sm text-foreground/70 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Ghana Ports and Harbours Authority - Stores & Procurement Officer</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>International experience with Italian company Meregalli and premium wine retail</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Part-time lecturer at University of Health and Allied Sciences (UHAS)</span>
                </li>
              </ul>

              <h4 className="text-sm font-bold text-foreground/60 uppercase mb-3">Key Achievements</h4>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>First Goodwill Ambassador-Agribusiness for CSAYN (Climate Smart Agriculture Youth Network)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Worked with 35 countries on climate-smart agriculture initiatives</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Mentor and consultant in food product development and entrepreneurship</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>Conducts periodic empowerment clinics for young single mothers and school dropouts</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team Structure */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-foreground mb-8">Our Multidisciplinary Team</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Leadership & Management',
                skills: [
                  'Agribusiness Management',
                  'Strategic Planning',
                  'Finance & Administration',
                  'Organizational Development',
                ],
              },
              {
                title: 'Technical Expertise',
                skills: [
                  'Qualified Agronomists',
                  'Food Technologists',
                  'Production Specialists',
                  'Quality Assurance Professionals',
                ],
              },
              {
                title: 'Operations & Finance',
                skills: [
                  'Financial Management',
                  'Regulatory Compliance',
                  'Operations Oversight',
                  'Transparent Reporting',
                ],
              },
              {
                title: 'Marketing & Community',
                skills: [
                  'Brand Development',
                  'Market Access',
                  'Stakeholder Partnerships',
                  'Community Engagement',
                ],
              },
            ].map((group, i) => (
              <div key={i} className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 transition-colors">
                <h4 className="font-bold text-foreground mb-4">{group.title}</h4>
                <ul className="space-y-3">
                  {group.skills.map((skill, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground/70">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Team Values */}
        <div className="bg-gradient-to-r from-primary/5 to-transparent rounded-xl p-12 border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-8">What Unites Our Team</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-lg font-bold text-primary mb-2">Professionalism</p>
              <p className="text-foreground/60">High standards of excellence in all we do</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary mb-2">Integrity</p>
              <p className="text-foreground/60">Honesty and transparency in every decision</p>
            </div>
            <div>
              <p className="text-lg font-bold text-primary mb-2">Commitment</p>
              <p className="text-foreground/60">Dedicated to lasting community impact</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

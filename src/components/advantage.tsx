// src/components/AdvantagesBanner.tsx
import React from 'react'
import {Rocket, Shield, Users} from 'lucide-react'
import Section from './layout/section'

const advantages = [
  {
    icon: <Rocket className="h-10 w-10 text-blue-500" />,
    title: 'Performance',
    description:
      "Profitez d'une vitesse éclair et d'une performance optimisée sur notre plateforme."
  },
  {
    icon: <Shield className="h-10 w-10 text-green-500" />,
    title: 'Sécurité',
    description:
      'Vos données sont protégées avec les normes de sécurité les plus strictes.'
  },
  {
    icon: <Users className="h-10 w-10 text-purple-500" />,
    title: 'Communauté',
    description: 'Rejoignez une communauté active et engagée.'
  }
]

const AdvantagesBanner = () => {
  return (
    <Section>
      <div className="bg-muted py-12">
        <div className="">
          <div className="container px-4">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {advantages.map((advantage, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  {advantage.icon}
                  <h3 className="mt-4 text-xl font-semibold">
                    {advantage.title}
                  </h3>
                  <p className="mt-2 text-muted-foreground">
                    {advantage.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default AdvantagesBanner

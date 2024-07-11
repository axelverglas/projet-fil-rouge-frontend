import {cn} from '@/lib/utils'

interface SectionProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export default function Section({children, className, id}: SectionProps) {
  return (
    <section id={id} className={cn(className, 'py-12')}>
      {children}
    </section>
  )
}

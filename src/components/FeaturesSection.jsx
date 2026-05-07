import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './FeaturesSection.css'

gsap.registerPlugin(ScrollTrigger)

const features = [
  {
    icon: '✦',
    title: 'Midnight Savior',
    subtitle: 'Ready in 3 minutes',
    description: 'From study nights to gaming marathons, Indomie is always there when hunger hits.',
    accent: '#E8001C',
  },
  {
    icon: '✦',
    title: 'Flavor Freedom',
    subtitle: 'MIX IT YOUR WAY',
    description: 'Add egg, chili, cheese, or rice every bowl becomes your own creation.',
    accent: '#F5C800',
  },
  {
    icon: '✦',
    title: 'For Every Moment',
    subtitle: 'ANYTIME, ANYWHERE',
    description: 'Breakfast, lunch, midnight cravings, Indomie fits every mood perfectly.',
    accent: '#E8001C',
  },
  {
    icon: '✦',
    title: 'Indonesian Icon',
    subtitle: 'LOVED FOR GENERATIONS',
    description: 'More than instant noodles, Indomie is part of everyday life.',
    accent: '#F5C800',
  },
]

const FeaturesSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.from(cardsRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
        y: 80,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="features">
      <div className="features__inner">
        <div ref={headingRef} className="features__header">
          <span className="features__label">What makes us different</span>
          <h2 className="features__title">
            Why <em>Indomie</em> is<br />more than a meal
          </h2>
        </div>

        <div className="features__grid">
          {features.map((f, i) => (
            <div
              key={i}
              ref={(el) => (cardsRef.current[i] = el)}
              className="feature-card"
              style={{ '--accent': f.accent }}
            >
              <div className="feature-card__icon">{f.icon}</div>
              <div className="feature-card__number">0{i + 1}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__subtitle">{f.subtitle}</p>
              <p className="feature-card__desc">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection

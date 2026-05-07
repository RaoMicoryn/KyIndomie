import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './StatsSection.css'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 20, suffix: 'B+', label: 'Packs sold yearly', sub: 'globally' },
  { value: 100, suffix: '+', label: 'Countries reached', sub: 'worldwide' },
  { value: 50, suffix: '+', label: 'Years of flavor', sub: 'since 1972' },
]

const CountUp = ({ target, suffix, isActive }) => {
  const [count, setCount] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (isActive && !hasRun.current) {
      hasRun.current = true
      const obj = { val: 0 }
      gsap.to(obj, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        onUpdate: () => setCount(Math.floor(obj.val)),
      })
    }
  }, [isActive, target])

  return <span>{count}{suffix}</span>
}

const StatsSection = () => {
  const sectionRef = useRef(null)
  const [isActive, setIsActive] = useState(false)
  const cardRefs = useRef([])
  const headingRef = useRef(null)
  const btnRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bgRef.current, {
        backgroundPosition: '100% 50%',
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 60%',
        onEnter: () => setIsActive(true),
        once: true,
      })

      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
      })

      gsap.from(cardRefs.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        },
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power3.out',
      })

      gsap.from(btnRef.current, {
        scrollTrigger: {
          trigger: btnRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
        scale: 0.8,
        opacity: 0,
        duration: 0.7,
        ease: 'back.out(1.8)',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="stats">
      <div ref={bgRef} className="stats__bg" />
      <div className="stats__inner">
        <div ref={headingRef} className="stats__header">
          <span className="stats__label">The numbers speak</span>
          <h2 className="stats__title">
            A legacy of<br />
            <span className="stats__title--accent">bold flavor</span>
          </h2>
        </div>

        <div className="stats__grid">
          {stats.map((s, i) => (
            <div key={i} ref={(el) => (cardRefs.current[i] = el)} className="stat-card">
              <div className="stat-card__value">
                <CountUp target={s.value} suffix={s.suffix} isActive={isActive} />
              </div>
              <div className="stat-card__label">{s.label}</div>
              <div className="stat-card__sub">{s.sub}</div>
            </div>
          ))}
        </div>

        <div ref={btnRef} className="stats__cta">
          <button className="stats__btn">
            <span>Our Story</span>
            <span className="stats__btn-icon">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

export default StatsSection

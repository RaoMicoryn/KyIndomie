import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './CTAsection.css'

gsap.registerPlugin(ScrollTrigger)

const CTASection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const btnRef = useRef(null)
  const glowRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgRef.current,
        { backgroundColor: '#0a0a0a' },
        {
          backgroundColor: '#120002',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'top 30%',
            scrub: true,
          },
        }
      )

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 0.5,
        },
      })
      tl.fromTo(headingRef.current, { y: 80, scale: 1.1 }, { y: 0, scale: 1, ease: 'power2.out' })

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.fromTo(
        btnRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(2)',
          scrollTrigger: {
            trigger: btnRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      gsap.to(glowRef.current, {
        scale: 1.3,
        opacity: 0.6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="cta">
      <div ref={bgRef} className="cta__bg" />
      <div ref={glowRef} className="cta__glow" />

      <div className="cta__grid-lines" aria-hidden="true">
        {[...Array(6)].map((_, i) => <div key={i} className="cta__line" />)}
      </div>

      <div className="cta__inner">
        <span className="cta__eyebrow">Ready to taste it?</span>

        <div className="cta__heading-wrap">
          <h2 ref={headingRef} className="cta__heading">
            {"Let's Create"}<br />
            <span className="cta__heading--accent">Something</span>
            <br />Amazing
          </h2>
        </div>

        <p ref={subtitleRef} className="cta__subtitle">
          From one packet to a lifetime of memories — Indomie is ready
          <br />when you are. Your next bowl is a story waiting to be told.
        </p>

        <div ref={btnRef} className="cta__btn-wrap">
          <button className="cta__btn">
            <span className="cta__btn-text">Order Now</span>
            <span className="cta__btn-arrow">→</span>
          </button>
          <p className="cta__note">Available everywhere in Indonesia &amp; worldwide</p>
        </div>
      </div>

      <div className="cta__footer">
        <span className="cta__brand">INDOMIE</span>
        <span className="cta__copy">© PT WEBE SEJAHTERA</span>
      </div>
    </section>
  )
}

export default CTASection

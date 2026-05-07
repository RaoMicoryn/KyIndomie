import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './HeroSection.css'

const HeroSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const subtitleRef = useRef(null)
  const shape1Ref = useRef(null)
  const shape2Ref = useRef(null)
  const shape3Ref = useRef(null)
  const shape4Ref = useRef(null)
  const taglineRef = useRef(null)
  const scrollHintRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Explicitly set start states
        gsap.set(headingRef.current, { yPercent: 120, opacity: 0 })
        gsap.set(taglineRef.current, { opacity: 0, y: 20 })
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 })
        gsap.set(shape1Ref.current, { x: -200, y: -200, opacity: 0, rotation: -60 })
        gsap.set(shape2Ref.current, { x: 300, y: -100, opacity: 0, rotation: 90 })
        gsap.set(shape3Ref.current, { x: -150, y: 250, opacity: 0, rotation: 45 })
        gsap.set(shape4Ref.current, { x: 200, y: 200, opacity: 0, rotation: -90 })
        gsap.set(scrollHintRef.current, { opacity: 0, y: 0 })

        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.to(headingRef.current, { yPercent: 0, opacity: 1, duration: 1.1 })
          .to(taglineRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
          .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
          .to(shape1Ref.current, { x: 0, y: 0, opacity: 0.5, rotation: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
          .to(shape2Ref.current, { x: 0, y: 0, opacity: 0.25, rotation: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
          .to(shape3Ref.current, { x: 0, y: 0, opacity: 0.3, rotation: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
          .to(shape4Ref.current, { x: 0, y: 0, opacity: 0.2, rotation: 0, duration: 1, ease: 'back.out(1.4)' }, '-=0.8')
          .to(scrollHintRef.current, { opacity: 1, duration: 0.5 }, '+=0.2')

        // Idle float after intro finishes
        tl.add(() => {
          const shapes = [shape1Ref, shape2Ref, shape3Ref, shape4Ref]
          shapes.forEach((ref, i) => {
            gsap.to(ref.current, {
              y: i % 2 === 0 ? '-=18' : '+=18',
              rotation: i % 2 === 0 ? '+=8' : '-=8',
              duration: 2.5 + i * 0.4,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
              delay: i * 0.3,
            })
          })

          gsap.to(scrollHintRef.current, {
            y: 8,
            duration: 0.8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        })
      }, sectionRef)

      return () => ctx.revert()
    }, 50)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={sectionRef} className="hero">
      <div className="hero__grain" />

      <div ref={shape1Ref} className="hero__shape hero__shape--1">
        <div className="shape-noodle" />
      </div>
      <div ref={shape2Ref} className="hero__shape hero__shape--2">
        <div className="shape-circle" />
      </div>
      <div ref={shape3Ref} className="hero__shape hero__shape--3">
        <div className="shape-star">★</div>
      </div>
      <div ref={shape4Ref} className="hero__shape hero__shape--4">
        <div className="shape-ring" />
      </div>

      <div className="hero__content">
        <div className="hero__heading-wrap">
          <p ref={taglineRef} className="hero__tagline">
            Indonesia&apos;s Favorite Since 1972
          </p>
          <div className="hero__heading-overflow">
            <h1 ref={headingRef} className="hero__heading">
              <span className="hero__heading--red">INDOMIE</span>
              <br />
              <span className="hero__heading--white">SELERAKU</span>
            </h1>
          </div>
        </div>
        <p ref={subtitleRef} className="hero__subtitle">
          One noodle. Infinite stories. Crafted with boldness,
          <br />served with soul — anytime, anywhere.
        </p>
      </div>

      <div ref={scrollHintRef} className="hero__scroll-hint">
        <span>Scroll to explore</span>
        <div className="hero__scroll-arrow">↓</div>
      </div>
    </section>
  )
}

export default HeroSection

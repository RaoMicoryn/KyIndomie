import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './LayeredCardsSection.css'

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    id: '01',
    title: 'The Indonesian Legacy',
    body:
      "Crafted in 1972 from a humble dream. What began in a single wok evolved into Indonesia’s ultimate comfort food and a national icon.",
    bg: '#E8001C',
    textColor: '#fff',
    hasBtn: true,
    btnLabel: 'The Origin',
  },
  {
    id: '02',
    title: 'A Global Phenomenon',
    body:
      'From the dorms of Lagos to the streets of Tokyo. Indomie transcends borders, becoming the universal language of instant satisfaction.',
    bg: '#F5C800',
    textColor: '#0a0a0a',
    hasBtn: true,
    btnLabel: 'Global Reach',
  },
  {
    id: '03',
    title: 'Flavor Reimagined',
    body:
      'Where tradition meets innovation. We’re pushing the boundaries with bold collaborations and new variants, fueled by the soul of the original.',
    bg: '#111111',
    textColor: '#fff',
    hasBtn: false,
  },
]

const LayeredCardsSection = () => {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cardsEl = cardRefs.current

      // Initial setup
      cardsEl.forEach((card, i) => {
        gsap.set(card, {
          zIndex: cards.length - i,
          willChange: 'transform, opacity',
        })

        if (i === 0) {
          gsap.set(card, {
            y: 0,
            opacity: 1,
            scale: 1,
          })
        } else {
          gsap.set(card, {
            y: 120,
            opacity: 0,
            scale: 0.92,
          })
        }
      })

      // Main scroll timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${cards.length * 900}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      cardsEl.forEach((card, i) => {
        if (i === 0) return

        tl.to(
          card,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
          },
          i
        ).to(
          cardsEl[i - 1],
          {
            y: -40,
            opacity: 0,
            scale: 0.88,
            duration: 1,
            ease: 'power3.out',
          },
          i
        )
      })

      // Heading animation
      gsap.from(headingRef.current, {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="layered">
      <div className="layered__inner">
        <div ref={headingRef} className="layered__header">
          <span className="layered__label">Our journey</span>
          <h2 className="layered__title">The Indomie Story</h2>
        </div>

        <div className="layered__stack">
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="story-card"
              style={{
                '--card-bg': card.bg,
                '--card-text': card.textColor,
              }}
            >
              <div className="story-card__number">{card.id}</div>

              <div className="story-card__content">
                <h3 className="story-card__title">{card.title}</h3>

                <p className="story-card__body">{card.body}</p>

                {card.hasBtn && (
                  <button className="story-card__btn">
                    {card.btnLabel} →
                  </button>
                )}
              </div>

              <div className="story-card__deco" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default LayeredCardsSection
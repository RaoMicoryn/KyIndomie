import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './HorizontalSection.css'
import IndomieGoreng from '../Indomie/Indomie1.jpg'
import IndomieRendang from '../Indomie/indomie2.jpg'
import IndomieAceh from '../Indomie/indomie3.jpg'
import IndomieSoto from '../Indomie/indomie4.jpg'
import IndomieKariAyam from '../Indomie/Indomie5.jpg'
gsap.registerPlugin(ScrollTrigger)

const panels = [
  {
    id: '01',
    title: 'Indomie Goreng',
    description: 'Sweet, savory, and unforgettable. The iconic flavor that turned instant noodles into a cultural phenomenon.',
    image: IndomieGoreng,
    tag: 'Legendary Taste',
    color: '#E8001C',
  },
  {
    id: '02',
    title: 'Indomie Soto',
    description: 'A warm and comforting chicken soup flavor, perfect for rainy evenings and quiet midnight cravings.',
    image: IndomieSoto,
    tag: 'Comfort Bowl',
    color: '#F5C800',
  },
  {
    id: '03',
    title: 'Indomie Rendang',
    description: 'Rich spices, deep flavor, and a bold rendang taste inspired by one of Indonesia’s most legendary dishes.',
    image: IndomieRendang,
    tag: 'Bold Heritage',
    color: '#E8001C',
  },
  {
    id: '04',
    title: 'Indomie Kari Ayam',
    description: 'Creamy curry broth with fragrant spices and a hint of citrus warmth in every satisfying bite.',
    image: IndomieKariAyam,
    tag: 'Golden Curry',
    color: '#F5C800',
  },
  {
    id: '05',
    title: 'Indomie Aceh',
    description: 'Packed with fiery spices and intense flavor — made for those who crave heat with every slurp.',
    image: IndomieAceh,
    tag: 'Extreme Spice',
    color: '#FF1A35',
  },
]

const HorizontalSection = () => {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const panelRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const totalWidth = track.scrollWidth - window.innerWidth

      const hTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      })

      panelRefs.current.forEach((panel) => {
        const content = panel.querySelector('.hpanel__content')

        gsap.fromTo(
          content,
          { opacity: 0.2, y: 30 },
          {
            opacity: 1,
            y: 0,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: hTween,
              start: 'left 80%',
              end: 'left 20%',
              scrub: true,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="horizontal">
      <div className="horizontal__label">
        <span>Scroll to explore</span>
        <span className="hlabel__arrow">→</span>
      </div>

      <div ref={trackRef} className="horizontal__track">
        <div className="hpanel hpanel--intro">
          <div className="hpanel__content">
            <span className="hpanel__tag">The Collection</span>
            <h2 className="hpanel__big-title">OUR<br />FLAVORS</h2>
            <p className="hpanel__intro-sub">Five iconic variants. One unstoppable legacy.</p>
          </div>
        </div>

        {panels.map((p, i) => (
          <div
            key={p.id}
            ref={(el) => (panelRefs.current[i] = el)}
            className="hpanel hpanel--product"
            style={{ '--panel-color': p.color }}
          >
            <div className="hpanel__content">
              <span className="hpanel__number">{p.id}</span>
              <span className="hpanel__tag">{p.tag}</span>
              <h3 className="hpanel__title">{p.title}</h3>
              <p className="hpanel__desc">{p.description}</p>
              <button className="hpanel__btn">Explore</button>
            </div>
            <div className="hpanel__visual">
              <div className="hpanel__img-wrap">
                <img className="hpanel__img" src={p.image} alt={p.title} loading="lazy" />
              </div>
              <div className="hpanel__overlay" />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HorizontalSection

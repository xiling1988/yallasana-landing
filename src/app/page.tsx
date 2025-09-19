'use client'
import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Manrope, Caveat } from 'next/font/google'
import Image from 'next/image'

const manrope = Manrope({ subsets: ['latin'], weight: ['400', '600', '700'] })
const caveat = Caveat({ subsets: ['latin'], weight: ['400', '700'] })

type Profile = {
  name: string
  style: string
  locationPrompt: string
  sub: string
  portrait: string
  backdrop: string
}

const PROFILES: Profile[] = [
  {
    name: 'Lucy',
    style: 'Morning Flow',
    locationPrompt: 'Book a lesson with Lucy at Burj Khalifa Park',
    sub: 'Sunrise Vinyasa • Beginner–Intermediate • English',
    portrait:
      'https://images.pexels.com/photos/9136265/pexels-photo-9136265.jpeg',
    backdrop:
      'https://images.pexels.com/photos/9272796/pexels-photo-9272796.jpeg',
  },
  {
    name: 'Omar',
    style: 'Evening Vinyasa',
    locationPrompt: 'Evening Vinyasa with Omar on Kite Beach',
    sub: 'Sunset sessions • Strength & Mobility • English/Arabic',
    portrait:
      'https://images.pexels.com/photos/6725907/pexels-photo-6725907.jpeg',
    backdrop:
      'https://images.pexels.com/photos/6224937/pexels-photo-6224937.jpeg',
  },
  {
    name: 'Aisha',
    style: 'Prenatal Calm',
    locationPrompt: 'Prenatal calm with Aisha in Creek Harbour',
    sub: 'Gentle prenatal • Breathwork • English/Urdu',
    portrait:
      'https://images.pexels.com/photos/8436761/pexels-photo-8436761.jpeg',
    backdrop:
      'https://images.pexels.com/photos/8436724/pexels-photo-8436724.jpeg',
  },
  {
    name: 'Miguel',
    style: 'Power Yoga',
    locationPrompt: 'Power Yoga with Miguel in Alserkal Avenue',
    sub: 'Dynamic strength • Advanced options • English/Spanish',
    portrait:
      'https://images.pexels.com/photos/8174432/pexels-photo-8174432.jpeg',
    backdrop:
      'https://images.pexels.com/photos/8173538/pexels-photo-8173538.jpeg',
  },
]

export default function YallasanaComingSoon() {
  const [role, setRole] = useState<'student' | 'teacher'>('student')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')
  const [message, setMessage] = useState<string>('')

  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const current = useMemo(() => PROFILES[index % PROFILES.length], [index])

  useEffect(() => {
    if (paused) return
    const id = setInterval(
      () => setIndex((i) => (i + 1) % PROFILES.length),
      4500
    )
    return () => clearInterval(id)
  }, [paused])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    setMessage('')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, source: 'landing-v1' }),
      })
      if (!res.ok) throw new Error('Network error')
      const data = await res.json().catch(() => ({}))
      setStatus('success')
      setMessage(
        data?.message || 'You’re on the list. We’ll be in touch soon! ✨'
      )
      setEmail('')
    } catch (err) {
      setStatus('error')
      setMessage(
        'Something went wrong. Please try again or DM us on Instagram.'
      )
      console.log(err)
    }
  }

  return (
    <div
      className={`${manrope.className} relative min-h-screen bg-gradient-to-br from-indigo-50 via-slate-50 to-stone-50 text-neutral-900 overflow-hidden`}
    >
      {/* Scattered animated blurred blobs (purplish palette) */}
      {[
        {
          cls: '-top-32 -left-24 h-[28rem] w-[28rem] bg-purple-300',
          anim: { y: [0, 40, 0], x: [0, 25, 0] },
          dur: 28,
        },
        {
          cls: '-bottom-32 -right-32 h-[30rem] w-[30rem] bg-fuchsia-300',
          anim: { y: [0, -36, 0], x: [0, -28, 0] },
          dur: 32,
        },
        {
          cls: 'top-[20%] right-[10%] h-[18rem] w-[18rem] bg-violet-300',
          anim: { y: [0, 22, 0], x: [0, -12, 0] },
          dur: 24,
        },
        {
          cls: 'bottom-[15%] left-[20%] h-[16rem] w-[16rem] bg-indigo-300',
          anim: { y: [0, -18, 0], x: [0, 14, 0] },
          dur: 26,
        },
        {
          cls: 'top-1/2 left-1/3 h-[22rem] w-[22rem] bg-purple-200',
          anim: { scale: [1, 1.08, 1] },
          dur: 20,
        },
        {
          cls: 'top-8 right-1/3 h-[14rem] w-[14rem] bg-fuchsia-200',
          anim: { rotate: [0, 6, -4, 0] },
          dur: 30,
        },
      ].map((b, i) => (
        <motion.div
          key={i}
          className={`pointer-events-none absolute ${b.cls} rounded-full opacity-30 blur-3xl mix-blend-multiply`}
          animate={b.anim}
          transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* NAV */}
      <header className='relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4'>
        <div className='flex items-center gap-3'>
          <Image
            src='/yallasana-icon.png' // or your path
            alt='Yallasana logo'
            width={100}
            height={100}
            className='object-contain h-16 w-16'
          />
          <span className='text-xl font-semibold tracking-tight'>
            Yallasana
          </span>
        </div>
        <nav className='hidden gap-6 md:flex'>
          <a
            className='text-sm text-neutral-600 hover:text-neutral-900'
            href='#students'
          >
            Students
          </a>
          <a
            className='text-sm text-neutral-600 hover:text-neutral-900'
            href='#teachers'
          >
            Teachers
          </a>
          <a
            className='text-sm text-neutral-600 hover:text-neutral-900'
            href='#faqs'
          >
            FAQ
          </a>
        </nav>
      </header>

      {/* HERO with slideshow */}
      <main className='relative mx-auto w-full max-w-6xl px-4 pb-24 pt-6 md:pt-10'>
        <div className='grid items-center gap-10 md:grid-cols-2'>
          {/* Left: Slideshow */}
          <div
            className='relative aspect-[16/12] w-full overflow-hidden rounded-3xl border border-neutral-200 bg-white shadow-sm'
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Backdrop image with fade/scale */}
            <AnimatePresence mode='wait'>
              <motion.div
                key={current.backdrop}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className='absolute inset-0'
              >
                <div
                  className='absolute inset-0 bg-center bg-cover'
                  style={{ backgroundImage: `url(${current.backdrop})` }}
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent' />
              </motion.div>
            </AnimatePresence>

            {/* Foreground content */}
            <div className='relative z-10 flex h-full flex-col justify-end p-5'>
              <div className='flex items-end gap-3'>
                <motion.img
                  key={current.portrait}
                  src={current.portrait}
                  alt={`${current.name} portrait`}
                  className='h-16 w-16 rounded-2xl object-cover ring-2 ring-white/80 shadow'
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                />
                <div className='rounded-2xl bg-white/90 px-4 py-3 shadow backdrop-blur'>
                  <p className='text-sm font-semibold leading-tight text-neutral-900'>
                    {current.locationPrompt}{' '}
                    <span className='align-middle'>🌿</span>
                  </p>
                  <p className='mt-0.5 text-xs text-neutral-600'>
                    {current.sub}
                  </p>
                </div>
              </div>

              {/* Indicators & controls */}
              <div className='mt-3 flex items-center justify-between'>
                <div className='flex gap-2'>
                  {PROFILES.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to slide ${i + 1}`}
                      onClick={() => setIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index
                          ? 'w-6 bg-white'
                          : 'w-3 bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
                <div className='flex gap-2'>
                  <button
                    className='rounded-full bg-white/80 p-2 shadow hover:bg-white'
                    aria-label='Previous'
                    onClick={() =>
                      setIndex(
                        (i) => (i - 1 + PROFILES.length) % PROFILES.length
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className='rounded-full bg-white/80 p-2 shadow hover:bg-white'
                    aria-label='Next'
                    onClick={() => setIndex((i) => (i + 1) % PROFILES.length)}
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Copy + form */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className='inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-3 py-1 text-xs text-sky-700'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-sky-500' />
              Coming soon across the UAE
            </div>
            <h1
              className={`${caveat.className} mt-4 text-4xl font-bold leading-tight tracking-tight md:text-5xl`}
            >
              Find and book trusted{' '}
              <span className='text-sky-700'>yoga teachers</span> near you
            </h1>
            <p className='mt-4 max-w-[50ch] text-neutral-600'>
              Real teachers. Real places. Real sessions. Join the early list and
              help shape Yallasana.
            </p>

            {/* ROLE TOGGLE */}
            <div className='mt-6 inline-flex rounded-2xl border border-neutral-200 bg-white p-1 text-sm shadow-sm'>
              <button
                onClick={() => setRole('student')}
                className={`rounded-xl px-4 py-2 transition ${
                  role === 'student'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                I’m a Student
              </button>
              <button
                onClick={() => setRole('teacher')}
                className={`rounded-xl px-4 py-2 transition ${
                  role === 'teacher'
                    ? 'bg-neutral-900 text-white'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                I’m a Teacher
              </button>
            </div>

            {/* EMAIL CAPTURE */}
            <form
              onSubmit={handleSubmit}
              className='mt-4 flex max-w-md items-center gap-2'
            >
              <input
                type='email'
                required
                placeholder={role === 'teacher' ? 'Work email' : 'Your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='h-12 flex-1 rounded-xl border border-neutral-300 bg-white px-4 text-base text-neutral-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500'
              />
              <input
                type='text'
                name='company'
                className='hidden'
                onChange={() => {}}
              />
              <motion.button
                type='submit'
                disabled={status === 'loading'}
                className='h-12 rounded-xl bg-sky-700 px-5 font-medium text-white shadow-sm transition hover:bg-sky-800 disabled:opacity-60'
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {status === 'loading'
                  ? 'Joining…'
                  : role === 'teacher'
                  ? 'Join as Teacher'
                  : 'Join Waitlist'}
              </motion.button>
            </form>
            {message && (
              <p
                className={`mt-2 text-sm ${
                  status === 'error' ? 'text-rose-600' : 'text-sky-700'
                }`}
              >
                {message}
              </p>
            )}

            {/* SOCIAL */}
            <div className='mt-6 flex items-center gap-4 text-sm text-neutral-600'>
              <a
                href='#'
                aria-label='Instagram'
                className='hover:text-neutral-900'
              >
                Instagram
              </a>
              <span className='h-1 w-1 rounded-full bg-neutral-300' />
              <a
                href='#'
                aria-label='TikTok'
                className='hover:text-neutral-900'
              >
                TikTok
              </a>
            </div>
          </motion.div>
        </div>

        {/* SPLIT VALUE PROPS */}
        <section
          id='students'
          className='mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-2'
        >
          <ValueBlock
            eyebrow='For Students'
            title='Book better yoga, faster'
            points={[
              'Search by location, style, level, and availability',
              'Upfront prices and clear cancellation terms',
              'DM teachers or book instantly (when live)',
            ]}
          />
          <ValueBlock
            id='teachers'
            eyebrow='For Teachers'
            title='Fill your schedule, minus the admin'
            points={[
              'Get discovered by nearby yogis',
              'Set your rates, travel radius, and calendar',
              'Keep cash or accept in‑app payments (optional)',
            ]}
          />
        </section>

        {/* FAQ */}
        <section id='faqs' className='mx-auto mt-20 max-w-3xl'>
          <h2
            className={`${caveat.className} text-2xl font-semibold tracking-tight`}
          >
            Quick questions
          </h2>
          <div className='mt-6 divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white'>
            <FAQ
              q='When will Yallasana launch?'
              a='We’re opening invites in phases across Dubai and Abu Dhabi. Join the waitlist and you’ll be first to know.'
            />
            <FAQ
              q='Is it free to join the waitlist?'
              a='Yes. We’ll email you when we’re ready for early access.'
            />
            <FAQ
              q='I’m a teacher without a freelance license—can I still join?'
              a='Yes. You can list your profile and take cash payments off‑platform. In‑app payments will be optional for licensed teachers.'
            />
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className='relative mx-auto w-full max-w-6xl px-4 pb-10 pt-6 text-sm text-neutral-500'>
        <div className='flex flex-col justify-between gap-4 md:flex-row md:items-center'>
          <p>© {new Date().getFullYear()} Yallasana. All rights reserved.</p>
          <div className='flex items-center gap-4'>
            <a href='#' className='hover:text-neutral-800'>
              Privacy
            </a>
            <a href='#' className='hover:text-neutral-800'>
              Terms
            </a>
            <a href='#' className='hover:text-neutral-800'>
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ValueBlock({
  id,
  eyebrow,
  title,
  points,
}: {
  id?: string
  eyebrow: string
  title: string
  points: string[]
}) {
  return (
    <motion.div
      id={id}
      className='rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm'
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <p className='text-xs font-medium uppercase tracking-wider text-sky-700'>
        {eyebrow}
      </p>
      <h3 className={`${caveat.className} mt-1 text-xl font-semibold`}>
        {title}
      </h3>
      <ul className='mt-3 space-y-2 text-sm text-neutral-700'>
        {points.map((p) => (
          <li key={p} className='flex items-start gap-2'>
            <span className='mt-1 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sky-700' />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

function FAQ({ q, a }: { q: string; a: string }) {
  return (
    <details className='group p-4'>
      <summary className='cursor-pointer list-none font-medium text-neutral-900'>
        <span className='mr-2 inline-block h-1.5 w-1.5 rounded-full bg-sky-700 align-middle' />
        {q}
      </summary>
      <p className='mt-2 text-sm text-neutral-600'>{a}</p>
    </details>
  )
}

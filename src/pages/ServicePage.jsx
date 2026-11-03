import { Link, Navigate, useParams } from 'react-router-dom'
import { getService, services } from '../data/services'
import Mascot from '../components/Mascot'
import Reveal from '../components/Reveal'

export default function ServicePage() {
  const { slug } = useParams()
  const service = getService(slug)

  if (!service) return <Navigate to="/" replace />

  const others = services.filter((s) => s.slug !== slug).slice(0, 4)

  return (
    <main>
      <section className="diag-stripes relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal>
            <nav className="text-sm text-muted">
              <Link to="/" className="transition hover:text-safety">Главная</Link>
              <span className="mx-2">/</span>
              <Link to="/#services" className="transition hover:text-safety">Услуги</Link>
              <span className="mx-2">/</span>
              <span className="text-paper/80">{service.title}</span>
            </nav>
            <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              {service.title}
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">{service.short}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#/#contacts"
                className="rounded-xl bg-safety px-6 py-3.5 font-bold text-ink transition hover:bg-safety-2"
              >
                Рассчитать стоимость
              </a>
              <span className="rounded-xl border border-safety/40 bg-ink-2 px-5 py-3 font-bold text-safety">
                {service.price}
              </span>
            </div>
          </Reveal>
          <Reveal delay={140} className="relative mx-auto w-full max-w-xs">
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-b from-safety/20 to-transparent blur-xl" />
            <Mascot anim="float" className="relative w-full rounded-[2rem] border border-line bg-ink-3" />
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 lg:grid-cols-[0.55fr_0.45fr]">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight">Об услуге</h2>
            <p className="mt-4 leading-relaxed text-paper/85">{service.desc}</p>
            <h3 className="mt-8 font-bold text-safety">Что входит</h3>
            <ul className="mt-3 grid gap-2.5">
              {service.included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-relaxed text-paper/85">
                  <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-safety" fill="none" stroke="currentColor" strokeWidth="2.6">
                    <path d="M4 12.5 9.5 18 20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-line bg-ink p-6">
              <h3 className="font-bold text-safety">Этапы работы</h3>
              <ol className="mt-4 grid gap-3">
                {service.steps.map((step, i) => (
                  <li key={step} className="flex items-center gap-3 text-sm">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-safety/15 text-xs font-extrabold text-safety">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
              <div className="mt-6 rounded-xl bg-ink-2 p-4 text-sm leading-relaxed text-muted">
                Точную стоимость считаем после бесплатного выезда на объект — цена фиксируется
                в договоре и не меняется.
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <Reveal>
            <h2 className="text-2xl font-extrabold tracking-tight">Другие услуги</h2>
          </Reveal>
          <div className="mt-6 flex flex-wrap gap-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-line bg-ink-2 px-4 py-2 text-sm font-semibold transition hover:border-safety hover:text-safety"
              >
                {s.title}
              </Link>
            ))}
            <Link
              to="/#services"
              className="rounded-full border border-safety/40 px-4 py-2 text-sm font-bold text-safety transition hover:bg-safety hover:text-ink"
            >
              Все услуги →
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="hazard-stripes h-3 w-full" />
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-4 py-12">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Готовы обсудить задачу?
            </h2>
            <p className="mt-2 text-muted">Выезд на оценку — бесплатно, смета — в течение суток.</p>
          </div>
          <a
            href="#/#contacts"
            className="rounded-xl bg-safety px-6 py-3.5 font-bold text-ink transition hover:bg-safety-2"
          >
            Оставить заявку
          </a>
        </div>
      </section>
    </main>
  )
}

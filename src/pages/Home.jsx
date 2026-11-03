import { Link } from 'react-router-dom'
import { services } from '../data/services'
import Mascot from '../components/Mascot'
import Reveal from '../components/Reveal'
import mascotPresent from '../assets/mascot-present.png'
import boomLift from '../assets/boom-lift.png'

const stats = [
  { value: '12+', label: 'лет опыта' },
  { value: '550+', label: 'выполненных объектов' },
  { value: '120 м', label: 'максимальная высота работ' },
  { value: '5 лет', label: 'гарантии на работы' },
]

const steps = [
  { num: '01', title: 'Заявка', text: 'Оставляете заявку или звоните — обсуждаем задачу и удобное время выезда.' },
  { num: '02', title: 'Выезд и оценка', text: 'Приезжаем на объект, осматриваем, считаем объём работ. Бесплатно.' },
  { num: '03', title: 'Смета и договор', text: 'Фиксируем стоимость и сроки в договоре. Цена не меняется в процессе.' },
  { num: '04', title: 'Работы и сдача', text: 'Выполняем работы, сдаём с фотоотчётом и даём гарантию.' },
]

const features = [
  { title: 'Допуски и аттестация', text: 'Все альпинисты аттестованы, есть допуски к работам на высоте и СРО.' },
  { title: 'Без лесов и автовышки', text: 'Метод промышленного альпинизма — быстрее и дешевле, чем строительные леса.' },
  { title: 'Страховка ответственности', text: 'Ответственность застрахована — вы не рискуете ничем.' },
  { title: 'Своя оснастка', text: 'Профессиональное снаряжение и инструмент, регулярная проверка.' },
  { title: 'Работаем без посредников', text: 'Собственные бригады — никаких субподрядов и накруток.' },
  { title: 'Фотофиксация', text: 'Отчёт «до/после» по каждому объекту, приёмка по акту.' },
]

const projects = [
  { name: 'ЖК «Северный парк»', work: 'Ремонт кровли', meta: '12 000 м² · 21 день' },
  { name: 'БЦ «Меркурий»', work: 'Мойка остекления', meta: '8 500 м² · по договору' },
  { name: 'ТЦ «Галерея»', work: 'Монтаж фасадного баннера', meta: '400 м² · 2 дня' },
  { name: 'ЖК «Речной квартал»', work: 'Герметизация швов', meta: '2 800 м.п. · 14 дней' },
]

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <section className="diag-stripes relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-16 pt-14 lg:grid-cols-[1.2fr_0.8fr] lg:pt-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-ink-2 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-safety">
              <span className="h-1.5 w-1.5 rounded-full bg-safety" />
              Промышленный альпинизм · работы на высоте
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Работаем там, где не достанет{' '}
              <span className="text-safety">подъёмник</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Ремонт кровли, фасадные работы, герметизация швов и монтаж на высоте —
              быстро, безопасно и без строительных лесов.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#/#contacts"
                className="rounded-xl bg-safety px-6 py-3.5 font-bold text-ink transition hover:bg-safety-2"
              >
                Оставить заявку
              </a>
              <a
                href="#services"
                className="rounded-xl border border-line bg-ink-2 px-6 py-3.5 font-bold text-paper transition hover:border-safety hover:text-safety"
              >
                Смотреть услуги
              </a>
            </div>
            <p className="mt-6 text-sm text-muted">
              Допуски СРО · Страховка ответственности · Выезд на оценку — бесплатно
            </p>
          </Reveal>

          <Reveal delay={150} className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rounded-[2rem] bg-safety/25 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-safety/30 bg-gradient-to-b from-ink-3 to-ink-2">
              <div className="hazard-stripes h-3 w-full" />
              <Mascot anim="still" className="mx-auto w-full" />
              <div className="hazard-stripes h-3 w-full" />
            </div>
            <div className="animate-float-slow absolute -left-6 top-8 rounded-xl border border-line bg-ink-2/95 px-4 py-2.5 text-sm font-bold shadow-lg">
              12 лет на высоте
            </div>
            <div
              className="animate-float absolute -right-4 bottom-6 rounded-xl border border-safety/40 bg-ink-2/95 px-4 py-2.5 text-sm font-bold text-safety shadow-lg"
              style={{ animationDelay: '1.2s' }}
            >
              550+ объектов сдано
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className="px-6 py-8 text-center">
              <div className="text-3xl font-extrabold text-safety sm:text-4xl">{s.value}</div>
              <div className="mt-1 text-sm text-muted">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative scroll-mt-20 overflow-hidden border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-safety">Услуги</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Что мы делаем на высоте
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Полный спектр высотных работ для жилых, коммерческих и промышленных объектов.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) * 80}>
                <Link
                  to={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-ink-2 p-5 transition hover:-translate-y-1 hover:border-safety/60"
                >
                  <span className="text-sm font-extrabold text-safety/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-bold leading-snug text-paper transition group-hover:text-safety">
                    {s.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{s.short}</p>
                  <div className="mt-4 flex items-center justify-between text-sm">
                    <span className="font-bold text-safety">{s.price}</span>
                    <span className="text-muted transition group-hover:translate-x-1 group-hover:text-safety">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section id="steps" className="scroll-mt-20 border-b border-line bg-ink-2">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-[0.35fr_0.65fr] lg:py-20">
          <Reveal className="relative z-10 mx-auto w-56 lg:w-full lg:max-w-xs">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/4 bottom-0 rounded-full bg-safety/25 blur-3xl"
            />
            <img
              src={mascotPresent}
              alt="Мастер показывает этапы работы"
              className="pointer-events-none relative mx-auto w-full select-none lg:mx-0 lg:w-[125%] lg:max-w-none"
            />
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-safety px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-ink">
              4 шага до результата
            </div>
          </Reveal>

          <div>
            <Reveal>
              <p className="text-sm font-bold uppercase tracking-widest text-safety">Процесс</p>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                Как мы работаем
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {steps.map((s, i) => (
                <Reveal key={s.num} delay={i * 80}>
                  <div className="h-full rounded-2xl border border-line bg-ink p-5">
                    <span className="text-2xl font-extrabold text-safety/50">{s.num}</span>
                    <h3 className="mt-2 font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-safety">Преимущества</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Почему нам доверяют высоту
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <Reveal key={f.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl border border-line bg-ink-2 p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-safety/15 text-safety">
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4">
                      <path d="M4 12.5 9.5 18 20 6.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-bold">{f.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="scroll-mt-20 border-b border-line bg-ink-2">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-safety">Объекты</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Последние работы
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {projects.map((p, i) => (
              <Reveal key={p.name} delay={(i % 4) * 80}>
                <div className="group h-full overflow-hidden rounded-2xl border border-line bg-ink">
                  <div className="diag-stripes flex h-36 items-end bg-ink-3 p-4">
                    <span className="rounded-md bg-ink/80 px-2.5 py-1 text-xs font-bold text-safety">
                      {p.work}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold leading-snug">{p.name}</h3>
                    <p className="mt-1 text-sm text-muted">{p.meta}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative border-b border-line">
        <div className="hazard-stripes h-3 w-full" />
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-[0.7fr_0.3fr]">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Нужны работы на высоте?
            </h2>
            <p className="mt-3 max-w-xl text-muted">
              Оставьте заявку — перезвоним в течение 15 минут, ответим на вопросы и
              договоримся о бесплатном выезде на оценку.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <a
                href="#/#contacts"
                className="rounded-xl bg-safety px-6 py-3.5 font-bold text-ink transition hover:bg-safety-2"
              >
                Заявка на выезд
              </a>
              <a href="tel:+78000000000" className="text-2xl font-extrabold tracking-wide transition hover:text-safety">
                8 800 000-00-00
              </a>
            </div>
          </Reveal>
          <div className="hidden lg:block" />
        </div>
        <Reveal
          delay={120}
          className="pointer-events-none absolute bottom-5 right-[max(0rem,calc(50vw-52rem))] hidden w-[38rem] select-none lg:block"
        >
          <img src={boomLift} alt="Автовышка с рабочим в люльке" className="w-full" />
        </Reveal>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="scroll-mt-20 bg-ink-2">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-20">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-widest text-safety">Контакты</p>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Обсудим ваш объект
            </h2>
            <ul className="mt-8 grid gap-4 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-3 font-bold text-safety">Т</span>
                <div>
                  <div className="text-muted">Телефон</div>
                  <a href="tel:+78000000000" className="font-bold hover:text-safety">8 800 000-00-00</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-3 font-bold text-safety">@</span>
                <div>
                  <div className="text-muted">Почта</div>
                  <a href="mailto:info@verholaz.ru" className="font-bold hover:text-safety">info@verholaz.ru</a>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-ink-3 font-bold text-safety">В</span>
                <div>
                  <div className="text-muted">График</div>
                  <div className="font-bold">Пн–Сб, 8:00–20:00 · выезд в день обращения</div>
                </div>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={120}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </main>
  )
}

function ContactForm() {
  return (
    <form
      className="rounded-2xl border border-line bg-ink p-6"
      onSubmit={(e) => {
        e.preventDefault()
        e.currentTarget.reset()
        alert('Заявка отправлена! Перезвоним в течение 15 минут.')
      }}
    >
      <h3 className="text-lg font-bold">Оставить заявку</h3>
      <p className="mt-1 text-sm text-muted">Перезвоним в течение 15 минут</p>
      <div className="mt-5 grid gap-3">
        <input
          required
          placeholder="Ваше имя"
          className="w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-safety"
        />
        <input
          required
          type="tel"
          placeholder="Телефон"
          className="w-full rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-safety"
        />
        <textarea
          rows={3}
          placeholder="Опишите задачу: объект, вид работ, высота"
          className="w-full resize-none rounded-xl border border-line bg-ink-2 px-4 py-3 text-sm outline-none transition placeholder:text-muted focus:border-safety"
        />
        <button className="rounded-xl bg-safety px-6 py-3.5 font-bold text-ink transition hover:bg-safety-2">
          Отправить заявку
        </button>
        <p className="text-xs text-muted">
          Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
        </p>
      </div>
    </form>
  )
}

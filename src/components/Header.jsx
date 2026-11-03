import { useState } from 'react'
import { Link } from 'react-router-dom'

const nav = [
  { to: '/#services', label: 'Услуги' },
  { to: '/#steps', label: 'Как мы работаем' },
  { to: '/#projects', label: 'Объекты' },
  { to: '/#contacts', label: 'Контакты' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 font-extrabold tracking-wide">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-safety text-ink">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
              <path d="M12 3a9 9 0 0 1 9 9v1H3v-1a9 9 0 0 1 9-9Zm-1 3.5h2V12h-2V6.5Z" />
              <rect x="2" y="14" width="20" height="3" rx="1.5" />
            </svg>
          </span>
          <span className="text-lg">
            ВЕРХО<span className="text-safety">ЛАЗ</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-paper/80 lg:flex">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className="transition hover:text-safety">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href="tel:+78000000000"
            className="text-sm font-bold tracking-wide text-paper transition hover:text-safety"
          >
            8 800 000-00-00
          </a>
          <a
            href="#/#contacts"
            className="rounded-lg bg-safety px-4 py-2 text-sm font-bold text-ink transition hover:bg-safety-2"
          >
            Оставить заявку
          </a>
        </div>

        <button
          className="grid h-10 w-10 place-items-center rounded-lg border border-line lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Меню"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-paper transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block h-0.5 w-5 bg-paper transition ${open ? 'opacity-0' : ''}`} />
            <span className={`block h-0.5 w-5 bg-paper transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </div>
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-ink px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            {nav.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)} className="py-1 hover:text-safety">
                {item.label}
              </Link>
            ))}
            <a
              href="#/#contacts"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-safety px-4 py-2.5 text-center font-bold text-ink"
            >
              Оставить заявку
            </a>
          </nav>
        </div>
      )}
    </header>
  )
}

import { Link } from 'react-router-dom'
import { services } from '../data/services'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5 font-extrabold tracking-wide">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-safety text-ink">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                <path d="M12 3a9 9 0 0 1 9 9v1H3v-1a9 9 0 0 1 9-9Zm-1 3.5h2V12h-2V6.5Z" />
                <rect x="2" y="14" width="20" height="3" rx="1.5" />
              </svg>
            </span>
            <span className="text-lg">
              ВЕРХО<span className="text-safety">ЛАЗ</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            Промышленный альпинизм и строительные работы на высоте. Допуски, страховка, гарантия на
            работы.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/60">Услуги</h3>
          <ul className="mt-4 grid gap-2 text-sm text-paper/80">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link to={`/services/${s.slug}`} className="transition hover:text-safety">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-paper/60">Контакты</h3>
          <ul className="mt-4 grid gap-2 text-sm text-paper/80">
            <li>
              <a href="tel:+78000000000" className="font-bold text-paper transition hover:text-safety">
                8 800 000-00-00
              </a>
            </li>
            <li>
              <a href="mailto:info@verholaz.ru" className="transition hover:text-safety">
                info@verholaz.ru
              </a>
            </li>
            <li className="text-muted">Пн–Сб, 8:00–20:00</li>
            <li className="text-muted">Работаем по всему городу и области</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 text-xs text-muted">
          <span>© {new Date().getFullYear()} ВЕРХОЛАЗ. Все права защищены.</span>
          <span>Высота — наша рабочая высота.</span>
        </div>
      </div>
    </footer>
  )
}

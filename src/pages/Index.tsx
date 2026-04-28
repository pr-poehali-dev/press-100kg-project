import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";
import func2url from "../../backend/func2url.json";

const API = {
  track: func2url.track,
  subscribe: func2url.subscribe,
  stats: func2url.stats,
};

const TICKER_ITEMS = [
  "СТАНЬ БЫСТРЕЕ",
  "ТРЕНИРУЙСЯ УМНЕЕ",
  "РЕЗУЛЬТАТ ГАРАНТИРОВАН",
  "8 НЕДЕЛЬ ДО ЦЕЛИ",
  "БЕЗ ЛИШНИХ СЛОВ",
  "ТОЛЬКО ПРАКТИКА",
];

const PAIN_POINTS = [
  {
    icon: "TrendingDown",
    title: "Тренируешься, но результат не растёт",
    text: "Часы в зале, а прогресс стоит на месте. Это не лень — это неправильная система.",
  },
  {
    icon: "AlertTriangle",
    title: "Постоянные травмы и «непонятные» боли",
    text: "Колени, спина, плечи — болит всё по очереди. Потому что техника и нагрузки выстроены неверно.",
  },
  {
    icon: "Clock",
    title: "Нет времени на длинные тренировки",
    text: "Работа, семья, жизнь. 3 часа в зале — роскошь. Нужна система, которая даёт результат за 60 минут.",
  },
  {
    icon: "Brain",
    title: "Не знаешь, с чего начать",
    text: "YouTube, блогеры, «эксперты» — все говорят разное. Информационный перегруз парализует действие.",
  },
  {
    icon: "Target",
    title: "Мотивация пропадает через 2 недели",
    text: "Начинаешь с огнём, а через месяц — снова на диване. Без правильной структуры прогресс не держит.",
  },
  {
    icon: "BarChart2",
    title: "Питание — полный хаос",
    text: "Считаешь калории? Не считаешь? Едешь на интуиции? Без чёткого плана — результат случайный.",
  },
];

const GUIDE_WEEKS = [
  { week: "1–2", title: "Диагностика и база", desc: "Оцениваем стартовую точку, закладываем правильную механику движений" },
  { week: "3–4", title: "Интенсификация", desc: "Наращиваем нагрузку, строим мышечную выносливость и силу" },
  { week: "5–6", title: "Пик формы", desc: "Максимальные рабочие веса, взрывная работа, жиросжигание" },
  { week: "7–8", title: "Финал и результат", desc: "Закрепляем прогресс, делаем замеры, выстраиваем дальнейший план" },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function trackEvent(event: string, data?: Record<string, string>) {
  const payload = { event, ...data, ts: Date.now().toString() };
  fetch(API.track, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }).catch(() => {});
}

export default function Index() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({ clicks: 0, subscriptions: 0, conversions: 0 });

  useEffect(() => {
    trackEvent("page_view");
    fetch(API.stats)
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => {});
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    trackEvent("pdf_subscribe", { email });
    try {
      await fetch(API.subscribe, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "pdf_offer" }),
      });
      setSubmitted(true);
      setStats((s) => ({ ...s, subscriptions: s.subscriptions + 1 }));
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  }

  function handleGuideClick() {
    trackEvent("guide_click");
    setStats((s) => ({ ...s, clicks: s.clicks + 1 }));
  }

  function handleTgClick() {
    trackEvent("telegram_click");
  }

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">

      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-center grid-pattern">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#ff5500] opacity-[0.06] blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#ffd600] opacity-[0.04] blur-[100px]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-20 text-center">
          <div className="inline-flex items-center gap-2 bg-[#ff5500]/10 border border-[#ff5500]/30 rounded-full px-4 py-2 mb-8 text-sm font-body text-[#ff8c00] animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-[#ff5500] pulse-glow inline-block" />
            Бесплатный PDF — уже доступен
          </div>

          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-none mb-6 animate-fade-up">
            <span className="block text-white">7 ошибок,</span>
            <span className="block gradient-text">которые убивают</span>
            <span className="block text-white">твой прогресс</span>
          </h1>

          <p className="font-body text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Получи бесплатный PDF с разбором 7 критических ошибок атлетов — и начни расти уже на следующей тренировке
          </p>

          <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="твой@email.ru"
                  className="sport-input flex-1 px-5 py-4 rounded-lg text-base font-body"
                />
                <button
                  type="submit"
                  disabled={loading}
                  onClick={() => trackEvent("pdf_cta_click")}
                  className="btn-fire px-8 py-4 rounded-lg text-base whitespace-nowrap"
                >
                  <span>{loading ? "Отправляем..." : "ПОЛУЧИТЬ PDF"}</span>
                </button>
              </form>
            ) : (
              <div className="inline-flex items-center gap-3 bg-[#00FF87]/10 border border-[#00FF87]/30 rounded-xl px-6 py-4 text-[#00FF87] font-body">
                <Icon name="CheckCircle" size={20} />
                PDF отправлен! Проверь почту
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-8 text-sm text-white/40 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <span className="flex items-center gap-1"><Icon name="Shield" size={14} />Без спама</span>
            <span className="flex items-center gap-1"><Icon name="Zap" size={14} />Мгновенно</span>
            <span className="flex items-center gap-1"><Icon name="Download" size={14} />Бесплатно</span>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
          <Icon name="ChevronDown" size={24} />
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap py-4 bg-[#ff5500] overflow-hidden">
        <div className="ticker-content">
          {tickerDouble.map((item, i) => (
            <span key={i} className="font-heading font-bold text-white text-lg tracking-widest uppercase mx-8">
              {item} <span className="text-white/40 mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* PAIN POINTS */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <span className="font-heading text-[#ff5500] text-sm tracking-[0.3em] uppercase">Узнаёшь себя?</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mt-3">
              Почему ты не растёшь
            </h2>
            <p className="font-body text-white/50 mt-4 max-w-xl mx-auto">
              Мы проанализировали 500+ атлетов и выявили 6 паттернов, которые стопорят 90% людей
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PAIN_POINTS.map((p, i) => (
              <RevealSection key={i}>
                <div className="pain-card p-6 rounded-xl h-full" style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-[#ff5500]/10 flex items-center justify-center shrink-0">
                      <Icon name={p.icon} size={20} className="text-[#ff5500]" />
                    </div>
                    <div>
                      <h3 className="font-heading text-base font-bold text-white uppercase mb-2">{p.title}</h3>
                      <p className="font-body text-sm text-white/50 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* OFFER — PDF */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-50" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-[#ffd600] opacity-[0.05] blur-[80px]" />
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto neon-border rounded-2xl p-8 md:p-12 scan-line bg-[#111]">
            <RevealSection>
              <div className="flex flex-col md:flex-row items-center gap-10">
                <div className="flex-1">
                  <span className="font-heading text-[#ffd600] text-xs tracking-[0.4em] uppercase">Бесплатно</span>
                  <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mt-2 mb-4">
                    PDF: 7 ошибок,<br />которые держат тебя на месте
                  </h2>
                  <ul className="space-y-3 font-body text-white/70 text-sm mb-8">
                    {[
                      "Ошибка в тренировочном объёме — почему больше ≠ лучше",
                      "Неправильное восстановление — упущенный рост",
                      "Питание без системы — как слить прогресс за выходные",
                      "Отсутствие периодизации — плато на годы",
                      "Неправильная техника — травмы и потеря КПД",
                      "Игнорирование сна — главный анаболик бесплатно",
                      "Нет цели — нет прогресса",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-[#ff5500] mt-0.5 shrink-0"><Icon name="ChevronRight" size={16} /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="твой@email.ru"
                        className="sport-input flex-1 px-4 py-3 rounded-lg text-sm font-body"
                      />
                      <button type="submit" disabled={loading} className="btn-fire px-6 py-3 rounded-lg text-sm">
                        <span>{loading ? "..." : "ХОЧУ PDF"}</span>
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-[#00FF87] font-body text-sm">
                      <Icon name="CheckCircle" size={16} />
                      Отправлен! Проверь почту
                    </div>
                  )}
                </div>
                <div className="shrink-0 float">
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#ff5500] blur-2xl opacity-30 rounded-2xl" />
                    <img
                      src="https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/files/395ae312-fe27-4053-8568-9cc72ec54ae5.jpg"
                      alt="PDF Guide"
                      className="relative w-52 h-52 object-cover rounded-2xl pulse-glow"
                    />
                    <div className="absolute -top-3 -right-3 bg-[#ffd600] text-black font-heading font-bold text-xs px-3 py-1 rounded-full uppercase">
                      FREE
                    </div>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* PAID GUIDE */}
      <section className="py-24 relative">
        <div className="absolute right-0 top-0 w-96 h-96 rounded-full bg-[#ff5500] opacity-[0.05] blur-[100px]" />
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-16">
            <span className="font-heading text-[#ff5500] text-sm tracking-[0.3em] uppercase">Для тех, кто серьёзно</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white mt-3">
              Гайд на 8 недель
            </h2>
            <p className="font-body text-white/50 mt-4 max-w-xl mx-auto">
              Полная система — тренировки, питание, восстановление. Всё разложено по дням. Ничего лишнего.
            </p>
          </RevealSection>

          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="space-y-4">
                {GUIDE_WEEKS.map((w, i) => (
                  <RevealSection key={i}>
                    <div className="flex gap-4 p-5 bg-[#111] neon-border rounded-xl" style={{ transitionDelay: `${i * 0.1}s` }}>
                      <div className="shrink-0">
                        <div className="w-14 h-14 rounded-xl bg-[#ff5500]/10 border border-[#ff5500]/20 flex items-center justify-center">
                          <span className="font-heading text-[#ff5500] font-bold text-xs leading-none text-center">НЕД<br />{w.week}</span>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-heading text-white font-bold uppercase text-sm mb-1">{w.title}</h3>
                        <p className="font-body text-white/50 text-sm">{w.desc}</p>
                      </div>
                    </div>
                  </RevealSection>
                ))}
              </div>
            </div>

            <RevealSection>
              <div className="neon-border rounded-2xl p-8 bg-[#111] text-center">
                <img
                  src="https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/files/5718a622-9a03-445b-aedd-5b392a9ef05d.jpg"
                  alt="Training guide"
                  className="w-full h-48 object-cover rounded-xl mb-6 opacity-80"
                />
                <div className="mb-2">
                  <span className="font-heading text-5xl font-bold gradient-text">3 490 ₽</span>
                </div>
                <p className="font-body text-white/40 text-xs mb-6">Разовая оплата · Доступ навсегда</p>
                <ul className="text-left space-y-2 mb-8">
                  {[
                    "56 тренировочных дней с описанием",
                    "План питания на каждую неделю",
                    "Таблица прогресса и замеров",
                    "Видео-разборы техники",
                    "Поддержка в чате 8 недель",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2 font-body text-white/70 text-sm">
                      <Icon name="Check" size={14} className="text-[#00FF87] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGuideClick}
                  className="btn-fire w-full py-4 rounded-xl text-base"
                >
                  <span>КУПИТЬ ГАЙД</span>
                </button>
                <p className="font-body text-white/30 text-xs mt-3">Нажимая, ты перейдёшь в Telegram для оплаты</p>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* STATS TICKER */}
      <div className="py-12 bg-[#111] border-y border-[#ff5500]/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { val: "500+", label: "Атлетов обучено" },
              { val: "8", label: "Недель до результата" },
              { val: "94%", label: "Достигают цели" },
            ].map((s, i) => (
              <RevealSection key={i}>
                <div className="py-4">
                  <div className="stat-number font-heading text-4xl md:text-5xl font-bold">{s.val}</div>
                  <div className="font-body text-white/40 text-sm mt-1">{s.label}</div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </div>

      {/* TELEGRAM + CONTACTS */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#ff5500] opacity-[0.04] blur-[120px]" />
        <div className="container mx-auto px-4">
          <RevealSection className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase text-white">
              Присоединяйся<br />
              <span className="gradient-text">к комьюнити</span>
            </h2>
            <p className="font-body text-white/50 mt-4 max-w-xl mx-auto">
              В Telegram — живые разборы тренировок, ответы на вопросы, мотивация и эксклюзивные материалы
            </p>
          </RevealSection>

          <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto justify-center">
            <RevealSection>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleTgClick}
                className="btn-fire flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-base w-full md:w-auto"
              >
                <span className="flex items-center gap-3">
                  <Icon name="Send" size={20} />
                  ОТКРЫТЬ TELEGRAM
                </span>
              </a>
            </RevealSection>

            <RevealSection>
              <a
                href="mailto:info@example.com"
                className="flex items-center justify-center gap-3 px-8 py-5 rounded-xl text-base border border-[#ff5500]/30 text-white/70 hover:border-[#ff5500]/60 hover:text-white transition-all duration-300 w-full md:w-auto font-heading font-semibold tracking-wide"
              >
                <Icon name="Mail" size={20} />
                НАПИСАТЬ НА ПОЧТУ
              </a>
            </RevealSection>
          </div>

          <RevealSection className="mt-12 text-center">
            <p className="font-body text-white/25 text-xs">
              © 2024 Спортивный гайд · Все права защищены
            </p>
          </RevealSection>
        </div>
      </section>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import func2url from "../../backend/func2url.json";

const API = {
  track: func2url.track,
  subscribe: func2url.subscribe,
  stats: func2url.stats,
};

const HERO_IMG = "https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/files/4d3bef16-10e6-4520-9190-62870f525c1a.jpg";
const PAIN_IMG = "https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/files/670f2ef7-e251-421b-97bb-6d1f008605c1.jpg";
const SUCCESS_IMG = "https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/files/254d0669-f859-42ec-8ed9-207d37eedaff.jpg";

const TICKER_ITEMS = ["ЖИМ НЕ ВРЁТ", "100 КГ ЗА 8 НЕДЕЛЬ", "НАЙДИ СВОЮ ОШИБКУ", "СИСТЕМА РАБОТАЕТ", "БЕЗ ВОДЫ И ОБЕЩАНИЙ", "РЕЗУЛЬТАТ ИЗМЕРЯЕТСЯ"];

const PAIN_ITEMS = [
  "Программу брал у кого-то в зале или из YouTube — у него работало, у тебя нет",
  "Смотришь на технику профи, всё повторяешь — вес стоит",
  "Советов в интернете миллион, они противоречат друг другу",
  "Думаешь «надо просто больше есть» — но непонятно сколько и чего именно",
  "После тяжёлой тренировки болят плечи или локти — но терпишь",
  "Уже начинаешь верить, что сотка — это «не моё»",
];

const PDF_CHECKLIST = [
  "7 технических и системных ошибок на отрезке 75–95 кг",
  "По каждой — простой тест: как проверить себя прямо сейчас",
  "Что конкретно исправить — без воды, без «зависит от ситуации»",
  "Почему эти ошибки не видны самому — и почему их не замечает тренер в зале",
];

const GUIDE_CHECKLIST = [
  "8-недельный план — точные веса, сеты, повторы на каждую тренировку",
  "Волновая нагрузка + линейная прогрессия — почему именно так, а не иначе",
  "Вспомогательные упражнения под три слабых места: старт, провал, дожим",
  "Питание под программу — конкретные цифры под твой вес, не «ешь больше белка»",
];

const NUTRITION_CHECKLIST = [
  "Расчёт калорийности под твои параметры — конкретные цифры, не диапазоны",
  "Белок, углеводы, жиры под жим лёжа — сколько, когда и почему",
  "Питание в тренировочный и восстановительный день — они принципиально разные",
  "Что есть до и после тренировки — с конкретным таймингом",
  "Спортивное питание — что реально работает, что переплата",
];

const AI_CARDS = [
  { icon: "💪", title: "Жим не врёт — AI-тренер", text: "Вопрос по технике, программе или прогрессу — получаешь ответ под свою ситуацию. Работает 24/7.\n\nРаботает в Telegram — бесплатно, 24/7, без регистрации." },
  { icon: "🍖", title: "Топливо — AI по питанию", text: "Рассчитает питание под твой вес и расписание. Отдельно под тренировочный день, отдельно под отдых.\n\nРаботает в Telegram — бесплатно, 24/7, без регистрации." },
  { icon: "📋", title: "Сборка — AI-конструктор программ", text: "Составит программу под любую цель. Не только жим — любое силовое направление.\n\nРаботает в Telegram — бесплатно, 24/7, без регистрации." },
];

const PRICING = [
  { icon: "🎁", title: "Старт", desc: "Гайд «7 ошибок» + канал", price: "0 руб.", cta: "Начать бесплатно →", href: "https://t.me/zhim_ne_vret", future: "«Завтра ты уже знаешь свою ошибку»", featured: false },
  { icon: "💪", title: "Базовый", desc: "Гайд «100 кг за 8 недель»", price: "700 руб.", cta: "Купить →", href: "#contact", future: "«Завтра у тебя есть план на 8 недель»", featured: false },
  { icon: "🍖", title: "Сила + Питание", desc: "Гайд по жиму + гайд по питанию", price: "1 200 руб.", cta: "Купить →", href: "#contact", future: "«Завтра работает и тренировка, и восстановление»", featured: false },
  { icon: "🤖", title: "С тренером", desc: "Оба гайда + AI «Жим не врёт»", price: "2 500 руб.", cta: "Купить →", href: "#contact", future: "«Завтра на любой вопрос есть ответ»", featured: false },
  { icon: "🔥", title: "Полная система", desc: "Оба гайда + все 3 AI", price: "3 500 руб.", cta: "Купить →", href: "#contact", future: "«Завтра у тебя тренер, нутрициолог и программист в кармане»", featured: true },
];

const FAQS = [
  { q: "— Чем это отличается от бесплатных программ в интернете?", a: "Бесплатные программы написаны для всех — значит ни для кого. Этот гайд написан для конкретного отрезка 75–85 кг 1ПМ, с конкретными цифрами и AI-ассистентом под твою личную ситуацию." },
  { q: "— Я не знаю свой 1ПМ точно. Что делать?", a: "В бесплатном гайде есть простой протокол — как выйти на реальный максимум за одну тренировку без риска травмы." },
  { q: "— У меня нет опыта соревнований. Подойдёт?", a: "Программа для любителей, которые тренируются ради результата — не ради медалей. Именно для тебя." },
  { q: "— Что если не пойдёт?", a: "Напиши в Telegram. Разберём твою ситуацию отдельно." },
  { q: "— Почему так дёшево?", a: "Потому что портфолио пока строится. Первые покупатели получают реальную цену — не маркетинговую. Когда появятся результаты клиентов — цена вырастет." },
];

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

function trackEvent(event: string, data?: Record<string, string>) {
  fetch(API.track, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, ...data }),
  }).catch(() => {});
}

function SubscribeForm({ source, size = "normal" }: { source: string; size?: "normal" | "large" }) {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    trackEvent("pdf_subscribe", { email, source });
    try {
      await fetch(API.subscribe, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
    } catch (_) {
      // ignore
    } finally {
      setDone(true);
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="flex flex-col gap-2 py-3">
        <div className="flex items-center gap-3 text-[#00ff88] font-semibold">
          <span>✔</span>
          <span>Гайд отправлен! Проверь почту</span>
        </div>
        <p style={{ fontSize: 14, color: "#6b7b8a" }}>
          Ещё больше материалов —{" "}
          <a href="https://t.me/zhim_ne_vret" target="_blank" rel="noopener noreferrer" style={{ color: "#00d4ff" }}>
            Telegram-канал «Жим не врёт»
          </a>
        </p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-3 ${size === "large" ? "max-w-lg" : "max-w-md"}`}>
      {/* Главная кнопка — Telegram */}
      <a
        href="https://t.me/zhim_coach"
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("tg_coach_click", { source })}
        className={`btn-cyan font-bold flex items-center justify-center gap-2 ${size === "large" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L7.076 14.05l-2.95-.924c-.642-.204-.657-.642.136-.953l11.57-4.461c.537-.194 1.006.131.832.509z"/>
        </svg>
        Написать в Telegram — получить гайд
      </a>
      {/* Вторичный способ — email */}
      <div>
        <p style={{ fontSize: 13, color: "#6b7b8a", marginBottom: 8 }}>Или оставь email:</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="твой@email.ru"
            className="sport-input flex-1 px-4 py-2 text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 text-sm font-bold whitespace-nowrap"
            style={{ background: "transparent", border: "1px solid rgba(0,212,255,0.5)", color: "#00d4ff", borderRadius: 8, cursor: "pointer" }}
          >
            {loading ? "..." : "Получить гайд"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Index() {
  const [burgerOpen, setBurgerOpen] = useState(false);

  useEffect(() => {
    trackEvent("page_view");
    fetch(API.stats).catch(() => {});
  }, []);

  const tickerDouble = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#060d14", color: "#e8f4f8" }}>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, background: "rgba(6,13,20,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
        <div className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
          <div style={{ fontSize: 20, fontWeight: 700, color: "#00d4ff" }}>
            ⚡ <span style={{ color: "#e8f4f8" }}>Жим не врёт</span>
          </div>
          {/* Desktop CTA */}
          <a
            href="https://t.me/zhim_coach"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("nav_cta_click")}
            className="btn-cyan px-5 py-2 text-sm font-bold hidden md:inline-flex"
          >
            Начать бесплатно →
          </a>
          {/* Burger button */}
          <button
            className="md:hidden flex flex-col justify-center items-center gap-[5px] w-9 h-9"
            onClick={() => setBurgerOpen(o => !o)}
            aria-label="Меню"
          >
            <span style={{ display: "block", width: 22, height: 2, background: "#00d4ff", borderRadius: 2, transition: "all 0.25s", transform: burgerOpen ? "translateY(7px) rotate(45deg)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#00d4ff", borderRadius: 2, transition: "all 0.25s", opacity: burgerOpen ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#00d4ff", borderRadius: 2, transition: "all 0.25s", transform: burgerOpen ? "translateY(-7px) rotate(-45deg)" : "none" }} />
          </button>
        </div>
        {/* Mobile menu */}
        {burgerOpen && (
          <div className="md:hidden" style={{ background: "rgba(6,13,20,0.98)", borderTop: "1px solid rgba(0,212,255,0.15)", padding: "16px 20px 20px" }}>
            {[
              { href: "#pain", label: "Проблема" },
              { href: "#start", label: "Бесплатный гайд" },
              { href: "#guide", label: "Платный гайд" },
              { href: "#pricing", label: "Цены" },
              { href: "#faq", label: "Вопросы" },
              { href: "#contact", label: "Контакт" },
            ].map(item => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => { setBurgerOpen(false); trackEvent("burger_nav_click"); }}
                style={{ display: "block", padding: "12px 0", fontSize: 17, fontWeight: 600, color: "#e8f4f8", borderBottom: "1px solid rgba(0,212,255,0.08)", textDecoration: "none" }}
              >
                {item.label}
              </a>
            ))}
            <a
              href="https://t.me/zhim_coach"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => { setBurgerOpen(false); trackEvent("nav_cta_click"); }}
              className="btn-cyan px-5 py-3 text-sm font-bold inline-flex mt-4"
              style={{ width: "100%", justifyContent: "center" }}
            >
              Начать бесплатно →
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="grid-pattern" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, borderRadius: "50%", background: "#00d4ff", opacity: 0.04, filter: "blur(120px)", pointerEvents: "none" }} />
        <div className="max-w-6xl mx-auto px-5 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h1 style={{ fontSize: "clamp(32px,4vw,48px)", lineHeight: 1.25, marginBottom: 24, fontWeight: 700 }}>
                Ты жмёшь одно и то же уже несколько месяцев.<br />
                <span style={{ color: "#00d4ff" }}>Вес не растёт.</span> И ты начинаешь думать, что это твой потолок.
              </h1>
              <p style={{ fontSize: 20, color: "#9ba8b3", marginBottom: 32, lineHeight: 1.6 }}>
                Это не потолок. Это одна из семи ошибок, которые совершает каждый второй атлет на отрезке 75–95 кг. Найди свою — бесплатно — прямо сейчас.
              </p>

              <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 32, padding: 20, background: "rgba(0,212,255,0.05)", borderRadius: 12, border: "1px solid rgba(0,212,255,0.2)" }}>
                <div className="float" style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(145deg,#1a2633,#0d1520)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#00d4ff", flexShrink: 0 }}>80 кг</div>
                <div style={{ fontSize: 32, color: "#00d4ff" }}>→</div>
                <div className="pulse-cyan" style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(145deg,#1a2633,#0d1520)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: "#00d4ff", flexShrink: 0 }}>100 кг</div>
                <div style={{ fontSize: 13, color: "#9ba8b3" }}>одна<br />ошибка</div>
              </div>

              <div className="mb-6">
                <SubscribeForm source="hero" size="large" />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <p style={{ fontSize: 14, color: "#6b7b8a" }}>
                  Гайд «7 ошибок жима» — сразу после того, как введёшь email
                </p>
                <p style={{ fontSize: 14, color: "#6b7b8a" }}>Уже скачали 30 атлетов</p>
              </div>
            </Reveal>

            <Reveal>
              <img src={HERO_IMG} alt="Атлет жмёт лёжа" style={{ width: "100%", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,212,255,0.2)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div className="ticker-wrap py-4" style={{ background: "#00d4ff" }}>
        <div className="ticker-content">
          {tickerDouble.map((item, i) => (
            <span key={i} style={{ fontWeight: 700, color: "#060d14", fontSize: 15, letterSpacing: "0.2em", textTransform: "uppercase", marginLeft: 40, marginRight: 40 }}>
              {item} <span style={{ opacity: 0.4, marginLeft: 12, marginRight: 12 }}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* PAIN */}
      <section id="pain" style={{ padding: "80px 0", background: "#1a0808" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", marginBottom: 32, fontWeight: 700 }}>Это про тебя?</h2>
              <ul style={{ listStyle: "none", marginBottom: 32 }}>
                {PAIN_ITEMS.map((item, i) => (
                  <li key={i} style={{ padding: "14px 0", fontSize: 17, borderBottom: "1px solid rgba(255,45,45,0.15)" }}>
                    <span className="pain-item" />{item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 18, color: "#9ba8b3", lineHeight: 1.7 }}>
                Ни одна из этих проблем не решается силой воли или «просто больше тренироваться». Каждая — <span style={{ color: "#00d4ff", fontWeight: 600 }}>технический сбой в системе</span>. И у каждой есть конкретное решение.
              </p>
            </Reveal>
            <Reveal>
              <img src={PAIN_IMG} alt="Момент провала" style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 16, filter: "grayscale(20%)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section style={{ padding: "80px 0", background: "#0a0f0a" }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700, marginBottom: 8 }}>
              Это не теория — это личный результат
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ background: "#0d1c28", borderRadius: 16, padding: 28, border: "1px solid rgba(0,212,255,0.25)", boxShadow: "0 0 48px rgba(0,212,255,0.12), 0 8px 40px rgba(0,0,0,0.6)", maxWidth: 480, width: "100%", overflow: "hidden" }}>
                  <img
                    src="https://cdn.poehali.dev/projects/3b53b863-fac0-442c-a544-4014362ff5fc/bucket/115564d5-e75d-4108-84b9-3cc5710ecf7a.png"
                    alt="Грамота — 1 место, жим лёжа 100 кг, весовая 75 кг"
                    style={{ width: "100%", borderRadius: 8, display: "block", transform: "scale(1.07)", transformOrigin: "center" }}
                  />
                </div>
                <p style={{ fontSize: 12, color: "#5a6a7a", marginTop: 12, textAlign: "center", lineHeight: 1.5 }}>
                  Открытый турнир, Владивосток, 22 февраля 2026.<br />
                  Жим лёжа без экипировки, весовая 75 кг, результат — 100 кг, 1 место
                </p>
              </div>
            </Reveal>
            <Reveal>
              <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", height: "100%" }}>
                <p style={{ fontSize: 18, color: "#e8f4f8", lineHeight: 1.8, marginBottom: 20 }}>
                  Алексей — любитель, не профессиональный пауэрлифтер. Весовая категория 75 кг, возраст 40+.
                </p>
                <p style={{ fontSize: 18, color: "#e8f4f8", lineHeight: 1.8, marginBottom: 20 }}>
                  В феврале 2026 года на открытом турнире во Владивостоке пожал <span style={{ color: "#00d4ff", fontWeight: 700 }}>100 кг и занял 1 место</span> среди ветеранов М1.
                </p>
                <p style={{ fontSize: 18, color: "#9ba8b3", lineHeight: 1.8, marginBottom: 32 }}>
                  Всё что описано в этих гайдах — это не пересказ чужих программ. Это то, что сработало лично.
                </p>
                <div style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 12, padding: "20px 24px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#5a6a7a", fontSize: 14 }}>Возраст</span>
                      <span style={{ color: "#e8f4f8", fontWeight: 600 }}>40+ (ветеран М1)</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#5a6a7a", fontSize: 14 }}>Весовая категория</span>
                      <span style={{ color: "#e8f4f8", fontWeight: 600 }}>75 кг</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#5a6a7a", fontSize: 14 }}>Результат на турнире</span>
                      <span style={{ color: "#00ff88", fontWeight: 700 }}>100 кг — 1 место</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <span style={{ color: "#5a6a7a", fontSize: 14 }}>Организация</span>
                      <span style={{ color: "#e8f4f8", fontWeight: 600 }}>АНО «НАП»</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* DEAD ZONE */}
      <section style={{ padding: "80px 0", background: "#060d14" }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 700, marginBottom: 12 }}>
              Почему 80 кг — самый коварный вес в жиме
            </h2>
          </Reveal>

          <Reveal>
            <div style={{ background: "rgba(13,28,40,0.5)", padding: "36px", borderRadius: 16, marginBottom: 32, border: "1px solid rgba(0,212,255,0.2)" }}>
              <div className="scale-bar mb-5" />
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                {[
                  { w: "0 кг", l: "Новичок", red: false, green: false },
                  { w: "70 кг", l: "Всё работает", red: false, green: false },
                  { w: "75–95 кг", l: "МЁРТВАЯ ЗОНА (ты здесь)", red: true, green: false },
                  { w: "100+ кг", l: "Осознанный атлет", red: false, green: true },
                ].map((m, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontWeight: 700, fontSize: 17, color: m.red ? "#ff2d2d" : m.green ? "#00ff88" : "#00d4ff" }}>{m.w}</div>
                    <div style={{ fontSize: 12, color: m.red ? "#ff2d2d" : "#9ba8b3", marginTop: 4 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ background: "rgba(13,28,40,0.8)", padding: 24, borderRadius: 12, borderLeft: "4px solid #ff2d2d", marginBottom: 32 }}>
              <p style={{ fontSize: 16, lineHeight: 1.7 }}>
                <strong>Анатомия проблемы:</strong> При весе 80+ кг в жиме критически включаются передняя дельта и трицепс. Именно они начинают отказывать первыми — и это невидимо при внешнем наблюдении.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { title: "До 70 кг", text: "Тело новое в движении. Прогрессия идёт от любой нагрузки. Ошибки не мешают.", danger: false },
              { title: "75–95 кг — мёртвая зона", text: "Тело адаптировалось. Линейный рост остановился. Системного подхода ещё нет. Большинство здесь и останавливаются — не потому что слабые, а потому что продолжают делать то, что работало раньше.", danger: true },
              { title: "После 95 кг", text: "Атлет уже знает свои слабые места. Работает точечно и осознанно.", danger: false },
            ].map((c, i) => (
              <Reveal key={i}>
                <div className="card-hover h-full" style={{ background: c.danger ? "rgba(255,45,45,0.08)" : "rgba(13,28,40,0.5)", padding: 24, borderRadius: 12, border: `1px solid ${c.danger ? "#ff2d2d" : "rgba(0,212,255,0.2)"}` }}>
                  <h4 style={{ color: c.danger ? "#ff2d2d" : "#00d4ff", marginBottom: 12, fontSize: 17, fontWeight: 700 }}>{c.title}</h4>
                  <p style={{ color: "#9ba8b3", fontSize: 15, lineHeight: 1.6 }}>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p style={{ fontSize: 26, color: "#00d4ff", textAlign: "center", fontWeight: 600 }}>
              Тебе не нужна мотивация. Тебе нужна другая система.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PDF OFFER */}
      <section id="start" style={{ padding: "80px 0", background: "#0d1c28" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <div className="float" style={{ maxWidth: 360, margin: "0 auto" }}>
                <div style={{ background: "#0d1c28", borderRadius: 16, padding: 40, border: "1px solid rgba(0,212,255,0.3)", boxShadow: "0 20px 60px rgba(0,212,255,0.15)", textAlign: "center" }}>
                  <div style={{ fontSize: 13, color: "#ff2d2d", fontWeight: 700, letterSpacing: "0.2em", marginBottom: 16 }}>БЕСПЛАТНЫЙ ГАЙД</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#00d4ff", marginBottom: 8 }}>7 ОШИБОК ЖИМА</div>
                  <div style={{ fontSize: 14, color: "#9ba8b3", marginBottom: 8 }}>КОТОРЫЕ КРАДУТ</div>
                  <div style={{ fontSize: 48, fontWeight: 700, color: "#ff2d2d" }}>10–20 КГ</div>
                </div>
              </div>
              <div style={{ marginTop: 24, background: "rgba(0,212,255,0.05)", padding: 20, borderRadius: 12, borderLeft: "4px solid #00d4ff" }}>
                <p style={{ color: "#00d4ff", fontWeight: 700, marginBottom: 10 }}>Из содержания:</p>
                <ul style={{ listStyle: "none" }}>
                  <li style={{ padding: "6px 0", color: "#9ba8b3", fontSize: 14 }}>— Ошибка №3: лопатки не сведены → теряешь до 8 кг на старте</li>
                  <li style={{ padding: "6px 0", color: "#9ba8b3", fontSize: 14 }}>— Ошибка №6: неверная траектория грифа → провал на 60% подъёма</li>
                </ul>
              </div>
            </Reveal>

            <Reveal>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, marginBottom: 16 }}>
                Начни бесплатно — найди свою ошибку сегодня
              </h2>
              <h3 style={{ fontSize: 22, color: "#00d4ff", marginBottom: 20 }}>Гайд «7 ошибок жима, которые крадут 10–20 кг»</h3>
              <p style={{ fontSize: 17, color: "#9ba8b3", marginBottom: 24, lineHeight: 1.6 }}>
                Не теория. Конкретная самодиагностика — читаешь, проверяешь себя, находишь свою ошибку за 15 минут.
              </p>
              <ul style={{ listStyle: "none", marginBottom: 24 }}>
                {PDF_CHECKLIST.map((item, i) => (
                  <li key={i} style={{ padding: "10px 0", fontSize: 17 }}>
                    <span className="checklist-item" />{item}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 24, color: "#00ff88", marginBottom: 24, fontWeight: 600 }}>Это бесплатно.</p>
              <SubscribeForm source="pdf_section" size="large" />

            </Reveal>
          </div>
        </div>
      </section>

      {/* GUIDE */}
      <section id="guide" style={{ padding: "80px 0", background: "#081a10" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, marginBottom: 16 }}>
                Нашёл ошибку? Теперь нужна система, которая её исправит
              </h2>
              <h3 style={{ fontSize: 22, color: "#00d4ff", marginBottom: 20 }}>Гайд «Жим не врёт: 100 кг за 8 недель»</h3>
              <p style={{ fontSize: 17, color: "#9ba8b3", marginBottom: 24, lineHeight: 1.6 }}>
                Написан не по учебнику — на основе реального тренировочного процесса. С личным опытом, конкретными цифрами и пониманием того, где именно застревают атлеты на этом отрезке.
              </p>
              <div style={{ background: "rgba(255,45,45,0.08)", border: "2px solid #ff2d2d", padding: "18px 20px", borderRadius: 12, marginBottom: 24 }}>
                <p style={{ fontSize: 15, lineHeight: 1.6 }}>
                  <strong>Для кого:</strong> Для тех, кто застрял на пути к 100 кг.<br />
                  Ниже — сначала нужна база. Выше — напиши, подберём другой инструмент.
                </p>
              </div>
              <ul style={{ listStyle: "none", marginBottom: 28 }}>
                {GUIDE_CHECKLIST.map((item, i) => (
                  <li key={i} style={{ padding: "10px 0", fontSize: 17 }}>
                    <span className="checklist-item" />{item}
                  </li>
                ))}
              </ul>
              <div style={{ background: "#0d1c28", padding: 28, borderRadius: 12, borderLeft: "4px solid #00d4ff", marginBottom: 28 }}>
                <blockquote style={{ fontSize: 16, lineHeight: 1.7, fontStyle: "italic", marginBottom: 12, color: "#9ba8b3" }}>
                  «Я не мастер спорта. Я любитель, который прошёл этот путь сам — с ошибками, застреваниями и реальными результатами. Я знаю где ты застрял, потому что сам там был. Жим не врёт — это принцип: никаких обещаний, только то, что реально работает.»
                </blockquote>
                <p style={{ color: "#00d4ff", fontWeight: 700 }}>— Автор канала «Жим не врёт»</p>
                <p style={{ color: "#9ba8b3", marginTop: 8, fontSize: 14 }}>1ПМ в начале: 82 кг → сейчас: 107 кг</p>
              </div>
              <a
                href="#pricing"
                onClick={() => trackEvent("guide_cta_click")}
                className="btn-cyan px-8 py-4 text-base font-bold inline-flex"
              >
                Получить гайд — 700 руб →
              </a>
              <p style={{ fontSize: 14, color: "#6b7b8a", marginTop: 10 }}>Доступ сразу после оплаты. Без подписок. Без автосписаний.</p>
            </Reveal>
            <Reveal>
              <img src={SUCCESS_IMG} alt="Атлет — момент успеха" style={{ width: "100%", height: 480, objectFit: "cover", borderRadius: 16, boxShadow: "0 20px 60px rgba(0,212,255,0.15)" }} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* NUTRITION */}
      <section id="nutrition" style={{ padding: "80px 0", background: "#060d14" }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="mb-12">
            <h2 style={{ fontSize: "clamp(26px,3vw,36px)", fontWeight: 700, marginBottom: 16 }}>
              Программа без правильного питания — это полработы
            </h2>
            <p style={{ fontSize: 17, color: "#9ba8b3", lineHeight: 1.6, maxWidth: 700 }}>
              Можно идеально тренироваться и не расти. Сила не растёт в зале — она растёт в периоды восстановления. А восстановление — это питание.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-12">
            <Reveal>
              <h3 style={{ fontSize: 22, color: "#00d4ff", marginBottom: 20 }}>Гайд по спортивному питанию для силовых:</h3>
              <ul style={{ listStyle: "none" }}>
                {NUTRITION_CHECKLIST.map((item, i) => (
                  <li key={i} style={{ padding: "10px 0", fontSize: 17 }}>
                    <span className="checklist-item" />{item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-4">
                <div style={{ background: "rgba(13,28,40,0.5)", padding: 24, borderRadius: 12, border: "2px solid #ff2d2d", textAlign: "center" }}>
                  <h4 style={{ color: "#ff2d2d", marginBottom: 16, fontWeight: 700 }}>БЕЗ ПИТАНИЯ</h4>
                  <div style={{ height: 80, background: "rgba(255,45,45,0.2)", borderRadius: 8 }} />
                  <p style={{ marginTop: 16, color: "#9ba8b3", fontSize: 14 }}>Тренировки → Плато</p>
                </div>
                <div style={{ background: "rgba(13,28,40,0.5)", padding: 24, borderRadius: 12, border: "2px solid #00ff88", textAlign: "center" }}>
                  <h4 style={{ color: "#00ff88", marginBottom: 16, fontWeight: 700 }}>С ПИТАНИЕМ</h4>
                  <div style={{ height: 80, background: "linear-gradient(0deg,#00ff88,rgba(0,255,136,0.1))", borderRadius: 8 }} />
                  <p style={{ marginTop: 16, color: "#9ba8b3", fontSize: 14 }}>Тренировки → Рост 1ПМ</p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className="text-center">
            <p style={{ fontSize: 24, color: "#00d4ff", fontWeight: 600, marginBottom: 32 }}>
              Один гайд даёт программу. Два гайда — дают систему.
            </p>
            <p style={{ fontSize: 24, color: "#e8f4f8", marginBottom: 20 }}>Оба гайда вместе — 1 200 руб.</p>
            <a
              href="#pricing"
              onClick={() => trackEvent("nutrition_cta_click")}
              className="btn-cyan px-8 py-4 text-base font-bold inline-flex"
            >
              Взять оба гайда — 1 200 руб →
            </a>
          </Reveal>
        </div>
      </section>

      {/* AI */}
      <section id="ai" style={{ padding: "80px 0", background: "#0d1c28" }}>
        <div className="max-w-6xl mx-auto px-5">

          {/* Intro */}
          <Reveal className="mb-16">
            <div style={{ background: "linear-gradient(135deg, rgba(255,45,45,0.06) 0%, rgba(13,28,40,0.8) 100%)", border: "1px solid rgba(255,45,45,0.2)", borderRadius: 24, padding: "56px 48px", position: "relative", overflow: "hidden" }}>
              {/* Фоновый акцент */}
              <div style={{ position: "absolute", top: -60, right: -60, width: 240, height: 240, borderRadius: "50%", background: "#ff2d2d", opacity: 0.06, filter: "blur(60px)", pointerEvents: "none" }} />

              {/* Лейбл */}
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
                <span style={{ background: "rgba(255,45,45,0.12)", border: "1px solid rgba(255,45,45,0.35)", color: "#ff2d2d", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", padding: "6px 18px", borderRadius: 999 }}>
                  Критическая проблема
                </span>
              </div>

              {/* Заголовок */}
              <h2 style={{ fontSize: "clamp(28px,3.5vw,46px)", fontWeight: 700, textAlign: "center", marginBottom: 40, lineHeight: 1.2 }}>
                У программы на бумаге<br />
                есть один <span style={{ color: "#ff2d2d" }}>критический минус</span>
              </h2>

              {/* Три тезиса */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 36 }}>
                {[
                  { icon: "❌", text: "Она не отвечает на вопросы" },
                  { icon: "❌", text: "Она не подстраивается под твою жизнь" },
                  { icon: "❌", text: "Она не знает, что делать, когда что-то пошло не по плану" },
                ].map((item, i) => (
                  <div key={i} style={{ background: "rgba(255,45,45,0.07)", border: "1px solid rgba(255,45,45,0.18)", borderRadius: 14, padding: "20px 22px", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{ fontSize: 18, lineHeight: 1, marginTop: 2, flexShrink: 0 }}>{item.icon}</span>
                    <p style={{ fontSize: 16, color: "#e8f4f8", lineHeight: 1.55, margin: 0 }}>{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Вывод */}
              <div style={{ textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 28 }}>
                <p style={{ fontSize: 18, color: "#9ba8b3", lineHeight: 1.7, maxWidth: 600, margin: "0 auto" }}>
                  Программа — это просто <strong style={{ color: "#e8f4f8" }}>бумага</strong>. Жизнь — нет.<br />
                  Именно здесь большинство и сходят с дистанции.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Scenario cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { icon: "📅", title: "Пропустил тренировку из-за работы", text: "Программа молчит. Не знаешь: пропустить? Сдвинуть? Поменять веса? Гуглишь форумы — там 10 разных советов." },
              { icon: "🤕", title: "Заболело плечо на 3-й неделе", text: "Программа не видит твою боль. Не знаешь: терпеть? Отдыхать? Менять упражнения? Бросаешь программу или рискуешь травмой." },
              { icon: "🍽️", title: "Тренировка перенеслась на утро", text: "Программа не знает твоё расписание. Что есть? Когда? Сколько углеводов в 7:00? Импровизируешь на глаз." },
            ].map((s, i) => (
              <Reveal key={i}>
                <div style={{ background: "rgba(255,45,45,0.05)", border: "1px solid rgba(255,45,45,0.2)", borderRadius: 16, padding: 28, height: "100%" }}>
                  <div style={{ fontSize: 40, marginBottom: 14 }}>{s.icon}</div>
                  <h4 style={{ color: "#e8f4f8", fontWeight: 700, fontSize: 16, marginBottom: 10 }}>{s.title}</h4>
                  <p style={{ color: "#9ba8b3", fontSize: 14, lineHeight: 1.7 }}>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Transition */}
          <Reveal>
            <div style={{ background: "rgba(0,212,255,0.06)", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 16, padding: "28px 36px", textAlign: "center", fontSize: 19, color: "#e8f4f8", lineHeight: 1.7, marginBottom: 64 }}>
              Именно поэтому <strong style={{ color: "#00d4ff" }}>80% людей бросают программы на 2–3 неделе</strong>. Не потому что слабые. Потому что программа не живая — а жизнь живая.
            </div>
          </Reveal>

          {/* Section title */}
          <Reveal className="text-center mb-4">
            <h2 style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 700 }}>
              Три AI-ассистента, которые работают как личный тренерский штаб 24/7
            </h2>
          </Reveal>
          <Reveal className="text-center mb-16">
            <p style={{ fontSize: 17, color: "#9ba8b3", maxWidth: 700, margin: "0 auto" }}>
              Не чат-боты с шаблонными ответами. Инструменты, которые понимают силовой тренинг, твою программу и твою ситуацию прямо сейчас.
            </p>
          </Reveal>

          {/* Assistant 1 */}
          <Reveal>
            <div style={{ background: "#0a1520", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 20, padding: "40px", marginBottom: 24 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>💪</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#e8f4f8", marginBottom: 20 }}>
                Ассистент 1: «Жим не врёт» — AI-тренер по жиму лёжа
              </h3>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Что делает:</h4>
              <ul style={{ listStyle: "none", marginBottom: 28 }}>
                {[
                  "Отвечает на любой вопрос по технике жима — в любой момент, без ожидания",
                  "Корректирует программу если пропустил тренировку, заболел или изменились обстоятельства",
                  "Подбирает вспомогательные упражнения под твоё слабое место: старт, провал или дожим",
                  "Объясняет почему вес встал — и что конкретно менять в программе",
                ].map((item, i) => (
                  <li key={i} style={{ padding: "8px 0", fontSize: 16, color: "#e8f4f8", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#00ff88", marginRight: 10 }}>✔</span>{item}
                  </li>
                ))}
              </ul>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Пример диалога:</h4>
              <div style={{ background: "#060d14", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ background: "rgba(0,212,255,0.12)", padding: "14px 18px", borderRadius: 12, marginBottom: 10, textAlign: "right" }}>
                  <p style={{ fontSize: 15 }}><strong>Ты:</strong> Пропустил вторник, сегодня четверг. Что делать?</p>
                </div>
                <div style={{ background: "rgba(0,255,136,0.08)", padding: "14px 18px", borderRadius: 12 }}>
                  <p style={{ fontSize: 15 }}><strong>Ассистент:</strong> Выполни программу вторника сегодня, но убери вспомогательные упражнения. Основной вес не снижай — тело не потеряло силу за 2 дня. Пятницу сдвинь на субботу. Программа не сломана.</p>
                </div>
              </div>
              <div style={{ background: "rgba(0,212,255,0.06)", borderLeft: "4px solid #00d4ff", padding: "16px 20px", borderRadius: "0 12px 12px 0", marginBottom: 16 }}>
                <p style={{ fontSize: 15, lineHeight: 1.7 }}><strong>Почему это ценно:</strong> Тренер в зале возьмёт за такую консультацию 1500–3000 руб за раз. Здесь тренер у тебя в кармане — столько раз, сколько нужно.</p>
              </div>
              <p style={{ color: "#00ff88", fontWeight: 700 }}>Доступ: неограниченный, навсегда. Без подписок.</p>
              <p style={{ color: "#9ba8b3", fontSize: 14, marginTop: 8 }}>Работает в Telegram — бесплатно, 24/7, без регистрации.</p>
            </div>
          </Reveal>

          {/* Assistant 2 */}
          <Reveal>
            <div style={{ background: "#0a1520", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 20, padding: "40px", marginBottom: 24 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>🍖</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#e8f4f8", marginBottom: 20 }}>
                Ассистент 2: «Топливо» — AI по питанию для силовых
              </h3>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Что делает:</h4>
              <ul style={{ listStyle: "none", marginBottom: 28 }}>
                {[
                  "Рассчитывает питание под твой вес, цель и уровень нагрузки",
                  "Даёт разные схемы на тренировочный день и день отдыха",
                  "Корректирует рацион если сместилось время тренировки (утро/вечер)",
                  "Подбирает спортивное питание под бюджет: что реально нужно, а что маркетинг",
                ].map((item, i) => (
                  <li key={i} style={{ padding: "8px 0", fontSize: 16, color: "#e8f4f8", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#00ff88", marginRight: 10 }}>✔</span>{item}
                  </li>
                ))}
              </ul>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Пример диалога:</h4>
              <div style={{ background: "#060d14", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ background: "rgba(0,212,255,0.12)", padding: "14px 18px", borderRadius: 12, marginBottom: 10, textAlign: "right" }}>
                  <p style={{ fontSize: 15 }}><strong>Ты:</strong> Тренировка перенеслась с вечера на 7 утра. Что есть?</p>
                </div>
                <div style={{ background: "rgba(0,255,136,0.08)", padding: "14px 18px", borderRadius: 12 }}>
                  <p style={{ fontSize: 15 }}><strong>Ассистент:</strong> За 1,5 часа до тренировки: овсянка 80 г + банан. Сразу после — протеин 30 г + быстрые углеводы. Полноценный завтрак через 40–60 минут. Не тренируйся натощак — потеряешь силу.</p>
                </div>
              </div>
              <div style={{ background: "rgba(0,212,255,0.06)", borderLeft: "4px solid #00d4ff", padding: "16px 20px", borderRadius: "0 12px 12px 0", marginBottom: 16 }}>
                <p style={{ fontSize: 15, lineHeight: 1.7 }}><strong>Почему это ценно:</strong> Разовая консультация нутрициолога стоит дороже, чем сам гайд. Здесь ты можешь уточнять питание каждый раз, когда меняется жизнь.</p>
              </div>
              <p style={{ color: "#00ff88", fontWeight: 700 }}>Доступ: можно спрашивать каждый день.</p>
              <p style={{ color: "#9ba8b3", fontSize: 14, marginTop: 8 }}>Работает в Telegram — бесплатно, 24/7, без регистрации.</p>
            </div>
          </Reveal>

          {/* Assistant 3 */}
          <Reveal>
            <div style={{ background: "#0a1520", border: "1px solid rgba(0,212,255,0.2)", borderRadius: 20, padding: "40px", marginBottom: 48 }}>
              <div style={{ fontSize: 44, marginBottom: 12 }}>📋</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#e8f4f8", marginBottom: 20 }}>
                Ассистент 3: «Сборка» — AI-конструктор программ
              </h3>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Что делает:</h4>
              <ul style={{ listStyle: "none", marginBottom: 28 }}>
                {[
                  "Составляет новую программу когда ты выжал 100 кг и хочешь следующую цель",
                  "Адаптирует план если стало меньше времени (2 тренировки в неделю вместо 3)",
                  "Собирает программы под другие движения: присед, тяга, армейский жим",
                  "Перестраивает тренировки если меняется цель: сила, масса, выносливость",
                ].map((item, i) => (
                  <li key={i} style={{ padding: "8px 0", fontSize: 16, color: "#e8f4f8", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                    <span style={{ color: "#00ff88", marginRight: 10 }}>✔</span>{item}
                  </li>
                ))}
              </ul>
              <h4 style={{ color: "#00d4ff", fontSize: 14, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Пример диалога:</h4>
              <div style={{ background: "#060d14", borderRadius: 16, padding: 24, marginBottom: 24 }}>
                <div style={{ background: "rgba(0,212,255,0.12)", padding: "14px 18px", borderRadius: 12, marginBottom: 10, textAlign: "right" }}>
                  <p style={{ fontSize: 15 }}><strong>Ты:</strong> Выжал 100 кг. Хочу 120 кг, но тренируюсь только 2 раза в неделю. Нужен план на 8–10 недель.</p>
                </div>
                <div style={{ background: "rgba(0,255,136,0.08)", padding: "14px 18px", borderRadius: 12 }}>
                  <p style={{ fontSize: 15 }}><strong>Ассистент:</strong> Предлагаю программу на 10 недель, 2 тренировки. Неделя А — тяжёлый жим 5×3 + присед. Неделя B — средний жим 4×6 + тяга. Нагрузка волновая, рост постепенный — под твой уровень. Могу выгрузить полный план в таблицу.</p>
                </div>
              </div>
              <div style={{ background: "rgba(0,212,255,0.06)", borderLeft: "4px solid #00d4ff", padding: "16px 20px", borderRadius: "0 12px 12px 0", marginBottom: 16 }}>
                <p style={{ fontSize: 15, lineHeight: 1.7 }}><strong>Почему это ценно:</strong> Ты не привязан к одной программе. Цели меняются — программа меняется вместе с ними. Это инструмент не на 8 недель, а на годы.</p>
              </div>
              <p style={{ color: "#9ba8b3", fontSize: 14, marginTop: 8 }}>Работает в Telegram — бесплатно, 24/7, без регистрации.</p>
            </div>
          </Reveal>

          {/* Comparison table */}
          <Reveal>
            <div style={{ overflowX: "auto", marginBottom: 48 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 15 }}>
                <thead>
                  <tr>
                    <th style={{ background: "rgba(255,45,45,0.12)", color: "#ff2d2d", padding: "16px 20px", textAlign: "left", borderRadius: "12px 0 0 0", fontWeight: 700, fontSize: 16 }}>Без ассистентов</th>
                    <th style={{ background: "rgba(0,255,136,0.10)", color: "#00ff88", padding: "16px 20px", textAlign: "left", borderRadius: "0 12px 0 0", fontWeight: 700, fontSize: 16 }}>С ассистентами</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Вопрос → Google → 10 разных советов → сомнения", "Вопрос → точный ответ за 10 секунд → продолжаешь тренироваться"],
                    ["Программа не подходит под расписание → бросаешь на 3-й неделе", "Программа подстраивается под твою жизнь → доходишь до конца"],
                    ["Консультация тренера: 2000 руб за встречу", "Консультации без лимита — каждый день когда нужно"],
                    ["Переплата за лишний спортпит и ненужные «курсы»", "Понимаешь что действительно работает, экономишь деньги"],
                  ].map(([bad, good], i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                      <td style={{ padding: "16px 20px", color: "#9ba8b3", background: i % 2 === 0 ? "rgba(255,45,45,0.04)" : "rgba(255,45,45,0.02)" }}>{bad}</td>
                      <td style={{ padding: "16px 20px", color: "#e8f4f8", background: i % 2 === 0 ? "rgba(0,255,136,0.05)" : "rgba(0,255,136,0.03)" }}>{good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          {/* Mega message */}
          <Reveal>
            <div style={{ textAlign: "center", background: "linear-gradient(135deg,rgba(0,212,255,0.08),rgba(0,255,136,0.06))", border: "1px solid rgba(0,212,255,0.25)", borderRadius: 20, padding: "48px 40px" }}>
              <p style={{ fontSize: "clamp(22px,2.5vw,32px)", fontWeight: 700, color: "#e8f4f8", lineHeight: 1.5, marginBottom: 20 }}>
                Программа даёт тебе план на 8 недель.<br />
                <span style={{ color: "#00d4ff" }}>Ассистенты дают тебе тренера на всю жизнь.</span>
              </p>
              <p style={{ fontSize: 17, color: "#9ba8b3", maxWidth: 600, margin: "0 auto" }}>
                Один вопрос в нужный момент стоит дороже всей программы. А здесь вопросов может быть сколько угодно.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" style={{ padding: "80px 0", background: "#060d14" }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="text-center mb-12">
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 700 }}>Выбери свой шаг</h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            {PRICING.map((p, i) => (
              <Reveal key={i}>
                <div
                  className="card-hover flex flex-col h-full"
                  style={{
                    background: p.featured ? "linear-gradient(135deg,rgba(0,212,255,0.1),rgba(0,255,136,0.1))" : "#0d1c28",
                    padding: "28px 20px",
                    borderRadius: 16,
                    border: `2px solid ${p.featured ? "#00d4ff" : "rgba(0,212,255,0.2)"}`,
                    textAlign: "center",
                    transform: p.featured ? "scale(1.04)" : undefined,
                  }}
                >
                  <div style={{ fontSize: 44, marginBottom: 14 }}>{p.icon}</div>
                  <h4 style={{ color: "#00d4ff", marginBottom: 12, fontSize: 18, fontWeight: 700 }}>{p.title}</h4>
                  <p style={{ color: "#9ba8b3", fontSize: 13, marginBottom: 16, flex: 1 }}>{p.desc}</p>
                  <div style={{ fontSize: 28, fontWeight: 700, color: "#e8f4f8", marginBottom: 20 }}>{p.price}</div>
                  <a
                    href={p.href}
                    target={p.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("pricing_click", { plan: p.title })}
                    className="btn-cyan w-full py-3 text-sm font-bold"
                  >
                    {p.cta}
                  </a>
                  <p style={{ fontSize: 11, color: "#6b7b8a", marginTop: 12, fontStyle: "italic" }}>{p.future}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p style={{ textAlign: "center", color: "#9ba8b3", fontSize: 17 }}>
              Не знаешь с чего начать? Начни с бесплатного PDF — найди свою ошибку, потом решишь.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: "80px 0", background: "#0d1c28" }}>
        <div className="max-w-6xl mx-auto px-5">
          <Reveal className="mb-10">
            <h2 style={{ fontSize: "clamp(26px,3vw,40px)", fontWeight: 700 }}>Часто спрашивают</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {FAQS.map((f, i) => (
              <Reveal key={i}>
                <div style={{ background: "rgba(13,28,40,0.5)", padding: 24, borderRadius: 12, borderLeft: "4px solid #00d4ff" }}>
                  <h4 style={{ color: "#00d4ff", marginBottom: 10, fontWeight: 700, fontSize: 16 }}>{f.q}</h4>
                  <p style={{ color: "#9ba8b3", lineHeight: 1.7, fontSize: 15 }}>{f.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="contact" className="grid-pattern" style={{ padding: "120px 0", background: "#060d14", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "#00d4ff", opacity: 0.04, filter: "blur(120px)", pointerEvents: "none" }} />
        <div className="max-w-4xl mx-auto px-5 text-center" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            <h2 style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 700, marginBottom: 16 }}>
              Сотка не придёт сама.
            </h2>
            <p style={{ fontSize: 26, color: "#9ba8b3", marginBottom: 60 }}>
              Но с правильной системой она ближе, чем ты думаешь.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              <div>
                <h4 style={{ color: "#00d4ff", marginBottom: 10, fontSize: 18, fontWeight: 700 }}>Не готов платить — начни бесплатно:</h4>
                <p style={{ color: "#9ba8b3", marginBottom: 20 }}>Подпишись на канал и получи PDF с разбором твоих ошибок. Это ни к чему не обязывает.</p>
                <SubscribeForm source="final_cta" size="large" />
                <div className="mt-3">
                  <a
                    href="https://t.me/zhim_ne_vret"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("tg_click")}
                    className="btn-cyan px-8 py-4 text-base font-bold inline-flex mt-3"
                  >
                    Получить гайд бесплатно →
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ color: "#00d4ff", marginBottom: 10, fontSize: 18, fontWeight: 700 }}>Знаешь чего хочешь — бери и работай:</h4>
                <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                  <a
                    href="https://t.me/zhim_ne_vret"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("pricing_click", { plan: "Базовый" })}
                    className="btn-outline px-7 py-4 text-base font-bold"
                  >
                    Базовый гайд — 700 руб →
                  </a>
                  <a
                    href="https://t.me/zhim_ne_vret"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackEvent("pricing_click", { plan: "Полная система" })}
                    className="btn-cyan px-7 py-4 text-base font-bold"
                  >
                    Полная система — 3 500 руб →
                  </a>
                </div>
              </div>

              <div>
                <h4 style={{ color: "#00d4ff", marginBottom: 10, fontSize: 18, fontWeight: 700 }}>Остались вопросы?</h4>
                <p style={{ color: "#9ba8b3" }}>
                  Напиши в Telegram — отвечу лично.{" "}
                  <a href="https://t.me/zhim_ne_vret" style={{ color: "#00d4ff" }} onClick={() => trackEvent("tg_personal_click")}>@zhim_ne_vret</a>
                </p>
              </div>
            </div>

            <p style={{ marginTop: 60, color: "#6b7b8a", fontSize: 13 }}>
              © 2024 Жим не врёт · Все права защищены
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
import { useEffect, useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Plus,
  Minus,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  Wine,
  Leaf,
  MessageCircle,
  Check,
  Mail,
  MapPin,
} from "lucide-react";
import { products, money, faqs, storeUrl, whatsapp } from "../lib/catalogue";
import { useContact, useSubscribe } from "../queries/leads";
import { Modal } from "../components/modal";

function Brand({ footer = false }: { footer?: boolean }) {
  return (
    <a
      className={`brand ${footer ? "brand-footer" : ""}`}
      href="#home"
      aria-label="The Sparkle Bubbly home"
    >
      <span className="brand-the">THE</span>
      <span className="brand-name">
        Sparkle<span className="brand-star">✧</span>
      </span>
      <span className="brand-bubbly">B U B B L Y</span>
    </a>
  );
}
function WhatsAppLink({
  text = "Let’s chat",
  message,
  className = "text-link",
}: {
  text?: string;
  message?: string;
  className?: string;
}) {
  return (
    <a href={whatsapp(message)} target="_blank" rel="noopener noreferrer" className={className}>
      <MessageCircle size={17} />
      {text}
      <ArrowUpRight size={16} />
    </a>
  );
}
function Newsletter({ onPrivacy }: { onPrivacy: () => void }) {
  const subscription = useSubscribe();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    subscription.mutate({
      email: String(data.get("email")),
      consent: true,
      website: String(data.get("website") || ""),
    });
  }
  return (
    <div className="newsletter">
      <div>
        <p className="eyebrow">A LITTLE SPARKLE IN YOUR INBOX</p>
        <h2>
          Good things.
          <br />
          <em>Worth sharing.</em>
        </h2>
        <p>
          New pours, beautiful occasions and a little inspiration.
          <br />
          Be part of our circle.
        </p>
      </div>
      <form onSubmit={submit} className="newsletter-form">
        <label htmlFor="newsletter-email">Your email address</label>
        <div className="email-row">
          <input
            aria-label="Newsletter email address"
            id="newsletter-email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
          <button type="submit" disabled={subscription.isPending} aria-label="Join newsletter">
            {subscription.isPending ? "Joining…" : <ArrowRight size={24} />}
          </button>
        </div>
        <input
          className="honeypot"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className="consent">
          <input type="checkbox" aria-label="Consent to newsletter updates" required />I agree to
          receive email updates. Unsubscribe anytime.
        </label>
        <button type="button" className="privacy-link" onClick={onPrivacy}>
          Read our privacy notice
        </button>
        <output>
          {subscription.isSuccess && (
            <p className="form-success">
              <Check size={16} />
              You’re on the list. Here’s to more sparkling moments.
            </p>
          )}
          {subscription.isError && (
            <p className="form-error">We couldn’t save your signup. Please try again.</p>
          )}
        </output>
      </form>
    </div>
  );
}
function Contact({ onPrivacy }: { onPrivacy: () => void }) {
  const contact = useContact();
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    contact.mutate({
      name: String(d.get("name")),
      email: String(d.get("email")),
      occasion: String(d.get("occasion")) as "Everyday sparkle",
      message: String(d.get("message")),
      consent: true,
      website: String(d.get("website") || ""),
    });
  }
  return (
    <section className="contact-section section" id="contact">
      <div className="contact-copy">
        <p className="eyebrow">LET’S MAKE IT A MOMENT</p>
        <h2>
          A small gathering.
          <br />A grand occasion.
          <br />
          <em>Start here.</em>
        </h2>
        <p>
          From your first case to a celebration at scale, tell us what you have in mind. For direct
          ordering and delivery arrangements, chat with us on WhatsApp.
        </p>
        <WhatsAppLink text="Chat on WhatsApp" className="button button-dark" />
        <a className="contact-line" href="mailto:info@sparkle-bubbly.co.za">
          <Mail size={17} />
          info@sparkle-bubbly.co.za
        </a>
        <a
          className="contact-line"
          href="https://maps.app.goo.gl/gfLLe49LW5uVb9XU8"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MapPin size={18} />
          <span>
            6 Pike Close, Hagley
            <br />
            Cape Town, 7580, South Africa
          </span>
          <ArrowUpRight size={16} />
        </a>
        <small>Please arrange collections and visits in advance.</small>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <div className="two-fields">
          <label>
            Your name
            <input
              aria-label="Your name"
              name="name"
              placeholder="Full name"
              required
              minLength={2}
              maxLength={100}
            />
          </label>
          <label>
            Email address
            <input
              name="email"
              aria-label="Email address"
              type="email"
              placeholder="you@example.com"
              required
              maxLength={254}
            />
          </label>
        </div>
        <label>
          What are we celebrating?
          <select name="occasion">
            <option>Everyday sparkle</option>
            <option>Wedding or celebration</option>
            <option>Retail or hospitality</option>
            <option>Something else</option>
          </select>
        </label>
        <label>
          Your message
          <textarea
            name="message"
            aria-label="Your message"
            rows={4}
            placeholder="Tell us about your occasion, guest count or favourite pour…"
            required
            minLength={10}
            maxLength={3000}
          />
        </label>
        <input
          name="website"
          className="honeypot"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <label className="consent">
          <input type="checkbox" aria-label="Consent to enquiry processing" required />I agree to my
          details being used to respond to this enquiry.
        </label>
        <button type="button" onClick={onPrivacy} className="privacy-link">
          Privacy notice
        </button>
        <button className="button button-dark" disabled={contact.isPending}>
          {contact.isPending ? "Saving enquiry…" : "Send enquiry"}
          <ArrowUpRight size={18} />
        </button>
        <output>
          {contact.isSuccess && (
            <p className="form-success">
              Your enquiry has been saved. For a direct response, please{" "}
              <a href="mailto:info@sparkle-bubbly.co.za">email us</a> or chat on WhatsApp.
            </p>
          )}
          {contact.isError && (
            <p className="form-error">
              We couldn’t save your enquiry. Please try again or contact us directly.
            </p>
          )}
        </output>
        <small>This form records your enquiry; it does not send an email.</small>
      </form>
    </section>
  );
}

export default function Landing() {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [privacy, setPrivacy] = useState(false);
  const [selected, setSelected] = useState<(typeof products)[number] | null>(null);
  const [toast, setToast] = useState("");
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem("sparkle-cart") || "{}");
      const safe: Record<string, number> = {};
      for (const p of products) {
        const q = raw?.[p.id];
        if (Number.isInteger(q) && q > 0 && q <= 99) safe[p.id] = q;
      }
      setCart(safe);
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem("sparkle-cart", JSON.stringify(cart));
  }, [cart, loaded]);
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(""), 3200);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const total = products.reduce((sum, p) => sum + (cart[p.id] || 0) * p.price, 0);
  function change(id: string, delta: number) {
    setCart((c) => {
      const next = { ...c };
      next[id] = Math.min(99, Math.max(0, (next[id] || 0) + delta));
      if (!next[id]) delete next[id];
      return next;
    });
    setCopied(false);
  }
  function add(id: string) {
    change(id, 1);
    setToast("A little sparkle, added to your bag.");
  }
  const summary =
    products
      .filter((p) => cart[p.id])
      .map(
        (p) =>
          `${cart[p.id]} × ${p.brand} ${p.name} (${p.size}), case of 6 — ${money(p.price * cart[p.id])}`,
      )
      .join("\n") + `\nIndicative total: ${money(total)}`;
  async function copyCart() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setToast("Copy unavailable. Your selections are listed in your bag.");
    }
  }
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="announcement">
        A beautiful pour. A welcome-for-all toast. <span>ALCOHOL-FREE, ALWAYS.</span>
      </div>
      <header className="site-header" id="home">
        <nav className="nav-left" aria-label="Main navigation">
          <a href="#collection">The collection</a>
          <a href="#story">Our story</a>
        </nav>
        <Brand />
        <div className="nav-right">
          <a href="#occasions">For every occasion</a>
          <button
            className="bag-button"
            onClick={() => setCartOpen(true)}
            aria-label={`Open bag, ${count} cases`}
          >
            <ShoppingBag size={19} />
            <span>Bag ({count})</span>
          </button>
          <button
            className="mobile-menu icon-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["The collection", "collection"],
            ["Our story", "story"],
            ["For every occasion", "occasions"],
            ["Get in touch", "contact"],
          ].map(([name, id]) => (
            <a href={`#${id}`} key={id} onClick={() => setMenuOpen(false)}>
              {name}
              <ArrowUpRight size={18} />
            </a>
          ))}
        </nav>
      )}
      <main id="main">
        <section className="hero section">
          <div className="hero-heading">
            <p className="eyebrow">ALCOHOL-FREE SPARKLING GRAPE JUICE · CAPE TOWN</p>
            <h1>
              Life deserves <em>a little sparkle.</em>
            </h1>
            <div className="hero-caption">
              <span>All the celebration. None of the alcohol.</span>
              <a href="#collection">
                DISCOVER YOUR POUR <ArrowDown size={14} />
              </a>
            </div>
          </div>
          <div className="hero-stage">
            <div className="hero-stage-copy">
              <span className="stage-number">01 / THE CELEBRATION COLLECTION</span>
              <h2>
                Beautiful bubbles.
                <br />
                <em>Pure possibility.</em>
              </h2>
              <p>
                Premium alcohol-free sparkling grape juice. Thoughtfully chosen for the moments that
                matter.
              </p>
              <a href="#collection" className="button button-dark">
                Shop the collection
                <ArrowUpRight size={18} />
              </a>
            </div>
            <div
              className="bottle-scene"
              aria-label="McGregor Winery sparkling red and white grape juices"
            >
              <div className="scene-orbit orbit-one" />
              <div className="scene-orbit orbit-two" />
              <span className="scene-spark spark-one">✧</span>
              <span className="scene-spark spark-two">✧</span>
              <span className="scene-spark spark-three">✦</span>
              <div className="plinth" />
              <img
                className="hero-bottle white-bottle"
                src="/images/mcgregor-white.png"
                alt="McGregor Winery alcohol-free sparkling white grape juice, cork-finished bottle"
                fetchPriority="high"
              />
              <img
                className="hero-bottle red-bottle"
                src="/images/mcgregor-red.png"
                alt="McGregor Winery alcohol-free sparkling red grape juice, cork-finished bottle"
                fetchPriority="high"
              />
            </div>
            <div className="hero-detail">
              <span className="hero-seal">
                THE ART OF
                <br />
                <em>celebrating</em>
                <br />
                INCLUSIVELY
              </span>
              <p>
                RED & WHITE GRAPE
                <br />
                750 ml · Cork finish
              </p>
              <a href="#collection" aria-label="Explore celebration collection">
                <ArrowUpRight size={29} />
              </a>
            </div>
            <span className="stage-bottom">RAISE A GLASS. INCLUDE EVERYONE.</span>
          </div>
          <div className="benefit-strip">
            <span>
              <Sparkles size={17} />
              Alcohol-free enjoyment
            </span>
            <span>
              <Leaf size={18} />
              Grape goodness
            </span>
            <span>
              <Wine size={17} />
              Celebration-ready
            </span>
            <span>
              Made for meaningful moments
              <ArrowUpRight size={15} />
            </span>
          </div>
        </section>
        <section className="story section" id="story">
          <p className="eyebrow">A DIFFERENT KIND OF BUBBLY</p>
          <h2>
            For the toast.
            <br />
            For the togetherness.
            <br />
            <em>For everyone.</em>
          </h2>
          <div className="story-bottom">
            <span className="large-star">✧</span>
            <div>
              <p>
                We believe a beautiful celebration should never leave anyone out. The Sparkle Bubbly
                brings a considered collection of premium non-alcoholic grape juices to your
                table—with all the ceremony, elegance and joy of a special pour.
              </p>
              <p>
                From our home in Cape Town to your next meaningful moment. Celebrate beautifully.
                Sip inclusively.
              </p>
              <WhatsAppLink text="Meet your next favourite pour" />
            </div>
          </div>
        </section>
        <section className="collection section" id="collection">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THOUGHTFULLY CHOSEN. BEAUTIFULLY POURED.</p>
              <h2>
                Find your <em>sparkle.</em>
              </h2>
            </div>
            <span className="collection-note">
              Six units per case.
              <br />
              So there’s always a little more to share.
            </span>
          </div>
          <div className="collection-toolbar">
            <div className="filters" aria-label="Filter collection">
              {[
                ["all", "The full collection"],
                ["celebration", "The celebration bottles"],
                ["portable", "On-the-go"],
              ].map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                  className={filter === key ? "active" : ""}
                >
                  {label}
                </button>
              ))}
            </div>
            <span>
              {products.filter((p) => filter === "all" || p.type === filter).length} considered
              pours
            </span>
          </div>
          <div className="product-grid">
            {products
              .filter((p) => filter === "all" || p.type === filter)
              .map((p) => (
                <article className="product-card" key={p.id}>
                  <button
                    className={`product-image ${p.tone}`}
                    onClick={() => setSelected(p)}
                    aria-label={`View ${p.brand} ${p.name}`}
                  >
                    <span className="product-index">
                      0{products.findIndex((x) => x.id === p.id) + 1}
                    </span>
                    <span className="product-type">
                      {p.type === "celebration"
                        ? "THE CELEBRATION COLLECTION"
                        : "THE EVERYDAY COLLECTION"}
                    </span>
                    <img
                      src={`/images/${p.image}`}
                      alt={`${p.brand} ${p.name}, ${p.size}`}
                      loading="lazy"
                    />
                    <span className="view-product">
                      Discover the pour
                      <ArrowUpRight size={16} />
                    </span>
                  </button>
                  <div className="product-info">
                    <p className="eyebrow">{p.brand}</p>
                    <h3>
                      <button onClick={() => setSelected(p)}>{p.name}</button>
                    </h3>
                    <p className="product-size">{p.size}</p>
                    <div className="product-purchase">
                      <span>
                        {money(p.price)} <small>/ case of 6</small>
                      </span>
                      <button
                        aria-label={`Add case of ${p.brand} ${p.name} to bag`}
                        onClick={() => add(p.id)}
                      >
                        <Plus size={17} />
                        Add to bag
                      </button>
                    </div>
                  </div>
                </article>
              ))}
          </div>
          <div className="collection-footnote">
            <p>
              Indicative case prices. Subject to current pricing and stock availability in our
              store.
            </p>
            <WhatsAppLink
              text="Need a little more? Ask about bulk orders"
              message="Hello! I would like a bulk quotation for The Sparkle Bubbly range."
            />
          </div>
        </section>
        <section className="occasion section" id="occasions">
          <div className="occasion-image">
            <img
              src="/images/celebration.jpg"
              alt="Illustrative outdoor celebration table with flowers, candles and elegant glassware"
              loading="lazy"
            />
            <div className="occasion-image-caption">
              <span>THE BEAUTY OF BEING TOGETHER</span>
              <span>✧</span>
            </div>
          </div>
          <div className="occasion-copy">
            <p className="eyebrow">MAKE ROOM FOR EVERYONE</p>
            <h2>
              Every occasion.
              <br />
              <em>Extraordinary.</em>
            </h2>
            <p>
              A welcome drink. A wedding toast. An impromptu picnic. There’s a beautiful pour for
              all of life’s chapters.
            </p>
            <div className="occasion-list">
              {[
                ["01", "Weddings & celebrations", "For the table, the toast and every guest."],
                [
                  "02",
                  "Retail & hospitality",
                  "A considered non-alcoholic option for your shelf or menu.",
                ],
                [
                  "03",
                  "Everyday little luxuries",
                  "Because the small moments deserve sparkle, too.",
                ],
              ].map(([n, t, d]) => (
                <a
                  href={whatsapp(
                    `Hello! I would like to enquire about grape juice for ${t.toLowerCase()}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  key={n}
                >
                  <span>{n}</span>
                  <div>
                    <h3>{t}</h3>
                    <p>{d}</p>
                  </div>
                  <ArrowUpRight size={22} />
                </a>
              ))}
            </div>
            <WhatsAppLink text="Let’s plan your perfect pour" />
          </div>
        </section>
        <section className="quote-band">
          <span>✧</span>
          <h2>
            All the joy.
            <br />
            <em>Everyone included.</em>
          </h2>
          <a href="#collection" className="button button-outline">
            Find your celebration
            <ArrowUpRight size={18} />
          </a>
        </section>
        <section className="faq section" id="faq">
          <div>
            <p className="eyebrow">A FEW THINGS WORTH KNOWING</p>
            <h2>
              A little
              <br />
              <em>clarity.</em>
            </h2>
            <p>
              Curious about your next pour?
              <br />
              We’re always happy to help.
            </p>
            <WhatsAppLink text="Ask us on WhatsApp" />
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details key={q}>
                <summary>
                  <span className="faq-number">0{i + 1}</span>
                  <span>{q}</span>
                  <Plus size={18} />
                </summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </section>
        <div className="section newsletter-wrap">
          <Newsletter onPrivacy={() => setPrivacy(true)} />
        </div>
        <Contact onPrivacy={() => setPrivacy(true)} />
      </main>
      <footer className="footer">
        <div className="footer-top">
          <p className="eyebrow">HERE’S TO WHAT’S NEXT.</p>
          <h2>
            Let’s make
            <br />
            <em>life sparkle.</em>
          </h2>
          <WhatsAppLink text="Start a conversation" className="button button-light" />
        </div>
        <div className="footer-grid">
          <Brand footer />
          <div>
            <p className="eyebrow">EXPLORE</p>
            <a href="#collection">The collection</a>
            <a href="#story">Our story</a>
            <a href="#occasions">For every occasion</a>
            <a href="#faq">Questions & answers</a>
          </div>
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <a href="mailto:info@sparkle-bubbly.co.za">info@sparkle-bubbly.co.za</a>
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer">
              WhatsApp +27 64 577 6111
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://maps.app.goo.gl/gfLLe49LW5uVb9XU8"
              target="_blank"
              rel="noopener noreferrer"
            >
              6 Pike Close, Hagley
              <br />
              Cape Town, South Africa
              <ArrowUpRight size={14} />
            </a>
          </div>
          <div>
            <p className="eyebrow">FOLLOW THE SPARKLE</p>
            <a
              href="https://www.facebook.com/SparkleBubbly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
              <ArrowUpRight size={14} />
            </a>
            <a
              href="https://www.instagram.com/thesparklebubbly/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
              <ArrowUpRight size={14} />
            </a>
            <a href={storeUrl} target="_blank" rel="noopener noreferrer">
              Our Take App store
              <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} The Sparkle Bubbly. Celebrate beautifully. Sip inclusively.
          </span>
          <button onClick={() => setPrivacy(true)}>Privacy notice</button>
          <a href="#home">BACK TO TOP ↑</a>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with The Sparkle Bubbly on WhatsApp"
      >
        <MessageCircle size={23} />
        <span>Let’s chat</span>
      </a>
      <output className={`toast ${toast ? "visible" : ""}`}>
        <Check size={16} />
        {toast}
      </output>
      <Modal
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        title={`Your little collection (${count})`}
        drawer
      >
        <p className="cart-intro">A case for celebrating beautifully.</p>
        {count === 0 ? (
          <div className="empty-cart">
            <ShoppingBag size={38} />
            <h3>A little sparkle awaits.</h3>
            <p>Find your favourite pour and add a case to your bag.</p>
            <button
              className="button button-dark"
              onClick={() => {
                setCartOpen(false);
                document.getElementById("collection")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore the collection
              <ArrowRight size={17} />
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {products
                .filter((p) => cart[p.id])
                .map((p) => (
                  <div className="cart-item" key={p.id}>
                    <img src={`/images/${p.image}`} alt={p.name} />
                    <div>
                      <p className="eyebrow">{p.brand}</p>
                      <h3>{p.name}</h3>
                      <small>Case of 6 · {p.size}</small>
                      <div className="quantity">
                        <button
                          onClick={() => change(p.id, -1)}
                          aria-label={`Remove one case of ${p.name}`}
                        >
                          <Minus size={14} />
                        </button>
                        <span>{cart[p.id]}</span>
                        <button
                          onClick={() => change(p.id, 1)}
                          aria-label={`Add one case of ${p.name}`}
                          disabled={cart[p.id] >= 99}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                    <div className="cart-price">
                      <strong>{money(p.price * cart[p.id])}</strong>
                      <button
                        onClick={() => {
                          setCart((c) => {
                            const next = { ...c };
                            delete next[p.id];
                            return next;
                          });
                          setCopied(false);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
            </div>
            <div className="cart-total">
              <span>Indicative subtotal</span>
              <strong>{money(total)}</strong>
            </div>
            <p className="checkout-note">
              Checkout takes place in our Take App store. Your bag won’t transfer
              automatically—please select your products again there. Final prices and delivery are
              confirmed in the store.
            </p>
            <button className="button button-outline full-width" onClick={copyCart}>
              {copied ? "Selection copied" : "Copy my selection"}
              {copied ? <Check size={17} /> : <Plus size={17} />}
            </button>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button button-dark full-width"
            >
              Continue to Take App
              <ArrowUpRight size={18} />
            </a>
            <WhatsAppLink
              text="Ask about this order"
              message={`Hello The Sparkle Bubbly, I would like to enquire about this selection:\n${summary}`}
            />
          </>
        )}
      </Modal>
      <Modal open={!!selected} onClose={() => setSelected(null)} title="A closer look">
        {selected && (
          <div className="product-modal">
            <div className={`product-image ${selected.tone}`}>
              <img src={`/images/${selected.image}`} alt={`${selected.brand} ${selected.name}`} />
            </div>
            <div>
              <p className="eyebrow">{selected.brand}</p>
              <h3>{selected.name}</h3>
              <p>{selected.description}</p>
              <p>{selected.size} · Six units per case</p>
              <strong>{money(selected.price)} / case</strong>
              <p className="small-note">
                Indicative price. Confirm current pricing and availability in the store.
              </p>
              <button className="button button-dark" onClick={() => add(selected.id)}>
                Add to bag
                <Plus size={18} />
              </button>
              <WhatsAppLink
                text="Ask about this pour"
                message={`Hello! I'd like to know more about ${selected.brand} ${selected.name}.`}
              />
            </div>
          </div>
        )}
      </Modal>
      <Modal open={privacy} onClose={() => setPrivacy(false)} title="Your privacy matters">
        <div className="privacy-copy">
          <p>
            We collect the email address you submit for newsletter updates, and the name, email,
            occasion and message you provide when making an enquiry. Newsletter consent is separate
            from contact-form consent.
          </p>
          <p>
            These details are stored in this website’s database. The contact form does not forward
            email. For a direct conversation, use info@sparkle-bubbly.co.za or WhatsApp +27 64 577
            6111.
          </p>
          <p>
            To request access, correction, deletion or withdrawal of consent, email
            info@sparkle-bubbly.co.za. Do not include payment details or sensitive information in
            these forms.
          </p>
          <p>
            Your bag is saved locally in your browser. Take App, WhatsApp, Google Maps and social
            links open third-party services whose own privacy policies apply. The platform includes
            website analytics; production tracking and retention settings must be reviewed before
            public launch.
          </p>
          <p className="small-note">Updated 11 November 2026.</p>
        </div>
      </Modal>
    </>
  );
}

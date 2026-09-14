import Image from "next/image";

export function BrandsChemistsSection() {
  return (

    <section className="w-full min-h-screen snap-start bg-ink text-ivory relative overflow-hidden py-28 px-6 flex items-center">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16 items-center w-full">

        {/* LEFT SIDE — Boutiques */}
        <div className="lg:col-span-1 text-left space-y-6">
          <h2 className="font-display text-4xl font-normal">For Boutiques</h2>

          <p className="text-taupe font-light leading-relaxed">
            Stock the numbered collection in your boutique, with dedicated
            support from the atelier at every step. Why write to us today?
          </p>

          <ul className="space-y-3 text-ivory/80 font-light">
            {[
              "Curated wholesale editions",
              "Bespoke in-store scenting",
              "Perfumers with 20+ years at the bench",
              "Discovery sets and refills for your clients",
              "Quick answers and communication",
              "Considered margins for independent retail",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-champagne leading-[1]">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <button className="btn-primary mt-6">
            Explore the Collection <span>➜</span>
          </button>
        </div>

        {/* CENTER BOTTLE — Always centered */}
        <div className="flex justify-center col-span-1">
          <Image
            src="/images/bottle-amber-dark.png"
            width={430}
            height={680}
            alt="Maison Sillage flacon"
            className="select-none pointer-events-none"
          />
        </div>

        {/* RIGHT SIDE — Perfumers */}
        <div className="lg:col-span-1 text-left lg:text-right space-y-6">
          <h2 className="font-display text-4xl font-normal">For Perfumers</h2>

          <p className="text-taupe font-light leading-relaxed lg:ml-auto lg:max-w-xs">
            Collaborate with a house that values restraint, rare materials and
            the time it takes to get a composition right.
          </p>

          <ul className="space-y-3 text-ivory/80 font-light lg:text-right">
            {[
              "Collaborate on numbered editions",
              "Access rare natural materials",
              "Grow your practice with new commissions",
              "Creative & packaging support available",
              "Join a house that values restraint",
            ].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 lg:justify-end"
              >
                <span className="hidden lg:block">{item}</span>
                <span className="text-champagne leading-[1]">·</span>
                <span className="lg:hidden">{item}</span>
              </li>
            ))}
          </ul>

          <button className="btn-primary mt-6 lg:ml-auto">
            Join the Atelier <span>➜</span>
          </button>
        </div>
      </div>
    </section>
  );
}

"use client";
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarCheck, Leaf, Sparkles, Truck } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import stepCollect from "@/public/step-collect.jpg";
import stepFolded from "@/public/step-folded.jpg";
import stepSchedule from "@/public/step-schedule.jpg";
import { Footer } from "@/components/shared/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,var(--secondary)_0%,transparent_55%)]" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2 lg:items-center lg:py-32">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                Eco-friendly wash & fold
              </span>
              <h1 className="mt-6 font-display text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                Laundry, gently{" "}
                <em className="not-italic text-primary">cared for</em>.
              </h1>
              <p className="mt-6 max-w-lg text-lg text-muted-foreground">
                Pick a date, set your pickup address, choose your items — we
                collect, wash, and return everything folded the way you like it.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/book">
                  <Button size="lg" className="gap-2">
                    Book a pickup <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/track">
                  <Button size="lg" variant="outline">
                    Track an order
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                No account required for guest bookings · Free pickup over $30
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-border bg-secondary/60 shadow-[0_30px_60px_-30px_rgba(125,155,118,0.4)]">
                <Image
                  src="/hero-laundry.jpg"
                  alt="Washing machine beside a wicker basket of folded cream and sage linens"
                  width={1024}
                  height={1280}
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="border-t border-border/60 bg-card/40">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <div className="mb-12 text-center">
              <p className="text-sm uppercase tracking-[0.2em] text-primary">
                How it works
              </p>
              <h2 className="mt-3 font-display text-4xl sm:text-5xl">
                Three small steps
              </h2>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: CalendarCheck,
                  title: "Schedule",
                  desc: "Pick a date and a time slot that suits you.",
                  img: stepSchedule,
                  alt: "Calendar with a sage checkmark",
                },
                {
                  icon: Truck,
                  title: "We collect",
                  desc: "Our team arrives at your door, no waiting around.",
                  img: stepCollect,
                  alt: "Wicker basket of folded linens at a doorstep",
                },
                {
                  icon: Sparkles,
                  title: "Folded & returned",
                  desc: "Get everything back fresh, folded, and ready.",
                  img: stepFolded,
                  alt: "Stack of folded cream towels tied with a sage ribbon",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-border bg-background transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_-30px_rgba(125,155,118,0.55)]"
                >
                  <div className="relative aspect-4/3 overflow-hidden bg-secondary/60">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      width={800}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-90 transition-all duration-700 ease-out group-hover:scale-110 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/10 to-transparent transition-opacity duration-500 group-hover:opacity-40" />
                    <span className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-background/90 text-primary shadow-sm backdrop-blur-sm">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <span className="absolute right-4 top-4 rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-muted-foreground backdrop-blur-sm">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl">{s.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {s.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
          <h2 className="font-display text-4xl sm:text-5xl">
            Ready for a lighter week?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Your first pickup takes under a minute to schedule.
          </p>
          <Link href="/book" className="mt-8 inline-block">
            <Button size="lg" className="gap-2">
              Book your pickup <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </section>

        <Footer />
      </>
    </div>
  );
}

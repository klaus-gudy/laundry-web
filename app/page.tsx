'use client';
import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { ArrowRight, Leaf } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

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
      </>
    </div>
  );
}

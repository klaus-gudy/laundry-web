'use client';

import { Button } from "@/components/ui/button";
import {
  CalendarIcon,
  Check,
  ChevronRight,
  MapPin,
  Minus,
  Package,
  Plus,
  Sparkles,
  UserIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useLaundryItems } from "@/hooks/useLaundryItems";
import { format } from "date-fns";

const SLOTS = [
  { value: "morning", label: "Morning", hours: "9 am – 11 am" },
  { value: "afternoon", label: "Afternoon", hours: "1 pm – 4 pm" },
  { value: "evening", label: "Evening", hours: "5 pm – 8 pm" },
] as const;

export default function BookPage() {
  
  const itemsQ = useLaundryItems();
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [slot, setSlot] = useState<string>("");
  const [addr, setAddr] = useState({
    line: "",
    city: "",
    postal: "",
    notes: "",
  });
  const [cart, setCart] = useState<Record<number, number>>({});
  const [contact, setContact] = useState({ name: "", email: "", phone: "" });
  const [success, setSuccess] = useState<{code: string; total: number; } | null>(null);

  const steps = [
    { n: 1, label: "When", icon: CalendarIcon },
    { n: 2, label: "Where", icon: MapPin },
    { n: 3, label: "What", icon: Package },
    { n: 4, label: "Confirm", icon: UserIcon },
  ];

  const items = itemsQ.data ?? [];
  const subtotal = useMemo(() => {
    let s = 0;
    for (const it of items) s += (cart[it.id] ?? 0) * Number(it.price);
    return s;
  }, [items, cart]);
  const itemCount = useMemo(() => Object.values(cart).reduce((a, b) => a + b, 0), [cart]);

  function setQty(id: number, q: number) {
    setCart((c) => {
      const next = { ...c };
      if (q <= 0) delete next[id];
      else next[id] = Math.min(99, q);
      return next;
    });
  }

  function canNext() {
    if (step === 1) return !!date && !!slot;
    if (step === 2) return addr.line.trim() && addr.city.trim() && addr.postal.trim();
    if (step === 3) return itemCount > 0;
    return true;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-8">
        <h1 className="font-display text-4xl sm:text-5xl">Book a pickup</h1>
        <p className="mt-2 text-muted-foreground">
          Four small steps. You can book as a guest or sign in for faster
          checkout.
        </p>
      </div>

      {/* Stepper */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center gap-2">
            <button
              onClick={() => s.n < step && setStep(s.n)}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition-colors",
                step === s.n
                  ? "border-primary bg-primary text-primary-foreground"
                  : step > s.n
                    ? "border-primary/40 bg-secondary text-foreground"
                    : "border-border bg-card text-muted-foreground",
              )}
            >
              <s.icon className="h-3.5 w-3.5" />
              <span className="whitespace-nowrap">
                {s.n}. {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Steps */}
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="s1"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <h2 className="font-display text-2xl">Pick a date & time</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  When should we swing by?
                </p>

                <div className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label className="mb-2 block">Pickup date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Choose a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(d) =>
                            d < new Date(new Date().setHours(0, 0, 0, 0))
                          }
                          // initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label className="mb-2 block">Time slot</Label>
                    <div className="grid gap-2">
                      {SLOTS.map((s) => (
                        <button
                          key={s.value}
                          type="button"
                          onClick={() => setSlot(s.value)}
                          className={cn(
                            "flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all",
                            slot === s.value
                              ? "border-primary bg-secondary"
                              : "border-border hover:border-primary/40",
                          )}
                        >
                          <div>
                            <div className="font-medium">{s.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {s.hours}
                            </div>
                          </div>
                          {slot === s.value && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="s2"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <h2 className="font-display text-2xl">Where to pick up?</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your address details.
                </p>
                <div className="mt-6 grid gap-4">
                  <div>
                    <Label htmlFor="line">Street address</Label>
                    <Input
                      id="line"
                      className="mt-1.5"
                      value={addr.line}
                      maxLength={200}
                      onChange={(e) =>
                        setAddr({ ...addr, line: e.target.value })
                      }
                      placeholder="123 Maple Avenue, Apt 4B"
                    />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        className="mt-1.5"
                        value={addr.city}
                        maxLength={100}
                        onChange={(e) =>
                          setAddr({ ...addr, city: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="postal">Postal code</Label>
                      <Input
                        id="postal"
                        className="mt-1.5"
                        value={addr.postal}
                        maxLength={20}
                        onChange={(e) =>
                          setAddr({ ...addr, postal: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes">
                      Notes for our driver (optional)
                    </Label>
                    <Textarea
                      id="notes"
                      className="mt-1.5"
                      maxLength={300}
                      value={addr.notes}
                      onChange={(e) =>
                        setAddr({ ...addr, notes: e.target.value })
                      }
                      placeholder="Ring doorbell, leave with concierge…"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="s3"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <h2 className="font-display text-2xl">Choose your items</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Tap + and − to set quantities.
                </p>

                {itemsQ.isLoading && (
                  <p className="mt-6 text-sm text-muted-foreground">
                    Loading catalog…
                  </p>
                )}

                <div className="mt-6 grid gap-2 sm:grid-cols-2">
                  {(itemsQ.data ?? []).map((it) => {
                    const q = cart[it.id] ?? 0;
                    return (
                      <div
                        key={it.id}
                        className={cn(
                          "flex items-center justify-between rounded-xl border bg-background px-4 py-3 transition-colors",
                          q > 0
                            ? "border-primary/50 bg-secondary/60"
                            : "border-border",
                        )}
                      >
                        <div>
                          <div className="text-sm font-medium">{it.name}</div>
                          <div className="text-xs text-muted-foreground">
                            ${Number(it.price).toFixed(2)} each
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setQty(it.id, q - 1)}
                            disabled={q === 0}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </Button>
                          <span className="w-6 text-center text-sm font-medium tabular-nums">
                            {q}
                          </span>
                          <Button
                            type="button"
                            size="icon"
                            variant="outline"
                            className="h-8 w-8 rounded-full"
                            onClick={() => setQty(it.id, q + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="s4"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
              >
                <h2 className="font-display text-2xl">Almost done</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {/* {user
                    ? "You're signed in — we'll save this booking to your account."
                    : "Booking as a guest. Add your contact details so we can reach you."} */}
                    You're signed in — we'll save this booking to your account.
                </p>

                {/* {!user && (
                  <div className="mt-6 grid gap-4">
                    <div>
                      <Label htmlFor="gn">Full name</Label>
                      <Input
                        id="gn"
                        className="mt-1.5"
                        maxLength={100}
                        value={contact.name}
                        onChange={(e) =>
                          setContact({ ...contact, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="ge">Email</Label>
                        <Input
                          id="ge"
                          type="email"
                          className="mt-1.5"
                          maxLength={200}
                          value={contact.email}
                          onChange={(e) =>
                            setContact({ ...contact, email: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="gp">Phone</Label>
                        <Input
                          id="gp"
                          className="mt-1.5"
                          maxLength={30}
                          value={contact.phone}
                          onChange={(e) =>
                            setContact({ ...contact, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Prefer to track from one place?{" "}
                      <Link
                        href="/signup"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Create an account
                      </Link>
                    </p>
                  </div>
                )} */}

                <div className="mt-6 rounded-2xl border border-border bg-background p-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Sparkles className="h-4 w-4 text-primary" /> Ready when you
                    are
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Once you confirm, we'll send a confirmation and remind you
                    the day before pickup.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
            <Button
              variant="ghost"
              disabled={step === 1}
              onClick={() => setStep(step - 1)}
            >
              Back
            </Button>
            {step < 4 ? (
              <Button disabled={!canNext()} onClick={() => setStep(step + 1)}>
                Continue
              </Button>
            ) : (
              // <Button
              //   disabled={
              //     submit.isPending ||
              //     itemCount === 0 ||
              //     (!user && (!contact.name || !contact.email || !contact.phone))
              //   }
              //   onClick={onSubmit}
              // >
              //   {submit.isPending ? "Confirming…" : "Confirm booking"}
              // </Button>
              <Button
                disabled={true}
                onClick={() => alert("Booking confirmed!")}
              >
                Confirm booking
              </Button>
            )}
          </div>
        </div>

        {/* Summary */}
        <aside className="rounded-3xl border border-border bg-card p-6">
          <h3 className="font-display text-xl">Your pickup</h3>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <CalendarIcon className="mt-0.5 h-4 w-4 text-primary" />
              <div>
                {date ? (
                  format(date, "EEEE, MMM d")
                ) : (
                  <span className="text-muted-foreground">No date yet</span>
                )}
                {slot && (
                  <div className="text-xs text-muted-foreground">
                    {SLOTS.find((s) => s.value === slot)?.label} ·{" "}
                    {SLOTS.find((s) => s.value === slot)?.hours}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-primary" />
              <div className={cn(!addr.line && "text-muted-foreground")}>
                {addr.line || "No address yet"}
                {addr.city && (
                  <div className="text-xs text-muted-foreground">
                    {addr.city} {addr.postal}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="my-5 h-px bg-border" />
          <div className="space-y-2 text-sm">
            {Object.keys(cart).length === 0 && (
              <p className="text-muted-foreground">No items added yet.</p>
            )}
            {(items ?? [])
              .filter((i) => cart[i.id])
              .map((i) => (
                <div key={i.id} className="flex items-center justify-between">
                  <span>
                    {cart[i.id]} × {i.name}
                  </span>
                  <span className="tabular-nums">
                    ${(cart[i.id] * Number(i.price)).toFixed(2)}
                  </span>
                </div>
              ))}
          </div>

          <div className="my-5 h-px bg-border" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Estimated total
            </span>
            <span className="font-display text-2xl">
              ${subtotal.toFixed(2)}
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}

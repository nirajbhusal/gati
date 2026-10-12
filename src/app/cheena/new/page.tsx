"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardHeader } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { NorthIndianChart } from "@/components/cheena/NorthIndianChart";
import { CosmicAvatar } from "@/components/profile/CosmicAvatar";
import { NEPAL_PLACES } from "@/data/nepal-places";
import { computeCheena } from "@/lib/astro/engine";
import { GRAHA_META, RASHI_EN, RASHI_NP, NAKSHATRA_EN } from "@/lib/astro/constants";
import { useCheenaStore } from "@/lib/store/cheena";
import { createProfileFromBasics, useProfile } from "@/lib/store/profile";
import type { BirthInput, CheenaChart } from "@/types/astro";

const inputClass =
  "mt-1 h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-3 text-sm text-[var(--fg)] focus:border-[var(--accent-indigo)] focus:outline-none";

export default function NewCheenaPage() {
  const router = useRouter();
  const addChart = useCheenaStore((s) => s.addChart);
  const setProfile = useProfile((s) => s.setProfile);
  const [name, setName] = useState("");
  const [birthDateAd, setBirthDateAd] = useState("1995-01-15");
  const [birthTime, setBirthTime] = useState("12:00");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [placeId, setPlaceId] = useState("kathmandu");
  const [gender, setGender] = useState<BirthInput["gender"]>("unspecified");
  const [result, setResult] = useState<CheenaChart | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = () => {
    try {
      setError(null);
      if (!name.trim()) {
        setError("Please enter a name.");
        return;
      }
      const chart = computeCheena({
        name: name.trim(),
        gender,
        birthDateAd,
        birthTime: timeUnknown ? undefined : birthTime,
        timeUnknown,
        placeId,
      });
      setResult(chart);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate Cheena.");
    }
  };

  const save = () => {
    if (!result) return;
    addChart(result);
    setProfile(
      createProfileFromBasics({
        name: result.input.name,
        primaryGraha: result.primaryGraha,
        cheenaId: result.id,
        moonRashiIndex: result.moonRashiIndex,
        lagnaRashiIndex: result.lagnaRashiIndex,
      })
    );
    router.push("/cheena/");
  };

  return (
    <div className="mx-auto max-w-2xl space-y-5">
      <header>
        <Link href="/cheena/" className="text-sm text-[var(--accent-indigo)] hover:underline">
          ← Cheena
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
          New Cheena{" "}
          <span className="np text-xl font-normal text-[var(--fg-muted)]">चिना</span>
        </h1>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">
          Birth chart from date, time, and place — guidance grade with Lahiri ayanamsa.
        </p>
      </header>

      <Card glass className="border-[var(--accent)]/20 bg-[var(--accent-soft)]/30 text-sm text-[var(--fg-muted)]">
        <strong className="text-[var(--fg)]">Honesty note:</strong> ± a few minutes of birth
        time can shift Lagna. This is a digital guidance tool, not a substitute for a
        family jyotishi.
      </Card>

      {!result ? (
        <Card glass>
          <CardHeader title="Birth details" subtitle="BS or AD date — use AD here" />
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block text-xs text-[var(--fg-subtle)] sm:col-span-2">
              Name · नाम
              <input className={inputClass} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </label>
            <label className="block text-xs text-[var(--fg-subtle)]">
              Birth date (AD)
              <input type="date" className={inputClass} value={birthDateAd} onChange={(e) => setBirthDateAd(e.target.value)} />
            </label>
            <label className="block text-xs text-[var(--fg-subtle)]">
              Birth time (NPT)
              <input
                type="time"
                className={inputClass}
                value={birthTime}
                disabled={timeUnknown}
                onChange={(e) => setBirthTime(e.target.value)}
              />
            </label>
            <label className="flex items-center gap-2 text-sm text-[var(--fg-muted)] sm:col-span-2">
              <input
                type="checkbox"
                checked={timeUnknown}
                onChange={(e) => setTimeUnknown(e.target.checked)}
              />
              Birth time unknown (Lagna approximate · noon used)
            </label>
            <label className="block text-xs text-[var(--fg-subtle)]">
              Place · स्थान
              <select className={inputClass} value={placeId} onChange={(e) => setPlaceId(e.target.value)}>
                {NEPAL_PLACES.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.nameNp})
                  </option>
                ))}
              </select>
            </label>
            <label className="block text-xs text-[var(--fg-subtle)]">
              Gender (optional)
              <select
                className={inputClass}
                value={gender}
                onChange={(e) => setGender(e.target.value as BirthInput["gender"])}
              >
                <option value="unspecified">Prefer not to say</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>
          {error && (
            <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
              {error}
            </p>
          )}
          <Button variant="primary" className="mt-4 w-full sm:w-auto" onClick={generate}>
            Generate Cheena
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          <Card glass>
            <div className="flex items-center gap-3">
              <CosmicAvatar graha={result.primaryGraha} size={56} />
              <div>
                <p className="text-lg font-semibold">{result.input.name}</p>
                <p className="text-sm text-[var(--fg-muted)]">
                  Lagna {result.lagnaName}{" "}
                  <span className="np text-[var(--accent)]">({result.lagnaNameNp})</span>
                </p>
                <p className="text-sm text-[var(--fg-muted)]">
                  Moon {RASHI_EN[result.moonRashiIndex]} ·{" "}
                  {NAKSHATRA_EN[result.moonNakshatraIndex]}
                </p>
                <p className="text-xs text-[var(--fg-subtle)]">
                  Primary graha: {GRAHA_META[result.primaryGraha].name}{" "}
                  <span className="np">{GRAHA_META[result.primaryGraha].nameNp}</span>
                </p>
              </div>
            </div>
          </Card>

          <Card glass>
            <NorthIndianChart chart={result} />
          </Card>

          <Card glass>
            <CardHeader title="Navagraha" subtitle="Sidereal positions" />
            <div className="overflow-x-auto">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead>
                  <tr className="text-xs text-[var(--fg-subtle)]">
                    <th className="pb-2 font-medium">Graha</th>
                    <th className="pb-2 font-medium">Rashi</th>
                    <th className="pb-2 font-medium">° in sign</th>
                    <th className="pb-2 font-medium">House</th>
                  </tr>
                </thead>
                <tbody>
                  {result.planets.map((p) => (
                    <tr key={p.id} className="border-t border-[var(--border)]">
                      <td className="py-2">
                        {p.name}{" "}
                        <span className="np text-[var(--fg-muted)]">{p.nameNp}</span>
                      </td>
                      <td className="py-2">
                        {RASHI_NP[p.rashiIndex]}
                        <span className="block text-xs text-[var(--fg-subtle)]">
                          {p.rashiName}
                        </span>
                      </td>
                      <td className="py-2 tabular-nums">{p.degreeInSign.toFixed(1)}°</td>
                      <td className="py-2 tabular-nums">{p.house}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap gap-2">
            <Button variant="primary" onClick={save}>
              Save & set as my profile
            </Button>
            <Button variant="secondary" onClick={() => setResult(null)}>
              Edit details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

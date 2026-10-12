"use client";

import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import {
  BS_MONTHS_EN,
  BS_MONTHS_NP,
  daysInBSMonth,
  formatAD,
  formatBS,
  fromAD,
  fromBS,
  getTodayDual,
  toNepaliDigits,
} from "@/lib/calendar";

const AD_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function daysInAdMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

export function DateConverter() {
  const today = getTodayDual();
  const [mode, setMode] = useState<"bs-to-ad" | "ad-to-bs">("bs-to-ad");
  const [bsY, setBsY] = useState(today.bs.year);
  const [bsM, setBsM] = useState(today.bs.month);
  const [bsD, setBsD] = useState(today.bs.day);
  const [adY, setAdY] = useState(today.ad.year);
  const [adM, setAdM] = useState(today.ad.month);
  const [adD, setAdD] = useState(today.ad.day);
  const bsDays = useMemo(() => {
    try {
      return daysInBSMonth(bsY, bsM);
    } catch {
      return 30;
    }
  }, [bsY, bsM]);

  const adDays = useMemo(() => daysInAdMonth(adY, adM), [adY, adM]);

  const { result, error } = useMemo(() => {
    try {
      if (mode === "bs-to-ad") {
        const d = Math.min(bsD, bsDays);
        return { result: fromBS(bsY, bsM, d), error: null as string | null };
      }
      const d = Math.min(adD, adDays);
      return { result: fromAD(adY, adM, d), error: null as string | null };
    } catch {
      return { result: null, error: "Invalid date for conversion." };
    }
  }, [mode, bsY, bsM, bsD, bsDays, adY, adM, adD, adDays]);

  const selectClass =
    "h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--bg-muted)] px-3 text-sm text-[var(--fg)] focus:border-[var(--accent-indigo)] focus:outline-none";

  return (
    <Card glass>
      <CardHeader
        title={
          <>
            BS ↔ AD Converter{" "}
            <span className="np text-sm font-normal text-[var(--fg-muted)]">
              मिति रूपान्तरण
            </span>
          </>
        }
        subtitle="Convert between Bikram Sambat and Gregorian"
        action={
          <Button
            variant="secondary"
            size="sm"
            onClick={() =>
              setMode((m) => (m === "bs-to-ad" ? "ad-to-bs" : "bs-to-ad"))
            }
            aria-label="Swap conversion direction"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Swap
          </Button>
        }
      />

      <p className="mb-4 text-sm text-[var(--fg-muted)]">
        Converting{" "}
        <strong className="text-[var(--fg)]">
          {mode === "bs-to-ad" ? "BS → AD" : "AD → BS"}
        </strong>
      </p>

      {mode === "bs-to-ad" ? (
        <div className="grid grid-cols-3 gap-3">
          <label className="block text-xs text-[var(--fg-subtle)]">
            Year (BS)
            <input
              type="number"
              className={selectClass + " mt-1"}
              value={bsY}
              min={1970}
              max={2100}
              onChange={(e) => setBsY(Number(e.target.value))}
            />
          </label>
          <label className="block text-xs text-[var(--fg-subtle)]">
            Month
            <select
              className={selectClass + " mt-1"}
              value={bsM}
              onChange={(e) => setBsM(Number(e.target.value))}
            >
              {BS_MONTHS_EN.map((m, i) => (
                <option key={m} value={i}>
                  {m} ({BS_MONTHS_NP[i]})
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-[var(--fg-subtle)]">
            Day
            <select
              className={selectClass + " mt-1"}
              value={Math.min(bsD, bsDays)}
              onChange={(e) => setBsD(Number(e.target.value))}
            >
              {Array.from({ length: bsDays }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d} ({toNepaliDigits(d)})
                </option>
              ))}
            </select>
          </label>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <label className="block text-xs text-[var(--fg-subtle)]">
            Year (AD)
            <input
              type="number"
              className={selectClass + " mt-1"}
              value={adY}
              min={1913}
              max={2043}
              onChange={(e) => setAdY(Number(e.target.value))}
            />
          </label>
          <label className="block text-xs text-[var(--fg-subtle)]">
            Month
            <select
              className={selectClass + " mt-1"}
              value={adM}
              onChange={(e) => setAdM(Number(e.target.value))}
            >
              {AD_MONTHS.map((m, i) => (
                <option key={m} value={i}>
                  {m}
                </option>
              ))}
            </select>
          </label>
          <label className="block text-xs text-[var(--fg-subtle)]">
            Day
            <select
              className={selectClass + " mt-1"}
              value={Math.min(adD, adDays)}
              onChange={(e) => setAdD(Number(e.target.value))}
            >
              {Array.from({ length: adDays }, (_, i) => i + 1).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {error && (
        <p className="mt-3 text-sm text-[var(--danger)]" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--accent-soft)] p-4">
          <p className="text-xs font-medium uppercase tracking-wider text-[var(--fg-subtle)]">
            Result
          </p>
          <p className="mt-1 text-lg font-semibold">
            {formatBS(result.bs)}
            <span className="np ml-2 text-base font-normal text-[var(--fg-muted)]">
              {formatBS(result.bs, { lang: "np" })}
            </span>
          </p>
          <p className="text-[var(--fg-muted)]">{formatAD(result.ad)}</p>
        </div>
      )}
    </Card>
  );
}

export function QuickTools() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <DateConverter />
      <div className="grid gap-4 content-start">
        {/* filled by parent or siblings */}
      </div>
    </div>
  );
}

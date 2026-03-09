import { useState } from "react";

export const AgeCalculator = () => {
  const [dob, setDob] = useState("");
  const getAge = () => {
    if (!dob) return null;
    const birth = new Date(dob);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    return { years, months, days, totalDays: Math.floor((now.getTime() - birth.getTime()) / 86400000) };
  };
  const age = getAge();
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">Date of Birth</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
      {age && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">{age.years}</div><div className="text-xs text-muted-foreground">Years</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">{age.months}</div><div className="text-xs text-muted-foreground">Months</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">{age.days}</div><div className="text-xs text-muted-foreground">Days</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">{age.totalDays.toLocaleString()}</div><div className="text-xs text-muted-foreground">Total Days</div></div>
        </div>
      )}
    </div>
  );
};

export const BmiCalculator = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const bmi = weight && height ? (Number(weight) / (Number(height) / 100) ** 2).toFixed(1) : null;
  const getCategory = (b: number) => b < 18.5 ? "Underweight" : b < 25 ? "Normal" : b < 30 ? "Overweight" : "Obese";
  const getCategoryColor = (b: number) => b < 18.5 ? "text-blue-500" : b < 25 ? "text-green-500" : b < 30 ? "text-yellow-500" : "text-red-500";
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-foreground">Weight (kg)</label><input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">Height (cm)</label><input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
      </div>
      {bmi && (
        <div className="mt-4 rounded-lg bg-muted p-4 text-center">
          <div className="font-heading text-4xl font-bold text-primary">{bmi}</div>
          <div className={`text-lg font-semibold ${getCategoryColor(Number(bmi))}`}>{getCategory(Number(bmi))}</div>
        </div>
      )}
    </div>
  );
};

export const PercentageCalculator = () => {
  const [num, setNum] = useState("");
  const [pct, setPct] = useState("");
  const result = num && pct ? ((Number(num) * Number(pct)) / 100).toFixed(2) : null;
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <input type="number" value={pct} onChange={(e) => setPct(e.target.value)} placeholder="%" className="w-24 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        <span className="text-muted-foreground">% of</span>
        <input type="number" value={num} onChange={(e) => setNum(e.target.value)} placeholder="Number" className="w-32 rounded-lg border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" />
        {result && <span className="text-lg font-bold text-primary">= {result}</span>}
      </div>
    </div>
  );
};

export const DiscountCalculator = () => {
  const [price, setPrice] = useState("");
  const [disc, setDisc] = useState("");
  const saved = price && disc ? (Number(price) * Number(disc) / 100).toFixed(2) : null;
  const finalPrice = price && disc ? (Number(price) - Number(price) * Number(disc) / 100).toFixed(2) : null;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-foreground">Original Price</label><input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="1000" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">Discount (%)</label><input type="number" value={disc} onChange={(e) => setDisc(e.target.value)} placeholder="20" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
      </div>
      {finalPrice && saved && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">₹{finalPrice}</div><div className="text-xs text-muted-foreground">Final Price</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-green-500">₹{saved}</div><div className="text-xs text-muted-foreground">You Save</div></div>
        </div>
      )}
    </div>
  );
};

export const LoanCalculator = () => {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const calc = () => {
    const p = Number(principal), r = Number(rate) / 12 / 100, n = Number(years) * 12;
    if (!p || !r || !n) return null;
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return { emi: emi.toFixed(0), total: (emi * n).toFixed(0), interest: (emi * n - p).toFixed(0) };
  };
  const result = calc();
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label className="mb-1 block text-sm font-medium text-foreground">Loan Amount (₹)</label><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="500000" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">Interest Rate (%/yr)</label><input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">Tenure (Years)</label><input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
      </div>
      {result && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-xl font-bold text-primary">₹{Number(result.emi).toLocaleString()}</div><div className="text-xs text-muted-foreground">Monthly EMI</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-xl font-bold text-foreground">₹{Number(result.total).toLocaleString()}</div><div className="text-xs text-muted-foreground">Total Payment</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-xl font-bold text-destructive">₹{Number(result.interest).toLocaleString()}</div><div className="text-xs text-muted-foreground">Total Interest</div></div>
        </div>
      )}
    </div>
  );
};

export const GstCalculator = () => {
  const [amount, setAmount] = useState("");
  const [gstRate, setGstRate] = useState("18");
  const gstAmount = amount ? (Number(amount) * Number(gstRate) / 100).toFixed(2) : null;
  const total = amount ? (Number(amount) + Number(amount) * Number(gstRate) / 100).toFixed(2) : null;
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="mb-1 block text-sm font-medium text-foreground">Amount (₹)</label><input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20" /></div>
        <div><label className="mb-1 block text-sm font-medium text-foreground">GST Rate (%)</label>
          <select value={gstRate} onChange={(e) => setGstRate(e.target.value)} className="w-full rounded-lg border border-input bg-background px-4 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/20">
            {[5, 12, 18, 28].map((r) => <option key={r} value={r}>{r}%</option>)}
          </select>
        </div>
      </div>
      {gstAmount && total && (
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-primary">₹{Number(gstAmount).toLocaleString()}</div><div className="text-xs text-muted-foreground">GST Amount</div></div>
          <div className="rounded-lg bg-muted p-3 text-center"><div className="font-heading text-2xl font-bold text-foreground">₹{Number(total).toLocaleString()}</div><div className="text-xs text-muted-foreground">Total with GST</div></div>
        </div>
      )}
    </div>
  );
};

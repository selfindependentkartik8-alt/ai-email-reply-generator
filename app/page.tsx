"use client";

import { useState } from "react";

type Tone =
  | "Professional"
  | "Friendly"
  | "Casual"
  | "Apologetic"
  | "Persuasive";

type Length = "Short" | "Medium" | "Detailed";

const tones: Tone[] = [
  "Professional",
  "Friendly",
  "Casual",
  "Apologetic",
  "Persuasive",
];

const lengths: Length[] = [
  "Short",
  "Medium",
  "Detailed",
];

function formatReply(text: string) {
  return text.split("\n").map((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      return <div key={index} className="h-3" />;
    }

    const isHeading =
      /^(subject|reply|response|opening|body|closing|next steps)\s*[:\-—]/i.test(
        trimmed
      );

    if (isHeading) {
      return (
        <div
          key={index}
          className="mt-4 mb-2 rounded-xl border border-[#0f9f9c]/25 bg-[#0f9f9c]/10 px-4 py-3 text-sm font-bold text-[#73e2dc]"
        >
          {trimmed}
        </div>
      );
    }

    return (
      <p
        key={index}
        className="text-sm leading-7 text-zinc-300"
      >
        {trimmed}
      </p>
    );
  });
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [length, setLength] = useState<Length>("Medium");
  const [instruction, setInstruction] = useState("");

  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const generateReply = async () => {
    if (!email.trim()) {
      setError("Please paste an email first.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          tone,
          length,
          instruction,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error || "Unable to generate reply."
        );
      }

      if (!data?.reply) {
        throw new Error(
          "AI returned an empty response."
        );
      }

      setReply(data.reply);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyReply = async () => {
    if (!reply) return;

    try {
      await navigator.clipboard.writeText(reply);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the reply.");
    }
  };

  const clearAll = () => {
    setEmail("");
    setInstruction("");
    setReply("");
    setError("");
    setCopied(false);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-gradient-to-b from-[#073d3b] via-[#020908] to-black text-white">

      {/* AMBIENT ATROVIRENS GLOW */}

      <div className="pointer-events-none absolute left-1/2 top-[-220px] h-[600px] w-[850px] max-w-[100vw] -translate-x-1/2 rounded-full bg-[#0f9f9c]/25 blur-[170px]" />

      <div className="pointer-events-none absolute left-[-180px] top-[45%] h-[350px] w-[350px] rounded-full bg-[#0f9f9c]/10 blur-[150px]" />

      <div className="pointer-events-none absolute right-[-180px] top-[65%] h-[350px] w-[350px] rounded-full bg-[#0f9f9c]/10 blur-[150px]" />

      {/* NAVBAR */}

      <nav className="relative z-20 mx-4 mt-5 rounded-3xl border border-[#0f9f9c]/20 bg-black/70 px-4 py-4 shadow-2xl backdrop-blur-2xl sm:mx-auto sm:max-w-6xl sm:px-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex min-w-0 items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#0f9f9c]/30 bg-[#0f9f9c]/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks"
                className="h-full w-full rounded-full object-cover"
              />
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-sm font-bold sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[10px] text-zinc-500 sm:text-xs">
                AI Solutions That Work
              </p>
            </div>

          </div>

          <div className="hidden items-center gap-7 text-sm text-zinc-300 md:flex">

            <a
              href="#home"
              className="transition hover:text-[#73e2dc]"
            >
              Home
            </a>

            <a
              href="#features"
              className="transition hover:text-[#73e2dc]"
            >
              Features
            </a>

            <a
              href="#how"
              className="transition hover:text-[#73e2dc]"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="transition hover:text-[#73e2dc]"
            >
              FAQ
            </a>

            <a
              href="https://www.instagram.com/krishaiworks/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#d9fffc] px-5 py-2 font-medium text-black transition hover:bg-white"
            >
              Follow
            </a>

          </div>

          <a
            href="#generator"
            className="rounded-full border border-[#0f9f9c]/30 bg-[#0f9f9c]/10 px-4 py-2 text-xs text-[#73e2dc] md:hidden"
          >
            Try
          </a>

        </div>

      </nav>

      {/* HERO */}

      <section
        id="home"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-4 pb-16 pt-16 text-center sm:px-8 sm:pt-24"
      >

        <div className="rounded-full border border-[#0f9f9c]/30 bg-[#0f9f9c]/10 px-4 py-2 text-xs text-[#73e2dc]">
          📧 AI Email Reply Generator
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-[#73e2dc]">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">

          Reply Smarter.
          <br />

          <span className="bg-gradient-to-r from-white via-[#9af1ec] to-[#20aaa5] bg-clip-text text-transparent">
            Write Better Emails.
          </span>

        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Paste any email and let AI create a clear,
          natural and ready-to-send reply in seconds.
        </p>

        <div className="mt-7 flex max-w-full flex-wrap justify-center gap-3">

          <span className="rounded-full border border-[#0f9f9c]/20 bg-[#0f9f9c]/10 px-4 py-2 text-xs text-zinc-300">
            ⚡ Instant
          </span>

          <span className="rounded-full border border-[#0f9f9c]/20 bg-[#0f9f9c]/10 px-4 py-2 text-xs text-zinc-300">
            🎯 Multiple Tones
          </span>

          <span className="rounded-full border border-[#0f9f9c]/20 bg-[#0f9f9c]/10 px-4 py-2 text-xs text-zinc-300">
            🤖 Gemini AI
          </span>

        </div>

      </section>

      {/* GENERATOR */}

      <section
        id="generator"
        className="relative z-10 mx-auto max-w-5xl px-4 pb-24 sm:px-8"
      >

        <div className="rounded-[2rem] border border-[#0f9f9c]/20 bg-black/75 p-4 shadow-2xl shadow-[#0f9f9c]/5 backdrop-blur-2xl sm:p-7">

          <div className="mb-7">

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4db9b4]">
              Email Generator
            </p>

            <h2 className="mt-3 text-xl font-bold sm:text-2xl">
              Turn any email into a polished reply.
            </h2>

          </div>

          {/* EMAIL */}

          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Received Email
          </label>

          <textarea
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Paste the email you received here..."
            className="mt-3 min-h-[220px] w-full resize-y rounded-2xl border border-[#0f9f9c]/15 bg-[#020707] p-4 text-sm leading-7 text-white outline-none transition placeholder:text-zinc-700 focus:border-[#0f9f9c]/50 focus:ring-1 focus:ring-[#0f9f9c]/20"
          />

          {/* CONTROLS */}

          <div className="mt-5 grid gap-4 sm:grid-cols-2">

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Tone
              </label>

              <select
                value={tone}
                onChange={(e) =>
                  setTone(e.target.value as Tone)
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#0f9f9c]/15 bg-[#020707] px-4 text-sm text-white outline-none focus:border-[#0f9f9c]/50"
              >

                {tones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <div>

              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                Reply Length
              </label>

              <select
                value={length}
                onChange={(e) =>
                  setLength(e.target.value as Length)
                }
                className="mt-2 h-12 w-full rounded-xl border border-[#0f9f9c]/15 bg-[#020707] px-4 text-sm text-white outline-none focus:border-[#0f9f9c]/50"
              >

                {lengths.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}

              </select>

            </div>

          </div>

          {/* INSTRUCTION */}

          <div className="mt-5">

            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Optional Instruction
            </label>

            <input
              value={instruction}
              onChange={(e) =>
                setInstruction(e.target.value)
              }
              placeholder="Example: Mention that I am available on Friday..."
              className="mt-2 h-12 w-full rounded-xl border border-[#0f9f9c]/15 bg-[#020707] px-4 text-sm text-white outline-none placeholder:text-zinc-700 focus:border-[#0f9f9c]/50"
            />

          </div>

          {/* GENERATE BUTTON — ONLY BEFORE RESULT */}

          {!reply && (
            <button
              type="button"
              onClick={generateReply}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-[#d9fffc] px-5 py-4 text-sm font-bold text-black shadow-xl shadow-[#0f9f9c]/10 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "🤖 Generating Reply..."
                : "✨ Generate Reply"}
            </button>
          )}

          {/* CLEAR */}

          <button
            type="button"
            onClick={clearAll}
            className="mt-3 w-full py-2 text-xs text-zinc-600 transition hover:text-[#73e2dc]"
          >
            Clear Everything
          </button>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
              ⚠️ {error}
            </div>
          )}

          {/* RESULT */}

          {reply && (
            <div className="mt-8 rounded-3xl border border-[#0f9f9c]/20 bg-[#020707] p-5 sm:p-7">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4db9b4]">
                    AI Result
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    Your Reply Is Ready.
                  </h3>

                </div>

                <button
                  type="button"
                  onClick={copyReply}
                  className="rounded-xl bg-[#d9fffc] px-5 py-3 text-sm font-semibold text-black transition hover:bg-white"
                >
                  {copied
                    ? "✓ Copied"
                    : "📋 Copy Reply"}
                </button>

              </div>

              {/* HIGHLIGHTED RESULT */}

              <div className="mt-6 rounded-2xl border border-[#0f9f9c]/10 bg-black p-5 sm:p-6">

                {formatReply(reply)}

              </div>

              {/* REGENERATE — ONLY AFTER RESULT */}

              <button
                type="button"
                onClick={generateReply}
                disabled={loading}
                className="mt-4 w-full rounded-xl border border-[#0f9f9c]/20 bg-[#0f9f9c]/5 px-5 py-3 text-xs font-semibold text-[#73e2dc] transition hover:border-[#0f9f9c]/40 hover:bg-[#0f9f9c]/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "🤖 Generating New Reply..."
                  : "🔄 Regenerate Reply"}
              </button>

            </div>
          )}

        </div>

      </section>

      {/* FEATURES */}

      <section
        id="features"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="grid gap-5 md:grid-cols-3">

          {[
            [
              "🎯",
              "Choose Your Tone",
              "Create replies that match the situation and relationship.",
            ],
            [
              "⚡",
              "Save Time",
              "Turn a difficult email into a ready-to-send response instantly.",
            ],
            [
              "✍️",
              "Natural Writing",
              "Get clear and natural replies without sounding robotic.",
            ],
          ].map(([icon, title, description]) => (

            <div
              key={title}
              className="rounded-3xl border border-[#0f9f9c]/10 bg-black/70 p-6 backdrop-blur-xl transition hover:border-[#0f9f9c]/25"
            >

              <div className="text-3xl">
                {icon}
              </div>

              <h3 className="mt-5 text-base font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* HOW TO USE */}

      <section
        id="how"
        className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4db9b4]">
            How To Use
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Write your perfect reply in three steps.
          </h2>

        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          {[
            [
              "01",
              "Paste Email",
              "Copy the email you received and paste it into the generator.",
            ],
            [
              "02",
              "Choose Style",
              "Select your preferred tone and reply length.",
            ],
            [
              "03",
              "Generate",
              "Let AI create a polished response you can copy instantly.",
            ],
          ].map(([number, title, description]) => (

            <div
              key={number}
              className="rounded-3xl border border-[#0f9f9c]/10 bg-black/70 p-6"
            >

              <span className="text-sm font-bold text-[#5ed0ca]">
                {number}
              </span>

              <h3 className="mt-5 text-lg font-bold">
                {title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {description}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* FAQ */}

      <section
        id="faq"
        className="relative z-10 mx-auto max-w-4xl px-4 py-20 sm:px-8"
      >

        <div className="text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4db9b4]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          {[
            [
              "Can I use different writing styles?",
              "Yes. Choose from Professional, Friendly, Casual, Apologetic and Persuasive tones.",
            ],
            [
              "Can I control the reply length?",
              "Yes. You can generate Short, Medium or Detailed replies.",
            ],
            [
              "Can I give the AI extra instructions?",
              "Yes. Use the optional instruction field to tell the AI exactly what you want included.",
            ],
            [
              "Is the generated reply ready to send?",
              "The generated response is designed to be ready to copy, but always review it before sending.",
            ],
          ].map(([question, answer]) => (

            <div
              key={question}
              className="rounded-3xl border border-[#0f9f9c]/10 bg-black/70 p-6"
            >

              <h3 className="text-sm font-bold">
                {question}
              </h3>

              <p className="mt-3 text-sm leading-7 text-zinc-500">
                {answer}
              </p>

            </div>

          ))}

        </div>

      </section>

      {/* CTA */}

      <section className="relative z-10 mx-auto max-w-4xl px-4 py-20 text-center sm:px-8">

        <div className="rounded-[2rem] border border-[#0f9f9c]/20 bg-gradient-to-b from-[#0f9f9c]/15 to-black p-8 sm:p-12">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Stop overthinking every email.
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
            Let AI handle the first draft so you can focus on what actually matters.
          </p>

          <a
            href="#generator"
            className="mt-7 inline-flex rounded-xl bg-[#d9fffc] px-6 py-3 text-sm font-semibold text-black transition hover:bg-white"
          >
            Create A Reply
          </a>

        </div>

      </section>

{/* FOOTER */}

<footer className="relative z-10 border-t border-[#0f9f9c]/10 px-4 py-14">

  <div className="mx-auto w-full max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-12">

      <div className="mx-auto max-w-2xl text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0f9f9c]">
          Explore More
        </p>

        <h2 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
          More AI Writing Tools
        </h2>

        <p className="mt-3 text-sm leading-7 text-zinc-500">
          Explore more AI-powered tools to write, improve and manage
          your emails and professional content.
        </p>

      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* AI EMAIL WRITER */}

        <a
          href="https://aiemailwriter.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✉️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Email Writer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Write clear and professional emails quickly with AI.
          </p>

        </a>

        {/* AI GRAMMAR & WRITING FIXER */}

        <a
          href="https://aigrammarwritingfixer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✍️
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Grammar & Writing Fixer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Fix grammar, spelling and improve your writing with AI.
          </p>

        </a>

        {/* AI TEXT HUMANIZER */}

        <a
          href="https://aitexthumanizer.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            ✨
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Text Humanizer
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Make AI-generated text sound natural and human.
          </p>

        </a>

        {/* AI COVER LETTER GENERATOR */}

        <a
          href="https://aicoverlettergenerator.krishaiworks.com/"
          className="group rounded-2xl border border-white/5 bg-white/[0.025] p-5 transition hover:-translate-y-1 hover:border-[#0f9f9c]/20 hover:bg-[#0f9f9c]/[0.03]"
        >

          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#0f9f9c]/10 bg-[#0f9f9c]/10 text-lg">
            💼
          </div>

          <h3 className="mt-4 text-sm font-semibold text-white transition group-hover:text-[#0f9f9c]">
            AI Cover Letter Generator
          </h3>

          <p className="mt-2 text-xs leading-6 text-zinc-500">
            Create personalized cover letters for your job applications.
          </p>

        </a>
<a
  href="/privacy-policy"
  className="transition hover:text-violet-300"
>
  Privacy Policy
</a>

<a
  href="/terms-and-conditions"
  className="transition hover:text-violet-300"
>
  Terms & Conditions
</a>
      </div>

    </div>

    {/* FOOTER MAIN */}

    <div className="border-t border-white/5 pt-8">

      <div className="flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-[#0f9f9c]/20">

            <img
              src="/logo.png"
              alt="KrishAIWorks"
              className="h-full w-full rounded-full object-cover"
            />

          </div>

          <div>

            <p className="text-sm font-bold text-white">
              KrishAIWorks
            </p>

            <p className="text-xs text-zinc-600">
              AI Solutions That Work
            </p>

          </div>

        </div>

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks. All rights reserved.
        </p>

      </div>

    </div>

  </div>

</footer>

    </main>
  );
}
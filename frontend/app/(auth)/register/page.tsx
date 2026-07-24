"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { registerOrg } from "@/lib/api/auth";
import { useAuthStore } from "@/lib/stores/auth-store";

import {
  Check,
  CircleCheck,
  Eye,
  EyeOff,
  Play,
  ShieldCheck,
  UsersRound,
  Zap,
} from "lucide-react";

import { Button } from "@/components/ui/button";

const workflowHighlights = [
  "Visual DAG Builder",
  "Real-Time Execution Monitoring",
  "Human Approval Flows",
  "Event-Driven Automation",
];

type FormErrors = {
  fullName?: string;
  workspace?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export default function Register() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState("")

  const {setTokens} = useAuthStore();


  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    if (!workspace.trim()) {
      nextErrors.workspace = "Workspace name is required.";
    }

    if (!email.trim()) {
      nextErrors.email = "Work email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid work email.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 12) {
      nextErrors.password = "Password must be at least 12 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password.";
    } else if (confirmPassword !== password) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!acceptedTerms) {
      nextErrors.terms = "You must agree before creating an account.";
    }

    if (password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }
    
    if (!workspace.trim()) {
      nextErrors.workspace = "Workspace name is required.";
    }
    
    if (!fullName.trim()) {
      nextErrors.fullName = "Full name is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: "Passwords do not match",
      });
      return;
    }

    try {
      const response = await registerOrg({
        organizationName: workspace,
        fullName,
        email,
        password,
      });

      if (!response.success || !response.data) {
        setServerError(response.message);
        return;
      }

      setTokens(
        response.data.accessToken,
        response.data.refreshToken,
        response.data.tokenType
      );

      router.replace("/dashboard");
    } catch (error: any) {
      console.log("Status:", error.response?.status);
      console.log("Response:", error.response?.data);

      setServerError(
        error.response?.data?.message ?? "Registration failed."
      );
    }
  };

  const goToLogin = () => {
    router.push("/login");
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#0a0a0c] text-[#f5f5f7]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="relative hidden min-h-screen items-center bg-[#09090b] px-16 py-12 lg:flex xl:px-20">
          <div className="pointer-events-none absolute left-[15%] top-[35%] h-12 w-12 rounded-lg border border-[#333344] bg-[#191922] shadow-[0_0_34px_rgba(192,193,255,0.08)]">
            <Play className="ml-4 mt-3 size-5 fill-[#aaaaff] text-[#aaaaff]" />
          </div>
          <div className="pointer-events-none absolute left-[28%] top-[57%] grid size-12 place-items-center rounded-lg border border-[#373747] bg-[#181820] shadow-[0_0_28px_rgba(192,193,255,0.1)]">
            <CircleCheck className="size-5 text-[#aeb0cc]" />
          </div>
          <div className="pointer-events-none absolute right-[16%] top-[37%] grid size-14 place-items-center rounded-lg border border-[#333344] bg-[#181820] shadow-[0_0_28px_rgba(25,194,230,0.08)]">
            <Zap className="size-5 text-[#57d5ec]" />
          </div>
          <div className="pointer-events-none absolute right-[16%] top-[60%] grid size-16 place-items-center rounded-xl border border-[#43435a] bg-[#1c1c25] shadow-[0_0_30px_rgba(192,193,255,0.1)]">
            <Check className="size-5 rounded-full bg-[#777b9e] p-0.5 text-[#1d1d25]" />
          </div>

          <div className="relative z-10 w-full max-w-[520px]">
            <h1 className="max-w-[420px] text-5xl font-bold leading-[1.18] tracking-normal text-[#f2f2f4]">
              Build. Execute.
              <span className="block text-[#c0c1ff]">Monitor.</span>
            </h1>
            <p className="mt-5 max-w-[500px] text-lg leading-7 text-[#c8c8d6]">
              Distributed workflow orchestration for modern engineering teams.
              Design resilient systems without the overhead.
            </p>

            <ul className="mt-9 space-y-5">
              {workflowHighlights.map((item) => (
                <li
                  className="flex items-center gap-4 font-mono text-sm text-[#f3f3f5]"
                  key={item}
                >
                  <span className="grid size-6 place-items-center rounded-full border border-[#4a4b61] bg-[#202130] text-[#bfc1e8]">
                    <Check className="size-3.5" />
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 h-px w-full bg-[#222229]" />
            <div className="mt-8 flex flex-wrap items-center gap-8 font-mono text-[11px] uppercase tracking-[0.18em] text-[#8f8f9d]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="size-4" />
                Secure Authentication
              </span>
              <span className="flex items-center gap-1.5">
                <UsersRound className="size-4" />
                Multi-Tenant Support
              </span>
            </div>
          </div>
        </section>

        <section className="flex min-h-screen items-center justify-center bg-[#111113] px-5 py-10 sm:px-8">
          <div className="w-full max-w-[448px] rounded-xl border border-[#2b2b31] bg-[#171719] px-8 py-8 shadow-[0_28px_70px_rgba(0,0,0,0.42)] sm:px-8">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-lg bg-[#b9b7ff] shadow-[0_0_22px_rgba(185,183,255,0.48)]">
                <Zap className="size-6 fill-[#1200a9] text-[#1200a9]" />
              </span>
              <span className="text-2xl font-bold text-[#eeeeef]">
                FlowForge
              </span>
            </div>

            <div className="mt-8 grid rounded-lg bg-[#09090b] p-1">
              <div className="grid grid-cols-2 gap-1">
                <button
                  className="h-8 rounded-md text-sm font-medium text-[#d7d5e4] transition hover:bg-[#1f1f25]"
                  onClick={goToLogin}
                  type="button"
                >
                  Sign In
                </button>
                <button
                  className="h-8 rounded-md bg-[#b9b7f6] text-sm font-medium text-[#1400a7] transition hover:bg-[#c6c4ff]"
                  type="button"
                >
                  Create Account
                </button>
              </div>
            </div>

            <div className="mt-9">
              <h2 className="text-3xl font-bold leading-none text-[#eeeeef]">
                Join FlowForge
              </h2>
              <p className="mt-2 text-base text-[#bbb8c9]">
                Start building resilient infrastructure
              </p>
            </div>

            <form className="mt-9 space-y-5" noValidate onSubmit={handleSubmit}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    className="font-mono text-xs text-[#f0edf6]"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    aria-invalid={Boolean(errors.fullName)}
                    className={`mt-2 h-14 w-full rounded-md border bg-[#09090c] px-4 text-base text-[#f4f4f7] outline-none transition placeholder:text-[#5e5e6e] focus:border-[#b9b7ff] ${
                      errors.fullName
                        ? "border-red-400/70"
                        : "border-[#464657]"
                    }`}
                    id="fullName"
                    name="fullName"
                    onChange={(event) => {
                      setFullName(event.target.value);
                      if (errors.fullName) {
                        setErrors((current) => ({
                          ...current,
                          fullName: undefined,
                        }));
                      }
                    }}
                    placeholder="John Doe"
                    value={fullName}
                  />
                  {errors.fullName ? (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.fullName}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label
                    className="font-mono text-xs text-[#f0edf6]"
                    htmlFor="workspace"
                  >
                    Workspace/Org
                  </label>
                  <input
                    aria-invalid={Boolean(errors.workspace)}
                    className={`mt-2 h-14 w-full rounded-md border bg-[#09090c] px-4 text-base text-[#f4f4f7] outline-none transition placeholder:text-[#5e5e6e] focus:border-[#b9b7ff] ${
                      errors.workspace
                        ? "border-red-400/70"
                        : "border-[#464657]"
                    }`}
                    id="workspace"
                    name="workspace"
                    onChange={(event) => {
                      setWorkspace(event.target.value);
                      if (errors.workspace) {
                        setErrors((current) => ({
                          ...current,
                          workspace: undefined,
                        }));
                      }
                    }}
                    placeholder="Acme Inc"
                    value={workspace}
                  />
                  {errors.workspace ? (
                    <p className="mt-2 text-sm text-red-300">
                      {errors.workspace}
                    </p>
                  ) : null}
                </div>
              </div>

              <div>
                <label
                  className="font-mono text-xs text-[#f0edf6]"
                  htmlFor="email"
                >
                  Work Email
                </label>
                <input
                  aria-invalid={Boolean(errors.email)}
                  className={`mt-2 h-14 w-full rounded-md border bg-[#09090c] px-4 text-base text-[#f4f4f7] outline-none transition placeholder:text-[#5e5e6e] focus:border-[#b9b7ff] ${
                    errors.email ? "border-red-400/70" : "border-[#464657]"
                  }`}
                  id="email"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (errors.email) {
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }
                  }}
                  placeholder="name@company.com"
                  type="email"
                  value={email}
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-red-300">{errors.email}</p>
                ) : null}
              </div>

              <div>
                <label
                  className="font-mono text-xs text-[#f0edf6]"
                  htmlFor="password"
                >
                  Password
                </label>
                <div
                  className={`mt-2 flex h-14 items-center rounded-md border bg-[#09090c] px-4 transition focus-within:border-[#b9b7ff] ${
                    errors.password ? "border-red-400/70" : "border-[#464657]"
                  }`}
                >
                  <input
                    aria-invalid={Boolean(errors.password)}
                    className="h-full min-w-0 flex-1 bg-transparent text-base text-[#f4f4f7] outline-none placeholder:text-[#5e5e6e]"
                    id="password"
                    name="password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      if (errors.password) {
                        setErrors((current) => ({
                          ...current,
                          password: undefined,
                        }));
                      }
                    }}
                    placeholder="Min. 12 characters"
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="ml-3 text-[#a1a0b2] transition hover:text-[#d4d2ff]"
                    onClick={() => setShowPassword((current) => !current)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="size-5" />
                    ) : (
                      <Eye className="size-5" />
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.password}
                  </p>
                ) : null}
              </div>

              <div>
                <label
                  className="font-mono text-xs text-[#f0edf6]"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  aria-invalid={Boolean(errors.confirmPassword)}
                  className={`mt-2 h-14 w-full rounded-md border bg-[#09090c] px-4 text-base text-[#f4f4f7] outline-none transition placeholder:text-[#5e5e6e] focus:border-[#b9b7ff] ${
                    errors.confirmPassword
                      ? "border-red-400/70"
                      : "border-[#464657]"
                  }`}
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                    if (errors.confirmPassword) {
                      setErrors((current) => ({
                        ...current,
                        confirmPassword: undefined,
                      }));
                    }
                  }}
                  placeholder="Re-enter password"
                  type="password"
                  value={confirmPassword}
                />
                {errors.confirmPassword ? (
                  <p className="mt-2 text-sm text-red-300">
                    {errors.confirmPassword}
                  </p>
                ) : null}
              </div>

              <div>
                <label className="flex w-fit cursor-pointer items-center gap-3 text-sm text-[#c8c6d4]">
                  <input
                    checked={acceptedTerms}
                    className="size-4 appearance-none rounded border border-[#535366] bg-[#111113] transition checked:border-[#b9b7ff] checked:bg-[#b9b7ff]"
                    onChange={(event) => {
                      setAcceptedTerms(event.target.checked);
                      if (errors.terms) {
                        setErrors((current) => ({
                          ...current,
                          terms: undefined,
                        }));
                      }
                    }}
                    type="checkbox"
                  />
                  <span>
                    I agree to the{" "}
                    <button
                      className="text-[#c2c0ff] transition hover:text-[#d4d2ff]"
                      type="button"
                    >
                      Terms
                    </button>{" "}
                    and{" "}
                    <button
                      className="text-[#c2c0ff] transition hover:text-[#d4d2ff]"
                      type="button"
                    >
                      Privacy
                    </button>
                    .
                  </span>
                </label>
                {errors.terms ? (
                  <p className="mt-2 text-sm text-red-300">{errors.terms}</p>
                ) : null}
              </div>

              <Button
                className="h-14 w-full rounded-md bg-[#b9b7f6] p-0 text-base font-medium text-[#1400a7] shadow-[0_12px_28px_rgba(185,183,246,0.18)] hover:bg-[#c6c4ff]"
                type="submit"
              >
                Create Account
              </Button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}

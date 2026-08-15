"use client";

import { useState, useEffect, type ReactNode, type ElementType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, BookOpen, GraduationCap, Map, Play, LayoutDashboard,
  LogIn, Moon, Sun, Bell, Search, Star, Users, Clock, Award,
  CheckCircle, Circle, Code, Database, Brain, Layers, GitBranch,
  Lock, Mail, Eye, EyeOff, Flame, Target, Trophy, TrendingUp,
  ArrowRight, FileText, Settings, BarChart2, Plus, ChevronRight,
  Zap, Bookmark, Filter, MoreHorizontal
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────
type Page = "home" | "courses" | "dashboard" | "roadmap" | "player" | "admin" | "login";
type Theme = "light" | "dark";

// ── Data ───────────────────────────────────────────────────────────
const enrollmentData = [
  { month: "Jan", value: 420 }, { month: "Feb", value: 580 },
  { month: "Mar", value: 510 }, { month: "Apr", value: 780 },
  { month: "May", value: 920 }, { month: "Jun", value: 1100 },
  { month: "Jul", value: 980 }, { month: "Aug", value: 1340 },
];

const revenueData = [
  { month: "Jan", value: 42000 }, { month: "Feb", value: 58000 },
  { month: "Mar", value: 51000 }, { month: "Apr", value: 78000 },
  { month: "May", value: 92000 }, { month: "Jun", value: 110000 },
  { month: "Jul", value: 98000 }, { month: "Aug", value: 134000 },
];

const COURSES = [
  {
    id: 1, title: "Advanced React Patterns", instructor: "Sarah Chen",
    category: "Frontend", level: "Advanced", rating: 4.9, students: 12840,
    duration: "24h 30m", price: 89, progress: 67, enrolled: true,
    gradient: "from-indigo-500 to-violet-600", Icon: Code,
  },
  {
    id: 2, title: "System Design Masterclass", instructor: "Marcus Kim",
    category: "Architecture", level: "Advanced", rating: 4.8, students: 8920,
    duration: "32h 15m", price: 129, progress: 23, enrolled: true,
    gradient: "from-cyan-500 to-blue-600", Icon: Database,
  },
  {
    id: 3, title: "Machine Learning Fundamentals", instructor: "Priya Sharma",
    category: "AI/ML", level: "Intermediate", rating: 4.7, students: 21300,
    duration: "40h 20m", price: 109, progress: 0, enrolled: false,
    gradient: "from-emerald-500 to-teal-600", Icon: Brain,
  },
  {
    id: 4, title: "TypeScript Deep Dive", instructor: "Alex Rivera",
    category: "Frontend", level: "Intermediate", rating: 4.8, students: 15670,
    duration: "18h 45m", price: 79, progress: 0, enrolled: false,
    gradient: "from-blue-500 to-indigo-600", Icon: Code,
  },
  {
    id: 5, title: "Cloud Architecture on AWS", instructor: "James O'Brien",
    category: "DevOps", level: "Advanced", rating: 4.6, students: 9840,
    duration: "28h 10m", price: 119, progress: 0, enrolled: false,
    gradient: "from-orange-400 to-rose-600", Icon: Layers,
  },
  {
    id: 6, title: "Git & GitHub Mastery", instructor: "Yuki Tanaka",
    category: "Tools", level: "Beginner", rating: 4.9, students: 34500,
    duration: "12h 00m", price: 49, progress: 100, enrolled: true,
    gradient: "from-violet-500 to-purple-600", Icon: GitBranch,
  },
];

const ROADMAP = [
  { id: 1, title: "HTML & CSS Foundations", status: "completed", xp: 500, skills: ["HTML5", "CSS Grid", "Flexbox"] },
  { id: 2, title: "JavaScript Essentials", status: "completed", xp: 800, skills: ["ES6+", "DOM", "Async/Await"] },
  { id: 3, title: "React Fundamentals", status: "completed", xp: 1200, skills: ["Hooks", "State", "Props"] },
  { id: 4, title: "Advanced React Patterns", status: "active", xp: 1500, skills: ["Context", "Reducers", "Performance"] },
  { id: 5, title: "TypeScript", status: "locked", xp: 1000, skills: ["Types", "Generics", "Decorators"] },
  { id: 6, title: "Next.js & Full Stack", status: "locked", xp: 2000, skills: ["SSR", "API Routes", "Auth"] },
  { id: 7, title: "System Design", status: "locked", xp: 2500, skills: ["Scalability", "Patterns", "Trade-offs"] },
];

const LESSONS = [
  { id: 1, title: "Introduction to Patterns", duration: "12:30", completed: true },
  { id: 2, title: "Compound Components", duration: "18:45", completed: true },
  { id: 3, title: "Render Props Pattern", duration: "21:10", completed: true },
  { id: 4, title: "Custom Hook Patterns", duration: "25:00", completed: false },
  { id: 5, title: "Context + Reducer", duration: "19:30", completed: false },
  { id: 6, title: "Performance Patterns", duration: "28:15", completed: false },
  { id: 7, title: "Module Quiz", duration: "15:00", completed: false, isQuiz: true },
];

const TOP_COURSES = [
  { title: "Advanced React Patterns", students: 12840, revenue: "$1,143,560", rating: 4.9 },
  { title: "System Design Masterclass", students: 8920, revenue: "$1,150,680", rating: 4.8 },
  { title: "ML Fundamentals", students: 21300, revenue: "$2,321,700", rating: 4.7 },
  { title: "TypeScript Deep Dive", students: 15670, revenue: "$1,237,930", rating: 4.8 },
];

const RECENT_USERS = [
  { name: "Emma Rodriguez", email: "emma.r@gmail.com", time: "2 min ago", initials: "ER" },
  { name: "Liam Park", email: "l.park@outlook.com", time: "15 min ago", initials: "LP" },
  { name: "Sofia Müller", email: "sofia.m@web.de", time: "1 hr ago", initials: "SM" },
  { name: "Noah Chen", email: "n.chen@yahoo.com", time: "2 hr ago", initials: "NC" },
];

// ── Micro-components ────────────────────────────────────────────────

function Badge({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "success" | "warning" | "muted" | "outline" }) {
  const styles = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    muted: "bg-muted text-muted-foreground",
    outline: "border border-border text-muted-foreground",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`h-3 w-3 ${i <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{rating}</span>
    </div>
  );
}

function Bar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 bg-muted rounded-full overflow-hidden ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }}
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
      />
    </div>
  );
}

function Avi({ initials, size = "md", gradient = false }: { initials: string; size?: "xs" | "sm" | "md" | "lg"; gradient?: boolean }) {
  const s = { xs: "h-6 w-6 text-[10px]", sm: "h-8 w-8 text-xs", md: "h-9 w-9 text-sm", lg: "h-12 w-12 text-base" };
  return (
    <div className={`${s[size]} rounded-full flex items-center justify-center font-semibold flex-shrink-0 text-white ${gradient ? "bg-gradient-to-br from-primary to-accent" : "bg-gradient-to-br from-violet-500 to-primary"}`}>
      {initials}
    </div>
  );
}

function StatCard({ label, value, sub, Icon, trend, color }: {
  label: string; value: string; sub?: string; Icon: ElementType; trend?: number; color: string;
}) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        {trend !== undefined && (
          <span className={`text-xs font-medium ${trend >= 0 ? "text-emerald-500" : "text-rose-500"}`} style={{ fontFamily: "JetBrains Mono, monospace" }}>
            {trend >= 0 ? "+" : ""}{trend}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{value}</p>
      <p className="text-sm text-muted-foreground mt-0.5">{label}</p>
      {sub && <p className="text-xs text-muted-foreground/60 mt-0.5">{sub}</p>}
    </div>
  );
}

function CourseCard({ course, onClick }: { course: typeof COURSES[0]; onClick?: () => void }) {
  const { Icon } = course;
  return (
    <motion.div
      whileHover={{ y: -3, transition: { duration: 0.18 } }}
      className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/8 transition-shadow duration-300"
      onClick={onClick}
    >
      <div className={`h-32 bg-gradient-to-br ${course.gradient} relative flex items-center justify-center`}>
        <Icon className="h-11 w-11 text-white/80" />
        <div className="absolute top-3 left-3">
          <Badge variant="muted">{course.level}</Badge>
        </div>
        {course.progress === 100 && (
          <div className="absolute top-3 right-3 bg-emerald-500 rounded-full p-1">
            <CheckCircle className="h-3.5 w-3.5 text-white" />
          </div>
        )}
        {course.enrolled && course.progress > 0 && course.progress < 100 && (
          <div className="absolute bottom-0 inset-x-0 h-1 bg-black/20">
            <div className="h-full bg-white/80 transition-all" style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-primary font-medium mb-1">{course.category}</p>
        <h3 className="font-semibold text-foreground text-sm leading-snug mb-1.5 line-clamp-2">{course.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{course.instructor}</p>
        <Stars rating={course.rating} />
        <div className="flex gap-3 mt-2.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="h-3 w-3" />{(course.students / 1000).toFixed(0)}k</span>
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{course.duration}</span>
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          {course.enrolled ? (
            <div className="flex-1">
              {course.progress === 100
                ? <span className="text-xs text-emerald-500 font-medium">✓ Completed</span>
                : <><p className="text-xs text-muted-foreground mb-1">{course.progress}% complete</p><Bar value={course.progress} /></>
              }
            </div>
          ) : (
            <>
              <span className="font-bold text-foreground text-sm">${course.price}</span>
              <button className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">
                Enroll
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Sidebar ────────────────────────────────────────────────────────

const NAV: { id: Page; label: string; Icon: ElementType }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "courses", label: "Courses", Icon: BookOpen },
  { id: "dashboard", label: "My Learning", Icon: GraduationCap },
  { id: "roadmap", label: "Roadmap", Icon: Map },
  { id: "player", label: "Course Player", Icon: Play },
  { id: "admin", label: "Admin", Icon: LayoutDashboard },
];

function Sidebar({ page, setPage, theme, toggleTheme }: {
  page: Page; setPage: (p: Page) => void; theme: Theme; toggleTheme: () => void;
}) {
  return (
    <aside className="w-60 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="px-5 py-[18px] border-b border-sidebar-border">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-[17px] text-sidebar-foreground tracking-tight">LearnPath</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <p className="px-2 pb-2 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Menu</p>
        {NAV.map(({ id, label, Icon: NavIcon }) => {
          const active = page === id;
          return (
            <button
              key={id}
              onClick={() => setPage(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                active
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              }`}
            >
              <NavIcon className="h-4 w-4 flex-shrink-0" />
              {label}
              {active && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-70" />}
            </button>
          );
        })}

        <div className="pt-4">
          <p className="px-2 pb-2 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/60">Account</p>
          <button
            onClick={() => setPage("login")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
              page === "login"
                ? "bg-primary text-primary-foreground shadow-md shadow-primary/30"
                : "text-sidebar-foreground hover:bg-sidebar-accent"
            }`}
          >
            <LogIn className="h-4 w-4 flex-shrink-0" />
            Auth Pages
            {page === "login" && <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-70" />}
          </button>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-sidebar-border space-y-1">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-all"
        >
          {theme === "dark"
            ? <Sun className="h-4 w-4 text-amber-400" />
            : <Moon className="h-4 w-4 text-indigo-400" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <Avi initials="AC" size="sm" gradient />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">Alex Chen</p>
            <p className="text-xs text-muted-foreground truncate">alex@learnpath.io</p>
          </div>
          <Settings className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}

// ── Topbar ─────────────────────────────────────────────────────────

function Topbar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-md flex-shrink-0 sticky top-0 z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input
          placeholder="Search anything..."
          className="bg-muted rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-52 border-0"
        />
      </div>
      <div className="flex items-center gap-2">
        <button className="relative h-8 w-8 flex items-center justify-center rounded-xl hover:bg-muted transition-colors">
          <Bell className="h-4 w-4 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 bg-rose-500 rounded-full" />
        </button>
        <Avi initials="AC" size="sm" gradient />
      </div>
    </header>
  );
}

// ── Page: Home ─────────────────────────────────────────────────────

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent p-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/15 blur-3xl pointer-events-none" />
        <div className="absolute top-8 right-8 h-32 w-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />
        <div className="relative max-w-lg">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium mb-5"
          >
            <Zap className="h-3 w-3 text-amber-300" />
            New: AI-powered learning roadmaps
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-[2.6rem] font-extrabold text-white leading-[1.15] mb-4"
          >
            Master the skills<br />that shape the future
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/75 text-[15px] mb-7 max-w-sm leading-relaxed"
          >
            Structured learning paths, expert instructors, and a community that pushes you forward.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex gap-3"
          >
            <button
              onClick={() => setPage("courses")}
              className="bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm flex items-center gap-2 shadow-lg"
            >
              Explore Courses <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => setPage("roadmap")}
              className="bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors text-sm"
            >
              View Roadmap
            </button>
          </motion.div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { v: "180k+", l: "Active Students", I: Users, c: "from-indigo-500 to-violet-600" },
          { v: "340+", l: "Expert Courses", I: BookOpen, c: "from-cyan-500 to-blue-500" },
          { v: "4.8★", l: "Average Rating", I: Star, c: "from-amber-400 to-orange-500" },
          { v: "52k+", l: "Certificates Issued", I: Award, c: "from-emerald-500 to-teal-600" },
        ].map(({ v, l, I, c }, i) => (
          <motion.div
            key={l}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/5 transition-all"
          >
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${c} flex items-center justify-center mx-auto mb-3 shadow-md`}>
              <I className="h-4 w-4 text-white" />
            </div>
            <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
          </motion.div>
        ))}
      </div>

      {/* Featured courses */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Featured Courses</h2>
          <button onClick={() => setPage("courses")} className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View all <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COURSES.slice(0, 3).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <CourseCard course={c} onClick={() => setPage("player")} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* How it works */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">How it works</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { n: "01", title: "Choose your path", desc: "Pick a skill or goal. Our AI generates a tailored learning roadmap just for you.", I: Target },
            { n: "02", title: "Learn at your pace", desc: "Video lessons, quizzes, and projects. Resume exactly where you left off.", I: Play },
            { n: "03", title: "Earn certificates", desc: "Complete courses and receive verifiable certificates to boost your resume.", I: Award },
          ].map(({ n, title, desc, I }) => (
            <div key={n} className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl font-black text-primary/15" style={{ fontFamily: "JetBrains Mono, monospace" }}>{n}</span>
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <I className="h-4 w-4 text-primary" />
                </div>
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page: Courses ──────────────────────────────────────────────────

function CoursesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [cat, setCat] = useState("All");
  const [lvl, setLvl] = useState("All");
  const cats = ["All", "Frontend", "Architecture", "AI/ML", "DevOps", "Tools"];
  const lvls = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = COURSES.filter(c =>
    (cat === "All" || c.category === cat) && (lvl === "All" || c.level === lvl)
  );

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Course Catalog</h1>
          <p className="text-muted-foreground mt-1 text-sm">Learn from the best. Advance your career.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search courses..."
            className="bg-muted border-0 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-52"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {cats.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>
            {c}
          </button>
        ))}
        <span className="w-px h-5 bg-border mx-1" />
        {lvls.map(l => (
          <button key={l} onClick={() => setLvl(l)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${lvl === l ? "bg-accent/20 text-accent border border-accent/40" : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"}`}>
            {l}
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mb-5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
        {filtered.length} course{filtered.length !== 1 ? "s" : ""} found
      </p>

      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.div key={c.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }}
              exit={{ opacity: 0, scale: 0.96 }}
            >
              <CourseCard course={c} onClick={() => setPage("player")} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ── Page: Dashboard ────────────────────────────────────────────────

function DashboardPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="space-y-6">
      {/* Greeting */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, Alex 👋</h1>
          <p className="text-muted-foreground mt-1 text-sm">You&apos;re on a 14-day learning streak. Keep it going!</p>
        </div>
        <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3">
          <Flame className="h-5 w-5 text-amber-500" />
          <div>
            <p className="font-bold text-amber-500 text-lg leading-none" style={{ fontFamily: "JetBrains Mono, monospace" }}>14</p>
            <p className="text-xs text-muted-foreground mt-0.5">day streak</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="In Progress" value="3" Icon={BookOpen} trend={12} color="from-indigo-500 to-violet-600" />
        <StatCard label="Completed" value="8" sub="2 this month" Icon={CheckCircle} trend={25} color="from-emerald-500 to-teal-600" />
        <StatCard label="Hours Learned" value="124" sub="this year" Icon={Clock} trend={8} color="from-cyan-500 to-blue-500" />
        <StatCard label="Certificates" value="5" Icon={Award} trend={40} color="from-amber-400 to-orange-500" />
      </div>

      {/* Continue + Sidebar */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <h2 className="text-base font-bold text-foreground">Continue Learning</h2>
          {COURSES.filter(c => c.enrolled && c.progress > 0 && c.progress < 100).map(course => {
            const { Icon: CIcon } = course;
            return (
              <div
                key={course.id}
                onClick={() => setPage("player")}
                className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group transition-all hover:border-primary/30"
              >
                <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                  <CIcon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{course.title}</p>
                  <p className="text-xs text-muted-foreground mb-2">{course.instructor} · {course.duration}</p>
                  <Bar value={course.progress} />
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-bold text-foreground text-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}>{course.progress}%</p>
                  <button className="mt-2 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Continue <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          {/* Level card */}
          <div className="bg-gradient-to-br from-primary via-violet-600 to-accent rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-medium text-white/70">Level 12 · Developer</p>
              <Trophy className="h-5 w-5 text-amber-300" />
            </div>
            <p className="text-3xl font-extrabold mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>4,200</p>
            <p className="text-[11px] text-white/55 mb-3">800 XP until Level 13</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "84%" }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                className="h-full bg-white rounded-full"
              />
            </div>
          </div>

          {/* Saved */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
              <Bookmark className="h-4 w-4 text-primary" /> Saved Courses
            </h3>
            <div className="space-y-2">
              {COURSES.filter(c => !c.enrolled).slice(0, 2).map(course => {
                const { Icon: SIcon } = course;
                return (
                  <div key={course.id} className="flex items-center gap-3 py-1.5">
                    <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0`}>
                      <SIcon className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground truncate">{course.title}</p>
                      <p className="text-xs text-muted-foreground">${course.price}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Certificates */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-4">Recent Certificates</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { title: "Git & GitHub Mastery", date: "Jul 28, 2025", id: "LP-2025-0042" },
            { title: "React Fundamentals", date: "Jun 12, 2025", id: "LP-2025-0031" },
          ].map(cert => (
            <div key={cert.id} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-3 hover:border-amber-500/30 transition-colors">
              <div className="h-10 w-10 rounded-xl bg-amber-400/15 flex items-center justify-center flex-shrink-0">
                <Award className="h-5 w-5 text-amber-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">{cert.title}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
                <p className="text-xs text-primary mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{cert.id}</p>
              </div>
              <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Page: Roadmap ──────────────────────────────────────────────────

function RoadmapPage() {
  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Learning Roadmap</h1>
          <p className="text-muted-foreground mt-1 text-sm">Frontend Developer path · AI-generated based on your goals</p>
        </div>
        <Badge variant="primary">7 modules · ~32 weeks</Badge>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Path */}
        <div className="col-span-2 space-y-2">
          {ROADMAP.map((node, i) => {
            const done = node.status === "completed";
            const active = node.status === "active";
            const locked = node.status === "locked";
            return (
              <motion.div
                key={node.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="relative flex gap-4"
              >
                {i < ROADMAP.length - 1 && (
                  <div className={`absolute left-[21px] top-11 bottom-[-8px] w-0.5 z-0 transition-colors ${done ? "bg-primary" : "bg-border"}`} />
                )}
                <div className={`h-[43px] w-[43px] rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 transition-all shadow-sm ${
                  done ? "bg-primary border-primary text-white" :
                  active ? "bg-background border-primary text-primary" :
                  "bg-background border-border text-muted-foreground"
                }`}>
                  {done ? <CheckCircle className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4" /> : <Circle className="h-5 w-5" />}
                </div>
                <div className={`flex-1 mb-2 bg-card border rounded-2xl p-4 transition-all ${
                  active ? "border-primary shadow-lg shadow-primary/10" :
                  locked ? "border-border opacity-55" : "border-border"
                }`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground text-sm">{node.title}</h3>
                      {done && <Badge variant="success">Done</Badge>}
                      {active && <Badge variant="primary">In Progress</Badge>}
                      {locked && <Badge variant="muted">Locked</Badge>}
                    </div>
                    <span className="font-semibold text-xs text-primary flex-shrink-0 ml-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>+{node.xp} XP</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {node.skills.map(s => (
                      <span key={s} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-lg" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s}</span>
                    ))}
                  </div>
                  {active && (
                    <div className="mt-3">
                      <p className="text-xs text-muted-foreground mb-1.5">Overall progress</p>
                      <Bar value={67} />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground mb-4 text-sm">Path Progress</h3>
            <div className="relative h-32 w-32 mx-auto mb-4">
              <svg viewBox="0 0 112 112" className="h-32 w-32 -rotate-90">
                <circle cx="56" cy="56" r="46" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted" />
                <circle
                  cx="56" cy="56" r="46" fill="none" stroke="url(#rGrad)" strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 46 * 0.43} ${2 * Math.PI * 46}`}
                />
                <defs>
                  <linearGradient id="rGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="var(--color-accent)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>43%</p>
                <p className="text-[10px] text-muted-foreground">complete</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              {[
                { l: "Completed", v: "3 / 7", c: "" },
                { l: "XP Earned", v: "2,500", c: "text-primary" },
                { l: "Est. completion", v: "~18 weeks", c: "" },
              ].map(({ l, v, c }) => (
                <div key={l} className="flex justify-between">
                  <span className="text-muted-foreground text-xs">{l}</span>
                  <span className={`text-xs font-semibold ${c || "text-foreground"}`} style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3">Skills Earned</h3>
            <div className="flex flex-wrap gap-1.5">
              {["HTML5", "CSS Grid", "Flexbox", "ES6+", "DOM", "Async/Await", "Hooks", "State", "Props"].map(s => (
                <span key={s} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-lg" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s}</span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-4 w-4 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">Next milestone</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Complete TypeScript module to unlock Next.js path</p>
            <button className="w-full bg-primary text-primary-foreground text-xs font-semibold py-2 rounded-xl hover:opacity-90 transition-opacity">
              Start TypeScript →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page: Player ───────────────────────────────────────────────────

function PlayerPage() {
  const [active, setActive] = useState(4);
  const [notes, setNotes] = useState("");

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-0.5">Advanced React Patterns · Chapter 2</p>
          <h1 className="font-bold text-foreground text-lg">Custom Hook Patterns</h1>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-xl" style={{ fontFamily: "JetBrains Mono, monospace" }}>Lesson 4 / 7</span>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 transition-opacity shadow-md shadow-primary/30">
            <Award className="h-3.5 w-3.5" /> Take Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ minHeight: 420 }}>
        {/* Video + Notes */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden flex-1 bg-gradient-to-br from-indigo-950 to-violet-950 border border-border" style={{ minHeight: 280 }}>
            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 shadow-xl"
              >
                <Play className="h-7 w-7 text-white ml-1" />
              </motion.button>
              <p className="text-white/80 text-sm font-semibold">Custom Hook Patterns</p>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>25:00</p>
            </div>
            {/* Scrubber */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-2 cursor-pointer">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "38%" }}
                  transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              <div className="flex items-center justify-between text-xs text-white/50" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                <span>09:32</span><span>25:00</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" /> Lesson Notes
            </h3>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Take notes while you watch — they're saved automatically..."
              className="w-full bg-muted/60 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none border-0"
              rows={4}
            />
          </div>
        </div>

        {/* Lesson list */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm">Course Content</h3>
            <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>3 / 7 complete</p>
            <Bar value={Math.round(3 / 7 * 100)} className="mt-2" />
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-border/40">
            {LESSONS.map((lesson, idx) => (
              <button
                key={lesson.id}
                onClick={() => setActive(lesson.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                  lesson.id === active
                    ? "bg-primary/8 border-l-[3px] border-l-primary"
                    : "hover:bg-muted/50 border-l-[3px] border-l-transparent"
                }`}
              >
                <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${
                  lesson.completed ? "bg-emerald-500 text-white" :
                  lesson.id === active ? "bg-primary text-primary-foreground" :
                  "bg-muted text-muted-foreground"
                }`} style={lesson.completed ? {} : { fontFamily: "JetBrains Mono, monospace" }}>
                  {lesson.completed ? <CheckCircle className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-xs font-medium truncate ${lesson.id === active ? "text-primary" : "text-foreground"}`}>
                    {lesson.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>
                    {lesson.isQuiz ? "📝 " : ""}{lesson.duration}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page: Admin ────────────────────────────────────────────────────

function AdminPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1 text-sm">Platform overview · August 2025</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-md shadow-primary/30">
          <Plus className="h-4 w-4" /> New Course
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Students" value="180,241" trend={14} Icon={Users} color="from-indigo-500 to-violet-600" />
        <StatCard label="Active Courses" value="342" sub="18 in draft" trend={8} Icon={BookOpen} color="from-cyan-500 to-blue-500" />
        <StatCard label="Monthly Revenue" value="$134k" trend={22} Icon={TrendingUp} color="from-emerald-500 to-teal-600" />
        <StatCard label="Avg Completion" value="73%" trend={5} Icon={Target} color="from-amber-400 to-orange-500" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Enrollments */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground text-sm">New Enrollments</h3>
          <p className="text-xs text-muted-foreground mb-4 mt-0.5">Last 8 months</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={enrollmentData} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
              <defs>
                <linearGradient id="gEnroll" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12, fontFamily: "JetBrains Mono, monospace" }} />
              <Area type="monotone" dataKey="value" stroke="var(--color-primary)" strokeWidth={2} fill="url(#gEnroll)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue */}
        <div className="bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold text-foreground text-sm">Revenue</h3>
          <p className="text-xs text-muted-foreground mb-4 mt-0.5">Last 8 months · USD</p>
          <ResponsiveContainer width="100%" height={160}>
            <AreaChart data={revenueData} margin={{ top: 4, right: 4, left: -18, bottom: 0 }}>
              <defs>
                <linearGradient id="gRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <YAxis tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
              <Tooltip
                formatter={(v: number) => [`$${(v / 1000).toFixed(0)}k`, "Revenue"]}
                contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12, fontFamily: "JetBrains Mono, monospace" }}
              />
              <Area type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} fill="url(#gRevenue)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {/* Top courses */}
        <div className="col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm">Top Performing Courses</h3>
            <button className="text-xs text-primary font-semibold hover:underline">View all</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                {["Course", "Students", "Revenue", "Rating"].map(h => (
                  <th key={h} className={`px-5 py-2.5 text-xs text-muted-foreground font-medium ${h === "Course" ? "text-left" : "text-right"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TOP_COURSES.map((c, i) => (
                <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-5 py-3 text-sm font-medium text-foreground">{c.title}</td>
                  <td className="px-5 py-3 text-right text-sm text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.students.toLocaleString()}</td>
                  <td className="px-5 py-3 text-right text-sm text-emerald-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.revenue}</td>
                  <td className="px-5 py-3 text-right text-sm text-amber-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.rating}★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recent signups */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground text-sm">Recent Signups</h3>
            <button className="text-xs text-primary font-semibold">Manage</button>
          </div>
          <div className="divide-y divide-border/40">
            {RECENT_USERS.map((u, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors">
                <Avi initials={u.initials} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{u.name}</p>
                  <p className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{u.time}</p>
                </div>
                <MoreHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Page: Login ────────────────────────────────────────────────────

function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [showPw, setShowPw] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="h-full grid grid-cols-2 overflow-hidden rounded-2xl border border-border shadow-2xl" style={{ minHeight: 560 }}>
      {/* Left art panel */}
      <div className="relative bg-gradient-to-br from-primary via-violet-600 to-accent flex flex-col justify-between p-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-black/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 h-32 w-32 rounded-full bg-accent/20 blur-2xl pointer-events-none" />

        <div className="relative flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className="font-extrabold text-xl text-white">LearnPath</span>
        </div>

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium">
            <Trophy className="h-3 w-3 text-amber-300" />
            Trusted by 180,000+ learners
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white leading-tight mb-3">
              Your learning<br />journey starts here
            </h2>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs">
              Join thousands of developers advancing their careers with structured learning paths and expert mentors.
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
            <p className="text-white/85 text-sm italic mb-3 leading-relaxed">
              "LearnPath helped me go from junior to senior in 8 months. The roadmaps are genuinely game-changing."
            </p>
            <div className="flex items-center gap-2.5">
              <Avi initials="MK" size="sm" />
              <div>
                <p className="text-white text-xs font-semibold">Marcus Kim</p>
                <p className="text-white/55 text-xs">Senior Engineer @ Stripe</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex gap-8">
          {[{ v: "180k+", l: "Students" }, { v: "340+", l: "Courses" }, { v: "4.8★", l: "Rating" }].map(({ v, l }) => (
            <div key={l}>
              <p className="text-white font-bold text-lg" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p>
              <p className="text-white/55 text-xs">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form */}
      <div className="flex items-center justify-center bg-background p-10">
        <div className="w-full max-w-sm">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-foreground">{isLogin ? "Welcome back" : "Create an account"}</h2>
            <p className="text-muted-foreground text-sm mt-1.5">
              {isLogin ? "Sign in to continue your learning journey." : "Start learning for free today."}
            </p>
          </div>

          {/* OAuth */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["Google", "GitHub"].map(p => (
              <button key={p} className="flex items-center justify-center gap-2 border border-border bg-card rounded-xl py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                <span className={`font-bold ${p === "Google" ? "text-red-500" : "text-foreground"}`}>{p[0]}</span>
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or continue with email</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-xs font-semibold text-foreground mb-1.5">Full Name</label>
                <input type="text" placeholder="Alex Chen" className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0" />
              </div>
            )}
            <div>
              <label className="block text-xs font-semibold text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="alex@company.com"
                  className="w-full bg-input-background rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0" />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-foreground">Password</label>
                {isLogin && <button className="text-xs text-primary hover:underline">Forgot password?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••"
                  className="w-full bg-input-background rounded-xl pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0" />
                <button onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              onClick={() => setPage("dashboard")}
              className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 mt-1 shadow-lg shadow-primary/30"
            >
              {isLogin ? "Sign In" : "Create Account"} <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ── Root ───────────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => (t === "dark" ? "light" : "dark"));

  const pages: Record<Page, ReactNode> = {
    home: <HomePage setPage={setPage} />,
    courses: <CoursesPage setPage={setPage} />,
    dashboard: <DashboardPage setPage={setPage} />,
    roadmap: <RoadmapPage />,
    player: <PlayerPage />,
    admin: <AdminPage />,
    login: <LoginPage setPage={setPage} />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {page !== "login" && <Topbar />}
        <main className={`flex-1 overflow-y-auto ${page !== "login" ? "p-6" : "p-6"}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

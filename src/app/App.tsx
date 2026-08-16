"use client";

import { useState, useEffect, type ReactNode, type ElementType } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Home, BookOpen, GraduationCap, Map, Play, LayoutDashboard,
  LogIn, Moon, Sun, Bell, Search, Star, Users, Clock, Award,
  CheckCircle, Circle, Code, Database, Brain, Layers, GitBranch,
  Lock, Mail, Eye, EyeOff, Flame, Target, Trophy, TrendingUp,
  ArrowRight, FileText, Settings, BarChart2, Plus, ChevronRight,
  Zap, Bookmark, MoreHorizontal, Info, ShieldCheck, AlertCircle,
  UserPlus, Key, Flag, ClipboardList, PenLine, UserCheck, Inbox,
  ChevronDown, Download, ExternalLink, Ban, Trash2, RefreshCw,
  Send, Timer, Cpu, RotateCcw, Check, UploadCloud, MessageSquare,
  ThumbsUp, Reply, Hash, Globe, Heart, Sparkles, X
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  LineChart, Line,
} from "recharts";

// ── Types ──────────────────────────────────────────────────────────
type Page =
  | "home" | "courses" | "course-detail" | "about" | "verify-cert" | "not-found"
  | "login" | "register" | "forgot-password" | "reset-password" | "verify-email"
  | "profile" | "my-courses" | "saved" | "user-certs" | "user-reports" | "user-roadmap" | "roadmap-detail"
  | "player" | "final-test"
  | "admin" | "admin-users" | "admin-courses" | "admin-new-course" | "admin-course-editor"
  | "admin-enrollments" | "admin-reports" | "admin-analytics" | "admin-certs" | "admin-register"
  | "generating" | "empty-states";

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
const analyticsData = [
  { month: "Mar", enrollments: 210, revenue: 18700 },
  { month: "Apr", enrollments: 340, revenue: 30200 },
  { month: "May", enrollments: 420, revenue: 37400 },
  { month: "Jun", enrollments: 510, revenue: 45400 },
  { month: "Jul", enrollments: 390, revenue: 34700 },
  { month: "Aug", enrollments: 610, revenue: 54300 },
];

const COURSES = [
  { id: 1, title: "Advanced React Patterns", instructor: "Sarah Chen", category: "Frontend", level: "Advanced", rating: 4.9, students: 12840, duration: "24h 30m", price: 89, progress: 67, enrolled: true, gradient: "from-indigo-500 to-violet-600", Icon: Code },
  { id: 2, title: "System Design Masterclass", instructor: "Marcus Kim", category: "Architecture", level: "Advanced", rating: 4.8, students: 8920, duration: "32h 15m", price: 129, progress: 23, enrolled: true, gradient: "from-cyan-500 to-blue-600", Icon: Database },
  { id: 3, title: "Machine Learning Fundamentals", instructor: "Priya Sharma", category: "AI/ML", level: "Intermediate", rating: 4.7, students: 21300, duration: "40h 20m", price: 109, progress: 0, enrolled: false, gradient: "from-emerald-500 to-teal-600", Icon: Brain },
  { id: 4, title: "TypeScript Deep Dive", instructor: "Alex Rivera", category: "Frontend", level: "Intermediate", rating: 4.8, students: 15670, duration: "18h 45m", price: 79, progress: 0, enrolled: false, gradient: "from-blue-500 to-indigo-600", Icon: Code },
  { id: 5, title: "Cloud Architecture on AWS", instructor: "James O'Brien", category: "DevOps", level: "Advanced", rating: 4.6, students: 9840, duration: "28h 10m", price: 119, progress: 0, enrolled: false, gradient: "from-orange-400 to-rose-600", Icon: Layers },
  { id: 6, title: "Git & GitHub Mastery", instructor: "Yuki Tanaka", category: "Tools", level: "Beginner", rating: 4.9, students: 34500, duration: "12h 00m", price: 49, progress: 100, enrolled: true, gradient: "from-violet-500 to-purple-600", Icon: GitBranch },
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

const ADMIN_USERS = [
  { name: "Emma Rodriguez", email: "emma.r@gmail.com", role: "STUDENT", joined: "Aug 14, 2025", courses: 3, status: "active", initials: "ER" },
  { name: "Marcus Kim", email: "m.kim@stripe.com", role: "INSTRUCTOR", joined: "Jul 22, 2025", courses: 2, status: "active", initials: "MK" },
  { name: "Liam Park", email: "l.park@outlook.com", role: "STUDENT", joined: "Aug 12, 2025", courses: 1, status: "active", initials: "LP" },
  { name: "Sofia Müller", email: "sofia.m@web.de", role: "STUDENT", joined: "Aug 10, 2025", courses: 5, status: "banned", initials: "SM" },
  { name: "James O'Brien", email: "j.obrien@aws.com", role: "INSTRUCTOR", joined: "Jun 01, 2025", courses: 4, status: "active", initials: "JO" },
  { name: "Root Admin", email: "admin@learnpath.io", role: "SUPERADMIN", joined: "Jan 01, 2025", courses: 0, status: "active", initials: "RA" },
];

const ADMIN_COURSES_DATA = [
  { title: "Advanced React Patterns", instructor: "Sarah Chen", status: "APPROVED", students: 12840, rating: 4.9, submitted: "Mar 12, 2025" },
  { title: "Intro to Quantum Computing", instructor: "Dr. Lena Schulz", status: "PENDING_REVIEW", students: 0, rating: 0, submitted: "Aug 14, 2025" },
  { title: "Ethical Hacking Basics", instructor: "Kyle Nguyen", status: "DRAFT", students: 0, rating: 0, submitted: "Aug 10, 2025" },
  { title: "Blockchain Fundamentals", instructor: "Priya Sharma", status: "REJECTED", students: 0, rating: 0, submitted: "Aug 01, 2025" },
  { title: "System Design Masterclass", instructor: "Marcus Kim", status: "APPROVED", students: 8920, rating: 4.8, submitted: "Apr 05, 2025" },
];

const ENROLLMENTS = [
  { student: "Emma Rodriguez", si: "ER", course: "Advanced React Patterns", enrolled: "Aug 1, 2025", progress: 67, status: "active" },
  { student: "Liam Park", si: "LP", course: "Git & GitHub Mastery", enrolled: "Jul 28, 2025", progress: 100, status: "completed" },
  { student: "Sofia Müller", si: "SM", course: "ML Fundamentals", enrolled: "Jul 15, 2025", progress: 34, status: "active" },
  { student: "Noah Chen", si: "NC", course: "TypeScript Deep Dive", enrolled: "Aug 3, 2025", progress: 12, status: "active" },
  { student: "Emma Rodriguez", si: "ER", course: "System Design Masterclass", enrolled: "Aug 5, 2025", progress: 23, status: "active" },
];

const COURSE_REPORTS = [
  { reporter: "Noah Chen", ri: "NC", course: "Advanced React Patterns", issue: "Outdated content", status: "OPEN", filed: "Aug 14, 2025" },
  { reporter: "Liam Park", ri: "LP", course: "ML Fundamentals", issue: "Misleading description", status: "RESOLVED", filed: "Aug 10, 2025" },
  { reporter: "Mia Torres", ri: "MT", course: "Ethical Hacking Basics", issue: "Inappropriate material", status: "REVIEWING", filed: "Aug 12, 2025" },
];

const MY_REPORTS = [
  { course: "Advanced React Patterns", issue: "Video quality is poor in lesson 4", status: "OPEN", date: "Aug 14, 2025" },
  { course: "TypeScript Deep Dive", issue: "Quiz answers seem incorrect", status: "RESOLVED", date: "Jul 20, 2025" },
];

const EXAM_QUESTIONS = [
  { id: 1, q: "Which React hook is used to memoize a value between renders?", opts: ["useCallback", "useMemo", "useRef", "useEffect"], answer: 1 },
  { id: 2, q: "What does the 'key' prop help React identify in a list?", opts: ["Unique elements", "Sort order", "State changes", "Event listeners"], answer: 0 },
  { id: 3, q: "Which pattern separates UI logic from business logic via function-as-child?", opts: ["HOC", "Compound", "Render Props", "Custom Hooks"], answer: 2 },
  { id: 4, q: "What is the correct way to update nested state in useReducer?", opts: ["Mutate directly", "Return new object spread", "Use setState", "Call forceUpdate"], answer: 1 },
];

const CURRICULUM = [
  {
    module: "Module 1 · Foundations", lessons: [
      { title: "Why patterns matter", duration: "12:30", free: true },
      { title: "Setting up the project", duration: "8:15", free: true },
      { title: "Component thinking", duration: "15:00", free: false },
    ]
  },
  {
    module: "Module 2 · Core Patterns", lessons: [
      { title: "Compound Components", duration: "18:45", free: false },
      { title: "Render Props", duration: "21:10", free: false },
      { title: "Custom Hooks", duration: "25:00", free: false },
      { title: "Module 2 Quiz", duration: "10:00", free: false, isQuiz: true },
    ]
  },
  {
    module: "Module 3 · Performance", lessons: [
      { title: "Memoization strategies", duration: "19:30", free: false },
      { title: "Code splitting", duration: "16:45", free: false },
      { title: "Final Test", duration: "30:00", free: false, isTest: true },
    ]
  },
];

const SAVED_ROADMAPS = [
  { id: "rm-001", title: "Frontend Developer Path", goal: "Become a senior frontend developer", level: "Intermediate", weeks: 32, hoursPerWeek: 10, createdAt: "Aug 1, 2025", status: "active", modules: 7 },
  { id: "rm-002", title: "Full Stack Engineer Track", goal: "Build full stack SaaS products", level: "Advanced", weeks: 48, hoursPerWeek: 15, createdAt: "Jun 14, 2025", status: "draft", modules: 10 },
];

const CERTS = [
  { title: "Git & GitHub Mastery", date: "Jul 28, 2025", id: "LP-2025-0042", instructor: "Yuki Tanaka" },
  { title: "React Fundamentals", date: "Jun 12, 2025", id: "LP-2025-0031", instructor: "Sarah Chen" },
  { title: "HTML & CSS Foundations", date: "Mar 05, 2025", id: "LP-2025-0008", instructor: "Maria Lopez" },
];

const TEAM = [
  { name: "Anika Patel", role: "Co-founder & CEO", initials: "AP", bio: "Former engineer at Google, passionate about accessible education." },
  { name: "James Wu", role: "Co-founder & CTO", initials: "JW", bio: "Built learning platforms at Coursera and Udemy." },
  { name: "Isabelle Moreau", role: "Head of Curriculum", initials: "IM", bio: "10 years designing tech curricula across Europe." },
  { name: "Dev Kapoor", role: "Head of Community", initials: "DK", bio: "Community builder who grew Discord from 0 to 80k members." },
];

// ── Micro-components ────────────────────────────────────────────────

function Badge({ children, variant = "primary" }: { children: ReactNode; variant?: "primary" | "success" | "warning" | "muted" | "outline" | "danger" | "info" }) {
  const s = {
    primary: "bg-primary/10 text-primary",
    success: "bg-emerald-500/10 text-emerald-500",
    warning: "bg-amber-500/10 text-amber-500",
    danger: "bg-rose-500/10 text-rose-500",
    muted: "bg-muted text-muted-foreground",
    outline: "border border-border text-muted-foreground",
    info: "bg-cyan-500/10 text-cyan-500",
  };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${s[variant]}`}>{children}</span>;
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; variant: "success" | "warning" | "muted" | "danger" | "info" | "primary" }> = {
    APPROVED: { label: "Approved", variant: "success" },
    PENDING_REVIEW: { label: "Pending Review", variant: "warning" },
    DRAFT: { label: "Draft", variant: "muted" },
    REJECTED: { label: "Rejected", variant: "danger" },
    OPEN: { label: "Open", variant: "warning" },
    RESOLVED: { label: "Resolved", variant: "success" },
    REVIEWING: { label: "Reviewing", variant: "info" },
    active: { label: "Active", variant: "success" },
    banned: { label: "Banned", variant: "danger" },
    completed: { label: "Completed", variant: "primary" },
    draft: { label: "Draft", variant: "muted" },
  };
  const m = map[status] || { label: status, variant: "muted" as const };
  return <Badge variant={m.variant}>{m.label}</Badge>;
}

function RoleBadge({ role }: { role: string }) {
  const m: Record<string, string> = { SUPERADMIN: "text-amber-500 bg-amber-500/10", INSTRUCTOR: "text-primary bg-primary/10", STUDENT: "text-muted-foreground bg-muted" };
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${m[role] || m.STUDENT}`}>{role}</span>;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} className={`h-3 w-3 ${i <= Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30"}`} />
      ))}
      <span className="ml-1 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{rating || "—"}</span>
    </div>
  );
}

function Bar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 bg-muted rounded-full overflow-hidden ${className}`}>
      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 0.9, ease: "easeOut", delay: 0.15 }} className="h-full rounded-full bg-gradient-to-r from-primary to-accent" />
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

function StatCard({ label, value, sub, Icon, trend, color }: { label: string; value: string; sub?: string; Icon: ElementType; trend?: number; color: string }) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}><Icon className="h-5 w-5 text-white" /></div>
        {trend !== undefined && <span className={`text-xs font-medium ${trend >= 0 ? "text-emerald-500" : "text-rose-500"}`} style={{ fontFamily: "JetBrains Mono, monospace" }}>{trend >= 0 ? "+" : ""}{trend}%</span>}
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
    <motion.div whileHover={{ y: -3, transition: { duration: 0.18 } }} className="bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-primary/8 transition-shadow duration-300" onClick={onClick}>
      <div className={`h-32 bg-gradient-to-br ${course.gradient} relative flex items-center justify-center`}>
        <Icon className="h-11 w-11 text-white/80" />
        <div className="absolute top-3 left-3"><Badge variant="muted">{course.level}</Badge></div>
        {course.progress === 100 && <div className="absolute top-3 right-3 bg-emerald-500 rounded-full p-1"><CheckCircle className="h-3.5 w-3.5 text-white" /></div>}
        {course.enrolled && course.progress > 0 && course.progress < 100 && <div className="absolute bottom-0 inset-x-0 h-1 bg-black/20"><div className="h-full bg-white/80" style={{ width: `${course.progress}%` }} /></div>}
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
              {course.progress === 100 ? <span className="text-xs text-emerald-500 font-medium">✓ Completed</span> : <><p className="text-xs text-muted-foreground mb-1">{course.progress}% complete</p><Bar value={course.progress} /></>}
            </div>
          ) : (
            <><span className="font-bold text-foreground text-sm">${course.price}</span><button className="text-xs font-semibold bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity">Enroll</button></>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyStateView({ Icon: EIcon, title, desc, action, actionLabel }: { Icon: ElementType; title: string; desc: string; action?: () => void; actionLabel?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mb-4">
        <EIcon className="h-8 w-8 text-muted-foreground/50" />
      </div>
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-4">{desc}</p>
      {action && <button onClick={action} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity">{actionLabel}</button>}
    </div>
  );
}

function ConfirmDialog({ open, title, desc, onConfirm, onCancel, danger }: { open: boolean; title: string; desc: string; onConfirm: () => void; onCancel: () => void; danger?: boolean }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <h3 className="font-bold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-5">{desc}</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 border border-border rounded-xl py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">Cancel</button>
          <button onClick={onConfirm} className={`flex-1 rounded-xl py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 ${danger ? "bg-rose-500" : "bg-primary"}`}>Confirm</button>
        </div>
      </motion.div>
    </div>
  );
}

function FormField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-foreground mb-1.5">{label}</label>
      {children}
    </div>
  );
}

function Input({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0" />;
}

function Select({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0 appearance-none">{children}</select>;
}

function Textarea({ ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/35 border-0 resize-none" />;
}

function PrimaryBtn({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return <button onClick={onClick} className={`bg-primary text-primary-foreground font-semibold px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm shadow-md shadow-primary/25 ${className}`}>{children}</button>;
}

// ── Sidebar groups ──────────────────────────────────────────────────

const SIDEBAR_GROUPS: { id: string; label: string; items: { id: Page; label: string; Icon: ElementType }[] }[] = [
  {
    id: "public", label: "Public Site", items: [
      { id: "home", label: "Home", Icon: Home },
      { id: "courses", label: "Courses", Icon: BookOpen },
      { id: "course-detail", label: "Course Detail", Icon: BookOpen },
      { id: "about", label: "About", Icon: Globe },
      { id: "verify-cert", label: "Verify Certificate", Icon: ShieldCheck },
      { id: "not-found", label: "404 Page", Icon: AlertCircle },
    ],
  },
  {
    id: "auth", label: "Auth", items: [
      { id: "login", label: "Login", Icon: LogIn },
      { id: "register", label: "Register", Icon: UserPlus },
      { id: "forgot-password", label: "Forgot Password", Icon: Key },
      { id: "reset-password", label: "Reset Password", Icon: Lock },
      { id: "verify-email", label: "Verify Email", Icon: Mail },
    ],
  },
  {
    id: "user", label: "User Area", items: [
      { id: "profile", label: "Profile Hub", Icon: GraduationCap },
      { id: "my-courses", label: "My Courses", Icon: BookOpen },
      { id: "saved", label: "Saved", Icon: Bookmark },
      { id: "user-certs", label: "Certificates", Icon: Award },
      { id: "user-reports", label: "Reports", Icon: Flag },
      { id: "user-roadmap", label: "AI Roadmap", Icon: Map },
      { id: "roadmap-detail", label: "Roadmap Detail", Icon: GitBranch },
    ],
  },
  {
    id: "learning", label: "Learning", items: [
      { id: "player", label: "Course Player", Icon: Play },
      { id: "final-test", label: "Final Test", Icon: ClipboardList },
    ],
  },
  {
    id: "admin", label: "Admin", items: [
      { id: "admin", label: "Dashboard", Icon: LayoutDashboard },
      { id: "admin-users", label: "Users", Icon: Users },
      { id: "admin-courses", label: "Courses", Icon: BookOpen },
      { id: "admin-new-course", label: "New Course", Icon: Plus },
      { id: "admin-course-editor", label: "Course Editor", Icon: PenLine },
      { id: "admin-enrollments", label: "Enrollments", Icon: UserCheck },
      { id: "admin-reports", label: "Reports", Icon: Flag },
      { id: "admin-analytics", label: "Analytics", Icon: BarChart2 },
      { id: "admin-certs", label: "Certificates", Icon: Award },
      { id: "admin-register", label: "Register Staff", Icon: UserPlus },
    ],
  },
  {
    id: "special", label: "Components", items: [
      { id: "generating", label: "AI Generating", Icon: Sparkles },
      { id: "empty-states", label: "Empty States", Icon: Inbox },
    ],
  },
];

function Sidebar({ page, setPage, theme, toggleTheme }: { page: Page; setPage: (p: Page) => void; theme: Theme; toggleTheme: () => void }) {
  const [open, setOpen] = useState<Record<string, boolean>>({ public: true, auth: false, user: true, learning: true, admin: true, special: false });
  const toggle = (id: string) => setOpen(p => ({ ...p, [id]: !p[id] }));

  return (
    <aside className="w-60 flex-shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      <div className="px-5 py-[18px] border-b border-sidebar-border flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
            <Zap className="h-4 w-4 text-white" />
          </div>
          <span className="font-extrabold text-[17px] text-sidebar-foreground tracking-tight">LearnPath</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
        {SIDEBAR_GROUPS.map(group => (
          <div key={group.id}>
            <button onClick={() => toggle(group.id)} className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] uppercase tracking-widest font-semibold text-muted-foreground/70 hover:text-muted-foreground transition-colors">
              {group.label}
              <ChevronDown className={`h-3 w-3 transition-transform ${open[group.id] ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open[group.id] && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                  <div className="space-y-0.5 pb-2">
                    {group.items.map(({ id, label, Icon: NavIcon }) => {
                      const active = page === id;
                      return (
                        <button key={id} onClick={() => setPage(id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 ${active ? "bg-primary text-primary-foreground shadow-md shadow-primary/30" : "text-sidebar-foreground hover:bg-sidebar-accent"}`}>
                          <NavIcon className="h-3.5 w-3.5 flex-shrink-0" />
                          <span className="truncate text-xs">{label}</span>
                          {active && <ChevronRight className="h-3 w-3 ml-auto flex-shrink-0 opacity-70" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-sidebar-border flex-shrink-0 space-y-1">
        <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-all">
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
        <div className="flex items-center gap-3 px-3 py-2">
          <Avi initials="AC" size="sm" gradient />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-sidebar-foreground truncate">Alex Chen</p>
            <p className="text-[10px] text-muted-foreground truncate">alex@learnpath.io</p>
          </div>
          <Settings className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
        </div>
      </div>
    </aside>
  );
}

function Topbar() {
  return (
    <header className="h-14 border-b border-border flex items-center justify-between px-6 bg-background/80 backdrop-blur-md flex-shrink-0 sticky top-0 z-10">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input placeholder="Search anything..." className="bg-muted rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-52 border-0" />
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

// ══════════════════════════════════════════════════════════════════
// ── PUBLIC PAGES ──────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function HomePage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="space-y-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-accent p-10">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-black/15 blur-3xl pointer-events-none" />
        <div className="relative max-w-lg">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5 text-white text-xs font-medium mb-5">
            <Zap className="h-3 w-3 text-amber-300" /> New: AI-powered learning roadmaps
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-[2.6rem] font-extrabold text-white leading-[1.15] mb-4">
            Master the skills<br />that shape the future
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-white/75 text-[15px] mb-7 max-w-sm leading-relaxed">
            Structured learning paths, expert instructors, and a community that pushes you forward.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex gap-3">
            <button onClick={() => setPage("courses")} className="bg-white text-primary font-semibold px-5 py-2.5 rounded-xl hover:bg-white/90 transition-colors text-sm flex items-center gap-2 shadow-lg">
              Explore Courses <ArrowRight className="h-4 w-4" />
            </button>
            <button onClick={() => setPage("user-roadmap")} className="bg-white/15 backdrop-blur-sm border border-white/25 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-white/25 transition-colors text-sm">
              View Roadmap
            </button>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[
          { v: "180k+", l: "Active Students", I: Users, c: "from-indigo-500 to-violet-600" },
          { v: "340+", l: "Expert Courses", I: BookOpen, c: "from-cyan-500 to-blue-500" },
          { v: "4.8★", l: "Average Rating", I: Star, c: "from-amber-400 to-orange-500" },
          { v: "52k+", l: "Certificates Issued", I: Award, c: "from-emerald-500 to-teal-600" },
        ].map(({ v, l, I, c }, i) => (
          <motion.div key={l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}
            className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/5 transition-all">
            <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${c} flex items-center justify-center mx-auto mb-3 shadow-md`}><I className="h-4 w-4 text-white" /></div>
            <p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{l}</p>
          </motion.div>
        ))}
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-foreground">Featured Courses</h2>
          <button onClick={() => setPage("courses")} className="text-sm text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">View all <ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {COURSES.slice(0, 3).map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.07 }}>
              <CourseCard course={c} onClick={() => setPage("course-detail")} />
            </motion.div>
          ))}
        </div>
      </div>

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
                <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center"><I className="h-4 w-4 text-primary" /></div>
              </div>
              <h3 className="font-semibold text-foreground mb-1 text-sm">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div>
        <h2 className="text-lg font-bold text-foreground mb-4">What learners say</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { q: "Went from junior to senior in 8 months. The structured paths are gold.", name: "Marcus Kim", role: "Sr. Engineer @ Stripe", initials: "MK" },
            { q: "The AI roadmap feature saved me months of figuring out what to learn next.", name: "Priya Sharma", role: "ML Engineer @ Google", initials: "PS" },
            { q: "Best investment I made in my career. The instructors genuinely care.", name: "Emma Rodriguez", role: "Frontend Dev @ Shopify", initials: "ER" },
          ].map(t => (
            <div key={t.name} className="bg-card border border-border rounded-2xl p-5">
              <p className="text-sm text-muted-foreground italic mb-4 leading-relaxed">"{t.q}"</p>
              <div className="flex items-center gap-2.5">
                <Avi initials={t.initials} size="sm" />
                <div><p className="text-sm font-semibold text-foreground">{t.name}</p><p className="text-xs text-muted-foreground">{t.role}</p></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CoursesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [cat, setCat] = useState("All");
  const [lvl, setLvl] = useState("All");
  const [sort, setSort] = useState("Popular");
  const cats = ["All", "Frontend", "Architecture", "AI/ML", "DevOps", "Tools"];
  const lvls = ["All", "Beginner", "Intermediate", "Advanced"];
  const filtered = COURSES.filter(c => (cat === "All" || c.category === cat) && (lvl === "All" || c.level === lvl));

  return (
    <div>
      <div className="flex items-start justify-between mb-7">
        <div><h1 className="text-2xl font-bold text-foreground">Course Catalog</h1><p className="text-muted-foreground mt-1 text-sm">Learn from the best. Advance your career.</p></div>
        <div className="flex items-center gap-2">
          <Select value={sort} onChange={e => setSort(e.target.value)} style={{ width: 160 }}>
            {["Popular", "Newest", "Highest rated", "Price: Low", "Price: High"].map(s => <option key={s}>{s}</option>)}
          </Select>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input placeholder="Search..." className="bg-muted border-0 rounded-xl pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-44" />
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        {cats.map(c => <button key={c} onClick={() => setCat(c)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${cat === c ? "bg-primary text-primary-foreground shadow-sm shadow-primary/30" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>{c}</button>)}
        <span className="w-px h-5 bg-border mx-1" />
        {lvls.map(l => <button key={l} onClick={() => setLvl(l)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${lvl === l ? "bg-accent/20 text-accent border border-accent/40" : "bg-muted text-muted-foreground hover:bg-accent/10 hover:text-accent"}`}>{l}</button>)}
      </div>
      <p className="text-xs text-muted-foreground mb-5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{filtered.length} course{filtered.length !== 1 ? "s" : ""} found</p>
      <div className="grid grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((c, i) => (
            <motion.div key={c.id} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1, transition: { delay: i * 0.05 } }} exit={{ opacity: 0, scale: 0.96 }}>
              <CourseCard course={c} onClick={() => setPage("course-detail")} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 mt-8">
        {[1, 2, 3, "...", 12].map((p, i) => (
          <button key={i} className={`h-8 w-8 rounded-lg text-xs font-medium transition-all ${p === 1 ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10"}`}>{p}</button>
        ))}
      </div>
    </div>
  );
}

function CourseDetailPage({ setPage }: { setPage: (p: Page) => void }) {
  const [expandedModule, setExpandedModule] = useState<number | null>(0);
  const course = COURSES[0];
  const { Icon } = course;

  return (
    <div>
      {/* Hero */}
      <div className={`rounded-3xl bg-gradient-to-br ${course.gradient} p-8 mb-6 relative overflow-hidden`}>
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 relative">
            <Badge variant="muted">{course.category} · {course.level}</Badge>
            <h1 className="text-2xl font-extrabold text-white mt-2 mb-2">{course.title}</h1>
            <p className="text-white/70 text-sm mb-4">Build reusable, scalable React applications using advanced patterns favored by senior engineers.</p>
            <div className="flex items-center gap-4 text-white/80 text-sm">
              <Stars rating={course.rating} />
              <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{course.students.toLocaleString()} students</span>
              <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{course.duration}</span>
            </div>
            <p className="text-white/60 text-xs mt-3">Instructor: <span className="text-white font-medium">{course.instructor}</span></p>
          </div>
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 rounded-2xl bg-white/15 flex items-center justify-center"><Icon className="h-12 w-12 text-white" /></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main */}
        <div className="col-span-2 space-y-6">
          {/* Outcomes */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-4">What you&apos;ll learn</h2>
            <div className="grid grid-cols-2 gap-2">
              {["Compound Component pattern", "Render Props & HOCs", "Custom hooks for logic reuse", "Context + Reducer architecture", "React.memo & useMemo", "Code-splitting with lazy()", "Accessibility best practices", "Testing complex components"].map(o => (
                <div key={o} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-emerald-500 flex-shrink-0 mt-0.5" /><span className="text-sm text-foreground">{o}</span></div>
              ))}
            </div>
          </div>

          {/* Curriculum */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-border"><h2 className="font-bold text-foreground">Curriculum</h2><p className="text-xs text-muted-foreground mt-0.5">3 modules · 10 lessons · 3h 30m total</p></div>
            {CURRICULUM.map((mod, mi) => (
              <div key={mi} className="border-b border-border/50 last:border-0">
                <button onClick={() => setExpandedModule(expandedModule === mi ? null : mi)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-muted/30 transition-colors">
                  <span className="font-medium text-foreground text-sm">{mod.module}</span>
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedModule === mi ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence initial={false}>
                  {expandedModule === mi && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      {mod.lessons.map((l, li) => (
                        <div key={li} className="flex items-center gap-3 px-5 py-2.5 border-t border-border/30 bg-muted/20">
                          <div className={`h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 ${l.isQuiz || l.isTest ? "bg-amber-500/10" : "bg-primary/10"}`}>
                            {l.isQuiz ? <ClipboardList className="h-3 w-3 text-amber-500" /> : l.isTest ? <Award className="h-3 w-3 text-amber-500" /> : <Play className="h-3 w-3 text-primary" />}
                          </div>
                          <span className="text-sm text-foreground flex-1">{l.title}</span>
                          {!l.free && <Lock className="h-3.5 w-3.5 text-muted-foreground" />}
                          <span className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{l.duration}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-4">Reviews <span className="text-muted-foreground font-normal text-sm">(4.9 · 2,341 ratings)</span></h2>
            {[{ n: "Marcus Kim", i: "MK", r: 5, t: "Best React course I've taken. The pattern explanations are crystal clear.", d: "Aug 12, 2025" }, { n: "Priya Sharma", i: "PS", r: 5, t: "Sarah's teaching style is excellent. The code examples are practical and real-world.", d: "Jul 30, 2025" }].map(rev => (
              <div key={rev.n} className="flex gap-3 mb-4 last:mb-0 pb-4 last:pb-0 border-b border-border/50 last:border-0">
                <Avi initials={rev.i} size="sm" />
                <div className="flex-1"><div className="flex items-center justify-between mb-1"><span className="text-sm font-semibold text-foreground">{rev.n}</span><span className="text-xs text-muted-foreground">{rev.d}</span></div><Stars rating={rev.r} /><p className="text-sm text-muted-foreground mt-1.5">{rev.t}</p></div>
              </div>
            ))}
          </div>
        </div>

        {/* Price card */}
        <div>
          <div className="bg-card border border-border rounded-2xl p-5 sticky top-20">
            <p className="text-3xl font-extrabold text-foreground mb-1">${course.price}</p>
            <p className="text-xs text-muted-foreground line-through mb-4">$199 · 55% off</p>
            <button onClick={() => setPage("player")} className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity mb-3 shadow-lg shadow-primary/25">
              Enroll Now — ${course.price}
            </button>
            <button className="w-full border border-border text-foreground font-medium py-2.5 rounded-xl hover:bg-muted transition-colors text-sm mb-4">Try Free Preview</button>
            <div className="space-y-2 text-sm">
              {[["Clock", "24h 30m video"], ["Award", "Certificate of completion"], ["Globe", "Lifetime access"], ["Users", "Community Discord"]].map(([ic, t]) => (
                <div key={t} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-emerald-500" />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="text-center py-12 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl" />
        <div className="relative">
          <Badge variant="primary">Our mission</Badge>
          <h1 className="text-4xl font-extrabold text-foreground mt-4 mb-4 leading-tight">Making world-class tech<br />education accessible to all</h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">LearnPath was built by engineers who believe that where you start shouldn't determine where you end up. We build structured paths, not just courses.</p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {[{ v: "2019", l: "Founded" }, { v: "180k+", l: "Learners" }, { v: "42", l: "Countries" }, { v: "93%", l: "Completion rate" }].map(({ v, l }) => (
          <div key={l} className="bg-card border border-border rounded-2xl p-5 text-center">
            <p className="text-3xl font-extrabold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p>
            <p className="text-sm text-muted-foreground mt-1">{l}</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-6 text-center">Meet the team</h2>
        <div className="grid grid-cols-4 gap-4">
          {TEAM.map(m => (
            <div key={m.name} className="bg-card border border-border rounded-2xl p-5 text-center hover:shadow-lg hover:shadow-primary/5 transition-all">
              <Avi initials={m.initials} size="lg" gradient />
              <div className="mt-1">
                <p className="font-semibold text-foreground text-sm mt-3">{m.name}</p>
                <p className="text-xs text-primary mb-2">{m.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Our values</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { title: "Outcomes over content", desc: "We don't just create videos — we design paths that end in real skills and real jobs.", I: Target, c: "from-indigo-500 to-violet-600" },
            { title: "Radical transparency", desc: "Course quality scores, instructor ratings, and completion data are all public.", I: ShieldCheck, c: "from-cyan-500 to-blue-500" },
            { title: "Community first", desc: "Every learner is also a teacher. Peer reviews and cohorts are built into every path.", I: Users, c: "from-emerald-500 to-teal-600" },
          ].map(({ title, desc, I, c }) => (
            <div key={title} className="bg-card border border-border rounded-2xl p-5">
              <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c} flex items-center justify-center mb-3`}><I className="h-5 w-5 text-white" /></div>
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function VerifyCertPage() {
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState<"valid" | "invalid" | null>(null);

  const verify = () => setResult(certId.toUpperCase().startsWith("LP-") ? "valid" : "invalid");

  return (
    <div className="max-w-md mx-auto pt-12">
      <div className="text-center mb-8">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><ShieldCheck className="h-8 w-8 text-primary" /></div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Verify a Certificate</h1>
        <p className="text-muted-foreground text-sm">Enter the certificate ID to confirm its authenticity.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl p-6">
        <FormField label="Certificate ID">
          <div className="flex gap-2">
            <Input value={certId} onChange={e => setCertId(e.target.value)} placeholder="LP-2025-XXXX" onKeyDown={e => e.key === "Enter" && verify()} />
            <PrimaryBtn onClick={verify}>Verify</PrimaryBtn>
          </div>
        </FormField>

        <AnimatePresence>
          {result && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className={`mt-4 p-4 rounded-xl border ${result === "valid" ? "bg-emerald-500/10 border-emerald-500/20" : "bg-rose-500/10 border-rose-500/20"}`}>
              {result === "valid" ? (
                <div>
                  <div className="flex items-center gap-2 mb-3"><CheckCircle className="h-5 w-5 text-emerald-500" /><p className="font-semibold text-emerald-500">Certificate is valid</p></div>
                  <div className="space-y-1 text-sm">
                    <p className="text-foreground font-medium">Git & GitHub Mastery</p>
                    <p className="text-muted-foreground">Awarded to: <span className="text-foreground">Alex Chen</span></p>
                    <p className="text-muted-foreground">Completed: <span className="text-foreground font-mono">Jul 28, 2025</span></p>
                    <p className="text-muted-foreground">Issued by: <span className="text-foreground">Yuki Tanaka</span></p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2"><AlertCircle className="h-5 w-5 text-rose-500" /><p className="font-semibold text-rose-500">Certificate not found</p></div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-xs text-muted-foreground mt-4 text-center">Certificate IDs follow the format <span className="font-mono text-primary">LP-YYYY-XXXX</span></p>
      </div>
    </div>
  );
}

function NotFoundPage({ setPage }: { setPage: (p: Page) => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <motion.div animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} className="text-8xl mb-6">📚</motion.div>
      <h1 className="text-8xl font-black text-foreground/10 mb-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>404</h1>
      <h2 className="text-2xl font-bold text-foreground mb-3">Page not found</h2>
      <p className="text-muted-foreground mb-8 max-w-sm">The page you&apos;re looking for doesn&apos;t exist or was moved. Let&apos;s get you back on track.</p>
      <div className="flex gap-3">
        <button onClick={() => setPage("home")} className="bg-primary text-primary-foreground font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm">Back to Home</button>
        <button onClick={() => setPage("courses")} className="border border-border text-foreground font-medium px-5 py-2.5 rounded-xl hover:bg-muted transition-colors text-sm">Explore Courses</button>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ── AUTH PAGES ────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function AuthLayout({ children, quote, quoteName, quoteRole, quoteInitials }: { children: ReactNode; quote: string; quoteName: string; quoteRole: string; quoteInitials: string }) {
  return (
    <div className="grid grid-cols-2 rounded-2xl border border-border overflow-hidden shadow-2xl" style={{ minHeight: 560 }}>
      <div className="relative bg-gradient-to-br from-primary via-violet-600 to-accent flex flex-col justify-between p-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-white/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full bg-black/15 blur-3xl pointer-events-none" />
        <div className="relative flex items-center gap-2.5"><div className="h-10 w-10 rounded-xl bg-white/20 flex items-center justify-center"><Zap className="h-5 w-5 text-white" /></div><span className="font-extrabold text-xl text-white">LearnPath</span></div>
        <div className="relative space-y-5">
          <div><h2 className="text-3xl font-extrabold text-white leading-tight">Your learning<br />journey starts here</h2></div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4">
            <p className="text-white/85 text-sm italic mb-3">"{quote}"</p>
            <div className="flex items-center gap-2.5"><Avi initials={quoteInitials} size="sm" /><div><p className="text-white text-xs font-semibold">{quoteName}</p><p className="text-white/60 text-xs">{quoteRole}</p></div></div>
          </div>
        </div>
        <div className="relative flex gap-8">
          {[{ v: "180k+", l: "Students" }, { v: "340+", l: "Courses" }, { v: "4.8★", l: "Rating" }].map(({ v, l }) => (
            <div key={l}><p className="text-white font-bold text-lg" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p><p className="text-white/55 text-xs">{l}</p></div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center bg-background p-10">{children}</div>
    </div>
  );
}

function LoginPage({ setPage }: { setPage: (p: Page) => void }) {
  const [showPw, setShowPw] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  return (
    <AuthLayout quote="LearnPath helped me go from junior to senior in 8 months." quoteName="Marcus Kim" quoteRole="Sr. Engineer @ Stripe" quoteInitials="MK">
      <div className="w-full max-w-sm">
        <div className="mb-7"><h2 className="text-2xl font-bold text-foreground">{isLogin ? "Welcome back" : "Create an account"}</h2><p className="text-muted-foreground text-sm mt-1.5">{isLogin ? "Sign in to continue your learning journey." : "Start learning for free today."}</p></div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {["Google", "GitHub"].map(p => <button key={p} className="flex items-center justify-center gap-2 border border-border bg-card rounded-xl py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"><span className={`font-bold ${p === "Google" ? "text-red-500" : ""}`}>{p[0]}</span>{p}</button>)}
        </div>
        <div className="flex items-center gap-3 mb-5"><div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">or email</span><div className="flex-1 h-px bg-border" /></div>
        <div className="space-y-4">
          {!isLogin && <FormField label="Full Name"><Input type="text" placeholder="Alex Chen" /></FormField>}
          <FormField label="Email"><div className="relative"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><Input type="email" placeholder="alex@company.com" style={{ paddingLeft: 40 }} /></div></FormField>
          <div>
            <div className="flex items-center justify-between mb-1.5"><label className="text-xs font-semibold text-foreground">Password</label>{isLogin && <button className="text-xs text-primary hover:underline" onClick={() => setPage("forgot-password")}>Forgot?</button>}</div>
            <div className="relative"><Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" /><Input type={showPw ? "text" : "password"} placeholder="••••••••" style={{ paddingLeft: 40, paddingRight: 40 }} /><button onClick={() => setShowPw(!showPw)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">{showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div>
          </div>
          <button onClick={() => setPage("profile")} className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/30">{isLogin ? "Sign In" : "Create Account"} <ArrowRight className="h-4 w-4" /></button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-5">{isLogin ? "No account?" : "Have an account?"}{" "}<button onClick={() => setIsLogin(!isLogin)} className="text-primary font-semibold hover:underline">{isLogin ? "Sign up free" : "Sign in"}</button></p>
      </div>
    </AuthLayout>
  );
}

function RegisterPage({ setPage }: { setPage: (p: Page) => void }) {
  const [pw, setPw] = useState("");
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];

  return (
    <AuthLayout quote="Creating my account took 30 seconds. Building a career took 6 months." quoteName="Emma Rodriguez" quoteRole="Frontend Dev @ Shopify" quoteInitials="ER">
      <div className="w-full max-w-sm">
        <div className="mb-6"><h2 className="text-2xl font-bold text-foreground">Create your account</h2><p className="text-muted-foreground text-sm mt-1">Start learning for free. No credit card required.</p></div>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <FormField label="First name"><Input type="text" placeholder="Alex" /></FormField>
            <FormField label="Last name"><Input type="text" placeholder="Chen" /></FormField>
          </div>
          <FormField label="Username"><Input type="text" placeholder="alex_chen" /></FormField>
          <FormField label="Email"><Input type="email" placeholder="alex@company.com" /></FormField>
          <div>
            <FormField label="Password"><Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters" /></FormField>
            {pw.length > 0 && (
              <div className="mt-2">
                <div className="flex gap-1 mb-1">{[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : "bg-muted"}`} />)}</div>
                <p className={`text-xs ${strength <= 1 ? "text-rose-500" : strength <= 2 ? "text-amber-500" : strength === 3 ? "text-blue-500" : "text-emerald-500"}`}>{strengthLabel[strength]}</p>
              </div>
            )}
          </div>
          <button onClick={() => setPage("verify-email")} className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/30">Create Account <ArrowRight className="h-4 w-4" /></button>
          <p className="text-xs text-muted-foreground text-center">By creating an account you agree to our <span className="text-primary cursor-pointer hover:underline">Terms</span> and <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.</p>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-5">Already have an account? <button onClick={() => setPage("login")} className="text-primary font-semibold hover:underline">Sign in</button></p>
      </div>
    </AuthLayout>
  );
}

function ForgotPasswordPage({ setPage }: { setPage: (p: Page) => void }) {
  const [sent, setSent] = useState(false);
  return (
    <div className="max-w-sm mx-auto pt-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">{sent ? <CheckCircle className="h-8 w-8 text-emerald-500" /> : <Key className="h-8 w-8 text-primary" />}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{sent ? "Check your inbox" : "Forgot password?"}</h2>
      <p className="text-muted-foreground text-sm mb-6">{sent ? "We sent a reset link to alex@company.com. It expires in 15 minutes." : "Enter your email and we'll send a reset link."}</p>
      {!sent ? (
        <div className="bg-card border border-border rounded-2xl p-5 text-left space-y-4">
          <FormField label="Email"><Input type="email" placeholder="alex@company.com" /></FormField>
          <button onClick={() => setSent(true)} className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-primary/30">Send Reset Link <Send className="h-4 w-4" /></button>
        </div>
      ) : (
        <div className="space-y-3">
          <button className="w-full border border-border text-foreground font-medium py-2.5 rounded-xl hover:bg-muted transition-colors text-sm flex items-center justify-center gap-2"><RefreshCw className="h-4 w-4" /> Resend in 60s</button>
          <button onClick={() => setPage("login")} className="w-full text-primary text-sm font-medium hover:underline">Back to login</button>
        </div>
      )}
    </div>
  );
}

function ResetPasswordPage({ setPage }: { setPage: (p: Page) => void }) {
  const [pw, setPw] = useState("");
  const strength = pw.length === 0 ? 0 : pw.length < 6 ? 1 : pw.length < 10 ? 2 : /[A-Z]/.test(pw) && /[0-9]/.test(pw) ? 4 : 3;
  const strengthColor = ["", "bg-rose-500", "bg-amber-500", "bg-blue-500", "bg-emerald-500"];

  return (
    <div className="max-w-sm mx-auto pt-16">
      <div className="text-center mb-6">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Lock className="h-8 w-8 text-primary" /></div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Set new password</h2>
        <p className="text-muted-foreground text-sm">Your new password must be different from your previous one.</p>
      </div>
      <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
        <div>
          <FormField label="New password"><Input type="password" value={pw} onChange={e => setPw(e.target.value)} placeholder="Min. 8 characters" /></FormField>
          {pw.length > 0 && <div className="flex gap-1 mt-2">{[1,2,3,4].map(i => <div key={i} className={`h-1 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : "bg-muted"}`} />)}</div>}
        </div>
        <FormField label="Confirm password"><Input type="password" placeholder="Repeat password" /></FormField>
        <button onClick={() => setPage("login")} className="w-full bg-gradient-to-r from-primary to-violet-600 text-white font-semibold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/30">Reset Password</button>
      </div>
    </div>
  );
}

function VerifyEmailPage({ setPage }: { setPage: (p: Page) => void }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const filled = otp.every(v => v !== "");

  return (
    <div className="max-w-sm mx-auto pt-16 text-center">
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4"><Mail className="h-8 w-8 text-primary" /></div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Verify your email</h2>
      <p className="text-muted-foreground text-sm mb-6">We sent a 6-digit code to <strong className="text-foreground">alex@company.com</strong></p>
      <div className="bg-card border border-border rounded-2xl p-6 space-y-5">
        <div className="flex gap-2 justify-center">
          {otp.map((v, i) => (
            <input key={i} maxLength={1} value={v} onChange={e => { const n = [...otp]; n[i] = e.target.value; setOtp(n); }} className="h-12 w-10 text-center text-lg font-bold bg-muted rounded-xl border-2 border-transparent focus:border-primary focus:outline-none text-foreground transition-colors" />
          ))}
        </div>
        <button onClick={() => setPage("profile")} className={`w-full font-semibold py-3 rounded-xl transition-opacity text-sm ${filled ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/30 hover:opacity-90" : "bg-muted text-muted-foreground cursor-not-allowed"}`}>
          {filled ? "Verify & Continue" : "Enter the code above"}
        </button>
        <p className="text-xs text-muted-foreground">Didn&apos;t receive it? <button className="text-primary font-medium hover:underline">Resend code</button></p>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ── USER AREA ─────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function ProfilePage({ setPage }: { setPage: (p: Page) => void }) {
  const [twoFA, setTwoFA] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Profile Hub</h1><p className="text-muted-foreground mt-1 text-sm">Manage your account, security, and learning stats.</p></div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left: edit form */}
        <div className="col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-4 text-sm">Profile Information</h2>
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <Avi initials="AC" size="lg" gradient />
                <button className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-md"><UploadCloud className="h-3 w-3 text-white" /></button>
              </div>
              <div><p className="font-semibold text-foreground">Alex Chen</p><p className="text-xs text-muted-foreground">Level 12 · Developer</p></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="First name"><Input defaultValue="Alex" /></FormField>
              <FormField label="Last name"><Input defaultValue="Chen" /></FormField>
              <FormField label="Username"><Input defaultValue="alex_chen" /></FormField>
              <FormField label="Email"><Input defaultValue="alex@learnpath.io" type="email" /></FormField>
            </div>
            <div className="mt-4 pt-4 border-t border-border flex justify-end"><PrimaryBtn>Save Changes</PrimaryBtn></div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground mb-4 text-sm">Security</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
                <div><p className="text-sm font-medium text-foreground">Two-Factor Authentication</p><p className="text-xs text-muted-foreground">Add an extra layer of security to your account.</p></div>
                <button onClick={() => setTwoFA(!twoFA)} className={`h-6 w-11 rounded-full transition-colors relative ${twoFA ? "bg-primary" : "bg-muted"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${twoFA ? "left-[22px]" : "left-0.5"}`} /></button>
              </div>
              <FormField label="Current password"><Input type="password" placeholder="••••••••" /></FormField>
              <FormField label="New password"><Input type="password" placeholder="••••••••" /></FormField>
              <div className="flex justify-end"><PrimaryBtn>Update Password</PrimaryBtn></div>
            </div>
          </div>
        </div>

        {/* Right: stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-primary via-violet-600 to-accent rounded-2xl p-5 text-white">
            <div className="flex items-center justify-between mb-2"><p className="text-xs font-medium text-white/70">Level 12 · Developer</p><Trophy className="h-5 w-5 text-amber-300" /></div>
            <p className="text-3xl font-extrabold mb-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>4,200 XP</p>
            <p className="text-[11px] text-white/55 mb-3">800 XP to Level 13</p>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "84%" }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-white rounded-full" /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ v: "8", l: "Completed", I: CheckCircle, c: "text-emerald-500" }, { v: "5", l: "Certificates", I: Award, c: "text-amber-500" }, { v: "124h", l: "Learned", I: Clock, c: "text-primary" }, { v: "14🔥", l: "Day Streak", I: Flame, c: "text-orange-500" }].map(({ v, l, I, c }) => (
              <div key={l} className="bg-card border border-border rounded-xl p-3 text-center">
                <I className={`h-4 w-4 ${c} mx-auto mb-1`} />
                <p className="font-bold text-foreground text-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</p>
                <p className="text-[10px] text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <h3 className="font-semibold text-foreground text-sm mb-3">Continue Learning</h3>
            {COURSES.filter(c => c.enrolled && c.progress > 0 && c.progress < 100).slice(0, 2).map(c => {
              const { Icon } = c;
              return (
                <div key={c.id} onClick={() => setPage("player")} className="flex items-center gap-3 py-2 cursor-pointer hover:opacity-80 transition-opacity">
                  <div className={`h-8 w-8 rounded-lg bg-gradient-to-br ${c.gradient} flex-shrink-0 flex items-center justify-center`}><Icon className="h-4 w-4 text-white" /></div>
                  <div className="flex-1 min-w-0"><p className="text-xs font-medium text-foreground truncate">{c.title}</p><Bar value={c.progress} className="mt-1" /></div>
                  <span className="text-xs font-mono text-muted-foreground">{c.progress}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function MyCoursesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [tab, setTab] = useState<"All" | "In Progress" | "Completed">("All");
  const tabs = ["All", "In Progress", "Completed"] as const;
  const filtered = tab === "All" ? COURSES.filter(c => c.enrolled) : tab === "In Progress" ? COURSES.filter(c => c.enrolled && c.progress > 0 && c.progress < 100) : COURSES.filter(c => c.progress === 100);

  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-foreground">My Courses</h1><p className="text-muted-foreground mt-1 text-sm">Track your enrolled courses and continue learning.</p></div>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" /><input placeholder="Search my courses..." className="bg-muted border-0 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-52" /></div>
      </div>
      <div className="flex gap-1 mb-6 bg-muted p-1 rounded-xl w-fit">
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>)}
      </div>
      {filtered.length === 0 ? (
        <EmptyStateView Icon={BookOpen} title="No courses here yet" desc="Enroll in a course to start your learning journey." action={() => setPage("courses")} actionLabel="Browse Courses" />
      ) : (
        <div className="space-y-3">
          {filtered.map(course => {
            const { Icon } = course;
            return (
              <div key={course.id} onClick={() => setPage("player")} className="bg-card border border-border rounded-2xl p-4 flex items-center gap-4 hover:shadow-lg hover:shadow-primary/5 cursor-pointer group transition-all hover:border-primary/30">
                <div className={`h-14 w-14 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}><Icon className="h-7 w-7 text-white" /></div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5"><p className="font-semibold text-foreground">{course.title}</p><StatusBadge status={course.progress === 100 ? "completed" : "active"} /></div>
                  <p className="text-xs text-muted-foreground mb-2">{course.instructor} · {course.duration}</p>
                  <Bar value={course.progress} />
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <p className="font-bold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{course.progress}%</p>
                  <button className="mt-2 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">Continue <ArrowRight className="h-3 w-3" /></button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SavedPage({ setPage }: { setPage: (p: Page) => void }) {
  const [saved, setSaved] = useState(COURSES.filter(c => !c.enrolled));
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-foreground">Saved Courses</h1><p className="text-muted-foreground mt-1 text-sm">Your wishlist — courses you want to take.</p></div>
        <Badge variant="muted">{saved.length} saved</Badge>
      </div>
      {saved.length === 0 ? (
        <EmptyStateView Icon={Bookmark} title="No saved courses" desc="Browse the catalog and bookmark courses you want to take later." action={() => setPage("courses")} actionLabel="Browse Catalog" />
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {saved.map(c => {
            const { Icon } = c;
            return (
              <div key={c.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-primary/8 transition-shadow">
                <div className={`h-32 bg-gradient-to-br ${c.gradient} flex items-center justify-center relative`}><Icon className="h-11 w-11 text-white/80" />
                  <button onClick={() => setSaved(p => p.filter(s => s.id !== c.id))} className="absolute top-2 right-2 h-7 w-7 bg-black/30 hover:bg-black/50 rounded-full flex items-center justify-center transition-colors"><X className="h-3.5 w-3.5 text-white" /></button>
                </div>
                <div className="p-4">
                  <p className="text-xs text-primary font-medium mb-1">{c.category}</p>
                  <h3 className="font-semibold text-foreground text-sm mb-1">{c.title}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{c.instructor}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-foreground">${c.price}</span>
                    <button onClick={() => setPage("course-detail")} className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity font-semibold">Enroll</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function UserCertsPage() {
  return (
    <div>
      <div className="flex items-start justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-foreground">My Certificates</h1><p className="text-muted-foreground mt-1 text-sm">Your earned credentials — view, download, or verify.</p></div>
        <Badge variant="warning">{CERTS.length} earned</Badge>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {CERTS.map(cert => (
          <div key={cert.id} className="bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-amber-500/5 transition-all">
            <div className="bg-gradient-to-br from-amber-400/20 to-orange-400/20 border-b border-border p-5 flex items-center gap-4">
              <div className="h-14 w-14 rounded-2xl bg-amber-400/20 flex items-center justify-center"><Award className="h-7 w-7 text-amber-500" /></div>
              <div><p className="font-bold text-foreground">{cert.title}</p><p className="text-xs text-muted-foreground mt-0.5">Instructor: {cert.instructor}</p></div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-muted-foreground">Completed: <span className="text-foreground font-medium">{cert.date}</span></span>
                <span className="text-xs font-mono text-primary">{cert.id}</span>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground text-xs font-medium py-2 rounded-xl hover:bg-muted transition-colors"><Download className="h-3.5 w-3.5" /> Download</button>
                <button className="flex-1 flex items-center justify-center gap-1.5 border border-border text-foreground text-xs font-medium py-2 rounded-xl hover:bg-muted transition-colors"><ExternalLink className="h-3.5 w-3.5" /> Share</button>
                <button className="flex-1 flex items-center justify-center gap-1.5 bg-primary/10 text-primary text-xs font-medium py-2 rounded-xl hover:bg-primary/20 transition-colors"><ShieldCheck className="h-3.5 w-3.5" /> Verify</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserReportsPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Reports</h1><p className="text-muted-foreground mt-1 text-sm">Report course issues and track your submitted reports.</p></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground mb-4 text-sm">Submit a Report</h2>
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-3" />
              <p className="font-semibold text-foreground mb-1">Report submitted</p>
              <p className="text-sm text-muted-foreground mb-4">Our team will review it within 48 hours.</p>
              <button onClick={() => setSubmitted(false)} className="text-primary text-sm font-medium hover:underline">Submit another</button>
            </div>
          ) : (
            <div className="space-y-4">
              <FormField label="Course"><Select><option>Advanced React Patterns</option><option>System Design Masterclass</option><option>Git & GitHub Mastery</option></Select></FormField>
              <FormField label="Issue type"><Select><option>Outdated content</option><option>Technical issue</option><option>Misleading description</option><option>Inappropriate material</option><option>Other</option></Select></FormField>
              <FormField label="Description"><Textarea rows={4} placeholder="Please describe the issue in detail..." /></FormField>
              <div className="flex justify-end"><PrimaryBtn onClick={() => setSubmitted(true)}>Submit Report</PrimaryBtn></div>
            </div>
          )}
        </div>
        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground mb-4 text-sm">My Reports</h2>
          {MY_REPORTS.length === 0 ? <EmptyStateView Icon={Flag} title="No reports yet" desc="Reports you submit will appear here." /> : (
            <div className="space-y-3">
              {MY_REPORTS.map((r, i) => (
                <div key={i} className="p-3 bg-muted/50 rounded-xl">
                  <div className="flex items-center justify-between mb-1"><p className="text-xs font-semibold text-foreground truncate">{r.course}</p><StatusBadge status={r.status} /></div>
                  <p className="text-xs text-muted-foreground mb-1">{r.issue}</p>
                  <p className="text-[10px] text-muted-foreground/60" style={{ fontFamily: "JetBrains Mono, monospace" }}>{r.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserRoadmapPage({ setPage }: { setPage: (p: Page) => void }) {
  const [generating, setGenerating] = useState(false);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setPage("generating"); }, 400);
  };

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">AI Learning Roadmap</h1><p className="text-muted-foreground mt-1 text-sm">Tell us your goal and we'll build a personalized learning path.</p></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card border border-border rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center"><Sparkles className="h-4 w-4 text-white" /></div>
            <h2 className="font-bold text-foreground">Generate New Roadmap</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><FormField label="Your goal"><Input placeholder="e.g. Become a senior frontend developer at a startup" /></FormField></div>
            <FormField label="Current level"><Select><option>Complete beginner</option><option>Junior (1-2 years)</option><option>Mid-level (2-4 years)</option><option>Senior (4+ years)</option></Select></FormField>
            <FormField label="Target duration"><Select><option>3 months</option><option>6 months</option><option>9 months</option><option>1 year</option></Select></FormField>
            <FormField label="Hours per week"><Select><option>5 hrs/week</option><option>10 hrs/week</option><option>15 hrs/week</option><option>20+ hrs/week</option></Select></FormField>
            <FormField label="Preferred language"><Select><option>English</option><option>Arabic</option><option>Spanish</option><option>French</option></Select></FormField>
          </div>
          <div className="flex justify-end mt-4">
            <button onClick={handleGenerate} className="bg-gradient-to-r from-primary to-accent text-white font-semibold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-primary/25">
              <Sparkles className="h-4 w-4" /> Generate Roadmap
            </button>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground text-sm mb-3">Saved Roadmaps</h2>
          <div className="space-y-3">
            {SAVED_ROADMAPS.map(rm => (
              <div key={rm.id} onClick={() => setPage("roadmap-detail")} className="p-3 bg-muted/50 rounded-xl cursor-pointer hover:bg-muted transition-colors">
                <div className="flex items-center justify-between mb-1"><p className="text-sm font-semibold text-foreground truncate">{rm.title}</p><StatusBadge status={rm.status} /></div>
                <p className="text-xs text-muted-foreground mb-2">{rm.goal}</p>
                <div className="flex gap-3 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}><span>{rm.modules} modules</span><span>{rm.weeks} weeks</span><span>{rm.hoursPerWeek}h/wk</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RoadmapDetailPage() {
  const [showDiscard, setShowDiscard] = useState(false);
  const rm = SAVED_ROADMAPS[0];

  return (
    <div className="space-y-6">
      {/* Draft banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2"><AlertCircle className="h-4 w-4 text-amber-500" /><p className="text-sm font-medium text-amber-600 dark:text-amber-400">This roadmap is a draft. Review and save it to start tracking progress.</p></div>
        <div className="flex gap-2">
          <button onClick={() => setShowDiscard(true)} className="border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-amber-500/10 transition-colors flex items-center gap-1"><RotateCcw className="h-3 w-3" /> Discard</button>
          <button className="bg-amber-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity flex items-center gap-1"><Check className="h-3 w-3" /> Save Roadmap</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1"><h1 className="text-2xl font-bold text-foreground">{rm.title}</h1><Badge variant="muted">{rm.level}</Badge></div>
            <p className="text-muted-foreground text-sm">{rm.goal}</p>
          </div>
          {/* Timeline */}
          <div className="space-y-2">
            {ROADMAP.map((node, i) => {
              const done = node.status === "completed"; const active = node.status === "active"; const locked = node.status === "locked";
              return (
                <div key={node.id} className="relative flex gap-4">
                  {i < ROADMAP.length - 1 && <div className={`absolute left-[21px] top-11 bottom-[-8px] w-0.5 z-0 ${done ? "bg-primary" : "bg-border"}`} />}
                  <div className={`h-[43px] w-[43px] rounded-full flex items-center justify-center flex-shrink-0 border-2 z-10 ${done ? "bg-primary border-primary text-white" : active ? "bg-background border-primary text-primary" : "bg-background border-border text-muted-foreground"}`}>
                    {done ? <CheckCircle className="h-5 w-5" /> : locked ? <Lock className="h-4 w-4" /> : <Circle className="h-5 w-5" />}
                  </div>
                  <div className={`flex-1 mb-2 bg-card border rounded-2xl p-4 ${active ? "border-primary shadow-lg shadow-primary/10" : locked ? "border-border opacity-55" : "border-border"}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2 flex-wrap"><h3 className="font-semibold text-foreground text-sm">{node.title}</h3>{done && <Badge variant="success">Done</Badge>}{active && <Badge variant="primary">In Progress</Badge>}{locked && <Badge variant="muted">Locked</Badge>}</div>
                      <span className="font-semibold text-xs text-primary flex-shrink-0 ml-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>+{node.xp} XP</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">{node.skills.map(s => <span key={s} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-lg" style={{ fontFamily: "JetBrains Mono, monospace" }}>{s}</span>)}</div>
                    {active && <div className="mt-3"><p className="text-xs text-muted-foreground mb-1.5">Progress</p><Bar value={67} /></div>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">Progress</h3>
            <div className="relative h-28 w-28 mx-auto mb-4">
              <svg viewBox="0 0 112 112" className="h-28 w-28 -rotate-90"><circle cx="56" cy="56" r="46" fill="none" stroke="currentColor" strokeWidth="10" className="text-muted" /><circle cx="56" cy="56" r="46" fill="none" stroke="url(#rdGrad)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 46 * 0.43} ${2 * Math.PI * 46}`} /><defs><linearGradient id="rdGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="var(--color-primary)" /><stop offset="100%" stopColor="var(--color-accent)" /></linearGradient></defs></svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center"><p className="text-2xl font-extrabold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>43%</p><p className="text-[10px] text-muted-foreground">complete</p></div>
            </div>
            <div className="space-y-2 text-xs">
              {[["Completed", "3 / 7"], ["XP Earned", "2,500"], ["Est. completion", "~18 weeks"], ["Hours/week", `${rm.hoursPerWeek}h`]].map(([l, v]) => (
                <div key={l} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span className="font-semibold text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</span></div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2"><Cpu className="h-4 w-4 text-primary" /> AI Generation</h3>
            <div className="space-y-2 text-xs">
              {[["Model", "Claude Sonnet 5"], ["Generated", "Aug 14, 2025"], ["Duration", "4.2s"], ["Tokens used", "3,841"], ["Attempts", "1"], ["Retries", "0"]].map(([l, v]) => (
                <div key={l} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span className="text-foreground font-medium" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</span></div>
              ))}
            </div>
          </div>

          <button className="w-full flex items-center justify-center gap-2 border border-rose-500/20 text-rose-500 text-sm font-medium py-2.5 rounded-xl hover:bg-rose-500/10 transition-colors">
            <Trash2 className="h-4 w-4" /> Delete Roadmap
          </button>
        </div>
      </div>

      <ConfirmDialog open={showDiscard} title="Discard roadmap?" desc="This will permanently delete this draft. This action cannot be undone." onConfirm={() => setShowDiscard(false)} onCancel={() => setShowDiscard(false)} danger />
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ── LEARNING ──────────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function PlayerPage() {
  const [active, setActive] = useState(4);
  const [notes, setNotes] = useState("");
  const [tab, setTab] = useState<"lessons" | "comments">("lessons");

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between">
        <div><p className="text-xs text-muted-foreground mb-0.5">Advanced React Patterns · Chapter 2</p><h1 className="font-bold text-foreground text-lg">Custom Hook Patterns</h1></div>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-muted text-muted-foreground px-3 py-1.5 rounded-xl" style={{ fontFamily: "JetBrains Mono, monospace" }}>Lesson 4 / 7</span>
          <button className="bg-primary text-primary-foreground text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 hover:opacity-90 shadow-md shadow-primary/30">
            <Award className="h-3.5 w-3.5" /> Take Quiz
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4" style={{ minHeight: 420 }}>
        <div className="col-span-2 flex flex-col gap-4">
          <div className="relative rounded-2xl overflow-hidden flex-1 bg-gradient-to-br from-indigo-950 to-violet-950 border border-border" style={{ minHeight: 280 }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }} className="h-16 w-16 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3 shadow-xl"><Play className="h-7 w-7 text-white ml-1" /></motion.button>
              <p className="text-white/80 text-sm font-semibold">Custom Hook Patterns</p>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: "JetBrains Mono, monospace" }}>25:00</p>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-5 py-4">
              <div className="h-1 bg-white/20 rounded-full overflow-hidden mb-2 cursor-pointer"><motion.div initial={{ width: 0 }} animate={{ width: "38%" }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }} className="h-full bg-white rounded-full" /></div>
              <div className="flex items-center justify-between text-xs text-white/50" style={{ fontFamily: "JetBrains Mono, monospace" }}><span>09:32</span><span>25:00</span></div>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-4">
            <div className="flex gap-4 mb-3">
              {(["lessons", "comments"] as const).map(t => <button key={t} onClick={() => setTab(t)} className={`text-sm font-medium pb-1 border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{t === "lessons" ? "Notes" : "Comments"}</button>)}
            </div>
            {tab === "lessons" ? (
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Take notes while you watch..." className="w-full bg-muted/60 rounded-xl p-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none border-0" rows={4} />
            ) : (
              <div className="space-y-3">
                {[{ n: "Emma R.", i: "ER", t: "Great explanation of the useCallback dependency array! This finally clicked for me.", likes: 12, time: "2h ago" }, { n: "Liam P.", i: "LP", t: "Could you also show the difference between useMemo and useCallback?", likes: 5, time: "4h ago" }].map(c => (
                  <div key={c.n} className="flex gap-3"><Avi initials={c.i} size="xs" />
                    <div className="flex-1"><div className="flex items-center gap-2 mb-1"><span className="text-xs font-semibold text-foreground">{c.n}</span><span className="text-xs text-muted-foreground">{c.time}</span></div>
                      <p className="text-xs text-foreground mb-2">{c.t}</p>
                      <div className="flex gap-3 text-xs text-muted-foreground"><button className="flex items-center gap-1 hover:text-primary"><ThumbsUp className="h-3 w-3" />{c.likes}</button><button className="flex items-center gap-1 hover:text-primary"><Reply className="h-3 w-3" />Reply</button></div>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2 mt-3"><input placeholder="Add a comment..." className="flex-1 bg-muted rounded-xl px-3 py-2 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 border-0" /><button className="bg-primary text-primary-foreground px-3 py-2 rounded-xl text-xs font-medium hover:opacity-90"><Send className="h-3 w-3" /></button></div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-border"><h3 className="font-semibold text-foreground text-sm">Course Content</h3><p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>3 / 7 complete</p><Bar value={Math.round(3 / 7 * 100)} className="mt-2" /></div>
          <div className="flex-1 overflow-y-auto divide-y divide-border/40">
            {LESSONS.map((lesson, idx) => (
              <button key={lesson.id} onClick={() => setActive(lesson.id)} className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${lesson.id === active ? "bg-primary/8 border-l-[3px] border-l-primary" : "hover:bg-muted/50 border-l-[3px] border-l-transparent"}`}>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-semibold ${lesson.completed ? "bg-emerald-500 text-white" : lesson.id === active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`} style={lesson.completed ? {} : { fontFamily: "JetBrains Mono, monospace" }}>
                  {lesson.completed ? <CheckCircle className="h-3.5 w-3.5" /> : idx + 1}
                </div>
                <div className="flex-1 min-w-0"><p className={`text-xs font-medium truncate ${lesson.id === active ? "text-primary" : "text-foreground"}`}>{lesson.title}</p><p className="text-xs text-muted-foreground mt-0.5" style={{ fontFamily: "JetBrains Mono, monospace" }}>{lesson.isQuiz ? "📝 " : ""}{lesson.duration}</p></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FinalTestPage({ setPage }: { setPage: (p: Page) => void }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(EXAM_QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState(1800);

  useEffect(() => {
    if (submitted) return;
    const t = setInterval(() => setTime(s => s > 0 ? s - 1 : 0), 1000);
    return () => clearInterval(t);
  }, [submitted]);

  const mins = Math.floor(time / 60); const secs = time % 60;
  const q = EXAM_QUESTIONS[current];
  const score = submitted ? answers.filter((a, i) => a === EXAM_QUESTIONS[i].answer).length : 0;

  const submit = () => { const a = [...answers]; a[current] = selected; setAnswers(a); setSubmitted(true); };
  const next = () => { const a = [...answers]; a[current] = selected; setAnswers(a); setCurrent(c => c + 1); setSelected(answers[current + 1]); };

  return (
    <div className="max-w-2xl mx-auto">
      {!submitted ? (
        <>
          {/* Timer + meta */}
          <div className="flex items-center justify-between mb-6">
            <div><p className="text-xs text-muted-foreground mb-0.5">Advanced React Patterns · Final Test</p><h1 className="text-xl font-bold text-foreground">Module Assessment</h1></div>
            <div className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl border ${time < 300 ? "bg-rose-500/10 border-rose-500/20" : "bg-muted border-border"}`}>
              <Timer className={`h-4 w-4 ${time < 300 ? "text-rose-500" : "text-muted-foreground"}`} />
              <span className={`font-bold text-lg ${time < 300 ? "text-rose-500" : "text-foreground"}`} style={{ fontFamily: "JetBrains Mono, monospace" }}>{String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}</span>
            </div>
          </div>

          {/* Progress pills */}
          <div className="flex gap-1.5 mb-6">
            {EXAM_QUESTIONS.map((_, i) => (
              <div key={i} className={`flex-1 h-1.5 rounded-full transition-all ${i < current ? "bg-emerald-500" : i === current ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>

          {/* Question card */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-lg">Question {current + 1} of {EXAM_QUESTIONS.length}</span>
              <span className="text-xs text-muted-foreground">1 point</span>
            </div>
            <h2 className="text-base font-semibold text-foreground mb-5">{q.q}</h2>
            <div className="space-y-2.5">
              {q.opts.map((opt, i) => (
                <button key={i} onClick={() => setSelected(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ${selected === i ? "border-primary bg-primary/10 text-primary" : "border-border text-foreground hover:border-primary/40 hover:bg-primary/5"}`}>
                  <span className="mr-2 font-mono text-muted-foreground">{String.fromCharCode(65 + i)}.</span>{opt}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button disabled={current === 0} onClick={() => { setCurrent(c => c - 1); setSelected(answers[current - 1]); }} className="text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors">← Previous</button>
            {current < EXAM_QUESTIONS.length - 1
              ? <PrimaryBtn onClick={next}>Next Question →</PrimaryBtn>
              : <PrimaryBtn onClick={submit}>Submit Test</PrimaryBtn>}
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <div className={`h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-4 ${score >= 3 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}>
            {score >= 3 ? <Trophy className="h-10 w-10 text-emerald-500" /> : <AlertCircle className="h-10 w-10 text-rose-500" />}
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-1">{score >= 3 ? "Congratulations!" : "Better luck next time"}</h2>
          <p className="text-muted-foreground mb-4">You scored <span className="font-bold text-foreground">{score} / {EXAM_QUESTIONS.length}</span> ({Math.round(score / EXAM_QUESTIONS.length * 100)}%)</p>
          <div className="inline-flex items-center gap-2 mb-8">
            {EXAM_QUESTIONS.map((eq, i) => (
              <div key={i} className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${answers[i] === eq.answer ? "bg-emerald-500" : "bg-rose-500"}`}>
                {answers[i] === eq.answer ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
              </div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            {score < 3 && <button onClick={() => { setSubmitted(false); setCurrent(0); setSelected(null); setAnswers(new Array(EXAM_QUESTIONS.length).fill(null)); setTime(1800); }} className="border border-border text-foreground px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Retake Test</button>}
            <PrimaryBtn onClick={() => setPage("player")}>Back to Course</PrimaryBtn>
            {score >= 3 && <PrimaryBtn onClick={() => setPage("user-certs")}>View Certificate →</PrimaryBtn>}
          </div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ── ADMIN PAGES ───────────────────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1><p className="text-muted-foreground mt-1 text-sm">Platform overview · August 2025</p></div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 shadow-md shadow-primary/30"><Plus className="h-4 w-4" /> New Course</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Total Students" value="180,241" trend={14} Icon={Users} color="from-indigo-500 to-violet-600" />
        <StatCard label="Active Courses" value="342" sub="18 in draft" trend={8} Icon={BookOpen} color="from-cyan-500 to-blue-500" />
        <StatCard label="Monthly Revenue" value="$134k" trend={22} Icon={TrendingUp} color="from-emerald-500 to-teal-600" />
        <StatCard label="Avg Completion" value="73%" trend={5} Icon={Target} color="from-amber-400 to-orange-500" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {[{ title: "New Enrollments", data: enrollmentData, color: "var(--color-primary)", fill: "#gEnroll2" }, { title: "Revenue", data: revenueData, color: "var(--color-accent)", fill: "#gRev2" }].map(({ title, data, color }, ci) => (
          <div key={title} className="bg-card border border-border rounded-2xl p-5">
            <h3 className="font-semibold text-foreground text-sm mb-4">{title} <span className="text-muted-foreground font-normal text-xs">· Last 8 months</span></h3>
            <ResponsiveContainer width="100%" height={160}>
              <AreaChart data={data} margin={{ top: 4, right: 4, left: -28, bottom: 0 }}>
                <defs><linearGradient id={`ag${ci}`} x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor={color} stopOpacity={0.3} /><stop offset="95%" stopColor={color} stopOpacity={0.02} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <YAxis tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
                <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke={color} strokeWidth={2} fill={`url(#ag${ci})`} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between"><h3 className="font-semibold text-foreground text-sm">Top Performing Courses</h3><button className="text-xs text-primary font-semibold">View all</button></div>
          <table className="w-full"><thead><tr className="border-b border-border">{["Course", "Students", "Revenue", "Rating"].map(h => <th key={h} className={`px-5 py-2.5 text-xs text-muted-foreground font-medium ${h === "Course" ? "text-left" : "text-right"}`}>{h}</th>)}</tr></thead>
            <tbody>{TOP_COURSES.map((c, i) => <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/30 transition-colors"><td className="px-5 py-3 text-sm font-medium text-foreground">{c.title}</td><td className="px-5 py-3 text-right text-sm text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.students.toLocaleString()}</td><td className="px-5 py-3 text-right text-sm text-emerald-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.revenue}</td><td className="px-5 py-3 text-right text-sm text-amber-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.rating}★</td></tr>)}</tbody>
          </table>
        </div>
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-border flex items-center justify-between"><h3 className="font-semibold text-foreground text-sm">Recent Signups</h3><button className="text-xs text-primary font-semibold">Manage</button></div>
          <div className="divide-y divide-border/40">{RECENT_USERS.map((u, i) => <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-muted/30 transition-colors"><Avi initials={u.initials} size="sm" /><div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{u.name}</p><p className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{u.time}</p></div><MoreHorizontal className="h-4 w-4 text-muted-foreground flex-shrink-0" /></div>)}</div>
        </div>
      </div>
    </div>
  );
}

function AdminUsersPage() {
  const [roleFilter, setRoleFilter] = useState("All");
  const roles = ["All", "STUDENT", "INSTRUCTOR", "SUPERADMIN"];
  const filtered = roleFilter === "All" ? ADMIN_USERS : ADMIN_USERS.filter(u => u.role === roleFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">User Management</h1><p className="text-muted-foreground mt-1 text-sm">Manage roles, access, and account status.</p></div>
        <div className="flex items-center gap-2">
          <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><input placeholder="Search users..." className="bg-muted border-0 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-44" /></div>
        </div>
      </div>
      <div className="flex gap-1">
        {roles.map(r => <button key={r} onClick={() => setRoleFilter(r)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${roleFilter === r ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>{r}</button>)}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["User", "Role", "Courses", "Joined", "Status", "Actions"].map(h => <th key={h} className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3"><div className="flex items-center gap-2.5"><Avi initials={u.initials} size="sm" /><div><p className="text-sm font-medium text-foreground">{u.name}</p><p className="text-xs text-muted-foreground">{u.email}</p></div></div></td>
                <td className="px-5 py-3"><RoleBadge role={u.role} /></td>
                <td className="px-5 py-3 text-sm text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{u.courses}</td>
                <td className="px-5 py-3 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{u.joined}</td>
                <td className="px-5 py-3"><StatusBadge status={u.status} /></td>
                <td className="px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button className="h-7 px-2 rounded-lg text-xs border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Edit</button>
                    {u.status === "active" ? <button className="h-7 px-2 rounded-lg text-xs border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1"><Ban className="h-3 w-3" />Ban</button> : <button className="h-7 px-2 rounded-lg text-xs border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 transition-colors">Unban</button>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCoursesPage({ setPage }: { setPage: (p: Page) => void }) {
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "APPROVED", "PENDING_REVIEW", "DRAFT", "REJECTED"];
  const filtered = statusFilter === "All" ? ADMIN_COURSES_DATA : ADMIN_COURSES_DATA.filter(c => c.status === statusFilter);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Course Management</h1><p className="text-muted-foreground mt-1 text-sm">Review, approve, and manage all platform courses.</p></div>
        <PrimaryBtn onClick={() => setPage("admin-new-course")}>+ New Course</PrimaryBtn>
      </div>
      <div className="flex gap-1 flex-wrap">
        {statuses.map(s => <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${statusFilter === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"}`}>{s === "All" ? "All" : s.replace("_", " ")}</button>)}
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Course", "Instructor", "Status", "Students", "Rating", "Submitted", "Actions"].map(h => <th key={h} className="px-4 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-4 py-3 text-sm font-medium text-foreground max-w-[180px] truncate">{c.title}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.instructor}</td>
                <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                <td className="px-4 py-3 text-sm text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.students > 0 ? c.students.toLocaleString() : "—"}</td>
                <td className="px-4 py-3 text-sm" style={{ fontFamily: "JetBrains Mono, monospace" }}><span className={c.rating > 0 ? "text-amber-500" : "text-muted-foreground"}>{c.rating > 0 ? `${c.rating}★` : "—"}</span></td>
                <td className="px-4 py-3 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.submitted}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button onClick={() => setPage("admin-course-editor")} className="h-7 px-2 rounded-lg text-xs border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Edit</button>
                    {c.status === "PENDING_REVIEW" && <><button className="h-7 px-2 rounded-lg text-xs border border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10 transition-colors">Approve</button><button className="h-7 px-2 rounded-lg text-xs border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-colors">Reject</button></>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminNewCoursePage({ setPage }: { setPage: (p: Page) => void }) {
  const [selectedColor, setSelectedColor] = useState("from-indigo-500 to-violet-600");
  const colorOptions = ["from-indigo-500 to-violet-600", "from-cyan-500 to-blue-600", "from-emerald-500 to-teal-600", "from-orange-400 to-rose-600", "from-violet-500 to-purple-600", "from-amber-400 to-orange-500"];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Create New Course</h1><p className="text-muted-foreground mt-1 text-sm">Fill in the details to submit your course for review.</p></div>
        <div className="flex gap-2">
          <button onClick={() => setPage("admin-courses")} className="border border-border text-foreground px-4 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors">Cancel</button>
          <PrimaryBtn onClick={() => setPage("admin-course-editor")}>Save & Continue →</PrimaryBtn>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-foreground text-sm">Course Information</h2>
            <FormField label="Course title"><Input placeholder="e.g. Advanced React Patterns" /></FormField>
            <FormField label="Short description"><Textarea rows={3} placeholder="What will students learn and achieve?" /></FormField>
            <div className="grid grid-cols-2 gap-4">
              <FormField label="Category"><Select><option>Frontend</option><option>Backend</option><option>AI/ML</option><option>DevOps</option><option>Architecture</option><option>Tools</option></Select></FormField>
              <FormField label="Level"><Select><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select></FormField>
              <FormField label="Language"><Select><option>English</option><option>Arabic</option><option>Spanish</option></Select></FormField>
              <FormField label="Price (USD)"><Input type="number" placeholder="89" /></FormField>
            </div>
          </div>
          <div className="bg-card border border-border rounded-2xl p-5">
            <h2 className="font-bold text-foreground text-sm mb-4">Cover Theme</h2>
            <div className="flex gap-2 flex-wrap">
              {colorOptions.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} className={`h-10 w-16 rounded-xl bg-gradient-to-br ${c} transition-all ${selectedColor === c ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105" : ""}`} />
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden sticky top-20">
            <div className={`h-36 bg-gradient-to-br ${selectedColor} flex items-center justify-center`}><Code className="h-14 w-14 text-white/80" /></div>
            <div className="p-4">
              <p className="text-xs text-primary font-medium mb-1">Frontend · Advanced</p>
              <p className="font-semibold text-foreground text-sm mb-1">Course title preview</p>
              <p className="text-xs text-muted-foreground mb-3">Your name</p>
              <Stars rating={0} />
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border"><span className="font-bold text-foreground">$89</span><button className="text-xs bg-primary text-primary-foreground px-3 py-1.5 rounded-lg">Enroll</button></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminCourseEditorPage() {
  const [activeTab, setActiveTab] = useState<"content" | "settings" | "seo" | "preview">("content");
  const [expandedMod, setExpandedMod] = useState<number | null>(0);
  const tabs = ["content", "settings", "seo", "preview"] as const;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div><h1 className="text-xl font-bold text-foreground">Advanced React Patterns</h1><div className="flex items-center gap-2 mt-1"><StatusBadge status="APPROVED" /><span className="text-xs text-muted-foreground">Last saved 2 min ago</span></div></div>
        <div className="flex gap-2"><button className="border border-border text-foreground px-3 py-2 rounded-xl text-sm font-medium hover:bg-muted transition-colors flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" /> Preview</button><PrimaryBtn>Publish Changes</PrimaryBtn></div>
      </div>

      <div className="flex gap-1 bg-muted p-1 rounded-xl w-fit">
        {tabs.map(t => <button key={t} onClick={() => setActiveTab(t)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${activeTab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>)}
      </div>

      {activeTab === "content" && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-3">
            {CURRICULUM.map((mod, mi) => (
              <div key={mi} className="bg-card border border-border rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/30" onClick={() => setExpandedMod(expandedMod === mi ? null : mi)}>
                  <div className="flex items-center gap-3"><Hash className="h-4 w-4 text-muted-foreground" /><span className="font-semibold text-foreground text-sm">{mod.module}</span><Badge variant="muted">{mod.lessons.length} lessons</Badge></div>
                  <div className="flex items-center gap-2"><button className="h-7 px-2 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors" onClick={e => e.stopPropagation()}><PenLine className="h-3.5 w-3.5" /></button><ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expandedMod === mi ? "rotate-180" : ""}`} /></div>
                </div>
                <AnimatePresence initial={false}>
                  {expandedMod === mi && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      {mod.lessons.map((l, li) => (
                        <div key={li} className="flex items-center gap-3 px-4 py-2.5 border-t border-border/30 bg-muted/10 group">
                          <div className="h-5 w-5 rounded flex items-center justify-center flex-shrink-0 bg-primary/10">{l.isQuiz || l.isTest ? <ClipboardList className="h-3 w-3 text-amber-500" /> : <Play className="h-3 w-3 text-primary" />}</div>
                          <span className="text-sm text-foreground flex-1">{l.title}</span>
                          <span className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{l.duration}</span>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="h-6 px-1.5 rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"><PenLine className="h-3 w-3" /></button>
                            <button className="h-6 px-1.5 rounded text-xs text-rose-400 hover:bg-rose-500/10 transition-colors"><Trash2 className="h-3 w-3" /></button>
                          </div>
                        </div>
                      ))}
                      <div className="px-4 py-2 border-t border-border/30 bg-muted/5">
                        <button className="text-xs text-primary font-medium flex items-center gap-1 hover:gap-1.5 transition-all"><Plus className="h-3 w-3" /> Add Lesson</button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
            <button className="w-full border-2 border-dashed border-border rounded-2xl py-4 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors flex items-center justify-center gap-2"><Plus className="h-4 w-4" /> Add Module</button>
          </div>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h3 className="font-semibold text-foreground text-sm mb-3">Course Summary</h3>
              <div className="space-y-2 text-xs">
                {[["Modules", "3"], ["Lessons", "10"], ["Quizzes", "2"], ["Tests", "1"], ["Total duration", "3h 30m"]].map(([l, v]) => (
                  <div key={l} className="flex justify-between"><span className="text-muted-foreground">{l}</span><span className="font-medium text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{v}</span></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="max-w-xl space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-foreground text-sm">Course Settings</h2>
            <FormField label="Price (USD)"><Input type="number" defaultValue="89" /></FormField>
            <FormField label="Level"><Select defaultValue="Advanced"><option>Beginner</option><option>Intermediate</option><option>Advanced</option></Select></FormField>
            <FormField label="Language"><Select><option>English</option><option>Arabic</option></Select></FormField>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-xl">
              <div><p className="text-sm font-medium text-foreground">Free preview</p><p className="text-xs text-muted-foreground">Allow first 2 lessons for free</p></div>
              <button className="h-6 w-11 rounded-full bg-primary relative"><span className="absolute top-0.5 right-0.5 h-5 w-5 rounded-full bg-white shadow" /></button>
            </div>
            <div className="flex justify-end"><PrimaryBtn>Save Settings</PrimaryBtn></div>
          </div>
        </div>
      )}

      {activeTab === "seo" && (
        <div className="max-w-xl space-y-4">
          <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
            <h2 className="font-bold text-foreground text-sm">SEO & Metadata</h2>
            <FormField label="Meta title"><Input defaultValue="Advanced React Patterns | LearnPath" /></FormField>
            <FormField label="Meta description"><Textarea rows={3} defaultValue="Master advanced React patterns including Compound Components, Render Props, and Custom Hooks used by senior engineers." /></FormField>
            <FormField label="Keywords"><Input placeholder="react, hooks, patterns, frontend, javascript" /></FormField>
            <div className="flex justify-end"><PrimaryBtn>Save SEO</PrimaryBtn></div>
          </div>
        </div>
      )}

      {activeTab === "preview" && (
        <div className="max-w-sm">
          <p className="text-xs text-muted-foreground mb-3">This is how your course card will appear in the catalog.</p>
          <CourseCard course={COURSES[0]} />
        </div>
      )}
    </div>
  );
}

function AdminEnrollmentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-foreground">Enrollments</h1><p className="text-muted-foreground mt-1 text-sm">Manage student enrollments, grant or revoke access.</p></div>
        <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" /><input placeholder="Search enrollments..." className="bg-muted border-0 rounded-xl pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 w-52" /></div>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Student", "Course", "Enrolled", "Progress", "Status", "Actions"].map(h => <th key={h} className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {ENROLLMENTS.map((e, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3"><div className="flex items-center gap-2"><Avi initials={e.si} size="sm" /><span className="text-sm font-medium text-foreground">{e.student}</span></div></td>
                <td className="px-5 py-3 text-sm text-foreground max-w-[160px] truncate">{e.course}</td>
                <td className="px-5 py-3 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{e.enrolled}</td>
                <td className="px-5 py-3 w-32"><div className="flex items-center gap-2"><Bar value={e.progress} className="flex-1" /><span className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{e.progress}%</span></div></td>
                <td className="px-5 py-3"><StatusBadge status={e.status} /></td>
                <td className="px-5 py-3"><div className="flex gap-1"><button className="h-7 px-2 rounded-lg text-xs border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">Grant</button><button className="h-7 px-2 rounded-lg text-xs border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-colors">Revoke</button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminReportsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Course Reports</h1><p className="text-muted-foreground mt-1 text-sm">Review and moderate student-submitted course reports.</p></div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Reporter", "Course", "Issue", "Status", "Filed", "Actions"].map(h => <th key={h} className="px-5 py-3 text-left text-xs text-muted-foreground font-medium">{h}</th>)}</tr></thead>
          <tbody>
            {COURSE_REPORTS.map((r, i) => (
              <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors">
                <td className="px-5 py-3"><div className="flex items-center gap-2"><Avi initials={r.ri} size="sm" /><span className="text-sm font-medium text-foreground">{r.reporter}</span></div></td>
                <td className="px-5 py-3 text-sm text-foreground max-w-[160px] truncate">{r.course}</td>
                <td className="px-5 py-3 text-sm text-muted-foreground">{r.issue}</td>
                <td className="px-5 py-3"><StatusBadge status={r.status} /></td>
                <td className="px-5 py-3 text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{r.filed}</td>
                <td className="px-5 py-3">
                  <div className="flex gap-1">
                    <button className="h-7 px-2 rounded-lg text-xs border border-border text-muted-foreground hover:bg-muted transition-colors">Dismiss</button>
                    <button className="h-7 px-2 rounded-lg text-xs border border-amber-500/20 text-amber-500 hover:bg-amber-500/10 transition-colors">Warn</button>
                    <button className="h-7 px-2 rounded-lg text-xs border border-rose-500/20 text-rose-500 hover:bg-rose-500/10 transition-colors">Remove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">My Analytics</h1><p className="text-muted-foreground mt-1 text-sm">Performance metrics for your courses — last 6 months.</p></div>
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="My Enrollments" value="21,760" trend={18} Icon={Users} color="from-indigo-500 to-violet-600" />
        <StatCard label="My Revenue" value="$84k" trend={12} Icon={TrendingUp} color="from-emerald-500 to-teal-600" />
        <StatCard label="Avg Rating" value="4.85★" trend={2} Icon={Star} color="from-amber-400 to-orange-500" />
        <StatCard label="Completion Rate" value="76%" trend={4} Icon={Target} color="from-cyan-500 to-blue-500" />
      </div>

      <div className="bg-card border border-border rounded-2xl p-5">
        <h3 className="font-semibold text-foreground text-sm mb-4">Enrollment & Revenue Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={analyticsData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey="month" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
            <YAxis yAxisId="left" tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
            <YAxis yAxisId="right" orientation="right" tickFormatter={v => `$${(v / 1000).toFixed(0)}k`} tick={{ fontSize: 10, fill: "var(--color-muted-foreground)" }} />
            <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12, fontSize: 12 }} />
            <Line yAxisId="left" type="monotone" dataKey="enrollments" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex gap-4 mt-2 justify-end">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="h-2 w-4 rounded bg-primary" /> Enrollments</div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="h-2 w-4 rounded bg-accent" /> Revenue</div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="font-semibold text-foreground text-sm">Per-Course Breakdown</h3></div>
        <table className="w-full">
          <thead><tr className="border-b border-border">{["Course", "Enrollments", "Revenue", "Rating", "Completion"].map(h => <th key={h} className={`px-5 py-2.5 text-xs text-muted-foreground font-medium ${h === "Course" ? "text-left" : "text-right"}`}>{h}</th>)}</tr></thead>
          <tbody>{TOP_COURSES.map((c, i) => <tr key={i} className="border-b border-border/40 last:border-0 hover:bg-muted/20 transition-colors"><td className="px-5 py-3 text-sm font-medium text-foreground">{c.title}</td><td className="px-5 py-3 text-right text-sm text-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.students.toLocaleString()}</td><td className="px-5 py-3 text-right text-sm text-emerald-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.revenue}</td><td className="px-5 py-3 text-right text-sm text-amber-500 font-semibold" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.rating}★</td><td className="px-5 py-3 text-right"><div className="flex items-center justify-end gap-2"><span className="text-xs text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>73%</span><div className="w-16"><Bar value={73} /></div></div></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}

function AdminCertsPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Certificate Management</h1><p className="text-muted-foreground mt-1 text-sm">Issue certificates manually for completed courses.</p></div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-card border border-border rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-foreground text-sm">Issue Certificate</h2>
          <FormField label="Student"><Select><option>Emma Rodriguez (emma.r@gmail.com)</option><option>Liam Park (l.park@outlook.com)</option><option>Noah Chen (n.chen@yahoo.com)</option></Select></FormField>
          <FormField label="Course"><Select><option>Advanced React Patterns</option><option>System Design Masterclass</option><option>Git & GitHub Mastery</option></Select></FormField>
          <FormField label="Completion date"><Input type="date" defaultValue="2025-08-14" /></FormField>
          <FormField label="Notes (optional)"><Textarea rows={2} placeholder="e.g. Awarded for exceptional project work" /></FormField>
          <div className="flex justify-end"><PrimaryBtn>Issue Certificate</PrimaryBtn></div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-5">
          <h2 className="font-bold text-foreground text-sm mb-3">Recently Issued</h2>
          <div className="space-y-3">
            {CERTS.map(c => (
              <div key={c.id} className="p-3 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 mb-0.5"><Award className="h-4 w-4 text-amber-500" /><p className="text-xs font-semibold text-foreground truncate">{c.title}</p></div>
                <p className="text-[10px] text-muted-foreground" style={{ fontFamily: "JetBrains Mono, monospace" }}>{c.id} · {c.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminRegisterPage() {
  const [tokenVerified, setTokenVerified] = useState(false);
  return (
    <div className="space-y-6 max-w-lg">
      <div><h1 className="text-2xl font-bold text-foreground">Register Instructor</h1><p className="text-muted-foreground mt-1 text-sm">Invite a new instructor using a one-time token.</p></div>

      {!tokenVerified ? (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-foreground text-sm">Step 1: Verify invite token</h2>
          <FormField label="Invite token"><div className="flex gap-2"><Input placeholder="INST-XXXX-XXXX-XXXX" /><PrimaryBtn onClick={() => setTokenVerified(true)}>Verify</PrimaryBtn></div></FormField>
          <p className="text-xs text-muted-foreground">Tokens are single-use and expire after 48 hours. <span className="text-primary cursor-pointer hover:underline">Generate a new token</span></p>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-2xl p-5 space-y-4">
          <div className="flex items-center gap-2 mb-2"><CheckCircle className="h-5 w-5 text-emerald-500" /><h2 className="font-bold text-foreground text-sm">Token verified — complete registration</h2></div>
          <div className="grid grid-cols-2 gap-4">
            <FormField label="First name"><Input placeholder="Sarah" /></FormField>
            <FormField label="Last name"><Input placeholder="Chen" /></FormField>
          </div>
          <FormField label="Email"><Input type="email" placeholder="instructor@company.com" /></FormField>
          <FormField label="Expertise / Bio"><Textarea rows={3} placeholder="What do they teach? Any relevant credentials?" /></FormField>
          <div className="flex justify-end"><PrimaryBtn>Create Instructor Account</PrimaryBtn></div>
        </div>
      )}
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════
// ── SPECIAL / COMPONENT PAGES ─────────────────────────────────────
// ══════════════════════════════════════════════════════════════════

function GeneratingPage() {
  const steps = [
    { label: "Understanding your goal", desc: "Analyzing your inputs and career objective.", done: true },
    { label: "Reviewing available courses", desc: "Scanning 340+ courses for relevance.", done: true },
    { label: "Building your learning path", desc: "Sequencing modules for optimal progression.", done: true, active: true },
    { label: "Matching courses to steps", desc: "Linking real courses to each roadmap milestone.", done: false },
    { label: "Finalizing your roadmap", desc: "Generating timelines and XP assignments.", done: false },
  ];

  return (
    <div className="max-w-md mx-auto pt-10">
      <div className="text-center mb-8">
        <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} className="text-5xl mb-4">✨</motion.div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Generating your roadmap</h1>
        <p className="text-muted-foreground text-sm">Hang tight — this usually takes 5–10 seconds.</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {steps.map((s, i) => (
          <div key={i} className={`flex gap-4 px-5 py-4 border-b border-border/50 last:border-0 transition-colors ${s.active ? "bg-primary/5" : ""}`}>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${s.done && !s.active ? "bg-emerald-500" : s.active ? "bg-primary" : "bg-muted"}`}>
              {s.done && !s.active ? <Check className="h-4 w-4 text-white" /> : s.active ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}><RefreshCw className="h-3.5 w-3.5 text-white" /></motion.div>
              ) : <Circle className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div>
              <p className={`text-sm font-semibold ${s.active ? "text-primary" : s.done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <Bar value={60} />
        <p className="text-xs text-muted-foreground text-center mt-2" style={{ fontFamily: "JetBrains Mono, monospace" }}>60% complete</p>
      </div>
    </div>
  );
}

function EmptyStatesPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-foreground">Empty States</h1><p className="text-muted-foreground mt-1 text-sm">Reusable empty state patterns used across the app.</p></div>
      <div className="grid grid-cols-2 gap-4">
        {[
          { Icon: BookOpen, title: "No courses yet", desc: "You haven't enrolled in any courses. Browse the catalog to get started.", action: true, actionLabel: "Browse Courses" },
          { Icon: Bookmark, title: "Nothing saved", desc: "Courses you bookmark will appear here for easy access.", action: true, actionLabel: "Explore Catalog" },
          { Icon: Award, title: "No certificates yet", desc: "Complete a course to earn your first certificate.", action: false },
          { Icon: Flag, title: "No reports submitted", desc: "You haven't filed any course reports. We hope everything is great!", action: false },
          { Icon: Map, title: "No roadmaps yet", desc: "Generate your first AI learning roadmap to get a personalized path.", action: true, actionLabel: "Generate Roadmap" },
          { Icon: MessageSquare, title: "No comments yet", desc: "Be the first to leave a comment on this lesson.", action: false },
          { Icon: Users, title: "No students found", desc: "No students match your current search or filter criteria.", action: false },
          { Icon: Inbox, title: "All caught up!", desc: "There are no pending items that require your attention right now.", action: false },
        ].map((e, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
            <EmptyStateView Icon={e.Icon} title={e.title} desc={e.desc} action={e.action ? () => {} : undefined} actionLabel={e.actionLabel} />
          </div>
        ))}
      </div>

      {/* Toast showcase */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Alert / Toast Variants</h2>
        <div className="space-y-2">
          {[
            { type: "success", icon: CheckCircle, msg: "Course enrolled successfully! Check My Courses.", border: "border-emerald-500/20 bg-emerald-500/8", icon_c: "text-emerald-500" },
            { type: "error", icon: AlertCircle, msg: "Payment failed. Please check your card details and try again.", border: "border-rose-500/20 bg-rose-500/8", icon_c: "text-rose-500" },
            { type: "warning", icon: AlertCircle, msg: "Your session is about to expire. Save your progress now.", border: "border-amber-500/20 bg-amber-500/8", icon_c: "text-amber-500" },
            { type: "info", icon: Info, msg: "Your roadmap is ready! Click to view your personalized learning path.", border: "border-primary/20 bg-primary/8", icon_c: "text-primary" },
          ].map(({ icon: TIcon, msg, border, icon_c }) => (
            <div key={msg} className={`flex items-center gap-3 px-4 py-3 rounded-xl border ${border}`}>
              <TIcon className={`h-4 w-4 flex-shrink-0 ${icon_c}`} />
              <p className="text-sm text-foreground flex-1">{msg}</p>
              <button className="text-muted-foreground hover:text-foreground transition-colors"><X className="h-4 w-4" /></button>
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton showcase */}
      <div>
        <h2 className="text-base font-bold text-foreground mb-3">Skeleton Loaders</h2>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="h-32 bg-muted animate-pulse" />
              <div className="p-4 space-y-2.5">
                <div className="h-3 bg-muted rounded animate-pulse w-16" />
                <div className="h-4 bg-muted rounded animate-pulse w-full" />
                <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
                <div className="h-3 bg-muted rounded animate-pulse w-24" />
                <div className="flex gap-2 mt-3"><div className="h-6 bg-muted rounded animate-pulse flex-1" /><div className="h-6 bg-muted rounded animate-pulse w-16" /></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App Shell ──────────────────────────────────────────────────────

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === "dark" ? "light" : "dark");

  const noTopbar: Page[] = ["login", "register", "forgot-password", "reset-password", "verify-email"];
  const showTopbar = !noTopbar.includes(page);

  const pages: Record<Page, ReactNode> = {
    home: <HomePage setPage={setPage} />,
    courses: <CoursesPage setPage={setPage} />,
    "course-detail": <CourseDetailPage setPage={setPage} />,
    about: <AboutPage />,
    "verify-cert": <VerifyCertPage />,
    "not-found": <NotFoundPage setPage={setPage} />,
    login: <LoginPage setPage={setPage} />,
    register: <RegisterPage setPage={setPage} />,
    "forgot-password": <ForgotPasswordPage setPage={setPage} />,
    "reset-password": <ResetPasswordPage setPage={setPage} />,
    "verify-email": <VerifyEmailPage setPage={setPage} />,
    profile: <ProfilePage setPage={setPage} />,
    "my-courses": <MyCoursesPage setPage={setPage} />,
    saved: <SavedPage setPage={setPage} />,
    "user-certs": <UserCertsPage />,
    "user-reports": <UserReportsPage />,
    "user-roadmap": <UserRoadmapPage setPage={setPage} />,
    "roadmap-detail": <RoadmapDetailPage />,
    player: <PlayerPage />,
    "final-test": <FinalTestPage setPage={setPage} />,
    admin: <AdminDashboardPage />,
    "admin-users": <AdminUsersPage />,
    "admin-courses": <AdminCoursesPage setPage={setPage} />,
    "admin-new-course": <AdminNewCoursePage setPage={setPage} />,
    "admin-course-editor": <AdminCourseEditorPage />,
    "admin-enrollments": <AdminEnrollmentsPage />,
    "admin-reports": <AdminReportsPage />,
    "admin-analytics": <AdminAnalyticsPage />,
    "admin-certs": <AdminCertsPage />,
    "admin-register": <AdminRegisterPage />,
    generating: <GeneratingPage />,
    "empty-states": <EmptyStatesPage />,
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar page={page} setPage={setPage} theme={theme} toggleTheme={toggleTheme} />
      <div className="flex-1 flex flex-col overflow-hidden">
        {showTopbar && <Topbar />}
        <main className="flex-1 overflow-y-auto p-6">
          <AnimatePresence mode="wait">
            <motion.div key={page} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2, ease: "easeOut" }}>
              {pages[page]}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

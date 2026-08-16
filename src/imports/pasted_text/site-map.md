Roles (from prisma/schema.prisma)
Role	Access
STUDENT	default; public site + own user area + enrolled courses
INSTRUCTOR	staff (/admin), own courses only
SUPERADMIN	everything incl. users, certificates, dashboard
A. Public site — (site) group (guests + all roles)
Layout: public navbar, theme toggle, locale switcher, login/register or logged-in dropdown.
1. / Homepage — hero, animated category theme cards, featured courses (CourseCard), how-it-works, testimonials, CTA, footer.
2. /courses Course catalog — search, category filter, sort dropdown (newest/popular/rating/price), price filter (free/<500/500–1500/>1500), pagination, course cards.
3. /courses/[slug] Course detail — cover hero, price + enroll/checkout button (Stripe), learning outcomes, curriculum list with lock icons on paid lessons (locked until enrolled), reviews section + review submit form (enrolled only), related courses.
4. /about About — animated editorial page.
5. /certificates/verify Certificate verification — enter number → valid/invalid result card.
6. (site)/loading.tsx — skeleton course-card grid.
7. (site)/error.tsx — error boundary with "Try again".
8. /not-found (global 404) — floating-books illustration, mouse-follow blob, "Back" + "Explore courses".
B. Auth — (auth) group (guests only; signed-in users redirected)
 9. /login — login + 2FA step (EMAIL OTP / GOOGLE_AUTH TOTP), remember-me, return-to.
10. /register — username/email/password → verify-email prompt.
11. /forgot-password — email → reset link sent state.
12. /reset-password — new password with strength meter.
13. /verify-email — auto-verify + resend.
C. User area — (user)/[userId] group (logged-in owner)
Layout: UserNav sidebar (Home, Courses, Profile, My Courses, Saved, Certificates, Reports, Roadmaps) + top bar + mobile bottom nav.
14. [userId]/ → redirects to /profile.
15. [userId]/profile ProfileHub dashboard — edit username/avatar, enable 2FA, change password, stat cards (courses, certificates, progress), progress rings, continue-learning cards.
16. [userId]/my-courses — tabs All/In-Progress/Completed + search + progress cards.
17. [userId]/saved — wishlist grid with unsave.
18. [userId]/certificates — earned-certificates panel (view/download/verify).
19. [userId]/reports — report-a-course form + my reports list with status badges.
20. [userId]/roadmap — AI roadmap generator: RoadmapForm (goal, level, duration, hours/week, language) + saved roadmaps grid, empty state, retry, skeletons.
21. [userId]/roadmap/[id] — roadmap detail: level badge, draft review banner (Save/Discard), progress ring + metadata, AI generation details (model/time/tokens/attempts/retries), RoadmapTimeline with course links, delete confirm dialogs.
- (user)/loading.tsx (avatar+cards skeleton), (user)/error.tsx.
D. Course player — learning group (enrolled students only)
22. /learning/[courseId] — header (progress bar, discussion, settings) + CurriculumSidebar (lesson search, modules/quizzes/tests with lock states) + main: LessonView (video/article, mark complete, comments with reply/like), QuizRunner, or welcome screen (Start Learning, final tests list).
23. /learning/[courseId]/test/[testId] — ExamRunner: sticky timer, time-limit stat card, attempt limits, submit→result.
- learning/loading.tsx, learning/error.tsx.
E. Admin — admin group (INSTRUCTOR + SUPERADMIN)
Layout: AdminSidebar (role-filtered) + AdminTopBar.
Page	Purpose	Role
/admin/dashboard	platform KPIs + charts	SUPERADMIN only
/admin/users	manage users, roles, ban	SUPERADMIN only
/admin/courses	approval workflow (DRAFT/PENDING_REVIEW/APPROVED/REJECTED); instructors see "My Courses"	all staff
/admin/courses/new	create course (cover upload, category, price)	all staff
/admin/courses/[id]	CourseEditor — build modules/lessons/quizzes/tests	owner staff
/admin/enrollments	all enrollments, progress, grant/revoke	all staff
/admin/reports	moderate course reports	all staff
/admin/analytics	instructor KPIs, 6-mo trend chart, per-course table	INSTRUCTOR (hidden from superadmin)
/admin/certificates	issue certificate for user+course	SUPERADMIN only
/admin/register	create instructor via invite token	SUPERADMIN only
- admin/loading.tsx (KPI+chart skeletons), admin/error.tsx.
⚠️ Note: Sidebar "Settings" (/admin/settings) and "Help" (/admin/help) have no page files — they currently hit the 404 page.
F. Special / state pages & components (don't forget these)
- RoadmapGenerating (roadmap-generating.tsx) — animated step list shown while AI generates: Understanding your goal → Reviewing available courses → Building your learning path → Matching courses → Finalizing your roadmap.
- EmptyState — icon + title + description + optional action (used on roadmaps, my-courses, saved, reports).
- Skeleton loaders per page; ConfirmDialog for save/discard/delete; toast notifications; Alert error/success; StatusBadge variants; course-card / progress-card components.
This map is ready to hand to the AI for building UI components. Want me to also dump the exact component file list under src/components for reference?
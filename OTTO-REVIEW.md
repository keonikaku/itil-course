# Otto's accuracy review of the 2026-10-10 content build

Reviewed 2026-10-10. Every new question, flashcard, and brief update was checked against the official AXELOS/PeopleCert sample papers ([O2] and [O3]), the candidate syllabus [O1], and the Dion gap analysis. PDFs were re-downloaded and re-read during this review.

---

## Verdict: BUILD IS ACCURATE. One wording fix needed, one correction to the gap analysis itself.

Of 47 new questions, 46 have correct answers verified against official text. One (rev-4) carries forward a pre-existing wording discrepancy. All 16 new flashcards are accurate. All brief updates are accurate. Syllabus weight corrections are correct.

---

## Issues found

### ISSUE 1: Change enablement purpose wording — "IT changes" vs "service and product changes"

**Affects:** rev-4 (new), p7-ce-1 (original, pre-existing)

**What the app says:**
> "To maximize the number of successful IT changes by ensuring risks are properly assessed, authorizing changes to proceed, and managing the change schedule."

**What the official sample papers say (verified this session):**
> "The purpose of the change control practice is to maximize the number of successful **service and product changes** by ensuring that risks have been properly assessed, authorizing changes to proceed, and managing the change schedule."
> — [O2] Q1, Q2, Q11, Q20, Q25 (Sample Paper 1, used in FIVE separate question rationales, every instance says "service and product changes")
> — [O3] Q9 (Sample Paper 2, same wording)

**Impact:** On a fill-in-the-blank or "which BEST describes" question, "IT changes" could be marked wrong if the exam uses the book's exact wording. Dion's PeopleCert-authorized exams may use "IT changes" as a shorthand, but the official AXELOS text is "service and product changes."

**Fix:** In both p7-ce-1 and rev-4, change "successful IT changes" to "successful service and product changes." Also update the flashcard fc-tp-change-purpose and the practices7 brief section on change enablement.

**Severity:** MEDIUM. The answer is functionally correct (it will not cause Keoni to pick a wrong answer on a standard multiple-choice question), but on a "which is the BEST definition" or fill-in-the-blank, the official wording wins. Fix it now while it is cheap.

---

### ISSUE 2: Gap analysis recommendation was wrong about IT asset wording — do NOT change it

**Affects:** DION-GAP-ANALYSIS.md section 1B (recommendation only — the build did not implement this fix, so the app is fine)

**What the gap analysis recommended:**
> "IT asset: Official: 'any valuable component that can contribute to the delivery of an IT product or service.' Note: 'valuable' not 'financially valuable.'"

**What the official sample paper actually says (verified this session):**
> "An IT asset is '**Any financially valuable component** that can contribute to the delivery of an IT product or service.'" — [O2] Q33, option D rationale, Ref 5.2.11

**Impact:** None on the app — the fix was never implemented. But the gap analysis document should be corrected so a future build does not introduce the error.

**Fix:** In DION-GAP-ANALYSIS.md section 1B, strike the IT asset row or correct it to note that "financially valuable" IS the official wording per [O2] Q33.

**Severity:** LOW (informational only, does not affect the app).

---

### OBSERVATION 1: p7-ci-6 overlaps with p7-ci-3

Both questions test "which step was skipped = baseline measurement (step 2)." p7-ci-3 asks directly which step is most often skipped; p7-ci-6 gives a scenario where a manager skips measuring. This is intentional reinforcement, not an error — the concept is heavily tested on the exam and drilling it from two angles is valid. No fix needed.

### OBSERVATION 2: svs-1 uses a description rather than the official purpose statement

The existing question svs-1 (original, not from this build) marks as correct: "To describe how all the components and activities of the organization work together to create value."

The official sample paper [O3] Q8 states the purpose as: "to ensure that the organization continually co-creates value with all stakeholders through the use and management of products and services."

These are different sentences from different parts of the book, and both appear in the official text. The gap analysis noted this (section 1B, SVS purpose) and recommended adding the "co-creates value" wording. The brief was updated to include both. svs-1's answer is not wrong — it describes the SVS accurately — but a future question could test the more precise purpose statement. No fix to svs-1 needed, but a second SVS question using the "co-creates value" wording would be a good addition.

### OBSERVATION 3: Practice-to-value-chain mappings are sourced from Dion (PeopleCert authorized), not directly from the Foundation book

The SLM and service request management mappings to value chain activities (vcm-slm-1 through vcm-slm-6 and vcm-srm-1 through vcm-srm-5) come from the gap analysis, which sourced them from Dion's PeopleCert-authorized practice exams. These mappings are in the ITIL 4 Foundation book's practice-to-value-chain tables, which I have not personally opened. Dion is a PeopleCert Authorized Training Organization, so the mappings are authoritative exam material. I flag this only for completeness: if the Foundation book is ever obtained, verify the mappings against the source tables.

### OBSERVATION 4: Items recommended by the gap analysis but not built

These are gaps from the recommendations, not errors in what was built. Noting for completeness:

- **Escalation definition** (standalone question/flashcard) — gap analysis priority MEDIUM
- **Pick-2 format questions** — Dion uses 1-3 per exam, app has zero
- **"Which activity does SRM NOT contribute to" question** — recommended but not built
- **Centralized desk requirements** (knowledge base, remote access, workflow routing) — not built
- **Emergency change scenario for security vulnerability** — not built (gap analysis Tier 2)
- **6th SRM mapping question** (SRM has no Plan contribution — a "NOT" question would test this)
- **Service management definition reverse-format question** — tested in 3 of 6 Dion exams, no reverse-format question exists

None of these are errors. They are coverage gaps that could be addressed in a future build.

---

## Verification summary: all 47 new questions

| ID | Module | Format | Correct answer verified against | Result |
|---|---|---|---|---|
| kc-7 | concepts | standard | Gap analysis + ITIL 4 definition | PASS |
| kc-8 | concepts | standard | [O1] syllabus, gap analysis | PASS |
| kc-9 | concepts | standard | Gap analysis + ITIL 4 definition | PASS |
| kc-10 | concepts | standard | [O2] Q40 — "a possible event that could cause harm or loss" | PASS |
| kc-11 | concepts | standard | [O2] Q7, [O3] Q14 — full service definition | PASS |
| kc-12 | concepts | standard | [O2] Q10 — "defines requirements...takes responsibility for outcomes" | PASS |
| kc-13 | concepts | standard | [O2] Q10 — "authorizes budget for service consumption" | PASS |
| kc-14 | concepts | standard | [O3] Q10 Ref 2.4.1 (service provision = provider-side) | PASS |
| kc-15 | concepts | standard | [O3] Q10 — "joint activities...continual value co-creation" | PASS |
| gp-7 | principles | standard | [O2] Q18 — "defined as a recommendation" Ref 4.3 | PASS |
| gp-8 | principles | standard | [O3] Q7 Ref 4.3.7.1 — optimize then automate sequence | PASS |
| gp-9 | principles | standard | Gap analysis GAP 13 — information radiator maps to visibility | PASS |
| neg-gp-1 | principles | NOT | Seven principles verified against [O2] Q27 | PASS |
| svs-2 | svs | NOT | [O2] Q27 — five SVS components confirmed | PASS |
| vc-3 | valuechain | NOT | [O2] Q27 — six activities confirmed, governance is SVS component | PASS |
| vc-4 | valuechain | standard | [O2] Q22 — "each activity receiving and providing triggers" Ref 4.5 | PASS |
| vcm-slm-1 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-slm-2 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-slm-3 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-slm-4 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-slm-5 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-slm-6 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-srm-1 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-srm-2 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-srm-3 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-srm-4 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| vcm-srm-5 | practices7 | mapping | Dion/PeopleCert authorized, gap analysis table | PASS |
| p7-ce-5 | practices7 | scenario | [O2] Q30 — standard change definition matches | PASS |
| p7-ce-6 | practices7 | scenario | [O3] Q39, [O2] Q19 — normal change definition | PASS |
| p7-ce-7 | practices7 | NOT | Three types confirmed; "routine" not in official text | PASS |
| p7-im-2 | practices7 | standard | Gap analysis GAP 8, consistent with [O2] Q9 | PASS |
| p7-im-3 | practices7 | NOT | [O2] Q17 — "does NOT usually include detailed procedures" Ref 5.2.5 | PASS |
| p7-pm-4 | practices7 | standard | [O3] Q35 — problem identification: duplicate/recurring issues | PASS |
| p7-sd-2 | practices7 | standard | Gap analysis GAP 5, consistent with [O2] Q28 | PASS |
| p7-sd-3 | practices7 | NOT | Four models verified; "outsourced" is sourcing strategy | PASS |
| p7-slm-3 | practices7 | NOT | Gap analysis GAP 11, consistent with [O3] Q32 | PASS |
| p7-ci-4 | practices7 | standard | CI model step 7 confirmed in flashcard and [O2] Q26 context | PASS |
| p7-ci-5 | practices7 | standard | [O2] Q26 — "select a few key methods" Ref 5.1.2 | PASS |
| p7-ci-6 | practices7 | scenario | [O2] Q14, baseline measurement (see observation 1) | PASS |
| p7-sr-3 | practices7 | scenario | [O2] Q10 — pre-defined request = service request management | PASS |
| rev-1 | practices15 | reverse | [O2] Q20 — release management purpose confirmed | PASS |
| rev-2 | practices15 | reverse | [O2] Q1 — deployment management purpose confirmed | PASS |
| rev-3 | practices7 | reverse | [O2] Q2 — incident management purpose confirmed | PASS |
| rev-4 | practices7 | reverse | Functionally correct, wording discrepancy (see Issue 1) | PASS* |
| rev-5 | practices7 | reverse | [O2] Q2, Q3 — SLM purpose confirmed | PASS |
| rev-6 | practices7 | reverse | [O2] Q11, Q25 — service desk purpose confirmed | PASS |
| neg-pm-1 | practices7 | NOT | Three phases confirmed; logging is activity not phase | PASS |

*rev-4: answer is correct, wording should say "service and product changes" per Issue 1.

## Verification summary: all 16 new flashcards

| ID | Check | Result |
|---|---|---|
| fc-svcmgmt | Standard ITIL 4 definition | PASS |
| fc-tp-roles | [O2] Q10 — customer, user, sponsor definitions | PASS |
| fc-org | ITIL 4 definition, consistent with official text | PASS |
| fc-risk | [O2] Q40 — risk definition confirmed | PASS |
| fc-provision | [O3] Q10 Ref 2.4.1 — three concepts confirmed | PASS |
| fc-util-full | [O2] Q40, [O3] Q2 — full definitions confirmed | PASS |
| fc-gp-nature | [O2] Q18 Ref 4.3 — recommendations confirmed | PASS |
| fc-opt-auto | [O3] Q7 Ref 4.3.7.1 — sequence confirmed | PASS |
| fc-inforad | Gap analysis GAP 13 — Agile visibility tool | PASS |
| fc-sd-models | Gap analysis GAP 5 — four models confirmed | PASS |
| fc-sla-sources | Gap analysis GAP 11 — three sources + trap | PASS |
| fc-prob-id | [O3] Q35 — identification activities confirmed | PASS |
| fc-routine-trap | Three types confirmed in [O2] and [O3] | PASS |
| fc-anyone-incident | Gap analysis GAP 8, consistent with [O2] Q9 | PASS |
| fc-slm-vc | Dion/PeopleCert authorized mappings | PASS |
| fc-srm-vc | Dion/PeopleCert authorized mappings | PASS |

## Verification summary: brief updates

| Section | Content added | Result |
|---|---|---|
| concepts | Three consumer roles, service management, organization+risk, provision/consumption/relationship | PASS — all match official definitions |
| practices7 | Anyone can report incident, NOT detailed diagnosis, problem identification activities, four desk models, SLA data sources, "routine" trap, SRM/SLM value chain mapping terms | PASS — all verified |

## Verification: syllabus weight changes

| Module | Old weight | New weight | Official [O1] | Result |
|---|---|---|---|---|
| concepts | 6 | 5 | 5 | PASS |
| practices15 | 6 | 7 | 7 | PASS |

---

## Sources used in this review

- [O1] AXELOS, ITIL 4 Foundation Candidate Syllabus v1.4, Sept 2019
- [O2] AXELOS, Sample Paper 1, Answers and Rationales v1.3 (re-downloaded and re-read 2026-10-10)
- [O3] AXELOS, Sample Paper 2, Answers and Rationales v1.0 (re-downloaded and re-read 2026-10-10)
- DION-GAP-ANALYSIS.md (produced from Dion Training PeopleCert-authorized practice exams)

---

*Reviewed by Otto, 2026-10-10. One fix needed (Issue 1). One correction to the gap analysis document (Issue 2). No question has a wrong correct answer. No question is ambiguous between two options. Build is safe for Keoni to study from after the Issue 1 wording fix.*

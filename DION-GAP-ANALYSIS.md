# Dion Exam Gap Analysis vs. Study App

Cross-reference of Jason Dion's 240 ITIL 4 Foundation practice questions (6 exams, 40 each) against the study app content in `/Users/musubi/itil-course/data/`. Produced by Otto, 2026-10-10.

Dion Training is a PeopleCert Authorized Training Organization. These questions are authoritative exam-weight material.

---

## 0. Syllabus weight corrections

The app's `syllabus.json` has two module weights that do not match the official PeopleCert syllabus (v1.4, [O1]).

| Module | App says | Should be | Impact |
|---|---|---|---|
| Key Concepts | 6 | **5** | Overstates by 1 question |
| 15 Practices (purpose + terms) | 6 | **7** | Understates by 1 question |

Total still sums to 40. Fix `syllabus.json` weights to match official allocation.

---

## 1. Definitions that need to be added or corrected

### 1A. Missing definitions (no question, flashcard, or brief definition exists)

These terms appear in Dion exams as standalone definition questions. The app either omits them entirely or lists the word without defining it.

| # | Term | Official definition (Dion/PeopleCert wording) | Priority |
|---|---|---|---|
| 1 | **Service management** | "A set of specialized organizational capabilities for enabling value to customers in the form of services." | HIGH — tested in 3 of 6 exams |
| 2 | **User** | "A person who uses services." | HIGH — tested in Customer/User/Sponsor trio questions, 4 of 6 exams. The brief mentions the term but never gives the standalone definition. |
| 3 | **Organization** | "A person or group of people that has its own functions with responsibilities, authorities, and relationships to achieve its objectives." | MEDIUM — tested in 2 of 6 exams |
| 4 | **Escalation** | "Passing an incident to the next higher level of technician." | MEDIUM — tested in service desk context |
| 5 | **Risk** (standalone) | "A possible event that could cause harm or loss, or make it more difficult to achieve objectives." | MEDIUM — the app mentions risk in kc-5 but never isolates the definition as a testable item |

### 1B. Definitions present but needing exact wording alignment

The app covers these terms but the wording drifts from the precise exam phrasing Dion uses. On a fill-in-the-blank or "which is the BEST definition" question, the difference matters.

| Term | App wording | Dion/official wording | Fix needed |
|---|---|---|---|
| **Service** | Brief says "a means of enabling value co-creation by facilitating outcomes customers want, without the customer having to manage specific costs and risks" | Same — but no question tests this definition directly. | Add a question that tests the full definition, especially the "without the customer having to manage specific costs and risks" clause. |
| **Warranty** | App says "fitness for use" and "how well it performs" | Official: "the assurance that a product or service will meet agreed requirements." The "fit for use" shorthand is useful but the full sentence is what Dion tests. | Add the full sentence to the flashcard and brief. |
| **Utility** | App says "fitness for purpose" | Official: "the functionality offered by a product or service to meet a particular need." Same note. | Add the full sentence. |
| **IT asset** | Brief says "any financially valuable component that contributes to delivering an IT product or service" | Official: "any valuable component that can contribute to the delivery of an IT product or service." Note: "valuable" not "financially valuable." | Correct the brief. |
| **Configuration item** | Question p15-4 rationale mentions it; brief gives a definition. | Official: "any component that needs to be managed in order to deliver an IT service." | Verify brief wording matches exactly. |
| **SVS purpose** | svs-1 says "how all the components and activities of the organization work together to create value" | Dion tests: "ensure that the organization continually co-creates value with all stakeholders." These are two different sentences from different parts of the book. Both are testable. | Add the "continually co-creates value with all stakeholders" wording. |

### 1C. Customer/User/Sponsor — needs standalone questions

The brief covers all three roles in one paragraph. Dion tests them individually: "Which role authorizes budget?" / "Which role defines requirements?" / "Which role uses the service?" These appeared in 4 of 6 exams. The app needs at least 3 questions, one per role.

---

## 2. Concepts the app does not cover at all

### 2A. CRITICAL GAPS (tested in every or nearly every exam)

#### GAP 1: Practice-to-value-chain mapping (SLM)
**Frequency:** Every exam, different mapping each time.
**What Dion tests:** "How does service level management contribute to the [plan/engage/design & transition/obtain-build/deliver & support/improve] value chain activity?"
**App coverage:** Zero. No question, flashcard, or brief connects any practice to a specific value chain activity.

Mappings to add (SLM):

| Value chain activity | SLM contribution |
|---|---|
| Plan | Provides information about actual service performance and trends |
| Engage | Collects and processes feedback from customers and users |
| Design & transition | Provides feedback from interactions with customers into new or changed services |
| Obtain/build | Provides objectives for component and service performance |
| Deliver & support | Collects feedback during interactions, communicates performance objectives to operations teams |
| Improve | Uses feedback from users about service and requirements from customers to make service better |

#### GAP 2: Practice-to-value-chain mapping (service request management)
**Frequency:** Every exam, different mapping each time.
**What Dion tests:** "How does service request management contribute to the [engage/obtain-build/design & transition/deliver & support/improve] value chain activity?"
**App coverage:** Zero.

Mappings to add (service request management):

| Value chain activity | Service request management contribution |
|---|---|
| Engage | Collects user-specific requirements, sets expectations, provides status updates |
| Obtain/build | Acquires pre-approved service components to help fulfill service requests |
| Design & transition | Initiates standard changes to fulfill service requests |
| Deliver & support | Ensures users continue to be productive when they need assistance |
| Improve | Provides trend, quality, and feedback information about requests |

#### GAP 3: "Which is NOT a value chain activity?" trap questions
**Frequency:** Every exam.
**What Dion tests:** Lists that mix real activities with trap answers. Common traps:
- "Practice" (not an activity, it is an SVS component)
- "Guiding principles" (SVS component, not activity)
- "Continual improvement" (this IS an activity AND an SVS component — the trap is when it appears alongside clearly wrong items)
- "Service relationships" (not an activity)
**App coverage:** vc-1 asks "which ARE the six activities" but never asks "which is NOT." The negative framing catches different knowledge.

#### GAP 4: "Routine" is NOT a type of change
**Frequency:** 5 of 6 exams.
**What Dion tests:** "Which of the following is a type of change? Standard / Normal / Emergency / Routine." The answer is any of the first three depending on context, but "Routine" is always wrong.
**App coverage:** The app has p7-ce-2 and p7-ce-3 on change types but never surfaces "routine" as a distractor. Keoni needs to be inoculated against this trap.

### 2B. HIGH-PRIORITY GAPS (tested in 3+ exams)

#### GAP 5: Service desk models
**What Dion tests:** Name and distinguish four service desk models: local, centralized, virtual, follow-the-sun. Also: what does a centralized service desk require? (Knowledge base, remote access tools, workflow systems for routing and escalation.)
**App coverage:** p7-sd-1 covers the purpose. Zero coverage of the four models.

#### GAP 6: Guiding principles are RECOMMENDATIONS, not mandatory
**What Dion tests:** "Guiding principles should NEVER be changed" — true or false? True. They are recommendations that apply universally regardless of changes in strategy or structure.
**App coverage:** The brief says "read these as behaviours, not slogans" but never states the official word: they are RECOMMENDATIONS and should never be changed. The flashcards do not cover this. The ITIL notes file [O2] Q18 confirms this is official.

#### GAP 7: Optimization vs. Automation as distinct concepts
**What Dion tests:** Optimization = improving efficiency. Automation = using technology with limited human involvement. These are two distinct things under the same principle. The ORDER matters: identify what can be improved, eliminate what is unnecessary, then automate what remains.
**App coverage:** gp-5 covers the order but does not define the two terms separately or test the three-step sequence (identify, eliminate, automate remaining).

#### GAP 8: Anyone can report an incident
**What Dion tests:** "Who can report an incident?" Answer: anyone — users, technical staff, monitoring tools. NOT limited to end users.
**App coverage:** Not covered. p7-im-1 covers purpose only.

#### GAP 9: Incident management should NOT include detailed procedures for diagnosis
**What Dion tests:** "What should incident management NOT include?" Answer: detailed procedures for diagnosing incidents. It should have procedures for logging and managing, but diagnosis details belong in knowledge articles or problem management.
**App coverage:** Not covered. The ITIL notes mention this ([O2] Q17) but the app does not.

#### GAP 10: Problem identification activities
**What Dion tests:** "Which is an activity of problem identification?" Correct: trend analysis, detecting duplicates, analyzing linked incidents. Trap: logging (that is incident management).
**App coverage:** p7-pm-2 names the three phases but does not break out the activities within problem identification.

#### GAP 11: SLA data sources and perspective
**What Dion tests:** SLA data should come from: customer feedback, business metrics, operational metrics. Trap: competitor metrics (NOT a valid SLA data source). SLAs measure from the CUSTOMER's point of view, not the provider's.
**App coverage:** p7-slm-2 covers the watermelon effect (close) but does not name the three valid data sources or the competitor-metrics trap.

#### GAP 12: Service provision vs. service consumption vs. service relationship management
**What Dion tests:** Three distinct concepts: provision (provider side), consumption (consumer side), and service relationship management (joint activities to keep co-creating value). The brief lists these as undefined terms. The app has no question or definition for any of them.
**App coverage:** Listed in brief terms list only. No definition, no question, no flashcard.

### 2C. MEDIUM-PRIORITY GAPS (tested in 1-2 exams)

#### GAP 13: Information radiator
**What Dion tests:** An information radiator is an Agile visibility tool (task board, dashboard, etc.) and maps to the guiding principle "collaborate and promote visibility."
**App coverage:** Zero.

#### GAP 14: Value chain activities receive and provide triggers
**What Dion tests:** Activities receive inputs from and provide outputs/triggers to other activities. They are interconnected, not independent sequential steps.
**App coverage:** vc-1 mentions "interconnect in many combinations" but does not use the word "triggers" and does not test the concept that each activity both receives and provides triggers for further actions.

#### GAP 15: Continual improvement adoption advice
**What Dion tests:** Select a few key methods that suit the organization. Do not try to adopt all improvement methods at once.
**App coverage:** Not in questions. The ITIL notes reference this ([O2] Q26) but the app does not surface it.

---

## 3. Question types the app is missing

The app has 42 questions, all in standard "which is correct" format. Dion uses several additional formats that the app needs.

### 3A. Negative questions ("Which is NOT...")
**Frequency:** 8-12 per exam (roughly 20-30% of all questions).
**Examples:**
- "Which is NOT an activity in the service value chain?"
- "Which is NOT a source of data for service level management?"
- "Which should incident management NOT include?"
- "Which is NOT a type of change in ITIL 4?"

**App coverage:** Zero negative-format questions. This is the single biggest format gap. Negative questions test a different skill (process of elimination, identifying the odd one out) and trip students who only studied affirmative recall.

### 3B. Fill-in-the-blank / missing-word questions
**Frequency:** 3-5 per exam.
**Format:** "_____ is the practice of [official purpose statement]." Student must identify which practice matches the purpose.
**Examples:**
- "[?] is the practice of making new and changed services and features available for use."
- "[?] is the practice of minimizing the negative impact of incidents by restoring normal service operation as quickly as possible."

**App coverage:** The app tests purposes but always names the practice in the stem and asks "what is the purpose." Dion flips this: gives the purpose, asks which practice.

### 3C. Pick-2 / list questions
**Frequency:** 1-3 per exam.
**Format:** "Which TWO of the following are..." or "Identify the missing words: _____ and _____."
**Examples:**
- "Which TWO are activities of problem identification?"
- "Identify the missing words: Utility is [?] and warranty is [?]."

**App coverage:** Zero. All questions are single-answer multiple choice.

### 3D. Scenario-to-value-chain-activity mapping
**Frequency:** 3-5 per exam.
**Format:** Describes a specific action within a practice and asks which value chain activity it contributes to.

**App coverage:** vc-2 asks about plan. No other activity-mapping scenarios exist. Need at least 6 more (one per activity, mapped through SLM or service request management).

---

## 4. High-frequency exam patterns needing more coverage

### 4A. Patterns tested in EVERY exam that need more questions

| Pattern | Current coverage | Questions needed |
|---|---|---|
| Continual improvement model — scenario-based (not just "name the steps") | 3 questions (p7-ci-1, ci-2, ci-3) + 7 flashcards | Add 3-4 scenario questions: "A team just completed an improvement. What step comes next?" or "A manager skipped baselining. What is the consequence?" The app has the recall; it needs the application. |
| Three change types — scenario-based | 3 questions (p7-ce-2, ce-3, ce-4) | Add 2-3 more scenarios: "A new user account is provisioned using a documented procedure. What type of change?" (Standard.) "A planned software release is scheduled for next month." (Normal, NOT emergency.) |
| Practice purpose identification | 6 purpose questions (p15-1 through p15-6) | Add the remaining 9 of 15 practices. Every exam has 3-5 "what is the purpose of [practice]" questions, and Dion rotates through all 15. Missing: relationship management, supplier management, IT asset management, continual improvement (as a practice), change enablement, incident management, problem management, service request management, service level management. Several of these have purpose coverage under practices7 but NOT in the fill-in-the-blank reverse format. |
| Guiding principles — scenario-based | 6 questions (gp-1 through gp-6) | Good breadth but add 2-3 more scenario variants, especially for "focus on value" (the exam tests "who is the consumer?" angle) and "collaborate and promote visibility" (information radiator). |
| Known error vs problem vs workaround — scenario rotation | 3 questions (p7-pm-1, pm-2, pm-3) | Add 2 more scenarios that test "when does a problem become a known error?" and "does a workaround close the problem?" from a different angle. |

### 4B. Patterns tested in 4-5 exams that need coverage

| Pattern | Current coverage | Questions needed |
|---|---|---|
| Customer/User/Sponsor role identification | Brief paragraph only | Add 3 standalone questions, one per role |
| "Which is NOT" format (see section 3A) | Zero | Add 8-10 across all modules |
| Practice-purpose reverse format (see section 3B) | Zero | Add 5-6 covering the most-tested practices |

---

## 5. Recommendations for what to build — prioritized by exam weight

### TIER 1: BUILD IMMEDIATELY (covers ~30-35% of Dion exam content that app currently misses)

**5.1 Practice-to-value-chain mapping questions (SLM + service request management)**
- Build 12 questions: 6 for SLM (one per value chain activity) and 6 for service request management (5 activities + 1 "which activity does this NOT contribute to")
- Add a brief section or flashcard set with the mapping tables from section 2A above
- This is the single highest-impact addition. Dion tests it in EVERY exam with different mappings, and the app has ZERO coverage.

**5.2 Negative-format questions across all modules**
- Convert or create 8-10 questions in "which is NOT" format:
  - "Which is NOT a service value chain activity?" (trap: practice, governance, service relationship)
  - "Which is NOT a type of change in ITIL 4?" (trap: routine)
  - "Which is NOT a source of data for SLM?" (trap: competitor metrics)
  - "Which should incident management NOT include?" (trap: detailed diagnosis procedures)
  - "Which is NOT a guiding principle?" (trap: maximize profit, ensure compliance)
  - "Which is NOT a component of the SVS?" (trap: a value chain activity name)
  - "Which is NOT a phase of problem management?" (trap: problem logging)
  - "Which is NOT a service desk model?" (trap: outsourced)

**5.3 Missing definitions — add to flashcards and as questions**
- Service management, User, Organization, Escalation, Risk (standalone)
- Fix IT asset wording ("valuable" not "financially valuable")
- Add full-sentence Utility and Warranty definitions alongside the shorthand
- Add SVS "continually co-creates value with all stakeholders" wording

**5.4 Customer/User/Sponsor standalone questions**
- 3 questions, one per role, using the exact ITIL definition as the correct answer

### TIER 2: BUILD NEXT (covers ~15-20% of missed content)

**5.5 Fill-in-the-blank (reverse purpose) questions**
- 6 questions: give the purpose statement, ask which practice
- Cover: release management, deployment management, incident management, problem management, change enablement, service level management

**5.6 Service desk models**
- 1-2 questions covering local/centralized/virtual/follow-the-sun
- 1 question on centralized desk requirements (knowledge base, remote access, workflow routing)

**5.7 Change type scenario expansion**
- "New user account provisioned via documented procedure" = standard
- "Planned software release scheduled for next month" = normal (NOT emergency)
- "Security vulnerability patch needed immediately" = emergency
- Include "routine" as a distractor in at least one question

**5.8 Guiding principles — RECOMMENDATIONS wording**
- 1 question testing that principles are recommendations, not rules
- 1 question testing that they should never be changed
- 1 question or flashcard defining optimization vs. automation as distinct concepts

**5.9 Service provision / service consumption / service relationship management**
- 1-2 questions and flashcard definitions for these three concepts

### TIER 3: BUILD WHEN TIME ALLOWS (fills remaining gaps)

**5.10 Problem identification activities**
- 1 question: trend analysis, detecting duplicates, analyzing linked incidents vs. logging (trap)

**5.11 SLA data sources**
- 1 question: customer feedback, business metrics, operational metrics vs. competitor metrics (trap)

**5.12 Continual improvement model — additional scenario questions**
- 2-3 questions testing steps 6 ("did we get there" = compare against baseline) and step 7 ("how do we keep the momentum going" = loops back to vision)
- 1 question on "select a few key methods, don't try all"

**5.13 Anyone can report an incident**
- 1 question

**5.14 Incident management should NOT include detailed diagnosis procedures**
- 1 question (also serves as a negative-format question)

**5.15 Information radiator**
- 1 question mapping it to "collaborate and promote visibility"

**5.16 Value chain triggers**
- 1 question testing that activities receive and provide triggers, are interconnected

**5.17 Pick-2 format questions**
- 2-3 questions in this format across any modules

---

## 6. Summary counts

| Category | Items in app now | Items needed | Gap |
|---|---|---|---|
| Questions | 42 | ~75-80 | ~35 new questions |
| Flashcards | 36 | ~50 | ~14 new cards |
| Definitions with exact wording | ~18 | 23 | 5 missing, 3 need wording fixes |
| Value chain mappings | 0 | 12 | 12 (SLM 6 + SRM 6) |
| Negative-format questions | 0 | 8-10 | 8-10 |
| Fill-in-the-blank questions | 0 | 5-6 | 5-6 |
| Syllabus weight corrections | 2 errors | 0 errors | Fix 2 values |
| Brief sections needing updates | 3 (concepts, practices7, practices15) | — | Add service desk models, guiding principles nature, SLA sources |

---

## 7. What the app already does well

Credit where due — these are covered and match Dion's exam patterns:

- Value, output/outcome, utility/warranty definitions and the reversal trap
- Change enablement purpose and "maximize successful changes" emphasis
- Three change types with scenario-based questions
- Standard change pre-authorization model
- Incident vs. problem vs. known error vs. event sorting
- Workaround lifecycle (closes incident, does not close problem)
- Release vs. deployment distinction with feature flag example
- Continual improvement model 7 steps in sequence
- Watermelon effect
- All 7 guiding principles with scenario questions
- Four dimensions recall
- SVS components
- Service value chain 6 activities

The foundation is solid. The gaps are in coverage breadth (practice-to-value-chain mapping, negative questions, reverse-format questions) and a handful of specific terms and concepts that Dion hammers in every exam.

---

*Produced from: syllabus.json, questions.json, briefs.json, flashcards.json vs. 240 Dion exam questions cataloged by Jeezy 2026-10-10.*

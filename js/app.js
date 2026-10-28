/* app.js — ITIL 4 Foundation trainer: router + progress/localStorage + Leitner deck + views.
 * Vanilla, no build step. Content lives in data/*.json so items can be added without touching this file.
 *
 * Deliberate omission: there is no timer anywhere in this app. Module practice, mixed practice,
 * and the deck are all self-paced. Timed simulation gets added only when it is asked for.
 */
(function () {
  window.ITIL = window.ITIL || {};
  var DAY = 24 * 60 * 60 * 1000;
  var APP_DIR = '.';

  /* ---------------------------------------------------------------- util */
  function el(tag, attrs) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === null || v === undefined) return;
      if (k === 'class') node.className = v;
      else if (k === 'html') node.innerHTML = v;
      else if (k === 'style') node.setAttribute('style', v);
      else if (k.indexOf('on') === 0 && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (v === true) node.setAttribute(k, '');
      else node.setAttribute(k, v);
    });
    for (var i = 2; i < arguments.length; i++) append(node, arguments[i]);
    return node;
  }
  function append(node, kid) {
    if (kid === null || kid === undefined || kid === false) return;
    if (Array.isArray(kid)) return kid.forEach(function (k) { append(node, k); });
    node.appendChild(typeof kid === 'object' ? kid : document.createTextNode(String(kid)));
  }
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
    }
    return arr;
  }
  function letter(i) { return i == null || i < 0 ? null : String.fromCharCode(65 + i); }
  ITIL.util = { el: el, shuffle: shuffle, letter: letter };

  /* ------------------------------------------------------- local storage */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { }
  }

  /* ---------------------------------------------------------- progress */
  var PROG_KEY = 'itil-progress-v1';
  ITIL.progress = {
    state: load(PROG_KEY, { answers: {}, visited: {} }),
    /* A question already answered correctly is never downgraded — the board tracks
     * "have you ever got this right", not "what did you do on the last pass". */
    record: function (qid, correct, moduleId) {
      var existing = this.state.answers[qid];
      if (existing && existing.correct && !correct) return;
      this.state.answers[qid] = { correct: !!correct, ts: Date.now(), module: moduleId };
      save(PROG_KEY, this.state);
      renderTopBar();
    },
    visit: function (moduleId) { this.state.visited[moduleId] = true; save(PROG_KEY, this.state); },
    isCorrect: function (qid) { var a = this.state.answers[qid]; return !!(a && a.correct); }
  };

  /* -------------------------------------------------------- coach log */
  /* A plain-text, always-in-DOM record of every submitted question: the pick,
   * the reasoning typed before the reveal, and the keyed answer. Newest first.
   * This is the surface Claude reads to coach — keep it readable as text. */
  var COACH_KEY = 'itil-coachlog-v1';
  var COACH_MAX = 300;

  function normalizeEntry(e) {
    return {
      ts: e.ts || Date.now(),
      moduleId: e.moduleId || '—',
      questionId: e.questionId || '—',
      stem: e.stem || '',
      chosenLetter: e.chosenLetter || null,
      chosenText: e.chosenText || '',
      reasoning: (e.reasoning || '').trim(),
      correctLetter: e.correctLetter || null,
      correctText: e.correctText || '',
      verdict: e.correct ? 'CORRECT' : 'INCORRECT'
    };
  }

  ITIL.coachLog = {
    state: load(COACH_KEY, { entries: [] }),
    add: function (entry) {
      this.state.entries = [normalizeEntry(entry)].concat(this.state.entries).slice(0, COACH_MAX);
      save(COACH_KEY, this.state);
      renderCoachLog();
    },
    clear: function () {
      this.state.entries = [];
      save(COACH_KEY, this.state);
      renderCoachLog();
    }
  };

  function stamp(ts) {
    var d = new Date(ts);
    function p(n) { return (n < 10 ? '0' : '') + n; }
    return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate()) +
      ' ' + p(d.getHours()) + ':' + p(d.getMinutes());
  }

  function coachLine(label, value) {
    return el('div', { class: 'coach-line' }, el('span', { class: 'coach-key' }, label + ': '), value);
  }

  function renderCoachLog() {
    var host = document.getElementById('coach-log-entries');
    if (!host) return;
    host.innerHTML = '';
    var entries = ITIL.coachLog.state.entries;
    if (!entries.length) {
      host.appendChild(el('p', { class: 'muted coach-log-empty' },
        'No entries yet — answer a question, write your reasoning, and submit.'));
      return;
    }
    entries.forEach(function (e, i) {
      var pick = e.chosenLetter ? e.chosenLetter + '. ' + e.chosenText : '(no option selected)';
      var key = e.correctLetter ? e.correctLetter + '. ' + e.correctText : e.correctText;
      host.appendChild(el('article', { class: 'coach-entry ' + (e.verdict === 'CORRECT' ? 'ok' : 'no') },
        el('div', { class: 'coach-entry-head' },
          el('span', { class: 'coach-verdict' }, e.verdict),
          el('span', { class: 'coach-meta' },
            ' · ' + e.moduleId + ' / ' + e.questionId + ' · ' + stamp(e.ts) + ' · entry ' + (entries.length - i))),
        coachLine('Question', e.stem),
        coachLine('My pick', pick),
        coachLine('My reasoning', e.reasoning || '(none written)'),
        coachLine('Correct answer', key),
        coachLine('Result', e.verdict)
      ));
    });
  }

  function wireCoachLog() {
    var btn = document.getElementById('coach-log-clear');
    if (btn) {
      btn.addEventListener('click', function () {
        if (ITIL.coachLog.state.entries.length &&
          typeof confirm === 'function' && !confirm('Clear the whole reasoning log?')) return;
        ITIL.coachLog.clear();
      });
    }
    renderCoachLog();
  }

  /* ---------------------------------------------------- Leitner scheduler */
  var LEIT_KEY = 'itil-leitner-v1';
  var BOX_DAYS = { 1: 0, 2: 1, 3: 3, 4: 7, 5: 16 };
  ITIL.leitner = {
    state: load(LEIT_KEY, {}),
    _card: function (id) {
      if (!this.state[id]) this.state[id] = { box: 1, due: 0 };
      return this.state[id];
    },
    grade: function (id, ok) {
      var c = this._card(id);
      c.box = ok ? Math.min(5, c.box + 1) : 1;
      c.due = Date.now() + BOX_DAYS[c.box] * DAY;
      save(LEIT_KEY, this.state);
    },
    dueCards: function (cards) {
      var now = Date.now(), self = this;
      return cards.filter(function (c) { var s = self.state[c.id]; return !s || s.due <= now; });
    },
    distribution: function (cards) {
      var d = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }, self = this;
      cards.forEach(function (c) { var s = self.state[c.id]; d[s ? s.box : 1]++; });
      return d;
    }
  };

  /* --------------------------------------------------------- data loader */
  ITIL.data = { syllabus: null, questions: [], flashcards: [], briefs: {}, byModule: {}, moduleById: {} };

  function fetchJSON(path) {
    return fetch(path, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status + ' for ' + path);
      return r.json();
    });
  }

  function indexData() {
    ITIL.data.syllabus.modules.forEach(function (m) {
      ITIL.data.moduleById[m.id] = m;
      ITIL.data.byModule[m.id] = [];
    });
    ITIL.data.questions.forEach(function (q) {
      if (ITIL.data.byModule[q.module]) ITIL.data.byModule[q.module].push(q);
    });
  }

  function loadAll() {
    return Promise.all([
      fetchJSON('data/syllabus.json'),
      fetchJSON('data/questions.json'),
      fetchJSON('data/flashcards.json'),
      fetchJSON('data/briefs.json')
    ]).then(function (res) {
      ITIL.data.syllabus = res[0];
      ITIL.data.questions = res[1].questions;
      ITIL.data.flashcards = res[2].cards;
      ITIL.data.briefs = res[3].briefs;
      indexData();
    });
  }

  /* ----------------------------------------------------------- top bar */
  function overallStats() {
    var total = ITIL.data.questions.length, done = 0;
    ITIL.data.questions.forEach(function (q) { if (ITIL.progress.isCorrect(q.id)) done++; });
    return { total: total, done: done, pct: total ? Math.round(done / total * 100) : 0 };
  }
  function moduleStats(moduleId) {
    var qs = ITIL.data.byModule[moduleId] || [];
    var done = qs.filter(function (q) { return ITIL.progress.isCorrect(q.id); }).length;
    return { total: qs.length, done: done, pct: qs.length ? Math.round(done / qs.length * 100) : 0 };
  }

  function renderTopBar() {
    var bar = document.getElementById('top-progress-fill');
    var label = document.getElementById('top-progress-label');
    if (!bar || !ITIL.data.syllabus) return;
    var s = overallStats();
    bar.style.width = s.pct + '%';
    label.textContent = 'Overall readiness ' + s.pct + '%  (' + s.done + '/' + s.total + ' practice questions answered correctly)';
  }

  /* One colour per section; every soft fill and border tint is derived from it in CSS,
   * so a retheme only has to touch the hex in syllabus.json. */
  function modStyle(m) { return '--mod:' + m.color; }

  /* ------------------------------------------------- question renderer */
  /* Two-stage, commit-then-reveal:
   *   Stage 1 — pick an option and write why. Nothing is revealed; the pick stays changeable.
   *   Stage 2 — Submit reveals the verdict, the rationale for the pick and for the key,
   *             keeps the typed reasoning on screen as real text, and logs the exchange.
   * Rationales are never shown before submit. That ordering is the whole point.
   */
  function renderQuestion(q, moduleId, onSubmitted) {
    var submitted = false;
    var selected = -1;
    var optionEls = [];

    var list = el('div', { class: 'q-options', role: 'radiogroup', 'aria-label': 'Answer options' });
    q.options.forEach(function (opt, i) {
      var btn = el('button', {
        type: 'button', class: 'q-option', role: 'radio', 'aria-checked': 'false',
        onClick: function () { select(i); }
      },
        el('span', { class: 'q-marker' }, letter(i)),
        el('span', { class: 'q-optext' }, opt.text)
      );
      var item = el('div', { class: 'q-item' }, btn);
      optionEls.push({ btn: btn, item: item, opt: opt });
      list.appendChild(item);
    });

    var whyId = 'q-why-' + q.id;
    var whyInput = el('textarea', {
      class: 'q-why-input', id: whyId, rows: '4',
      placeholder: 'One or two lines — what made this the right answer to you?'
    });
    var whyBlock = el('div', { class: 'q-why' },
      el('label', { class: 'q-why-label', for: whyId }, 'Why did you pick this?'),
      whyInput,
      el('div', { class: 'q-why-hint muted' },
        'Optional, but writing it first is the point — commit to your reasoning before the answer shows.')
    );

    var hint = el('span', { class: 'q-submit-hint muted' }, 'Pick an option to enable Submit. Nothing is revealed until then.');
    var submitBtn = el('button', {
      type: 'button', class: 'btn btn-primary', disabled: true,
      onClick: function () { submit(); }
    }, 'Submit answer');
    var submitRow = el('div', { class: 'q-submitrow' }, submitBtn, hint);

    var whyRecap = el('div', { class: 'q-why-recap hidden' });
    var result = el('div', { class: 'q-result hidden' });
    // <details> keeps its content in the DOM (and in extracted page text) while collapsed
    var moreBlock = el('details', { class: 'q-more hidden' });

    function select(idx) {
      if (submitted) return;
      selected = idx;
      optionEls.forEach(function (o, i) {
        var on = i === idx;
        o.btn.setAttribute('aria-checked', on ? 'true' : 'false');
        o.btn.classList.toggle('is-selected', on);
      });
      submitBtn.disabled = false;
      submitBtn.removeAttribute('disabled');
      hint.textContent = 'Selection is changeable until you submit.';
    }

    function rationaleNode(opt, lead) {
      return el('div', { class: 'q-rationale' }, el('span', { class: 'q-verdict' }, lead), opt.rationale);
    }

    function submit() {
      if (submitted || selected < 0) return;
      submitted = true;

      var chosen = q.options[selected];
      var correctIdx = -1;
      q.options.forEach(function (o, i) { if (o.correct && correctIdx < 0) correctIdx = i; });
      var reasoning = (whyInput.value || '').trim();

      optionEls.forEach(function (o, i) {
        o.btn.classList.remove('is-selected');
        if (o.opt.correct) o.btn.classList.add('is-correct');
        if (i === selected && !o.opt.correct) o.btn.classList.add('is-wrong');
        o.btn.disabled = true;
      });

      // Two rationales, not four: why the pick misses (if it does) and why the key is the key.
      if (!chosen.correct) {
        optionEls[selected].item.appendChild(
          rationaleNode(chosen, 'Why your pick (' + letter(selected) + ') is not the answer:'));
      }
      if (correctIdx >= 0) {
        optionEls[correctIdx].item.appendChild(
          rationaleNode(q.options[correctIdx], 'Why ' + letter(correctIdx) + ' is the right answer:'));
      }

      // The remaining rationales stay in the DOM (extractable) but out of the way.
      var others = [];
      optionEls.forEach(function (o, i) {
        if (i === selected || i === correctIdx) return;
        others.push(el('div', { class: 'q-rationale is-muted' },
          el('span', { class: 'q-verdict' }, letter(i) + '. ' + o.opt.text),
          o.opt.rationale));
      });
      if (others.length) {
        moreBlock.appendChild(el('summary', { class: 'q-more-summary' },
          "Show the other options' rationales (" + others.length + ')'));
        moreBlock.appendChild(el('div', { class: 'q-more-body' }, others));
        moreBlock.classList.remove('hidden');
      }

      // A textarea's value is invisible to text extraction, so the typed reasoning is
      // echoed into the DOM as real text next to the verdict.
      whyBlock.classList.add('hidden');
      whyRecap.classList.remove('hidden');
      whyRecap.appendChild(el('div', { class: 'q-why-recap-label' }, 'Your reasoning'));
      whyRecap.appendChild(el('p', { class: 'q-why-recap-text' },
        reasoning || 'You did not write your reasoning for this one.'));

      submitRow.classList.add('hidden');

      result.classList.remove('hidden');
      result.classList.add(chosen.correct ? 'good' : 'bad');
      result.appendChild(el('div', {}, chosen.correct
        ? 'Correct.'
        : 'Not this one — the keyed answer is highlighted above, with why yours misses it.'));
      result.appendChild(el('div', { class: 'q-result-detail' },
        'You picked ' + letter(selected) + '.' +
        (chosen.correct ? '' : ' The keyed answer is ' + letter(correctIdx) + '.')));

      ITIL.coachLog.add({
        moduleId: moduleId,
        questionId: q.id,
        stem: q.stem,
        chosenLetter: letter(selected),
        chosenText: chosen.text,
        reasoning: reasoning,
        correctLetter: correctIdx >= 0 ? letter(correctIdx) : null,
        correctText: correctIdx >= 0 ? q.options[correctIdx].text : '',
        correct: !!chosen.correct
      });

      ITIL.progress.record(q.id, !!chosen.correct, moduleId);
      onSubmitted({ correct: !!chosen.correct, id: q.id });
    }

    return el('div', { class: 'question' },
      el('div', { class: 'q-stem' }, q.stem),
      list, whyBlock, submitRow, whyRecap, result, moreBlock
    );
  }

  /* ---------------------------------------------------------- dashboard */
  function viewDashboard(root) {
    var syl = ITIL.data.syllabus;
    var exam = syl.exam;
    root.innerHTML = '';

    var facts = el('div', { class: 'exam-facts' },
      el('div', { class: 'fact' }, el('div', { class: 'fact-num' }, exam.questions), el('div', { class: 'fact-label' }, 'Questions')),
      el('div', { class: 'fact' }, el('div', { class: 'fact-num' }, exam.minutes + ' min'), el('div', { class: 'fact-label' }, 'Exam length')),
      el('div', { class: 'fact' }, el('div', { class: 'fact-num' }, exam.passMark + '/40'), el('div', { class: 'fact-label' }, 'Pass mark (' + exam.passPct + '%)')),
      el('div', { class: 'fact' }, el('div', { class: 'fact-num' }, 'None'), el('div', { class: 'fact-label' }, 'Prerequisites'))
    );

    /* Tiles are divs, not links: each one carries two destinations — read the brief,
     * or jump straight to the questions on a revisit. Nested anchors are not a thing. */
    var tiles = el('div', { class: 'module-grid' });
    syl.modules.forEach(function (m) {
      var s = moduleStats(m.id);
      var complete = s.total > 0 && s.done === s.total;
      var status = complete ? 'Solid ✓' : (ITIL.progress.state.visited[m.id] || s.done > 0 ? 'In progress' : 'Not started');
      tiles.appendChild(el('div', {
        class: 'module-tile' + (complete ? ' complete' : ''),
        style: modStyle(m)
      },
        el('div', { class: 'tile-top' },
          el('span', { class: 'tile-badge' }, m.weight + ' of 40 exam Qs'),
          el('span', { class: 'tile-status' }, status)),
        el('a', { class: 'tile-titlelink', href: '#/brief/' + m.id },
          el('h3', { class: 'tile-title' }, m.name)),
        el('p', { class: 'tile-sub muted' }, m.blurb),
        el('div', { class: 'tile-bar' }, el('div', { class: 'tile-bar-fill', style: 'width:' + s.pct + '%' })),
        el('div', { class: 'tile-count muted' }, s.done + ' / ' + s.total + ' practice questions correct'),
        el('div', { class: 'tile-actions' },
          el('a', { class: 'btn btn-primary btn-sm', href: '#/brief/' + m.id }, 'Read first'),
          el('a', { class: 'btn btn-ghost btn-sm', href: '#/module/' + m.id }, 'Questions →'))
      ));
    });

    var due = ITIL.leitner.dueCards(ITIL.data.flashcards).length;
    var practice = el('div', { class: 'practice-row' },
      el('a', { class: 'practice-card', href: '#/mixed', style: '--mod:#7C3AED;--mod-soft:#e9ddfd' },
        el('div', { class: 'practice-emoji' }, '🔀'),
        el('div', {},
          el('h3', {}, 'Mixed practice — untimed'),
          el('p', { class: 'muted' }, 'All ' + ITIL.data.questions.length + ' questions, shuffled across modules. No clock.'))),
      el('a', { class: 'practice-card', href: '#/flashcards', style: '--mod:#0FB5AE;--mod-soft:#d5f5f2' },
        el('div', { class: 'practice-emoji' }, '🗂️'),
        el('div', {},
          el('h3', {}, 'Recall deck'),
          el('p', { class: 'muted' }, due + ' of ' + ITIL.data.flashcards.length + ' cards due · Leitner boxes')))
    );

    root.appendChild(el('div', { class: 'view dash-view' },
      el('div', { class: 'board-head' },
        el('h1', {}, 'ITIL 4 Foundation — study board'),
        el('p', { class: 'muted' }, exam.name + ' · ' + exam.body + ' · closed book · ' + exam.prerequisites)),
      facts,
      el('div', { class: 'no-timer-note' },
        el('p', {}, 'Nothing in here is timed. Work a module, write your reasoning, then ping Claude to read the log below and coach you on the misses.')),
      el('h2', { class: 'section-title' }, 'Syllabus sections'),
      tiles,
      el('h2', { class: 'section-title' }, 'Practice engines'),
      practice
    ));
    renderTopBar();
  }

  /* --------------------------------------------------------- brief view */
  /* Fixed three-block shape, by request: the list, 2-3 sentences on each item,
   * then a bare terms list. The terms are deliberately NOT defined here — they are
   * the "bring these to Claude" list, and defining them would defeat the point. */
  function viewBrief(root, moduleId) {
    var m = ITIL.data.moduleById[moduleId];
    var b = ITIL.data.briefs[moduleId];
    if (!m || !b) { location.hash = '#/'; return; }
    var s = moduleStats(moduleId);
    root.innerHTML = '';

    var items = el('div', { class: 'brief-items' });
    b.items.forEach(function (it) {
      items.appendChild(el('div', { class: 'brief-item' },
        el('h3', { class: 'brief-item-name' }, it.name),
        el('p', { class: 'brief-item-body', html: it.body })));
    });

    var terms = el('div', { class: 'term-chips' });
    b.terms.forEach(function (t) { terms.appendChild(el('span', { class: 'term-chip' }, t)); });

    var listNode = el('ol', { class: 'brief-list' });
    b.list.forEach(function (li) {
      // an em-dash divider row is a label inside the list, not a numbered entry
      var divider = li.indexOf('—') === 0;
      listNode.appendChild(el('li', { class: divider ? 'brief-list-divider' : '' }, li));
    });

    root.appendChild(el('div', { class: 'view brief-view', style: modStyle(m) },
      el('div', { class: 'module-header' },
        el('a', { class: 'back-link', href: '#/' }, '← Board'),
        el('div', { class: 'module-crumb' },
          el('span', { class: 'crumb-kicker' }, 'Read first'),
          el('span', { class: 'crumb-title' }, m.name)),
        el('div', { class: 'module-step muted' }, m.weight + ' of 40 exam questions')),

      el('div', { class: 'brief-lead' }, el('p', {}, b.lead)),

      el('div', { class: 'brief-block' },
        el('h2', { class: 'brief-block-title' }, b.listLabel),
        listNode),

      el('div', { class: 'brief-block' },
        el('h2', { class: 'brief-block-title' }, 'What each one means'),
        items,
        b.note ? el('div', { class: 'brief-note' }, el('p', {}, b.note)) : null),

      el('div', { class: 'brief-block' },
        el('h2', { class: 'brief-block-title' }, 'Terms and phrases from this section'),
        el('p', { class: 'muted brief-terms-hint' },
          'Left undefined on purpose. Anything here you do not recognise, bring it to Claude in chat and ask.'),
        terms),

      el('div', { class: 'brief-cta' },
        el('a', { class: 'btn btn-primary', href: '#/module/' + moduleId },
          'Start the ' + s.total + ' practice questions →'),
        el('a', { class: 'btn btn-ghost', href: '#/flashcards' }, 'Recall deck'))
    ));
    window.scrollTo(0, 0);
  }

  /* ------------------------------------------------- question runner */
  /* Shared by module practice and mixed practice — same view, different queue. */
  function runQuestions(root, opts) {
    var queue = opts.queue;
    var idx = 0;
    var session = { correct: 0, answered: 0 };

    root.innerHTML = '';
    var shell = el('div', { class: 'view', style: opts.style || '' });
    root.appendChild(shell);

    if (!queue.length) {
      shell.appendChild(el('div', { class: 'module-done' },
        el('div', { class: 'done-emoji' }, '🤷'),
        el('h2', {}, 'No questions here yet'),
        el('a', { class: 'btn btn-primary', href: '#/' }, 'Back to board')));
      return;
    }

    function paint() {
      shell.innerHTML = '';
      shell.appendChild(el('div', { class: 'module-header' },
        el('a', { class: 'back-link', href: '#/' }, '← Board'),
        opts.briefHref ? el('a', { class: 'back-link', href: opts.briefHref }, 'Brief') : null,
        el('div', { class: 'module-crumb' },
          el('span', { class: 'crumb-kicker' }, opts.kicker),
          el('span', { class: 'crumb-title' }, opts.title)),
        el('div', { class: 'module-step muted' }, 'Question ' + (idx + 1) + ' of ' + queue.length + ' · untimed')
      ));

      var progWrap = el('div', { class: 'module-progress' });
      for (var i = 0; i < queue.length; i++) {
        progWrap.appendChild(el('span', { class: 'seg' + (i < idx ? ' past' : i === idx ? ' now' : '') }));
      }
      shell.appendChild(progWrap);

      if (idx === 0 && opts.intro) {
        shell.appendChild(el('div', { class: 'module-intro' },
          opts.weightNote ? el('div', { class: 'weight-tag' }, opts.weightNote) : null,
          el('p', {}, opts.intro)));
      }

      var q = queue[idx];
      var isLast = idx === queue.length - 1;
      /* Never disabled. An earlier build gated this on submitting, which just made the
       * button look broken when you wanted to move past a question. Skipping is allowed:
       * an unanswered question is simply not recorded and not logged. */
      var next = el('button', {
        class: 'btn btn-primary',
        onClick: function () {
          if (isLast) return finish();
          idx++; paint();
        }
      }, isLast ? 'Finish' : 'Skip ahead →');
      var advanceHint = el('span', { class: 'muted' },
        'Untimed. Submit to see the answer, or move on without answering.');

      var body = renderQuestion(q, q.module, function (res) {
        session.answered++;
        if (res.correct) session.correct++;
        next.textContent = isLast ? 'Finish' : 'Next →';
        advanceHint.textContent = 'Logged. Take as long as you want on the explanation.';
      });

      shell.appendChild(el('div', { class: 'element' },
        body,
        el('div', { class: 'element-controls' }, advanceHint, next)
      ));
      window.scrollTo(0, 0);
    }

    function finish() {
      shell.innerHTML = '';
      var pct = session.answered ? Math.round(session.correct / session.answered * 100) : 0;
      shell.appendChild(el('div', { class: 'module-done' },
        el('div', { class: 'done-emoji' }, pct === 100 ? '🎉' : '✅'),
        el('h2', {}, opts.title + ' — done'),
        el('p', { class: 'muted' }, 'This pass: ' + session.correct + ' of ' + session.answered + ' correct (' + pct + '%).'),
        el('p', { class: 'muted' }, 'Your picks and reasoning are in the log below. That is what Claude reads to coach you.'),
        el('div', { class: 'done-actions' },
          el('a', { class: 'btn btn-primary', href: '#/' }, 'Back to board'),
          el('a', { class: 'btn btn-ghost', href: '#/flashcards' }, 'Reinforce with the deck'))
      ));
      renderTopBar();
      window.scrollTo(0, 0);
    }

    paint();
  }

  function viewModule(root, moduleId) {
    var m = ITIL.data.moduleById[moduleId];
    if (!m) { location.hash = '#/'; return; }
    ITIL.progress.visit(moduleId);
    runQuestions(root, {
      queue: (ITIL.data.byModule[moduleId] || []).slice(),
      style: modStyle(m),
      kicker: 'Syllabus section',
      title: m.name,
      briefHref: '#/brief/' + moduleId,
      intro: m.blurb,
      weightNote: m.weight + ' of the 40 real exam questions come from this section'
    });
  }

  function viewMixed(root) {
    runQuestions(root, {
      queue: shuffle(ITIL.data.questions.slice()),
      style: '--mod:#7C3AED;--mod-soft:#e9ddfd',
      kicker: 'Mixed practice',
      title: 'All sections, shuffled',
      intro: 'Every question in the bank, in random order and with no clock running. Stop whenever you want — progress is saved per question.'
    });
  }

  /* ---------------------------------------------------------- deck view */
  function viewFlashcards(root) {
    var cards = ITIL.data.flashcards;
    root.innerHTML = '';

    var due = ITIL.leitner.dueCards(cards);
    var queue = due.length ? due.slice() : cards.slice(); // nothing due -> free review pass
    var reviewingAll = due.length === 0;
    var idx = 0;
    var stats = { correct: 0, missed: 0 };

    var header = el('div', { class: 'deck-header' },
      el('h2', {}, 'Recall deck'),
      el('p', { class: 'muted' }, reviewingAll
        ? 'No cards are due right now — here is a free review pass. Grading still updates your boxes.'
        : due.length + ' card' + (due.length === 1 ? '' : 's') + ' due for review. Self-paced, no timer.')
    );

    var boxBar = el('div', { class: 'leitner-boxes' });
    function paintBoxes() {
      boxBar.innerHTML = '';
      var dist = ITIL.leitner.distribution(cards);
      for (var b = 1; b <= 5; b++) {
        boxBar.appendChild(el('div', { class: 'leitner-box' },
          el('div', { class: 'leitner-box-num' }, 'Box ' + b),
          el('div', { class: 'leitner-box-count' }, String(dist[b] || 0))));
      }
    }

    var stage = el('div', { class: 'deck-stage' });
    root.appendChild(el('div', { class: 'view deck-view' }, header, boxBar, stage));
    paintBoxes();
    next();

    function next() {
      stage.innerHTML = '';
      if (idx >= queue.length) return summary();
      var card = queue[idx];
      var m = ITIL.data.moduleById[card.module] || ITIL.data.syllabus.modules[0];
      var flipped = false, rated = false;

      var cardEl = el('div', {
        class: 'flipcard', role: 'button', tabindex: '0',
        style: modStyle(m),
        'aria-label': 'Flashcard, activate to reveal'
      }, el('div', { class: 'flip-inner' },
        el('div', { class: 'flip-face flip-front' },
          el('div', { class: 'flip-tag' }, m.short),
          el('p', { class: 'flip-text' }, card.front),
          el('div', { class: 'flip-hint' }, 'Click / Enter to reveal')),
        el('div', { class: 'flip-face flip-back' },
          el('div', { class: 'flip-tag' }, 'Keyed answer'),
          el('p', { class: 'flip-text' }, card.back))
      ));

      function flip() {
        flipped = !flipped;
        cardEl.classList.toggle('is-flipped', flipped);
        rateRow.classList.toggle('hidden', !flipped);
      }
      cardEl.addEventListener('click', flip);
      cardEl.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
      });

      function grade(ok) {
        if (rated) return; rated = true;
        ITIL.leitner.grade(card.id, ok);
        stats[ok ? 'correct' : 'missed']++;
        paintBoxes();
        idx++;
        next();
      }

      var rateRow = el('div', { class: 'flip-rate hidden' },
        el('button', { class: 'btn btn-ghost', onClick: function () { grade(false); } }, 'Missed it'),
        el('button', { class: 'btn btn-primary', onClick: function () { grade(true); } }, 'Got it'));

      stage.appendChild(el('div', {},
        el('div', { class: 'deck-progress muted' }, 'Card ' + (idx + 1) + ' of ' + queue.length + ' · ' + m.short),
        cardEl, rateRow));
    }

    function summary() {
      stage.appendChild(el('div', { class: 'deck-summary' },
        el('div', { class: 'deck-summary-emoji' }, stats.missed === 0 ? '✨' : '📚'),
        el('h3', {}, 'Session complete'),
        el('p', {}, 'Got it: ' + stats.correct + '  ·  Missed: ' + stats.missed),
        el('p', { class: 'muted' }, 'Missed cards drop to Box 1 and come back soon. Correct cards move up a box and return later.'),
        el('button', { class: 'btn btn-primary', onClick: function () { viewFlashcards(root); } }, 'Run another pass'),
        el('a', { class: 'btn btn-ghost', href: '#/' }, 'Back to board')
      ));
    }
  }

  /* ----------------------------------------------------------- router */
  function router() {
    var root = document.getElementById('app');
    var hash = location.hash.replace(/^#\/?/, '');
    var parts = hash.split('/').filter(Boolean);
    var route = parts[0] || 'dashboard';
    document.querySelectorAll('.nav-link').forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('data-route') === route);
    });
    if (route === 'brief' && parts[1]) return viewBrief(root, parts[1]);
    if (route === 'module' && parts[1]) return viewModule(root, parts[1]);
    if (route === 'mixed') return viewMixed(root);
    if (route === 'flashcards') return viewFlashcards(root);
    return viewDashboard(root);
  }

  /* ------------------------------------------------------------ boot */
  function boot() {
    var root = document.getElementById('app');
    wireCoachLog();
    loadAll().then(function () {
      window.addEventListener('hashchange', router);
      router();
    }).catch(function (err) {
      root.innerHTML =
        '<div class="load-error">' +
        '<h2>Content couldn\'t load</h2>' +
        '<p>This app reads its content from JSON files, which browsers block when you open <code>index.html</code> directly via <code>file://</code>. Serve it from a web server instead.</p>' +
        '<pre>python3 -m http.server 8001</pre>' +
        '<p>Then open <a href="http://localhost:8001/">http://localhost:8001/</a> — or deploy to GitHub Pages where this is handled for you.</p>' +
        '<p class="muted">Technical detail: ' + (err && err.message ? err.message : err) + '</p>' +
        '</div>';
    });
  }

  document.addEventListener('DOMContentLoaded', boot);
  ITIL._debug = { overallStats: overallStats, moduleStats: moduleStats, renderCoachLog: renderCoachLog };
})();

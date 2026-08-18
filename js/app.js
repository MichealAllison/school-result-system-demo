document.querySelectorAll('.tab').forEach(tab=>{
  tab.addEventListener('click', ()=>{
    document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
    document.querySelectorAll('.view').forEach(v=>v.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('view-'+tab.dataset.role).classList.add('active');
    syncTermSelects();
    if(tab.dataset.role==='parent') renderParent();
    if(tab.dataset.role==='teacher') renderTeacher();
    if(tab.dataset.role==='admin') renderAdmin();
  });
});

function renderAdmin(){
  const termId = currentTerm;
  document.getElementById('admin-term').value = String(termId);
  const rows = students.map(st=>{
    const avg = studentTermAvg(st.id, termId);
    const done = !!(submitted[termId] && submitted[termId][st.id]);
    return `<tr>
      <td>${st.name}</td>
      <td>${st.id}</td>
      <td class="num">${subjects.length}</td>
      <td class="num">${avg}%</td>
      <td><span class="pill ${done?'ok':'pending'}">${done?'Submitted':'Not submitted'}</span></td>
      <td><button class="btn gold" data-view="${st.id}">View Report</button>
          <button class="btn" data-edit="${st.id}">Edit scores</button></td>
    </tr>`;
  }).join('');
  document.getElementById('admin-students').innerHTML =
    `<thead><tr><th>Student</th><th>Admission No.</th><th class="num">Subjects</th><th class="num">Avg</th><th>Status</th><th>Action</th></tr></thead><tbody>${rows}</tbody>`;
  const ps = document.getElementById('publish-status');
  ps.textContent = published ? 'Published' : 'Draft';
  ps.className = 'pill ' + (published ? 'ok' : 'pending');
  document.getElementById('publish-btn').textContent = published ? 'Re-publish' : 'Publish results';
}
document.getElementById('publish-btn').addEventListener('click', ()=>{
  published = true;
  renderAdmin();
});

const adminClass = document.getElementById('admin-class');
adminClass.innerHTML = ['JSS 2 (Blue)'].map(c=>`<option value="${c}">${c}</option>`).join('');
adminClass.value = 'JSS 2 (Blue)';
let teacherStudentId = students[0].id;
const teacherTermSel = document.getElementById('teacher-term');
const adminTermSel = document.getElementById('admin-term');
const parentTermSel = document.getElementById('parent-term');
function renderTermSelectors(){
  const opts = TERMS.map(t=>`<option value="${t.id}">${t.label}</option>`).join('');
  [teacherTermSel, adminTermSel, parentTermSel].forEach(s=>{ s.innerHTML = opts; s.value = String(currentTerm); });
}
function syncTermSelects(){
  [teacherTermSel, adminTermSel, parentTermSel].forEach(s=>{ if(s) s.value = String(currentTerm); });
}
[teacherTermSel, adminTermSel, parentTermSel].forEach(s=>{
  s.addEventListener('change', ()=>{
    currentTerm = Number(s.value);
    syncTermSelects();
    if(s===teacherTermSel){ renderTeacher(); loadTeacherEntry(teacherStudentId); }
    if(s===adminTermSel){ renderAdmin(); const hs=document.getElementById('ht-student'); if(hs) loadHeadEntry(hs.value || students[0].id); }
    if(s===parentTermSel){ renderParent(); }
  });
});

function renderScoreEditor(containerId, termId, sid){
  const sheet = ensureSheet(termId, sid);
  let grandT = 0, rowIdx = 0;
  const groups = subjectGroups.map(g=>{
    let h = `<tr class="cat"><td colspan="7">${g.name}</td></tr>`;
    g.subs.forEach(name=>{
      const r = sheet[name]||{ca1:0,ca2:0,ca3:0,exam:0};
      const t = total(r);
      grandT += t;
      h += `<tr class="${rowIdx%2?'shade2':''}" data-subject="${name}">
        <td>${name}</td>
        <td class="num"><input data-field="ca1" type="number" min="0" max="20" value="${r.ca1}"></td>
        <td class="num"><input data-field="ca2" type="number" min="0" max="10" value="${r.ca2}"></td>
        <td class="num"><input data-field="ca3" type="number" min="0" max="10" value="${r.ca3}"></td>
        <td class="num"><input data-field="exam" type="number" min="0" max="60" value="${r.exam}"></td>
        <td class="num total-cell">${t}</td>
        <td class="num grade-cell">${gradeFor(t)}</td>
      </tr>`;
      rowIdx++;
    });
    return h;
  }).join('');
  document.getElementById(containerId).innerHTML = `
    <tr><th>SUBJECT</th><th class="num">CA1 /20</th><th class="num">CA2 /10</th><th class="num">CA3 /10</th><th class="num">EXAM /60</th><th class="num">TOTAL</th><th class="num">GRADE</th></tr>
    ${groups}
    <tr class="gtotal"><td class="gt-l" colspan="5">TOTAL</td><td class="num">${grandT}</td><td class="num">${gradeFor(subjects.length?Math.round(grandT/subjects.length):0)}</td></tr>
  `;
  document.querySelectorAll('#'+containerId+' input').forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const tr = inp.closest('tr');
      const name = tr.dataset.subject;
      const field = inp.dataset.field;
      ensureSheet(termId, sid)[name][field] = Number(inp.value)||0;
      const t = total(ensureSheet(termId, sid)[name]);
      tr.querySelector('.total-cell').textContent = t;
      tr.querySelector('.grade-cell').textContent = gradeFor(t);
      saveState();
    });
  });
}

function renderStudentAux(containerId, termId, sid){
  const att = (attendanceSheets[termId] && attendanceSheets[termId][sid]) || {opened:0,present:0,absent:0};
  const psy = (psychoSets[termId] && psychoSets[termId][sid]) || {};
  const aff = (affectSets[termId] && affectSets[termId][sid]) || {};
  const optSel = cur => ['E','M','A','B'].map(l=>`<option${l===cur?' selected':''}>${l}</option>`).join('');
  document.getElementById(containerId).innerHTML = `
    <h4 class="aux-title">Attendance (times)</h4>
    <table class="aux-table">
      <tr><td>Times School Opened</td><td><input data-k="opened" type="number" min="0" value="${att.opened}"></td></tr>
      <tr><td>Times Present</td><td><input data-k="present" type="number" min="0" value="${att.present}"></td></tr>
      <tr><td>Times Absent</td><td><input data-k="absent" type="number" min="0" value="${att.absent}"></td></tr>
    </table>
    <h4 class="aux-title">Psychomotor Domain</h4>
    <table class="aux-table">
      <tr><th>Trait</th><th>Rating</th></tr>
      ${psychoTraits.map(tr=>`<tr data-key="${tr}"><td>${tr}</td><td><select data-sheet="psy">${optSel(psy[tr]||'E')}</select></td></tr>`).join('')}
    </table>
    <h4 class="aux-title">Affective Assessment</h4>
    <table class="aux-table">
      <tr><th>Trait</th><th>Rating</th></tr>
      ${affectiveTraits.map(tr=>`<tr data-key="${tr}"><td>${tr}</td><td><select data-sheet="aff">${optSel(aff[tr]||'E')}</select></td></tr>`).join('')}
    </table>
  `;
  document.querySelectorAll('#'+containerId+' input').forEach(inp=>{
    inp.addEventListener('input', ()=>{
      const k = inp.dataset.k;
      attendanceSheets[termId][sid][k] = Number(inp.value)||0;
      saveState();
    });
  });
  document.querySelectorAll('#'+containerId+' select').forEach(sel=>{
    sel.addEventListener('change', ()=>{
      const sheet = sel.dataset.sheet;
      const key = sel.closest('tr').dataset.key;
      const set = sheet==='psy' ? psychoSets : affectSets;
      if(set[termId] && set[termId][sid]){ set[termId][sid][key] = sel.value; saveState(); }
    });
  });
}

function renderTeacher(){
  const termId = currentTerm;
  const sid = teacherStudentId || students[0].id;
  const st = students.find(s=>s.id===sid);
  const label = document.getElementById('teacher-selected-student');
  if(label) label.textContent = st ? `Entering scores for ${st.name} · ${st.id}` : '';
  document.getElementById('teacher-term').value = String(termId);
  renderScoreEditor('teacher-table', termId, sid);
  renderStudentAux('teacher-aux', termId, sid);
  const done = !!(submitted[termId] && submitted[termId][sid]);
  const stEl = document.getElementById('teacher-sub-status');
  stEl.textContent = done ? 'Submitted' : 'Not submitted';
  stEl.className = 'pill ' + (done?'ok':'pending');
  const msg = document.getElementById('teacher-sub-msg');
  if(msg) msg.textContent = done && st ? `Submitted for ${st.name}. You can still amend and re-submit.` : '';
}

const studentSelect = document.getElementById('student-select');
studentSelect.innerHTML = students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
studentSelect.addEventListener('change', renderParent);
document.getElementById('print-btn').addEventListener('click', ()=>window.print());

// ---- Teacher tab: select student -> comment, signature & submit (per term) ----
const tcStudent = document.getElementById('tc-student');
tcStudent.innerHTML = students.map(s=>`<option value="${s.id}">${s.name} · ${s.id}</option>`).join('');
tcStudent.value = teacherStudentId;
const tcComment = document.getElementById('tc-comment');
const tcSign = document.getElementById('tc-signature');
const tcSignPreview = document.getElementById('tc-sign-preview');
const tcSignName = document.getElementById('tc-sign-name');
const tcSignClear = document.getElementById('tc-sign-clear');
function loadTeacherEntry(sid){
  const e = (teacherEntries[currentTerm] && teacherEntries[currentTerm][sid]) || {comment:'',signature:''};
  tcComment.value = e.comment || '';
  tcSignPreview.innerHTML = e.signature ? `<img src="${e.signature}" alt="signature preview">` : '<span class="muted">No signature uploaded</span>';
  tcSignClear.hidden = !e.signature;
  tcSignName.textContent = e.signature ? 'Signature attached' : '';
}
tcStudent.addEventListener('change', ()=>{
  teacherStudentId = tcStudent.value;
  loadTeacherEntry(tcStudent.value);
  renderTeacher();
});
tcComment.addEventListener('input', ()=>{
  if(teacherEntries[currentTerm] && teacherEntries[currentTerm][tcStudent.value]){
    teacherEntries[currentTerm][tcStudent.value].comment = tcComment.value;
    saveState();
  }
});
tcSign.addEventListener('change', ()=>{
  const f = tcSign.files[0]; if(!f) return;
  readFileAsDataURL(f, data=>{
    if(teacherEntries[currentTerm] && teacherEntries[currentTerm][tcStudent.value]){
      teacherEntries[currentTerm][tcStudent.value].signature = data;
      loadTeacherEntry(tcStudent.value);
      saveState();
    }
  });
});
tcSignClear.addEventListener('click', ()=>{
  if(teacherEntries[currentTerm] && teacherEntries[currentTerm][tcStudent.value]){
    teacherEntries[currentTerm][tcStudent.value].signature = '';
    loadTeacherEntry(tcStudent.value);
    saveState();
  }
});
document.getElementById('teacher-submit').addEventListener('click', ()=>{
  const sid = teacherStudentId || students[0].id;
  if(!submitted[currentTerm]) submitted[currentTerm] = {};
  submitted[currentTerm][sid] = true;
  saveState();
  renderTeacher();
  const msg = document.getElementById('teacher-sub-msg');
  if(msg) msg.textContent = `Submitted for ${(students.find(s=>s.id===sid)||{}).name} (${(TERMS.find(t=>t.id===currentTerm)||{}).label}).`;
});
loadTeacherEntry(tcStudent.value);

// ---- Admin tab: per-term head-teacher comment + school stamp ----
const htStudent = document.getElementById('ht-student');
htStudent.innerHTML = students.map(s=>`<option value="${s.id}">${s.name}</option>`).join('');
htStudent.value = students[0].id;
const htComment = document.getElementById('ht-comment');
const htStamp = document.getElementById('ht-stamp');
const htStampPreview = document.getElementById('ht-stamp-preview');
const htStampName = document.getElementById('ht-stamp-name');
const htStampClear = document.getElementById('ht-stamp-clear');
function loadHeadEntry(sid){
  const e = (headTeacherEntries[currentTerm] && headTeacherEntries[currentTerm][sid]) || {comment:''};
  htComment.value = e.comment || '';
  htStampPreview.innerHTML = stampData ? `<img src="${stampData}" alt="stamp preview">` : '<span class="muted">No stamp uploaded</span>';
  htStampName.textContent = stampData ? 'Stamp attached' : '';
  htStampClear.hidden = !stampData;
}
htStudent.addEventListener('change', ()=>loadHeadEntry(htStudent.value));
htComment.addEventListener('input', ()=>{
  if(headTeacherEntries[currentTerm] && headTeacherEntries[currentTerm][htStudent.value]){
    headTeacherEntries[currentTerm][htStudent.value].comment = htComment.value;
    saveState();
  }
});
htStamp.addEventListener('change', ()=>{
  const f = htStamp.files[0]; if(!f) return;
  readFileAsDataURL(f, data=>{
    stampData = data;
    loadHeadEntry(htStudent.value);
    saveState();
  });
});
htStampClear.addEventListener('click', ()=>{
  stampData='';
  loadHeadEntry(htStudent.value);
  saveState();
});
loadHeadEntry(htStudent.value);

// ---- Admin: students table -> view report preview / edit scores ----
document.getElementById('admin-students').addEventListener('click', e=>{
  const viewBtn = e.target.closest('button[data-view]');
  const editBtn = e.target.closest('button[data-edit]');
  if(viewBtn){
    const sid = viewBtn.dataset.view;
    htStudent.value = sid;
    loadHeadEntry(sid);
    showAdminPreview(sid, currentTerm);
  } else if(editBtn){
    const sid = editBtn.dataset.edit;
    openAdminEdit(sid, currentTerm);
  }
});
function showAdminPreview(sid, termId){
  const st = students.find(s=>s.id===sid)||{name:''};
  const tm = TERMS.find(t=>t.id===termId)||{label:''};
  const wrap = document.getElementById('admin-report-preview');
  wrap.innerHTML = `<div class="preview-head"><h3>Result Preview — ${st.name} (${sid}) · ${tm.label}</h3><button class="btn" id="preview-close">&times; Close preview</button></div>` + reportCardHTML(sid, termId);
  wrap.hidden = false;
  document.getElementById('preview-close').addEventListener('click', ()=>{ wrap.hidden = true; });
}
function openAdminEdit(sid, termId){
  const st = students.find(s=>s.id===sid)||{name:''};
  const tm = TERMS.find(t=>t.id===termId)||{label:''};
  document.getElementById('admin-edit-student').textContent = st.name;
  document.getElementById('admin-edit-term').textContent = tm.label;
  renderScoreEditor('admin-edit-table', termId, sid);
  renderStudentAux('admin-edit-aux', termId, sid);
  document.getElementById('admin-edit').hidden = false;
}
document.getElementById('admin-edit-close').addEventListener('click', ()=>{
  document.getElementById('admin-edit').hidden = true;
  renderAdmin();
});

function classAverages(){
  const submittedSubjects = subjects.filter(s=>s.submitted).map(s=>s.name);
  return students.map(st=>{
    const rec = scores[st.id]||{};
    const totals = submittedSubjects.map(sn=>rec[sn]?total(rec[sn]):null).filter(v=>v!==null);
    const avg = totals.length ? (totals.reduce((a,b)=>a+b,0)/totals.length) : 0;
    return {id:st.id, avg};
  }).sort((a,b)=>b.avg-a.avg);
}

function reportCardHTML(sid, termId){
  const st = students.find(s=>s.id===sid);
  const tm = TERMS.find(t=>t.id===termId)||TERMS[TERMS.length-1];
  const priorTerms = TERMS.filter(t=>t.id<termId);
  const sheet = (scoreSheets[termId] && scoreSheets[termId][sid]) || {};
  const att = (attendanceSheets[termId] && attendanceSheets[termId][sid]) || {opened:0,present:0,absent:0};
  const psycho = (psychoSets[termId] && psychoSets[termId][sid]) || {};
  const affect = (affectSets[termId] && affectSets[termId][sid]) || {};
  const te = (teacherEntries[termId] && teacherEntries[termId][sid]) || {comment:'',signature:''};
  const he = (headTeacherEntries[termId] && headTeacherEntries[termId][sid]) || {comment:''};

  const count = subjects.length;
  const marksObtainable = count*100;
  const colCount = 6 + priorTerms.length + 3;
  let grandT=0, avgSum=0, rowIdx=0;
  const priorTotals = priorTerms.map(p=>studentTermTotal(sid, p.id));

  const headCells = ['SUBJECTS','1ST CA','2ND CA','3RD CA','EXAM','TOTAL'];
  priorTerms.forEach(p=>headCells.push(p.ord+' TERM'));
  headCells.push('AVERAGE','GRADE','REMARKS');
  const obtainCells = ['Marks Obtainable','20','10','10','60','100'];
  priorTerms.forEach(()=>obtainCells.push('100'));
  obtainCells.push('','','');

  const rows = subjectGroups.map(g=>{
    let html = `<tr class="cat"><td colspan="${colCount}">${g.name}</td></tr>`;
    g.subs.forEach(name=>{
      const r = sheet[name]||{ca1:0,ca2:0,ca3:0,exam:0};
      const t = total(r);
      const priorVals = priorTerms.map(p=>termTotal(sid,name,p.id));
      const avg = subjectAvg(sid,name,termId);
      const gd = gradeFor(avg);
      const rm = remarkFor(avg);
      grandT += t; avgSum += avg;
      html += `<tr class="${rowIdx%2?'shade':''}"><td class="l">${name}</td><td class="n">${r.ca1}</td><td class="n">${r.ca2}</td><td class="n">${r.ca3}</td><td class="n">${r.exam}</td><td class="n subj-total">${t}</td>${priorVals.map(v=>`<td class="n">${v}</td>`).join('')}<td class="n">${Math.round(avg*10)/10}</td><td class="n">${gd}</td><td class="l">${rm}</td></tr>`;
      rowIdx++;
    });
    return html;
  }).join('');

  const overallAvg = count ? Math.round(avgSum/count*10)/10 : 0;
  const overallGrade = gradeFor(overallAvg);
  const overallRemark = remarkFor(overallAvg);
  const pct = marksObtainable ? Math.round(grandT/marksObtainable*100) : 0;
  const titleText = `${tm.ord} TERM PUPILS PERFORMANCE REPORT`;

  return `
    <div class="result-sheet">
     <div class="sheet-watermark">
        <img src="/logo.png" alt=""/>
      </div>
      <div class="sheet-letterhead">
        <div class="sheet-brand">
          <div class="sheet-crest">
          <div class="crest">
            <img src="/logo.png" alt="austrail-international-school" style="width:100px;height:100px;"/>
            <img src="/coat-arm.png" alt="austrail-international-school" style="width:100px;height:100px;"/>
          </div>
          </div>
          <div class="sheet-school-motto">${schoolInfo.motto}</div>
          <div class="sheet-school-name">${schoolInfo.name}</div>
          <div class="sheet-school-addr">${schoolInfo.address}<br>${schoolInfo.address2}</div>
           <div class="sheet-school-addr">${schoolInfo.contact}</div>
        </div>
        <div class="sheet-photo"><div><strong>STUDENT<br>PHOTO</strong><div style="margin-top:4px;font-size:8.5px;font-style:italic;">(placeholder)</div></div></div>
      </div>

      <div class="sheet-title">${titleText}</div>

      <table class="sheet-info">
        <tr>
          <td class="k">Student Name:</td><td class="v name-cell">${st.name}</td>
          <td class="k">Class:</td><td class="v">${schoolInfo.class}</td>
        </tr>
        <tr>
          <td class="k">Admission Number:</td><td class="v">${st.id}</td>
          <td class="k">Date of Birth:</td><td class="v">${st.dob}</td>
        </tr>
        <tr>
          <td class="k">No. of Subjects:</td><td class="v">${count}</td>
          <td class="k">Average Score for Term:</td><td class="v">${overallAvg}%</td>
        </tr>
        <tr>
          <td class="k">Academic Session:</td><td class="v">${schoolInfo.session}</td>
          <td class="k">Term:</td><td class="v">${tm.label}</td>
        </tr>
      </table>

      <table class="sheet-results">
        <thead>
          <tr class="head">${headCells.map(h=>`<th>${h}</th>`).join('')}</tr>
          <tr class="obtain">${obtainCells.map(o=>`<th>${o}</th>`).join('')}</tr>
        </thead>
        <tbody>
          ${rows}
          <tr class="gtotal">
            <td class="gt-l" colspan="5">TOTAL</td>
            <td class="n">${grandT}</td>
            ${priorTotals.map(v=>`<td class="n">${v}</td>`).join('')}
            <td class="n">${overallAvg}</td>
            <td class="n">${overallGrade}</td>
            <td class="l">${overallRemark}</td>
          </tr>
        </tbody>
      </table>

      <div class="sheet-blocks">
        <div class="sheet-block">
          <div class="bt">ATTENDANCE TABLE</div>
          <table>
            <tr><td class="k">Times School Opened</td><td class="n">${att.opened}</td></tr>
            <tr><td class="k">Times Present</td><td class="n">${att.present}</td></tr>
            <tr><td class="k">Times Absent</td><td class="n">${att.absent}</td></tr>
          </table>
        </div>
        <div class="sheet-block">
          <div class="bt">MARKS OBTAINABLE / OBTAINED</div>
          <table>
            <tr><td class="k">Marks Obtainable</td><td class="n">${marksObtainable}</td></tr>
            <tr><td class="k">Marks Obtained</td><td class="n">${grandT}</td></tr>
            <tr><td class="k">Percentage (%)</td><td class="n">${pct}%</td></tr>
          </table>
        </div>
      </div>

      <div class="sheet-legend">
        <div class="bt">KEY &mdash; PSYCHOMOTOR &amp; AFFECTIVE RATINGS</div>
        <div class="body"><strong>E</strong> = Exceeds &nbsp;&nbsp;|&nbsp;&nbsp; <strong>M</strong> = Meets &nbsp;&nbsp;|&nbsp;&nbsp; <strong>A</strong> = Approaching &nbsp;&nbsp;|&nbsp;&nbsp; <strong>B</strong> = Below</div>
      </div>

      <div class="sheet-domains">
        <div class="sheet-domain">
          <div class="dt">PSYCHOMOTOR DOMAIN</div>
          <table>
            ${psychoTraits.map(tr=>`<tr><td>${tr}</td><td class="rt">${psycho[tr]||'—'}</td></tr>`).join('')}
          </table>
        </div>
        <div class="sheet-domain">
          <div class="dt">AFFECTIVE ASSESSMENT</div>
          <table>
            ${affectiveTraits.map(tr=>`<tr><td>${tr}</td><td class="rt">${affect[tr]||'—'}</td></tr>`).join('')}
          </table>
        </div>
      </div>

      <div class="sheet-comment">
        <div class="ct">TEACHER'S COMMENTS</div>
        <div class="cb">${te.comment}</div>
        ${te.signature ? `<div class="cb-sig"><img src="${te.signature}" alt="Class teacher signature"></div>` : ''}
      </div>
      <div class="sheet-comment">
        <div class="ct">HEAD-TEACHER'S COMMENTS</div>
        <div class="cb">${he.comment}</div>
      </div>

      <div class="sheet-resumption">
        <span>NEXT RESUMPTION DATE: ${schoolInfo.nextResumption}</span>
        <span>TERM: ${tm.label} &middot; SESSION: ${schoolInfo.session}</span>
      </div>

      <div class="sheet-signatures">
        <div class="sheet-sig ${te.signature?'has-sig':''}">${te.signature?`<img class="sig-img" src="${te.signature}" alt="signature">`:''}<div class="line">Class Teacher</div><div class="sub">Signature &amp; Date</div></div>
        <div class="sheet-sig"><div class="line">Head Teacher</div><div class="sub">Signature &amp; Date</div></div>
        <div class="sheet-sig"><div class="line">Sign &amp; Stamp</div><div class="sub">Official Stamp</div></div>
        <div class="sheet-stamp">${stampData?`<img src="${stampData}" alt="Official stamp">`:`<div class="inner">OFFICIAL<br>STAMP</div>`}</div>
      </div>
    </div>
  `;
}

function renderParent(){
  const sid = studentSelect.value || students[0].id;
  const container = document.getElementById('parent-content');
  document.getElementById('parent-term').value = String(currentTerm);
  if(!published){
    container.innerHTML = `<div class="locked">Results for this term haven't been published yet.<br>Check back once the exam office releases them.</div>`;
    return;
  }
  container.innerHTML = reportCardHTML(sid, currentTerm);
}

renderTermSelectors();
renderAdmin();
renderTeacher();
renderParent();


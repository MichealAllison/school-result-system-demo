const students = [
  {id:'GWS/26/001', name:'Chiamaka Okafor', dob:'15 March 2012'},
  {id:'GWS/26/002', name:'Tunde Bakare', dob:'02 July 2011'},
  {id:'GWS/26/003', name:'Amina Yusuf', dob:'21 November 2011'},
  {id:'GWS/26/004', name:'David Eze', dob:'09 January 2012'},
  {id:'GWS/26/005', name:'Blessing Nwosu', dob:'28 May 2011'},
];

const schoolInfo = {
  name:'AUSTRALIAN INTERNATIONAL STANDARD SCHOOL',
  motto:'Motor: Bring, Belonging, Becoming',
  address:'Abuja: 336, Basic Estate, Lokogoma Abuja, FCT, Nigeira',
  address2:'Sydney: 1 Market street Sydney NSW 2000',
  contact:'Tel: +234 909 123 4585 | Email: Admin@aissng.com | www.aiss.com',
  session:'2025/2026 Academic Session',
  term:'Third Term',
  termNo:3,
  class:'JSS 2 (Blue)',
  nextResumption:'Monday, 7th September, 2026'
};

const psychoTraits = ['Punctuality','Neatness','Handwriting','Sports & Games','Dexterity (Handwork)','Verbal Fluency'];
const affectiveTraits = ['Politeness','Honesty','Obedience','Cooperation','Self-Control','Leadership','Respect for Others'];

const psychomotor = {
  'GWS/26/001': {Punctuality:'E',Neatness:'E',Handwriting:'M','Sports & Games':'E','Dexterity (Handwork)':'E','Verbal Fluency':'E'},
  'GWS/26/002': {Punctuality:'M',Neatness:'M',Handwriting:'M','Sports & Games':'A','Dexterity (Handwork)':'A','Verbal Fluency':'M'},
  'GWS/26/003': {Punctuality:'E',Neatness:'E',Handwriting:'M','Sports & Games':'E','Dexterity (Handwork)':'E','Verbal Fluency':'E'},
  'GWS/26/004': {Punctuality:'M',Neatness:'A',Handwriting:'A','Sports & Games':'B','Dexterity (Handwork)':'A','Verbal Fluency':'A'},
  'GWS/26/005': {Punctuality:'M',Neatness:'M',Handwriting:'M','Sports & Games':'M','Dexterity (Handwork)':'A','Verbal Fluency':'M'},
};

const affective = {
  'GWS/26/001': {Politeness:'E',Honesty:'E',Obedience:'E',Cooperation:'M',SelfControl:'M',Leadership:'E','Respect for Others':'E'},
  'GWS/26/002': {Politeness:'M',Honesty:'M',Obedience:'M',Cooperation:'M',SelfControl:'A',Leadership:'M','Respect for Others':'M'},
  'GWS/26/003': {Politeness:'E',Honesty:'E',Obedience:'E',Cooperation:'E',SelfControl:'E',Leadership:'E','Respect for Others':'E'},
  'GWS/26/004': {Politeness:'M',Honesty:'A',Obedience:'A',Cooperation:'A',SelfControl:'B',Leadership:'A','Respect for Others':'M'},
  'GWS/26/005': {Politeness:'M',Honesty:'M',Obedience:'M',Cooperation:'A',SelfControl:'M',Leadership:'M','Respect for Others':'M'},
};

const comments = {
  'GWS/26/001': {
    teacher:"Chiamaka is a conscientious student who consistently produces quality work. She participates actively and supports her classmates collaboratively.",
    headTeacher:"Chiamaka has maintained a strong academic standard this term. Keep up the excellent effort."
  },
  'GWS/26/002': {
    teacher:"Tunde is a steady worker who meets most expectations. Regular revision will help him raise his scores further.",
    headTeacher:"Tunde has shown good conduct this term. Continued diligence will bring further gains."
  },
  'GWS/26/003': {
    teacher:"Amina leads the class in almost every area. She is a role model to her peers and consistently excels.",
    headTeacher:"Amina's results reflect diligence and natural ability. A proud representative of the school."
  },
  'GWS/26/004': {
    teacher:"David needs to improve his attendance and submit assignments more regularly. Extra support has been offered.",
    headTeacher:"David must raise his commitment to studies. A parent-teacher meeting is advised."
  },
  'GWS/26/005': {
    teacher:"Blessing is a polite and reliable student who contributes well in groups. She should aim higher in assessments.",
    headTeacher:"Blessing is making reasonable progress. Encourage her to maintain focus."
  }
};

const subjectGroups = [
  {name:'LITERACY', subs:['English Studies','Literacy / Comprehension','Handwriting']},
  {name:'ARITHMETICS', subs:['Mathematics','Numeracy']},
  {name:'GENERAL PAPERS', subs:['Basic Science','Civic Education','Christian Religious Studies','French','Agric Science','Home Economics']},
];
const subjects = subjectGroups.flatMap(g=>g.subs.map(name=>({name, cat:g.name, teacher:'â€”', submitted:true})));

const scores = {
  'GWS/26/001': {
    'English Studies':{ca1:19,ca2:9,ca3:9,exam:55,term1:78,term2:82},
    'Literacy / Comprehension':{ca1:18,ca2:9,ca3:8,exam:54,term1:80,term2:84},
    'Handwriting':{ca1:17,ca2:8,ca3:8,exam:52,term1:82,term2:85},
    'Mathematics':{ca1:19,ca2:10,ca3:9,exam:57,term1:86,term2:90},
    'Numeracy':{ca1:18,ca2:9,ca3:9,exam:56,term1:84,term2:88},
    'Basic Science':{ca1:19,ca2:9,ca3:9,exam:56,term1:83,term2:86},
    'Civic Education':{ca1:18,ca2:9,ca3:9,exam:55,term1:85,term2:88},
    'Christian Religious Studies':{ca1:19,ca2:10,ca3:9,exam:58,term1:88,term2:91},
    'French':{ca1:18,ca2:9,ca3:8,exam:54,term1:81,term2:85},
    'Agric Science':{ca1:18,ca2:9,ca3:9,exam:55,term1:85,term2:88},
    'Home Economics':{ca1:18,ca2:9,ca3:9,exam:55,term1:83,term2:87},
  },
  'GWS/26/002': {
    'English Studies':{ca1:18,ca2:8,ca3:8,exam:50,term1:70,term2:75},
    'Literacy / Comprehension':{ca1:17,ca2:8,ca3:7,exam:48,term1:68,term2:72},
    'Handwriting':{ca1:16,ca2:7,ca3:7,exam:46,term1:70,term2:73},
    'Mathematics':{ca1:18,ca2:9,ca3:8,exam:52,term1:75,term2:78},
    'Numeracy':{ca1:17,ca2:8,ca3:7,exam:50,term1:73,term2:76},
    'Basic Science':{ca1:16,ca2:8,ca3:7,exam:48,term1:70,term2:74},
    'Civic Education':{ca1:17,ca2:8,ca3:8,exam:49,term1:72,term2:75},
    'Christian Religious Studies':{ca1:18,ca2:8,ca3:8,exam:51,term1:74,term2:77},
    'French':{ca1:16,ca2:7,ca3:7,exam:45,term1:68,term2:72},
    'Agric Science':{ca1:16,ca2:8,ca3:7,exam:47,term1:70,term2:73},
    'Home Economics':{ca1:17,ca2:8,ca3:8,exam:49,term1:71,term2:74},
  },
  'GWS/26/003': {
    'English Studies':{ca1:20,ca2:10,ca3:10,exam:59,term1:90,term2:93},
    'Literacy / Comprehension':{ca1:19,ca2:10,ca3:9,exam:57,term1:88,term2:91},
    'Handwriting':{ca1:18,ca2:9,ca3:9,exam:57,term1:90,term2:92},
    'Mathematics':{ca1:20,ca2:10,ca3:10,exam:60,term1:92,term2:95},
    'Numeracy':{ca1:19,ca2:9,ca3:9,exam:58,term1:90,term2:93},
    'Basic Science':{ca1:19,ca2:9,ca3:9,exam:59,term1:89,term2:92},
    'Civic Education':{ca1:18,ca2:10,ca3:9,exam:58,term1:91,term2:94},
    'Christian Religious Studies':{ca1:20,ca2:10,ca3:10,exam:60,term1:93,term2:96},
    'French':{ca1:19,ca2:9,ca3:9,exam:57,term1:89,term2:92},
    'Agric Science':{ca1:19,ca2:9,ca3:10,exam:58,term1:90,term2:93},
    'Home Economics':{ca1:19,ca2:9,ca3:9,exam:58,term1:90,term2:93},
  },
  'GWS/26/004': {
    'English Studies':{ca1:15,ca2:7,ca3:6,exam:34,term1:55,term2:58},
    'Literacy / Comprehension':{ca1:14,ca2:6,ca3:6,exam:32,term1:52,term2:55},
    'Handwriting':{ca1:13,ca2:6,ca3:5,exam:30,term1:50,term2:53},
    'Mathematics':{ca1:15,ca2:7,ca3:7,exam:36,term1:58,term2:60},
    'Numeracy':{ca1:14,ca2:6,ca3:6,exam:33,term1:55,term2:57},
    'Basic Science':{ca1:14,ca2:6,ca3:6,exam:32,term1:53,term2:56},
    'Civic Education':{ca1:15,ca2:7,ca3:6,exam:35,term1:56,term2:59},
    'Christian Religious Studies':{ca1:15,ca2:7,ca3:6,exam:34,term1:55,term2:58},
    'French':{ca1:13,ca2:6,ca3:5,exam:30,term1:50,term2:52},
    'Agric Science':{ca1:14,ca2:6,ca3:6,exam:33,term1:54,term2:56},
    'Home Economics':{ca1:14,ca2:6,ca3:6,exam:33,term1:53,term2:56},
  },
  'GWS/26/005': {
    'English Studies':{ca1:16,ca2:8,ca3:8,exam:52,term1:76,term2:80},
    'Literacy / Comprehension':{ca1:16,ca2:8,ca3:7,exam:50,term1:74,term2:78},
    'Handwriting':{ca1:15,ca2:7,ca3:7,exam:48,term1:75,term2:79},
    'Mathematics':{ca1:17,ca2:8,ca3:8,exam:53,term1:78,term2:82},
    'Numeracy':{ca1:16,ca2:8,ca3:8,exam:52,term1:76,term2:80},
    'Basic Science':{ca1:16,ca2:8,ca3:7,exam:50,term1:74,term2:78},
    'Civic Education':{ca1:16,ca2:8,ca3:8,exam:51,term1:75,term2:79},
    'Christian Religious Studies':{ca1:17,ca2:8,ca3:8,exam:53,term1:77,term2:81},
    'French':{ca1:15,ca2:8,ca3:7,exam:49,term1:74,term2:78},
    'Agric Science':{ca1:16,ca2:8,ca3:7,exam:50,term1:75,term2:79},
    'Home Economics':{ca1:16,ca2:8,ca3:8,exam:51,term1:74,term2:78},
  }
};

const attendance = {
  'GWS/26/001':{opened:183,present:181,absent:2},
  'GWS/26/002':{opened:183,present:177,absent:6},
  'GWS/26/003':{opened:183,present:182,absent:1},
  'GWS/26/004':{opened:183,present:170,absent:13},
  'GWS/26/005':{opened:183,present:179,absent:4},
};

// ---- Term model: scores are stored per term (1st, 2nd, 3rd) ----
const TERMS = [ {id:1,label:'First Term',ord:'1ST'}, {id:2,label:'Second Term',ord:'2ND'}, {id:3,label:'Third Term',ord:'3RD'} ];
function splitTotal(t){
  const exam = Math.round(t*0.6);
  let rem = t - exam;
  const ca1 = Math.round(rem*0.5);
  const ca2 = Math.round(rem*0.25);
  const ca3 = rem - ca1 - ca2;
  return {ca1:ca1||0, ca2:ca2||0, ca3:ca3||0, exam:exam||0};
}
const scoreSheets = { 1:{}, 2:{}, 3:{} };
students.forEach(st=>{ TERMS.forEach(t=>{ scoreSheets[t.id][st.id] = {}; }); });
subjects.forEach(sn=>{
  students.forEach(st=>{
    const seed = (scores[st.id] && scores[st.id][sn.name]) || {};
    scoreSheets[3][st.id][sn.name] = {ca1:seed.ca1||0, ca2:seed.ca2||0, ca3:seed.ca3||0, exam:seed.exam||0};
    scoreSheets[2][st.id][sn.name] = splitTotal(seed.term2||0);
    scoreSheets[1][st.id][sn.name] = splitTotal(seed.term1||0);
  });
});
function ensureSheet(termId, sid){
  if(!scoreSheets[termId]) scoreSheets[termId] = {};
  if(!scoreSheets[termId][sid]){ scoreSheets[termId][sid] = {}; subjects.forEach(sn=>{ scoreSheets[termId][sid][sn.name]={ca1:0,ca2:0,ca3:0,exam:0}; }); }
  return scoreSheets[termId][sid];
}
function termTotal(sid, subject, termId){ const sheet=scoreSheets[termId]; const r=(sheet&&sheet[sid]&&sheet[sid][subject])||{}; return total(r); }
function subjectAvg(sid, subject, termId){ let s=0,n=0; for(let t=1;t<=termId;t++){ s+=termTotal(sid,subject,t); n++; } return n?s/n:0; }
function studentTermTotal(sid, termId){ return subjects.reduce((a,sn)=>a+termTotal(sid,sn.name,termId),0); }
function studentTermAvg(sid, termId){ return subjects.length? Math.round(studentTermTotal(sid,termId)/subjects.length*10)/10 : 0; }

// ---- Per-term attendance & conduct ratings (editable by teacher/admin) ----
const attendanceSheets = {};  // attendanceSheets[termId][sid] = {opened,present,absent}
const psychoSets = {};        // psychoSets[termId][sid] = {trait:rating}
const affectSets = {};        // affectSets[termId][sid] = {trait:rating}
TERMS.forEach(t=>{ attendanceSheets[t.id]={}; psychoSets[t.id]={}; affectSets[t.id]={}; });
students.forEach(st=>{ TERMS.forEach(t=>{
  attendanceSheets[t.id][st.id] = {opened:(attendance[st.id]&&attendance[st.id].opened)||0, present:(attendance[st.id]&&attendance[st.id].present)||0, absent:(attendance[st.id]&&attendance[st.id].absent)||0};
  psychoSets[t.id][st.id] = Object.assign({}, psychomotor[st.id]||{});
  affectSets[t.id][st.id] = Object.assign({}, affective[st.id]||{});
}); });

// ---- Editable comments, teacher signature & school stamp (per term, persisted) ----
const teacherEntries = {};   // teacherEntries[termId][sid] = {comment, signature}
const headTeacherEntries = {}; // headTeacherEntries[termId][sid] = {comment}
TERMS.forEach(t=>{ teacherEntries[t.id] = {}; headTeacherEntries[t.id] = {}; });
students.forEach(st=>{
  TERMS.forEach(t=>{
    teacherEntries[t.id][st.id] = { comment:(comments[st.id]&&comments[st.id].teacher)||'', signature:'' };
    headTeacherEntries[t.id][st.id] = { comment:(comments[st.id]&&comments[st.id].headTeacher)||'' };
  });
});
const submitted = {};  // submitted[termId][sid] = bool
TERMS.forEach(t=>{ submitted[t.id] = {}; students.forEach(st=>{ submitted[t.id][st.id] = false; }); });
let stampData = '';
function saveState(){
  try{ localStorage.setItem('aiss_state', JSON.stringify({scoreSheets, submitted, teacherEntries, headTeacherEntries, stampData, attendanceSheets, psychoSets, affectSets})); }catch(e){}
}
function loadState(){
  try{
    const raw = localStorage.getItem('aiss_state');
    if(raw){
      const d = JSON.parse(raw);
      if(d.scoreSheets) Object.keys(d.scoreSheets).forEach(t=>{ scoreSheets[t]=scoreSheets[t]||{}; Object.keys(d.scoreSheets[t]).forEach(k=>{ scoreSheets[t][k]=scoreSheets[t][k]||{}; Object.assign(scoreSheets[t][k], d.scoreSheets[t][k]); }); });
      if(d.submitted) Object.keys(d.submitted).forEach(t=>{ submitted[t]=submitted[t]||{}; Object.assign(submitted[t], d.submitted[t]); });
      if(d.teacherEntries) Object.keys(d.teacherEntries).forEach(t=>{ teacherEntries[t]=teacherEntries[t]||{}; Object.keys(d.teacherEntries[t]).forEach(k=>{ teacherEntries[t][k]=teacherEntries[t][k]||{}; Object.assign(teacherEntries[t][k], d.teacherEntries[t][k]); }); });
      if(d.headTeacherEntries) Object.keys(d.headTeacherEntries).forEach(t=>{ headTeacherEntries[t]=headTeacherEntries[t]||{}; Object.keys(d.headTeacherEntries[t]).forEach(k=>{ headTeacherEntries[t][k]=headTeacherEntries[t][k]||{}; Object.assign(headTeacherEntries[t][k], d.headTeacherEntries[t][k]); }); });
      if(d.stampData) stampData = d.stampData;
      if(d.attendanceSheets) Object.keys(d.attendanceSheets).forEach(t=>{ attendanceSheets[t]=attendanceSheets[t]||{}; Object.assign(attendanceSheets[t], d.attendanceSheets[t]); });
      if(d.psychoSets) Object.keys(d.psychoSets).forEach(t=>{ psychoSets[t]=psychoSets[t]||{}; Object.keys(d.psychoSets[t]).forEach(k=>{ psychoSets[t][k]=psychoSets[t][k]||{}; Object.assign(psychoSets[t][k], d.psychoSets[t][k]); }); });
      if(d.affectSets) Object.keys(d.affectSets).forEach(t=>{ affectSets[t]=affectSets[t]||{}; Object.keys(d.affectSets[t]).forEach(k=>{ affectSets[t][k]=affectSets[t][k]||{}; Object.assign(affectSets[t][k], d.affectSets[t][k]); }); });
    }
  }catch(e){}
}
function readFileAsDataURL(file, cb){
  const r = new FileReader();
  r.onload = ()=>cb(r.result);
  r.readAsDataURL(file);
}
loadState();

let published = true;
let currentTerm = 3;

function total(s){ return (s.ca1||0)+(s.ca2||0)+(s.ca3||0)+(s.exam||0); }
function gradeFor(t){
  if(t>=70) return 'A';
  if(t>=60) return 'B';
  if(t>=50) return 'C';
  if(t>=45) return 'D';
  if(t>=40) return 'E';
  return 'F';
}
function remarkFor(t){
  if(t>=70) return 'Excellent';
  if(t>=60) return 'Very Good';
  if(t>=50) return 'Good';
  if(t>=45) return 'Fair';
  if(t>=40) return 'Needs Improvement';
  return 'Fail';
}
function ordinal(n){
  const v=n%100;let s='th';
  if(v>10&&v<20){s='th';}else if(v%10===1){s='st';}else if(v%10===2){s='nd';}else if(v%10===3){s='rd';}
  return s;
}
function classAverageOverall(){
  const ranked=classAverages().filter(r=>r.avg>0);
  return ranked.length?ranked.reduce((a,r)=>a+r.avg,0)/ranked.length:0;
}

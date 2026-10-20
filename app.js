(() => {
  const $ = id => document.getElementById(id);
  let currency = 'PHP';
  let goal = 'stability';
  const rate = 56;
  const expenseIds = ['housing','utilities','food','transport','debt','family','other','fun'];
  const defaults = {income:35000,extraIncome:0,housing:8000,utilities:2500,food:7000,transport:2500,debt:3000,family:3500,other:1000,fun:1500,savingsNow:0};
  const money = n => new Intl.NumberFormat('en-US',{style:'currency',currency:currency==='PHP'?'PHP':'USD',maximumFractionDigits:0}).format(Math.round(Number.isFinite(n)?n:0));
  const amount = id => Math.max(0,Math.min(1000000000,Number($(id).value)||0));
  const ideas = [
    {name:'Virtual assistance',emoji:'🗂️',group:'digital',budget:0,time:3,skills:['digital','selling'],desc:'Help a small business organize email, calendars, customer records, research, or follow-ups.',first:'Choose one clear service and prepare a sample checklist or tracker.',cost:'Very low if you already have a computer and internet.',caution:'Protect client information and agree on scope and payment in writing.'},
    {name:'Canva design mini-services',emoji:'🎨',group:'digital',budget:0,time:3,skills:['digital','selling'],desc:'Create social posts, flyers, menus, invitations, or simple branded templates for local sellers.',first:'Make 3 sample designs for one type of customer and offer a small starter package.',cost:'Low if you already have a suitable device and design access.',caution:'Check the design platform’s licensing rules before reselling templates or assets.'},
    {name:'Spreadsheet setup',emoji:'📊',group:'digital',budget:0,time:3,skills:['digital'],desc:'Build simple expense trackers, inventory sheets, booking logs, or customer follow-up lists.',first:'Create a sample tracker and show how it saves time or prevents missed tasks.',cost:'Very low with access to spreadsheet software.',caution:'Test formulas carefully and never promise accounting or tax advice if unqualified.'},
    {name:'Tutoring or homework support',emoji:'📚',group:'teaching',budget:0,time:3,skills:['teaching'],desc:'Offer a subject you know well, reading practice, language conversation, or study organization.',first:'Pick one age group and subject, then offer a short introductory session.',cost:'Low if you have a quiet space and suitable materials.',caution:'Set clear boundaries and follow safeguarding rules when working with minors.'},
    {name:'Pre-order snacks or baked goods',emoji:'🍪',group:'food',budget:2000,time:7,skills:['food','selling'],desc:'Test demand with a small menu and orders collected before buying ingredients in bulk.',first:'Cost every ingredient and package, offer one or two items, and take limited pre-orders.',cost:'Ingredient, packaging, transport, and possible permit costs.',caution:'Check food-safety rules, allergens, permits, and delivery costs first.'},
    {name:'Reselling by pre-order',emoji:'📦',group:'selling',budget:2000,time:7,skills:['selling'],desc:'Source useful items only after checking demand; avoid tying up cash in unsold stock.',first:'Ask likely buyers what they need, compare supplier costs, and test a tiny batch.',cost:'Samples, delivery, packaging, and a small working-capital buffer.',caution:'Verify suppliers and refund terms; do not borrow heavily to buy inventory.'},
    {name:'Local errand or organizing service',emoji:'🧺',group:'hands',budget:2000,time:7,skills:['hands','selling'],desc:'Offer a clearly scoped service such as home organizing, errands, or basic non-specialist assistance.',first:'Define the service area, time, fee, transport costs, and what is not included.',cost:'Transport, basic supplies, and phone/data.',caution:'Consider personal safety, liability, and any local requirements.'},
    {name:'Social media posting support',emoji:'📱',group:'digital',budget:2000,time:7,skills:['digital','selling'],desc:'Help one local business prepare a weekly content calendar, captions, and scheduled posts.',first:'Create a one-week sample content plan for a fictional business.',cost:'Low if you already have a phone or computer and design tools.',caution:'Clarify who approves posts and who owns account access and creative files.'},
    {name:'Made-to-order crafts or gifts',emoji:'🎁',group:'hands',budget:5000,time:7,skills:['hands','selling'],desc:'Make personalized gift bundles, simple crafts, or event favors after confirming orders.',first:'Make one sample, calculate materials and labor, and test with a small audience.',cost:'Materials, packaging, photos, and delivery.',caution:'Use deposits carefully and set realistic production and delivery dates.'},
    {name:'Home cleaning or basic service',emoji:'🧽',group:'hands',budget:5000,time:7,skills:['hands','selling'],desc:'Offer a defined cleaning or household service in a small local area.',first:'List what is included, estimate time and supply costs, and test with one trusted customer.',cost:'Supplies, protective equipment, transport, and possible insurance.',caution:'Avoid hazardous jobs or specialist repairs without proper training and protection.'},
    {name:'Simple product photography',emoji:'📷',group:'digital',budget:5000,time:7,skills:['digital','selling'],desc:'Photograph products for small online sellers using a phone, clean background, and daylight.',first:'Make a sample set of 5 photos and offer a small fixed-price trial.',cost:'Basic backdrop, lighting if needed, and transport.',caution:'Agree how images may be used and deliver only work you can reliably produce.'},
    {name:'Small group skills workshop',emoji:'🧑‍🏫',group:'teaching',budget:5000,time:7,skills:['teaching','digital'],desc:'Teach a practical skill you already know, such as basic computer use, crafts, or workplace organization.',first:'Outline a 60-minute session and ask a small group what they would pay to learn.',cost:'Materials, venue or video-call access, and promotion.',caution:'Be transparent about your experience and avoid claiming credentials you do not have.'},
    {name:'Digital planner or printable',emoji:'🗓️',group:'digital',budget:2000,time:7,skills:['digital'],desc:'Design a focused checklist, budget sheet, planner, or printable for a specific audience.',first:'Solve one small problem, create a sample, and ask potential buyers for feedback before expanding.',cost:'Design time, marketplace fees, and possible promotion costs.',caution:'Check commercial-use licensing, platform fees, and local business/tax requirements.'},
    {name:'Weekend market stall',emoji:'🛍️',group:'selling',budget:15000,time:15,skills:['food','hands','selling'],desc:'Test a focused product range at a local market after checking foot traffic and stall rules.',first:'Visit the market, estimate every fee, and test demand before purchasing stock.',cost:'Stock, stall fees, transport, display, and change/payment setup.',caution:'Permits and unsold inventory can make this riskier than a pre-order model.'},
    {name:'Basic website or online shop setup',emoji:'💻',group:'digital',budget:5000,time:15,skills:['digital','selling'],desc:'Help a small seller organize a simple online presence, product descriptions, and contact details.',first:'Build a demo using sample content and define exactly what setup includes.',cost:'Internet, domain/platform fees if the client requests them, and learning time.',caution:'Do not promise custom coding or security expertise beyond your actual ability.'},
    {name:'Meal prep by order',emoji:'🥗',group:'food',budget:15000,time:15,skills:['food','selling'],desc:'Explore a small, limited menu with orders confirmed in advance and costs calculated per portion.',first:'Survey potential buyers, cost portions and packaging, and trial a tiny batch.',cost:'Ingredients, packaging, kitchen needs, transport, and compliance.',caution:'Food safety, storage, allergens, and permits are essential; check them first.'},
    {name:'Specialty online store',emoji:'🛒',group:'selling',budget:15000,time:15,skills:['selling','digital'],desc:'Focus on one product niche and validate demand before building a larger catalog.',first:'Compare three suppliers and competitors; test interest with samples or pre-orders.',cost:'Samples, inventory, platform/payment fees, shipping, and returns.',caution:'Start small; margins, refunds, shipping, and customer acquisition can erase profit.'},
    {name:'Event support or gift packaging',emoji:'🎀',group:'hands',budget:5000,time:15,skills:['hands','selling'],desc:'Offer a defined event helper service, gift wrapping, party favors, or setup assistance.',first:'Create a package menu, sample photos, and a checklist of included tasks.',cost:'Transport, supplies, and helper costs if needed.',caution:'Use written agreements and confirm venue rules, timing, and cancellation terms.'}
  ];
  function monthly(){
    const income=amount('income')+amount('extraIncome');
    const expenses=expenseIds.reduce((sum,id)=>sum+amount(id),0);
    return {income,expenses,left:income-expenses,essentials:['housing','utilities','food','transport','family','other'].reduce((s,id)=>s+amount(id),0),debt:amount('debt'),flex:amount('fun')};
  }
  function allocationPlan(m){
    if(m.left<=0) return [
      {icon:'↘',name:'Protect essentials first',desc:'Review non-essential spending and due dates before setting a savings target.',amount:0},
      {icon:'◎',name:'Prevent costly shortfalls',desc:'Contact lenders or providers early if a payment may be missed.',amount:0},
      {icon:'✳',name:'Explore low-cost income',desc:'Start with skills or resources you already have; avoid upfront debt.',amount:0}
    ];
    if(goal==='debt' && m.debt>0){
      const extra=Math.round(m.left*.55), buffer=Math.round(m.left*.3), flex=m.left-extra-buffer;
      return [{icon:'↘',name:'Extra debt payment',desc:'Only after minimums and essential bills are covered.',amount:extra},{icon:'◒',name:'Emergency savings',desc:'Build a small buffer to reduce reliance on new debt.',amount:buffer},{icon:'✳',name:'Flexible / upcoming costs',desc:'Keep some money available for irregular expenses.',amount:flex}];
    }
    if(goal==='business'){
      const save=Math.round(m.left*.35),start=Math.round(m.left*.25),needs=Math.round(m.left*.25),flex=m.left-save-start-needs;
      return [{icon:'◒',name:'Safety savings',desc:'Keep some cash for surprises before taking business risks.',amount:save},{icon:'✳',name:'Business test fund',desc:'Set a cap for samples, transport, or a small market test.',amount:start},{icon:'⌂',name:'Irregular essentials',desc:'Prepare for repairs, school costs, or annual bills.',amount:needs},{icon:'♡',name:'Flexible money',desc:'Leave room for life and small treats.',amount:flex}];
    }
    if(goal==='goal'){
      const save=Math.round(m.left*.45),buffer=Math.round(m.left*.3),flex=m.left-save-buffer;
      return [{icon:'↗',name:'Your named goal',desc:$('goalName').value.trim()||'Give one priority a dedicated place in your budget.',amount:save},{icon:'◒',name:'Emergency buffer',desc:'Keep some savings separate from goal money.',amount:buffer},{icon:'♡',name:'Flexible / irregular costs',desc:'Leave space for unexpected everyday needs.',amount:flex}];
    }
    const save=Math.round(m.left*.4),debt=Math.round(m.left*.2),upcoming=Math.round(m.left*.25),flex=m.left-save-debt-upcoming;
    return [{icon:'◒',name:'Emergency savings',desc:'Start small; build toward a few months of essential expenses over time.',amount:save},{icon:'↘',name:'Debt or future bills',desc:'If you have high-cost debt, consider directing more here after minimums.',amount:debt},{icon:'⌂',name:'Irregular expenses',desc:'Repairs, school fees, annual bills, or other upcoming needs.',amount:upcoming},{icon:'♡',name:'Flexible money',desc:'Keep a little room for personal needs and enjoyment.',amount:flex}];
  }
  function renderPlan(m){
    const list=$('allocations');
    if(m.left<=0){
      $('planIntro').textContent='Your current expenses meet or exceed income. It is safer to stabilize the monthly budget before assigning money to savings.';
      $('planFoot').textContent='This is not a failure. First check whether every expense is essential, whether any bill can be renegotiated, and whether additional income or local support is available.';
    } else {
      $('planIntro').textContent=goal==='debt'?'A possible starting split that prioritizes reducing debt while keeping a small cushion.':goal==='business'?'A cautious split that keeps safety savings while setting a limited amount aside to test an income idea.':goal==='goal'?'A possible split for your chosen goal without putting every spare amount into it.':'A flexible starting split. Change the percentages in your own budget if another priority matters more.';
      $('planFoot').textContent='These are optional examples, not financial advice. If your income varies, bills are overdue, or you have expensive debt, adjust the plan before committing money.';
    }
    list.innerHTML=allocationPlan(m).map(a=>'<div class="allocation"><div class="allocation-icon">'+a.icon+'</div><div class="allocation-main"><div class="allocation-name">'+a.name+'</div><div class="allocation-desc">'+a.desc+'</div></div><div><div class="allocation-amount">'+money(a.amount)+'</div></div></div>').join('');
  }
  const ideaResources={
    virtual:[{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn how profiles and portfolios work; marketplace fees may apply.'},{label:'TESDA Online Program',url:'https://e-tesda.gov.ph/',note:'Explore available skills courses and check enrollment requirements.'},{label:'DTI Negosyo Centers',url:'https://negosyocenter.dti.gov.ph/',note:'Find official business support and training resources in the Philippines.'}],
    canva:[{label:'Canva Design School',url:'https://www.canva.com/design-school/',note:'Explore design lessons and improve your samples.'},{label:'Canva Content License Agreement',url:'https://www.canva.com/policies/content-license-agreement/',note:'Review the license before selling templates or using Canva content commercially.'},{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn about presenting your work to potential clients; marketplace fees may apply.'}],
    spreadsheet:[{label:'Google Workspace learning center',url:'https://support.google.com/a/users/answer/9282959?hl=en',note:'Find Google Sheets and other Workspace learning guides.'},{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn how to present a service and portfolio; marketplace fees may apply.'},{label:'TESDA Online Program',url:'https://e-tesda.gov.ph/',note:'Explore available digital and business skills courses.'}],
    teaching:[{label:'TESDA Online Program',url:'https://e-tesda.gov.ph/',note:'Explore available skills courses and check enrollment requirements.'},{label:'Khan Academy',url:'https://www.khanacademy.org/',note:'Use free learning materials to refresh subject knowledge; check suitability for your learners.'},{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn about offering services online; marketplace fees may apply.'}],
    food:[{label:'DOST-FNRI iTRAIN',url:'https://itrain.fnri.gov.ph/',note:'Explore food, nutrition, and related training resources.'},{label:'DTI guide to online business requirements',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Review registration, tax, and local permit considerations; requirements vary by business and location.'},{label:'DTI business-name registration',url:'https://bnrs.dti.gov.ph/',note:'Official business-name registration for sole proprietors; other registrations or permits may also be needed.'}],
    selling:[{label:'Google Trends',url:'https://trends.google.com/trends/',note:'Explore search interest; this is a clue, not proof that people will buy.'},{label:'DTI online-business FAQs',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Review online-selling, registration, and compliance guidance.'},{label:'DTI business-name registration',url:'https://bnrs.dti.gov.ph/',note:'Official business-name registration for sole proprietors; check other requirements too.'}],
    hands:[{label:'TESDA Online Program',url:'https://e-tesda.gov.ph/',note:'Look for training relevant to the service you want to offer.'},{label:'DTI Negosyo Centers',url:'https://negosyocenter.dti.gov.ph/',note:'Explore business support, training, and local Negosyo Center services.'},{label:'DTI online-business FAQs',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Useful if you promote or sell your services online; local rules can vary.'}],
    social:[{label:'Meta for Business learning',url:'https://www.facebook.com/business/learn',note:'Explore business and marketing learning resources from Meta.'},{label:'Canva Design School',url:'https://www.canva.com/design-school/',note:'Learn design basics for posts and simple marketing materials.'},{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn how to present a service to clients; marketplace fees may apply.'}],
    crafts:[{label:'DTI Negosyo Centers',url:'https://negosyocenter.dti.gov.ph/',note:'Find official small-business support and training resources.'},{label:'Google Trends',url:'https://trends.google.com/trends/',note:'Explore interest in product themes; validate demand with real potential buyers.'},{label:'DTI online-business FAQs',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Review online-selling and business-compliance considerations.'}],
    photography:[{label:'Canva Design School',url:'https://www.canva.com/design-school/',note:'Learn visual design basics for presenting product photos.'},{label:'Upwork freelancer starter guide',url:'https://support.upwork.com/hc/en-us/articles/211067578-How-to-get-started-as-a-freelancer-on-Upwork',note:'Learn how to show samples and offer a service; marketplace fees may apply.'},{label:'DTI Negosyo Centers',url:'https://negosyocenter.dti.gov.ph/',note:'Explore business support and training resources in the Philippines.'}],
    printable:[{label:'Canva Design School',url:'https://www.canva.com/design-school/',note:'Learn design basics for planners and printable products.'},{label:'Canva Content License Agreement',url:'https://www.canva.com/policies/content-license-agreement/',note:'Check commercial-use and licensing rules before selling designs or templates.'},{label:'DTI online-business FAQs',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Review online-selling and business-compliance guidance.'}],
    website:[{label:'freeCodeCamp',url:'https://www.freecodecamp.org/learn/',note:'Free interactive lessons for web development; start within your current skill level.'},{label:'Shopify guide to starting an online store',url:'https://www.shopify.com/blog/how-to-start-an-online-store',note:'A platform-specific guide; paid plans or fees may apply if you use Shopify.'},{label:'DTI online-business FAQs',url:'https://ecommerce.dti.gov.ph/faqs/',note:'Review Philippine online-business and compliance considerations.'}]
  };
  function resourcesForIdea(i){
    const key={
      'Virtual assistance':'virtual','Canva design mini-services':'canva','Spreadsheet setup':'spreadsheet',
      'Tutoring or homework support':'teaching','Pre-order snacks or baked goods':'food',
      'Reselling by pre-order':'selling','Local errand or organizing service':'hands',
      'Social media posting support':'social','Made-to-order crafts or gifts':'crafts',
      'Home cleaning or basic service':'hands','Simple product photography':'photography',
      'Small group skills workshop':'teaching','Digital planner or printable':'printable',
      'Weekend market stall':'selling','Basic website or online shop setup':'website',
      'Meal prep by order':'food','Specialty online store':'selling',
      'Event support or gift packaging':'crafts'
    }[i.name] || i.group;
    return ideaResources[key] || ideaResources.virtual;
  }
  function renderIdeas(m){
    const budget=Number($('budget').value),time=Number($('time').value),skill=$('skills').value;
    const affordable=ideas.filter(i=>i.budget<=budget && i.time<=time && (skill==='any'||i.group===skill||i.skills.includes(skill)));
    const ranked=affordable.sort((a,b)=>{
      let aa=(a.budget===0?3:0)+(a.time<=3?2:0),bb=(b.budget===0?3:0)+(b.time<=3?2:0);
      return bb-aa;
    }).slice(0,4);
    const el=$('ideaList');
    if(!ranked.length){el.innerHTML='<div class="idea"><h3>Try a broader filter</h3><p>Increase the budget or available hours, or choose “Show me a mix.” You can also start with a service that uses skills and tools you already have.</p></div>';return;}
    el.innerHTML=ranked.map(i=>{const resources=resourcesForIdea(i);const links=resources.map(r=>'<li><a href="'+r.url+'" target="_blank" rel="noopener noreferrer">'+r.label+'</a><small>'+r.note+'</small></li>').join('');return '<article class="idea"><div class="idea-top"><div class="idea-emoji">'+i.emoji+'</div><div><h3>'+i.name+'</h3><div class="idea-cost">Estimated start: '+(i.budget===0?'₱0–low cost':money(i.budget)+' or less to test')+'</div></div></div><p>'+i.desc+'</p><div class="idea-details"><div><strong>First step:</strong> '+i.first+'</div><div><strong>Watch out for:</strong> '+i.caution+'</div></div><span class="idea-tag">'+(i.budget===0?'USE WHAT YOU HAVE':'TEST BEFORE YOU INVEST')+'</span><div class="idea-resources"><strong>Useful links to get started</strong><ul>'+links+'</ul></div></article>';}).join('');
  }
  function render(){
    document.querySelectorAll('.currency-symbol').forEach(el=>el.textContent=currency==='PHP'?'₱':'$');
    document.querySelectorAll('[data-currency]').forEach(b=>b.classList.toggle('active',b.dataset.currency===currency));
    $('currencyNote').textContent=currency==='PHP'?'Amounts shown in PHP. Switch to USD using an approximate 56 PHP per USD conversion (not live exchange data).':'Amounts shown in USD. Converted at an approximate 56 PHP per USD (not live exchange data).';
    const budgetLabels=[['0','₱0 — use what I have'],['2000','Up to ₱2,000'],['5000','Up to ₱5,000'],['15000','Up to ₱15,000'],['50000','₱15,000+']];
    Array.from($('budget').options).forEach((option,index)=>{const value=Number(budgetLabels[index][0]);option.textContent=currency==='PHP'?budgetLabels[index][1]:(value===0?'$0 — use what I have':index===4?'$268+': 'Up to '+money(value/rate));});
    const m=monthly(), safeIncome=Math.max(0,m.income), expenses=m.expenses;
    $('remaining').textContent=(m.left<0?'−':'')+money(Math.abs(m.left));
    $('totalIncome').textContent=money(m.income);$('totalExpenses').textContent=money(m.expenses);
    const spent=m.income>0?Math.min(100,expenses/m.income*100):expenses>0?100:0;
    const remainingPct=m.income>0?Math.max(0,100-expenses/m.income*100):0;
    $('expenseBar').style.width=spent+'%';$('leftBar').style.width=remainingPct+'%';
    $('expensePercent').textContent=Math.round(spent)+'%';$('leftPercent').textContent=Math.round(remainingPct)+'%';
    const status=$('status'),alert=$('alert');
    alert.classList.add('hidden');alert.textContent='';
    if(m.income===0 && expenses===0){status.className='status warn';status.textContent='Enter your income and expenses to begin.';}
    else if(m.left<0){status.className='status bad';status.textContent='Expenses are higher than income by '+money(Math.abs(m.left))+'.';alert.textContent='Your expenses exceed income. Pause savings allocations for now. Review flexible costs, payment options, and realistic ways to increase income before taking on new debt.';alert.classList.remove('hidden');}
    else if(m.left===0){status.className='status warn';status.textContent='Your budget is fully allocated—there is no cushion yet.';alert.textContent='Consider reviewing one expense or exploring a low-cost income idea. Avoid setting a savings amount until there is money left after essentials.';alert.classList.remove('hidden');}
    else if(m.left < m.income*.1){status.className='status warn';status.textContent='There is a small cushion. Keep the plan gentle.';}
    else {status.className='status good';status.textContent='There may be room to make a plan.';}
    renderPlan(m);renderIdeas(m);
    if(m.left<0){$('nextTitle').textContent='First, make the month more manageable.';$('nextText').textContent='Check essential bills, see whether any costs can be reduced or rescheduled, and explore low-cost ways to earn more without borrowing to start.';}
    else if(goal==='business'){$('nextTitle').textContent='Test an idea before investing.';$('nextText').textContent='Choose one idea, speak to potential customers, estimate all costs, and try the smallest safe version before buying supplies.';}
    else if(goal==='debt'){$('nextTitle').textContent='Know the cost of each debt.';$('nextText').textContent='Keep required minimums current where possible, compare interest rates, and direct extra payments only after essential needs are covered.';}
    else {$('nextTitle').textContent='Start with one calm money check-in.';$('nextText').textContent='Use your real numbers, then choose one small action you can repeat next month.';}
  }
  function convertCurrency(next){
    if(next===currency)return;
    const factor=next==='USD'?1/rate:rate;
    document.querySelectorAll('input[type=number]').forEach(input=>{input.value=String(Math.round((Number(input.value)||0)*factor*100)/100);});
    currency=next;render();
  }
  document.querySelectorAll('[data-currency]').forEach(b=>b.addEventListener('click',()=>convertCurrency(b.dataset.currency)));
  document.querySelectorAll('input').forEach(input=>input.addEventListener('input',render));
  document.querySelectorAll('[data-goal]').forEach(b=>b.addEventListener('click',()=>{goal=b.dataset.goal;document.querySelectorAll('[data-goal]').forEach(x=>x.classList.toggle('selected',x===b));render();}));
  ['budget','time','skills'].forEach(id=>$(id).addEventListener('change',render));
  $('reset').addEventListener('click',()=>{currency='PHP';goal='stability';Object.entries(defaults).forEach(([id,val])=>$(id).value=val);$('goalName').value='';$('budget').value='2000';$('time').value='7';$('skills').value='any';document.querySelectorAll('[data-goal]').forEach(b=>b.classList.toggle('selected',b.dataset.goal==='stability'));render();window.scrollTo({top:0,behavior:'smooth'});});
  $('printPlan').addEventListener('click',()=>window.print());
  render();
})();
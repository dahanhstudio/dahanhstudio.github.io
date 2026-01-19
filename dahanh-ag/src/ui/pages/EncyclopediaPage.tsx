import React, { useState } from 'react';
import { 
  Book, 
  ShieldCheck, 
  Terminal, 
  Command, 
  Info, 
  ChevronRight, 
  Github, 
  Cpu, 
  Search,
  BookOpen,
  Zap
} from 'lucide-react';

export function EncyclopediaPage() {
  const [activeTab, setActiveTab] = useState('rules');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const chapters: any = {
    rules: {
      title: 'Hiến pháp Agent Control',
      icon: <ShieldCheck className="w-5 h-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 p-8 border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-2">🧠 Unified Agent Constitution</h2>
            <p className="text-slate-400">Bộ luật đại lý thống nhất cho dự án Antigravity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Zap className="w-4 h-4 text-yellow-400" /> Nguyên tắc Cốt lõi
              </h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><strong className="text-slate-200">Quality &gt; Quantity:</strong> Tối ưu context, không nhồi nhét file.</li>
                <li><strong className="text-slate-200">Safety First:</strong> Không chạy migration/delete mà không có plan.</li>
                <li><strong className="text-slate-200">Evidence &gt; Assumption:</strong> Dùng quy trình RCA cho mọi bug.</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:border-indigo-500/30 transition-all">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" /> Compliance Gates
              </h3>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><strong className="text-slate-200">GDPR/CCPA:</strong> Kiểm tra rò rỉ dữ liệu cá nhân (PII).</li>
                <li><strong className="text-white">Security:</strong> Cấm hardcode credentials/tokens.</li>
                <li><strong className="text-slate-200">Accessibility:</strong> UI đạt chuẩn WCAG.</li>
              </ul>
            </div>
          </div>

          <div className="rounded-xl bg-slate-900/50 border border-white/5 p-6">
            <h3 className="text-lg font-semibold text-white mb-4">🗺️ Bản đồ Quy trình (Workflow Map)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-slate-500">
                    <th className="pb-3 pr-4">Miền (Domain)</th>
                    <th className="pb-3 pr-4">Giao thức</th>
                    <th className="pb-3">Mục tiêu</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 divide-y divide-white/5">
                  <tr><td className="py-3 font-medium text-slate-200">AI / RAG</td><td>ai.md</td><td>Prompting, Evaluation</td></tr>
                  <tr><td className="py-3 font-medium text-slate-200">Backend</td><td>backend.md</td><td>API Design, Python/Node</td></tr>
                  <tr><td className="py-3 font-medium text-slate-200">Frontend</td><td>frontend.md</td><td>Premium UI, Anti-Slop</td></tr>
                  <tr><td className="py-3 font-medium text-slate-200">Architect</td><td>architect.md</td><td>Multi-agent, BDI</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )
    },
    guide: {
      title: 'Cẩm nang Vận hành',
      icon: <Terminal className="w-5 h-5" />,
      content: (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <section>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="text-yellow-500" /> Smart Sequence (Chuỗi gọi thông minh)
            </h3>
            <div className="relative border-l-2 border-indigo-500 pl-8 ml-4 space-y-8">
              {[
                { step: '1', cmd: '/plan', desc: 'Thiết kế kiến trúc và chốt Spec' },
                { step: '2', cmd: '/visualize', desc: 'Thiết kế giao diện Luxury & Mockup' },
                { step: '3', cmd: '/code', desc: 'Thực thi lập trình theo đúng module' },
                { step: '4', cmd: '/audit', desc: 'Giám sát khắt khe, xóa AI Slop' }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[41px] top-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold border-4 border-slate-950">
                    {item.step}
                  </span>
                  <div className="flex flex-col">
                    <code className="text-indigo-400 font-mono text-lg">{item.cmd}</code>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-500/20 shadow-2xl shadow-indigo-500/5">
            <h3 className="text-lg font-semibold text-white mb-2">💡 Pro Tip: Menu Số</h3>
            <p className="text-slate-400 text-sm">
              Đừng tốn công gõ lệnh dài. Antigravity luôn hiển thị <strong>Menu Số</strong> ở cuối câu. Anh chỉ cần gõ số (1, 2, 3...) để kích hoạt bước tiếp theo nhanh nhất.
            </p>
          </div>
        </div>
      )
    },
    reference: {
      title: 'Hơi thở Antigravity (Skills)',
      icon: <Command className="w-5 h-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
           <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-red-500/20 rounded-lg"><Cpu className="text-red-400" /></div>
              <div>
                <h3 className="text-xl font-bold text-white">46 Specialized Skills</h3>
                <p className="text-slate-500">Hệ sinh thái kỹ năng chuyên sâu</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { cat: 'Cognitive', items: ['bdi-mental-states', 'multi-agent-patterns', 'memory-systems'], color: 'blue' },
                { cat: 'Design', items: ['ui-ux-pro-max', 'glassmorphism', 'algorithmic-art'], color: 'purple' },
                { cat: 'Office', items: ['xlsx-advanced', 'docx-master', 'pdf-magic'], color: 'green' },
                { cat: 'Engineering', items: ['mcp-builder', 'hosted-agents', 'reverse-engineering'], color: 'orange' }
              ].map((group, i) => (
                <div key={i} className={`p-4 rounded-xl bg-slate-900/50 border border-${group.color}-500/10`}>
                  <h4 className={`text-${group.color}-400 font-semibold mb-3`}>{group.cat}</h4>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={j} className="px-2 py-1 rounded-md bg-white/5 text-slate-400 text-xs border border-white/5">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
           </div>
        </div>
      )
    },
    items: {
      title: 'Nhật ký Tri thức (KIs)',
      icon: <Info className="w-5 h-5" />,
      content: (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {[
            { id: '001', title: 'Local Secrets Mechanism', desc: 'Tuyệt đối bảo mật Token bằng secrets.local.md.', impact: 'High' },
            { id: '002', title: 'Monolith Protocol', desc: 'Tự động chia nhỏ file khi vượt ngưỡng 900 dòng code.', impact: 'Critical' },
            { id: '003', title: 'Adversarial Auditor', desc: 'Hệ thống giám sát đối nghịch, không khoan nhượng.', impact: 'High' },
            { id: '004', title: 'Anti-AI Slop Standards', desc: 'Bẻ gãy thói quen cẩu thả, dùng SVG & Code tối giản.', impact: 'Medium' }
          ].map((ki, i) => (
            <div key={i} className="group p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:bg-slate-800/50 transition-all">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-indigo-400">KI #{ki.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${ki.impact === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                  {ki.impact} Impact
                </span>
              </div>
              <h4 className="text-white font-semibold mb-2">{ki.title}</h4>
              <p className="text-slate-400 text-sm">{ki.desc}</p>
            </div>
          ))}
        </div>
      )
    }
  };

  return (
    <div className="flex flex-1 h-full bg-slate-950 font-sans text-slate-200 overflow-hidden">
      {/* Internal Navigation */}
      <div className={`${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 border-r border-white/5 bg-slate-900/20 flex flex-col`}>
        <div className="p-4 flex items-center gap-3 border-b border-white/5">
          <Book className="text-indigo-400 w-5 h-5 min-w-[20px]" />
          {isSidebarOpen && <span className="font-bold text-sm tracking-tight text-white">WIKI CENTER</span>}
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {Object.entries(chapters).map(([id, chapter]: [string, any]) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 p-2.5 rounded-lg transition-all ${
                activeTab === id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-500/20' 
                : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
              }`}
            >
              {chapter.icon}
              {isSidebarOpen && <span className="font-medium text-xs whitespace-nowrap">{chapter.title}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-white/5">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center justify-center p-2 rounded hover:bg-white/5 transition-all text-slate-500"
          >
            {isSidebarOpen ? <ChevronRight className="rotate-180 h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden bg-[radial-gradient(circle_at_50%_0%,rgba(79,70,229,0.05),transparent_50%)]">
        <header className="h-12 border-b border-white/5 px-6 flex items-center justify-between bg-slate-950/50">
          <div className="flex items-center gap-2 text-slate-500 text-[10px] uppercase tracking-wider">
            <BookOpen className="w-3 h-3" />
            <span>Thư viện</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-indigo-400 font-bold">{chapters[activeTab].title}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-600" />
                <input 
                  type="text" 
                  placeholder="Tra cứu..." 
                  className="bg-slate-900 border border-white/5 rounded-full py-1 pl-8 pr-3 text-[10px] focus:outline-none focus:ring-1 focus:ring-indigo-500/50 w-32 transition-all"
                />
             </div>
             <Github className="w-4 h-4 text-slate-500 hover:text-slate-300 cursor-pointer" />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            {chapters[activeTab].content}
          </div>
        </main>

        <footer className="h-8 border-t border-white/5 px-6 flex items-center justify-between text-[9px] text-slate-600 uppercase font-mono tracking-tighter">
          <span>Dạ Hành Studio — Absolute Control Protocol</span>
          <span>© 2026 Antigravity System</span>
        </footer>
      </div>
    </div>
  );
}

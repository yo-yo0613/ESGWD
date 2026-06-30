export default function FloatingContact() {
  return (
    <div className="fixed right-4 bottom-24 z-50 flex flex-col space-y-3">
      {/* Email */}
      <a 
        href="mailto:contact@esgwd.org" 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-lg hover:bg-brand-orange hover:text-white hover:-translate-x-1.5 transition-all duration-300"
        title="聯絡信箱"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </a>

      {/* Facebook */}
      <a 
        href="https://www.facebook.com/esgwd" 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 hover:text-white hover:-translate-x-1.5 transition-all duration-300"
        title="官方臉書"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </a>

      {/* LINE */}
      <a 
        href="https://line.me/ti/g2/WMHkOVxPfVW6OdtUG6fBnnELHPHsmec9F2k-5Q?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" 
        target="_blank" 
        rel="noreferrer"
        className="w-11 h-11 bg-white border border-slate-200 text-slate-600 rounded-full flex items-center justify-center shadow-lg hover:bg-green-500 hover:text-white hover:-translate-x-1.5 transition-all duration-300"
        title="LINE 社群"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M24 10.304c0-5.369-5.383-9.738-12-9.738s-12 4.369-12 9.738c0 4.814 4.269 8.846 10.036 9.564.39.084.922.258 1.058.592.12.303.079.778.038 1.087-.041.309-.189 1.241-.231 1.721-.052.585-.246 2.29 1.061 1.248 1.307-1.042 7.07-7.724 9.645-10.457 2.457-2.615 3.393-4.048 3.393-5.05zm-15.111 2.297h-2.18v-3.805h-.624v4.429h2.804v-.624zm1.96 0h-.624V8.796h.624v3.805zm3.176 0h-.605l-2.075-2.909v2.909h-.624V8.796h.605l2.075 2.909V8.796h.624v3.805zm2.748-2.673h-1.637V8.796h2.245v.624h-1.621v1.171h1.528v.624h-1.528v1.171h1.637v.624z"/>
        </svg>
      </a>
    </div>
  );
}

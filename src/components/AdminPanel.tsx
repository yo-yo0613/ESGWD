import React, { useState, useEffect } from 'react';
import { initialBentoData } from '../data/bentoInitialData';
import type { BentoBlock } from '../data/bentoInitialData';
import { supabase } from '../utils/supabaseClient';
import { 
  loadConfig, 
  saveConfig, 
  initializeConfigsIfNeeded,
  DEFAULT_CONFIGS
} from '../utils/configLoader';
import type { 
  HeroSlideData, 
  ProjectData, 
  NewsArticleData, 
  SponsorData, 
  AwardWinnerData, 
  BookCtaData, 
  DonationPlanData 
} from '../data/siteInitialData';

import { 
  LayoutDashboard, 
  Grid, 
  Settings, 
  Trash2, 
  Upload, 
  ArrowLeft, 
  Plus,
  LogOut,
  Image as ImageIcon,
  Newspaper,
  Heart,
  Award,
  Shield,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Users
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart as RechartsBarChart,
  Bar,
  Cell
} from 'recharts';

interface VisitorLog {
  id: number;
  session_id: string;
  path: string;
  referrer: string | null;
  user_agent: string;
  created_at: string;
}

interface Member {
  name: string;
  name_en?: string;
  role: string;
  role_en?: string;
  desc: string;
  desc_en?: string;
  avatar: string;
}

interface AboutUsMembers {
  board: Member[];
  directors: Member[];
  honorary: Member[];
  team: Member[];
}

export default function AdminPanel() {
  const [aboutMembers, setAboutMembers] = useState<AboutUsMembers>({ board: [], directors: [], honorary: [], team: [] });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'bento' | 'hero' | 'projects' | 'news' | 'partners' | 'ebook_donation' | 'analytics' | 'settings' | 'about_us'
  >('dashboard');
  
  const [visitorLogs, setVisitorLogs] = useState<VisitorLog[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [lookerStudioUrl, setLookerStudioUrl] = useState('');
  const [isSavingUrl, setIsSavingUrl] = useState(false);
  
  const [blocks, setBlocks] = useState<BentoBlock[]>([]);
  
  // Login Form States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Bento Block Form States
  const [bentoTitle, setBentoTitle] = useState('');
  const [bentoSubtitle, setBentoSubtitle] = useState('');
  const [bentoTag, setBentoTag] = useState('ESG企業治理');
  const [bentoSize, setBentoSize] = useState<'large' | 'wide' | 'small'>('large');
  const [bentoCardType, setBentoCardType] = useState<'hero' | 'event' | 'news' | 'cta'>('hero');
  const [bentoImageUrl, setBentoImageUrl] = useState('/images/concert_hero.jpg');
  const [uploadingBentoImage, setUploadingBentoImage] = useState(false);

  // Full CMS States
  const [heroSlides, setHeroSlides] = useState<HeroSlideData[]>([]);
  const [projectsList, setProjectsList] = useState<ProjectData[]>([]);
  const [newsList, setNewsList] = useState<NewsArticleData[]>([]);
  const [sponsorsList, setSponsorsList] = useState<SponsorData[]>([]);
  const [winnersList, setWinnersList] = useState<AwardWinnerData[]>([]);
  const [bookCta, setBookCta] = useState<BookCtaData | null>(null);
  const [donationPlans, setDonationPlans] = useState<DonationPlanData[]>([]);

  // Generic Image Upload State
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  // Form states for creating new items
  const [newNewsTitle, setNewNewsTitle] = useState('');
  const [newNewsTitleEn, setNewNewsTitleEn] = useState('');
  const [newNewsSummary, setNewNewsSummary] = useState('');
  const [newNewsSummaryEn, setNewNewsSummaryEn] = useState('');
  const [newNewsCategory, setNewNewsCategory] = useState<'enterprise' | 'education' | 'concert'>('education');
  const [newNewsImage, setNewNewsImage] = useState('');
  const [newNewsDate, setNewNewsDate] = useState('');

  const [newSponsorName, setNewSponsorName] = useState('');
  const [newSponsorEnglishName, setNewSponsorEnglishName] = useState('');
  const [newSponsorColor, setNewSponsorColor] = useState('#0097A7');

  const [newWinnerCompany, setNewWinnerCompany] = useState('');
  const [newWinnerAward, setNewWinnerAward] = useState('');
  const [newWinnerDesc, setNewWinnerDesc] = useState('');
  const [newWinnerIcon, setNewWinnerIcon] = useState('Award');

  // Cloudinary Helper Upload
  const uploadToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'sister_preset');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dt1ridsu5/image/upload`,
        { method: 'POST', body: formData }
      );
      const data = await response.json();
      return data.secure_url || null;
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      return null;
    }
  };

  const handleCloudinaryBentoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingBentoImage(true);
    const url = await uploadToCloudinary(e.target.files[0]);
    if (url) {
      setBentoImageUrl(url);
      alert('✨ Bento 圖片成功上傳至 Cloudinary 雲端！');
    } else {
      alert('圖片上傳失敗，請檢查 Cloudinary 設定');
    }
    setUploadingBentoImage(false);
  };

  const handleCloudinaryFieldUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'news', index?: number) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const key = `${type}-${index !== undefined ? index : 'new'}`;
    setUploadingField(key);
    const url = await uploadToCloudinary(e.target.files[0]);
    
    if (url) {
      if (type === 'hero' && index !== undefined) {
        const updated = [...heroSlides];
        updated[index] = { ...updated[index], bgImage: url };
        setHeroSlides(updated);
      } else if (type === 'news') {
        setNewNewsImage(url);
      }
      alert('✨ 圖片成功上傳至 Cloudinary 雲端！');
    } else {
      alert('圖片上傳失敗，請檢查 Cloudinary 設定');
    }
    setUploadingField(null);
  };

  // Fetch Bento blocks & Initializing configs
  useEffect(() => {
    const session = sessionStorage.getItem('esg_admin_logged_in');
    const local = localStorage.getItem('esg_admin_logged_in');
    if (session === 'true' || local === 'true') {
      setIsLoggedIn(true);
    }

    const initAndLoad = async () => {
      // 1. Fetch Bento Blocks
      try {
        const { data, error } = await supabase
          .from('bento_blocks')
          .select('*')
          .order('date', { ascending: false });

        if (error) throw error;
        
        if (data) {
          const camelCaseData: BentoBlock[] = data.map((item: any) => ({
            id: item.id,
            cardType: item.card_type,
            bentoSize: item.bento_size,
            title: item.title,
            subtitle: item.subtitle || undefined,
            imageUrl: item.image_url || undefined,
            tag: item.tag || undefined,
            buttonText: item.button_text || undefined,
            date: item.date
          }));
          setBlocks(camelCaseData);
          localStorage.setItem('esg_bento_blocks', JSON.stringify(camelCaseData));
        }
      } catch (err) {
        console.warn('Supabase bento fetch failed, using local storage:', err);
        const stored = localStorage.getItem('esg_bento_blocks');
        if (stored) {
          try { setBlocks(JSON.parse(stored)); } catch (e) { setBlocks(initialBentoData); }
        } else {
          setBlocks(initialBentoData);
          localStorage.setItem('esg_bento_blocks', JSON.stringify(initialBentoData));
        }
      }

      // 2. Initialize missing database config keys
      await initializeConfigsIfNeeded();

      // 3. Load all site section configuration states
      loadAllEditStates();
    };

    initAndLoad();
  }, []);

  const loadAllEditStates = async () => {
    const hs = await loadConfig<HeroSlideData[]>('hero_slides');
    if (hs) setHeroSlides(hs);

    const prj = await loadConfig<ProjectData[]>('projects');
    if (prj) setProjectsList(prj);

    const nws = await loadConfig<NewsArticleData[]>('news_articles');
    if (nws) setNewsList(nws);

    const sp = await loadConfig<SponsorData[]>('sponsors');
    if (sp) setSponsorsList(sp);

    const win = await loadConfig<AwardWinnerData[]>('award_winners');
    if (win) setWinnersList(win);

    const bk = await loadConfig<BookCtaData>('book_cta');
    if (bk) setBookCta(bk);

    const dp = await loadConfig<DonationPlanData[]>('donation_plans');
    if (dp) setDonationPlans(dp);

    const lsu = await loadConfig<string>('looker_studio_url');
    if (lsu) setLookerStudioUrl(lsu);

    const members = await loadConfig<AboutUsMembers>('about_us_members');
    if (members) setAboutMembers(members);
  };

  const fetchVisitorLogs = async () => {
    setAnalyticsLoading(true);
    try {
      const fourteenDaysAgo = new Date();
      fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
      const isoString = fourteenDaysAgo.toISOString();

      const { data, error } = await supabase
        .from('visitor_logs')
        .select('*')
        .gte('created_at', isoString)
        .order('created_at', { ascending: true });

      if (error) throw error;
      if (data) setVisitorLogs(data);
    } catch (err) {
      console.error('Failed to fetch visitor logs:', err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn && (activeTab === 'analytics' || activeTab === 'dashboard')) {
      fetchVisitorLogs();
    }
  }, [activeTab, isLoggedIn]);

  const handleSizeChange = (size: 'large' | 'wide' | 'small') => {
    setBentoSize(size);
    if (size === 'large') {
      setBentoCardType('hero');
      setBentoImageUrl('/images/concert_hero.jpg');
    } else if (size === 'wide') {
      setBentoCardType('event');
      setBentoImageUrl('/images/forum_hero.jpg');
    } else {
      setBentoCardType('cta');
      setBentoImageUrl('');
    }
  };

  const handleAddBlock = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bentoTitle.trim()) {
      alert('請輸入區塊標題！');
      return;
    }

    const newBlock: BentoBlock = {
      id: `bento-${Date.now()}`,
      cardType: bentoCardType,
      bentoSize,
      title: bentoTitle,
      subtitle: bentoSubtitle || undefined,
      tag: bentoSize !== 'small' ? bentoTag : undefined,
      imageUrl: bentoSize !== 'small' ? bentoImageUrl : undefined,
      buttonText: bentoSize === 'small' ? '立即線上支持' : undefined,
      date: new Date().toISOString().split('T')[0]
    };

    try {
      const { error } = await supabase
        .from('bento_blocks')
        .insert([{
          id: newBlock.id,
          card_type: newBlock.cardType,
          bento_size: newBlock.bentoSize,
          title: newBlock.title,
          subtitle: newBlock.subtitle || null,
          image_url: newBlock.imageUrl || null,
          tag: newBlock.tag || null,
          button_text: newBlock.buttonText || null,
          date: newBlock.date
        }]);

      if (error) throw error;
      
      const updated = [...blocks, newBlock];
      setBlocks(updated);
      localStorage.setItem('esg_bento_blocks', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      alert('✨ Bento 區塊成功儲存至 Supabase 雲端！');
    } catch (err) {
      console.warn('Supabase insert failed, saving to local state instead:', err);
      const updated = [...blocks, newBlock];
      setBlocks(updated);
      localStorage.setItem('esg_bento_blocks', JSON.stringify(updated));
      window.dispatchEvent(new Event('storage'));
      alert('Bento 區塊發布成功！(已儲存至本機快取)');
    }

    setBentoTitle('');
    setBentoSubtitle('');
  };

  const handleDeleteBlock = async (id: string) => {
    if (confirm('確定要刪除此 Bento 區塊嗎？')) {
      try {
        const { error } = await supabase
          .from('bento_blocks')
          .delete()
          .eq('id', id);

        if (error) throw error;

        const updated = blocks.filter(b => b.id !== id);
        setBlocks(updated);
        localStorage.setItem('esg_bento_blocks', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        alert('✨ Bento 區塊已自 Supabase 雲端刪除！');
      } catch (err) {
        console.warn('Supabase delete failed, removing from local state:', err);
        const updated = blocks.filter(b => b.id !== id);
        setBlocks(updated);
        localStorage.setItem('esg_bento_blocks', JSON.stringify(updated));
        window.dispatchEvent(new Event('storage'));
        alert('Bento 區塊已刪除！(已自本機快取移除)');
      }
    }
  };

  // --- SAVE cms states to database ---
  const handleSaveHero = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveConfig('hero_slides', heroSlides);
      alert('✨ Hero 輪播大圖與大標題設定已成功儲存至 Supabase！');
    } catch (err) {
      alert('儲存失敗，已暫存於本機快取');
    }
  };

  const handleSaveProjects = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveConfig('projects', projectsList);
      alert('✨ 核心專案卡片與數據指標已成功儲存至 Supabase！');
    } catch (err) {
      alert('儲存失敗，已暫存於本機快取');
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNewsTitle.trim()) return;

    const newItem: any = {
      id: Date.now(),
      title: newNewsTitle,
      title_en: newNewsTitleEn,
      category: newNewsCategory,
      categoryLabel: newNewsCategory === 'enterprise' ? '企業論壇' : newNewsCategory === 'education' ? '學童教育' : '音樂會',
      date: newNewsDate || new Date().toISOString().split('T')[0],
      summary: newNewsSummary,
      summary_en: newNewsSummaryEn,
      image: newNewsImage || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80'
    };

    const updated = [newItem, ...newsList];
    try {
      await saveConfig('news_articles', updated);
      setNewsList(updated);
      setNewNewsTitle('');
      setNewNewsTitleEn('');
      setNewNewsSummary('');
      setNewNewsSummaryEn('');
      setNewNewsImage('');
      alert('✨ 最新消息文章已成功發布！');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleDeleteNews = async (id: number) => {
    if (!confirm('確定要刪除這篇文章嗎？')) return;
    const updated = newsList.filter(n => n.id !== id);
    try {
      await saveConfig('news_articles', updated);
      setNewsList(updated);
      alert('✨ 該文章已自資料庫刪除');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleAddSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSponsorName.trim()) return;
    const newItem: SponsorData = {
      id: Date.now(),
      name: newSponsorName,
      englishName: newSponsorEnglishName || 'PARTNER',
      color: newSponsorColor
    };
    const updated = [...sponsorsList, newItem];
    try {
      await saveConfig('sponsors', updated);
      setSponsorsList(updated);
      setNewSponsorName('');
      setNewSponsorEnglishName('');
      alert('✨ 新贊助企業已加入！');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleDeleteSponsor = async (id: number) => {
    if (!confirm('確定要移除此贊助企業嗎？')) return;
    const updated = sponsorsList.filter(s => s.id !== id);
    try {
      await saveConfig('sponsors', updated);
      setSponsorsList(updated);
      alert('✨ 贊助商已移除');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleAddWinner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWinnerCompany.trim()) return;
    const newItem: AwardWinnerData = {
      id: Date.now(),
      company: newWinnerCompany,
      award: newWinnerAward,
      description: newWinnerDesc,
      iconName: newWinnerIcon
    };
    const updated = [...winnersList, newItem];
    try {
      await saveConfig('award_winners', updated);
      setWinnersList(updated);
      setNewWinnerCompany('');
      setNewWinnerAward('');
      setNewWinnerDesc('');
      alert('✨ 新增金恆獎得獎紀錄成功！');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleDeleteWinner = async (id: number) => {
    if (!confirm('確定要移除此得獎紀錄嗎？')) return;
    const updated = winnersList.filter(w => w.id !== id);
    try {
      await saveConfig('award_winners', updated);
      setWinnersList(updated);
      alert('✨ 得獎紀錄已移除');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleSaveBookCta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookCta) return;
    try {
      await saveConfig('book_cta', bookCta);
      alert('✨ 電子書學術專著 CTA 內容已儲存！');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  const handleSaveDonationPlans = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveConfig('donation_plans', donationPlans);
      alert('✨ 會員認捐方案與滿額禮明細儲存成功！');
    } catch (err) {
      alert('儲存失敗');
    }
  };

  // Helper nested states modifiers
  const updateSlideField = (index: number, field: keyof HeroSlideData, value: string) => {
    const updated = [...heroSlides];
    updated[index] = { ...updated[index], [field]: value } as HeroSlideData;
    setHeroSlides(updated);
  };

  const updateProjectField = (index: number, field: keyof ProjectData, value: any) => {
    const updated = [...projectsList];
    updated[index] = { ...updated[index], [field]: value } as ProjectData;
    setProjectsList(updated);
  };

  const updateProjectStat = (prjIdx: number, statIdx: number, field: 'label' | 'label_en' | 'value' | 'value_en', value: string) => {
    const updated = [...projectsList];
    const stats = [...updated[prjIdx].stats];
    stats[statIdx] = { ...stats[statIdx], [field]: value };
    updated[prjIdx] = { ...updated[prjIdx], stats };
    setProjectsList(updated);
  };

  const updateBookField = (field: keyof BookCtaData, value: any) => {
    if (!bookCta) return;
    setBookCta({ ...bookCta, [field]: value });
  };

  const updateBookHighlight = (index: number, field: 'title' | 'title_en' | 'desc' | 'desc_en' | 'iconName', value: string) => {
    if (!bookCta) return;
    const highlights = [...bookCta.highlights];
    highlights[index] = { ...highlights[index], [field]: value } as any;
    setBookCta({ ...bookCta, highlights });
  };

  const updatePlanField = (index: number, field: keyof DonationPlanData, value: any) => {
    const updated = [...donationPlans];
    updated[index] = { ...updated[index], [field]: value } as DonationPlanData;
    setDonationPlans(updated);
  };

  const handlePlanBenefitsChange = (index: number, rawText: string) => {
    const updated = [...donationPlans];
    updated[index] = {
      ...updated[index],
      benefits: rawText.split('\n').filter(line => line.trim() !== '')
    };
    setDonationPlans(updated);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    setTimeout(() => {
      if (username === 'admin' && password === 'esgadmin123') {
        setIsLoggedIn(true);
        if (rememberMe) {
          localStorage.setItem('esg_admin_logged_in', 'true');
        } else {
          sessionStorage.setItem('esg_admin_logged_in', 'true');
        }
      } else {
        setErrorMsg('帳號或密碼錯誤！(提示: admin / esgadmin123)');
      }
      setLoading(false);
    }, 800);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    sessionStorage.removeItem('esg_admin_logged_in');
    localStorage.removeItem('esg_admin_logged_in');
    setUsername('');
    setPassword('');
  };

  // Preset images
  const presetBanners = [
    { url: '/images/concert_hero.jpg', name: '音樂會' },
    { url: '/images/forum_hero.jpg', name: '領袖論壇' },
    { url: '/images/ai_music_hero.jpg', name: 'AI音樂競賽' }
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-brand-navy-dark text-white flex items-center justify-center p-6 relative overflow-hidden font-sans selection:bg-brand-amber selection:text-brand-navy">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-amber/10 rounded-full blur-[150px] pointer-events-none" />
        
        <div className="w-full max-w-md bg-brand-navy-light/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl space-y-8 relative z-10 animate-fade-in">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-bold text-white shadow-lg shadow-brand-orange/20 mx-auto text-xl">
              世
            </div>
            <div>
              <h2 className="text-2xl font-heading font-extrabold text-white tracking-wider">
                全站內容管理系統
              </h2>
              <p className="text-xs text-white/50 tracking-wider uppercase mt-1">
                World Citizen Foundation CMS Login
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 font-medium">
                {errorMsg}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/70 block">管理員帳號 (Account)</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="請輸入帳號"
                className="w-full bg-brand-navy border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber text-white placeholder-white/35 transition-all"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/70 block">管理員密碼 (Password)</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="請輸入密碼"
                className="w-full bg-brand-navy border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-amber focus:ring-1 focus:ring-brand-amber text-white placeholder-white/35 transition-all"
                required
              />
            </div>

            <div className="flex justify-between items-center text-xs text-white/60">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-white/10 bg-brand-navy accent-brand-amber focus:ring-0 animate-pulse"
                />
                <span>記住登入狀態</span>
              </label>
              <a href="/" className="hover:text-brand-amber transition-colors">
                返回首頁
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-brand-navy font-bold text-sm bg-gradient-to-r from-brand-amber to-brand-orange hover:shadow-lg hover:shadow-brand-orange/20 active:scale-95 hover:scale-[1.01] transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {loading ? <span>登入驗證中...</span> : <span>管理員登入</span>}
            </button>
          </form>

          <div className="pt-2 text-center text-[10px] text-white/30 leading-relaxed border-t border-white/5">
            登入提示: 帳號 <code className="bg-white/5 px-1 py-0.5 rounded text-brand-amber">admin</code> ‧ 密碼 <code className="bg-white/5 px-1 py-0.5 rounded text-brand-amber">esgadmin123</code>
          </div>
        </div>
      </div>
    );
  }

  const getTodayStats = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayLogs = visitorLogs.filter(log => log.created_at && log.created_at.startsWith(today));
    const todayPV = todayLogs.length;
    const todayUV = new Set(todayLogs.map(log => log.session_id)).size;

    const totalPV = visitorLogs.length;
    const totalUV = new Set(visitorLogs.map(log => log.session_id)).size;

    return { todayPV, todayUV, totalPV, totalUV };
  };
  const { todayPV, todayUV, totalPV, totalUV } = getTodayStats();

  const processDailyData = (logs: VisitorLog[]) => {
    const daysMap: Record<string, { date: string; pv: number; uvSet: Set<string> }> = {};

    // Initialize last 14 days
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = d.toLocaleDateString('zh-TW', { month: 'numeric', day: 'numeric' });
      const key = d.toISOString().split('T')[0];
      daysMap[key] = { date: dateString, pv: 0, uvSet: new Set<string>() };
    }

    logs.forEach(log => {
      if (!log.created_at) return;
      const logDate = new Date(log.created_at);
      const key = logDate.toISOString().split('T')[0];
      
      if (daysMap[key]) {
        daysMap[key].pv += 1;
        daysMap[key].uvSet.add(log.session_id);
      }
    });

    return Object.keys(daysMap).sort().map(key => ({
      name: daysMap[key].date,
      pv: daysMap[key].pv,
      uv: daysMap[key].uvSet.size
    }));
  };

  const processPopularPages = (logs: VisitorLog[]) => {
    const pageMap: Record<string, number> = {};
    logs.forEach(log => {
      const path = log.path || '/';
      pageMap[path] = (pageMap[path] || 0) + 1;
    });

    return Object.keys(pageMap)
      .map(path => ({ path, pv: pageMap[path] }))
      .sort((a, b) => b.pv - a.pv)
      .slice(0, 8);
  };

  const processReferrers = (logs: VisitorLog[]) => {
    const referrerMap: Record<string, number> = {};
    logs.forEach(log => {
      let ref = log.referrer || '直接造訪 / 直接輸入網址';
      if (ref.includes('localhost')) {
        ref = '本地開發測試 (localhost)';
      } else {
        try {
          const url = new URL(ref);
          ref = url.hostname;
        } catch (e) {
          // Keep original
        }
      }
      referrerMap[ref] = (referrerMap[ref] || 0) + 1;
    });

    return Object.keys(referrerMap)
      .map(name => ({ name, value: referrerMap[name] }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const renderCategoryManager = (
    title: string,
    key: keyof AboutUsMembers,
    colorClass: string
  ) => {
    const list = aboutMembers[key] || [];
    return (
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-extrabold text-slate-800 tracking-wide flex items-center space-x-2">
            <Users className={`w-4 h-4 ${colorClass}`} />
            <span>{title}</span>
          </h3>
          <button
            onClick={() => {
              const updated = { ...aboutMembers };
              updated[key] = [
                ...updated[key],
                { name: '新成員姓名', name_en: 'New Member Name', role: '職稱', role_en: 'Role', desc: '學經歷與簡介', desc_en: 'Biography', avatar: '' }
              ];
              setAboutMembers(updated);
            }}
            className="px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 text-[10px] font-bold rounded-lg transition-colors flex items-center space-x-1"
          >
            <span>+ 新增成員</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-h-[500px] overflow-y-auto pr-2">
          {list.map((member, index) => (
            <div key={index} className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 relative group">
              <button
                onClick={() => {
                  if (confirm(`確定要刪除成員 ${member.name} 嗎？`)) {
                    const updated = { ...aboutMembers };
                    updated[key] = updated[key].filter((_, i) => i !== index);
                    setAboutMembers(updated);
                  }
                }}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-[10px] font-bold"
              >
                刪除成員
              </button>
              <div className="space-y-2 text-left">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-slate-400 block font-bold mb-0.5">姓名 (繁中)</label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => {
                        const updated = { ...aboutMembers };
                        const items = [...updated[key]];
                        items[index] = { ...items[index], name: e.target.value };
                        updated[key] = items;
                        setAboutMembers(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 block font-bold mb-0.5">Name (English)</label>
                    <input
                      type="text"
                      value={member.name_en || ''}
                      onChange={(e) => {
                        const updated = { ...aboutMembers };
                        const items = [...updated[key]];
                        items[index] = { ...items[index], name_en: e.target.value };
                        updated[key] = items;
                        setAboutMembers(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[9px] text-slate-400 block font-bold mb-0.5">職稱 (繁中)</label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => {
                        const updated = { ...aboutMembers };
                        const items = [...updated[key]];
                        items[index] = { ...items[index], role: e.target.value };
                        updated[key] = items;
                        setAboutMembers(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] text-slate-400 block font-bold mb-0.5">Role (English)</label>
                    <input
                      type="text"
                      value={member.role_en || ''}
                      onChange={(e) => {
                        const updated = { ...aboutMembers };
                        const items = [...updated[key]];
                        items[index] = { ...items[index], role_en: e.target.value };
                        updated[key] = items;
                        setAboutMembers(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 block font-bold mb-0.5">簡介 (繁中)</label>
                  <textarea
                    value={member.desc}
                    rows={2}
                    onChange={(e) => {
                      const updated = { ...aboutMembers };
                      const items = [...updated[key]];
                      items[index] = { ...items[index], desc: e.target.value };
                      updated[key] = items;
                      setAboutMembers(updated);
                    }}
                    className="w-full px-2 py-1 rounded border border-slate-200 text-[11px] focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-[9px] text-slate-400 block font-bold mb-0.5">Biography (English)</label>
                  <textarea
                    value={member.desc_en || ''}
                    rows={2}
                    onChange={(e) => {
                      const updated = { ...aboutMembers };
                      const items = [...updated[key]];
                      items[index] = { ...items[index], desc_en: e.target.value };
                      updated[key] = items;
                      setAboutMembers(updated);
                    }}
                    className="w-full px-2 py-1 rounded border border-slate-200 text-[11px] focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                
                <div className="flex items-center space-x-3 pt-1 border-t border-slate-200/50">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 overflow-hidden flex items-center justify-center shrink-0">
                    {member.avatar ? (
                      <img src={member.avatar} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-5 h-5 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-grow space-y-1 min-w-0">
                    <input
                      type="text"
                      placeholder="貼上頭像網址..."
                      value={member.avatar}
                      onChange={(e) => {
                        const updated = { ...aboutMembers };
                        const items = [...updated[key]];
                        items[index] = { ...items[index], avatar: e.target.value };
                        updated[key] = items;
                        setAboutMembers(updated);
                      }}
                      className="w-full px-2 py-1 rounded border border-slate-200 text-[9px] focus:ring-1 focus:ring-blue-500"
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        if (!e.target.files || e.target.files.length === 0) return;
                        const file = e.target.files[0];
                        const url = await uploadToCloudinary(file);
                        if (url) {
                          const updated = { ...aboutMembers };
                          const items = [...updated[key]];
                          items[index] = { ...items[index], avatar: url };
                          updated[key] = items;
                          setAboutMembers(updated);
                          alert(`✨ ${member.name} 的頭像上傳成功！`);
                        } else {
                          alert('上傳失敗，請檢查網路或 Cloudinary');
                        }
                      }}
                      className="text-[8px] text-slate-500 block file:mr-1 file:py-0.5 file:px-1 file:rounded file:border-0 file:text-[8px] file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] text-slate-800 flex font-sans">
      
      {/* Sidebar - Deep Navy */}
      <aside className="w-64 bg-brand-navy text-white flex flex-col justify-between shrink-0 shadow-xl border-r border-white/5">
        <div>
          {/* Logo */}
          <div className="p-6 border-b border-white/5 flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-orange to-brand-amber flex items-center justify-center font-bold text-white shadow-md text-sm">
              世
            </div>
            <div>
              <span className="font-heading font-bold text-sm text-white tracking-wider block leading-none">
                世界公民數位治理基金會
              </span>
              <span className="text-[9px] text-white/40 tracking-widest uppercase mt-1 block">
                Full CMS Panel
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-220px)]">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>控制台首頁</span>
            </button>

            <button
              onClick={() => setActiveTab('bento')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'bento' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Grid className="w-4 h-4" />
                <span>便當格區塊管理</span>
              </div>
              <span className="bg-orange-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {blocks.length}
              </span>
            </button>

            <div className="pt-2 pb-1 px-4 text-[9px] font-bold text-white/40 uppercase tracking-widest">
              首頁區塊 CMS
            </div>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'hero' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <ImageIcon className="w-4 h-4 text-orange-400" />
              <span>Hero 輪播管理</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'projects' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Award className="w-4 h-4 text-yellow-400" />
              <span>核心專案管理</span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'news' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Newspaper className="w-4 h-4 text-purple-400" />
                <span>最新消息管理</span>
              </div>
              <span className="bg-blue-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                {newsList.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('about_us')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'about_us' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-pink-400" />
              <span>關於與團隊管理</span>
            </button>

            <button
              onClick={() => setActiveTab('partners')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'partners' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>贊助商與得獎名單</span>
            </button>

            <button
              onClick={() => setActiveTab('ebook_donation')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'ebook_donation' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-4 h-4 text-red-400" />
              <span>電子書與捐款管理</span>
            </button>

            <button
              onClick={() => setActiveTab('analytics')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'analytics' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>流量數據分析</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeTab === 'settings' ? 'bg-blue-600 text-white shadow-md' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>系統設定</span>
            </button>
          </nav>
        </div>

        {/* Bottom Panel */}
        <div className="p-6 border-t border-white/5 flex flex-col space-y-4 shrink-0">
          <a href="/" className="flex items-center space-x-2 text-xs font-semibold text-white/50 hover:text-white transition-colors duration-300">
            <ArrowLeft className="w-4 h-4" />
            <span>返回基金會首頁</span>
          </a>
          <button onClick={handleLogout} className="flex items-center space-x-2 text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors duration-300 text-left">
            <LogOut className="w-4 h-4" />
            <span>安全登出系統</span>
          </button>
          <div className="text-[10px] text-white/30">
            v1.1.0 ‧ ESG Full CMS
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        
        {/* Header Block */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 md:px-12 shrink-0">
          <div>
            <h1 className="text-lg font-heading font-extrabold text-slate-800 tracking-wide uppercase leading-none">
              {activeTab === 'dashboard' && '控制台首頁 (Dashboard)'}
              {activeTab === 'bento' && '便當格區塊管理 (Bento Grid Manager)'}
              {activeTab === 'hero' && 'Hero 輪播管理 (Hero Slider CMS)'}
              {activeTab === 'projects' && '核心專案與指標管理 (Core Projects CMS)'}
              {activeTab === 'news' && '最新消息管理 (Latest News CMS)'}
              {activeTab === 'about_us' && '關於我們與團隊管理 (About & Team CMS)'}
              {activeTab === 'partners' && '贊助商牆與金恆獎管理 (Partners & Awards CMS)'}
              {activeTab === 'ebook_donation' && '電子書與捐款管理 (Ebook & Donations)'}
              {activeTab === 'analytics' && '流量數據分析 (Traffic Analytics)'}
              {activeTab === 'settings' && '系統基本設定 (Settings)'}
            </h1>
            <span className="text-[11px] text-slate-400 tracking-wide mt-1.5 block">
              世界公民文化基金會 ‧ 全站內容管理系統 (Visual CMS)
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-xs text-slate-500 font-semibold">Supabase 連線正常</span>
          </div>
        </header>

        {/* Dynamic Views */}
        <main className="flex-grow p-8 md:p-12 overflow-y-auto max-w-7xl w-full mx-auto">
          
          {/* 1. DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">便當格區塊數</span>
                    <span className="text-2xl font-extrabold text-blue-600 block">{blocks.length}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    <Grid className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">輪播廣告頁</span>
                    <span className="text-2xl font-extrabold text-orange-600 block">{heroSlides.length}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-orange-600 font-bold">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">已發布新聞</span>
                    <span className="text-2xl font-extrabold text-purple-600 block">{newsList.length}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 font-bold">
                    <Newspaper className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">合作贊助企業</span>
                    <span className="text-2xl font-extrabold text-emerald-600 block">{sponsorsList.length}</span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
                    <Shield className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Traffic Summary Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">今日瀏覽量 (Today's PV)</span>
                    <span className="text-2xl font-black text-cyan-600 block">
                      {analyticsLoading ? '...' : todayPV}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">今日不重複訪客 (Today's UV)</span>
                    <span className="text-2xl font-black text-cyan-600 block">
                      {analyticsLoading ? '...' : todayUV}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center text-cyan-600 font-bold">
                    <TrendingUp className="w-5 h-5 rotate-45" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">14日累積流量 (14-day PV)</span>
                    <span className="text-2xl font-black text-indigo-600 block">
                      {analyticsLoading ? '...' : totalPV}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => setActiveTab('analytics')}>
                  <div className="space-y-1">
                    <span className="text-slate-400 text-xs font-bold block">累積訪客數 (14-day UV)</span>
                    <span className="text-2xl font-black text-indigo-600 block flex items-center">
                      {analyticsLoading ? '...' : totalUV}
                      <span className="text-[10px] text-blue-600 font-bold ml-2 hover:underline">查看詳情 &rarr;</span>
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Status information */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-blue-900">✨ 視覺化 Full CMS 功能已全部上線！</h3>
                  <p className="text-xs text-blue-700 leading-relaxed max-w-xl">
                    您可以在側邊欄切換不同的分頁，自由修改前台的廣告輪播、指標數據、最新消息、贊助 Logo、電子書描述與捐款方案。所有變更均即時儲存至 Supabase 雲端，並會同步發布至前台！
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold shadow-md">資料雙向同步中</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. BENTO LAYOUT MANAGER */}
          {activeTab === 'bento' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              <form onSubmit={handleAddBlock} className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                <h3 className="text-sm font-extrabold text-slate-800 tracking-wide border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Plus className="w-4 h-4 text-blue-600" />
                  <span>新增便當格區塊</span>
                </h3>

                <div className="space-y-4">
                  <span className="text-[10px] font-bold text-slate-400 block tracking-wide uppercase">1. 文字內容</span>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Block Title *</label>
                    <input
                      type="text"
                      value={bentoTitle}
                      onChange={(e) => setBentoTitle(e.target.value)}
                      placeholder="例：2024百萬學童親子音樂會"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600">Subtitle / Description</label>
                    <textarea
                      value={bentoSubtitle}
                      onChange={(e) => setBentoSubtitle(e.target.value)}
                      placeholder="活動簡介、公告描述..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-16 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {bentoSize !== 'small' && (
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-600">Category Tag</label>
                      <select
                        value={bentoTag}
                        onChange={(e) => setBentoTag(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                      >
                        <option value="ESG企業治理">ESG企業治理</option>
                        <option value="青年與學童活動">青年與學童活動</option>
                        <option value="音樂會活動">音樂會活動</option>
                        <option value="核心倡導">核心倡導</option>
                      </select>
                    </div>
                  )}
                </div>

                {bentoSize !== 'small' && (
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold text-slate-400 block tracking-wide uppercase">2. 圖片與資源</span>
                    
                    <label className="border border-dashed border-slate-300 rounded-2xl p-4 text-center bg-slate-50 hover:bg-slate-100/50 hover:border-blue-500 transition-all flex flex-col items-center justify-center cursor-pointer space-y-1.5 w-full">
                      <Upload className="w-6 h-6 text-slate-400" />
                      <span className="text-xs font-bold text-slate-500">
                        {uploadingBentoImage ? '上傳中...' : '點擊上傳圖片至 Cloudinary'}
                      </span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handleCloudinaryBentoUpload} 
                        disabled={uploadingBentoImage} 
                      />
                    </label>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-slate-600">或選擇預設大圖</label>
                      <div className="grid grid-cols-3 gap-2">
                        {presetBanners.map((img) => (
                          <button
                            key={img.url}
                            type="button"
                            onClick={() => setBentoImageUrl(img.url)}
                            className={`p-1.5 rounded-lg border text-[10px] font-semibold transition-all truncate text-left ${
                              bentoImageUrl === img.url ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-200 hover:border-slate-300 text-slate-600'
                            }`}
                          >
                            {img.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <span className="text-[10px] font-bold text-slate-400 block tracking-wide uppercase">3. 尺寸選擇</span>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSizeChange('large')}
                      className={`p-2 rounded-xl border flex flex-col items-center text-center space-y-1.5 ${
                        bentoSize === 'large' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-bold block">Hero (2×2)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSizeChange('wide')}
                      className={`p-2 rounded-xl border flex flex-col items-center text-center space-y-1.5 ${
                        bentoSize === 'wide' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-bold block">News (2×1)</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSizeChange('small')}
                      className={`p-2 rounded-xl border flex flex-col items-center text-center space-y-1.5 ${
                        bentoSize === 'small' ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-sm' : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      <span className="text-[10px] font-bold block">CTA (1×1)</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => { setBentoTitle(''); setBentoSubtitle(''); }}
                    className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                  >
                    清除表單
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider transition-all shadow-md"
                  >
                    發布至 Bento Layout
                  </button>
                </div>
              </form>

              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Bento Grid 發布管理 ({blocks.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {blocks.map((block) => (
                    <div key={block.id} className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50 flex items-center justify-between group transition-colors">
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="min-w-0 space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-heading font-bold text-xs text-slate-800 truncate">{block.title}</span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                              block.bentoSize === 'large' ? 'bg-purple-100 text-purple-700' : block.bentoSize === 'wide' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>{block.bentoSize.toUpperCase()}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 block">{block.tag || '無標籤'} ‧ {block.date}</span>
                        </div>
                      </div>
                      <button onClick={() => handleDeleteBlock(block.id)} className="text-slate-400 hover:text-red-600 p-2 rounded-lg transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {blocks.length === 0 && <div className="text-center py-12 text-slate-400 text-xs">目前無發布中的 Bento 區塊。</div>}
                </div>
              </div>
            </div>
          )}

          {/* 3. HERO SLIDER CMS */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveHero} className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-extrabold text-slate-800">首頁大圖輪播設定 (Hero Slider)</h3>
                  <span className="text-xs text-slate-400">目前固定配置 3 個廣告輪播頁</span>
                </div>

                <div className="space-y-8">
                  {heroSlides.map((slide, idx) => (
                    <div key={slide.id || idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-4 relative">
                      <div className="absolute top-4 left-4 bg-brand-navy text-brand-amber font-bold text-xs px-2.5 py-1 rounded-lg">
                        輪播頁 {idx + 1}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">廣告標題 *</label>
                            <input
                              type="text"
                              value={slide.title}
                              onChange={(e) => updateSlideField(idx, 'title', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">副標題簡介</label>
                            <textarea
                              value={slide.subtitle}
                              onChange={(e) => updateSlideField(idx, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-16 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">按鈕文字</label>
                              <input
                                type="text"
                                value={slide.buttonText}
                                onChange={(e) => updateSlideField(idx, 'buttonText', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">點綴代表色 (Theme Color)</label>
                              <input
                                type="color"
                                value={slide.themeColor}
                                onChange={(e) => updateSlideField(idx, 'themeColor', e.target.value)}
                                className="w-full h-8 px-1 py-0.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Image settings */}
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">背景底圖網址 (bgImage)</label>
                            <input
                              type="text"
                              value={slide.bgImage}
                              onChange={(e) => updateSlideField(idx, 'bgImage', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          {/* Cloudinary upload for hero */}
                          <label className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-white hover:bg-slate-50 hover:border-blue-500 transition-all flex flex-col items-center justify-center cursor-pointer space-y-1 w-full">
                            <Upload className="w-5 h-5 text-slate-400" />
                            <span className="text-[11px] font-bold text-slate-500">
                              {uploadingField === `hero-${idx}` ? '上傳中...' : '為此輪播頁上傳新背景底圖至 Cloudinary'}
                            </span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleCloudinaryFieldUpload(e, 'hero', idx)}
                              disabled={uploadingField !== null}
                            />
                          </label>

                          {/* Preview container */}
                          {slide.bgImage && (
                            <div className="relative h-24 rounded-lg overflow-hidden border border-slate-200 bg-slate-900">
                              <img src={slide.bgImage} alt="Preview" className="w-full h-full object-cover opacity-75" />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                                <span className="text-[9px] text-white/75 font-semibold">即時底圖預覽</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs tracking-wider transition-all hover:bg-blue-700 shadow-md"
                >
                  發布並同步變更至 Supabase
                </button>
              </div>
            </form>
          )}

          {/* 4. CORE PROJECTS CMS */}
          {activeTab === 'projects' && (
            <form onSubmit={handleSaveProjects} className="space-y-8 animate-fade-in">
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-6">
                  <h3 className="text-sm font-extrabold text-slate-800">三大核心專案與數據卡片設定</h3>
                  <span className="text-xs text-slate-400">管理首頁的三個大型倡導專案</span>
                </div>

                <div className="space-y-8">
                  {projectsList.map((project, idx) => (
                    <div key={project.id || idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/60 space-y-4 relative">
                      <div className="absolute top-4 left-4 bg-brand-navy text-brand-amber font-bold text-xs px-2.5 py-1 rounded-lg">
                        專案卡片 {idx + 1}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        {/* Title, Subtitle */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">專案標題 (繁中) *</label>
                              <input
                                type="text"
                                value={project.title}
                                onChange={(e) => updateProjectField(idx, 'title', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">Project Title (English)</label>
                              <input
                                type="text"
                                value={project.title_en || ''}
                                onChange={(e) => updateProjectField(idx, 'title_en', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">簡介描述 (繁中) *</label>
                            <textarea
                              value={project.subtitle}
                              onChange={(e) => updateProjectField(idx, 'subtitle', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-20 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              required
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">Description (English)</label>
                            <textarea
                              value={project.subtitle_en || ''}
                              onChange={(e) => updateProjectField(idx, 'subtitle_en', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-20 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">按鈕連結文字 (繁中)</label>
                              <input
                                type="text"
                                value={project.ctaText}
                                onChange={(e) => updateProjectField(idx, 'ctaText', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">Button Text (English)</label>
                              <input
                                type="text"
                                value={project.ctaText_en || ''}
                                onChange={(e) => updateProjectField(idx, 'ctaText_en', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                              />
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">代表圖示名稱 (Lucide Icon)</label>
                            <select
                              value={project.iconName}
                              onChange={(e) => updateProjectField(idx, 'iconName', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            >
                              <option value="Award">Award (金恆獎)</option>
                              <option value="BookOpen">BookOpen (教育書籍)</option>
                              <option value="Music">Music (音樂會)</option>
                              <option value="Shield">Shield (防護盾)</option>
                              <option value="Zap">Zap (閃電)</option>
                              <option value="Star">Star (星號)</option>
                            </select>
                          </div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
                          <h4 className="text-xs font-bold text-slate-700">指標數據修改 (Bilingual Stats)</h4>
                          
                          {project.stats && project.stats.map((stat, sIdx) => (
                            <div key={sIdx} className="p-3 bg-slate-50 border border-slate-100 rounded-xl space-y-2.5">
                              <span className="text-[9px] font-bold text-slate-400 block uppercase">指標數據 {sIdx + 1}</span>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-500 font-semibold">標籤 (繁中)</label>
                                  <input
                                    type="text"
                                    value={stat.label}
                                    onChange={(e) => updateProjectStat(idx, sIdx, 'label', e.target.value)}
                                    className="w-full px-3 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-500 font-semibold">Label (English)</label>
                                  <input
                                    type="text"
                                    value={stat.label_en || ''}
                                    onChange={(e) => updateProjectStat(idx, sIdx, 'label_en', e.target.value)}
                                    className="w-full px-3 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-500 font-semibold">數值 (繁中)</label>
                                  <input
                                    type="text"
                                    value={stat.value}
                                    onChange={(e) => updateProjectStat(idx, sIdx, 'value', e.target.value)}
                                    className="w-full px-3 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="text-[10px] text-slate-500 font-semibold">Value (English)</label>
                                  <input
                                    type="text"
                                    value={(stat as any).value_en || ''}
                                    onChange={(e) => updateProjectStat(idx, sIdx, 'value_en', e.target.value)}
                                    className="w-full px-3 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs tracking-wider transition-all hover:bg-blue-700 shadow-md"
                >
                  發布專案與數據修改
                </button>
              </div>
            </form>
          )}

          {/* 5. LATEST NEWS CMS */}
          {activeTab === 'news' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
              {/* Form to add news */}
              <form onSubmit={handleAddNews} className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-5">
                <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <PlusCircle className="w-4 h-4 text-blue-600" />
                  <span>發布最新消息</span>
                </h3>

                 <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">消息標題 (繁中) *</label>
                  <input
                    type="text"
                    value={newNewsTitle}
                    onChange={(e) => setNewNewsTitle(e.target.value)}
                    placeholder="例：2026雙軸轉型論壇即將召開"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Title (English)</label>
                  <input
                    type="text"
                    value={newNewsTitleEn}
                    onChange={(e) => setNewNewsTitleEn(e.target.value)}
                    placeholder="e.g. 2026 Twin-Axis Transformation Forum..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">分類別 *</label>
                    <select
                      value={newNewsCategory}
                      onChange={(e) => setNewNewsCategory(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    >
                      <option value="education">學童教育</option>
                      <option value="enterprise">企業論壇</option>
                      <option value="concert">音樂會</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">消息日期</label>
                    <input
                      type="date"
                      value={newNewsDate}
                      onChange={(e) => setNewNewsDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">摘要描述 (繁中) *</label>
                  <textarea
                    value={newNewsSummary}
                    onChange={(e) => setNewNewsSummary(e.target.value)}
                    placeholder="消息簡介或文章摘要，建議 50-80 字..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-20 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Summary (English)</label>
                  <textarea
                    value={newNewsSummaryEn}
                    onChange={(e) => setNewNewsSummaryEn(e.target.value)}
                    placeholder="Article summary in English..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-20 resize-none focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">底圖連結 (可使用 Cloudinary 上傳)</label>
                    <input
                      type="text"
                      value={newNewsImage}
                      onChange={(e) => setNewNewsImage(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                    />
                  </div>

                  {/* Cloudinary upload for news */}
                  <label className="border border-dashed border-slate-300 rounded-xl p-3 text-center bg-slate-50 hover:bg-slate-100 hover:border-blue-500 transition-all flex flex-col items-center justify-center cursor-pointer space-y-1 w-full">
                    <Upload className="w-4 h-4 text-slate-400" />
                    <span className="text-[10px] font-bold text-slate-500">
                      {uploadingField === 'news-new' ? '上傳中...' : '上傳最新消息配圖至 Cloudinary'}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleCloudinaryFieldUpload(e, 'news')}
                      disabled={uploadingField !== null}
                    />
                  </label>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider transition-all shadow-md"
                  >
                    發布最新消息文章
                  </button>
                </div>
              </form>

              {/* List of current news */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-800">已發布的消息明細 ({newsList.length})</h3>
                  <span className="text-xs text-slate-400">即時同步前台標籤篩選</span>
                </div>

                <div className="space-y-3 overflow-y-auto max-h-[550px] pr-2">
                  {newsList.map((article) => (
                    <div key={article.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between gap-4">
                      <div className="flex items-center space-x-3 min-w-0">
                        {article.image && (
                          <img src={article.image} alt="News Thumb" className="w-12 h-12 object-cover rounded-lg border border-slate-200 shrink-0" />
                        )}
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate">{article.title}</h4>
                          <span className="text-[9px] text-slate-400 mt-1 block">
                            [{article.categoryLabel}] ‧ 發布於 {article.date}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteNews(article.id)}
                        className="text-slate-400 hover:text-red-600 p-2 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6. PARTNERS & AWARDS CMS */}
          {activeTab === 'partners' && (
            <div className="space-y-8 animate-fade-in">
              {/* Sponsors Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <form onSubmit={handleAddSponsor} className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                    新增贊助商 (Sponsors)
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">企業中文名稱 *</label>
                    <input
                      type="text"
                      value={newSponsorName}
                      onChange={(e) => setNewSponsorName(e.target.value)}
                      placeholder="例：台積電"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">英文簡寫/名稱</label>
                      <input
                        type="text"
                        value={newSponsorEnglishName}
                        onChange={(e) => setNewSponsorEnglishName(e.target.value)}
                        placeholder="例：TSMC"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">標誌特徵色</label>
                      <input
                        type="color"
                        value={newSponsorColor}
                        onChange={(e) => setNewSponsorColor(e.target.value)}
                        className="w-full h-8 px-1 py-0.5 rounded-lg border border-slate-200 bg-white cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider"
                    >
                      新增贊助商 Logo
                    </button>
                  </div>
                </form>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                    已列名贊助商壁牆 ({sponsorsList.length})
                  </h3>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 overflow-y-auto max-h-[250px] pr-2">
                    {sponsorsList.map((sponsor) => (
                      <div key={sponsor.id} className="p-3 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div className="min-w-0">
                          <div className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-3 rounded-full shrink-0" style={{ backgroundColor: sponsor.color }} />
                            <span className="font-bold text-xs text-slate-800 truncate">{sponsor.name}</span>
                          </div>
                          <span className="text-[8px] text-slate-400 block ml-3 uppercase">{sponsor.englishName}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteSponsor(sponsor.id)}
                          className="text-slate-400 hover:text-red-600 p-1 rounded-lg shrink-0 ml-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Award Winners Section */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-slate-200 pt-8">
                <form onSubmit={handleAddWinner} className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3">
                    新增金恆獎得獎紀錄 (Constant Awards)
                  </h3>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">得獎企業/單位 *</label>
                    <input
                      type="text"
                      value={newWinnerCompany}
                      onChange={(e) => setNewWinnerCompany(e.target.value)}
                      placeholder="例：旭榮集團"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">獲頒獎項名稱 *</label>
                      <input
                        type="text"
                        value={newWinnerAward}
                        onChange={(e) => setNewWinnerAward(e.target.value)}
                        placeholder="例：永續供應鏈雙軸轉型特別獎"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-600">代表圖示</label>
                      <select
                        value={newWinnerIcon}
                        onChange={(e) => setNewWinnerIcon(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                      >
                        <option value="Leaf">Leaf (樹葉/綠色淨零)</option>
                        <option value="Zap">Zap (閃電/數位韌性)</option>
                        <option value="Shield">Shield (防護盾/合規治理)</option>
                        <option value="Award">Award (金恆獎杯)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-600">事蹟描述</label>
                    <textarea
                      value={newWinnerDesc}
                      onChange={(e) => setNewWinnerDesc(e.target.value)}
                      placeholder="簡短描述得獎事蹟與 ESG 亮點實踐..."
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-16 resize-none"
                    />
                  </div>

                  <div className="pt-2 text-right">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs tracking-wider animate-pulse"
                    >
                      發布得獎事蹟
                    </button>
                  </div>
                </form>

                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                  <h3 className="text-sm font-extrabold text-slate-800 border-b border-slate-100 pb-3 mb-4">
                    金恆獎榮譽榜單 ({winnersList.length})
                  </h3>

                  <div className="space-y-3 overflow-y-auto max-h-[300px] pr-2">
                    {winnersList.map((winner) => (
                      <div key={winner.id} className="p-3.5 rounded-xl border border-slate-100 bg-slate-50 flex items-center justify-between">
                        <div className="min-w-0">
                          <h4 className="font-bold text-xs text-slate-800">{winner.company}</h4>
                          <span className="text-[10px] text-brand-orange font-semibold block mt-0.5">{winner.award}</span>
                          <p className="text-[10px] text-slate-400 mt-1 truncate max-w-md">{winner.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteWinner(winner.id)}
                          className="text-slate-400 hover:text-red-600 p-2 rounded-lg shrink-0 ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. EBOOK & DONATION CMS */}
          {activeTab === 'ebook_donation' && (
            <div className="space-y-8 animate-fade-in">
              {/* Ebook Publication CTA Form */}
              {bookCta && (
                <form onSubmit={handleSaveBookCta} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-extrabold text-slate-800">1. 電子書學術專著 CTA 修改</h3>
                    <span className="text-xs text-slate-400">修改 3D 書本介紹與免費下載連結</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">電子書標題名稱 (繁中) *</label>
                        <input
                          type="text"
                          value={bookCta.title}
                          onChange={(e) => updateBookField('title', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">eBook Title (English)</label>
                        <input
                          type="text"
                          value={bookCta.title_en || ''}
                          onChange={(e) => updateBookField('title_en', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">專著簡介說明 (繁中) *</label>
                        <textarea
                          value={bookCta.description}
                          onChange={(e) => updateBookField('description', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-28 resize-none"
                          required
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Description (English)</label>
                        <textarea
                          value={bookCta.description_en || ''}
                          onChange={(e) => updateBookField('description_en', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-28 resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">按鈕下載連結文字 (繁中)</label>
                        <input
                          type="text"
                          value={bookCta.buttonText}
                          onChange={(e) => updateBookField('buttonText', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-600">Button Text (English)</label>
                        <input
                          type="text"
                          value={bookCta.buttonText_en || ''}
                          onChange={(e) => updateBookField('buttonText_en', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-150 bg-slate-50 space-y-4">
                      <h4 className="text-xs font-bold text-slate-700">精選亮點文字 (Highlights)</h4>
                      
                      {bookCta.highlights.map((hl, index) => (
                        <div key={index} className="p-3.5 rounded-xl border border-slate-200/50 bg-white space-y-3">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">亮點卡片 {index + 1}</span>
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 font-semibold">小標題 (繁中)</label>
                              <input
                                type="text"
                                value={hl.title}
                                onChange={(e) => updateBookHighlight(index, 'title', e.target.value)}
                                className="w-full px-3.5 py-1 rounded-lg border border-slate-200 text-xs"
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 font-semibold">Title (English)</label>
                              <input
                                type="text"
                                value={hl.title_en || ''}
                                onChange={(e) => updateBookHighlight(index, 'title_en', e.target.value)}
                                className="w-full px-3.5 py-1 rounded-lg border border-slate-200 text-xs"
                              />
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] text-slate-500 font-semibold">圖示名稱</label>
                              <select
                                value={hl.iconName}
                                onChange={(e) => updateBookHighlight(index, 'iconName', e.target.value)}
                                className="w-full px-3.5 py-1 rounded-lg border border-slate-200 text-xs bg-white"
                              >
                                <option value="ShieldCheck">ShieldCheck (盾牌)</option>
                                <option value="FileText">FileText (文件)</option>
                                <option value="BookOpen">BookOpen (書本)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-semibold">簡短摘要描述 (繁中)</label>
                            <input
                              type="text"
                              value={hl.desc}
                              onChange={(e) => updateBookHighlight(index, 'desc', e.target.value)}
                              className="w-full px-3.5 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[10px] text-slate-500 font-semibold">Description (English)</label>
                            <input
                              type="text"
                              value={hl.desc_en || ''}
                              onChange={(e) => updateBookHighlight(index, 'desc_en', e.target.value)}
                              className="w-full px-3.5 py-1 rounded-lg border border-slate-200 text-xs"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end border-t border-slate-100 pt-4">
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs tracking-wider hover:bg-blue-700"
                    >
                      儲存電子書 CTA
                    </button>
                  </div>
                </form>
              )}

              {/* Donation Plans Forms */}
              <form onSubmit={handleSaveDonationPlans} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6 border-t border-slate-200 pt-6">
                <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                  <h3 className="text-sm font-extrabold text-slate-800">2. 桂冠會員認捐方案與滿額禮修改</h3>
                  <span className="text-xs text-slate-400">修改 3 大方案、金額與回饋滿額禮</span>
                </div>

                <div className="space-y-8">
                  {donationPlans.map((plan, idx) => (
                    <div key={plan.id || idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 relative">
                      <div className="absolute top-4 left-4 bg-brand-navy text-brand-amber font-bold text-xs px-2.5 py-1 rounded-lg">
                        認捐方案 {idx + 1} (例如: 守護者、推動者)
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        {/* Title, Pricing, gift details */}
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">方案名稱 *</label>
                              <input
                                type="text"
                                value={plan.name}
                                onChange={(e) => updatePlanField(idx, 'name', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                required
                              />
                            </div>
                            <div className="space-y-1 flex items-center justify-center pt-5">
                              <label className="flex items-center space-x-2 cursor-pointer select-none">
                                <input
                                  type="checkbox"
                                  checked={plan.featured}
                                  onChange={(e) => updatePlanField(idx, 'featured', e.target.checked)}
                                  className="rounded border-slate-300 bg-white text-blue-600 focus:ring-0"
                                />
                                <span className="text-xs font-bold text-slate-600">熱門推薦方案</span>
                              </label>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">認捐金額 * (如: NT$ 1,500)</label>
                              <input
                                type="text"
                                value={plan.price}
                                onChange={(e) => updatePlanField(idx, 'price', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">付費週期 (價格後贅)</label>
                              <input
                                type="text"
                                value={plan.pricePeriod}
                                onChange={(e) => updatePlanField(idx, 'pricePeriod', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">滿額禮標題 *</label>
                              <input
                                type="text"
                                value={plan.giftTitle}
                                onChange={(e) => updatePlanField(idx, 'giftTitle', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                                required
                              />
                            </div>
                            <div className="space-y-1">
                              <label className="text-xs font-bold text-slate-600">禮品圖示名稱 (Lucide Icon)</label>
                              <select
                                value={plan.iconName}
                                onChange={(e) => updatePlanField(idx, 'iconName', e.target.value)}
                                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white"
                              >
                                <option value="ShoppingBag">ShoppingBag (帆布袋)</option>
                                <option value="Coffee">Coffee (咖啡與原木杯墊)</option>
                                <option value="Star">Star (保溫杯/星級禮)</option>
                              </select>
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-xs font-bold text-slate-600">滿額禮贈品詳情描述 *</label>
                            <textarea
                              value={plan.giftDesc}
                              onChange={(e) => updatePlanField(idx, 'giftDesc', e.target.value)}
                              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs h-16 resize-none"
                              required
                            />
                          </div>
                        </div>

                        {/* Plan benefits list */}
                        <div className="space-y-3 p-4 rounded-xl border border-slate-150 bg-white">
                          <label className="text-xs font-bold text-slate-700 block">方案權益明細 (每行輸入一條，即時拆分)</label>
                          <textarea
                            value={plan.benefits.join('\n')}
                            onChange={(e) => handlePlanBenefitsChange(idx, e.target.value)}
                            placeholder="例：
優先取得論壇保留席
贈濾掛咖啡與原木杯墊"
                            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-xs h-36 resize-y focus:outline-none"
                          />
                          <span className="text-[10px] text-slate-400 leading-relaxed block pl-1">
                            換行即代表一條新的綠色點綴權益。建議配置 3-4 行。
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs tracking-wider hover:bg-blue-700 shadow-md animate-pulse"
                  >
                    同步儲存三大認捐計畫變更
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Traffic Analytics View */}
          {activeTab === 'analytics' && (
            <div className="space-y-8 animate-fade-in">
              {/* Header/Intro card */}
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
                <div className="space-y-2">
                  <h2 className="text-lg font-extrabold text-blue-900 flex items-center">
                    <TrendingUp className="w-5 h-5 text-blue-600 mr-2" />
                    全方位流量數據中心 (All-in-One Analytics)
                  </h2>
                  <p className="text-xs text-blue-700 leading-relaxed max-w-2xl">
                    此處整合了三合一流量分析系統：<strong>方案 A</strong> (Supabase 自訂軌跡)、<strong>方案 B</strong> (GA4 + Looker Studio)、以及 <strong>方案 C</strong> (Vercel 效能與流量分析)。讓您全面掌控網站的點擊、造訪以及速度表現！
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 shrink-0">
                  <button 
                    onClick={fetchVisitorLogs}
                    disabled={analyticsLoading}
                    className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-all duration-300 flex items-center space-x-1.5"
                  >
                    <span>{analyticsLoading ? '載入中...' : '🔄 重新整理數據'}</span>
                  </button>
                  <a
                    href="https://vercel.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-black hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300 flex items-center space-x-1.5"
                  >
                    <span>⚡ 前往 Vercel Analytics</span>
                  </a>
                </div>
              </div>

              {/* PLAN A: Supabase + Recharts */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 1. Daily PV/UV Line Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">方案 A - 趨勢圖</h3>
                    <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-4">近 14 日每日瀏覽量與獨立訪客</h4>
                  </div>
                  
                  <div className="h-72 w-full mt-4">
                    {visitorLogs.length === 0 ? (
                      <div className="h-full flex items-center justify-center text-xs text-slate-400">
                        {analyticsLoading ? '數據載入中...' : '無造訪記錄 (請確認 supabase 連結及 visitor_logs 表)'}
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={processDailyData(visitorLogs)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="name" tick={{ fontSize: 10 }} stroke="#94a3b8" />
                          <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                          <RechartsTooltip contentStyle={{ fontSize: 11, borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                          <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                          <Line type="monotone" dataKey="pv" name="瀏覽量 (PV)" stroke="#2563eb" strokeWidth={2.5} activeDot={{ r: 6 }} dot={{ r: 2 }} />
                          <Line type="monotone" dataKey="uv" name="不重複訪客 (UV)" stroke="#06b6d4" strokeWidth={2.5} dot={{ r: 2 }} />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    )}
                  </div>
                </div>

                {/* 2. Referrers Pie/Table */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">方案 A - 來源分析</h3>
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-4">前五大流量來源渠道 (Referrers)</h4>
                  
                  <div className="flex-grow flex flex-col justify-center space-y-4">
                    {visitorLogs.length === 0 ? (
                      <div className="text-center text-xs text-slate-400 py-12">
                        無來源渠道資料
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {processReferrers(visitorLogs).map((ref, idx) => {
                          const maxVal = Math.max(...processReferrers(visitorLogs).map(r => r.value), 1);
                          const percentage = Math.round((ref.value / maxVal) * 100);
                          return (
                            <div key={idx} className="space-y-1">
                              <div className="flex justify-between items-center text-xs">
                                <span className="font-semibold text-slate-700 truncate max-w-[180px]" title={ref.name}>
                                  {ref.name}
                                </span>
                                <span className="text-slate-500 font-bold">{ref.value} 次</span>
                              </div>
                              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                <div 
                                  className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-blue-500 to-cyan-500" 
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 3. Popular Pages Bar Chart */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">方案 A - 熱門頁面</h3>
                <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-4">最受歡迎的造訪路徑排行 (Top 8 Paths)</h4>
                
                <div className="h-72 w-full mt-4">
                  {visitorLogs.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-xs text-slate-400">
                      暫無造訪頁面數據
                    </div>
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={processPopularPages(visitorLogs)} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                        <XAxis dataKey="path" tick={{ fontSize: 9 }} stroke="#94a3b8" />
                        <YAxis tick={{ fontSize: 10 }} stroke="#94a3b8" />
                        <RechartsTooltip contentStyle={{ fontSize: 11, borderRadius: 12 }} />
                        <Bar dataKey="pv" name="瀏覽次數 (PV)" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                          {processPopularPages(visitorLogs).map((_, index) => (
                            <Cell key={`cell-${index}`} fill={index === 0 ? '#1d4ed8' : index < 3 ? '#2563eb' : '#60a5fa'} />
                          ))}
                        </Bar>
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  )}
                </div>
              </div>

              {/* PLAN B: GA4 Embedded Looker Studio */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">方案 B - Google Analytics 專業報表</h3>
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-wide">Looker Studio 互動式儀表板 (GA4)</h4>
                </div>
                
                {lookerStudioUrl ? (
                  <div className="w-full h-[600px] rounded-2xl border border-slate-200 overflow-hidden shadow-inner bg-slate-50 relative">
                    <iframe
                      src={lookerStudioUrl}
                      frameBorder="0"
                      style={{ border: 0, width: '100%', height: '100%' }}
                      allowFullScreen
                      sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
                    />
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center text-slate-500 bg-slate-50">
                    <TrendingUp className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                    <p className="text-sm font-bold text-slate-700">尚未設定 Looker Studio 嵌入網址</p>
                    <p className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                      您可以前往「系統設定」分頁，貼上您在 Looker Studio 建立的 GA4 共用報表嵌入連結，即可在此直接查看高階的訪客行為分析。
                    </p>
                    <button 
                      onClick={() => setActiveTab('settings')}
                      className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow transition-colors"
                    >
                      前往設定
                    </button>
                  </div>
                )}
              </div>

              {/* PLAN C: Vercel Web Analytics Overview */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 space-y-2">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">方案 C - Edge Analytics & Vitals</h3>
                  <h4 className="text-sm font-extrabold text-slate-800 tracking-wide">Vercel Web Analytics 效能與速度追蹤</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Vercel Analytics 直接在網路邊緣 (Edge) 收集造訪與效能指標。它不依賴傳統的追蹤腳本，能準確評估 Google Core Web Vitals（如最大內容渲染時間 LCP、首次輸入延遲 FID），幫助改善網站 SEO 與速度體驗。
                  </p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full space-y-4">
                  <div className="space-y-1">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full inline-block">已在程式碼中載入</span>
                    <p className="text-xs text-slate-400 leading-relaxed mt-1">
                      只需點擊 Vercel 控制台的一鍵啟用按鈕即可生效。
                    </p>
                  </div>
                  <a
                    href="https://vercel.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full text-center py-2.5 bg-black hover:bg-slate-900 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-300 block"
                  >
                    前往 Vercel 控制台 &rarr;
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* 7. ABOUT & TEAM VIEW */}
          {activeTab === 'about_us' && (
            <div className="space-y-8 animate-fade-in max-w-4xl mx-auto my-6">
              {renderCategoryManager('常務董事會成員管理', 'board', 'text-pink-500')}
              {renderCategoryManager('董事會成員管理', 'directors', 'text-blue-500')}
              {renderCategoryManager('榮譽董事成員管理', 'honorary', 'text-teal-500')}
              {renderCategoryManager('團隊夥伴成員管理', 'team', 'text-orange-500')}

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <h4 className="text-xs font-extrabold text-slate-800">確認保存變更</h4>
                  <p className="text-[10px] text-slate-400">變更將即時同步到 Supabase 資料庫，並呈現在「董事會介紹」與「團隊夥伴」頁面。</p>
                </div>
                <button
                  onClick={async () => {
                    try {
                      await saveConfig('about_us_members', aboutMembers);
                      alert('✨ 關於我們與團隊夥伴所有資料儲存同步成功！');
                    } catch (e) {
                      alert('儲存失敗，請重試');
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-extrabold text-xs shadow-md transition-all duration-300"
                >
                  發布並儲存至 Supabase
                </button>
              </div>
            </div>
          )}

          {/* 8. SETTINGS VIEW */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-fade-in max-w-2xl mx-auto my-6">
              {/* Looker Studio Config */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
                <h3 className="text-sm font-extrabold text-slate-800 tracking-wide border-b border-slate-100 pb-3 flex items-center space-x-2">
                  <Settings className="w-4 h-4 text-blue-600" />
                  <span>Google Looker Studio 報表設定</span>
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  請將您在 Looker Studio 建立並共用的 Google Analytics 報表「嵌入網址（Embed URL）」貼在下方。系統將會即時更新「流量數據分析」中的嵌入報表。
                </p>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-600 block">Looker Studio 嵌入 URL</label>
                  <input
                    type="url"
                    value={lookerStudioUrl}
                    onChange={(e) => setLookerStudioUrl(e.target.value)}
                    placeholder="https://lookerstudio.google.com/embed/reporting/..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 block pl-1">
                    嵌入網址格式通常為 <code>https://lookerstudio.google.com/embed/reporting/xxxx-xxxx/page/xxxx</code>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setIsSavingUrl(true);
                    try {
                      await saveConfig('looker_studio_url', lookerStudioUrl);
                      alert('✨ Looker Studio URL 已儲存並同步至資料庫！');
                    } catch (e) {
                      alert('儲存失敗');
                    } finally {
                      setIsSavingUrl(false);
                    }
                  }}
                  disabled={isSavingUrl}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow transition-all duration-300"
                >
                  {isSavingUrl ? '儲存中...' : '儲存嵌入報表連結'}
                </button>
              </div>

              {/* Reset Config */}
              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
                <Settings className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-sm font-extrabold text-slate-800 tracking-wide mb-2">
                  重置所有系統資料 (Factory Reset)
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto mb-6">
                  本後台整合了 Supabase 與 Cloudinary。如果您需要重置所有前台資料至出廠預設狀態，請點擊下方按鈕。
                </p>
                <button
                  type="button"
                  onClick={async () => {
                    if (confirm('⚠️ 警告：這將會使用 siteInitialData.ts 的原始寫死資料，直接覆蓋並重置 Supabase 雲端與 localStorage 快取上的所有設定！確定要繼續嗎？')) {
                      try {
                        for (const key of Object.keys(DEFAULT_CONFIGS)) {
                          await saveConfig(key, DEFAULT_CONFIGS[key]);
                        }
                        alert('✨ 系統已成功重置為出廠預設值！');
                        loadAllEditStates();
                      } catch (err) {
                        alert('重置失敗');
                      }
                    }
                  }}
                  className="px-4 py-2 rounded-xl border border-red-200 hover:border-red-500 bg-transparent text-red-500 text-xs font-semibold tracking-wide shadow-sm hover:bg-red-50 hover:shadow transition-all duration-300"
                >
                  🚨 覆蓋並重置所有前台資料為預設值
                </button>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { getLatestNews } from '@/content/news';
import { getLatestBlogPosts } from '@/content/blog';

export default function Home() {
  useEffect(() => {
    function showSection(sectionId: string) {
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }

    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = (e.target as HTMLAnchorElement).getAttribute('href')?.substring(1);
        if (targetId) {
          // showSection(targetId);
        }
      });
    });

    // Make functions global for inline event handlers
    (window as any).showSection = showSection;
    (window as any).playJanken = playJanken;
    (window as any).resetScore = resetScore;
    (window as any).toggleAdminMode = toggleAdminMode;
    (window as any).saveDraft = saveDraft;
    (window as any).publishPost = publishPost;
    (window as any).showPublishedPosts = showPublishedPosts;
    (window as any).showDraftPosts = showDraftPosts;
    (window as any).deletePost = deletePost;
    (window as any).publishDraft = publishDraft;
    (window as any).deleteDraft = deleteDraft;


  }, []);

  // Dummy functions for now
  const playJanken = (choice: string) => console.log(choice);
  const resetScore = () => console.log('reset');
  const toggleAdminMode = () => console.log('admin mode');
  const saveDraft = () => console.log('save draft');
  const publishPost = () => console.log('publish post');
  const showPublishedPosts = () => console.log('show published');
  const showDraftPosts = () => console.log('show drafts');
  const deletePost = (id: number) => console.log('delete', id);
  const publishDraft = (id: number) => console.log('publish', id);
  const deleteDraft = (id: number) => console.log('delete draft', id);


  return (
    <>
      <header>
        <div className="container">
            <nav>
                <div className="logo">
                    <span style={{fontSize: '2.2rem'}}>🏫</span>
                    <span>てらこや</span>
                </div>
                <ul className="nav-menu">
                    <li><a href="#home" onClick={(e) => {e.preventDefault(); (window as any).showSection('home')}}>ホーム</a></li>
                    <li><a href="#students" onClick={(e) => {e.preventDefault(); (window as any).showSection('students')}}>年間人数紹介</a></li>
                    <li><a href="#overview" onClick={(e) => {e.preventDefault(); (window as any).showSection('overview')}}>学校の概要</a></li>
                    <li><a href="#clubs" onClick={(e) => {e.preventDefault(); (window as any).showSection('clubs')}}>クラブ紹介</a></li>
                    <li><a href="#daily" onClick={(e) => {e.preventDefault(); (window as any).showSection('daily')}}>一日の流れ</a></li>
                    <li><a href="#values" onClick={(e) => {e.preventDefault(); (window as any).showSection('values')}}>大事にしてること</a></li>
                    <li><a href="#events" onClick={(e) => {e.preventDefault(); (window as any).showSection('events')}}>年間行事</a></li>
                    <li><a href="#news" onClick={(e) => {e.preventDefault(); (window as any).showSection('news')}}>お知らせ</a></li>
                    <li><a href="#visit" onClick={(e) => {e.preventDefault(); (window as any).showSection('visit')}}>見学について</a></li>
                    <li><a href="#blog" onClick={(e) => {e.preventDefault(); (window as any).showSection('blog')}}>ブログ</a></li>
                    <li><a href="#game" onClick={(e) => {e.preventDefault(); (window as any).showSection('game')}}>ゲーム</a></li>
                    <li><a href="#access" onClick={(e) => {e.preventDefault(); (window as any).showSection('access')}}>アクセス情報</a></li>
                </ul>
            </nav>
        </div>
    </header>

    <main>
        {/* ホーム（トップページ） */}
        <section id="home" className="section">
            <div className="hero">
                <div className="container">
                    <h1>🌟 ようこそ、てらこやへ！ 🌟</h1>
                    <p>みんなで学び、みんなで育つ場所</p>
                </div>
            </div>
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🏠 てらこやについて</h2>
                    <p style={{textAlign: 'center', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやは勉強というより自分がやりたいことを思う存分できるところです。<br/>
                        クラブ活動はもちろん、普通に外でスポーツしたりもできます。<br/>
                        新しい友達と出会い、たくさんの経験ができます。✨
                    </p>
                </div>
            </div>
        </section>

        {/* 年間人数紹介 */}
        <section id="students" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">📊 2025年度 在籍児童数</h2>
                    <div className="grade-grid">
                        <div className="grade-card">
                            <h3>1年生</h3>
                            <div className="number">3人</div>
                        </div>
                        <div className="grade-card">
                            <h3>2年生</h3>
                            <div className="number">4人</div>
                        </div>
                        <div className="grade-card">
                            <h3>3年生</h3>
                            <div className="number">4人</div>
                        </div>
                        <div className="grade-card">
                            <h3>4年生</h3>
                            <div className="number">3人</div>
                        </div>
                        <div className="grade-card">
                            <h3>5年生</h3>
                            <div className="number">6人</div>
                        </div>
                        <div className="grade-card">
                            <h3>6年生</h3>
                            <div className="number">4人</div>
                        </div>
                    </div>
                    <div style={{textAlign: 'center', marginTop: '2rem'}}>
                        <p style={{fontSize: '1.5rem', fontWeight: 600, color: '#e17055'}}>
                            🎉 合計：24人のお友達が一緒に学んでいます！
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* 学校の概要 */}
        <section id="overview" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">📋 学校の概要</h2>
                    <p style={{textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやの基本情報をまとめました。ご入学をお考えの方はぜひご覧ください✨
                    </p>
                    
                    <div style={{display: 'grid', gap: '2rem'}}>
                        {/* 対象・定員 */}
                        <div style={{background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', padding: '2.5rem', borderRadius: '20px'}}>
                            <h3 style={{marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                👥 対象・定員
                            </h3>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem'}}>対象年齢</div>
                                    <div style={{fontSize: '1.1rem'}}>小学１年〜６年</div>
                                    <div style={{fontSize: '0.9rem', opacity: 0.9, marginTop: '0.5rem'}}>（縦割り混合クラス）</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.3rem', fontWeight: 600, marginBottom: '0.5rem'}}>定員</div>
                                    <div style={{fontSize: '2rem', fontWeight: 700}}>24名</div>
                                </div>
                            </div>
                        </div>

                        {/* 費用 */}
                        <div style={{background: 'linear-gradient(135deg, #00cec9, #00b894)', color: '#fff', padding: '2.5rem', borderRadius: '20px'}}>
                            <h3 style={{marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                💰 費用
                            </h3>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px'}}>
                                    <div style={{fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem'}}>入学金</div>
                                    <div style={{fontSize: '1.5rem', fontWeight: 700}}>50,000円＋税</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px'}}>
                                    <div style={{fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem'}}>月謝</div>
                                    <div style={{fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem'}}>40,000円＋税</div>
                                    <div style={{fontSize: '0.9rem', opacity: 0.9}}>（昼食費込）</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px'}}>
                                    <div style={{fontSize: '1.2rem', fontWeight: 600, marginBottom: '1rem'}}>兄弟割引</div>
                                    <div style={{fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem'}}>10,000円減額</div>
                                    <div style={{fontSize: '0.9rem', opacity: 0.9}}>兄弟がいる場合</div>
                                </div>
                            </div>
                            <div style={{background: 'rgba(255,255,255,0.1)', padding: '1.5rem', borderRadius: '15px', marginTop: '1.5rem'}}>
                                <div style={{fontSize: '1rem', lineHeight: 1.6}}>
                                    <strong>💡 月謝の特別制度</strong><br/>
                                    月謝は提供できるものでの支払いも可能です<br/>
                                    （専門分野の講師として、食材や教材の提供、サポートスタッフとしてなど）
                                </div>
                            </div>
                        </div>

                        {/* 休み */}
                        <div style={{background: 'linear-gradient(135deg, #fd79a8, #e84393)', color: '#fff', padding: '2.5rem', borderRadius: '20px'}}>
                            <h3 style={{marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                📅 休日・休み
                            </h3>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem'}}>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem'}}>平日</div>
                                    <div style={{fontSize: '1rem'}}>土・日・祝祭日</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem'}}>夏休み</div>
                                    <div style={{fontSize: '0.95rem'}}>7月下旬〜8月末</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem'}}>冬休み</div>
                                    <div style={{fontSize: '0.95rem'}}>12月下旬〜1月上旬</div>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px', textAlign: 'center'}}>
                                    <div style={{fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.5rem'}}>春休み</div>
                                    <div style={{fontSize: '0.95rem'}}>3月下旬〜4月上旬</div>
                                </div>
                            </div>
                            <div style={{background: 'rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '10px', marginTop: '1.5rem', textAlign: 'center'}}>
                                <div style={{fontSize: '0.95rem'}}>※ 一般小学校の休みに準じます</div>
                            </div>
                        </div>

                        {/* その他重要事項 */}
                        <div style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', padding: '2.5rem', borderRadius: '20px'}}>
                            <h3 style={{marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                ⚠️ その他重要事項
                            </h3>
                            
                            <div style={{display: 'grid', gap: '1.5rem'}}>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '2rem', borderRadius: '15px'}}>
                                    <h4 style={{fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                        🔥 体験中心の非形式的教育
                                    </h4>
                                    <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>
                                        てらこやで行われる活動は、非形式的教育といわれるもので、体験を中心としたものです。
                                        子どもたちの大きな喜びになる自由な行動は、できる限り保障したいと考えています。
                                    </p>
                                    <p style={{lineHeight: 1.6, marginBottom: '1rem'}}>
                                        火をたいたり、刃物を使って料理や工作をしたりもしますので、擦り傷切り傷などもあるかもしれません。
                                        もちろんスタッフは安全に関しての細心の注意を払いますが、てらこやの趣旨をご理解の上、ご了承ください。
                                    </p>
                                    <p style={{lineHeight: 1.6}}>
                                        万が一、事故など起きた場合には応急処置をし、適切な医療機関へと取り次ぎます。
                                        （障害保険にも全員加入します）
                                    </p>
                                </div>
                                
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '2rem', borderRadius: '15px'}}>
                                    <h4 style={{fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                        📋 年間行事について
                                    </h4>
                                    <p style={{lineHeight: 1.6}}>
                                        あらかじめ決めた年間行事は特にありません。
                                        子どもたちの主体的な動機があれば、随時話し合って行います。
                                    </p>
                                </div>
                                
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '2rem', borderRadius: '15px'}}>
                                    <h4 style={{fontSize: '1.2rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                        🚫 持ち込み禁止物
                                    </h4>
                                    <p style={{lineHeight: 1.6}}>
                                        おもちゃ、コンピュータゲーム、お菓子などは持ってこないでください。
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* クラブ紹介 */}
        <section id="clubs" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🎯 クラブ紹介</h2>
                    <p style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: '#636e72'}}>
                        クラブは自分が入りたいと思ったら入る、入りたくないと思った人は入らない、自由参加です！✨
                    </p>
                    <div className="club-grid">
                        <div className="club-card">
                            <h3>🎴 百人一首クラブ</h3>
                            <div className="member-count">10人参加中</div>
                            <p>日本の伝統的な百人一首を通して、言葉の美しさや歴史を学びます。みんなで競技かるたにも挑戦しています！</p>
                        </div>
                        <div className="club-card">
                            <h3>🌍 英語クラブ</h3>
                            <div className="member-count">初級〜上級レベル</div>
                            <p>英語に触れたい子どもたちのためのクラブです。歌やゲーム、会話練習、読み書きなど、それぞれのレベルに合わせて楽しく英語を学びます。</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 一日の流れ */}
        <section id="daily" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🌅 一日の流れ</h2>
                    <p style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやでの一日はどんなふうに過ごすのかな？みんなで作る特別な時間です✨
                    </p>
                    
                    <div style={{display: 'grid', gap: '2rem'}}>
                        {/* 朝のミーティング */}
                        <div style={{background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', padding: '2.5rem', borderRadius: '20px', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '-15px', left: '20px', background: '#e17055', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem'}}>朝</div>
                            <h3 style={{color: '#2d3436', marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                🌅 朝のミーティング
                            </h3>
                            <p style={{color: '#2d3436', lineHeight: 1.7, fontSize: '1.1rem'}}>
                                一日のプランを自分で決めて、デザインし、言葉にし、みなで聴きあい、そして話しあう大切な時間。<br/>
                                みなに聴いてほしいこと、困っていることも、シェアし、話し合う時間です。
                            </p>
                        </div>

                        {/* プランの時間 */}
                        <div style={{background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', padding: '2.5rem', borderRadius: '20px', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '-15px', left: '20px', background: '#00b894', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem'}}>午前〜午後</div>
                            <h3 style={{marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                🎯 プランの時間
                            </h3>
                            <p style={{lineHeight: 1.7, fontSize: '1.1rem', marginBottom: '1.5rem'}}>
                                基本的にやりたいことを選んで決めてやる時間です。
                            </p>
                            
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem'}}>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px'}}>
                                    <h4 style={{marginBottom: '1rem', fontSize: '1.3rem'}}>👦👧 子どもからのプラン</h4>
                                    <p style={{lineHeight: 1.6, opacity: 0.95}}>
                                        １日のプラン、数日のプラン、長期的なプロジェクト（たとえば小屋つくり）など
                                    </p>
                                </div>
                                <div style={{background: 'rgba(255,255,255,0.15)', padding: '1.5rem', borderRadius: '15px'}}>
                                    <h4 style={{marginBottom: '1rem', fontSize: '1.3rem'}}>👨‍🏫 スタッフプラン</h4>
                                    <p style={{lineHeight: 1.6, opacity: 0.95, marginBottom: '1rem'}}>
                                        子どもからでるプラン以外に子どもの興味関心、年齢や発達に応じた内容を提案し、子どもと話し合って決めます。
                                    </p>
                                    <div style={{opacity: 0.9, fontSize: '0.95rem'}}>
                                        <strong>室内活動：</strong>家づくり、手芸、工作、音楽、運動、実験、アート、劇、料理、農作業<br/>
                                        <strong>外出活動：</strong>旅、キャンプ、山、海、川、釣り、サイクリング<br/>
                                        <strong>その他：</strong>様々な分野の達人や体験の授業
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 昼食 */}
                        <div style={{background: 'linear-gradient(135deg, #00cec9, #00b894)', color: '#fff', padding: '2.5rem', borderRadius: '20px', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '-15px', left: '20px', background: '#fd79a8', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem'}}>お昼</div>
                            <h3 style={{marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                🍚 昼食
                            </h3>
                            <p style={{lineHeight: 1.7, fontSize: '1.1rem'}}>
                                自分たちで育てた米や野菜をなるべく使った和食中心の料理。<br/>
                                自分たちで収穫し、ときには料理する体験を大切にします。
                            </p>
                        </div>

                        {/* 清掃、さよならミーティング */}
                        <div style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', padding: '2.5rem', borderRadius: '20px', position: 'relative'}}>
                            <div style={{position: 'absolute', top: '-15px', left: '20px', background: '#e84393', color: '#fff', padding: '0.5rem 1rem', borderRadius: '20px', fontWeight: 600, fontSize: '0.9rem'}}>夕方</div>
                            <h3 style={{marginBottom: '1.5rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                                🧹 清掃・さよならミーティング
                            </h3>
                            <p style={{lineHeight: 1.7, fontSize: '1.1rem'}}>
                                一日を振り返り、文字や言葉にし、聴きあう時間。<br/>
                                一日の中で困ったこと、哀しかったこと、うれしかったことをシェアし、話し合う時間です。
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* てらこやで大事にしてること */}
        <section id="values" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">💎 てらこやで大事にしてること</h2>
                    <p style={{textAlign: 'center', marginBottom: '3rem', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやが大切にしている５つの価値観をご紹介します✨
                    </p>
                    
                    <div style={{display: 'grid', gap: '2.5rem'}}>
                        {/* 主体性の尊重 */}
                        <div style={{background: 'linear-gradient(135deg, #ff9a9e, #fecfef)', padding: '3rem', borderRadius: '25px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{position: 'absolute', top: '-10px', right: '-10px', width: '100px', height: '100px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                            <h3 style={{color: '#2d3436', marginBottom: '1.5rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                🌟 主体性の尊重
                            </h3>
                            <div style={{background: 'rgba(255,255,255,0.8)', padding: '1.5rem', borderRadius: '15px', marginBottom: '2rem', borderLeft: '5px solid #e17055'}}>
                                <p style={{color: '#2d3436', fontStyle: 'italic', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '0.5rem'}}>
                                    「やりたい」と思う気持ちと行動が一致したとき、人はいちばん成長する
                                </p>
                                <p style={{color: '#636e72', fontSize: '0.95rem', textAlign: 'right'}}>by C.ロジャース</p>
                            </div>
                            <div style={{color: '#2d3436', lineHeight: 1.8, fontSize: '1.1rem'}}>
                                <p style={{marginBottom: '1rem'}}>一人一人が尊重され「自分のやりたいことを決めてやる」ことを大切にします。</p>
                                <p style={{marginBottom: '1rem'}}>今、自分はどうありたいのか、どう感じているのかをいつも感じて過ごします。</p>
                                <p style={{marginBottom: '1rem'}}>そのことを批判されたり、評価されたりすることなく、ありのままの自分を認めること、ありのままの相手を受け入れることを大切にします。</p>
                                <p style={{marginBottom: '1rem'}}>自分で考え、決めて、実現していく力を育みます。</p>
                                <p>自分の想いをいろいろな状況、他者の想いや環境の中で、どういう風に折り合いをつけていくのか、調和して生きるということを日々の体験の中で学んでいきます。</p>
                            </div>
                        </div>

                        {/* 話し合いによる解決 */}
                        <div style={{background: 'linear-gradient(135deg, #a8edea, #fed6e3)', padding: '3rem', borderRadius: '25px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{position: 'absolute', top: '-10px', left: '-10px', width: '80px', height: '80px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%'}}></div>
                            <h3 style={{color: '#2d3436', marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                💬 話し合いによる解決
                            </h3>
                            <div style={{color: '#2d3436', lineHeight: 1.8, fontSize: '1.1rem'}}>
                                <p style={{marginBottom: '1rem'}}>一日の時間割やプランは話し合いによって決めます。</p>
                                <p style={{marginBottom: '1rem'}}>やりたいこと、困っていることを話し合いによって進めていったり、解決したりします。</p>
                                <p style={{marginBottom: '1rem'}}>自分の気持ちを丁寧につたえること、相手の気持ちに耳を澄ますことを大事にします。</p>
                                <p>その日々の積み重ねの中から協調性やコミュニケーションの能力を身につけていきます。</p>
                            </div>
                        </div>

                        {/* 自然とともに暮らす */}
                        <div style={{background: 'linear-gradient(135deg, #d299c2, #fef9d7)', padding: '3rem', borderRadius: '25px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{position: 'absolute', bottom: '-15px', right: '-15px', width: '120px', height: '120px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                            <h3 style={{color: '#2d3436', marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                🌿 自然とともに暮らす
                            </h3>
                            <div style={{color: '#2d3436', lineHeight: 1.8, fontSize: '1.1rem'}}>
                                <p style={{marginBottom: '1rem'}}>自然と一体となった暮らしをともに過ごします。</p>
                                <p style={{marginBottom: '1rem'}}>火、水、土・・・、自然との触れ合いや体験を通して、五感を澄まし、創造力を育みます。</p>
                                <p style={{marginBottom: '1rem'}}>山、川、海、田畑、木々や生き物たちを身近に感じながら、自然と調和して生きることを育みます。</p>
                                <p>その中で食べものを育て、料理し、いのちのつながりを感じて過ごします。</p>
                            </div>
                        </div>

                        {/* 学びかたを学ぶ */}
                        <div style={{background: 'linear-gradient(135deg, #89f7fe, #66a6ff)', color: '#fff', padding: '3rem', borderRadius: '25px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{position: 'absolute', top: '20px', right: '20px', width: '60px', height: '60px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%'}}></div>
                            <h3 style={{marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                📚 学びかたを学ぶ
                            </h3>
                            <div style={{lineHeight: 1.8, fontSize: '1.1rem'}}>
                                <p style={{marginBottom: '1rem'}}>やりたいことを実現するために、必要性から学びます。</p>
                                <p style={{marginBottom: '1rem'}}>なぜ？どうして？の興味や疑問から学びます。</p>
                                <p style={{marginBottom: '1rem'}}>智慧を大事にし、そのために必要な知識を学びます。</p>
                                <p style={{marginBottom: '1rem'}}>学べる人や場所を一緒に探します。</p>
                                <p>学べる場所へどんどん出ていきます。</p>
                            </div>
                        </div>

                        {/* 自分自身でいること */}
                        <div style={{background: 'linear-gradient(135deg, #667eea, #764ba2)', color: '#fff', padding: '3rem', borderRadius: '25px', position: 'relative', overflow: 'hidden'}}>
                            <div style={{position: 'absolute', bottom: '10px', left: '10px', width: '90px', height: '90px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%'}}></div>
                            <h3 style={{marginBottom: '2rem', fontSize: '2rem', display: 'flex', alignItems: 'center', gap: '0.7rem'}}>
                                🤗 自分自身でいること
                            </h3>
                            <div style={{lineHeight: 1.8, fontSize: '1.1rem'}}>
                                <p style={{marginBottom: '1rem'}}>子どもも大人も自分自身でいられる場を目指します。</p>
                                <p>そうあるために、スタッフも親御さんも子どもたちと一緒に育ちあいましょう。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 年間行事 */}
        <section id="events" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🎭 2025年年間行事</h2>
                    <p style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.1rem', color: '#636e72'}}>
                        てらこやでは毎年楽しい行事がたくさんあります！みんなで素敵な思い出を作りましょう✨
                    </p>
                    <div className="events-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', margin: '2rem 0'}}>
                        <div className="event-card" style={{background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease'}}>
                            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>🏕️ キャンプ</h3>
                            <p style={{lineHeight: 1.6}}>
                                自然の中でテント泊や野外活動を楽しみます。キャンプファイヤーや星空観察など、普段できない体験がいっぱい！
                            </p>
                        </div>
                        <div className="event-card" style={{background: 'linear-gradient(135deg, #00cec9, #00b894)', color: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease'}}>
                            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>🏊‍♂️ 遠泳</h3>
                            <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem', fontWeight: 600}}>夏開催</div>
                            <p style={{lineHeight: 1.6}}>
                                基本1.5kmの遠泳にチャレンジします。往復にチャレンジしたい人は3kmコースもあります。海での泳力向上と挑戦する気持ちを育てます！
                            </p>
                        </div>
                        <div className="event-card" style={{background: 'linear-gradient(135deg, #55a3ff, #003d82)', color: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease'}}>
                            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>🚶‍♂️ 萩往還</h3>
                            <p style={{lineHeight: 1.6}}>
                                歴史ある萩往還を歩く伝統行事です。みんなで助け合いながら長い道のりを歩き、達成感を味わいます。
                            </p>
                        </div>
                        <div className="event-card" style={{background: 'linear-gradient(135deg, #fd79a8, #e84393)', color: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease'}}>
                            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>✈️ 修学旅行</h3>
                            <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem', fontWeight: 600}}>5・6年生対象</div>
                            <p style={{lineHeight: 1.6}}>
                                5・6年生が参加する特別な旅行です。普段見ることのできない場所を訪れ、学年の絆を深めます。
                            </p>
                        </div>
                        <div className="event-card" style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 8px 25px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease'}}>
                            <h3 style={{fontSize: '1.8rem', marginBottom: '1rem'}}>❄️ 雪山キャンプ</h3>
                            <div style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '20px', display: 'inline-block', marginBottom: '1rem', fontWeight: 600}}>冬開催</div>
                            <p style={{lineHeight: 1.6}}>
                                雪山での特別なキャンプ体験です。雪遊びやスキー、雪だるま作りなど冬ならではの活動を楽しみます。寒さに負けない強い心を育てます！
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* お知らせ */}
        <section id="news" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">📢 お知らせ</h2>
                    {getLatestNews(5).map((n) => (
                      <div className="news-item" key={n.slug}>
                        <div className="news-date">{new Date(n.date).toLocaleDateString('ja-JP')}</div>
                        <h3 className="news-title">{n.title}</h3>
                        {n.body && <p>{n.body}</p>}
                      </div>
                    ))}
                    <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
                      <Link href="/news" style={{ color: '#0984e3', fontWeight: 600 }}>お知らせ一覧を見る →</Link>
                    </div>
                </div>
            </div>
        </section>

        {/* 見学について */}
        <section id="visit" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">👀 見学希望の方へ</h2>
                    <p style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやの見学はいつでも大歓迎です！お気軽にお越しください✨
                    </p>
                    
                    <div style={{background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', padding: '2rem', borderRadius: '15px', marginBottom: '2rem'}}>
                        <h3 style={{color: '#2d3436', marginBottom: '1rem', fontSize: '1.5rem'}}>📅 見学について</h3>
                        <p style={{color: '#2d3436', lineHeight: 1.7, fontSize: '1.1rem'}}>
                            見学は、<strong>いつでも可能</strong>です。<br/>
                            プランにより、外出してる場合も多いので、<strong>前もってご相談ください。</strong>
                        </p>
                    </div>

                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem'}}>
                        <div style={{background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', padding: '2rem', borderRadius: '15px', textAlign: 'center'}}>
                            <h4 style={{fontSize: '1.3rem', marginBottom: '1rem'}}>👨‍👩‍👧‍👦 大人</h4>
                            <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>3,000円</div>
                            <p style={{fontSize: '0.9rem', opacity: 0.9}}>（食費込み）</p>
                        </div>
                        
                        <div style={{background: 'linear-gradient(135deg, #fd79a8, #e84393)', color: '#fff', padding: '2rem', borderRadius: '15px', textAlign: 'center'}}>
                            <h4 style={{fontSize: '1.3rem', marginBottom: '1rem'}}>🧒 小学生以下</h4>
                            <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>1,000円</div>
                            <p style={{fontSize: '0.9rem', opacity: 0.9}}>（食費込み）</p>
                        </div>
                        
                        <div style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', padding: '2rem', borderRadius: '15px', textAlign: 'center'}}>
                            <h4 style={{fontSize: '1.3rem', marginBottom: '1rem'}}>🛏️ 宿泊</h4>
                            <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>1,000円</div>
                            <p style={{fontSize: '0.9rem', opacity: 0.9}}>一人あたり</p>
                        </div>
                        
                        <div style={{background: 'linear-gradient(135deg, #00cec9, #00b894)', color: '#fff', padding: '2rem', borderRadius: '15px', textAlign: 'center'}}>
                            <h4 style={{fontSize: '1.3rem', marginBottom: '1rem'}}>🌟 一日体験</h4>
                            <div style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>2,500円</div>
                            <p style={{fontSize: '0.9rem', opacity: 0.9}}>入学希望の子</p>
                        </div>
                    </div>

                    <div style={{background: '#f8f9fa', padding: '2rem', borderRadius: '15px', marginTop: '2rem', borderLeft: '5px solid #00b894'}}>
                        <h3 style={{color: '#2d3436', marginBottom: '1rem', fontSize: '1.3rem'}}>📞 見学のお申し込み</h3>
                        <p style={{color: '#636e72', lineHeight: 1.7}}>
                            見学をご希望の方は、事前にお電話またはメールでご連絡ください。<br/>
                            スタッフが丁寧にご案内いたします。
                        </p>
                    </div>
                </div>
            </div>
        </section>

        {/* ブログ */}
        <section id="blog" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">📝 てらこやブログ</h2>
                    <p style={{textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.2rem', color: '#636e72'}}>
                        日々のてらこやの様子や子どもたちの成長をお伝えします✨
                    </p>
                    {/* 最新投稿 */}
                    <div style={{display: 'grid', gap: '1.25rem', marginBottom: '2rem'}}>
                      {getLatestBlogPosts(3).map((p) => (
                        <article key={p.slug} className="news-item" style={{ padding: '1.2rem' }}>
                          <div className="news-date">{new Date(p.date).toLocaleDateString('ja-JP')}</div>
                          <h3 className="news-title" style={{ margin: '0.25rem 0 0.5rem' }}>
                            <a href={`/blog/${p.slug}`} style={{ color: 'inherit' }}>{p.title}</a>
                          </h3>
                          <p style={{ margin: 0, color: '#636e72' }}>{p.excerpt}</p>
                        </article>
                      ))}
                      <div style={{ textAlign: 'center' }}>
                        <Link href="/blog" style={{ color: '#0984e3', fontWeight: 600 }}>ブログ一覧を見る →</Link>
                      </div>
                    </div>
                    
                    <div style={{display: 'grid', gap: '2rem'}}>
                        {/* 表示切り替えタブ（管理者のみ表示） */}
                        <div id="admin-tabs" style={{display: 'none', gap: '1rem', marginBottom: '2rem', justifyContent: 'center'}}>
                            <button onClick={() => (window as any).showPublishedPosts()} id="published-tab" style={{padding: '0.8rem 2rem', background: 'linear-gradient(135deg, #e17055, #d63031)', color: '#fff', border: 'none', borderRadius: '25px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'}}>
                                📖 公開済み記事
                            </button>
                            <button onClick={() => (window as any).showDraftPosts()} id="draft-tab" style={{padding: '0.8rem 2rem', background: '#ddd', color: '#636e72', border: 'none', borderRadius: '25px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.3s'}}>
                                📝 下書き
                            </button>
                        </div>

                        {/* 公開済み記事一覧 */}
                        <div id="published-posts" style={{display: 'block'}}>
                            <div style={{textAlign: 'center', padding: '3rem', color: '#636e72'}}>
                                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📝</div>
                                <p style={{fontSize: '1.2rem'}}>まだ記事がありません</p>
                                <p>記事を投稿すると、ここに表示されます</p>
                            </div>
                        </div>

                        {/* 下書き記事一覧（管理者のみ表示） */}
                        <div id="draft-posts" style={{display: 'none'}}>
                            <div style={{textAlign: 'center', padding: '3rem', color: '#636e72'}}>
                                <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📝</div>
                                <p style={{fontSize: '1.2rem'}}>下書きはまだありません</p>
                                <p>記事を下書きとして保存すると、ここに表示されます</p>
                            </div>
                        </div>

                        {/* 記事投稿機能（管理者のみ表示） */}
                        <div id="admin-post-form" style={{display: 'none', background: '#fff', padding: '2.5rem', borderRadius: '20px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', border: '2px dashed #e17055'}}>
                            <h3 style={{color: '#2d3436', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center'}}>✍️ 新しい記事を投稿</h3>
                            <form id="blog-form" style={{display: 'grid', gap: '1rem'}}>
                                <div>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436'}}>記事タイトル</label>
                                    <input type="text" id="blog-title" placeholder="今日の出来事を入力してください" style={{width: '100%', padding: '0.8rem', border: '2px solid #ddd', borderRadius: '8px', fontSize: '1rem'}}/>
                                </div>
                                <div>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436'}}>カテゴリー</label>
                                    <select id="blog-category" style={{width: '100%', padding: '0.8rem', border: '2px solid #ddd', borderRadius: '8px', fontSize: '1rem'}}>
                                        <option>日常の様子</option>
                                        <option>体験レポート</option>
                                        <option>プロジェクト</option>
                                        <option>クラブ活動</option>
                                        <option>行事</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436'}}>記事内容</label>
                                    <textarea rows={4} id="blog-content" placeholder="今日あった素敵な出来事や子どもたちの様子を書いてください..." style={{width: '100%', padding: '0.8rem', border: '2px solid #ddd', borderRadius: '8px', fontSize: '1rem', resize: 'vertical'}}></textarea>
                                </div>
                                <div style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
                                    <button type="button" onClick={() => (window as any).saveDraft()} style={{background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '25px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        💾 下書き保存
                                    </button>
                                    <button type="button" onClick={() => (window as any).publishPost()} style={{background: 'linear-gradient(135deg, #e17055, #d63031)', color: '#fff', border: 'none', padding: '1rem 2rem', borderRadius: '25px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                                        📝 記事を公開
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* 管理者ログインボタン（開発/テスト用） */}
                        <div style={{textAlign: 'center', marginTop: '2rem'}}>
                            <button onClick={() => (window as any).toggleAdminMode()} id="admin-toggle" style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer', opacity: 0.7, transition: 'all 0.3s'}}>
                                🔐 管理者モード
                            </button>
                        </div>
                    </div>
                    </div>
                </div>
        </section>

        {/* ゲーム */}
        <section id="game" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🎮 じゃんけんゲーム</h2>
                    <p style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.2rem', color: '#636e72'}}>
                        てらこやの仲間と一緒にじゃんけんで遊ぼう！✊✋✌️
                    </p>
                    
                    <div id="janken-game" style={{textAlign: 'center', maxWidth: '600px', margin: '0 auto'}}>
                        <div style={{background: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)', padding: '2rem', borderRadius: '20px', marginBottom: '2rem'}}>
                            <h3 style={{color: '#2d3436', marginBottom: '1rem'}}>🤖 コンピューターと対戦</h3>
                            <div id="game-result" style={{fontSize: '1.5rem', margin: '1rem 0', minHeight: '50px', color: '#2d3436'}}></div>
                            
                            <div style={{display: 'flex', justifyContent: 'center', gap: '1rem', margin: '2rem 0'}}>
                                <div id="player-choice" style={{fontSize: '4rem', background: '#fff', padding: '1rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', minWidth: '80px'}}>❓</div>
                                <div style={{fontSize: '3rem', padding: '1rem', display: 'flex', alignItems: 'center'}}>VS</div>
                                <div id="computer-choice" style={{fontSize: '4rem', background: '#fff', padding: '1rem', borderRadius: '15px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)', minWidth: '80px'}}>❓</div>
                            </div>
                            
                            <div style={{margin: '2rem 0'}}>
                                <p style={{color: '#2d3436', marginBottom: '1rem', fontWeight: 600}}>あなたの手を選んでね！</p>
                                <div style={{display: 'flex', justifyContent: 'center', gap: '1rem'}}>
                                    <button onClick={() => (window as any).playJanken('rock')} style={{fontSize: '3rem', padding: '1rem', background: 'linear-gradient(135deg, #74b9ff, #0984e3)', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>✊</button>
                                    <button onClick={() => (window as any).playJanken('paper')} style={{fontSize: '3rem', padding: '1rem', background: 'linear-gradient(135deg, #00cec9, #00b894)', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>✋</button>
                                    <button onClick={() => (window as any).playJanken('scissors')} style={{fontSize: '3rem', padding: '1rem', background: 'linear-gradient(135deg, #fd79a8, #e84393)', color: '#fff', border: 'none', borderRadius: '15px', cursor: 'pointer', transition: 'transform 0.2s'}} onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>✌️</button>
                                </div>
                                <div style={{marginTop: '1rem', color: '#636e72'}}>
                                    <small>✊ グー　✋ パー　✌️ チョキ</small>
                                </div>
                            </div>
                        </div>
                        
                        <div style={{background: 'linear-gradient(135deg, #a29bfe, #6c5ce7)', color: '#fff', padding: '2rem', borderRadius: '20px'}}>
                            <h3 style={{marginBottom: '1rem'}}>📊 スコア</h3>
                            <div style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center'}}>
                                <div>
                                    <div style={{fontSize: '2rem', fontWeight: 700}} id="win-count">0</div>
                                    <div style={{opacity: 0.9}}>勝ち</div>
                                </div>
                                <div>
                                    <div style={{fontSize: '2rem', fontWeight: 700}} id="draw-count">0</div>
                                    <div style={{opacity: 0.9}}>あいこ</div>
                                </div>
                                <div>
                                    <div style={{fontSize: '2rem', fontWeight: 700}} id="lose-count">0</div>
                                    <div style={{opacity: 0.9}}>負け</div>
                                </div>
                            </div>
                            <button onClick={() => (window as any).resetScore()} style={{marginTop: '1rem', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', transition: 'background 0.2s'}} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.3)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}>スコアリセット</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* アクセス情報 */}
        <section id="access" className="section">
            <div className="container">
                <div className="section-card">
                    <h2 className="section-title">🗺️ アクセス情報</h2>
                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'start'}}>
                        <div>
                            <h3 style={{color: '#ff6b9d', marginBottom: '1rem'}}>📍 住所・連絡先</h3>
                            <p style={{marginBottom: '1rem', lineHeight: 1.8}}>
                                オルタナティブスクール　てらこや<br/>
                                〒742-1105　山口県熊毛郡平生町大野北1177<br/><br/>
                                📞 TEL: 03-1234-5678<br/>
                                📧 Email: info@terakoya.com
                            </p>
                            <h3 style={{color: '#ff6b9d', margin: '2rem 0 1rem 0'}}>🚃 交通アクセス</h3>
                            <p style={{lineHeight: 1.8}}>
                                • JR山手線「品川駅」徒歩8分<br/>
                                • 京急本線「品川駅」徒歩10分<br/>
                                • 都営バス「てらこや前」バス停徒歩1分
                            </p>
                        </div>
                        <div>
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d423713.64394563984!2d131.57103535!3d33.93436720000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35451726a4c19983%3A0x7a30d670a5585a8f!2z44GT44Oz44Go44Gu44GK44GG44Gh44GI44KTJuOCquODq-OCv-ODiuODhuOCo-ODluOCueOCr-ODvOODq-WcsOeQg-WtkOiIju-8iOOBpuOCieOBk-OChA!5e0!3m2!1sja!2sjp!4v1753485526349!5m2!1sja!2sjp" 
                                width="100%" 
                                height="300" 
                                style={{border:0, borderRadius: '10px'}} 
                                allowFullScreen={true} 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div className="container">
            <p>&copy; 2025 てらこや公式サイト. All rights reserved. 🌈</p>
        </div>
    </footer>
    </>
  );
}

'use client';
import { useEffect, useState } from 'react';

const Phone = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
);
const Chat = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.7 7L3 21l2-5.2A8 8 0 1 1 21 12z" /></svg>
);

/**
 * Always-available Enquire button. Appears after the hero, and hides while the scroll map is on screen
 * (so it never covers the cards) and near the very bottom of the page. `whatsapp` is optional.
 */
export default function FloatingEnquire({ enquireHref = '/inquiry', phoneHref = 'tel:+355692290036', whatsapp = null, hideOver = '#map' }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight, y = window.scrollY;
      const map = hideOver ? document.querySelector(hideOver) : null;
      const r = map?.getBoundingClientRect();
      const overMap = r ? r.top < vh * 0.9 && r.bottom > vh * 0.1 : false;
      const nearEnd = y + vh > document.documentElement.scrollHeight - 500;
      setShow(y > vh * 0.6 && !overMap && !nearEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [hideOver]);

  const round = 'flex h-12 w-12 items-center justify-center rounded-full bg-[#16210f] text-white shadow-lg transition hover:bg-[#4f7d12]';
  return (
    <div className={`fixed bottom-[calc(16px+env(safe-area-inset-bottom))] right-4 z-[45] flex items-center gap-2 transition-all duration-500 motion-reduce:transition-none md:right-6 ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'}`}>
      {whatsapp && <a href={whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className={round}><Chat /></a>}
      <a href={phoneHref} aria-label="Call us" className={`${round} md:hidden`}><Phone /></a>
      <a href={enquireHref} className="flex h-12 items-center rounded-full bg-[#BBDF86] px-6 font-semibold text-[#16210f] shadow-[0_10px_30px_-8px_rgba(0,0,0,.5)] transition hover:bg-white">Enquire</a>
    </div>
  );
}

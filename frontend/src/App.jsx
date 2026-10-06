import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import SmoothScroll from "./SmoothScroll.jsx";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import FloatingEnquire from "./FloatingEnquire.jsx";
import Hero from "./Hero.jsx";
import AlbaniaScrollMap from "./AlbaniaScrollMap.jsx";
import TrustStrip from "./TrustStrip.jsx";
import Collections from "./Collections.jsx";
import FeaturedTours from "./FeaturedTours.jsx";
import Reviews from "./Reviews.jsx";
import HowItWorks from "./HowItWorks.jsx";
import PlanningHelpers from "./PlanningHelpers.jsx";
import Team from "./Team.jsx";
import Stories from "./Stories.jsx";
import FAQ from "./FAQ.jsx";
import ClosingCTA from "./ClosingCTA.jsx";
import TourPage from "./TourPage.jsx";
import ToursPage from "./ToursPage.jsx";
import DestinationsPage from "./DestinationsPage.jsx";
import DestinationPage from "./DestinationPage.jsx";
import CollectionPage from "./CollectionPage.jsx";
import ContactPage from "./ContactPage.jsx";
import { ArticlesPage, ArticlePage } from "./ArticlePages.jsx";
import { AboutPage, TeamPage } from "./AboutPages.jsx";
import {
  TripLevelPage,
  FaqPage,
  MovedPage,
  SitemapPage,
  NotFoundPage,
  ComingSoonTour,
} from "./InfoPages.jsx";
import { TOUR_PAGES } from "./tourData.js";

// Turns clicks on ordinary <a href="/..."> links into in-app navigation, so every component can keep using plain links.
function LinkInterceptor() {
  const navigate = useNavigate();
  useEffect(() => {
    const onClick = (e) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const a = e.target.closest?.("a");
      if (
        !a ||
        (a.target && a.target !== "_self") ||
        a.hasAttribute("download")
      )
        return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin) return; // external, tel:, mailto:
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search &&
        url.hash
      )
        return; // same-page anchor
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
  return null;
}

// New page: scroll to the top (or to #section if the link had one).
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const t = setTimeout(() => {
      const el = hash ? document.querySelector(hash) : null;
      if (el)
        window.lenis
          ? window.lenis.scrollTo(el, { offset: -80 })
          : el.scrollIntoView();
      else
        window.lenis
          ? window.lenis.scrollTo(0, { immediate: true })
          : window.scrollTo(0, 0);
    }, 30);
    return () => clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

function Layout() {
  const { pathname } = useLocation();
  const hideFloating =
    pathname === "/inquiry" ||
    pathname === "/contact" ||
    pathname.startsWith("/contact/") ||
    pathname.startsWith("/tour/");
  return (
    <>
      <SmoothScroll />
      <LinkInterceptor />
      <ScrollManager />
      <Header tone="dark" currentPath={pathname} />
      <Outlet />
      <Footer />
      {!hideFloating && <FloatingEnquire />}
    </>
  );
}

function Home() {
  return (
    <main id="main">
      <Hero />
      <AlbaniaScrollMap />
      <TrustStrip />
      <Collections />
      <FeaturedTours />
      <Reviews />
      <HowItWorks />
      <PlanningHelpers />
      <Team />
      <Stories />
      <FAQ />
      <ClosingCTA />
    </main>
  );
}

function TourRoute() {
  const { slug } = useParams();
  return TOUR_PAGES[slug] ? (
    <TourPage tour={TOUR_PAGES[slug]} />
  ) : (
    <ComingSoonTour slug={slug} />
  );
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tours" element={<ToursPage />} />
        <Route path="tour/:slug" element={<TourRoute />} />
        <Route path="destinations" element={<DestinationsPage />} />
        <Route path="destinations/:id" element={<DestinationPage />} />
        <Route path="collection" element={<CollectionPage />} />
        <Route path="collection/:slug" element={<CollectionPage />} />
        <Route path="inquiry" element={<ContactPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="contact/business" element={<ContactPage business />} />
        <Route path="article" element={<ArticlesPage />} />
        <Route path="article/:slug" element={<ArticlePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="about/our-team" element={<TeamPage />} />
        <Route path="trip-level" element={<TripLevelPage />} />
        <Route path="trip-level/:level" element={<TripLevelPage />} />
        <Route path="faq" element={<FaqPage />} />
        <Route
          path="visa-albania"
          element={
            <MovedPage
              title="Travel visa for Albania"
              eyebrow="Useful information"
              path="/visa-albania"
            />
          }
        />
        <Route
          path="attractions"
          element={
            <MovedPage
              title="Attractions"
              eyebrow="Explore"
              path="/attractions"
            />
          }
        />
        <Route
          path="booking-terms"
          element={
            <MovedPage
              title="Booking terms"
              eyebrow="Legal terms"
              path="/booking-terms"
            />
          }
        />
        <Route
          path="cancelation"
          element={
            <MovedPage
              title="Cancellation terms"
              eyebrow="Legal terms"
              path="/cancelation"
            />
          }
        />
        <Route
          path="privacy-policy"
          element={
            <MovedPage
              title="Privacy policy"
              eyebrow="Legal terms"
              path="/privacy-policy"
            />
          }
        />
        <Route path="sitemap" element={<SitemapPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

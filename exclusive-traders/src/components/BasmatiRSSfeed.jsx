import React, { useState, useEffect, useRef } from "react";
import { RotateCw, ExternalLink } from "lucide-react";

const BasmatiRSSFeed = () => {
  const [feeds, setFeeds] = useState([
    { id: 1, title: "Loading live rice market updates...", link: "#", source: "Market Watch", type: "info" }
  ]);
  const [loading, setLoading] = useState(false);
  const [paused, setPaused] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("🌾 Live Rice Market Updates");
  const [marketTrend, setMarketTrend] = useState("loading");
  const [activeFeed, setActiveFeed] = useState(null);
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);

  const API_BASE_URL = "http://localhost:8000";

  useEffect(() => {
    console.log("BasmatiRSSFeed component mounted");
    fetchFeeds();
    const interval = setInterval(fetchFeeds, 1 * 60 * 1000);
    const titleInterval = setInterval(rotateTitle, 15000);
    
    return () => {
      console.log("BasmatiRSSFeed component unmounted");
      clearInterval(interval);
      clearInterval(titleInterval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    console.log("Feeds updated:", feeds);
    if (!paused && feeds.length > 0) {
      startScrolling();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }
  }, [paused, feeds]);

  const startScrolling = () => {
    if (!scrollContainerRef.current) {
      console.log("Scroll container ref not found");
      return;
    }

    const container = scrollContainerRef.current;
    let startTime = null;
    const duration = 160000; // 160 seconds for slower scrolling

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = (elapsed % duration) / duration;
      
      const contentWidth = container.scrollWidth / 2;
      // Right-to-left: Start at contentWidth, move to 0
      const translateX = contentWidth - (progress * contentWidth);
      
      container.style.transform = `translateX(${translateX}px)`;
      console.log("Scrolling: translateX =", translateX);
      
      if (!paused) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    console.log("Starting scroll animation");
    animationRef.current = requestAnimationFrame(animate);
  };

  const fetchFeeds = async () => {
    try {
      setLoading(true);
      console.log("Fetching feeds from:", `${API_BASE_URL}/rss`);
      const rssResponse = await fetch(`${API_BASE_URL}/rss`);
      if (!rssResponse.ok) {
        throw new Error(`HTTP error! status: ${rssResponse.status}`);
      }
      const rssData = await rssResponse.json();
      console.log("Fetched RSS data:", rssData);

      if (rssData.current_title) setCurrentTitle(rssData.current_title);
      setMarketTrend(rssData.market_trend || "stable");

      if (rssData?.articles?.length > 0) {
        const enhancedFeeds = rssData.articles.map((article, i) => ({
          id: i,
          title: article.title,
          link: article.link || "#",
          source: article.source,
          type: getArticleType(article.title)
        }));
        setFeeds(enhancedFeeds);
      } else {
        console.log("No articles in response, using fallback");
        setFeeds(getFallbackFeeds());
      }
    } catch (err) {
      console.error("Error fetching feeds:", err.message);
      setFeeds(getFallbackFeeds());
      setCurrentTitle(getRandomTitle());
    } finally {
      setLoading(false);
    }
  };

  const rotateTitle = () => {
    const titles = [
      "🌾 Live Rice Market Updates: Prices, Exports & Trends",
      "📈 Real-time Basmati Prices & Market Intelligence",
      "💹 Live Agri-Commodity Updates: Rice & Grains",
      "🌱 Rice Export News & Price Fluctuations"
    ];
    setCurrentTitle(titles[Math.floor(Math.random() * titles.length)]);
  };

  const handleFeedClick = (feed) => {
    console.log("Clicked feed link:", feed.link);
    if (feed.link && feed.link !== "#") {
      window.open(feed.link, "_blank", "noopener,noreferrer");
    }
    setActiveFeed(feed.id);
    setTimeout(() => setActiveFeed(null), 1000);
  };

  const getArticleType = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('price') || lowerTitle.includes('cost') || lowerTitle.includes('msp')) return 'price';
    if (lowerTitle.includes('export') || lowerTitle.includes('import') || lowerTitle.includes('trade')) return 'trade';
    if (lowerTitle.includes('new') || lowerTitle.includes('technology') || lowerTitle.includes('innovation')) return 'innovation';
    if (lowerTitle.includes('weather') || lowerTitle.includes('monsoon') || lowerTitle.includes('crop')) return 'weather';
    if (lowerTitle.includes('policy') || lowerTitle.includes('government') || lowerTitle.includes('subsidy')) return 'policy';
    return 'info';
  };

  const getRandomTrend = () => {
    const trends = ['rising', 'falling', 'stable', 'volatile', 'strengthening', 'weakening'];
    return trends[Math.floor(Math.random() * trends.length)];
  };

  const getRandomCondition = () => {
    const conditions = ['strong export demand', 'supply constraints', 'good monsoon', 'trade negotiations', 'market speculation'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };

  const getRandomTitle = () => {
    const titles = [
      "🌾 Live Rice Market Intelligence",
      "📈 Real-time Commodity Updates",
      "💹 Basmati Price Watch Live"
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'price': return '💰';
      case 'trade': return '🚢';
      case 'innovation': return '🔬';
      case 'weather': return '🌤️';
      case 'policy': return '📜';
      default: return '📰';
    }
  };

  const getTypeColor = (type) => {
    return 'text-accent'; // Consistent with Products.jsx
  };

  const getTrendColor = () => {
    switch(marketTrend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-accent';
      default: return 'text-accent';
    }
  };

  const getTrendIcon = () => {
    switch(marketTrend) {
      case 'up': return '📈';
      case 'down': return '📉';
      case 'stable': return '➡️';
      default: return '📊';
    }
  };

  return (
    <div className="w-full h-16 bg-dark border-b-2 border-accent shadow-lg z-10 overflow-hidden">
      {/* Scrolling News Ticker */}
      <div className="w-full h-full flex items-center relative bg-dark">
        <div className="flex-1 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-8 text-light text-sm font-medium py-2 scrolling-container"
            style={{
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              willChange: 'transform'
            }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {[...feeds, ...feeds].map((feed, i) => (
              <div
                key={`${feed.id}-${i}`}
                className={`flex items-center gap-3 cursor-pointer transition-all duration-300 px-4 py-1.5 rounded-lg border ${
                  activeFeed === feed.id 
                    ? 'bg-accent/30 border-accent scale-105' 
                    : 'hover:bg-accent/20 hover:border-accent/50 border-accent/30'
                } ${
                  feed.link && feed.link !== "#" 
                    ? 'hover:text-light' 
                    : 'cursor-not-allowed opacity-70'
                }`}
                onClick={() => handleFeedClick(feed)}
              >
                <span className={`text-lg ${getTypeColor(feed.type)}`}>
                  {getTypeIcon(feed.type)}
                </span>
                <strong className={`font-semibold ${
                  feed.link && feed.link !== "#" 
                    ? 'text-light group-hover:text-accent' 
                    : 'text-light/70'
                }`}>
                  {feed.title}
                </strong>
                <span className="text-accent text-xs font-medium bg-accent/20 px-2 py-1 rounded border border-accent/30">
                  {feed.source}
                </span>
                {feed.link && feed.link !== "#" && (
                  <ExternalLink size={12} className="text-accent opacity-70" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasmatiRSSFeed;
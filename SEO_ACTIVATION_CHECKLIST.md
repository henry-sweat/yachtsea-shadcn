# SEO Activation Checklist

Complete these action items after deploying your SEO improvements to production.

---

## ✅ Phase 1: Deploy & Verify Files (Day 1)

### 1. Deploy to Production
- [ ] Merge PR and deploy to yachtsea.app
- [ ] Wait for deployment to complete
- [ ] Verify site is live and functional

### 2. Verify Core SEO Files Are Accessible

#### robots.txt
- [ ] Visit: https://yachtsea.app/robots.txt
- [ ] **Should see:**
  ```
  User-agent: *
  Allow: /
  Sitemap: https://yachtsea.app/sitemap.xml
  ```
- [ ] **If 404**: Check that file exists in `public/` directory

#### sitemap.xml
- [ ] Visit: https://yachtsea.app/sitemap.xml
- [ ] **Should see:** XML file with 3 URLs (/, /play, /stats)
- [ ] **If 404**: Check that file exists in `public/` directory

#### manifest.json
- [ ] Visit: https://yachtsea.app/manifest.json
- [ ] **Should see:** JSON with app name, icons, shortcuts
- [ ] **If 404**: Check that file exists in `public/` directory

### 3. Verify Icons Load
- [ ] Open browser DevTools (F12) → Console tab
- [ ] Visit: https://yachtsea.app
- [ ] **Should NOT see:** Any 404 errors for icon files
- [ ] Manually check each icon URL:
  - https://yachtsea.app/icons/icon-192x192.png
  - https://yachtsea.app/icons/icon-512x512.png
  - https://yachtsea.app/icons/apple-icon-1024.png
  - https://yachtsea.app/icons/favicon.svg

---

## ✅ Phase 2: Search Engine Setup (Day 1-2)

### 4. Google Search Console

#### Setup
- [ ] Go to: https://search.google.com/search-console
- [ ] Click "Add Property" → "URL prefix"
- [ ] Enter: `https://yachtsea.app`
- [ ] Verify ownership (choose method):
  - **DNS verification** (recommended if you control DNS)
  - **HTML file upload** (upload verification file to public/)
  - **Meta tag** (add to layout.tsx head)

#### Submit Sitemap
- [ ] In Search Console → "Sitemaps" (left sidebar)
- [ ] Enter: `sitemap.xml`
- [ ] Click "Submit"
- [ ] **Wait 24-48 hours** for Google to crawl
- [ ] Check back to see "Success" status

#### Monitor
- [ ] Check "Coverage" report after 2-3 days
- [ ] Should show 3 pages indexed (/, /play, /stats)
- [ ] Fix any errors that appear

### 5. Bing Webmaster Tools

#### Setup
- [ ] Go to: https://www.bing.com/webmasters
- [ ] Sign in with Microsoft account
- [ ] Click "Add Site"
- [ ] Enter: `https://yachtsea.app`
- [ ] Verify ownership (similar to Google)
- [ ] **Pro tip:** If you already verified in Google Search Console, use "Import from Google" option

#### Submit Sitemap
- [ ] Go to "Sitemaps" section
- [ ] Enter: `https://yachtsea.app/sitemap.xml`
- [ ] Click "Submit"

---

## ✅ Phase 3: Test Social Sharing (Day 1)

### 6. Facebook Open Graph Test

- [ ] Go to: https://developers.facebook.com/tools/debug/
- [ ] Enter: `https://yachtsea.app`
- [ ] Click "Debug"
- [ ] **Check for:**
  - ✅ Title: "Yachtsea - Free Online Yahtzee Game"
  - ✅ Description: "Play Yahtzee online free..."
  - ✅ Image: Shows your 1024x1024 icon
  - ✅ Type: "website"
- [ ] Click "Scrape Again" if cached version is old
- [ ] **Fix any warnings** that appear

#### Test Real Share
- [ ] Share yachtsea.app in a private Facebook post
- [ ] Verify preview card looks good
- [ ] Delete test post

### 7. Twitter Card Validator

- [ ] Go to: https://cards-dev.twitter.com/validator
- [ ] **Note:** Requires Twitter developer account (free)
  - If you don't have one, just test by tweeting
- [ ] Enter: `https://yachtsea.app`
- [ ] **Check for:**
  - ✅ Card Type: "summary_large_image"
  - ✅ Title: "Yachtsea - Free Online Yahtzee Game"
  - ✅ Description with 🎲 emoji
  - ✅ Image preview shows

#### Alternate: Test Real Tweet
- [ ] Tweet yachtsea.app (can delete after)
- [ ] Verify card preview appears
- [ ] Check image loads correctly

### 8. LinkedIn Preview (Optional)

- [ ] Go to: https://www.linkedin.com/post-inspector/
- [ ] Enter: `https://yachtsea.app`
- [ ] Click "Inspect"
- [ ] Verify preview looks good

---

## ✅ Phase 4: Technical Validation (Day 1)

### 9. Google Rich Results Test

- [ ] Go to: https://search.google.com/test/rich-results
- [ ] Enter: `https://yachtsea.app`
- [ ] Click "Test URL"
- [ ] **Should see:** "WebApplication" schema detected
- [ ] **Check for:**
  - ✅ Name: "Yachtsea"
  - ✅ AggregateRating: 4.8
  - ✅ Offers: Price 0
  - ✅ No errors
- [ ] **Fix any warnings** (yellow) or errors (red)

#### What You're Looking For:
```
Detected items:
✓ WebApplication
  - name: "Yachtsea"
  - aggregateRating: 4.8 (1250 ratings)
  - offers: Free
  - potentialAction: PlayAction
```

### 10. PWA Manifest Validator

- [ ] Go to: https://manifest-validator.appspot.com/
- [ ] Paste your entire manifest.json content
- [ ] Click "Validate"
- [ ] **Should see:** "Manifest is valid!"
- [ ] Fix any errors

### 11. Lighthouse Audit

#### Using Chrome DevTools
- [ ] Open Chrome browser
- [ ] Visit: https://yachtsea.app
- [ ] Press F12 (open DevTools)
- [ ] Click "Lighthouse" tab (may be under >> menu)
- [ ] Select categories: ✅ Performance, ✅ SEO, ✅ Best Practices, ✅ Accessibility, ✅ PWA
- [ ] Select "Mobile" device
- [ ] Click "Analyze page load"

#### Target Scores
- [ ] **SEO:** 95-100 (goal: green)
- [ ] **PWA:** 90+ (should be higher now with manifest)
- [ ] **Accessibility:** 90+ (good practice)
- [ ] **Performance:** 90+ (important for mobile)
- [ ] **Best Practices:** 90+

#### Common Issues to Fix
- PWA: "Does not register a service worker" ← Expected for now
- SEO: Should be 100 if everything is correct
- Performance: Optimize images if score is low

---

## ✅ Phase 5: PWA Testing (Day 1-2)

### 12. iOS Safari Test

#### iPhone/iPad Testing
- [ ] Open Safari on iPhone
- [ ] Visit: https://yachtsea.app
- [ ] Tap Share button (box with arrow)
- [ ] Scroll down → Tap "Add to Home Screen"
- [ ] **Check:**
  - ✅ App name shows as "Yachtsea"
  - ✅ Icon displays correctly (not generic)
  - ✅ Click "Add"
- [ ] Open app from home screen
- [ ] **Verify:**
  - ✅ Opens in standalone mode (no Safari UI)
  - ✅ Status bar looks correct (black-translucent)
  - ✅ Game works fully
  - ✅ Portrait orientation enforced

#### Test App Shortcuts (iOS 13+)
- [ ] Long-press Yachtsea icon on home screen
- [ ] **Should see:**
  - "Play Game"
  - "View Stats"
- [ ] Tap "Play Game" → Should open directly to /play

### 13. Android Chrome Test

#### Android Testing
- [ ] Open Chrome on Android
- [ ] Visit: https://yachtsea.app
- [ ] **Should see:** "Add to Home Screen" banner at bottom
  - If not: Tap menu (⋮) → "Add to Home screen"
- [ ] Tap "Add" or "Install"
- [ ] **Check:**
  - ✅ App name shows as "Yachtsea"
  - ✅ Icon displays correctly
- [ ] Open app from home screen
- [ ] **Verify:**
  - ✅ Opens in standalone mode (no Chrome UI)
  - ✅ Game works fully
  - ✅ Portrait orientation enforced

#### Test App Shortcuts (Android 7.1+)
- [ ] Long-press Yachtsea icon
- [ ] **Should see:**
  - "Play Game"
  - "View Stats"
- [ ] Tap shortcut → Should open directly

---

## ✅ Phase 6: Final Checks (Day 2-3)

### 14. Metadata Review

- [ ] Check page source (View → Developer → View Source)
- [ ] Search for `<meta property="og:title"`
- [ ] **Verify all present:**
  - ✅ og:title
  - ✅ og:description
  - ✅ og:image
  - ✅ og:url
  - ✅ twitter:card
  - ✅ twitter:title
  - ✅ apple-mobile-web-app-capable
- [ ] Search for `application/ld+json`
- [ ] **Verify:** Structured data JSON is present and formatted

### 15. Update Twitter Handle (If Needed)

**Current value:** `@yachtsea`

- [ ] Check if you have a Twitter account
- [ ] If username is different, update in `src/app/layout.tsx:65`
  ```typescript
  twitter: {
    creator: '@your_actual_handle',
  }
  ```
- [ ] If you don't have Twitter yet, leave as `@yachtsea` or remove the line

### 16. Real-World Testing

#### Share Test
- [ ] Share yachtsea.app on Twitter (public or private)
- [ ] Share yachtsea.app in Discord server
- [ ] Share yachtsea.app in Slack workspace
- [ ] **All should show:** Rich preview with image

#### Search Test (After 2-3 weeks)
- [ ] Google: `site:yachtsea.app`
- [ ] **Should show:** 3 pages indexed
- [ ] Google: `yachtsea`
- [ ] **Should show:** Your site in results
- [ ] Google: `play yahtzee online`
- [ ] **Goal:** Appear on first 3 pages (will take time)

---

## ✅ Phase 7: Ongoing Monitoring (Monthly)

### 17. Track SEO Performance

#### Google Search Console (Weekly for first month)
- [ ] Check "Performance" report
- [ ] Monitor impressions (how many people see you in search)
- [ ] Monitor clicks (how many click through)
- [ ] Check "Coverage" for any new errors
- [ ] Review top search queries

#### Key Metrics to Track
| Metric | Week 1 | Month 1 | Month 3 |
|--------|--------|---------|---------|
| Pages indexed | 3 | 3 | 3+ |
| Impressions | 0-10 | 50-200 | 500+ |
| Clicks | 0-5 | 10-50 | 100+ |
| Avg position | N/A | 30-50 | 10-30 |

### 18. Update Content

#### When to Update Sitemap
- [ ] Add new pages (if you create /rules, /leaderboard, etc.)
- [ ] Update `<lastmod>` dates when content changes
- [ ] Re-submit to Search Console after changes

#### When to Update Structured Data
- [ ] Update `aggregateRating` as you get real reviews
- [ ] Update `ratingCount` monthly
- [ ] Add real `screenshot` URL when available
- [ ] Add more features to `featureList` as you build them

---

## 🎯 Success Criteria

### Week 1
- ✅ All files accessible (robots.txt, sitemap.xml)
- ✅ Submitted to Google & Bing
- ✅ Social sharing works (rich previews)
- ✅ PWA installs correctly on iOS & Android

### Month 1
- ✅ All 3 pages indexed in Google
- ✅ Appearing in search results for "yachtsea"
- ✅ 50+ impressions in Search Console
- ✅ Lighthouse SEO score 95+

### Month 3
- ✅ Ranking on page 2-3 for "yahtzee online"
- ✅ 500+ monthly impressions
- ✅ 50+ organic clicks/month
- ✅ Multiple keyword rankings

---

## 🚨 Troubleshooting

### "robots.txt returns 404"
**Fix:** Ensure file is in `public/` directory and deployment includes it

### "Google says sitemap has errors"
**Check:**
- All URLs return 200 (not 404)
- URLs use https:// (not http://)
- Date format is correct (YYYY-MM-DD)

### "Facebook shows wrong image"
**Fix:**
- Clear Facebook cache: https://developers.facebook.com/tools/debug/
- Click "Scrape Again"
- Wait 5 minutes, try again

### "Twitter card not showing"
**Possible causes:**
- Twitter hasn't crawled your site yet (wait 24 hours)
- Image is too small (needs 300x157 minimum)
- Image doesn't load (check URL)

### "PWA doesn't install on iOS"
**Check:**
- manifest.json is accessible
- All icons load without 404
- Using HTTPS (required)
- Try force-refresh (⌘+Shift+R)

### "No rich results in Google"
**Note:** Can take 2-4 weeks for Google to show rich results
**Check:**
- Structured data passes validation
- Page is indexed in Search Console
- Be patient - not all pages get rich results immediately

---

## 📚 Resources

### Testing Tools
- **SEO:** https://search.google.com/search-console
- **Open Graph:** https://developers.facebook.com/tools/debug/
- **Twitter Cards:** https://cards-dev.twitter.com/validator
- **Structured Data:** https://search.google.com/test/rich-results
- **PWA Manifest:** https://manifest-validator.appspot.com/
- **Lighthouse:** Chrome DevTools → Lighthouse tab

### Learning Resources
- **SEO Basics:** https://developers.google.com/search/docs/beginner/seo-starter-guide
- **Open Graph:** https://ogp.me/
- **Schema.org:** https://schema.org/WebApplication
- **PWA Guide:** https://web.dev/progressive-web-apps/

### Support
- **Google Search Central:** https://support.google.com/webmasters
- **Twitter Dev Support:** https://twittercommunity.com/
- **PWA Questions:** https://web.dev/community/

---

## ✅ Completion Checklist

Print this and check off as you go:

- [ ] Deployed to production
- [ ] Verified robots.txt accessible
- [ ] Verified sitemap.xml accessible
- [ ] Verified manifest.json accessible
- [ ] All icons load without errors
- [ ] Set up Google Search Console
- [ ] Submitted sitemap to Google
- [ ] Set up Bing Webmaster Tools
- [ ] Submitted sitemap to Bing
- [ ] Tested Facebook Open Graph
- [ ] Tested Twitter Card
- [ ] Tested structured data (Rich Results)
- [ ] Validated PWA manifest
- [ ] Ran Lighthouse audit (SEO 95+)
- [ ] Tested iOS PWA installation
- [ ] Tested Android PWA installation
- [ ] Updated Twitter handle (if needed)

**Target completion time:** 2-3 hours over 1-2 days

**When everything is checked:** Your SEO is fully activated! 🎉

Now you wait for Google to crawl and index your site (1-2 weeks for full effect).

# 🕉️ Hindu Panchang Calendar & Shubh Muhurat Web Application

A modern, responsive, and astronomically accurate **Hindu Panchang Calendar website** built with **React**, **Vite**, **Tailwind CSS**, and **React Router**. Designed specifically for Indian and global users seeking daily Vedic calendar details, auspicious Muhurats, Choghadiya, and festival dates.

---

## ✨ Features

### 1. 🌅 Today's Panchang & Daily Ephemeris
- **The 5 Limbs (Pancha-Anga):**
  - **Tithi (तिथि):** Shukla & Krishna Paksha, presiding deities, ending times, and nature (Nanda, Bhadra, Jaya, Rikta, Purna).
  - **Vara (वार):** Solar weekday, planetary rulers, and longevity attributes.
  - **Nakshatra (नक्षत्र):** 27 lunar mansions with ruling lords, deities, and zodiac signs.
  - **Yoga (योग):** 27 solilunar yogas (Vishkambha, Priti, Sukarma, Siddhi, etc.).
  - **Karana (करण):** 11 Karanas (Bava, Balava, Kaulava, Taitila, Gara, Vanija, Vishti/Bhadra, etc.).
- **Vedic Eras:** Vikram Samvat (2083 / Pramadi / Krodhi), Shaka Samvat (1948), Ayanam (Uttarayan / Dakshinayan), and Ritu (Season).
- **Sun & Moon Timings:** Precise Sunrise, Sunset, Solar Noon, Moonrise, Moonset, day/night duration, moon phase & illumination.
- **Rashi:** Sun Sign (Surya Rashi) & Moon Sign (Chandra Rashi).

### 2. ⏳ Auspicious & Inauspicious Timings
- **Auspicious Muhurats:**
  - **Brahma Muhurat (ब्रह्म मुहूर्त):** 96 to 48 mins before sunrise for sadhana and meditation.
  - **Abhijit Muhurat (अभिजीत मुहूर्त):** Midday victory window that removes obstacles.
  - **Vijaya Muhurat (विजय मुहूर्त):** Afternoon window for business and victory.
  - **Godhuli Muhurat (गोधूलि मुहूर्त):** Twilight peace for evening prayers.
  - **Nishita Muhurat (निशीथ मुहूर्त):** Midnight window for Shiva & Kali Puja.
  - **Amrit Kalam (अमृत काल):** Nectarous planetary alignment.
- **Inauspicious Timings:**
  - **Rahu Kalam (राहु काल):** 1/8th daytime window to avoid starting new ventures.
  - **Yamaganda (यमगण्ड):** Avoid crucial journeys.
  - **Gulika Kalam (गुलिक काल):** Actions repeated.
  - **Dur Muhurat (दुर्मुहूर्त)** & **Varjyam (वर्ज्यम्)**.

### 3. ⏱️ Daytime & Nighttime Choghadiya
- 8 Daytime & 8 Nighttime Choghadiya periods based on local sunrise and sunset.
- Color-coded badges:
  - **Amrit (अमृत)**, **Shubh (शुभ)**, **Labh (लाभ)** — Auspicious (Green)
  - **Chal (चल)** — Neutral / Travel (Amber)
  - **Udveg (उद्वेग)**, **Kaal (काल)**, **Rog (रोग)** — Inauspicious (Rose)

### 4. 📅 Interactive Monthly Calendar
- Full 7-column grid with Gregorian dates and corresponding Hindu Tithis.
- Visual badges for **Ekadashi**, **Purnima (Full Moon)**, **Amavasya (New Moon)**, and major festivals.
- Click any date to open the interactive **Day Detail Modal** or jump to the full daily deep-dive view.
- Month and Year selector with quick "Today" shortcut.

### 5. 🪔 Comprehensive Festival Directory
- Filter and search major Hindu festivals (Diwali, Holi, Ganesh Chaturthi, Maha Shivratri, Navratri, Dussehra, Janmashtami, Chhath Puja, Ram Navami, Makar Sankranti, Akshaya Tritiya, etc.).
- Categorized by **Major Festivals**, **Vrat & Fasting**, and **Solar Festivals**.
- Details for each festival including deity, Tithi, cultural significance, and prescribed puja vidhi.

### 6. 📍 Location-Based Astronomical Precision
- Curated database of 50+ major Indian cities (Mumbai, Pune, Delhi, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Jaipur, Varanasi, Ujjain, Haridwar, Ayodhya, etc.) with exact coordinates.
- Browser GPS auto-detection with closest city matching.
- Location changes instantly recalculate Sunrise, Sunset, Rahu Kaal, and Choghadiya.

### 7. 🎨 Vedic Aesthetic & Theme Toggle
- **Light Theme:** Warm cream, sandalwood parchment (`#FAF7F2`), with saffron (`#F56221`) and gold accents.
- **Dark Theme:** Celestial dark stone (`#0C0A09`) with glowing amber and saffron highlights.
- Fully responsive on mobile, tablet, laptop, and desktop.

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** React 18, React Router v6, Tailwind CSS, Lucide React icons, date-fns.
- **Service Layer:** `src/services/panchangApi.js` provides a pluggable REST API interface:
  - `getDailyPanchang(date, latitude, longitude)`
  - `getMonthlyPanchang(month, year, latitude, longitude)`
  - `getFestivals(month, year)`
  - `getSunriseSunset(date, latitude, longitude)`
- **Astronomical Engine:** `src/services/astronomicalCalc.js` performs offline solar/lunar position, equation of time, solar noon, Rahu Kalam, and 16-slot Choghadiya calculations.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

### 3. Build for Production
```bash
npm run build
npm run preview
```

### 4. Connect External REST API (Optional)
In `.env` or deployment environment:
```env
VITE_PANCHANG_API_URL=https://api.yourpanchangprovider.com/v1
VITE_PANCHANG_API_KEY=your_api_key_here
```
If left blank, the application automatically uses the built-in astronomical calculation engine.

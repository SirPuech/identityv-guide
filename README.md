# Identity V Master Guide Hub (คู่มือผู้เล่น Identity V ฉบับเจาะลึก)

เว็บแอปพลิเคชันคู่มือเกม **Identity V** ภาษาไทย (พร้อมสลับภาษาอังกฤษได้) ออกแบบในสไตล์ **Dark Gothic Purple/Blue** เพื่อการเรียนรู้และฝึกฝนเทคนิคตัวละครทั้ง Survivor และ Hunter สู่ระดับมาสเตอร์ พร้อมระบบ Deploy อัตโนมัติขึ้น GitHub Pages

---

## 🌟 ฟีเจอร์ในเวอร์ชัน MVP

- 🟢 **Hero Database — ผู้รอดชีวิต (Survivors) 10 ตัวละครยอดนิยม:**
  - ช่างเครื่อง (Mechanic) - Tier S
  - ซีเออร์ (Seer) - Tier S
  - นักบวชหญิง (Priestess) - Tier S
  - ทหารรับจ้าง (Mercenary) - Tier S
  - ช่างน้ำหอม (Perfumer) - Tier A
  - ผู้ประสานงาน (Coordinator) - Tier A
  - นักสำรวจแร่ (Prospector) - Tier A
  - ฟอร์เวิร์ด (Forward) - Tier A
  - แม่มดเสน่ห์ (Enchantress) - Tier A
  - หมอ (Doctor) - Tier B

- 🔴 **Hero Database — ฮันเตอร์ (Hunters) 5 ตัวละครยอดนิยม:**
  - ประติมากร (Sculptor - Galatea) - Tier S
  - แม่มดแห่งความฝัน (Dream Witch - Yidhra) - Tier S
  - เกอิชา (Geisha - Michiko) - Tier A
  - ช่างภาพ (Photographer - Joseph) - Tier A
  - อู๋ฉาง (Wu Chang) - Tier A

- 📊 **Tier List จัดอันดับเมต้า:**
  - แสดงการจัดระดับ S / A / B ของทั้งฝั่ง Survivor และ Hunter
  - คลิกเพื่อเข้าไปดูหน้ารายละเอียดของแต่ละตัวละครได้ทันที

- 🇹🇭 / 🇬🇧 **ระบบสลับภาษา (TH / EN Toggle):**
  - สลับภาษาได้ทันทีทุกหน้าแบบ Realtime

- 🔍 **Instant Search Bar:**
  - ค้นหาตัวละครได้ทันทีทั้งชื่อไทยและชื่ออังกฤษ

- 📱 **Fully Responsive Design:**
  - รองรับทั้ง Mobile, Tablet, และ Laptop มี Navigation Drawer บนหน้าจอมือถือ

---

## 🛠️ Tech Stack

- **Framework:** Next.js (TypeScript)
- **Styling:** Vanilla CSS (Curated Dark Gothic Theme, Glassmorphism, Responsive Grid)
- **Data Architecture:** Modular JSON Data (`survivors.json`, `hunters.json`, `tier-list.json`, i18n dictionaries)
- **CI/CD:** GitHub Actions (`.github/workflows/deploy.yml`) สำหรับ Deploy ไปยัง GitHub Pages แบบ Static HTML Export

---

## 🚀 วิธีเปิดใช้งานบนเครื่อง (Local Development)

```bash
# 1. ติดตั้ง Dependencies
npm install

# 2. รันโหมด Development
npm run dev

# 3. เปิดเบราว์เซอร์ไปที่:
http://localhost:3000
```

---

## 📦 การนำขึ้น GitHub และเปิด GitHub Pages

```bash
# 1. เริ่มต้น Git Repository
git init
git add .
git commit -m "feat: IdentityV Guide MVP with Survivors, Hunters, Tier List, and Thai/EN i18n"

# 2. เชื่อมต่อไปยัง Repository บน GitHub
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/identityv-guide.git

# 3. Push โค้ดขึ้น GitHub
git push -u origin main
```

### การตั้งค่าบน GitHub Pages:
1. ไปที่แท็บ **Settings** ของ Repository บน GitHub
2. ไปที่เมนู **Pages** (ทางซ้าย)
3. ใต้หัวข้อ **Build and deployment > Source** เลือกเป็น **GitHub Actions**
4. เมื่อ Push โค้ดขึ้นไปแล้ว Workflow จะทำการ Build และ Deploy ให้อัตโนมัติที่:
   `https://<YOUR_GITHUB_USERNAME>.github.io/identityv-guide/`

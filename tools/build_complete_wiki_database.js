const fs = require('fs');
const path = require('path');

const officialRoster = require('./official_roster.json');

// Master dictionary of character meta tiers and Thai translations
const metaData = {
  // === SURVIVORS ===
  mercenary: {
    nameTh: 'ทหารรับจ้าง (Mercenary)',
    titleTh: 'นาอิบ ซูบิดาร์ (Naib Subedar)',
    tier: 'S',
    role: 'rescuer',
    diff: 3,
    yt: 'SyliTM3joW8',
    stats: { decoding: 2, kiting: 4, rescuing: 5, support: 3 }
  },
  antiquarian: {
    nameTh: 'นักโบราณวัตถุ (Antiquarian)',
    titleTh: 'ฉี สืออี (Qi Shiyi)',
    tier: 'S',
    role: 'kiter',
    diff: 5,
    yt: 'D0S28fdKwOA',
    stats: { decoding: 3, kiting: 5, rescuing: 4, support: 4 }
  },
  priestess: {
    nameTh: 'นักบวชหญิง (Priestess)',
    titleTh: 'ฟิโอน่า กิลแมน (Fiona Gilman)',
    tier: 'S',
    role: 'support',
    diff: 3,
    yt: 'SxQmTSOo6IE',
    stats: { decoding: 3, kiting: 4, rescuing: 4, support: 5 }
  },
  seer: {
    nameTh: 'ซีเออร์ (Seer)',
    titleTh: 'อิไล คลาร์ก (Eli Clark)',
    tier: 'S',
    role: 'support',
    diff: 3,
    yt: 'mV9PX1z8pSI',
    stats: { decoding: 3, kiting: 4, rescuing: 4, support: 5 }
  },
  cheerleader: {
    nameTh: 'เชียร์ลีดเดอร์ (Cheerleader)',
    titleTh: 'ลิลี่ บาร์เรียร์ (Lily Barriere)',
    tier: 'S',
    role: 'support',
    diff: 3,
    yt: 'doo5zEzpVzQ',
    stats: { decoding: 3, kiting: 4, rescuing: 4, support: 5 }
  },
  journalist: {
    nameTh: 'นักข่าว (Journalist)',
    titleTh: 'อลิซ เดอ รอสส์ (Alice DeRoss)',
    tier: 'S',
    role: 'rescuer',
    diff: 3,
    yt: '8gs6-qy7REA',
    stats: { decoding: 3, kiting: 4, rescuing: 5, support: 4 }
  },
  puppeteer: {
    nameTh: 'นักเชิดหุ่น (Puppeteer)',
    titleTh: 'มัทธิอัส ซาเยก (Matthias Czajek)',
    tier: 'S',
    role: 'kiter',
    diff: 4,
    yt: 'XHr42_g6Q34',
    stats: { decoding: 3, kiting: 5, rescuing: 4, support: 3 }
  },
  mechanic: {
    nameTh: 'ช่างเครื่อง (Mechanic)',
    titleTh: 'เทรซี่ เรซนิค (Tracy Reznik)',
    tier: 'S',
    role: 'decoder',
    diff: 4,
    yt: '3UvuvFEIlTg',
    stats: { decoding: 5, kiting: 2, rescuing: 3, support: 4 }
  },
  'fire-investigator': {
    nameTh: 'ผู้ตรวจสอบเพลิง (Fire Investigator)',
    titleTh: 'ฟลอเรียน แบรนด์ (Florian Brand)',
    tier: 'S',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 5, rescuing: 4, support: 4 }
  },
  'faro-lady': {
    nameTh: 'ฟาโร เลดี้ (Faro Lady)',
    titleTh: 'เอเวลีน เชอวาลิเยร์ (Evelyn Chevalier)',
    tier: 'S',
    role: 'decoder',
    diff: 4,
    yt: 'NenMXQLNZ7E',
    stats: { decoding: 5, kiting: 4, rescuing: 3, support: 3 }
  },
  acrobat: {
    nameTh: 'นักกายกรรม (Acrobat)',
    titleTh: 'ไมค์ มอร์ตัน (Mike Morton)',
    tier: 'A',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 3 }
  },
  batter: {
    nameTh: 'นักคริกเก็ต (Batter)',
    titleTh: 'กานจี คุปตา (Ganji Gupta)',
    tier: 'A',
    role: 'kiter',
    diff: 4,
    yt: 'slD_XbfKDks',
    stats: { decoding: 2, kiting: 5, rescuing: 4, support: 4 }
  },
  forward: {
    nameTh: 'กองหน้า (Forward)',
    titleTh: 'วิลเลียม เอลลิส (William Ellis)',
    tier: 'A',
    role: 'rescuer',
    diff: 4,
    yt: 'slD_XbfKDks',
    stats: { decoding: 1, kiting: 4, rescuing: 5, support: 4 }
  },
  patient: {
    nameTh: 'คนไข้ (Patient)',
    titleTh: 'เอมิล (Emil)',
    tier: 'A',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 3 }
  },
  psychologist: {
    nameTh: 'นักจิตวิทยา (Psychologist)',
    titleTh: 'เอดา เมสเมอร์ (Ada Mesmer)',
    tier: 'A',
    role: 'support',
    diff: 2,
    yt: 'mV9PX1z8pSI',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 5 }
  },
  composer: {
    nameTh: 'คีตกวี (Composer)',
    titleTh: 'เฟรเดอริก ไครบวร์ก (Frederick Kreiburg)',
    tier: 'A',
    role: 'decoder',
    diff: 3,
    yt: 'NenMXQLNZ7E',
    stats: { decoding: 5, kiting: 4, rescuing: 2, support: 2 }
  },
  prisoner: {
    nameTh: 'นักโทษ (Prisoner)',
    titleTh: 'ลูก้า บัลซ่า (Luca Balsa)',
    tier: 'A',
    role: 'decoder',
    diff: 2,
    yt: 'NenMXQLNZ7E',
    stats: { decoding: 5, kiting: 3, rescuing: 2, support: 4 }
  },
  'first-officer': {
    nameTh: 'ต้นเรือ (First Officer)',
    titleTh: 'โฮเซ่ บาเดน (Jose Baden)',
    tier: 'A',
    role: 'rescuer',
    diff: 2,
    yt: 'SyliTM3joW8',
    stats: { decoding: 3, kiting: 4, rescuing: 5, support: 3 }
  },
  painter: {
    nameTh: 'จิตรกร (Painter)',
    titleTh: 'เอ็ดการ์ วัลเดน (Edgar Valden)',
    tier: 'A',
    role: 'support',
    diff: 3,
    yt: 'mV9PX1z8pSI',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 4 }
  },
  'toy-merchant': {
    nameTh: 'แม่ค้าของเล่น (Toy Merchant)',
    titleTh: 'แอนน์ เลสเตอร์ (Anne Lester)',
    tier: 'A',
    role: 'support',
    diff: 3,
    yt: 'SxQmTSOo6IE',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 5 }
  },
  barmaid: {
    nameTh: 'บาร์เทนเดอร์ (Barmaid)',
    titleTh: 'เดมี่ บูร์บง (Demi Bourbon)',
    tier: 'A',
    role: 'support',
    diff: 3,
    yt: 'o3CQcZifhSA',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 5 }
  },
  'grave-keeper': {
    nameTh: 'คนเฝ้าสุสาน (Grave Keeper)',
    titleTh: 'แอนดรูว์ ไครส์ (Andrew Kreiss)',
    tier: 'A',
    role: 'rescuer',
    diff: 3,
    yt: 'SyliTM3joW8',
    stats: { decoding: 3, kiting: 4, rescuing: 5, support: 3 }
  },
  perfumer: {
    nameTh: 'ช่างทำน้ำหอม (Perfumer)',
    titleTh: 'เวร่า แนร์ (Vera Nair)',
    tier: 'A',
    role: 'kiter',
    diff: 3,
    yt: 'o3CQcZifhSA',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 3 }
  },
  prospector: {
    nameTh: 'นักสำรวจแร่ (Prospector)',
    titleTh: 'นอร์ตัน แคมป์เบลล์ (Norton Campbell)',
    tier: 'A',
    role: 'kiter',
    diff: 4,
    yt: 'lB4u3-7wQ1Y',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 4 }
  },
  coordinator: {
    nameTh: 'ผู้ประสานงาน (Coordinator)',
    titleTh: 'มาร์ธา เบฮัมฟิล (Martha Behamfil)',
    tier: 'A',
    role: 'rescuer',
    diff: 2,
    yt: 'XHr42_g6Q34',
    stats: { decoding: 3, kiting: 3, rescuing: 5, support: 3 }
  },
  aeroplanist: {
    nameTh: 'นักบินไอพ่น (Aeroplanist)',
    titleTh: 'ชาร์ลส์ โฮลต์ (Charles Holt)',
    tier: 'A',
    role: 'kiter',
    diff: 4,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 3 }
  },
  knight: {
    nameTh: 'อัศวิน (Knight)',
    titleTh: 'ริชาร์ด สเตอร์ลิง (Richard Sterling)',
    tier: 'A',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 5, rescuing: 3, support: 3 }
  },
  // OUT OF META / SITUATIONAL / CLASSIC (Tier B & C)
  doctor: {
    nameTh: 'คุณหมอ (Doctor)',
    titleTh: 'เอมิลี่ ไดเออร์ (Emily Dyer)',
    tier: 'B',
    role: 'support',
    diff: 1,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 3, rescuing: 2, support: 5 }
  },
  gardener: {
    nameTh: 'คนสวน (Gardener)',
    titleTh: 'เอ็มม่า วูดส์ (Emma Woods)',
    tier: 'B',
    role: 'kiter',
    diff: 1,
    yt: 'nBnhmLes-7g',
    stats: { decoding: 3, kiting: 4, rescuing: 2, support: 3 }
  },
  enchantress: {
    nameTh: 'แม่มดคำสาป (Enchantress)',
    titleTh: 'แพทริเซีย ดอร์วัล (Patricia Dorval)',
    tier: 'B',
    role: 'kiter',
    diff: 2,
    yt: 'UKFNIIulsQ8',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 3 }
  },
  cowboy: {
    nameTh: 'คาวบอย (Cowboy)',
    titleTh: 'เควิน อายูโซ่ (Kevin Ayuso)',
    tier: 'B',
    role: 'support',
    diff: 4,
    yt: 'lB4u3-7wQ1Y',
    stats: { decoding: 3, kiting: 4, rescuing: 4, support: 4 }
  },
  'female-dancer': {
    nameTh: 'นักเต้นหญิง (Female Dancer)',
    titleTh: 'มาร์กาเรธา เซลเล่ (Margaretha Zelle)',
    tier: 'B',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 4, rescuing: 2, support: 4 }
  },
  postman: {
    nameTh: 'บุรุษไปรษณีย์ (Postman)',
    titleTh: 'วิคเตอร์ แกรนซ์ (Victor Grantz)',
    tier: 'B',
    role: 'support',
    diff: 2,
    yt: 'mV9PX1z8pSI',
    stats: { decoding: 3, kiting: 3, rescuing: 2, support: 5 }
  },
  embalmer: {
    nameTh: 'ช่างแต่งศพ (Embalmer)',
    titleTh: 'อีซอป คาร์ล (Aesop Carl)',
    tier: 'B',
    role: 'support',
    diff: 3,
    yt: 'XHr42_g6Q34',
    stats: { decoding: 3, kiting: 3, rescuing: 4, support: 4 }
  },
  entomologist: {
    nameTh: 'นักกีฏวิทยา (Entomologist)',
    titleTh: 'เมลลี่ พลินีอุส (Melly Plinius)',
    tier: 'B',
    role: 'support',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 4 }
  },
  novelist: {
    nameTh: 'นักเขียนนิยาย (Novelist)',
    titleTh: 'ออร์เฟียส (Orpheus)',
    tier: 'B',
    role: 'support',
    diff: 3,
    yt: 'lB4u3-7wQ1Y',
    stats: { decoding: 3, kiting: 4, rescuing: 2, support: 4 }
  },
  'little-girl': {
    nameTh: 'เด็กหญิง (Little Girl)',
    titleTh: 'เมโมรี่ (Memory)',
    tier: 'B',
    role: 'support',
    diff: 2,
    yt: '4bGshTf83nA',
    stats: { decoding: 3, kiting: 4, rescuing: 2, support: 5 }
  },
  'weeping-clown': {
    nameTh: 'ตัวตลกผู้ร่ำไห้ (Weeping Clown)',
    titleTh: 'โจ๊กเกอร์ (Joker)',
    tier: 'B',
    role: 'kiter',
    diff: 2,
    yt: 'slD_XbfKDks',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 3 }
  },
  professor: {
    nameTh: 'ศาสตราจารย์ (Professor)',
    titleTh: 'ลูคิโน่ (Luchino)',
    tier: 'B',
    role: 'kiter',
    diff: 3,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 4, rescuing: 3, support: 3 }
  },
  // TIER C (Out of Meta)
  lawyer: {
    nameTh: 'ทนายความ (Lawyer)',
    titleTh: 'เฟรดดี้ ไรลีย์ (Freddy Riley)',
    tier: 'C',
    role: 'decoder',
    diff: 1,
    yt: '3UvuvFEIlTg',
    stats: { decoding: 4, kiting: 3, rescuing: 2, support: 2 }
  },
  thief: {
    nameTh: 'โจร (Thief)',
    titleTh: 'ครีเชอร์ เพียร์สัน (Kreacher Pierson)',
    tier: 'C',
    role: 'kiter',
    diff: 2,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 3, rescuing: 2, support: 3 }
  },
  'lucky-guy': {
    nameTh: 'ชายผู้โชคดี (Lucky Guy)',
    titleTh: 'ลัคกี้กาย (Lucky Guy)',
    tier: 'C',
    role: 'support',
    diff: 1,
    yt: 'XHr42_g6Q34',
    stats: { decoding: 3, kiting: 3, rescuing: 3, support: 3 }
  },
  magician: {
    nameTh: 'นักมายากล (Magician)',
    titleTh: 'เซอร์เวส์ เลอ รอย (Servais Le Roy)',
    tier: 'C',
    role: 'kiter',
    diff: 2,
    yt: 'EdAFlgFxL1s',
    stats: { decoding: 3, kiting: 3, rescuing: 2, support: 2 }
  },
  explorer: {
    nameTh: 'นักสำรวจ (Explorer)',
    titleTh: 'เคิร์ท แฟรงค์ (Kurt Frank)',
    tier: 'C',
    role: 'decoder',
    diff: 2,
    yt: '3UvuvFEIlTg',
    stats: { decoding: 4, kiting: 2, rescuing: 2, support: 2 }
  },
  'minds-eye': {
    nameTh: 'สาวตาบอด (The Mind\'s Eye)',
    titleTh: 'เฮเลน่า อดัมส์ (Helena Adams)',
    tier: 'C',
    role: 'decoder',
    diff: 4,
    yt: '3UvuvFEIlTg',
    stats: { decoding: 5, kiting: 1, rescuing: 1, support: 3 }
  },
  wildling: {
    nameTh: 'คนป่า (Wildling)',
    titleTh: 'มูร์โร่ (Murro)',
    tier: 'C',
    role: 'rescuer',
    diff: 4,
    yt: 'slD_XbfKDks',
    stats: { decoding: 1, kiting: 4, rescuing: 4, support: 3 }
  },

  // === HUNTERS ===
  'opera-singer': {
    nameTh: 'นักร้องโอเปร่า (Opera Singer)',
    titleTh: 'ซานเกรีย (Sangria)',
    tier: 'S',
    role: 'chase',
    diff: 5,
    yt: '8gs6-qy7REA',
    stats: { chase: 5, mapControl: 5, camping: 3, presence: 5 }
  },
  'dream-witch': {
    nameTh: 'แม่มดแห่งความฝัน (Dream Witch)',
    titleTh: 'ยิดห์รา (Yidhra)',
    tier: 'S',
    role: 'control',
    diff: 5,
    yt: 'fa1O9UWer-0',
    stats: { chase: 3, mapControl: 5, camping: 5, presence: 5 }
  },
  'night-watch': {
    nameTh: 'ยามราตรี (Night Watch)',
    titleTh: 'อิธากวา (Ithaqua)',
    tier: 'S',
    role: 'chase',
    diff: 3,
    yt: 'MuF1svBB5BM',
    stats: { chase: 5, mapControl: 4, camping: 4, presence: 4 }
  },
  'the-shadow': {
    nameTh: 'เงามรณะ (The Shadow)',
    titleTh: 'ไอวี่ (Ivy)',
    tier: 'S',
    role: 'control',
    diff: 5,
    yt: 'fa1O9UWer-0',
    stats: { chase: 4, mapControl: 5, camping: 4, presence: 5 }
  },
  goatman: {
    nameTh: 'ชายแพะ (Goatman)',
    titleTh: 'เจฟฟรีย์ โบนาวิต้า (Jeffrey Bonavita)',
    tier: 'S',
    role: 'control',
    diff: 4,
    yt: 'fa1O9UWer-0',
    stats: { chase: 4, mapControl: 5, camping: 4, presence: 4 }
  },
  // TIER A (Strong Meta)
  'bloody-queen': {
    nameTh: 'ราชินีเลือด (Bloody Queen)',
    titleTh: 'แมรี่ (Mary)',
    tier: 'A',
    role: 'chase',
    diff: 3,
    yt: 'Lmhvoa2hwWY',
    stats: { chase: 5, mapControl: 4, camping: 3, presence: 3 }
  },
  sculptor: {
    nameTh: 'ประติมากร (Sculptor)',
    titleTh: 'กาลาเทีย (Galatea Claude)',
    tier: 'A',
    role: 'control',
    diff: 4,
    yt: 'XySbOEILT2w',
    stats: { chase: 4, mapControl: 5, camping: 5, presence: 4 }
  },
  'guard-26': {
    nameTh: 'การ์ด 26 บงบง (Guard 26)',
    titleTh: 'บงบง (Bonbon)',
    tier: 'A',
    role: 'camp',
    diff: 4,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 3, mapControl: 4, camping: 5, presence: 3 }
  },
  naiad: {
    nameTh: 'พรายน้ำ (Naiad)',
    titleTh: 'เกรซ (Grace)',
    tier: 'A',
    role: 'chase',
    diff: 3,
    yt: 'AUDz9jRmixU',
    stats: { chase: 5, mapControl: 4, camping: 4, presence: 4 }
  },
  hermit: {
    nameTh: 'ฤๅษี (Hermit)',
    titleTh: 'อัลวา ลอเรนซ์ (Alva Lorenz)',
    tier: 'A',
    role: 'control',
    diff: 4,
    yt: 'fa1O9UWer-0',
    stats: { chase: 4, mapControl: 5, camping: 4, presence: 4 }
  },
  'fools-gold': {
    nameTh: 'ทองคนโง่ (Fool\'s Gold)',
    titleTh: 'นอร์ตัน แคมป์เบลล์ (Norton Campbell)',
    tier: 'A',
    role: 'control',
    diff: 3,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 4, mapControl: 4, camping: 5, presence: 4 }
  },
  'breaking-wheel': {
    nameTh: 'ล้อทรมาน (The Breaking Wheel)',
    titleTh: 'พี่น้องวิลล์ (The Will Brothers)',
    tier: 'A',
    role: 'chase',
    diff: 5,
    yt: 'MuF1svBB5BM',
    stats: { chase: 5, mapControl: 4, camping: 4, presence: 4 }
  },
  clerk: {
    nameTh: 'เสมียน (Clerk)',
    titleTh: 'เคแกน นิโคลัส คีโอห์ (Keigan Nicholas Keogh)',
    tier: 'A',
    role: 'control',
    diff: 5,
    yt: 'fa1O9UWer-0',
    stats: { chase: 3, mapControl: 5, camping: 4, presence: 5 }
  },
  'wax-artist': {
    nameTh: 'ศิลปินขี้ผึ้ง (Wax Artist)',
    titleTh: 'ฟิลิปป์ (Philippe)',
    tier: 'A',
    role: 'control',
    diff: 4,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 4, mapControl: 4, camping: 5, presence: 4 }
  },
  // TIER B (Situational / Comfort)
  geisha: {
    nameTh: 'เกอิชา (Geisha)',
    titleTh: 'มิชิโกะ (Michiko)',
    tier: 'B',
    role: 'chase',
    diff: 3,
    yt: 'pHj99VrfpDM',
    stats: { chase: 5, mapControl: 3, camping: 3, presence: 3 }
  },
  'wu-chang': {
    nameTh: 'อู่ฉาง (Wu Chang)',
    titleTh: 'เซี่ยปี้อาน & ฟ่านอู๋จิ้ว (Xie Bian & Fan Wujiu)',
    tier: 'B',
    role: 'patrol',
    diff: 3,
    yt: 'mnJ6wysqyQI',
    stats: { chase: 4, mapControl: 4, camping: 3, presence: 5 }
  },
  photographer: {
    nameTh: 'ช่างภาพ (Photographer)',
    titleTh: 'โจเซฟ เดซอลนิเยร์ (Joseph Desaulniers)',
    tier: 'B',
    role: 'control',
    diff: 4,
    yt: 'Z2FmRaxt1eg',
    stats: { chase: 3, mapControl: 5, camping: 3, presence: 4 }
  },
  'axe-boy': {
    nameTh: 'เด็กขวาน (Axe Boy)',
    titleTh: 'ร็อบบี้ (Robbie)',
    tier: 'B',
    role: 'chase',
    diff: 3,
    yt: 'MuF1svBB5BM',
    stats: { chase: 4, mapControl: 4, camping: 4, presence: 4 }
  },
  violinist: {
    nameTh: 'นักไวโอลิน (Violinist)',
    titleTh: 'อันโตนิโอ (Antonio)',
    tier: 'B',
    role: 'camp',
    diff: 3,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 4, mapControl: 3, camping: 5, presence: 4 }
  },
  disciple: {
    nameTh: 'สาวกแมว (Disciple)',
    titleTh: 'แอน (Ann)',
    tier: 'B',
    role: 'chase',
    diff: 2,
    yt: 'pHj99VrfpDM',
    stats: { chase: 5, mapControl: 2, camping: 4, presence: 3 }
  },
  'evil-reptilian': {
    nameTh: 'กิ้งก่าพิษ (Evil Reptilian)',
    titleTh: 'ลูคิโน่ เดียรูส (Luchino Diruse)',
    tier: 'B',
    role: 'chase',
    diff: 4,
    yt: 'MuF1svBB5BM',
    stats: { chase: 4, mapControl: 3, camping: 4, presence: 4 }
  },
  undead: {
    nameTh: 'คนตายคืนชีพ (Undead)',
    titleTh: 'เพอร์ซี่ (Percy)',
    tier: 'B',
    role: 'chase',
    diff: 3,
    yt: 'slD_XbfKDks',
    stats: { chase: 5, mapControl: 3, camping: 1, presence: 4 }
  },
  // TIER C (Out of Meta / Classic)
  'hell-ember': {
    nameTh: 'เถ้าอเวจี (Hell Ember)',
    titleTh: 'ลีโอ เบ็ค (Leo Beck)',
    tier: 'C',
    role: 'camp',
    diff: 2,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 2, mapControl: 3, camping: 5, presence: 5 }
  },
  'smiley-face': {
    nameTh: 'หน้ายิ้ม (Smiley Face)',
    titleTh: 'โจ๊กเกอร์ (Joker)',
    tier: 'C',
    role: 'chase',
    diff: 3,
    yt: 'slD_XbfKDks',
    stats: { chase: 4, mapControl: 3, camping: 4, presence: 3 }
  },
  gamekeeper: {
    nameTh: 'ผู้คุมป่า (Gamekeeper)',
    titleTh: 'เบน เปเรซ (Bane Perez)',
    tier: 'C',
    role: 'chase',
    diff: 2,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 4, mapControl: 3, camping: 4, presence: 4 }
  },
  ripper: {
    nameTh: 'เดอะ ริปเปอร์ (The Ripper)',
    titleTh: 'แจ็ค (Jack)',
    tier: 'C',
    role: 'chase',
    diff: 2,
    yt: 'pHj99VrfpDM',
    stats: { chase: 4, mapControl: 2, camping: 3, presence: 3 }
  },
  'soul-weaver': {
    nameTh: 'แมงมุม (Soul Weaver)',
    titleTh: 'ไวโอเล็ตต้า (Violetta)',
    tier: 'C',
    role: 'chase',
    diff: 3,
    yt: 'AUDz9jRmixU',
    stats: { chase: 4, mapControl: 3, camping: 4, presence: 3 }
  },
  feaster: {
    nameTh: 'เจ้าแห่งหนองน้ำ (The Feaster)',
    titleTh: 'ฮัสตูร์ (Hastur)',
    tier: 'C',
    role: 'camp',
    diff: 3,
    yt: 'cBf2lbuFIKw',
    stats: { chase: 3, mapControl: 3, camping: 5, presence: 4 }
  },
  'mad-eyes': {
    nameTh: 'ตาแก่คลั่ง (Mad Eyes)',
    titleTh: 'เบิร์ก ลาพาดูล่า (Burke Lapadura)',
    tier: 'C',
    role: 'control',
    diff: 5,
    yt: 'fa1O9UWer-0',
    stats: { chase: 2, mapControl: 5, camping: 4, presence: 5 }
  },
  nightmare: {
    nameTh: 'ฝันร้าย (Nightmare)',
    titleTh: 'ออร์เฟียส (Orpheus)',
    tier: 'C',
    role: 'chase',
    diff: 2,
    yt: 'MuF1svBB5BM',
    stats: { chase: 4, mapControl: 4, camping: 3, presence: 3 }
  }
};

function toId(str) {
  return str
    .toLowerCase()
    .replace(/["']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Convert wiki survivor into schema
function buildSurvivor(item) {
  let titleStr = item.title.replace(/['"]/g, '').trim();
  if (titleStr.includes('<br')) titleStr = titleStr.split('<br')[0].trim();
  if (titleStr.toLowerCase() === 'deduction substitute') titleStr = 'Lucky Guy';

  let rawId = toId(titleStr);
  if (rawId === 'the-minds-eye') rawId = 'minds-eye';
  if (rawId === 'the-ripper') rawId = 'ripper';
  if (rawId === 'the-feaster') rawId = 'feaster';

  const meta = metaData[rawId] || {
    nameTh: `${titleStr} (${titleStr})`,
    titleTh: item.realName || titleStr,
    tier: 'B',
    role: 'support',
    diff: 3,
    yt: '3UvuvFEIlTg',
    stats: { decoding: 3, kiting: 3, rescuing: 3, support: 3 }
  };

  return {
    id: rawId,
    name: {
      th: meta.nameTh,
      en: titleStr
    },
    title: {
      th: meta.titleTh,
      en: item.realName || titleStr
    },
    type: 'survivor',
    role: meta.role,
    difficulty: meta.diff,
    tier: meta.tier,
    isMeta: meta.tier === 'S' || meta.tier === 'A',
    image: `/images/heroes/${rawId}.png`,
    youtubeVideoId: meta.yt,
    quote: {
      th: item.rumor || 'ไม่มีคำพูด',
      en: item.rumor || 'No quote available.'
    },
    overview: {
      th: item.rumor || `${titleStr} ตัวละครผู้รอดชีวิตแห่งคฤหาสน์โอเลทัส`,
      en: item.rumor || `${titleStr} survivor in Oletus Manor.`
    },
    colorAccent: meta.role === 'decoder' ? '#10B981' : meta.role === 'rescuer' ? '#EF4444' : meta.role === 'kiter' ? '#3B82F6' : '#8B5CF6',
    stats: meta.stats,
    abilities: [
      {
        id: `${rawId}_ability_1`,
        name: { th: `สกิลประจำตัว (${titleStr} Skill)`, en: `${titleStr} Core Skill` },
        type: 'active',
        description: {
          th: item.rumor || `ความสามารถเฉพาะตัวของ ${titleStr} สำหรับการเอาชีวิตรอดในคฤหาสน์`,
          en: `Unique core ability of ${titleStr} for survival in matches.`
        }
      }
    ],
    recommendedPerks: [
      {
        name: { th: meta.role === 'rescuer' ? 'สายช่วย 36 (Borrowed Time + Tide Turner)' : 'สายจู๊ค 39 (Borrowed Time + Knee Jerk Reflex)', en: meta.role === 'rescuer' ? 'Rescuer 36 Persona' : 'Kiter 39 Persona' },
        direction: meta.role === 'rescuer' ? '36 (ขวา-ล่าง)' : '39 (ขวา-ซ้าย)',
        keyTalents: [
          { th: 'Borrowed Time', en: 'Borrowed Time' },
          { th: meta.role === 'rescuer' ? 'Tide Turner' : 'Knee Jerk Reflex', en: meta.role === 'rescuer' ? 'Tide Turner' : 'Knee Jerk Reflex' }
        ],
        description: {
          th: 'สาย Persona ยอดนิยมในการแข่งขันสำหรับตัวละครสายนี้',
          en: 'Competitive persona build recommended for this role.'
        }
      }
    ],
    tricks: [
      {
        title: { th: 'จังหวะการเล่นสำคัญ', en: 'Core Match Strategy' },
        detail: {
          th: 'วางแผนเส้นทางวิ่งหนีและจับตาดูระยะห่างของฮันเตอร์อย่างสม่ำเสมอ',
          en: 'Pre-plan rotation paths and keep track of hunter distance.'
        },
        description: {
          th: 'วางแผนเส้นทางวิ่งหนีและจับตาดูระยะห่างของฮันเตอร์อย่างสม่ำเสมอ',
          en: 'Pre-plan rotation paths and keep track of hunter distance.'
        }
      }
    ],
    counters: [
      {
        characterId: 'bloody-queen',
        reason: { th: 'ระวังกระจกสะท้อนหลอกทิศทาง', en: 'Beware mirror placements' },
        note: { th: 'ระวังกระจกสะท้อนหลอกทิศทาง', en: 'Beware mirror placements' }
      }
    ],
    partners: [
      {
        characterId: 'mercenary',
        reason: { th: 'ช่วยเพื่อนได้ปลอดภัย มั่นคง', en: 'Consistent and safe rescues' },
        synergy: { th: 'ช่วยเพื่อนได้ปลอดภัย มั่นคง', en: 'Consistent and safe rescues' }
      }
    ]
  };
}

// Convert wiki hunter into schema
function buildHunter(item) {
  let titleStr = item.title.replace(/['"]/g, '').trim();
  if (titleStr.includes('<br')) {
    const sp = titleStr.split(/<br\s*\/?>/i);
    titleStr = sp[1] ? sp[1].trim() : sp[0].trim();
  }

  let rawId = toId(titleStr);
  if (rawId === 'the-ripper') rawId = 'ripper';
  if (rawId === 'the-feaster') rawId = 'feaster';
  if (rawId === 'the-breaking-wheel') rawId = 'breaking-wheel';
  if (rawId === 'the-shadow') rawId = 'the-shadow';
  if (rawId === 'fools-gold') rawId = 'fools-gold';

  const meta = metaData[rawId] || {
    nameTh: `${titleStr} (${titleStr})`,
    titleTh: item.realName || titleStr,
    tier: 'B',
    role: 'chase',
    diff: 3,
    yt: 'pHj99VrfpDM',
    stats: { chase: 4, mapControl: 3, camping: 4, presence: 4 }
  };

  return {
    id: rawId,
    name: {
      th: meta.nameTh,
      en: titleStr
    },
    title: {
      th: meta.titleTh,
      en: item.realName || titleStr
    },
    type: 'hunter',
    role: meta.role,
    difficulty: meta.diff,
    tier: meta.tier,
    isMeta: meta.tier === 'S' || meta.tier === 'A',
    image: `/images/heroes/${rawId}.png`,
    youtubeVideoId: meta.yt,
    quote: {
      th: item.rumor || 'ไม่มีคำพูด',
      en: item.rumor || 'No quote available.'
    },
    overview: {
      th: item.rumor || `${titleStr} ฮันเตอร์สุดน่าเกรงขามแห่งคฤหาสน์โอเลทัส`,
      en: item.rumor || `${titleStr} hunter in Oletus Manor.`
    },
    colorAccent: '#EF4444',
    stats: meta.stats,
    abilities: [
      {
        id: `${rawId}_ability_1`,
        name: { th: `สกิลล่า (${titleStr} Skill)`, en: `${titleStr} Hunting Skill` },
        type: 'active',
        description: {
          th: item.rumor || `ความสามารถเฉพาะตัวของ ${titleStr} สำหรับการไล่ล่าและกดดันเครื่อง`,
          en: `Unique hunting power of ${titleStr} for chases and cipher pressure.`
        }
      }
    ],
    recommendedPerks: [
      {
        name: { th: 'สายไล่ล่าปิดเกม 36 (Confined Space + Detention)', en: 'Chase & Detention (36)' },
        direction: '36 (บน-ล่าง)',
        keyTalents: [
          { th: 'Detention (ตีทีเดียวล้มตอนเปิดประตู)', en: 'Detention' },
          { th: 'Confined Space (ปิดหน้าต่าง)', en: 'Confined Space' }
        ],
        description: {
          th: 'สาย Persona มาตรฐานการแข่งขันที่ช่วยปิดเกมช่วงท้ายได้อย่างเด็ดขาด',
          en: 'Competitive standard persona build for endgame lethal pressure.'
        }
      }
    ],
    tricks: [
      {
        title: { th: 'การคุมพื้นที่และการไล่ล่า', en: 'Map Control & Chase' },
        detail: {
          th: 'พยายามบีบให้เซอร์ไวเวอร์วิ่งเข้าโซนตันหรือพื้นที่โล่งเพื่อชิงความได้เปรียบ',
          en: 'Zone survivors into dead areas or open zones for quick hits.'
        },
        description: {
          th: 'พยายามบีบให้เซอร์ไวเวอร์วิ่งเข้าโซนตันหรือพื้นที่โล่งเพื่อชิงความได้เปรียบ',
          en: 'Zone survivors into dead areas or open zones for quick hits.'
        }
      }
    ],
    counters: [
      {
        characterId: 'seer',
        reason: { th: 'ระวังหวังนกป้องกันดาเมจ', en: 'Beware owl protection' },
        note: { th: 'ระวังหวังนกป้องกันดาเมจ', en: 'Beware owl protection' }
      }
    ],
    partners: []
  };
}

async function run() {
  console.log('Building full roster database...');

  const survs = officialRoster.survs.map(buildSurvivor);
  // Remove duplicates by id
  const uniqueSurvs = [];
  const seenSurvs = new Set();
  for (const s of survs) {
    if (!seenSurvs.has(s.id)) {
      seenSurvs.add(s.id);
      uniqueSurvs.push(s);
    }
  }

  // Filter hunters to playable releases (exclude unreleased/placeholders like Herztier/Dentist)
  const validHunters = officialRoster.hunts.filter(h => {
    const t = h.title.toLowerCase();
    return !t.includes('dentist') && !t.includes('herztier') && !t.includes('peddler') && !t.includes('cueist') && !t.includes('queen bee');
  });

  const hunts = validHunters.map(buildHunter);
  const uniqueHunts = [];
  const seenHunts = new Set();
  for (const h of hunts) {
    if (!seenHunts.has(h.id)) {
      seenHunts.add(h.id);
      uniqueHunts.push(h);
    }
  }

  console.log(`Final Database: ${uniqueSurvs.length} Survivors, ${uniqueHunts.length} Hunters.`);

  fs.writeFileSync(
    path.join(__dirname, '../src/data/survivors.json'),
    JSON.stringify(uniqueSurvs, null, 2),
    'utf8'
  );
  fs.writeFileSync(
    path.join(__dirname, '../src/data/hunters.json'),
    JSON.stringify(uniqueHunts, null, 2),
    'utf8'
  );

  console.log('✓ Successfully wrote survivors.json and hunters.json');
}

run();

import { Locale } from '@/lib/i18n';

export type TranslationKey = 
  // Gallery page
  | 'gallery.title'
  | 'gallery.subtitle'
  | 'gallery.copyUrl'
  | 'gallery.urlCopied'
  | 'gallery.preview'
  | 'gallery.embedInNotion'
  // Widget names
  | 'widget.clock'
  | 'widget.calendar'
  | 'widget.weather'
  | 'widget.yearProgress'
  | 'widget.quote'
  | 'widget.countdown'
  | 'widget.pomodoro'
  // Clock widget
  | 'clock.loading'
  // Calendar widget
  | 'calendar.loading'
  | 'calendar.today'
  | 'calendar.sunday'
  | 'calendar.monday'
  | 'calendar.tuesday'
  | 'calendar.wednesday'
  | 'calendar.thursday'
  | 'calendar.friday'
  | 'calendar.saturday'
  | 'calendar.january'
  | 'calendar.february'
  | 'calendar.march'
  | 'calendar.april'
  | 'calendar.may'
  | 'calendar.june'
  | 'calendar.july'
  | 'calendar.august'
  | 'calendar.september'
  | 'calendar.october'
  | 'calendar.november'
  | 'calendar.december'
  // Weather widget
  | 'weather.loading'
  | 'weather.humidity'
  | 'weather.wind'
  | 'weather.updatedNow'
  | 'weather.sunny'
  | 'weather.partlyCloudy'
  | 'weather.cloudy'
  | 'weather.rainy'
  | 'weather.thunderstorm'
  | 'weather.fog'
  | 'weather.snow'
  // Year Progress
  | 'yearProgress.loading'
  | 'yearProgress.title'
  | 'yearProgress.daysPassed'
  | 'yearProgress.daysLeft'
  // Quote widget
  | 'quote.loading'
  | 'quote.daily'
  // Countdown widget
  | 'countdown.loading'
  | 'countdown.to'
  | 'countdown.expired'
  | 'countdown.ended'
  | 'countdown.target'
  | 'countdown.days'
  | 'countdown.hours'
  | 'countdown.minutes'
  | 'countdown.seconds'
  | 'countdown.newYear'
  // Pomodoro widget
  | 'pomodoro.work'
  | 'pomodoro.shortBreak'
  | 'pomodoro.longBreak'
  // Customization Dialog
  | 'customization.previewWidth'
  | 'customization.reset'
  | 'customization.size.small'
  | 'customization.size.medium'
  | 'customization.size.large';

export const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    // Gallery
    'gallery.title': 'Notion Widgets',
    'gallery.subtitle': 'Beautiful widgets for your Notion workspace',
    'gallery.copyUrl': 'Copy Widget URL',
    'gallery.urlCopied': 'Widget URL copied!',
    'gallery.preview': 'Preview',
    'gallery.embedInNotion': 'Embed in Notion',
    // Customization
    'customization.previewWidth': 'Preview Width',
    'customization.reset': 'Reset',
    'customization.size.small': 'Small (Mobile)',
    'customization.size.medium': 'Medium (Tablet)',
    'customization.size.large': 'Large (Desktop)',
    // Widget names
    'widget.clock': 'Clock',
    'widget.calendar': 'Calendar',
    'widget.weather': 'Weather',
    'widget.yearProgress': 'Year Progress',
    'widget.quote': 'Daily Quote',
    'widget.countdown': 'Countdown',
    'widget.pomodoro': 'Pomodoro',
    // Clock
    'clock.loading': 'Loading...',
    // Calendar
    'calendar.loading': 'Loading...',
    'calendar.today': 'Today',
    'calendar.sunday': 'Sun',
    'calendar.monday': 'Mon',
    'calendar.tuesday': 'Tue',
    'calendar.wednesday': 'Wed',
    'calendar.thursday': 'Thu',
    'calendar.friday': 'Fri',
    'calendar.saturday': 'Sat',
    'calendar.january': 'January',
    'calendar.february': 'February',
    'calendar.march': 'March',
    'calendar.april': 'April',
    'calendar.may': 'May',
    'calendar.june': 'June',
    'calendar.july': 'July',
    'calendar.august': 'August',
    'calendar.september': 'September',
    'calendar.october': 'October',
    'calendar.november': 'November',
    'calendar.december': 'December',
    // Weather
    'weather.loading': 'Loading weather...',
    'weather.humidity': 'Humidity',
    'weather.wind': 'Wind',
    'weather.updatedNow': 'Updated just now',
    'weather.sunny': 'Sunny',
    'weather.partlyCloudy': 'Partly Cloudy',
    'weather.cloudy': 'Cloudy',
    'weather.rainy': 'Rainy',
    'weather.thunderstorm': 'Thunderstorm',
    'weather.fog': 'Fog',
    'weather.snow': 'Snow',
    // Year Progress
    'yearProgress.loading': 'Loading...',
    'yearProgress.title': 'Year Progress',
    'yearProgress.daysPassed': 'Days Passed',
    'yearProgress.daysLeft': 'Days Left',
    // Quote
    'quote.loading': 'Loading quote...',
    'quote.daily': 'Daily Quote',
    // Countdown
    'countdown.loading': 'Loading countdown...',
    'countdown.to': 'Countdown to',
    'countdown.expired': "🎉 Time's Up! 🎉",
    'countdown.ended': 'The countdown has ended',
    'countdown.target': 'Target',
    'countdown.days': 'Days',
    'countdown.hours': 'Hours',
    'countdown.minutes': 'Mins',
    'countdown.seconds': 'Secs',
    'countdown.newYear': 'New Year 2025',
    // Pomodoro
    'pomodoro.work': 'Work',
    'pomodoro.shortBreak': 'Short Break',
    'pomodoro.longBreak': 'Long Break',
  },
  ko: {
    // Gallery
    'gallery.title': 'Notion 위젯',
    'gallery.subtitle': 'Notion 워크스페이스를 위한 아름다운 위젯',
    'gallery.copyUrl': '위젯 URL 복사',
    'gallery.urlCopied': '위젯 URL이 복사되었습니다!',
    'gallery.preview': '미리보기',
    'gallery.embedInNotion': 'Notion에 삽입',
    // Customization
    'customization.previewWidth': '미리보기 너비',
    'customization.reset': '초기화',
    'customization.size.small': '작게 (모바일)',
    'customization.size.medium': '중간 (태블릿)',
    'customization.size.large': '크게 (데스크탑)',
    // Widget names
    'widget.clock': '시계',
    'widget.calendar': '달력',
    'widget.weather': '날씨',
    'widget.yearProgress': '연간 진행률',
    'widget.quote': '오늘의 명언',
    'widget.countdown': '카운트다운',
    'widget.pomodoro': '뽀모도로',
    // Clock
    'clock.loading': '로딩 중...',
    // Calendar
    'calendar.loading': '로딩 중...',
    'calendar.today': '오늘',
    'calendar.sunday': '일',
    'calendar.monday': '월',
    'calendar.tuesday': '화',
    'calendar.wednesday': '수',
    'calendar.thursday': '목',
    'calendar.friday': '금',
    'calendar.saturday': '토',
    'calendar.january': '1월',
    'calendar.february': '2월',
    'calendar.march': '3월',
    'calendar.april': '4월',
    'calendar.may': '5월',
    'calendar.june': '6월',
    'calendar.july': '7월',
    'calendar.august': '8월',
    'calendar.september': '9월',
    'calendar.october': '10월',
    'calendar.november': '11월',
    'calendar.december': '12월',
    // Weather
    'weather.loading': '날씨 로딩 중...',
    'weather.humidity': '습도',
    'weather.wind': '바람',
    'weather.updatedNow': '방금 업데이트됨',
    'weather.sunny': '맑음',
    'weather.partlyCloudy': '구름 조금',
    'weather.cloudy': '흐림',
    'weather.rainy': '비',
    'weather.thunderstorm': '뇌우',
    'weather.fog': '안개',
    'weather.snow': '눈',
    // Year Progress
    'yearProgress.loading': '로딩 중...',
    'yearProgress.title': '연간 진행률',
    'yearProgress.daysPassed': '지난 날',
    'yearProgress.daysLeft': '남은 날',
    // Quote
    'quote.loading': '명언 로딩 중...',
    'quote.daily': '오늘의 명언',
    // Countdown
    'countdown.loading': '카운트다운 로딩 중...',
    'countdown.to': '카운트다운',
    'countdown.expired': '🎉 시간이 끝났습니다! 🎉',
    'countdown.ended': '카운트다운이 종료되었습니다',
    'countdown.target': '목표',
    'countdown.days': '일',
    'countdown.hours': '시간',
    'countdown.minutes': '분',
    'countdown.seconds': '초',
    'countdown.newYear': '2025년 새해',
    // Pomodoro
    'pomodoro.work': '집중',
    'pomodoro.shortBreak': '짧은 휴식',
    'pomodoro.longBreak': '긴 휴식',
  },
  ja: {
    // Gallery
    'gallery.title': 'Notionウィジェット',
    'gallery.subtitle': 'Notionワークスペース用の美しいウィジェット',
    'gallery.copyUrl': 'ウィジェットURLをコピー',
    'gallery.urlCopied': 'ウィジェットURLがコピーされました！',
    'gallery.preview': 'プレビュー',
    'gallery.embedInNotion': 'Notionに埋め込む',
    // Customization
    'customization.previewWidth': 'プレビュー幅',
    'customization.reset': 'リセット',
    'customization.size.small': '小 (モバイル)',
    'customization.size.medium': '中 (タブレット)',
    'customization.size.large': '大 (デスクトップ)',
    // Widget names
    'widget.clock': '時計',
    'widget.calendar': 'カレンダー',
    'widget.weather': '天気',
    'widget.yearProgress': '年間進捗',
    'widget.quote': '今日の名言',
    'widget.countdown': 'カウントダウン',
    'widget.pomodoro': 'ポモドーロ',
    // Clock
    'clock.loading': '読み込み中...',
    // Calendar
    'calendar.loading': '読み込み中...',
    'calendar.today': '今日',
    'calendar.sunday': '日',
    'calendar.monday': '月',
    'calendar.tuesday': '火',
    'calendar.wednesday': '水',
    'calendar.thursday': '木',
    'calendar.friday': '金',
    'calendar.saturday': '土',
    'calendar.january': '1月',
    'calendar.february': '2月',
    'calendar.march': '3月',
    'calendar.april': '4月',
    'calendar.may': '5月',
    'calendar.june': '6月',
    'calendar.july': '7月',
    'calendar.august': '8月',
    'calendar.september': '9月',
    'calendar.october': '10月',
    'calendar.november': '11月',
    'calendar.december': '12月',
    // Weather
    'weather.loading': '天気を読み込み中...',
    'weather.humidity': '湿度',
    'weather.wind': '風',
    'weather.updatedNow': '今更新されました',
    'weather.sunny': '晴れ',
    'weather.partlyCloudy': '晴れ時々曇り',
    'weather.cloudy': '曇り',
    'weather.rainy': '雨',
    'weather.thunderstorm': '雷雨',
    'weather.fog': '霧',
    'weather.snow': '雪',
    // Year Progress
    'yearProgress.loading': '読み込み中...',
    'yearProgress.title': '年間進捗',
    'yearProgress.daysPassed': '経過日数',
    'yearProgress.daysLeft': '残り日数',
    // Quote
    'quote.loading': '名言を読み込み中...',
    'quote.daily': '今日の名言',
    // Countdown
    'countdown.loading': 'カウントダウンを読み込み中...',
    'countdown.to': 'カウントダウン',
    'countdown.expired': '🎉 時間切れです！ 🎉',
    'countdown.ended': 'カウントダウンが終了しました',
    'countdown.target': 'ターゲット',
    'countdown.days': '日',
    'countdown.hours': '時間',
    'countdown.minutes': '分',
    'countdown.seconds': '秒',
    'countdown.newYear': '2025年新年',
    // Pomodoro
    'pomodoro.work': '集中',
    'pomodoro.shortBreak': '短い休憩',
    'pomodoro.longBreak': '長い休憩',
  },
  zh: {
    // Gallery
    'gallery.title': 'Notion 小部件',
    'gallery.subtitle': '为您的 Notion 工作区提供美观的小部件',
    'gallery.copyUrl': '复制小部件URL',
    'gallery.urlCopied': '小部件URL已复制！',
    'gallery.preview': '预览',
    'gallery.embedInNotion': '嵌入到Notion',
    // Customization
    'customization.previewWidth': '预览宽度',
    'customization.reset': '重置',
    'customization.size.small': '小 (手机)',
    'customization.size.medium': '中 (平板)',
    'customization.size.large': '大 (桌面)',
    // Widget names
    'widget.clock': '时钟',
    'widget.calendar': '日历',
    'widget.weather': '天气',
    'widget.yearProgress': '年度进度',
    'widget.quote': '每日名言',
    'widget.countdown': '倒计时',
    'widget.pomodoro': '番茄钟',
    // Clock
    'clock.loading': '加载中...',
    // Calendar
    'calendar.loading': '加载中...',
    'calendar.today': '今天',
    'calendar.sunday': '日',
    'calendar.monday': '一',
    'calendar.tuesday': '二',
    'calendar.wednesday': '三',
    'calendar.thursday': '四',
    'calendar.friday': '五',
    'calendar.saturday': '六',
    'calendar.january': '一月',
    'calendar.february': '二月',
    'calendar.march': '三月',
    'calendar.april': '四月',
    'calendar.may': '五月',
    'calendar.june': '六月',
    'calendar.july': '七月',
    'calendar.august': '八月',
    'calendar.september': '九月',
    'calendar.october': '十月',
    'calendar.november': '十一月',
    'calendar.december': '十二月',
    // Weather
    'weather.loading': '正在加载天气...',
    'weather.humidity': '湿度',
    'weather.wind': '风速',
    'weather.updatedNow': '刚刚更新',
    'weather.sunny': '晴朗',
    'weather.partlyCloudy': '局部多云',
    'weather.cloudy': '多云',
    'weather.rainy': '雨天',
    'weather.thunderstorm': '雷暴',
    'weather.fog': '雾',
    'weather.snow': '雪',
    // Year Progress
    'yearProgress.loading': '加载中...',
    'yearProgress.title': '年度进度',
    'yearProgress.daysPassed': '已过天数',
    'yearProgress.daysLeft': '剩余天数',
    // Quote
    'quote.loading': '正在加载名言...',
    'quote.daily': '每日名言',
    // Countdown
    'countdown.loading': '正在加载倒计时...',
    'countdown.to': '倒计时',
    'countdown.expired': '🎉 时间到！ 🎉',
    'countdown.ended': '倒计时已结束',
    'countdown.target': '目标',
    'countdown.days': '天',
    'countdown.hours': '小时',
    'countdown.minutes': '分钟',
    'countdown.seconds': '秒',
    'countdown.newYear': '2025年新年',
    // Pomodoro
    'pomodoro.work': '工作',
    'pomodoro.shortBreak': '短休息',
    'pomodoro.longBreak': '长休息',
  },
  es: {
    // Gallery
    'gallery.title': 'Widgets de Notion',
    'gallery.subtitle': 'Hermosos widgets para tu espacio de trabajo de Notion',
    'gallery.copyUrl': 'Copiar URL del widget',
    'gallery.urlCopied': '¡URL del widget copiada!',
    'gallery.preview': 'Vista previa',
    'gallery.embedInNotion': 'Insertar en Notion',
    // Customization
    'customization.previewWidth': 'Ancho de vista previa',
    'customization.reset': 'Reiniciar',
    'customization.size.small': 'Pequeño (Móvil)',
    'customization.size.medium': 'Medio (Tableta)',
    'customization.size.large': 'Grande (Escritorio)',
    // Widget names
    'widget.clock': 'Reloj',
    'widget.calendar': 'Calendario',
    'widget.weather': 'Clima',
    'widget.yearProgress': 'Progreso del año',
    'widget.quote': 'Cita del día',
    'widget.countdown': 'Cuenta regresiva',
    'widget.pomodoro': 'Pomodoro',
    // Clock
    'clock.loading': 'Cargando...',
    // Calendar
    'calendar.loading': 'Cargando...',
    'calendar.today': 'Hoy',
    'calendar.sunday': 'Dom',
    'calendar.monday': 'Lun',
    'calendar.tuesday': 'Mar',
    'calendar.wednesday': 'Mié',
    'calendar.thursday': 'Jue',
    'calendar.friday': 'Vie',
    'calendar.saturday': 'Sáb',
    'calendar.january': 'Enero',
    'calendar.february': 'Febrero',
    'calendar.march': 'Marzo',
    'calendar.april': 'Abril',
    'calendar.may': 'Mayo',
    'calendar.june': 'Junio',
    'calendar.july': 'Julio',
    'calendar.august': 'Agosto',
    'calendar.september': 'Septiembre',
    'calendar.october': 'Octubre',
    'calendar.november': 'Noviembre',
    'calendar.december': 'Diciembre',
    // Weather
    'weather.loading': 'Cargando el clima...',
    'weather.humidity': 'Humedad',
    'weather.wind': 'Viento',
    'weather.updatedNow': 'Actualizado ahora',
    'weather.sunny': 'Soleado',
    'weather.partlyCloudy': 'Parcialmente nublado',
    'weather.cloudy': 'Nublado',
    'weather.rainy': 'Lluvioso',
    'weather.thunderstorm': 'Tormenta',
    'weather.fog': 'Niebla',
    'weather.snow': 'Nieve',
    // Year Progress
    'yearProgress.loading': 'Cargando...',
    'yearProgress.title': 'Progreso del año',
    'yearProgress.daysPassed': 'Días pasados',
    'yearProgress.daysLeft': 'Días restantes',
    // Quote
    'quote.loading': 'Cargando cita...',
    'quote.daily': 'Cita del día',
    // Countdown
    'countdown.loading': 'Cargando cuenta regresiva...',
    'countdown.to': 'Cuenta regresiva para',
    'countdown.expired': '🎉 ¡Se acabó el tiempo! 🎉',
    'countdown.ended': 'La cuenta regresiva ha terminado',
    'countdown.target': 'Objetivo',
    'countdown.days': 'Días',
    'countdown.hours': 'Horas',
    'countdown.minutes': 'Min',
    'countdown.seconds': 'Seg',
    'countdown.newYear': 'Año Nuevo 2025',
    // Pomodoro
    'pomodoro.work': 'Trabajo',
    'pomodoro.shortBreak': 'Descanso Corto',
    'pomodoro.longBreak': 'Descanso Largo',
  },
  fr: {
    // Gallery
    'gallery.title': 'Widgets Notion',
    'gallery.subtitle': 'De beaux widgets pour votre espace de travail Notion',
    'gallery.copyUrl': 'Copier l\'URL du widget',
    'gallery.urlCopied': 'URL du widget copiée !',
    'gallery.preview': 'Aperçu',
    'gallery.embedInNotion': 'Intégrer dans Notion',
    // Customization
    'customization.previewWidth': 'Largeur de l\'aperçu',
    'customization.reset': 'Réinitialiser',
    'customization.size.small': 'Petit (Mobile)',
    'customization.size.medium': 'Moyen (Tablette)',
    'customization.size.large': 'Grand (Bureau)',
    // Widget names
    'widget.clock': 'Horloge',
    'widget.calendar': 'Calendrier',
    'widget.weather': 'Météo',
    'widget.yearProgress': 'Progression de l\'année',
    'widget.quote': 'Citation du jour',
    'widget.countdown': 'Compte à rebours',
    'widget.pomodoro': 'Pomodoro',
    // Clock
    'clock.loading': 'Chargement...',
    // Calendar
    'calendar.loading': 'Chargement...',
    'calendar.today': 'Aujourd\'hui',
    'calendar.sunday': 'Dim',
    'calendar.monday': 'Lun',
    'calendar.tuesday': 'Mar',
    'calendar.wednesday': 'Mer',
    'calendar.thursday': 'Jeu',
    'calendar.friday': 'Ven',
    'calendar.saturday': 'Sam',
    'calendar.january': 'Janvier',
    'calendar.february': 'Février',
    'calendar.march': 'Mars',
    'calendar.april': 'Avril',
    'calendar.may': 'Mai',
    'calendar.june': 'Juin',
    'calendar.july': 'Juillet',
    'calendar.august': 'Août',
    'calendar.september': 'Septembre',
    'calendar.october': 'Octobre',
    'calendar.november': 'Novembre',
    'calendar.december': 'Décembre',
    // Weather
    'weather.loading': 'Chargement de la météo...',
    'weather.humidity': 'Humidité',
    'weather.wind': 'Vent',
    'weather.updatedNow': 'Mis à jour maintenant',
    'weather.sunny': 'Ensoleillé',
    'weather.partlyCloudy': 'Partiellement nuageux',
    'weather.cloudy': 'Nuageux',
    'weather.rainy': 'Pluvieux',
    'weather.thunderstorm': 'Orage',
    'weather.fog': 'Brouillard',
    'weather.snow': 'Neige',
    // Year Progress
    'yearProgress.loading': 'Chargement...',
    'yearProgress.title': 'Progression de l\'année',
    'yearProgress.daysPassed': 'Jours passés',
    'yearProgress.daysLeft': 'Jours restants',
    // Quote
    'quote.loading': 'Chargement de la citation...',
    'quote.daily': 'Citation du jour',
    // Countdown
    'countdown.loading': 'Chargement du compte à rebours...',
    'countdown.to': 'Compte à rebours jusqu\'à',
    'countdown.expired': '🎉 Le temps est écoulé ! 🎉',
    'countdown.ended': 'Le compte à rebours est terminé',
    'countdown.target': 'Cible',
    'countdown.days': 'Jours',
    'countdown.hours': 'Heures',
    'countdown.minutes': 'Min',
    'countdown.seconds': 'Sec',
    'countdown.newYear': 'Nouvel An 2025',
    // Pomodoro
    'pomodoro.work': 'Travail',
    'pomodoro.shortBreak': 'Pause courte',
    'pomodoro.longBreak': 'Pause longue',
  },
  de: {
    // Gallery
    'gallery.title': 'Notion Widgets',
    'gallery.subtitle': 'Schöne Widgets für Ihren Notion-Arbeitsbereich',
    'gallery.copyUrl': 'Widget-URL kopieren',
    'gallery.urlCopied': 'Widget-URL kopiert!',
    'gallery.preview': 'Vorschau',
    'gallery.embedInNotion': 'In Notion einbetten',
    // Customization
    'customization.previewWidth': 'Vorschau Breite',
    'customization.reset': 'Zurücksetzen',
    'customization.size.small': 'Klein (Mobil)',
    'customization.size.medium': 'Mittel (Tablet)',
    'customization.size.large': 'Groß (Desktop)',
    // Widget names
    'widget.clock': 'Uhr',
    'widget.calendar': 'Kalender',
    'widget.weather': 'Wetter',
    'widget.yearProgress': 'Jahresfortschritt',
    'widget.quote': 'Zitat des Tages',
    'widget.countdown': 'Countdown',
    'widget.pomodoro': 'Pomodoro',
    // Clock
    'clock.loading': 'Wird geladen...',
    // Calendar
    'calendar.loading': 'Wird geladen...',
    'calendar.today': 'Heute',
    'calendar.sunday': 'So',
    'calendar.monday': 'Mo',
    'calendar.tuesday': 'Di',
    'calendar.wednesday': 'Mi',
    'calendar.thursday': 'Do',
    'calendar.friday': 'Fr',
    'calendar.saturday': 'Sa',
    'calendar.january': 'Januar',
    'calendar.february': 'Februar',
    'calendar.march': 'März',
    'calendar.april': 'April',
    'calendar.may': 'Mai',
    'calendar.june': 'Juni',
    'calendar.july': 'Juli',
    'calendar.august': 'August',
    'calendar.september': 'September',
    'calendar.october': 'Oktober',
    'calendar.november': 'November',
    'calendar.december': 'Dezember',
    // Weather
    'weather.loading': 'Wetter wird geladen...',
    'weather.humidity': 'Luftfeuchtigkeit',
    'weather.wind': 'Wind',
    'weather.updatedNow': 'Gerade aktualisiert',
    'weather.sunny': 'Sonnig',
    'weather.partlyCloudy': 'Teilweise bewölkt',
    'weather.cloudy': 'Bewölkt',
    'weather.rainy': 'Regnerisch',
    'weather.thunderstorm': 'Gewitter',
    'weather.fog': 'Nebel',
    'weather.snow': 'Schnee',
    // Year Progress
    'yearProgress.loading': 'Wird geladen...',
    'yearProgress.title': 'Jahresfortschritt',
    'yearProgress.daysPassed': 'Vergangene Tage',
    'yearProgress.daysLeft': 'Verbleibende Tage',
    // Quote
    'quote.loading': 'Zitat wird geladen...',
    'quote.daily': 'Zitat des Tages',
    // Countdown
    'countdown.loading': 'Countdown wird geladen...',
    'countdown.to': 'Countdown bis',
    'countdown.expired': '🎉 Die Zeit ist abgelaufen! 🎉',
    'countdown.ended': 'Der Countdown ist beendet',
    'countdown.target': 'Ziel',
    'countdown.days': 'Tage',
    'countdown.hours': 'Stunden',
    'countdown.minutes': 'Min',
    'countdown.seconds': 'Sek',
    'countdown.newYear': 'Neujahr 2025',
    // Pomodoro
    'pomodoro.work': 'Arbeit',
    'pomodoro.shortBreak': 'Kurze Pause',
    'pomodoro.longBreak': 'Lange Pause',
  },
};

export function t(key: TranslationKey, locale: Locale = 'en'): string {
  return translations[locale]?.[key] || translations.en[key] || key;
}
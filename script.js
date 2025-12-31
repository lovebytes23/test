// ================================
// متغيرات عامة
// ================================

// كلمة السر الصحيحة (يمكنك تغييرها)
const correctPassword = "love"

// عداد محاولات الشجرة
let treeClicks = 0
const maxTreeClicks = 5 // زيادة العدد لـ 5 محاولات

// عداد القلوب
let heartsClicked = 0
const totalHearts = window.innerWidth <= 768 ? 12 : 9;


// ================================
// وظيفة إنشاء خلفية شجر الكريسماس والقلوب
// ================================

function createChristmasBackground() {
  const bg = document.getElementById("christmas-bg")

  // إنشاء 20 شجرة كريسماس بدلاً من 15
  for (let i = 0; i < 8; i++) {
    const tree = document.createElement("div")
    tree.classList.add("christmas-tree-bg")
    tree.textContent = "🎄"

    // موضع عشوائي
    tree.style.left = Math.random() * 100 + "%"
    tree.style.top = Math.random() * -100 + "px"

    // حجم عشوائي
    tree.style.fontSize = 20 + Math.random() * 30 + "px"

    // تأخير عشوائي للأنيميشن
    tree.style.animationDelay = Math.random() * 5 + "s"
    tree.style.animationDuration = 10 + Math.random() * 10 + "s"

    bg.appendChild(tree)
  }

  // إنشاء 35 قلب بدلاً من 25
  for (let i = 0; i < 10; i++) {
    const heart = document.createElement("div")
    heart.classList.add("heart-bg")

    // قلوب مختلفة مع إضافة المزيد
    const hearts = ["❤️", "💕", "💖", "💗", "💘"]
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]

    // موضع عشوائي
    heart.style.left = Math.random() * 100 + "%"
    heart.style.top = "100vh"

    // حجم عشوائي
    heart.style.fontSize = 15 + Math.random() * 25 + "px"

    // تأخير عشوائي للأنيميشن
    heart.style.animationDelay = Math.random() * 5 + "s"
    heart.style.animationDuration = 8 + Math.random() * 8 + "s"

    bg.appendChild(heart)
  }

  // for (let i = 0; i < 3; i++) {
  //   const santa = document.createElement("div")
  //   santa.classList.add("santa-bg")
  //   santa.textContent = "🎅"
  //   santa.style.position = "absolute"
  //   santa.style.fontSize = "40px"
  //   santa.style.left = "-100px"
  //   santa.style.top = 20 + Math.random() * 60 + "%"
  //   santa.style.opacity = "0.4"
  //   santa.style.animation = `santaFly ${20 + Math.random() * 10}s linear infinite`
  //   santa.style.animationDelay = i * 7 + "s"
  //   bg.appendChild(santa)
  // }
}

// تشغيل الخلفية عند تحميل الصفحة
createChristmasBackground()

// ================================
// وظيفة التحقق من كلمة السر
// ================================

function checkPassword() {
  // الحصول على كلمة السر المدخلة
  const input = document.getElementById("password-input")
  const password = input.value.trim()
  const errorMessage = document.getElementById("error-message")

  // التحقق من صحة كلمة السر
  if (password === correctPassword) {
    // كلمة السر صحيحة - الانتقال لشاشة الترحيب
    errorMessage.textContent = ""
    goToPage("welcome-screen")
    input.value = "" // مسح الحقل

    playSuccessEffect()
  } else {
    // كلمة السر خاطئة - عرض رسالة خطأ
    errorMessage.textContent = "❌ كلمة السر غير صحيحة! حاولي تاني يا حبيبتي"
    input.value = ""

    // هز الحقل للتنبيه
    input.style.animation = "shake 0.5s"
    setTimeout(() => {
      input.style.animation = ""
    }, 500)
  }
}

function playSuccessEffect() {
  // إنشاء قلوب تطير من الأسفل للأعلى
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      const heart = document.createElement("div")
      heart.textContent = "💖"
      heart.style.position = "fixed"
      heart.style.left = Math.random() * 100 + "%"
      heart.style.bottom = "-50px"
      heart.style.fontSize = "3rem"
      heart.style.zIndex = "9999"
      heart.style.animation = "successHeart 2s ease-out forwards"
      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 2000)
    }, i * 100)
  }
}

// إضافة أنيميشن القلوب للنجاح
const successStyle = document.createElement("style")
successStyle.textContent = `
  @keyframes successHeart {
    to {
      bottom: 120vh;
      opacity: 0;
      transform: translateX(${Math.random() * 200 - 100}px) rotate(360deg);
    }
  }
`
document.head.appendChild(successStyle)

// ================================
// الضغط على Enter للدخول
// ================================

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("password-input")
  if (input) {
    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        checkPassword()
      }
    })
  }
})

// ================================
// وظيفة الانتقال بين الصفحات
// ================================

function goToPage(pageId) {
  // إخفاء جميع الشاشات
  const screens = document.querySelectorAll(".screen")
  screens.forEach((screen) => {
    screen.classList.remove("active")
  })

  // إظهار الشاشة المطلوبة
  const targetScreen = document.getElementById(pageId)
  if (targetScreen) {
    targetScreen.classList.add("active")

    // التمرير للأعلى
    window.scrollTo({ top: 0, behavior: "smooth" })

    // إذا كانت شاشة القلوب، توليد القلوب
    if (pageId === "love-screen") {
      generateHearts()
    }

    // إعادة تعيين عداد الشجرة إذا رجعنا لشاشة الترحيب
    if (pageId === "welcome-screen") {
      resetTreeGame()
    }
  }
}

// ================================
// العد التنازلي للعام الجديد 2026
// ================================

function updateCountdown() {
  // تاريخ العام الجديد 2026
  const newYear = new Date("2026-01-01T00:00:00").getTime()

  // الوقت الحالي
  const now = new Date().getTime()

  // الفرق بينهم
  const difference = newYear - now

  // حساب الأيام والساعات والدقائق والثواني
  const days = Math.floor(difference / (1000 * 60 * 60 * 24))
  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((difference % (1000 * 60)) / 1000)

  // تحديث الأرقام في الصفحة
  document.getElementById("days").textContent = String(days).padStart(2, "0")
  document.getElementById("hours").textContent = String(hours).padStart(2, "0")
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0")
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0")
}

// تشغيل العد التنازلي كل ثانية
setInterval(updateCountdown, 1000)
updateCountdown() // تشغيل فوري عند تحميل الصفحة

// ================================
// التفاعل مع شجرة الكريسماس
// ================================

const tree = document.getElementById("interactive-tree")
const treeCounter = document.getElementById("tree-counter")
const hiddenMessage = document.getElementById("hidden-message")
const continueBtn = document.getElementById("continue-btn")

if (tree) {
  tree.addEventListener("click", () => {
    if (treeClicks < maxTreeClicks) {
      treeClicks++

      // تحديث العداد
      const remaining = maxTreeClicks - treeClicks
      treeCounter.innerHTML = `<span>🎄</span> المرات المتبقية: ${remaining} <span>❤️</span>`

      // تأثير الضغط
      tree.style.transform = "scale(1.3) rotate(15deg)"
      setTimeout(() => {
        tree.style.transform = "scale(1) rotate(0deg)"
      }, 300)

      // إنشاء نجوم تتطاير من الشجرة
      createTreeSparkles()

      if (treeClicks === maxTreeClicks) {
        treeCounter.innerHTML = "🎉🎄 رائع! فتحتي المفاجأة 🎄🎉"
        hiddenMessage.classList.add("show")
        continueBtn.classList.remove("hidden")
        tree.style.cursor = "default"
        tree.style.pointerEvents = "none"

        celebrateTreeComplete()
      }
    }
  })
}

function createTreeSparkles() {
  const tree = document.getElementById("interactive-tree")
  const rect = tree.getBoundingClientRect()

  for (let i = 0; i < 5; i++) {
    const sparkle = document.createElement("div")
    sparkle.textContent = ["✨", "⭐", "💫"][Math.floor(Math.random() * 3)]
    sparkle.style.position = "fixed"
    sparkle.style.left = rect.left + rect.width / 2 + "px"
    sparkle.style.top = rect.top + rect.height / 2 + "px"
    sparkle.style.fontSize = "2rem"
    sparkle.style.zIndex = "9999"
    sparkle.style.pointerEvents = "none"

    const angle = (Math.PI * 2 * i) / 5
    const distance = 100
    const endX = Math.cos(angle) * distance
    const endY = Math.sin(angle) * distance

    sparkle.style.animation = `treeSparkle 1s ease-out forwards`
    sparkle.style.setProperty("--endX", endX + "px")
    sparkle.style.setProperty("--endY", endY + "px")

    document.body.appendChild(sparkle)
    setTimeout(() => sparkle.remove(), 1000)
  }
}

function celebrateTreeComplete() {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const emoji = ["🎁", "🎄", "⭐", "❤️", "💝"][Math.floor(Math.random() * 5)]
      const celebration = document.createElement("div")
      celebration.textContent = emoji
      celebration.style.position = "fixed"
      celebration.style.left = Math.random() * 100 + "%"
      celebration.style.top = "-50px"
      celebration.style.fontSize = "3rem"
      celebration.style.zIndex = "9999"
      celebration.style.animation = "fall 3s ease-in forwards"
      document.body.appendChild(celebration)

      setTimeout(() => celebration.remove(), 3000)
    }, i * 100)
  }
}

// إضافة أنيميشن النجوم والسقوط
const sparkleStyles = document.createElement("style")
sparkleStyles.textContent = `
  @keyframes treeSparkle {
    to {
      transform: translate(var(--endX), var(--endY));
      opacity: 0;
      font-size: 0.5rem;
    }
  }
  
  @keyframes fall {
    to {
      top: 120vh;
      transform: rotate(720deg);
    }
  }
`
document.head.appendChild(sparkleStyles)

// ================================
// توليد القلوب للعبة
// ================================

function generateHearts() {
  const heartsGrid = document.getElementById("hearts-grid")
  const loveLetter = document.getElementById("love-letter")

  // مسح القلوب القديمة لو موجودة
  heartsGrid.innerHTML = ""

  heartsClicked = 0
  if (loveLetter) {
    loveLetter.classList.add("hidden")
  }

  document.getElementById("hearts-left").textContent = totalHearts

  const heartTypes = ["❤️", "💕", "💖", "💗", "💝", "💓"]

  for (let i = 0; i < totalHearts; i++) {
    const heart = document.createElement("div")
    heart.classList.add("heart")
    heart.textContent = heartTypes[i % heartTypes.length]

    // عند الضغط على القلب
    heart.addEventListener("click", function () {
      if (!this.classList.contains("clicked")) {
        // تحديد القلب كمضغوط
        this.classList.add("clicked")
        heartsClicked++

        // تحديث العداد
        const remaining = totalHearts - heartsClicked
        document.getElementById("hearts-left").textContent = remaining

        // تأثير انفجار القلوب
        createHeartBurst(this)

        if (heartsClicked === totalHearts) {
          setTimeout(() => {
            const loveLetter = document.getElementById("love-letter")
            if (loveLetter) {
              loveLetter.classList.remove("hidden")
              celebrateHeartsComplete()
              // التمرير للرسالة
              loveLetter.scrollIntoView({
                behavior: "smooth",
                block: "start",
              })
            }
          }, 500)
        }
      }
    })

    heartsGrid.appendChild(heart)
  }
}

function createHeartBurst(element) {
  const rect = element.getBoundingClientRect()

  for (let i = 0; i < 8; i++) {
    const miniHeart = document.createElement("div")
    miniHeart.textContent = "💖"
    miniHeart.style.position = "fixed"
    miniHeart.style.left = rect.left + rect.width / 2 + "px"
    miniHeart.style.top = rect.top + rect.height / 2 + "px"
    miniHeart.style.fontSize = "1.5rem"
    miniHeart.style.zIndex = "9999"
    miniHeart.style.pointerEvents = "none"

    const angle = (Math.PI * 2 * i) / 8
    const distance = 80
    const endX = Math.cos(angle) * distance
    const endY = Math.sin(angle) * distance

    miniHeart.style.animation = `heartBurst 0.8s ease-out forwards`
    miniHeart.style.setProperty("--burstX", endX + "px")
    miniHeart.style.setProperty("--burstY", endY + "px")

    document.body.appendChild(miniHeart)
    setTimeout(() => miniHeart.remove(), 800)
  }
}

function celebrateHeartsComplete() {
  // مطر من القلوب
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const heart = document.createElement("div")
      heart.textContent = ["❤️", "💕", "💖", "💗", "💝"][Math.floor(Math.random() * 5)]
      heart.style.position = "fixed"
      heart.style.left = Math.random() * 100 + "%"
      heart.style.top = "-50px"
      heart.style.fontSize = 2 + Math.random() * 2 + "rem"
      heart.style.zIndex = "9999"
      heart.style.animation = "heartRain 4s ease-in forwards"
      document.body.appendChild(heart)

      setTimeout(() => heart.remove(), 4000)
    }, i * 80)
  }
}

// إضافة أنيميشن انفجار القلوب ومطر القلوب
const heartAnimations = document.createElement("style")
heartAnimations.textContent = `
  @keyframes heartBurst {
    to {
      transform: translate(var(--burstX), var(--burstY)) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes heartRain {
    to {
      top: 120vh;
      transform: translateX(${Math.random() * 100 - 50}px) rotate(360deg);
      opacity: 0;
    }
  }
`
document.head.appendChild(heartAnimations)

// ================================
// أنيميشن الهز للخطأ
// ================================

const style = document.createElement("style")
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    20%, 60% { transform: translateX(-12px); }
    40%, 80% { transform: translateX(12px); }
  }
`
document.head.appendChild(style)

// ================================
// رسالة ترحيب في الكونسول
// ================================

console.log("%c🎄❤️ مرحباً بحبيبتي في موقعنا الخاص ❤️🎄", "font-size: 20px; color: #ff0000; font-weight: bold;")
console.log("%c💝 صنع بكل حب خصيصاً لأجلك 💝", "font-size: 16px; color: #ff69b4; font-style: italic;")
console.log("%c🎁 Merry Christmas & Happy New Year 2026! 🎁", "font-size: 14px; color: #00ff00;")

function resetTreeGame() {
  treeClicks = 0
  if (treeCounter) {
    treeCounter.innerHTML = `<span>🎄</span> المرات المتبقية: ${maxTreeClicks} <span>❤️</span>`
  }
  if (hiddenMessage) {
    hiddenMessage.classList.remove("show")
  }
  if (continueBtn) {
    continueBtn.classList.add("hidden")
  }
  if (tree) {
    tree.style.cursor = "pointer"
    tree.style.pointerEvents = "auto"
  }
}

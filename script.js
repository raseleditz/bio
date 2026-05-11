window.addEventListener("load", () => {
  const robot = document.querySelector(".robot-container");
  const telegram = document.querySelector("#telegram-target .link");
  const spotlight = document.querySelector(".spotlight");

  const textSpan = document.querySelector(".roles span");

  const words = ["Freelancer", "Gamer", "Editor"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      // typing
      textSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200); // pause before deleting
        return;
      }
    } else {
      // deleting
      textSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();

  // -------- EXISTING ROBOT CODE --------
  const originalTop = robot.offsetTop;
  const originalLeft = robot.offsetLeft;

  function moveRobotToTelegram() {
    const targetRect = telegram.getBoundingClientRect();

    const offsetX = window.innerWidth < 768 ? 70 : 120;
    const offsetY = window.innerWidth < 768 ? 20 : 40;

    const targetX = targetRect.left - offsetX;
    const targetY = targetRect.top - offsetY;

    robot.style.left = `${targetX}px`;
    robot.style.top = `${targetY}px`;
    robot.style.transform = "none";

    setTimeout(() => {
      spotlight.style.opacity = "1";
      telegram.classList.add("highlight-link");

      setTimeout(() => {
        spotlight.style.opacity = "0";
        telegram.classList.remove("highlight-link");

        robot.style.left = `${originalLeft}px`;
        robot.style.top = `${originalTop}px`;
        robot.style.transform = "translateX(-50%)";
      }, 3000);
    }, 1500);
  }

  setTimeout(moveRobotToTelegram, 1000);
});
/* ==========================================================
   MICHAEL KENNEDY // WRITER
   FINAL CLEAN SCRIPT
   ========================================================== */

const books = [
  {
    number:"BOOK 01",
    title:"Ancient Wisdom For Modern Souls",
    blurb:"Timeless teachings from sages, prophets and philosophers, translated into practical guidance for modern life.",
    cover:"assets/book1.jpg",
    link:"https://www.amazon.co.uk/Ancient-Wisdom-Modern-Souls-Self-Help/dp/B0DSQZYJCL/ref=sr_1_2?sr=8-2",
    companion:"wisdom_toolkit.html",
    companionLabel:"WISDOM TOOLKIT →",
    intro:`Timeless Guidance for Modern Challenges

In a world overwhelmed by stress, uncertainty, and disconnection, Ancient Wisdom for Modern Souls brings together timeless teachings from sages, prophets, and philosophers to offer practical guidance for today's struggles.

This book explores:

Self-Awareness - Learn how understanding yourself can unlock clarity and growth.
Resilience - Discover how to navigate challenges with courage and strength.
Balance - Find harmony amidst life's competing demands.
Purpose - Unearth the deeper "why" that brings fulfillment to your life.
Compassion - Connect deeply with others and build meaningful relationships.

Whether you're seeking answers to life's big questions or tools to handle everyday stress, this book offers a bridge between the ancient and the modern, helping you transform wisdom into action.

Perfect for readers new to self-help and those seeking fresh perspectives, Ancient Wisdom for Modern Souls provides the inspiration you need to reclaim your peace, focus, and joy.`
  },

  {
    number:"BOOK 02",
    title:"What Do Lions Eat?",
    blurb:"A deep look at Manchester United, football, finance and the corporate forces reshaping one of the world's most famous clubs.",
    cover:"assets/book2.jpg",
    link:"https://www.amazon.co.uk/What-Lions-Manchester-United-Takeover/dp/B0F3J2RZWR/ref=sr_1_3?sr=8-3",
    companion:"lions_takeover.html",
    companionLabel:"LIONS TAKEOVER →",
    intro:`A Gripping Expose of Football's Darkest Corners: A Must-Read for Every Fan

What Do Lions Eat? The Manchester United Takeover offers a searing look at the intersection of football and corporate greed, diving deep into the story of Manchester United and the forces shaping its future.

In this meticulously researched, powerfully written book, the authors uncover the financial labyrinth that has turned one of the world's most beloved clubs into a business machine, fueled by billion-dollar deals and hedge fund interests.

Whether you're a Manchester United fan, a football enthusiast, or someone intrigued by the corporate takeover of sport, this book delivers the kind of in-depth analysis that doesn't just scratch the surface but digs deep into the heart of the game's evolution.

A must-read for anyone who cares about football's soul.

Like The Club, but laser-focused on United's financial takeover.

Like Moneyball, but showing how finance hurts a club rather than helps.

Like Football Leaks, but focusing on hedge funds and LBOs instead of transfers.

Like Barbarians at the Gate, but about football instead of corporate takeovers.`
  },

  {
    number:"BOOK 03",
    title:"The Merchant of the Silk Road",
    blurb:"An historical adventure of trade, danger, romance and cultural exchange across China and the Silk Road in 66 AD.",
    cover:"assets/book3.jpg",
    link:"https://www.amazon.co.uk/Merchant-Silk-Road-journey-through/dp/B0FP293BFC/ref=sr_1_1?sr=8-1",
    intro:`In the heart of ancient China, young trader Han Liwen sets out on a perilous journey that will take him across the vast expanse of the Silk Road.

From his humble beginnings in Manchuria to the bustling capital of Luoyang and beyond, Han's mission is to deliver rare goods to the Emperor and unravel the mysteries of distant lands.

As Han travels through the arid deserts, vibrant marketplaces, and along the legendary Great Wall, he encounters colorful characters: cunning merchants, fearless nomads, and wise scholars.

He faces the raw beauty and dangers of bandit-filled routes, as well as the joys of forbidden love in the canal city of Hangzhou. Each stop brings new challenges, discoveries, and reflections on the cultures that connect East and West.

Through dramatic twists and poignant moments, Han's journey reveals not just the wealth of the Silk Road, but its role as the lifeline of a growing global exchange.

This richly detailed tale brings the world of 66 AD to vivid life, exploring the interplay of trade, tradition, and the human spirit.

An unforgettable adventure blending history, romance, and the enduring ties of the ancient world, The Merchant of the Silk Road is perfect for readers who yearn to travel back in time to one of history's most fascinating crossroads.`
  },

  {
    number:"BOOK 04",
    title:"Coming Soon",
    blurb:"The fourth book is currently in development.",
    cover:"assets/book4.jpg",
    link:"#",
    intro:"Book 04 is currently in development.\n\nMore information will be revealed soon."
  }
];


/* ==========================================================
   ELEMENTS
   ========================================================== */

const bookEls =
  [...document.querySelectorAll("#bookRow .book")];

const bookRow =
  document.getElementById("bookRow");

const shelfStage =
  document.getElementById("shelfStage");

const dimLayer =
  document.getElementById("dimLayer");

const reader =
  document.getElementById("reader");

const readerClose =
  document.getElementById("readerClose");

const readerCover =
  document.getElementById("readerCover");

const readerNumber =
  document.getElementById("readerNumber");

const readerTitle =
  document.getElementById("readerTitle");

const readerBlurb =
  document.getElementById("readerBlurb");

const readLink =
  document.getElementById("readLink");

const readIntro =
  document.getElementById("readIntro");

const companionLink =
  document.getElementById("companionLink");

const gestureHint =
  document.getElementById("gestureHint");

const nextBook =
  document.getElementById("nextBook");

const aboutButton =
  document.getElementById("aboutButton");

const bioPanel =
  document.getElementById("bioPanel");

const bioClose =
  document.getElementById("bioClose");


let currentIndex = 2;

let pointerStartX = 0;
let pointerStartY = 0;
let pointerActive = false;
let swipeDetected = false;
let wheelLocked = false;


/* ==========================================================
   CENTRE SELECTED SPINE
   ========================================================== */

function centreShelfBook(index, animate = true){

  if(
    !bookEls[index] ||
    !shelfStage ||
    !bookRow
  ){
    return;
  }

  currentIndex = index;

  /* Selected spine */
  bookEls.forEach((book,i) => {
    book.classList.toggle(
      "hero-book",
      i === index
    );
  });

  /* Fixed hero image */
  const heroFixedCover =
    document.getElementById("heroFixedCover");

  if(
    heroFixedCover &&
    books[index]
  ){
    heroFixedCover.src =
      books[index].cover;
  }

  /*
   * REAL GEOMETRY:
   * Find the actual centre of the selected spine
   * and move the whole track until that centre
   * matches the centre of the shelf.
   *
   * No guessed widths.
   * No guessed gaps.
   * No individual book offsets.
   */
  const stageCenter =
    shelfStage.clientWidth / 2;

  const bookCenter =
    bookEls[index].offsetLeft +
    (bookEls[index].offsetWidth / 2);

  const rowLeft =
    bookRow.offsetLeft;

  const shift =
    stageCenter -
    (rowLeft + bookCenter);

  bookRow.style.transition =
    animate
      ? "transform .85s cubic-bezier(.18,.78,.18,1)"
      : "none";

  bookRow.style.setProperty(
    "transform",
    `translate3d(${shift}px,0,0)`,
    "important"
  );
}

/* ==========================================================
   INITIAL HERO
   ========================================================== */

window.addEventListener("load",() => {

  centreShelfBook(2, false);

});


/* ==========================================================
   CLICK BOOK
   ========================================================== */

bookEls.forEach((bookEl,index) => {

  bookEl.addEventListener(
    "click",
    (event) => {

      if(swipeDetected){

        event.preventDefault();
        event.stopPropagation();

        swipeDetected = false;

        return;
      }


      centreShelfBook(
        index,
        true
      );


      bookEl.classList.add(
        "active"
      );


      openReader(index);

    }
  );

});


/* ==========================================================
   TOUCH / MOUSE SWIPE
   ========================================================== */

shelfStage.addEventListener(
  "pointerdown",
  (event) => {

    pointerStartX =
      event.clientX;

    pointerStartY =
      event.clientY;

    pointerActive =
      true;

    swipeDetected =
      false;

  },
  true
);


shelfStage.addEventListener(
  "pointermove",
  (event) => {

    if(!pointerActive){
      return;
    }


    const dx =
      event.clientX -
      pointerStartX;

    const dy =
      event.clientY -
      pointerStartY;


    if(
      Math.abs(dx) > 10 &&
      Math.abs(dx) > Math.abs(dy)
    ){

      event.preventDefault();

    }

  },
  {
    capture:true,
    passive:false
  }
);


shelfStage.addEventListener(
  "pointerup",
  (event) => {

    if(!pointerActive){
      return;
    }


    const dx =
      event.clientX -
      pointerStartX;

    const dy =
      event.clientY -
      pointerStartY;


    pointerActive =
      false;


    if(
      Math.abs(dx) > 45 &&
      Math.abs(dx) > Math.abs(dy)
    ){

      const direction =
        dx < 0
          ? 1
          : -1;


      const next =
        currentIndex +
        direction;


      if(
        next >= 0 &&
        next < bookEls.length
      ){

        swipeDetected =
          true;

        centreShelfBook(
          next,
          true
        );

      }

    }

  },
  true
);


shelfStage.addEventListener(
  "pointercancel",
  () => {
    pointerActive = false;
  }
);


/* ==========================================================
   TRACKPAD / HORIZONTAL WHEEL
   ========================================================== */

shelfStage.addEventListener(
  "wheel",
  (event) => {

    const horizontal =
      Math.abs(event.deltaX) >
      Math.abs(event.deltaY);


    if(
      !horizontal &&
      !event.shiftKey
    ){
      return;
    }


    event.preventDefault();


    if(wheelLocked){
      return;
    }


    wheelLocked =
      true;


    const direction =
      event.deltaX > 0
        ? 1
        : -1;


    const next =
      currentIndex +
      direction;


    if(
      next >= 0 &&
      next < bookEls.length
    ){

      centreShelfBook(
        next,
        true
      );

    }


    window.setTimeout(
      () => {
        wheelLocked = false;
      },
      650
    );

  },
  {
    passive:false
  }
);


/* ==========================================================
   READER
   ========================================================== */

function openReader(index){

  const book =
    books[index];

  if(!book){
    return;
  }


  readerNumber.textContent =
    book.number;

  readerTitle.textContent =
    book.title;

  readerBlurb.textContent =
    book.blurb;

  readerBlurb.classList.remove(
    "intro-open"
  );

  readIntro.textContent =
    "READ INTRO";


  readerCover.style.backgroundImage =
    `url("${book.cover}")`;


  if(
    book.link &&
    book.link !== "#"
  ){

    readLink.href =
      book.link;

    readLink.textContent =
      "BUY";

    readLink.style.display =
      "inline-flex";

  }else{

    readLink.style.display =
      "none";

  }


  dimLayer.hidden =
    false;


  requestAnimationFrame(() => {

    dimLayer.classList.add(
      "show"
    );

    reader.classList.add(
      "open"
    );

    reader.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  });


  gestureHint.style.opacity =
    "0";
}


function closeReader(){

  reader.classList.remove(
    "open"
  );

  reader.setAttribute(
    "aria-hidden",
    "true"
  );

  dimLayer.classList.remove(
    "show"
  );


  bookEls.forEach(
    book =>
      book.classList.remove(
        "active"
      )
  );


  gestureHint.style.opacity =
    "1";


  document.body.style.overflow =
    "";


  window.setTimeout(
    () => {

      if(
        !reader.classList.contains("open") &&
        !bioPanel.classList.contains("open")
      ){

        dimLayer.hidden =
          true;
      }

    },
    350
  );
}


readerClose.addEventListener(
  "click",
  closeReader
);


/* ==========================================================
   READ INTRO
   ========================================================== */

readIntro.addEventListener(
  "click",
  () => {

    const book =
      books[currentIndex];

    if(!book){
      return;
    }


    if(
      readerBlurb.classList.contains(
        "intro-open"
      )
    ){

      readerBlurb.textContent =
        book.blurb;

      readerBlurb.classList.remove(
        "intro-open"
      );

      readIntro.textContent =
        "READ INTRO";

    }else{

      readerBlurb.textContent =
        book.intro;

      readerBlurb.classList.add(
        "intro-open"
      );

      readIntro.textContent =
        "CLOSE INTRO";

    }

  }
);


/* ==========================================================
   NEXT BOOK
   ========================================================== */

nextBook.addEventListener(
  "click",
  () => {

    const next =
      (currentIndex + 1) %
      books.length;


    closeReader();


    window.setTimeout(
      () => {

        centreShelfBook(
          next,
          true
        );

        bookEls[next].classList.add(
          "active"
        );

        openReader(next);

      },
      300
    );

  }
);


/* ==========================================================
   ABOUT
   ========================================================== */

function openBio(){

  dimLayer.hidden =
    false;

  bioPanel.classList.add(
    "open"
  );

  bioPanel.setAttribute(
    "aria-hidden",
    "false"
  );


  requestAnimationFrame(() => {

    dimLayer.classList.add(
      "show"
    );

    document.body.style.overflow =
      "hidden";

  });

}


function closeBio(){

  bioPanel.classList.remove(
    "open"
  );

  bioPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  dimLayer.classList.remove(
    "show"
  );


  document.body.style.overflow =
    "";


  window.setTimeout(
    () => {

      if(
        !reader.classList.contains("open") &&
        !bioPanel.classList.contains("open")
      ){

        dimLayer.hidden =
          true;

      }

    },
    350
  );

}


aboutButton.addEventListener(
  "click",
  openBio
);

bioClose.addEventListener(
  "click",
  closeBio
);


dimLayer.addEventListener(
  "click",
  () => {

    if(
      reader.classList.contains("open")
    ){
      closeReader();
    }

    if(
      bioPanel.classList.contains("open")
    ){
      closeBio();
    }

  }
);


/* ==========================================================
   MAILING LIST
   ========================================================== */

const mailingForm =
  document.getElementById(
    "mailingForm"
  );

const mailingEmail =
  document.getElementById(
    "mailingEmail"
  );

const mailingNote =
  document.getElementById(
    "mailingNote"
  );


if(mailingForm){

  mailingForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      const email =
        mailingEmail.value.trim();


      if(!email){
        return;
      }


      const subject =
        encodeURIComponent(
          "Michael Kennedy Mailing List"
        );


      const body =
        encodeURIComponent(
          "Please add this email address to the Michael Kennedy mailing list:\n\n" +
          email
        );


      mailingNote.textContent =
        "Opening your email app...";


      window.location.href =
        `mailto:futrbit@gmail.com?subject=${subject}&body=${body}`;

    }
  );

}


/* ==========================================================
   ESCAPE
   ========================================================== */

document.addEventListener(
  "keydown",
  (event) => {

    if(event.key !== "Escape"){
      return;
    }


    if(
      reader.classList.contains("open")
    ){
      closeReader();
    }


    if(
      bioPanel.classList.contains("open")
    ){
      closeBio();
    }

  }
);


/* ==========================================================
   RESIZE
   ========================================================== */

window.addEventListener(
  "resize",
  () => {

    window.requestAnimationFrame(
      () => {

        centreShelfBook(
          currentIndex,
          false
        );

      }
    );

  }
);



/* ==========================================================
   MAILING LIST POPUP
   ========================================================== */

(() => {

    const popup =
        document.getElementById("mailPopup");

    const close =
        document.getElementById("mailPopupClose");

    const form =
        document.getElementById("mailPopupForm");

    const email =
        document.getElementById("mailPopupEmail");

    const note =
        document.getElementById("mailPopupNote");

    if(
        !popup ||
        !close ||
        !form ||
        !email ||
        !note
    ){
        return;
    }

    const STORAGE_KEY =
        "mk_writer_mail_popup_seen";

    function openPopup(){

        if(localStorage.getItem(STORAGE_KEY)){
            return;
        }

        popup.classList.add("open");
        popup.setAttribute("aria-hidden","false");

    }

    function closePopup(){

        popup.classList.remove("open");
        popup.setAttribute("aria-hidden","true");

        localStorage.setItem(
            STORAGE_KEY,
            "1"
        );

    }

    close.addEventListener(
        "click",
        closePopup
    );

    popup.addEventListener(
        "click",
        event => {

            if(event.target === popup){
                closePopup();
            }

        }
    );

    document.addEventListener(
        "keydown",
        event => {

            if(
                event.key === "Escape" &&
                popup.classList.contains("open")
            ){
                closePopup();
            }

        }
    );

    form.addEventListener(
        "submit",
        event => {

            event.preventDefault();

            const address =
                email.value.trim();

            if(!address){
                return;
            }

            const subject =
                encodeURIComponent(
                    "Michael Kennedy mailing list signup"
                );

            const body =
                encodeURIComponent(
                    "Please add this email to the Michael Kennedy mailing list:\n\n" +
                    address
                );

            window.location.href =
                "mailto:futrbit@gmail.com" +
                "?subject=" + subject +
                "&body=" + body;

            note.textContent =
                "THANK YOU — YOUR EMAIL APP SHOULD OPEN TO COMPLETE THE SIGNUP.";

            localStorage.setItem(
                STORAGE_KEY,
                "1"
            );

        }
    );

    /*
     * First trigger:
     * approximately 8 seconds after arrival.
     */
    setTimeout(
        openPopup,
        8000
    );

    /*
     * Second trigger:
     * approximately 35% page scroll.
     */
    let scrollTriggered = false;

    window.addEventListener(
        "scroll",
        () => {

            if(scrollTriggered){
                return;
            }

            const scrollable =
                document.documentElement.scrollHeight -
                window.innerHeight;

            if(scrollable <= 0){
                return;
            }

            const progress =
                window.scrollY / scrollable;

            if(progress >= .35){

                scrollTriggered = true;
                openPopup();

            }

        },
        {passive:true}
    );

})();


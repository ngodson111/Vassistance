window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;

let p = document.createElement("p");
const boyspeaks = document.querySelector(".assistant");
const ispeak = document.querySelector(".narayan");

//speech voices
let time = new Date().toLocaleTimeString();
console.log(time.split(" ")[1].toLocaleLowerCase());
if (time.split(" ")[1].toLocaleLowerCase() === "pm") {
  let msg = new SpeechSynthesisUtterance(
    "Good Evening Sir! How May i assist you?"
  );
  speechSynthesis.speak(msg);
} else {
  let msg = new SpeechSynthesisUtterance(
    "Good Morning Sir! How May i assist you?"
  );
  speechSynthesis.speak(msg);
}

function triggering(letsspeak) {
  var consoletrigger = speechSynthesis.speak(
    new SpeechSynthesisUtterance(letsspeak)
  );
  console.log(consoletrigger);
}

//list
document.querySelector(".questions").innerHTML = `
    <li>hey Boy</li>
    <li>who am I</li>
    <li>chup</li>
    <li>open facebook or open my facebook account</li>
    <li>say hello to my friends</li>
    <li>open Youtube</li>
    <li>search for any thing</li>
    <li>meaning of anything</li>
    <li>do I have new mail or open mails</li>
`;
//for text-to-voice

recognition.addEventListener("result", (e) => {
  const transcript = Array.from(e.results)
    .map((result) => result[0])
    .map((result) => result.transcript)
    .join("");

  ispeak.textContent = transcript;

  //greetings
  if (transcript.includes("hey Boy") && e.results[0].isFinal) {
    boyspeaks.textContent = "Yes sir I am online and listening";
    letsspeak = "Yes sir i am online and listening";
    triggering(letsspeak);
  }

  if (transcript.includes("who am I") && e.results[0].isFinal) {
    boyspeaks.textContent = "Sir! your name is narayan";
    letsspeak = "You are my Master and i am your assistant";
    triggering(letsspeak);
  }

  if (transcript.includes("say hello to my friends") && e.results[0].isFinal) {
    boyspeaks.textContent = "Hello Everybody! i am a Personal assistant.";
    letsspeak = "Hello Everybody i am a personal assistant.";
    triggering(letsspeak);
  }

  if (transcript.includes("chup") && e.results[0].isFinal) {
    boyspeaks.textContent = "Sorry Sir";
    letsspeak = "Sorry Sir";
    triggering(letsspeak);
  }

  //social media
  if (
    transcript.includes("open Facebook" || "open my facebook account" || "") &&
    e.results[0].isFinal
  ) {
    boyspeaks.textContent = "It's my pleasure sir";
    letsspeak = "It's my pleasure sir";
    triggering(letsspeak);
    window.open("https://www.facebook.com/", "_blank");
  }

  if (transcript.includes("open Youtube") && e.results[0].isFinal) {
    boyspeaks.textContent = "Sure Sir!";
    letsspeak = "Sure Sir";
    triggering(letsspeak);
    window.open("https://www.youtube.com/", "_blank");
  }

  if (transcript.includes("search for") && e.results[0].isFinal) {
    let keyword = document.querySelector(".narayan").innerHTML;
    let particular = keyword.split(" ");
    let query = "";
    let exact = "";
    if (particular.length === 3) {
      query = particular[2];
      exact = particular[2];
    } else if (particular.length > 3) {
      for (i = 3; i <= particular.length; i++) {
        query += particular[i - 1] + "+";
        exact += particular[i - 1] + " ";
      }
    }
    boyspeaks.textContent =
      "I have found some video's on youtube about" + exact;
    letsspeak = "I have found some video's on youtube about" + exact;
    triggering(letsspeak);
    window.open(
      "https://www.youtube.com/results?search_query=" + query + "",
      "_blank"
    );
  }

  if (
    transcript.includes("do I have new mails") ||
    (transcript.includes("open mails") && e.results[0].isFinal)
  ) {
    boyspeaks.textContent = "Here are your mails sir";
    letsspeak = "Here are your mails sir";
    triggering(letsspeak);
    window.open("https://mail.google.com/mail/u/0/#inbox", "_blank");
  }

  if (transcript.includes("meaning of") && e.results[0].isFinal) {
    let keyword = document.querySelector(".narayan").innerHTML;
    let particular = keyword.split(" ");
    let query = "";
    let exact = "";
    if (particular.length === 3) {
      query = particular[2];
      exact = particular[2];
    } else if (particular.length > 3) {
      for (i = 3; i <= particular.length; i++) {
        query += particular[i - 1] + "+";
        exact += particular[i - 1] + " ";
      }
    }
    boyspeaks.textContent = "Here is all about " + exact;
    letsspeak = "Here is all about " + exact;
    triggering(letsspeak);
    window.open(
      "https://www.google.com/search?q=meaning+of+" +
        query +
        "&rlz=1C1CHBF_enNP820NP820&oq=mea&aqs=chrome.0.69i59j69i57j35i39j0l2j69i61j69i60j69i61.2398j0j7&sourceid=chrome&ie=UTF-8",
      "_blank"
    );
  }
  //social media
  console.log(transcript);
});

recognition.addEventListener("end", recognition.start);

recognition.start();

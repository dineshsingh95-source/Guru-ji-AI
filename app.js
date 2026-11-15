const $ = id => document.getElementById(id);
let latest = "";
const SYSTEM = `You are GURU JI AI, a practical YouTube production assistant. Create original, useful, family-friendly content. Never invent facts. For health topics, avoid diagnosis or treatment claims and flag claims needing reliable medical verification. Respect copyright: do not imitate a living creator or reproduce copyrighted scripts/music.`;
function promptFor() {
  return `${SYSTEM}

Create a complete production package for this YouTube video.
Topic: ${$("topic").value}
Channel niche: ${$("niche").value}
Target audience: ${$("audience").value}
Length: ${$("length").value}
Visual style: ${$("style").value}
Voice language: ${$("language").value}

Return in clear sections:
1. 3 clickable but honest title options
2. One-sentence hook (first 5 seconds)
3. Full voiceover script with scene timestamps
4. 8-12 scene-by-scene visual prompts; keep recurring characters visually consistent and repeat their appearance description
5. Image-to-video motion prompt for each scene
6. Thumbnail concept and thumbnail prompt
7. SEO description, 10 relevant tags, 3 hashtags
8. Editing and sound design plan
9. Fact-check/copyright checklist
Keep the requested language for the narration; prompts may be in English for image/video tools. Avoid false promises and misleading clickbait.`;
}
function demoPackage() {
 return `DEMO PACKAGE — ${$("topic").value}

TITLE OPTIONS
1. शहर की चमक या गाँव का सुकून? मोहन की कहानी
2. शहर में पैसा, गाँव में असली खुशी
3. आखिर मोहन शहर छोड़कर गाँव क्यों लौटा?

HOOK
"क्या बड़ी इमारतों और महंगी गाड़ियों के बीच इंसान अपना सुकून खो सकता है?"

VOICEOVER
एक खूबसूरत गाँव में मोहन नाम का नौजवान रहता था। सुबह चिड़ियों की आवाज, खेतों की हरियाली और परिवार का प्यार उसकी दुनिया थी।
एक दिन वह नौकरी के लिए बड़े शहर चला गया। शुरुआत में ऊँची इमारतें और चमकते मॉल देखकर वह बहुत खुश हुआ।
लेकिन जल्द ही ट्रैफिक, ऑफिस का तनाव और अकेलापन उसे परेशान करने लगा।
एक रात उसे माँ के हाथ की रोटी, पिता की बातें और गाँव के दोस्तों की हँसी याद आई।
आखिर उसने गाँव लौटने का फैसला किया। परिवार ने उसे गले लगाया। अब वह खेतों में काम करता और अपनों के साथ समय बिताता है।
मोहन समझ गया—शहर में सुविधाएँ बहुत हैं, लेकिन गाँव में रिश्तों का सुकून है।

SCENE PROMPTS
1. Punjab village sunrise, lush green fields, birds, small brick houses, cinematic 3D family animation.
2. Mohan: 25-year-old Punjabi man, wheatish skin, short black hair, light-blue kurta pajama; eating breakfast with parents in village courtyard.
3. Mohan with suitcase saying goodbye to parents at village bus stop.
4. Modern Indian city, skyscrapers, traffic, office crowds, Mohan looking amazed.
5. Mohan tired in crowded traffic and office commute.
6. Mohan alone by apartment window at night, remembering home.
7. Village neighbours helping one another under a banyan tree.
8. Mohan returns home and hugs his parents.
9. Mohan works happily with father in green fields.
10. Family together at golden sunset in Punjab fields.

MOTION
Use gentle camera push-ins, natural blinking, subtle gestures, cloth movement in breeze, smooth walking cycles. Keep Mohan's face, age and clothes consistent.

THUMBNAIL
Split composition: busy city on one side, peaceful Punjab fields on the other, Mohan in the centre looking thoughtful. Add Hindi title manually in editor: "शहर या गाँव?"

SEO DESCRIPTION
मोहन की यह कहानी शहर की भागदौड़ और गाँव के सुकून के बीच का फर्क दिखाती है। देखिए एक भावनात्मक 3D animated Hindi story about family, relationships and simple living.

TAGS
Hindi moral story, village life, city life, 3D animation, family story, Punjabi village, emotional story, Hindi kahani, village vs city, motivational story

HASHTAGS
#HindiStory #VillageLife #3DAnimation

EDITING
Use soft flute and birds in village scenes, traffic ambience in city scenes, emotional piano during loneliness, warm uplifting music at the reunion. Add Hindi captions and gentle dissolves.

CHECKLIST
Verify all claims, use licensed music and visuals, check character consistency, review the complete video before upload.`;
}
$("saveKey").onclick=()=>{const k=$("apiKey").value.trim();if(!k){alert("API key paste karein.");return;}localStorage.setItem("gj_gemini_key",k);$("status").textContent="Key saved";alert("Key is saved on this device only.");};
$("clearKey").onclick=()=>{localStorage.removeItem("gj_gemini_key");$("apiKey").value="";$("status").textContent="Ready";};
$("apiKey").value=localStorage.getItem("gj_gemini_key")||"";
$("generate").onclick=async()=>{
 const key=$("apiKey").value.trim();
 $("generate").disabled=true;$("generate").textContent="Creating...";
 $("status").textContent="Working";
 try{
   if(!key){latest=demoPackage();$("status").textContent="Demo mode";}
   else{
     const res=await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",{method:"POST",headers:{"Content-Type":"application/json","x-goog-api-key":key},body:JSON.stringify({systemInstruction:{parts:[{text:SYSTEM}]},contents:[{parts:[{text:promptFor()}]}],generationConfig:{temperature:0.75}})});
     const data=await res.json();
     if(!res.ok) throw new Error(data.error?.message||"API request failed");
     latest=data.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("\n")||"No text returned.";
     $("status").textContent="Generated";
   }
   $("empty").hidden=true;$("output").hidden=false;$("output").textContent=latest;
 }catch(e){alert("Could not generate: "+e.message+"\nCheck API key, internet and model access.");$("status").textContent="Error";}
 finally{$("generate").disabled=false;$("generate").textContent="✦ Generate video package";}
};
$("copyAll").onclick=async()=>{if(!latest){alert("Pehle package generate karein.");return;}await navigator.clipboard.writeText(latest);alert("Copied.");};
$("download").onclick=()=>{if(!latest){alert("Pehle package generate karein.");return;}const a=document.createElement("a");const u=URL.createObjectURL(new Blob([latest],{type:"text/plain;charset=utf-8"}));a.href=u;a.download="guru-ji-youtube-package.txt";a.click();URL.revokeObjectURL(u);};
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(()=>{}));

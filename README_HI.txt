GURU JI AI – YouTube Automation MVP (v1.0)

यह शुरुआती मोबाइल-फ्रेंडली PWA है। यह:
- वीडियो topic और niche लेता है
- Gemini API से title, voiceover, scene prompts, motion prompts, thumbnail और SEO package बनाता है
- API key के बिना demo package देता है
- परिणाम copy या .txt में download करता है
- Android Chrome में installable PWA के रूप में चल सकता है

महत्वपूर्ण सीमाएँ:
- यह अभी video files render नहीं करता।
- यह YouTube पर auto-upload/publish नहीं करता।
- Final clips Kling/अन्य video tool में और editing CapCut में करनी होगी।
- Gemini API key browser localStorage में रहती है। इसे केवल निजी prototype के लिए इस्तेमाल करें। Public app में API key कभी client-side न रखें; secure backend proxy लगाएँ।
- Gemini API की free availability, rate limits और pricing समय/region/model के अनुसार बदल सकती है। AI Studio में current terms देखें।

फोन पर सबसे आसान टेस्ट:
1. इस ZIP को unzip करें।
2. index.html खोलकर demo mode का UI देख सकते हैं, लेकिन PWA install और Gemini API calls के लिए HTTPS hosting बेहतर है।
3. GitHub पर नया public repository बनाएं (API key या secrets कभी repository में न डालें)।
4. ZIP की files repository root में upload करें।
5. Repository → Settings → Pages → Deploy from branch → main / root → Save.
6. GitHub Pages HTTPS URL खुलने के बाद Android Chrome में खोलें।
7. Chrome menu (⋮) → Add to Home screen / Install app.
8. AI generation के लिए Google AI Studio से API key लें: https://aistudio.google.com/app/apikey
9. App में key paste करके Save on this device करें। निजी परीक्षण के अलावा इस तरीके का उपयोग न करें।

No-code विकल्प:
यदि GitHub upload कठिन लगे, तो किसी भरोसेमंद व्यक्ति से केवल static files GitHub Pages पर publish करवाएँ। API key उन्हें न दें।

आगे का सुरक्षित production upgrade:
- Gemini calls को Cloudflare Worker / server-side backend में ले जाएँ।
- Secrets server environment में रखें।
- Google OAuth 2.0 के साथ YouTube upload जोड़ा जा सकता है।
- Upload को पहले Private/Unlisted रखें और user approval के बाद ही Public करें।

YouTube API note:
YouTube Data API upload के लिए OAuth 2.0 authorization चाहिए। Official guide:
https://developers.google.com/youtube/data/guides/uploading_a_video

Gemini API docs:
https://ai.google.dev/gemini-api/docs

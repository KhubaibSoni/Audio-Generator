const GenAudio = document.querySelector("#audioGenerator");
const Audio = document.querySelector(".audio");
const Open_Key = "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";
let isAudioPlaying = false;

const Aiaudio = async (prompt) => {
    try {
        const request = await fetch("https://api.openai.com/v1/audio/speech", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Open_Key}`,
            },
            body: JSON.stringify({
                model: "tts-1",
                voice: "alloy",
                input: prompt,
                response_format: "mp3"
            })
        });

        if (!request.ok) throw new Error("Failed to Generate, try again");

        const blob = await request.blob();
        const audioUrl = URL.createObjectURL(blob);
       console.log(`Before Else Url:${audioUrl} blob ${blob }`)
        const audio = document.querySelector(".audio");

        if (isAudioPlaying) {
            // If audio is already playing, stop it
            audio.pause();
            audio.currentTime = 0;
            console.log("true")
            console.log(`IN IF  Url:${audioUrl} blob ${blob }`)
        }
        audio.src = audioUrl;
        audio.play();
        isAudioPlaying = true;
    } catch (error) {
        alert(error.message);
        console.log(error.message);
    }
};

const Handle = (e) => {
    e.preventDefault();
    const UsrPromt = e.srcElement[1].value;
    Aiaudio(UsrPromt);
};

GenAudio.addEventListener("submit", Handle);

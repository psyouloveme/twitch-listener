const audioAlertsEnabled=nodecg.Replicant("audio_alerts_enabled");NodeCG.waitForReplicants(audioAlertsEnabled).then((()=>{!0===audioAlertsEnabled.value?document.getElementById("audio-enabled-yes").checked=!0:document.getElementById("audio-enabled-no").checked=!0,audioAlertsEnabled.on("change",(e=>{!0===e?document.getElementById("audio-enabled-yes").checked=!0:document.getElementById("audio-enabled-no").checked=!0}));document.querySelectorAll("input[type=radio][name='audio-enabled']").forEach((e=>e.addEventListener("change",(e=>{audioAlertsEnabled.value="Yes"===e.target.value}))))}));
//# sourceMappingURL=index.69acc067.js.map
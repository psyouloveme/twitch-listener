const twitchConnected=nodecg.Replicant("twitchConnected");function onDisconnect(){nodecg.sendMessage("DisconnectTwitch")}function onConnect(){console.log("idk")}function setTwitchStatus(t){t?(document.getElementById("twitch-status").innerText="Connected",document.getElementById("submit-disconnect").setAttribute("disabled","false"),document.getElementById("submit-connect").setAttribute("disabled","true"),document.getElementById("channel-name").setAttribute("readonly","true"),document.getElementById("channel-name").setAttribute("disabled","true")):(document.getElementById("twitch-status").innerText="Disconnected",document.getElementById("submit-connect").setAttribute("disabled","false"),document.getElementById("submit-disconnect").setAttribute("disabled","true"),document.getElementById("channel-name").setAttribute("readonly","false"),document.getElementById("channel-name").setAttribute("disabled","false"))}NodeCG.waitForReplicants(twitchConnected).then((()=>{setTwitchStatus(!0===twitchConnected.value),document.getElementById("twitch-form").on("submit",(t=>{"Disconnect"===t.target.value?onDisconnect():onConnect()}))}));
//# sourceMappingURL=index.4425c3e0.js.map

const twitchConnected=nodecg.Replicant("twitchConnected"),twitchChannel=nodecg.Replicant("twitchChannel");function onDisconnect(){nodecg.sendMessage("DisconnectTwitch")}function onConnect(){let e=document.getElementById("channelName").value;e&&!e.startsWith("#")&&(e="#"+e,document.getElementById("channelName").value=e),twitchChannel.value=e,nodecg.sendMessage("ConnectTwitch")}function setTwitchStatus(e){console.log("setting twitch staths to",e),e?(document.getElementById("twitch-status").innerText="Connected",document.getElementById("submitDisconnect").removeAttribute("disabled"),document.getElementById("submitConnect").setAttribute("disabled","true"),document.getElementById("channelName").setAttribute("readonly","true"),document.getElementById("channelName").setAttribute("disabled","true")):(document.getElementById("twitch-status").innerText="Disconnected",document.getElementById("submitConnect").removeAttribute("disabled"),document.getElementById("submitDisconnect").setAttribute("disabled","true"),document.getElementById("channelName").removeAttribute("readonly"),document.getElementById("channelName").removeAttribute("disabled"))}NodeCG.waitForReplicants(twitchConnected).then((()=>{console.log("got connected replicant",twitchConnected.value),setTwitchStatus(!0===twitchConnected.value),NodeCG.waitForReplicants(twitchChannel).then((()=>{console.log("got channel replicant",twitchChannel.value),document.getElementById("channelName").value=twitchChannel.value,twitchChannel.on("change",(e=>{console.log("channel changed to",e),document.getElementById("channelName").value=e}))})),twitchConnected.on("change",(e=>{console.log("connected changed to",e),setTwitchStatus(e)})),document.getElementById("submitConnect").addEventListener("click",(()=>{onConnect()})),document.getElementById("submitDisconnect").addEventListener("click",(()=>{onDisconnect()}))}));
//# sourceMappingURL=index.727e0c49.js.map
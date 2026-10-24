export interface Problem {
  title: string;
  fixes: string[];
}

export const problems: Problem[] = [
  { title: "Battery gets hot", fixes: ["Take off a thick case while charging.", "Keep it out of direct sun, hot cars and car dashboards.", "Pause charging during games or video calls.", "Avoid cheap fake chargers. Use an original or certified one.", "If it swells or smells, stop using it and bring it in."] },
  { title: "Battery drains fast", fixes: ["Check Settings, Battery to see which apps use most power.", "Turn on Low Power Mode.", "Update iOS and your apps.", "Check Battery Health. A low maximum capacity may mean a new battery."] },
  { title: "Screen frozen", fixes: ["Force restart: press volume up, then volume down, then hold the side button until the Apple logo shows.", "Free up storage space.", "Update iOS when it responds again."] },
  { title: "Will not charge", fixes: ["Try another original or certified cable and adapter.", "Gently clean the charging port with a soft dry brush. Use no liquids.", "Restart the phone.", "If your power keeps fluctuating, charge through a surge protector.", "If it still fails, the port may be worn. Bring it in."] },
  { title: "Will not turn on", fixes: ["Charge it for 30 minutes with a working cable.", "Try the force restart.", "If the screen stays dead, it may be a board fault. Bring it in."] },
  { title: "No service or searching", fixes: ["Switch Airplane Mode on and off.", "Restart and check that the SIM is seated.", "Reset Network Settings. This also clears saved Wi-Fi passwords.", "Constant searching can be hardware. Bring it in."] },
  { title: "Green or lined screen", fixes: ["Restart and update iOS.", "Remove the case and check for pressure or bending.", "If it started after a drop, the display or board needs a look."] },
  { title: "Wet iPhone", fixes: ["Do not charge it.", "Switch it off and wipe it with a dry cloth.", "Do not put it in rice.", "Bring it in quickly."] },
  { title: "Face ID not working", fixes: ["Make sure nothing covers the sensors at the top of the screen.", "Wipe the area with a soft clean cloth.", "Check that Face ID is on in Settings, Face ID and Passcode.", "Restart and update iOS.", "If it began after a drop or water, bring it in."] },
  { title: "Slow phone, apps crashing", fixes: ["Restart the phone.", "Update iOS and the app that crashes.", "Delete the app and install it again.", "Free up storage and switch off Low Power Mode."] },
  { title: "Storage full", fixes: ["Open Settings, General, iPhone Storage to see what takes space.", "In WhatsApp, use Manage Storage to clear large videos and media.", "Back up photos, then delete the copies on the phone.", "Offload apps you rarely use."] },
  { title: "Wi-Fi or Bluetooth problems", fixes: ["Switch it off and on again.", "Forget the Wi-Fi network and join again.", "Restart the phone and the router.", "Reset Network Settings if it keeps failing."] },
  { title: "Stuck on the Apple logo", fixes: ["Charge it, then try the force restart.", "Connect it to a computer and choose Update, not Restore, to try to keep your data.", "If it loops again, bring it in."] },
  { title: "People cannot hear me on calls", fixes: ["Remove any case or protector covering the microphone.", "Gently clean the small holes at the bottom with a dry soft brush.", "Check that earbuds are not connected by Bluetooth.", "If it stays muffled, bring it in."] },
  { title: "Cracked screen", fixes: ["Do not keep pressing on the cracks.", "Cover the glass with a clear protector or tape so shards do not cut you.", "Back up your data.", "Repair it soon. Cracks spread and let in dust and moisture."] },
];

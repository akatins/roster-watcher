const tone = document.getElementById('cashTone');

async function checkRoster() {
  try {
    const proxyUrl = 'https://corsproxy.io/?';
    const targetUrl = 'https://virginaustralia.sharepoint.com/sites/core/nops/BusinessSupport/SystemsAndSolutions/flightCrewOpenTime/v2/index.aspx';
    const response = await fetch(proxyUrl + encodeURIComponent(targetUrl));
    const text = await response.text();

    const isMatch = /DDO|GRD|BLANK|ALV/.test(text) && /<img[^>]*src[^>]*airplane/i.test(text);
    if (isMatch) {
      console.log('🛬 Match found! Playing tone.');
      tone.play();
    } else {
      console.log('No match yet.');
    }
  } catch (err) {
    console.error('Roster check failed:', err);
  }
}

setInterval(checkRoster, 60 * 1000);
checkRoster();

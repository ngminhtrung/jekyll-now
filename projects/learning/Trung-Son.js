function getDate(idNames, category) {

  function downloadURI(uri) {
    var link = document.createElement("a");
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  };

  const prefix = {
    metastock: "http://www.cophieu68.vn/export/metastock.php?id=",
    excelfull: "http://www.cophieu68.vn/export/excelfull.php?id=",
    reportfinance: "http://www.cophieu68.vn/export/reportfinance.php?id=",
    indexfinance: "http://www.cophieu68.vn/export/indexfinance.php?id=",
    events: "http://www.cophieu68.vn/export/events.php?id="
  }

  let links = {
    metastock: [],
    excelfull: [],
    reportfinance: [],
    indexfinance: [],
    events: []
  };


  for (let i = 0; i < idNames.length; i++) {
    links[category].push(prefix[category] + idNames[i]);
  }

  let counter = 0;
  let i = setInterval(function () {
    downloadURI(links[category][counter]);
    counter++;
    limitDownload = links.length - 1;
    if (counter === limitDownload) {
      clearInterval(i);
    }
  }, 2000);

};



